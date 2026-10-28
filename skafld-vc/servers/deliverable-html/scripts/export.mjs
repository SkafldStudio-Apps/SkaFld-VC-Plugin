// export_document for the local server: a deliverable, a package or any
// Markdown answer to Word, PDF, PowerPoint, a PDF deck or (a Diligence plan)
// Excel, written under <project>/skafld-vc/. Unbranded unless a brand is
// configured: the platform's (its URL), a brand folder named for the
// export, the project's brand/ folder, or the brand saved with setup. The
// exporter is the bundle in servers/document-export, loaded on first use so
// the server starts fast. No network, except to download a platform's brand
// when `brand` is its URL (platform-brand.mjs). htmlBrandFor resolves the
// same brand for the HTML deliverables.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { basename, dirname, join, relative, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import {
  looksLikeUrl,
  platformBrand,
  PlatformBrandError,
} from "./platform-brand.mjs"
import { htmlBrand } from "./renderer.mjs"
import { inOutDir, projectDir, readWritten, RenderError } from "./write.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const EXPORT_DIR = resolve(here, "..", "..", "document-export")

export const EXPORT_FORMATS = ["docx", "pdf", "pptx", "deck_pdf", "xlsx"]

/**
 * The one folder where a person's setup (brand, brand choice and firm
 * profile) lives, the same in every session and project: the plugin's data
 * folder where the host provides one (Claude Code; kept across updates),
 * else SKAFLD_VC_HOME, else ~/.skafld-vc (Cowork, where the data folder is
 * not documented). Never the project folder, which can change per session.
 * Null only when there is no home directory at all.
 */
export function setupHome(env = process.env) {
  if (env.CLAUDE_PLUGIN_DATA) {
    const dir = resolve(env.CLAUDE_PLUGIN_DATA)
    adoptLegacySetup(dir)
    return { dir, where: "the plugin's data folder" }
  }
  if (env.SKAFLD_VC_HOME) {
    return { dir: resolve(env.SKAFLD_VC_HOME), where: env.SKAFLD_VC_HOME }
  }
  let home = ""
  try {
    home = homedir()
  } catch {
    home = ""
  }
  return home ? { dir: join(home, ".skafld-vc"), where: "~/.skafld-vc" } : null
}

/**
 * Before 2.0 these servers were the separate plugin skafld-vc-files, whose
 * data folder sits beside this one as `skafld-vc-files-<marketplace>` (Claude
 * Code names a data folder `<plugin>-<marketplace>`). The first time this
 * plugin's folder is empty and that one is not, its contents are copied
 * over, so a saved brand, brand choice and firm profile carry across the
 * move. The old folder is left as it is.
 */
const adopted = new Set()
export function adoptLegacySetup(dir) {
  if (adopted.has(dir)) return
  adopted.add(dir)
  const name = basename(dir)
  if (!name.startsWith("skafld-vc-") || name.startsWith("skafld-vc-files-")) {
    return
  }
  const legacy = join(
    dirname(dir),
    `skafld-vc-files-${name.slice("skafld-vc-".length)}`
  )
  try {
    if (existsSync(dir) && readdirSync(dir).length > 0) return
    if (!existsSync(legacy) || readdirSync(legacy).length === 0) return
    mkdirSync(dir, { recursive: true })
    cpSync(legacy, dir, { recursive: true, errorOnExist: false, force: false })
  } catch {
    // Best effort: without the copy, setup simply starts fresh.
  }
}

/**
 * Where a person's saved brand and brand choice live: the setup home, else
 * (no home directory at all) the project.
 */
export function brandHome(env = process.env, project) {
  const home = setupHome(env)
  if (home) {
    return {
      brandDir: join(home.dir, "brand"),
      choiceFile: join(home.dir, "brand-choice.json"),
      scope: "user",
      where: home.where,
    }
  }
  return {
    brandDir: null,
    choiceFile: project ? join(project, "brand", "choice.json") : null,
    scope: "project",
    where: "this project's brand/ folder",
  }
}

export function readBrandChoice(env = process.env, project) {
  const { choiceFile } = brandHome(env, project)
  if (!choiceFile || !existsSync(choiceFile)) return null
  try {
    return JSON.parse(readFileSync(choiceFile, "utf8"))
  } catch {
    return null
  }
}

let exporter = null
export async function loadExporter() {
  // A file URL, not a path: on Windows import() reads "C:\\..." as a URL scheme.
  exporter ??= await import(
    pathToFileURL(join(EXPORT_DIR, "scripts", "exporter.mjs")).href
  )
  return exporter
}

export const exportAssets = {
  fontsDir: join(EXPORT_DIR, "assets", "fonts"),
}

/**
 * The platform's brand for a brand URL, as a folder in the setup home
 * (downloaded once per version). Returns { dir, name, ... } or
 * { problem } with the reason it is not available.
 */
export async function platformBrandFor(url, env = process.env, deps = {}) {
  const { brandProblems } = await loadExporter()
  try {
    return await platformBrand(url, {
      home: setupHome(env)?.dir,
      brandProblems,
      fetch: deps.fetch,
    })
  } catch (err) {
    if (err instanceof PlatformBrandError) return { problem: err.message }
    return { problem: String(err?.message ?? err) }
  }
}

/**
 * Export and write one file; returns what the tool reports. deps.fetch
 * replaces the global fetch (tests).
 */
export async function writeExport(args = {}, env = process.env, deps = {}) {
  const format = args.format
  if (!EXPORT_FORMATS.includes(format)) {
    throw new RenderError(`format must be one of ${EXPORT_FORMATS.join(", ")}`)
  }
  const project = projectDir(env, args.project_dir)
  let source
  if (typeof args.file === "string" && args.file) {
    const [doc] = readWritten([args.file], { project })
    source = String(doc?.format ?? "").includes(".package/")
      ? { package: doc }
      : { deliverable: doc }
  } else if (args.deliverable && typeof args.deliverable === "object") {
    source = String(args.deliverable.format ?? "").includes(".package/")
      ? { package: args.deliverable }
      : { deliverable: args.deliverable }
  } else if (typeof args.markdown === "string" && args.markdown.trim()) {
    source = {
      markdown: args.markdown,
      title: args.title,
      subtitle: args.subtitle,
    }
  } else {
    throw new RenderError(
      "Pass file (a deliverable written earlier), deliverable, or markdown."
    )
  }
  const { exportDocument, ExportError, BrandError, brandOriginLabel } =
    await loadExporter()
  const home = brandHome(env, project)
  const named =
    typeof args.brand === "string" && args.brand ? args.brand : undefined
  // A URL is the platform's brand, never a folder; when it cannot be used,
  // the export goes on with the next brand in the order.
  let platform = null
  if (named && looksLikeUrl(named)) {
    platform = await platformBrandFor(named, env, deps)
  }
  let out
  try {
    out = await exportDocument(format, source, {
      platformBrandDir: platform?.dir ?? null,
      platformBrandSource: platform?.dir
        ? `the platform's brand (${platform.host})`
        : undefined,
      brand: platform ? undefined : named,
      project,
      userDir: home.brandDir,
      ...exportAssets,
      audience: args.audience,
      contact: args.contact,
      from: args.from,
      house: args.house,
    })
  } catch (err) {
    if (err instanceof ExportError)
      throw new RenderError(err.message, err.errors)
    if (err instanceof BrandError) throw new RenderError(err.message)
    throw err
  }
  const { dir, file } = inOutDir(project, out.fileName)
  mkdirSync(dir, { recursive: true })
  writeFileSync(file, out.buffer)
  const warnings = [...out.warnings]
  if (platform?.problem) {
    warnings.unshift(
      `platform brand not available: ${platform.problem}; used ${brandOriginLabel(out.brand.origin)}`
    )
  }
  // On a platform the brand is the platform's to choose, not the person's.
  const needsBrandChoice =
    !platform && out.brand.origin === "none" && !readBrandChoice(env, project)
  return {
    path: relative(project, file),
    brand: out.brand,
    warnings,
    needsBrandChoice,
    ...(platform?.dir ? { platformBrandCached: platform.cached } : {}),
  }
}

/** The tool's text reply. */
export function exportReply(r) {
  const lines = [
    r.brand.origin === "none"
      ? `Wrote ${r.path}, unbranded (${r.brand.source}).`
      : `Wrote ${r.path} in the ${r.brand.name} brand (${r.brand.source}).`,
  ]
  for (const w of r.warnings) lines.push(`Note: ${w}`)
  if (r.needsBrandChoice) {
    lines.push(
      'No brand is configured, so the file is unbranded (no logo, no firm name). Ask the person once whether to keep files unbranded or set up their own brand (/skafld-vc:setup); record "keep unbranded" with the setup server\'s use_default_brand.'
    )
  }
  return lines.join("\n")
}

/**
 * The brand for an HTML deliverable, in the same order as the exports:
 * the platform's (a brand URL), a brand folder named, the project's brand/
 * folder, the saved brand. Returns { brand, label, warnings }: brand is the
 * renderer's brand (htmlBrand) or null for an unbranded file. The exporter
 * is only loaded when a brand could apply.
 */
export async function htmlBrandFor(
  args = {},
  env = process.env,
  project,
  deps = {}
) {
  const named =
    typeof args.brand === "string" && args.brand ? args.brand : undefined
  const home = brandHome(env, project)
  const configured =
    named ||
    existsSync(join(project, "brand", "brand.json")) ||
    (home.brandDir && existsSync(join(home.brandDir, "brand.json")))
  if (!configured) return { brand: null, label: "unbranded", warnings: [] }
  const platform =
    named && looksLikeUrl(named)
      ? await platformBrandFor(named, env, deps)
      : null
  const { resolveBrand, brandOriginLabel, BrandError } = await loadExporter()
  let resolved
  try {
    resolved = resolveBrand({
      platformBrandDir: platform?.dir ?? null,
      platformBrandSource: platform?.dir
        ? `the platform's brand (${platform.host})`
        : undefined,
      requested: platform ? undefined : named,
      project,
      userDir: home.brandDir,
      ...exportAssets,
    })
  } catch (err) {
    if (err instanceof BrandError) throw new RenderError(err.message)
    throw err
  }
  const warnings = [...resolved.warnings]
  if (platform?.problem) {
    warnings.unshift(
      `platform brand not available: ${platform.problem}; used ${brandOriginLabel(resolved.origin)}`
    )
  }
  if (resolved.origin === "none") {
    return { brand: null, label: "unbranded", warnings }
  }
  const b = resolved.brand
  const logo = b.logos?.primary
  return {
    brand: htmlBrand(
      b,
      logo ? { type: logo.type, base64: logo.data.toString("base64") } : null
    ),
    label: `in the ${b.name} brand (${b.source})`,
    warnings,
  }
}
