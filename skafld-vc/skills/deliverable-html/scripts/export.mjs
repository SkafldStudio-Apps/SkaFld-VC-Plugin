// export_document for the local server: a deliverable, a package or any
// Markdown answer to Word, PDF, PowerPoint, a PDF deck or (a Diligence plan)
// Excel, in the person's brand, written under <project>/skafld-vc/. The
// exporter is the bundled lib/deliverables/export (skills/document-export),
// loaded on first use so the server starts fast. No network.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { inOutDir, projectDir, readWritten, RenderError } from "./write.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const EXPORT_DIR = resolve(here, "..", "..", "document-export")

export const EXPORT_FORMATS = ["docx", "pdf", "pptx", "deck_pdf", "xlsx"]

/**
 * Where a person's saved brand and brand choice live: the plugin's data
 * folder (kept across updates) when the host provides one, else the project.
 */
export function brandHome(env = process.env, project) {
  if (env.CLAUDE_PLUGIN_DATA) {
    const dir = resolve(env.CLAUDE_PLUGIN_DATA)
    return {
      brandDir: join(dir, "brand"),
      choiceFile: join(dir, "brand-choice.json"),
      scope: "user",
    }
  }
  return {
    brandDir: null,
    choiceFile: project ? join(project, "brand", "choice.json") : null,
    scope: "project",
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
  exporter ??= await import(join(EXPORT_DIR, "scripts", "exporter.mjs"))
  return exporter
}

export const exportAssets = {
  packsRoot: join(EXPORT_DIR, "assets", "brands"),
  fontsDir: join(EXPORT_DIR, "assets", "fonts"),
}

/** Export and write one file; returns what the tool reports. */
export async function writeExport(args = {}, env = process.env) {
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
  const { exportDocument, ExportError, BrandError } = await loadExporter()
  const home = brandHome(env, project)
  let out
  try {
    out = await exportDocument(format, source, {
      brand:
        typeof args.brand === "string" && args.brand ? args.brand : undefined,
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
  const needsBrandChoice =
    out.brand.origin === "default" && !readBrandChoice(env, project)
  return {
    path: relative(project, file),
    brand: out.brand,
    warnings: out.warnings,
    needsBrandChoice,
  }
}

/** The tool's text reply. */
export function exportReply(r) {
  const lines = [
    `Wrote ${r.path} in the ${r.brand.name} brand (${r.brand.source}).`,
  ]
  for (const w of r.warnings) lines.push(`Note: ${w}`)
  if (r.needsBrandChoice) {
    lines.push(
      'No brand has been chosen yet, so this used the SkaFld VC default. Ask the person once whether to keep the SkaFld default or set up their own brand (/skafld-vc:setup); record "keep the default" with the setup server\'s use_default_brand.'
    )
  }
  return lines.join("\n")
}
