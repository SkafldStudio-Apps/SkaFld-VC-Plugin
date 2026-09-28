#!/usr/bin/env node
// The skafld-vc plugin's brand server: sets up the brand the exports
// (Word, PDF, PowerPoint, Excel) use. A stdio MCP server, used by
// /skafld-vc:brand in the main conversation; no agent lists it.
//
//   brand_status       which brand exports use now, and whether one was chosen
//   use_default_brand  keep the SkaFld VC default (and stop asking)
//   inspect_website    read a website: name, colours, fonts, logo candidates
//   save_brand         save a brand for this person (every project) or this project
//   preview_brand      write a sample report, deck and request list in the brand
//
// This is the plugin's only local server with network access: it fetches
// the website the person names, and fonts from Google Fonts. It saves to the
// plugin's data folder (CLAUDE_PLUGIN_DATA, kept across updates) or, for a
// project brand, <project>/brand/. Newline-delimited JSON-RPC 2.0 on stdio.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { createInterface } from "node:readline"
import { fileURLToPath } from "node:url"

import {
  brandHome,
  exportAssets,
  loadExporter,
  readBrandChoice,
} from "../../deliverable-html/scripts/export.mjs"
import {
  inOutDir,
  projectDir,
  RenderError,
} from "../../deliverable-html/scripts/write.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const ASSETS = resolve(here, "..", "..", "document-export", "assets")
const SERVER = { name: "skafld-vc-brand", version: "1.0.0" }
const FALLBACK_PROTOCOL = "2025-06-18"

const PROJECT_DIR = {
  type: "string",
  description:
    "The absolute path of the folder you are working in. Pass it always.",
}
const FONT = {
  anyOf: [
    { type: "string" },
    {
      type: "object",
      properties: { family: { type: "string" }, weight: { type: "number" } },
      required: ["family"],
    },
  ],
  description: 'A font family ("Inter"), or { family, weight }.',
}

const TOOLS = [
  {
    name: "brand_status",
    title: "Which brand exports use",
    description:
      "The brand the exports use now (the project's brand/ folder, the saved brand, or the SkaFld VC default), its colours, fonts and logo file, and whether the person has chosen yet.",
    inputSchema: {
      type: "object",
      properties: { project_dir: PROJECT_DIR },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "use_default_brand",
    title: "Keep the SkaFld VC default",
    description:
      "Record that the person keeps the SkaFld VC default brand, so exports stop asking. A brand saved earlier stops being used (it is kept as brand.previous) unless remove_saved is false.",
    inputSchema: {
      type: "object",
      properties: {
        remove_saved: {
          type: "boolean",
          description: "Also stop using a brand saved earlier (default true).",
        },
        project_dir: PROJECT_DIR,
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "inspect_website",
    title: "Read a brand from a website",
    description:
      "Fetch a website and propose a brand: the firm's name, colour candidates (the accent first), heading and body fonts, and up to four logo candidates saved as PNG files you can open to look at. Nothing is saved as the brand until save_brand.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The firm's website, for example northwind.vc.",
        },
        project_dir: PROJECT_DIR,
      },
      required: ["url"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  {
    name: "save_brand",
    title: "Save a brand",
    description:
      'Save the brand the exports use: name, accent colour (and optionally ink and other colours), fonts per role (display, heading, body, label; fonts not bundled are downloaded from Google Fonts), and a logo file (PNG, JPEG or SVG: a candidate from inspect_website or a file the person gave you). Scope "user" (default) applies it in every project; "project" writes <project>/brand/ for this project only. Confirm the choices with the person first.',
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The firm's name as it should appear.",
        },
        website: { type: "string" },
        accent: {
          type: "string",
          description: "The main brand colour, #RRGGBB.",
        },
        ink: {
          type: "string",
          description:
            "The text and dark-panel colour, #RRGGBB (default near-black).",
        },
        colors: {
          type: "object",
          description:
            "Optional overrides: accent_light, accent_deep, body, muted, line, panel, table_header.",
        },
        fonts: {
          type: "object",
          properties: { display: FONT, heading: FONT, body: FONT, label: FONT },
          description:
            "Fonts by role. Leave a role out for the default (Manrope for display and heading, Inter for body and label).",
        },
        logo: {
          type: "string",
          description: "Path to the logo (PNG, JPEG or SVG).",
        },
        logo_on_dark: {
          type: "string",
          description:
            "Path to a logo made for dark backgrounds, if the firm has one.",
        },
        footer: {
          type: "string",
          description: 'Footer text, default "Confidential".',
        },
        disclaimer: {
          type: "string",
          description: "A disclaimer line for reports, if the firm uses one.",
        },
        scope: { type: "string", enum: ["user", "project"] },
        project_dir: PROJECT_DIR,
      },
      required: ["name", "accent"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  {
    name: "preview_brand",
    title: "Preview the brand",
    description:
      "Write a sample Screening report (PDF), a sample deck (PDF) and a sample founder request list (Excel) in the brand exports use now, under ./skafld-vc/brand-preview/, so the person can open them.",
    inputSchema: {
      type: "object",
      properties: { project_dir: PROJECT_DIR },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
]

// ---------------------------------------------------------------------------

async function exporter() {
  const x = await loadExporter()
  await x.initSvg(join(ASSETS, "resvg.wasm"))
  return x
}

const svgFonts = () => [
  readFileSync(join(ASSETS, "fonts", "Inter-400.ttf")),
  readFileSync(join(ASSETS, "fonts", "Inter-700.ttf")),
]

function writeChoice(env, project, choice) {
  const { choiceFile } = brandHome(env, project)
  if (!choiceFile) return
  mkdirSync(dirname(choiceFile), { recursive: true })
  writeFileSync(
    choiceFile,
    `${JSON.stringify({ ...choice, at: new Date().toISOString() }, null, 2)}\n`
  )
}

function draftDir(env, project) {
  return env.CLAUDE_PLUGIN_DATA
    ? join(resolve(env.CLAUDE_PLUGIN_DATA), "brand-draft")
    : join(project, "brand", ".draft")
}

async function status(args, env) {
  const project = projectDir(env, args.project_dir)
  const x = await loadExporter()
  const home = brandHome(env, project)
  const { brand, origin } = x.resolveBrand({
    project,
    userDir: home.brandDir,
    ...exportAssets,
  })
  const choice = readBrandChoice(env, project)
  const logoPath =
    origin === "project"
      ? join(project, "brand", brand.logo?.primary ?? "")
      : origin === "saved"
        ? join(home.brandDir, brand.logo?.primary ?? "")
        : join(
            exportAssets.packsRoot,
            brand.id ?? "skafld-vc",
            brand.logo?.primary ?? ""
          )
  return {
    active: {
      name: brand.name,
      origin,
      source: brand.source,
      colors: { accent: brand.colors.accent, ink: brand.colors.ink },
      fonts: Object.fromEntries(
        ["display", "heading", "body", "label"].map((r) => [
          r,
          brand.fonts[r].family,
        ])
      ),
      logo: brand.logo?.primary ? logoPath : null,
    },
    chosen: choice ? choice.choice : null,
    saves_to: home.brandDir
      ? "the plugin's data folder (every project)"
      : "<project>/brand/ (this host has no plugin data folder)",
  }
}

function resolvePath(p, project) {
  const file = resolve(project, String(p))
  if (!existsSync(file)) throw new RenderError(`no such file: ${p}`)
  if (!/\.(png|jpe?g|svg)$/i.test(file))
    throw new RenderError("logos must be PNG, JPEG or SVG files")
  return file
}

async function save(args, env) {
  const project = projectDir(env, args.project_dir)
  const x = await exporter()
  const home = brandHome(env, project)
  const scope = args.scope === "project" || !home.brandDir ? "project" : "user"
  const target = scope === "project" ? join(project, "brand") : home.brandDir
  const font = (f) => (typeof f === "string" ? { family: f } : (f ?? undefined))
  const staging = `${target}.saving`
  const built = await x.buildBrand(
    {
      name: args.name,
      website: args.website,
      footer: args.footer,
      disclaimer: args.disclaimer,
      colors: { ...(args.colors ?? {}), accent: args.accent, ink: args.ink },
      fonts: {
        display: font(args.fonts?.display),
        heading: font(args.fonts?.heading),
        body: font(args.fonts?.body),
        label: font(args.fonts?.label),
      },
      logo: args.logo
        ? x.readLogoFile(resolvePath(args.logo, project), { fonts: svgFonts() })
        : null,
      logoOnDark: args.logo_on_dark
        ? x.readLogoFile(resolvePath(args.logo_on_dark, project), {
            fonts: svgFonts(),
          })
        : null,
    },
    { dir: staging, fontsDir: exportAssets.fontsDir }
  )
  rmSync(target, { recursive: true, force: true })
  mkdirSync(dirname(target), { recursive: true })
  renameSync(staging, target)
  writeChoice(env, project, { choice: "custom", scope })
  return {
    saved:
      scope === "project"
        ? relative(project, target)
        : "the plugin's data folder",
    scope,
    brand: {
      name: built.brand.name,
      colors: built.brand.colors,
      fonts: built.brand.fonts,
      logo: built.brand.logo ?? null,
    },
    notes: built.notes,
    next: "Call preview_brand and show the person the files.",
  }
}

async function keepDefault(args, env) {
  const project = projectDir(env, args.project_dir)
  const home = brandHome(env, project)
  if (
    args.remove_saved !== false &&
    home.brandDir &&
    existsSync(home.brandDir)
  ) {
    const kept = `${home.brandDir}.previous`
    rmSync(kept, { recursive: true, force: true })
    renameSync(home.brandDir, kept)
  }
  writeChoice(env, project, { choice: "default" })
  const projectBrand = existsSync(join(project, "brand", "brand.json"))
  return {
    ok: true,
    note: projectBrand
      ? "Recorded. This project still has its own brand/ folder, which exports use here; remove it to use the default in this project."
      : "Recorded: exports use the SkaFld VC default.",
  }
}

async function inspect(args, env) {
  const project = projectDir(env, args.project_dir)
  const x = await exporter()
  const proposal = await x.inspectSite(args.url, {
    draftDir: draftDir(env, project),
    svgFonts: svgFonts(),
  })
  return {
    ...proposal,
    next: "Open the logo files to look at them, then show the person the name, the accent and ink colours, the fonts and the best logo, and ask them to confirm or correct before save_brand.",
  }
}

async function preview(args, env) {
  const project = projectDir(env, args.project_dir)
  const x = await loadExporter()
  const home = brandHome(env, project)
  const read = (f) =>
    JSON.parse(readFileSync(join(ASSETS, "samples", f), "utf8"))
  const jobs = [
    ["pdf", { deliverable: read("screening.json") }, {}],
    ["deck_pdf", { deliverable: read("screening.json") }, {}],
    [
      "xlsx",
      { deliverable: read("diligence.json") },
      { audience: "founder", contact: "Your name, you@yourfirm.com" },
    ],
    ["docx", { deliverable: read("screening.json") }, {}],
  ]
  const written = []
  let brandName = null
  for (const [format, source, extra] of jobs) {
    const out = await x.exportDocument(format, source, {
      project,
      userDir: home.brandDir,
      ...exportAssets,
      ...extra,
    })
    brandName = out.brand.name
    const { file: folder } = inOutDir(project, "brand-preview")
    mkdirSync(folder, { recursive: true })
    const path = join(
      folder,
      `preview${format === "deck_pdf" ? "-deck" : ""}.${out.ext}`
    )
    writeFileSync(path, out.buffer)
    written.push(relative(project, path))
  }
  return { brand: brandName, files: written }
}

// ---------------------------------------------------------------------------

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`)
}

async function callTool(name, args = {}) {
  const env = process.env
  const ok = (value) => ({
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
  })
  try {
    if (name === "brand_status") return ok(await status(args, env))
    if (name === "use_default_brand") return ok(await keepDefault(args, env))
    if (name === "inspect_website") return ok(await inspect(args, env))
    if (name === "save_brand") return ok(await save(args, env))
    if (name === "preview_brand") return ok(await preview(args, env))
    return {
      content: [{ type: "text", text: `Unknown tool ${name}` }],
      isError: true,
    }
  } catch (err) {
    const lines =
      err instanceof RenderError && err.errors?.length
        ? `:\n${err.errors.map((e) => `- ${e}`).join("\n")}`
        : ""
    return {
      content: [{ type: "text", text: `${err?.message ?? err}${lines}` }],
      isError: true,
    }
  }
}

let queue = Promise.resolve()

function handle(msg) {
  const { id, method, params } = msg
  const isRequest = id !== undefined && id !== null
  const reply = (result) => isRequest && send({ jsonrpc: "2.0", id, result })
  switch (method) {
    case "initialize":
      return reply({
        protocolVersion: params?.protocolVersion ?? FALLBACK_PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: SERVER,
      })
    case "ping":
      return reply({})
    case "tools/list":
      return reply({ tools: TOOLS })
    case "tools/call": {
      // One call at a time, in the order received: a brand saved or reset
      // by one call is what the next one sees.
      queue = queue.then(() =>
        callTool(params?.name, params?.arguments ?? {}).then(reply)
      )
      return
    }
    default:
      if (isRequest)
        send({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        })
  }
}

const rl = createInterface({ input: process.stdin })
rl.on("line", (line) => {
  if (!line.trim()) return
  let msg
  try {
    msg = JSON.parse(line)
  } catch {
    send({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    })
    return
  }
  for (const m of Array.isArray(msg) ? msg : [msg]) handle(m)
})
// Answer every call already started before exiting.
rl.on("close", () => {
  void queue.then(() => process.exit(0))
})
