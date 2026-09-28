// Shared by render.mjs (the command line) and mcp-server.mjs (the tool the
// agents call): validate, render with the SkaFld VC template, and write
// the HTML, plus the JSON it came from, under <project>/skafld-vc/.
// Nothing here touches the network, and nothing is written anywhere else.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

import {
  buildPackage,
  deliverableFileName,
  DeliverableValidationError,
  PACKAGE_FORMAT,
  packageFileName,
  renderDeliverable,
  renderPackage,
  validateDeliverable,
  validatePackage,
} from "./renderer.mjs"

const here = dirname(fileURLToPath(import.meta.url))

/** The folder deliverables are written to, under the project directory. */
export const OUT_DIR = "skafld-vc"

export class RenderError extends Error {
  constructor(message, errors = []) {
    super(message)
    this.name = "RenderError"
    this.errors = errors
  }
}

let cachedCss = null
function templateCss() {
  cachedCss ??= readFileSync(join(here, "..", "assets", "template.css"), "utf8")
  return cachedCss
}

/** The plugin's own folder, which is never a project. */
const PLUGIN_ROOT = resolve(here, "..", "..", "..")

/**
 * The project directory: CLAUDE_PROJECT_DIR when the host passes it to the
 * server; otherwise the absolute folder the agent says it is working in
 * (`project_dir`, for hosts that start plugin servers without it); otherwise
 * the current directory. Never the plugin's own folder.
 */
export function projectDir(env = process.env, requested) {
  let dir
  if (env.CLAUDE_PROJECT_DIR) dir = resolve(env.CLAUDE_PROJECT_DIR)
  else if (
    typeof requested === "string" &&
    isAbsolute(requested) &&
    existsSync(requested) &&
    statSync(requested).isDirectory()
  )
    dir = resolve(requested)
  else dir = resolve(process.cwd())
  const root = resolve(env.CLAUDE_PLUGIN_ROOT || PLUGIN_ROOT)
  if (dir === root || dir.startsWith(root + sep)) {
    throw new RenderError(
      "The project folder is not known here: pass project_dir, the absolute path of the folder you are working in."
    )
  }
  return dir
}

/** Resolve a file name inside <project>/skafld-vc, refusing anything else. */
export function inOutDir(project, fileName) {
  const dir = resolve(project, OUT_DIR)
  const file = resolve(dir, String(fileName))
  const rel = relative(dir, file)
  if (!rel || rel.startsWith("..") || rel.includes(sep)) {
    throw new RenderError(`refusing a path outside ./${OUT_DIR}: ${fileName}`)
  }
  return { dir, file }
}

function writePair(project, htmlName, html, doc) {
  const { dir, file } = inOutDir(project, htmlName)
  mkdirSync(dir, { recursive: true })
  writeFileSync(file, html)
  const jsonFile = file.replace(/\.html$/, ".json")
  writeFileSync(jsonFile, `${JSON.stringify(doc, null, 2)}\n`)
  return {
    html: relative(project, file),
    json: relative(project, jsonFile),
  }
}

/** Render one deliverable (or a whole package document) and write it. */
export function writeDeliverable(doc, { project = projectDir() } = {}) {
  if (doc && typeof doc === "object" && doc.format === PACKAGE_FORMAT) {
    const checked = validatePackage(doc)
    if (!checked.ok) throw new RenderError("invalid package", checked.errors)
    const html = renderPackage(checked.value, { css: templateCss() })
    return writePair(
      project,
      packageFileName(checked.value),
      html,
      checked.value
    )
  }
  const checked = validateDeliverable(doc)
  if (!checked.ok) throw new RenderError("invalid deliverable", checked.errors)
  const html = renderDeliverable(checked.value, { css: templateCss() })
  return writePair(
    project,
    deliverableFileName(checked.value),
    html,
    checked.value
  )
}

/**
 * Read deliverables written earlier: each entry is a file name (or path)
 * of a .json or .html written by writeDeliverable, inside ./skafld-vc.
 */
export function readWritten(names, { project = projectDir() } = {}) {
  return names.map((name) => {
    const base = String(name)
      .split(/[\\/]/)
      .pop()
      .replace(/\.html$/, ".json")
    const { file } = inOutDir(project, base)
    if (!existsSync(file)) {
      throw new RenderError(`no deliverable ${base} in ./${OUT_DIR}`)
    }
    try {
      return JSON.parse(readFileSync(file, "utf8"))
    } catch (err) {
      throw new RenderError(`${base} is not JSON: ${err.message}`)
    }
  })
}

/**
 * Assemble a package from deliverables about one company and write it.
 * `deliverables` holds documents; `files` names ones written earlier.
 */
export function writePackage(
  { deliverables = [], files = [], person, agent = "orchestrator" },
  { project = projectDir() } = {}
) {
  const docs = [...deliverables, ...readWritten(files, { project })]
  let pkg
  try {
    pkg = buildPackage(docs, {
      generatedAt: new Date().toISOString(),
      preparedBy: {
        agent,
        runtime: "claude_code",
        ...(person ? { person } : {}),
      },
    })
  } catch (err) {
    if (err instanceof DeliverableValidationError) {
      throw new RenderError("invalid deliverable in package", err.errors)
    }
    throw new RenderError(err.message)
  }
  const html = renderPackage(pkg, { css: templateCss() })
  return writePair(project, packageFileName(pkg), html, pkg)
}
