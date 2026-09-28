#!/usr/bin/env node
// The skafld-vc plugin's setup server: the person's firm profile (optional)
// and the brand the exports (Word, PDF, PowerPoint, Excel) use. A stdio MCP
// server, used by /skafld-vc:setup in the main conversation; every agent
// reads the profile with get_profile when no platform is connected.
//
//   setup_status       what is set up (brand and firm profile) and what can be changed
//   get_profile        the firm profile, in the platform house profile's shape
//   save_profile       save or change parts of the firm profile
//   brand_status       which brand exports use now, and whether one was chosen
//   use_default_brand  keep the SkaFld VC default (and stop asking)
//   inspect_website    read a website: name, colours, fonts, logo candidates
//   save_brand         save a brand for this person (every project) or this project
//   preview_brand      write a sample report, deck and request list in the brand
//
// This is the plugin's only local server with network access: it fetches
// the website the person names, and fonts from Google Fonts. It saves to the
// plugin's data folder (CLAUDE_PLUGIN_DATA, kept across updates) or, for a
// project brand, <project>/brand/; the profile to <data>/profile.json, or
// <project>/skafld-vc/profile.json on a host with no plugin data folder.
// Newline-delimited JSON-RPC 2.0 on stdio.
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
  setupHome,
} from "../../deliverable-html/scripts/export.mjs"
import {
  inOutDir,
  projectDir,
  RenderError,
} from "../../deliverable-html/scripts/write.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const ASSETS = resolve(here, "..", "..", "document-export", "assets")
const SERVER = { name: "skafld-vc-setup", version: "1.1.0" }
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
    name: "setup_status",
    title: "What is set up",
    description:
      "What /skafld-vc:setup has saved for this person: the brand the exports use and the firm profile (if any), with the list of parts that can be changed. Call it first in setup: if something is saved, show it and offer the parts to change; if nothing is, run the first-time setup.",
    inputSchema: {
      type: "object",
      properties: { project_dir: PROJECT_DIR },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "get_profile",
    title: "Firm profile",
    description:
      "The person's firm profile from /skafld-vc:setup, in the same shape as a platform's whoami house profile (name, short_name, description, thesis, network_fit, decision_format, board_seats, check_range_usd, mandate, thesis_detail). Read it when no platform is connected; profile is null when none was saved, and then you carry on without it (ask for what you need, or work from the documents).",
    inputSchema: {
      type: "object",
      properties: { project_dir: PROJECT_DIR },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "save_profile",
    title: "Save the firm profile",
    description:
      "Save or change parts of the firm profile (only the fields given change; list fields in clear to remove them, or reset: true to delete the whole profile). Call only after the person confirmed the values.",
    inputSchema: {
      type: "object",
      properties: {
        project_dir: PROJECT_DIR,
        name: { type: "string", description: "The firm's full name." },
        short_name: {
          type: "string",
          description: 'Short form for labels ("Northwind").',
        },
        description: {
          type: "string",
          description:
            "One or two sentences on who the firm is and what it backs.",
        },
        thesis: {
          type: "string",
          description:
            "The investment thesis in the firm's words: sectors, stages, geographies, cheque, why now.",
        },
        network_fit: {
          type: "object",
          properties: {
            label: { type: "string" },
            description: { type: "string" },
          },
          required: ["label", "description"],
          description:
            "What the firm brings founders beyond capital, for memos and the network-fit criterion.",
        },
        decision_format: {
          type: "string",
          enum: ["committee_memo", "partner_screen", "solo"],
          description:
            "committee_memo (an investment committee decides on a memo), partner_screen (a partner decides on the Screening), or solo (one investor).",
        },
        board_seats: {
          type: "boolean",
          description: "Whether the firm takes board seats after investing.",
        },
        check_range_usd: {
          type: "object",
          properties: {
            min: { type: "integer", minimum: 1 },
            max: { type: "integer", minimum: 1 },
          },
          required: ["min", "max"],
          description: "Typical cheque per deal, whole dollars.",
        },
        mandate: {
          type: "object",
          properties: {
            sectors: { type: "array", items: { type: "string" } },
            stages: { type: "array", items: { type: "string" } },
            geographies: { type: "array", items: { type: "string" } },
            super_priority: {
              type: "array",
              items: { type: "string" },
              description: "Two or three must-have criteria.",
            },
          },
        },
        thesis_detail: {
          type: "object",
          description:
            "Optional: the fuller thesis in the thesis-fit skill's thesis.json shape (title, version, whyNow, pillars, taxonomy, criteria). A project's own thesis.json overrides it.",
        },
        fund_size_usd: {
          type: "integer",
          minimum: 1,
          description:
            "Optional: the fund or annual allocation, for the fund-returner line.",
        },
        clear: {
          type: "array",
          items: { type: "string" },
          description: "Fields to remove.",
        },
        reset: {
          type: "boolean",
          description: "Delete the whole profile.",
        },
      },
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
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
      ? `${home.where} (every project and session)`
      : "<project>/brand/ (no home folder on this machine)",
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
// The firm profile

const PROFILE_FIELDS = [
  "name",
  "short_name",
  "description",
  "thesis",
  "network_fit",
  "decision_format",
  "board_seats",
  "check_range_usd",
  "mandate",
  "thesis_detail",
  "fund_size_usd",
]
const DECISION_FORMATS = ["committee_memo", "partner_screen", "solo"]

/** Where the profile lives: the setup home, else (no home at all) the project. */
export function profileFile(env, project) {
  const home = setupHome(env)
  return home
    ? join(home.dir, "profile.json")
    : join(project, "skafld-vc", "profile.json")
}

export function readProfile(env, project) {
  const file = profileFile(env, project)
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, "utf8"))
  } catch {
    return null
  }
}

const text = (v) => typeof v === "string" && v.trim().length > 0
const strings = (v) => Array.isArray(v) && v.every(text)

/** Refuse a value the agents could not use; the message says which field. */
function checkProfileField(key, value) {
  switch (key) {
    case "name":
    case "short_name":
    case "description":
    case "thesis":
      if (!text(value)) return `${key} must be non-empty text`
      return null
    case "network_fit":
      if (!value || !text(value.label) || !text(value.description))
        return "network_fit needs a label and a description"
      return null
    case "decision_format":
      if (!DECISION_FORMATS.includes(value))
        return `decision_format must be one of ${DECISION_FORMATS.join(", ")}`
      return null
    case "board_seats":
      if (typeof value !== "boolean") return "board_seats must be true or false"
      return null
    case "check_range_usd":
      if (
        !value ||
        !Number.isInteger(value.min) ||
        !Number.isInteger(value.max) ||
        value.min < 1 ||
        value.max < value.min
      )
        return "check_range_usd needs whole-dollar min and max, with max at least min"
      return null
    case "mandate":
      if (!value || typeof value !== "object")
        return "mandate must be an object"
      for (const k of ["sectors", "stages", "geographies", "super_priority"]) {
        if (value[k] !== undefined && !strings(value[k]))
          return `mandate.${k} must be a list of text`
      }
      return null
    case "thesis_detail":
      if (!value || typeof value !== "object" || Array.isArray(value))
        return "thesis_detail must be an object"
      return null
    case "fund_size_usd":
      if (!Number.isInteger(value) || value < 1)
        return "fund_size_usd must be a whole number of dollars"
      return null
    default:
      return `${key} is not a profile field`
  }
}

function saveProfile(args, env) {
  const project = projectDir(env, args.project_dir)
  const file = profileFile(env, project)
  if (args.reset === true) {
    rmSync(file, { force: true })
    return { ok: true, profile: null, note: "The firm profile was deleted." }
  }
  const current = readProfile(env, project) ?? {}
  const next = { ...current }
  const errors = []
  for (const key of PROFILE_FIELDS) {
    if (args[key] === undefined) continue
    const problem = checkProfileField(key, args[key])
    if (problem) errors.push(problem)
    else next[key] = args[key]
  }
  for (const key of Array.isArray(args.clear) ? args.clear : []) {
    if (!PROFILE_FIELDS.includes(key))
      errors.push(`${key} is not a profile field`)
    else delete next[key]
  }
  if (errors.length) throw new RenderError("the profile was not saved", errors)
  if (!next.short_name && next.name) next.short_name = next.name
  next.updated_at = new Date().toISOString()
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`)
  return {
    ok: true,
    saved_to: setupHome(env)
      ? `${setupHome(env).where} (every project and session)`
      : relative(project, file),
    profile: next,
    portable: portableProfile(next),
  }
}

function getProfile(args, env) {
  const project = projectDir(env, args.project_dir)
  const profile = readProfile(env, project)
  return profile
    ? { profile, source: "setup" }
    : {
        profile: null,
        note: "No firm profile is saved. Carry on without it: ask for what you need or work from the documents. The person can save one with /skafld-vc:setup.",
      }
}

/**
 * The profile as a short Markdown block, for a Claude Project's instructions
 * or files: where the local tools do not run (Chat, claude.ai), the agents
 * read the firm's details from there.
 */
export function portableProfile(p) {
  if (!p) return null
  const lines = ["## SkaFld VC firm profile", ""]
  const add = (label, value) => {
    if (value !== undefined && value !== null && value !== "")
      lines.push(`- **${label}:** ${value}`)
  }
  add(
    "Firm",
    p.short_name && p.short_name !== p.name
      ? `${p.name} (${p.short_name})`
      : p.name
  )
  add("Who we are", p.description)
  add("Thesis", p.thesis)
  if (p.mandate) {
    add("Sectors", p.mandate.sectors?.join(", "))
    add("Stages", p.mandate.stages?.join(", "))
    add("Geographies", p.mandate.geographies?.join(", "))
    add("Must-haves", p.mandate.super_priority?.join("; "))
  }
  if (p.check_range_usd)
    add(
      "Cheque",
      `$${p.check_range_usd.min.toLocaleString("en-US")} to $${p.check_range_usd.max.toLocaleString("en-US")}`
    )
  if (p.fund_size_usd)
    add(
      "Fund or annual allocation",
      `$${p.fund_size_usd.toLocaleString("en-US")}`
    )
  add(
    "Decisions",
    {
      committee_memo: "an investment committee decides on a memo",
      partner_screen: "a partner decides on the Screening",
      solo: "one investor decides",
    }[p.decision_format]
  )
  if (typeof p.board_seats === "boolean")
    add("Board seats", p.board_seats ? "yes" : "no")
  if (p.network_fit) add(p.network_fit.label, p.network_fit.description)
  return lines.join("\n")
}

/** The parts of setup a person can change, in the order setup offers them. */
const CHANGEABLE = [
  {
    key: "brand",
    label: "Brand: start again from a website, logo or description",
  },
  { key: "brand.colors", label: "Brand: colours (accent and text)" },
  { key: "brand.fonts", label: "Brand: fonts" },
  { key: "brand.logo", label: "Brand: logo" },
  { key: "brand.footer", label: "Brand: footer and disclaimer" },
  { key: "brand.default", label: "Brand: go back to the SkaFld VC default" },
  { key: "profile.firm", label: "Firm: name and description" },
  {
    key: "profile.thesis",
    label:
      "Firm: thesis and mandate (sectors, stages, geographies, must-haves)",
  },
  { key: "profile.check_range_usd", label: "Firm: cheque range and fund size" },
  { key: "profile.decision_format", label: "Firm: how decisions are made" },
  { key: "profile.board_seats", label: "Firm: board seats" },
  { key: "profile.network_fit", label: "Firm: what you bring founders" },
  { key: "profile.reset", label: "Firm: delete the profile" },
]

async function setupStatus(args, env) {
  const project = projectDir(env, args.project_dir)
  const brand = await status(args, env)
  const profile = readProfile(env, project)
  const missing = profile
    ? [
        "thesis",
        "check_range_usd",
        "decision_format",
        "network_fit",
        "board_seats",
      ].filter((k) => profile[k] === undefined)
    : null
  const home = setupHome(env)
  return {
    first_run: !profile && brand.chosen === null,
    saves_to: home
      ? `${home.where} (every project and session)`
      : "this project's folder only (no home folder on this machine)",
    persistent: Boolean(home),
    brand,
    profile,
    portable: portableProfile(profile),
    profile_missing: missing,
    can_change: CHANGEABLE,
  }
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
    if (name === "setup_status") return ok(await setupStatus(args, env))
    if (name === "get_profile") return ok(getProfile(args, env))
    if (name === "save_profile") return ok(saveProfile(args, env))
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
