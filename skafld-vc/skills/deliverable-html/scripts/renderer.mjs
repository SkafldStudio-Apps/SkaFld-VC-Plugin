// SkaFld VC deliverable renderer (format skafld-vc.deliverable/v1; the
// anchor-angels.deliverable/v1 name from before the rename is still read).
//
// One renderer for both runtimes. The platform imports it from
// lib/deliverables; the base plugin carries a byte-identical copy that its
// deliverable-html script runs with no network. So this module imports
// nothing: pure functions over plain JSON, with the stylesheet passed in.
//
// Safety: every string from a deliverable is data. It is escaped before it
// reaches the page; Markdown fields go through a small subset that escapes
// first and only then adds the tags it knows. Raw HTML is never passed
// through, links are limited to http(s), mailto and root-relative paths, and
// the page carries a CSP that blocks every request and every script.
//
// Dates: file names, covers and "Prepared" lines show the calendar day in
// the deal team's time zone, America/Chicago unless a caller passes
// `timeZone` (an IANA name) in the options. generatedAt stays an ISO instant.
//
// Types: lib/deliverables/render.d.mts and lib/deliverables/types.ts.

export const DELIVERABLE_FORMAT = "skafld-vc.deliverable/v1"
export const PACKAGE_FORMAT = "skafld-vc.package/v1"
/**
 * Format names from before the SkaFld VC rename. Documents that carry them
 * still validate, and come back from the validators under the current name.
 */
export const LEGACY_DELIVERABLE_FORMATS = Object.freeze([
  "anchor-angels.deliverable/v1",
])
export const LEGACY_PACKAGE_FORMATS = Object.freeze([
  "anchor-angels.package/v1",
])
export const DELIVERABLE_TYPES = Object.freeze([
  "screening",
  "diligence",
  "ic_memo",
])

/**
 * A map's own entry for a key, else `fallback`. Keys come from deliverable
 * JSON, so a lookup must never resolve `__proto__`, `constructor` or any
 * other inherited property.
 */
function own(map, key, fallback) {
  return typeof key === "string" && Object.hasOwn(map, key)
    ? map[key]
    : fallback
}

const TYPE_LABELS = {
  screening: "Screening report",
  diligence: "Diligence plan",
  ic_memo: "IC memo",
}
const TYPE_SLUGS = {
  screening: "screening",
  diligence: "diligence-plan",
  ic_memo: "ic-memo",
}
/** The deal team's time zone: the default for every date the renderer prints. */
export const DEFAULT_TIME_ZONE = "America/Chicago"

/**
 * Round labels for the platform's stage codes (deals.stage). A stage the
 * agent already wrote as a label ("Pre-seed", "Series A") is kept as is.
 */
const STAGE_LABELS = {
  idea: "Idea",
  mvp: "MVP",
  pmf: "Product-market fit",
  scaling: "Scaling",
  pre_seed: "Pre-seed",
  seed: "Seed",
  series_a: "Series A",
  series_b: "Series B",
  series_c: "Series C",
  growth: "Growth",
}

/** A human label for a stage code: `pre_seed` is "Pre-seed". */
export function stageLabel(stage) {
  if (typeof stage !== "string") return ""
  const s = stage.trim()
  if (!s) return ""
  const known = own(STAGE_LABELS, s)
  if (known) return known
  // Codes are lowercase snake_case; anything else is already a label.
  if (!/^[a-z0-9]+(_[a-z0-9]+)+$/.test(s)) return s
  const words = s.split("_")
  return [
    words[0].charAt(0).toUpperCase() + words[0].slice(1),
    ...words.slice(1),
  ].join(" ")
}

// "deal": a deal or application on the connected platform. "anchor_angels"
// is the same kind under its name before the rename, read as "deal".
const COMPANY_KINDS = ["deal", "outside", "anchor_angels"]
// claude_desktop: a Cowork or Claude Desktop run.
const RUNTIMES = ["claude_code", "claude_desktop", "platform"]
const RUNTIME_LABELS = {
  claude_code: "Claude Code",
  claude_desktop: "Claude Desktop",
  platform: "platform",
}
const CRITERION_STATUSES = ["scored", "not_assessed"]
const CLAIM_STATUSES = [
  "supported",
  "contradicted",
  "unsupported",
  "not_checked",
]
const RESEARCH_STATUSES = ["checked", "not_checked"]
const VERIFICATION = ["verified", "single_source", "claimed"]
const WORKSTREAMS = [
  "team",
  "market_customers",
  "product_technology",
  "financial",
  "legal_corporate",
  "deal_terms",
]
const WORKSTREAM_LABELS = {
  team: "Team",
  market_customers: "Market and customers",
  product_technology: "Product and technology",
  financial: "Financial",
  legal_corporate: "Legal and corporate",
  deal_terms: "Deal terms",
}
const NEED_KINDS = ["document", "call"]
const NEED_STATUSES = ["in_data_room", "partial", "missing"]
const DATA_ROOM_STATUSES = ["present", "partial", "missing", "outdated"]
const REQUEST_PRIORITIES = ["required", "helpful"]
const RISK_STATUSES = ["mitigated", "open"]
const TRUTH_STATUSES = ["supported", "contradicted", "open"]
const MEMO_SECTIONS = [
  "recommendation",
  "company",
  "whyNow",
  "whyTeam",
  "whatHasToBeTrue",
  "traction",
  "terms",
  "risks",
  "networkFit",
  "openItems",
]

// Status to tone, following lib/design/colors.ts: success for good,
// warning for partial or unproven, danger for contradicted or missing,
// neutral for "not assessed" and "not checked" (absence is not a verdict).
const TONES = {
  claim: {
    supported: "success",
    contradicted: "danger",
    unsupported: "warning",
    not_checked: "neutral",
  },
  research: { checked: "success", not_checked: "neutral" },
  verification: {
    verified: "success",
    single_source: "warning",
    claimed: "neutral",
  },
  need: { in_data_room: "success", partial: "warning", missing: "danger" },
  dataRoom: {
    present: "success",
    partial: "warning",
    missing: "danger",
    outdated: "warning",
  },
  risk: { mitigated: "success", open: "warning" },
  request: { required: "warning", helpful: "neutral" },
  truth: { supported: "success", contradicted: "danger", open: "neutral" },
  recommendation: {
    strong_consider: "success",
    consider: "success",
    neutral: "warning",
    pass: "danger",
    strong_pass: "danger",
    insufficient_evidence: "neutral",
  },
}

const STATUS_LABELS = {
  supported: "Supported",
  contradicted: "Contradicted",
  unsupported: "Unsupported",
  not_checked: "Not checked",
  checked: "Checked",
  verified: "Verified",
  single_source: "Single source",
  claimed: "Claimed",
  in_data_room: "In data room",
  partial: "Partial",
  missing: "Missing",
  present: "Present",
  outdated: "Outdated",
  mitigated: "Mitigated",
  open: "Open",
  not_assessed: "Not assessed",
}

// ---------------------------------------------------------------------------
// Escaping and Markdown
// ---------------------------------------------------------------------------

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

/** Escape text for HTML element content and quoted attribute values. */
export function escapeHtml(value) {
  if (value === null || value === undefined) return ""
  return String(value).replace(/[&<>"']/g, (c) => ESCAPES[c])
}

/**
 * The only link targets the renderer emits: http(s), mailto and paths on the
 * platform itself (`/deals/12`). Anything else (javascript:, data:, protocol-
 * relative `//host`) is rendered as text.
 */
export function safeHref(url) {
  if (typeof url !== "string") return null
  const u = url.trim()
  if (!u || /[\s<>"'`\\]/.test(u)) return null
  for (let i = 0; i < u.length; i += 1) {
    if (u.charCodeAt(i) < 32 || u.charCodeAt(i) === 127) return null
  }
  if (/^https?:\/\/[^/]/i.test(u)) return u
  if (/^mailto:[^/]/i.test(u)) return u
  if (/^\/(?![/\\])/.test(u)) return u
  return null
}

function emphasis(escaped) {
  return escaped
    .replace(/\*\*(?=\S)([^*]*?\S)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^\w*])\*(?=\S)([^*]*?\S)\*(?![\w*])/g, "$1<em>$2</em>")
    .replace(/(^|[^\w])_(?=\S)([^_]*?\S)_(?![\w])/g, "$1<em>$2</em>")
}

function link(href, text) {
  return `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${text}</a>`
}

const INLINE =
  /`([^`\n]+)`|\[([^\]\n]+)\]\(([^)\s]*)\)|\[\^([A-Za-z0-9_.:-]+)\]/g

/**
 * Inline Markdown: code spans, links, `[^source-id]` citations, bold and
 * italic. Text between the recognised pieces is escaped before emphasis is
 * applied, so the only tags in the result are the renderer's own.
 */
export function renderInlineMarkdown(md, ctx = {}) {
  if (md === null || md === undefined) return ""
  const raw = String(md)
  let out = ""
  let last = 0
  for (const m of raw.matchAll(INLINE)) {
    out += emphasis(escapeHtml(raw.slice(last, m.index)))
    last = m.index + m[0].length
    if (m[1] !== undefined) {
      out += `<code>${escapeHtml(m[1])}</code>`
    } else if (m[2] !== undefined) {
      const href = safeHref(m[3])
      out += href ? link(href, emphasis(escapeHtml(m[2]))) : escapeHtml(m[0])
    } else {
      const cited = ctx.cite ? ctx.cite(m[4]) : null
      out += cited ?? escapeHtml(m[0])
    }
  }
  out += emphasis(escapeHtml(raw.slice(last)))
  return out
}

const LIST_ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/
const TABLE_SEP = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/
const FENCE = /^\s*(```|~~~)/
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/
const HR = /^\s*([-*_])(\s*\1){2,}\s*$/

function splitRow(line) {
  let s = line.trim()
  if (s.startsWith("|")) s = s.slice(1)
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1)
  return s.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"))
}

function isBlockStart(line, next) {
  return (
    FENCE.test(line) ||
    HEADING.test(line) ||
    HR.test(line) ||
    /^\s*>/.test(line) ||
    LIST_ITEM.test(line) ||
    (line.includes("|") && next !== undefined && TABLE_SEP.test(next))
  )
}

function renderList(items, ctx) {
  // items: { indent, ordered, text }[]; one level of nesting.
  const baseIndent = items[0].indent
  const ordered = items[0].ordered
  const tops = []
  for (const it of items) {
    if (it.indent > baseIndent && tops.length > 0) {
      tops[tops.length - 1].children.push(it)
    } else {
      tops.push({ ...it, children: [] })
    }
  }
  const tag = ordered ? "ol" : "ul"
  const li = tops
    .map((t) => {
      let inner = renderInlineMarkdown(t.text, ctx)
      if (t.children.length > 0) {
        const ctag = t.children[0].ordered ? "ol" : "ul"
        inner += `<${ctag}>${t.children
          .map((c) => `<li>${renderInlineMarkdown(c.text, ctx)}</li>`)
          .join("")}</${ctag}>`
      }
      return `<li>${inner}</li>`
    })
    .join("")
  return `<${tag}>${li}</${tag}>`
}

/**
 * Block Markdown, the subset agents write: headings (mapped to h3-h5, or
 * `headingBase` onwards), paragraphs, bullet and numbered lists with one
 * nesting level, fenced code, blockquotes, GFM tables and horizontal rules.
 * Raw HTML is escaped like any other text.
 */
export function renderMarkdown(md, ctx = {}) {
  if (md === null || md === undefined) return ""
  const depth = ctx.depth ?? 0
  const base = Math.min(Math.max(ctx.headingBase ?? 3, 2), 6)
  const lines = String(md).replace(/\r\n?/g, "\n").split("\n")
  const out = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }
    const fence = FENCE.exec(line)
    if (fence) {
      const code = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith(fence[1])) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
      continue
    }
    const heading = HEADING.exec(line)
    if (heading) {
      const level = Math.min(base + heading[1].length - 1, base + 2, 6)
      out.push(
        `<h${level}>${renderInlineMarkdown(heading[2], ctx)}</h${level}>`
      )
      i += 1
      continue
    }
    if (HR.test(line) && !LIST_ITEM.test(line)) {
      out.push("<hr>")
      i += 1
      continue
    }
    if (/^\s*>/.test(line)) {
      const quote = []
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""))
        i += 1
      }
      out.push(
        depth < 3
          ? `<blockquote>${renderMarkdown(quote.join("\n"), { ...ctx, depth: depth + 1 })}</blockquote>`
          : `<blockquote><p>${renderInlineMarkdown(quote.join(" "), ctx)}</p></blockquote>`
      )
      continue
    }
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      TABLE_SEP.test(lines[i + 1])
    ) {
      const head = splitRow(line)
      const aligns = splitRow(lines[i + 1]).map((c) =>
        c.startsWith(":") && c.endsWith(":")
          ? "center"
          : c.endsWith(":")
            ? "right"
            : null
      )
      i += 2
      const rows = []
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
        rows.push(splitRow(lines[i]))
        i += 1
      }
      const cell = (tag, text, idx) => {
        const a = aligns[idx]
        return `<${tag}${a ? ` class="align-${a}"` : ""}>${renderInlineMarkdown(text, ctx)}</${tag}>`
      }
      out.push(
        `<div class="table-wrap"><table><thead><tr>${head
          .map((h, idx) => cell("th", h, idx))
          .join("")}</tr></thead><tbody>${rows
          .map(
            (r) =>
              `<tr>${head.map((_, idx) => cell("td", r[idx] ?? "", idx)).join("")}</tr>`
          )
          .join("")}</tbody></table></div>`
      )
      continue
    }
    if (LIST_ITEM.test(line)) {
      const items = []
      while (i < lines.length) {
        const m = LIST_ITEM.exec(lines[i])
        if (m) {
          items.push({
            indent: m[1].replace(/\t/g, "  ").length,
            ordered: /\d/.test(m[2]),
            text: m[3],
          })
          i += 1
        } else if (
          lines[i].trim() &&
          /^\s{2,}\S/.test(lines[i]) &&
          items.length
        ) {
          items[items.length - 1].text += ` ${lines[i].trim()}`
          i += 1
        } else break
      }
      out.push(renderList(items, ctx))
      continue
    }
    const para = [line.trim()]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isBlockStart(lines[i], lines[i + 1])
    ) {
      para.push(lines[i].trim())
      i += 1
    }
    out.push(`<p>${renderInlineMarkdown(para.join(" "), ctx)}</p>`)
  }
  return out.join("\n")
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}
function nonEmpty(v) {
  return typeof v === "string" && v.trim().length > 0
}
function optString(v) {
  return v === undefined || v === null || typeof v === "string"
}
function isNumber(v) {
  return typeof v === "number" && Number.isFinite(v)
}

function makeChecker(errors) {
  const req = (cond, path, message) => {
    if (!cond) errors.push(`${path}: ${message}`)
    return cond
  }
  const str = (obj, key, path) =>
    req(nonEmpty(obj?.[key]), `${path}.${key}`, "must be a non-empty string")
  const optStr = (obj, key, path) =>
    req(optString(obj?.[key]), `${path}.${key}`, "must be a string when set")
  const oneOf = (obj, key, allowed, path) =>
    req(
      allowed.includes(obj?.[key]),
      `${path}.${key}`,
      `must be one of ${allowed.join(", ")} (got ${JSON.stringify(obj?.[key] ?? null)})`
    )
  const optOneOf = (obj, key, allowed, path) =>
    obj?.[key] === undefined || obj?.[key] === null
      ? true
      : oneOf(obj, key, allowed, path)
  const arr = (obj, key, path, each, { optional = false } = {}) => {
    const v = obj?.[key]
    if (v === undefined || v === null) {
      return req(optional, `${path}.${key}`, "is required (an array)")
    }
    if (!req(Array.isArray(v), `${path}.${key}`, "must be an array")) {
      return false
    }
    v.forEach((item, idx) => {
      const p = `${path}.${key}[${idx}]`
      if (each === "string") {
        req(typeof item === "string", p, "must be a string")
      } else if (req(isObject(item), p, "must be an object")) {
        each(item, p)
      }
    })
    return true
  }
  return { req, str, optStr, oneOf, optOneOf, arr }
}

function checkCompany(c, company, path) {
  if (!c.req(isObject(company), path, "is required (an object)")) return
  c.str(company, "name", path)
  c.oneOf(company, "kind", COMPANY_KINDS, path)
  c.optStr(company, "website", path)
  c.optStr(company, "stage", path)
  c.req(
    company.dealId === undefined ||
      company.dealId === null ||
      typeof company.dealId === "string" ||
      isNumber(company.dealId),
    `${path}.dealId`,
    "must be a string or number when set"
  )
}

function checkPreparedBy(c, p, path) {
  if (!c.req(isObject(p), path, "is required (an object)")) return
  c.str(p, "agent", path)
  c.oneOf(p, "runtime", RUNTIMES, path)
  c.optStr(p, "person", path)
}

function checkDate(c, v, path) {
  c.req(
    nonEmpty(v) && !Number.isNaN(Date.parse(v)),
    path,
    "must be an ISO 8601 date string"
  )
}

function checkDeckAudit(c, audit, path, cites) {
  if (!c.req(isObject(audit), path, "is required (an object)")) return
  c.arr(audit, "claims", path, (claim, p) => {
    c.str(claim, "claim", p)
    c.oneOf(claim, "status", CLAIM_STATUSES, p)
    c.optStr(claim, "basis", p)
    c.optStr(claim, "note", p)
    cites(claim, p)
  })
  c.arr(audit, "missingSlides", path, "string", { optional: true })
  c.arr(audit, "inconsistencies", path, "string", { optional: true })
  c.req(
    audit.slides === undefined ||
      audit.slides === null ||
      isNumber(audit.slides),
    `${path}.slides`,
    "must be a number when set"
  )
}

/** A present section must be the right shape; an absent one is fine. */
function present(v) {
  return v !== undefined && v !== null
}

function checkScreening(c, b, path, cites) {
  if (present(b.verdict)) {
    const vp = `${path}.verdict`
    if (c.req(isObject(b.verdict), vp, "must be an object")) {
      c.str(b.verdict, "decision", vp)
      c.req(
        typeof b.verdict.reason === "string",
        `${vp}.reason`,
        "must be a string"
      )
      c.optStr(b.verdict, "band", vp)
      c.arr(b.verdict, "decidedBy", vp, "string", { optional: true })
      c.optStr(b.verdict, "referTo", vp)
      if (present(b.verdict.hardFilters)) {
        c.req(
          isObject(b.verdict.hardFilters),
          `${vp}.hardFilters`,
          "must be an object"
        )
      }
    }
  }
  if (present(b.stageBar)) c.str(b, "stageBar", path)
  const s = b.scorecard
  const sp = `${path}.scorecard`
  if (present(s) && c.req(isObject(s), sp, "must be an object")) {
    c.req(
      isNumber(s.rubricVersion) || nonEmpty(s.rubricVersion),
      `${sp}.rubricVersion`,
      "is required (the Rubric version score_company returned)"
    )
    if (present(s.scale)) {
      c.req(
        isObject(s.scale) && isNumber(s.scale.min) && isNumber(s.scale.max),
        `${sp}.scale`,
        "must be { min, max } numbers"
      )
    }
    if (c.req(isObject(s.composite), `${sp}.composite`, "is required")) {
      c.req(
        s.composite.score === null || isNumber(s.composite.score),
        `${sp}.composite.score`,
        "must be a number or null"
      )
      c.str(s.composite, "band", `${sp}.composite`)
    }
    if (c.req(isObject(s.published), `${sp}.published`, "is required")) {
      c.req(
        s.published.score === null || isNumber(s.published.score),
        `${sp}.published.score`,
        "must be a number or null"
      )
      c.req(
        typeof s.published.withheld === "boolean",
        `${sp}.published.withheld`,
        "must be a boolean"
      )
      c.arr(s.published, "withheldBecause", `${sp}.published`, "string", {
        optional: true,
      })
    }
    c.req(
      isNumber(s.coverage) && s.coverage >= 0 && s.coverage <= 1,
      `${sp}.coverage`,
      "must be a number from 0 to 1"
    )
    c.arr(s, "criteria", sp, (cr, p) => {
      c.str(cr, "key", p)
      c.optStr(cr, "name", p)
      c.oneOf(cr, "status", CRITERION_STATUSES, p)
      c.req(
        typeof cr.reasoning === "string",
        `${p}.reasoning`,
        "must be a string"
      )
      c.arr(cr, "sources", p, "string", { optional: true })
      if (cr.status === "scored") {
        c.req(isNumber(cr.score), `${p}.score`, "is required when scored")
      } else if (cr.status === "not_assessed") {
        c.req(
          cr.score === undefined || cr.score === null,
          `${p}.score`,
          "must be absent when not_assessed (missing evidence is never a score)"
        )
      }
      c.req(
        cr.weight === undefined || cr.weight === null || isNumber(cr.weight),
        `${p}.weight`,
        "must be a number when set"
      )
      cites(cr, p)
    })
    c.arr(s, "missingConnectors", sp, "string", { optional: true })
    c.arr(s, "highlights", sp, "string", { optional: true })
    c.arr(s, "risks", sp, "string", { optional: true })
  }
  const opt = { optional: true }
  c.arr(
    b,
    "founders",
    path,
    (f, p) => {
      c.str(f, "name", p)
      c.optStr(f, "role", p)
      c.req(typeof f.history === "string", `${p}.history`, "must be a string")
      c.optOneOf(f, "verification", VERIFICATION, p)
      c.optStr(f, "gap", p)
      cites(f, p)
    },
    opt
  )
  c.optStr(b, "foundersNote", path)
  if (present(b.deckAudit)) {
    checkDeckAudit(c, b.deckAudit, `${path}.deckAudit`, cites)
  }
  c.arr(
    b,
    "research",
    path,
    (r, p) => {
      c.str(r, "topic", p)
      c.oneOf(r, "status", RESEARCH_STATUSES, p)
      c.optStr(r, "findings", p)
      c.optStr(r, "connector", p)
      cites(r, p)
    },
    opt
  )
  c.arr(b, "missingConnectors", path, "string", opt)
  c.arr(
    b,
    "questions",
    path,
    (q, p) => {
      c.str(q, "question", p)
      c.optStr(q, "why", p)
    },
    opt
  )
}

/** Keys of a body that count as structured sections, per type. */
const SECTION_KEYS = {
  screening: [
    "verdict",
    "stageBar",
    "scorecard",
    "founders",
    "foundersNote",
    "deckAudit",
    "research",
    "questions",
  ],
  diligence: [
    "stageBar",
    "workstreams",
    "dataRoom",
    "unitEconomics",
    "capTable",
    "deckAudit",
    "gaps",
    "requests",
  ],
  ic_memo: [
    "recommendation",
    "company",
    "whyNow",
    "whyTeam",
    "whatHasToBeTrue",
    "traction",
    "terms",
    "risks",
    "bearCase",
    "networkFit",
  ],
}

function hasContent(v) {
  if (!present(v)) return false
  if (typeof v === "string") return v.trim().length > 0
  if (Array.isArray(v)) return v.length > 0
  return true
}

function checkAnalysis(c, v, path) {
  if (v === undefined || v === null) return
  if (!c.req(isObject(v), path, "must be an object when set")) return
  c.req(typeof v.analysis === "string", `${path}.analysis`, "must be a string")
  c.arr(v, "missing", path, "string", { optional: true })
}

function checkDiligence(c, b, path, cites) {
  const opt = { optional: true }
  if (present(b.stageBar)) c.str(b, "stageBar", path)
  const seen = new Set()
  c.arr(
    b,
    "workstreams",
    path,
    (w, p) => {
      if (c.oneOf(w, "key", WORKSTREAMS, p)) {
        c.req(!seen.has(w.key), `${p}.key`, `"${w.key}" is listed twice`)
        seen.add(w.key)
      }
      c.arr(w, "needs", p, (n, np) => {
        c.str(n, "item", np)
        c.oneOf(n, "kind", NEED_KINDS, np)
        c.oneOf(n, "status", NEED_STATUSES, np)
        c.optStr(n, "note", np)
        cites(n, np)
      })
      c.optStr(w, "notes", p)
    },
    opt
  )
  c.arr(
    b,
    "dataRoom",
    path,
    (d, p) => {
      c.str(d, "document", p)
      c.oneOf(d, "status", DATA_ROOM_STATUSES, p)
      c.optOneOf(d, "workstream", WORKSTREAMS, p)
      c.optStr(d, "note", p)
      cites(d, p)
    },
    opt
  )
  checkAnalysis(c, b.unitEconomics, `${path}.unitEconomics`)
  checkAnalysis(c, b.capTable, `${path}.capTable`)
  if (present(b.deckAudit)) {
    checkDeckAudit(c, b.deckAudit, `${path}.deckAudit`, cites)
  }
  c.arr(
    b,
    "gaps",
    path,
    (g, p) => {
      c.str(g, "task", p)
      c.str(g, "closes", p)
      c.optStr(g, "owner", p)
      c.optOneOf(g, "workstream", WORKSTREAMS, p)
    },
    opt
  )
  // What the company is asked for, written to be sent as is: the founder
  // request list (Excel) is built from these and nothing else.
  c.arr(
    b,
    "requests",
    path,
    (r, p) => {
      c.str(r, "request", p)
      c.optStr(r, "detail", p)
      c.optOneOf(r, "workstream", WORKSTREAMS, p)
      c.optOneOf(r, "priority", REQUEST_PRIORITIES, p)
      if (present(r.due)) {
        c.req(
          typeof r.due === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.due),
          `${p}.due`,
          "must be a YYYY-MM-DD date"
        )
      }
    },
    opt
  )
}

function checkIcMemo(c, b, path) {
  const opt = { optional: true }
  if (
    present(b.header) &&
    c.req(isObject(b.header), `${path}.header`, "must be an object")
  ) {
    c.optOneOf(
      b.header,
      "scorecardStatus",
      ["draft", "confirmed"],
      `${path}.header`
    )
    for (const k of ["stage", "ask", "valuation"])
      c.optStr(b.header, k, `${path}.header`)
    c.optOneOf(b.header, "valuationBasis", ["pre", "post"], `${path}.header`)
  }
  for (const k of [
    "recommendation",
    "company",
    "whyNow",
    "whyTeam",
    "traction",
    "terms",
    "bearCase",
    "networkFit",
  ]) {
    c.req(
      optString(b[k]),
      `${path}.${k}`,
      "must be a string (Markdown) when set"
    )
  }
  c.arr(
    b,
    "whatHasToBeTrue",
    path,
    (t, p) => {
      c.str(t, "statement", p)
      c.str(t, "test", p)
      c.optOneOf(t, "status", TRUTH_STATUSES, p)
    },
    opt
  )
  c.arr(
    b,
    "risks",
    path,
    (r, p) => {
      c.str(r, "risk", p)
      c.optStr(r, "mitigant", p)
      c.oneOf(r, "status", RISK_STATUSES, p)
    },
    opt
  )
  c.arr(b, "agentDerived", path, "string", opt)
  if (Array.isArray(b.agentDerived)) {
    b.agentDerived.forEach((k, idx) =>
      c.req(
        MEMO_SECTIONS.includes(k),
        `${path}.agentDerived[${idx}]`,
        `must be one of ${MEMO_SECTIONS.join(", ")}`
      )
    )
  }
}

function checkDeliverable(input, path, errors) {
  const c = makeChecker(errors)
  if (!c.req(isObject(input), path, "must be an object")) return
  c.req(
    input.format === DELIVERABLE_FORMAT ||
      LEGACY_DELIVERABLE_FORMATS.includes(input.format),
    `${path}.format`,
    `must be "${DELIVERABLE_FORMAT}"`
  )
  const typed = c.oneOf(input, "type", DELIVERABLE_TYPES, path)
  checkCompany(c, input.company, `${path}.company`)
  checkDate(c, input.generatedAt, `${path}.generatedAt`)
  checkPreparedBy(c, input.preparedBy, `${path}.preparedBy`)
  c.req(input.status === "draft", `${path}.status`, 'must be "draft"')
  c.optStr(input, "summary", path)
  // The network's short name for labels (whoami's house.short_name).
  c.optStr(input, "house", path)
  c.req(
    input.rubricVersion === undefined ||
      input.rubricVersion === null ||
      isNumber(input.rubricVersion) ||
      nonEmpty(input.rubricVersion),
    `${path}.rubricVersion`,
    "must be a number or string when set"
  )
  const ids = new Set()
  c.arr(input, "sources", path, (s, p) => {
    if (c.str(s, "id", p)) {
      c.req(!ids.has(s.id), `${p}.id`, `"${s.id}" is used twice`)
      ids.add(s.id)
    }
    c.str(s, "title", p)
    c.optStr(s, "url", p)
    c.optStr(s, "kind", p)
  })
  const cites = (obj, p) => {
    if (obj.sourceIds === undefined || obj.sourceIds === null) return
    if (
      !c.req(Array.isArray(obj.sourceIds), `${p}.sourceIds`, "must be an array")
    )
      return
    obj.sourceIds.forEach((id, idx) =>
      c.req(
        typeof id === "string" && ids.has(id),
        `${p}.sourceIds[${idx}]`,
        `names no source in sources (${JSON.stringify(id)})`
      )
    )
  }
  c.arr(input, "openItems", path, (o, p) => {
    c.str(o, "text", p)
    c.optStr(o, "owner", p)
    c.optStr(o, "closes", p)
    cites(o, p)
  })
  if (!typed) return
  const bp = `${path}.body`
  if (!c.req(isObject(input.body), bp, "is required (an object)")) return
  c.optStr(input.body, "document", bp)
  c.req(
    hasContent(input.body.document) ||
      own(SECTION_KEYS, input.type, []).some((k) => hasContent(input.body[k])),
    bp,
    "has no sections and no document"
  )
  if (input.type === "screening") checkScreening(c, input.body, bp, cites)
  if (input.type === "diligence") checkDiligence(c, input.body, bp, cites)
  if (input.type === "ic_memo") checkIcMemo(c, input.body, bp)
}

/**
 * Check a deliverable against the v1 format. Never throws. Strict about
 * required fields, enum values and source references; optional arrays may
 * be left out. `value` is the input with those arrays defaulted to [].
 */
export function validateDeliverable(input) {
  const errors = []
  try {
    checkDeliverable(input, "deliverable", errors)
  } catch (err) {
    errors.push(
      `deliverable: could not be read (${String(err?.message ?? err)})`
    )
  }
  if (errors.length > 0) return { ok: false, errors }
  const value = normalize(upgrade(input))
  const warnings = sourceWarnings(value)
  return warnings.length > 0
    ? { ok: true, value, warnings }
    : { ok: true, value }
}

/**
 * Warnings that do not make a deliverable invalid. Today one: `sources`
 * lists only the deck while the Markdown links to other pages, so the cover
 * and the Sources section undercount what the agent read. Agents should
 * register every source they cite.
 */
function sourceWarnings(d) {
  const registered = d.sources ?? []
  const onlyDeck =
    registered.length === 0 ||
    registered.every((s) => String(s.kind ?? "").toLowerCase() === "deck")
  if (!onlyDeck) return []
  const known = new Set(
    registered.filter((s) => s.url).map((s) => normalizeUrl(s.url))
  )
  const extra = [...markdownLinks(d)].filter((u) => !known.has(u))
  if (extra.length === 0) return []
  return [
    `deliverable.sources: lists ${registered.length === 0 ? "no sources" : "only the deck"}, but the Markdown links ${extra.length} other ${extra.length === 1 ? "page" : "pages"}; register each cited source in sources`,
  ]
}

/** Check a package and every deliverable in it. Never throws. */
export function validatePackage(input) {
  const errors = []
  try {
    const c = makeChecker(errors)
    if (c.req(isObject(input), "package", "must be an object")) {
      c.req(
        input.format === PACKAGE_FORMAT ||
          LEGACY_PACKAGE_FORMATS.includes(input.format),
        "package.format",
        `must be "${PACKAGE_FORMAT}"`
      )
      checkCompany(c, input.company, "package.company")
      checkDate(c, input.generatedAt, "package.generatedAt")
      checkPreparedBy(c, input.preparedBy, "package.preparedBy")
      if (
        c.req(
          Array.isArray(input.deliverables) && input.deliverables.length > 0,
          "package.deliverables",
          "must be a non-empty array"
        )
      ) {
        input.deliverables.forEach((d, idx) =>
          checkDeliverable(d, `package.deliverables[${idx}]`, errors)
        )
      }
    }
  } catch (err) {
    errors.push(`package: could not be read (${String(err?.message ?? err)})`)
  }
  if (errors.length > 0) return { ok: false, errors }
  return {
    ok: true,
    value: {
      ...input,
      format: PACKAGE_FORMAT,
      company: upgradeCompany(input.company),
      deliverables: input.deliverables.map((d) => normalize(upgrade(d))),
    },
  }
}

/** The current format name and company kind for a document from before the rename. */
function upgrade(d) {
  return {
    ...d,
    format: DELIVERABLE_FORMAT,
    company: upgradeCompany(d.company),
  }
}

function upgradeCompany(company) {
  return company?.kind === "anchor_angels"
    ? { ...company, kind: "deal" }
    : company
}

function normalize(d) {
  const b = { ...d.body }
  const audit = (a) =>
    a
      ? {
          ...a,
          claims: a.claims ?? [],
          missingSlides: a.missingSlides ?? [],
          inconsistencies: a.inconsistencies ?? [],
        }
      : undefined
  b.deckAudit = audit(b.deckAudit)
  if (d.type === "screening") {
    if (b.scorecard) {
      b.scorecard = {
        ...b.scorecard,
        highlights: b.scorecard.highlights ?? [],
        risks: b.scorecard.risks ?? [],
      }
    }
    // One list of missing connectors, from the body and the scorecard.
    b.missingConnectors = [
      ...new Set([
        ...(b.missingConnectors ?? []),
        ...(b.scorecard?.missingConnectors ?? []),
      ]),
    ]
    b.research = b.research ?? []
  }
  if (d.type === "diligence") {
    b.gaps = b.gaps ?? []
    b.requests = b.requests ?? []
  }
  if (d.type === "ic_memo") {
    b.agentDerived = b.agentDerived ?? []
  }
  return {
    ...d,
    sources: d.sources ?? [],
    openItems: d.openItems ?? [],
    body: b,
  }
}

export class DeliverableValidationError extends Error {
  constructor(errors) {
    super(`Invalid deliverable:\n- ${errors.join("\n- ")}`)
    this.name = "DeliverableValidationError"
    this.errors = errors
  }
}

// ---------------------------------------------------------------------------
// Open items
// ---------------------------------------------------------------------------

function criterionLabel(cr) {
  return cr.name || humanize(cr.key)
}

/**
 * What counts as an open item, in one place:
 * - every deliverable: its explicit `openItems`;
 * - screening: each `not_assessed` criterion (what would be needed), each
 *   research topic `not_checked`, and one line naming the missing research
 *   connectors;
 * - diligence: each gap (task, what closes it, suggested owner);
 * - IC memo: its `openItems` (section 10 of memo-format) and each risk still
 *   `open`.
 * Screening call questions are not open items; they stay in the report.
 */
export function collectOpenItems(d) {
  const items = d.openItems.map((o) => ({ ...o, from: d.type }))
  if (d.type === "screening") {
    for (const cr of d.body.scorecard?.criteria ?? []) {
      if (cr.status === "not_assessed") {
        items.push({
          text: `Not assessed: ${criterionLabel(cr)}${cr.reasoning ? `. Needed: ${cr.reasoning}` : ""}`,
          from: d.type,
        })
      }
    }
    for (const r of d.body.research) {
      if (r.status === "not_checked") {
        items.push({
          text: `Not checked: ${r.topic}${r.connector ? ` (needs ${r.connector})` : ""}`,
          from: d.type,
        })
      }
    }
    if (d.body.missingConnectors.length > 0) {
      items.push({
        text: `Research connectors not available: ${d.body.missingConnectors.join(", ")}`,
        from: d.type,
      })
    }
  }
  if (d.type === "diligence") {
    for (const g of d.body.gaps) {
      items.push({
        text: g.task,
        closes: g.closes,
        owner: g.owner,
        from: d.type,
      })
    }
  }
  if (d.type === "ic_memo") {
    for (const r of d.body.risks ?? []) {
      if (r.status === "open") {
        items.push({ text: `Open risk: ${r.risk}`, from: d.type })
      }
    }
  }
  return items
}

// ---------------------------------------------------------------------------
// File names and packages
// ---------------------------------------------------------------------------

/** Lowercase ASCII and hyphens, at most 60 characters, never empty. */
export function slugify(name) {
  const slug = String(name ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "")
  return slug || "company"
}

/**
 * The calendar day (YYYY-MM-DD) of an ISO instant in a time zone, the deal
 * team's by default: 03:00 UTC on the 27th is still the 26th in Nashville.
 */
export function localDay(iso, timeZone = DEFAULT_TIME_ZONE) {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return "undated"
  let parts
  try {
    parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || DEFAULT_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(t))
  } catch {
    // An unknown zone name: fall back to the deal team's.
    return localDay(iso, DEFAULT_TIME_ZONE)
  }
  const get = (type) => parts.find((p) => p.type === type)?.value
  return `${get("year")}-${get("month")}-${get("day")}`
}

export function deliverableFileName(d, options = {}) {
  return `${slugify(d.company?.name)}-${own(TYPE_SLUGS, d.type, "deliverable")}-${localDay(d.generatedAt, options.timeZone)}.html`
}

export function packageFileName(p, options = {}) {
  return `${slugify(p.company?.name)}-package-${localDay(p.generatedAt, options.timeZone)}.html`
}

function sameCompany(a, b) {
  if (
    a.dealId !== undefined &&
    a.dealId !== null &&
    b.dealId !== undefined &&
    b.dealId !== null
  ) {
    return String(a.dealId) === String(b.dealId)
  }
  return a.name.trim().toLowerCase() === b.name.trim().toLowerCase()
}

function rubricVersionOf(d) {
  if (d.type === "screening" && d.body.scorecard)
    return d.body.scorecard.rubricVersion
  return d.rubricVersion ?? null
}

/**
 * Assemble a package from deliverables about one company: ordered
 * screening, diligence, IC memo (newest first within a type), with the
 * Rubric version taken from the screening scorecard when there is one.
 * Throws when there are none, one is invalid, or they name different
 * companies.
 */
export function buildPackage(deliverables, meta) {
  if (!Array.isArray(deliverables) || deliverables.length === 0) {
    throw new Error("A package needs at least one deliverable")
  }
  const valid = deliverables.map((d) => {
    const r = validateDeliverable(d)
    if (!r.ok) throw new DeliverableValidationError(r.errors)
    return r.value
  })
  const company = meta?.company ?? valid[0].company
  for (const d of valid) {
    if (!sameCompany(company, d.company)) {
      throw new Error(
        `Package for ${company.name} cannot include a ${own(TYPE_LABELS, d.type, "deliverable")} for ${d.company.name}`
      )
    }
  }
  const order = (t) => DELIVERABLE_TYPES.indexOf(t)
  const sorted = [...valid].sort(
    (a, b) =>
      order(a.type) - order(b.type) ||
      Date.parse(b.generatedAt) - Date.parse(a.generatedAt)
  )
  const rubric = sorted
    .map(rubricVersionOf)
    .find((v) => v !== null && v !== undefined)
  const pkg = {
    format: PACKAGE_FORMAT,
    company,
    generatedAt: meta?.generatedAt ?? new Date().toISOString(),
    preparedBy: meta?.preparedBy ?? sorted[0].preparedBy,
    deliverables: sorted,
  }
  if (rubric !== undefined) pkg.rubricVersion = rubric
  const house = meta?.house ?? sorted.find((d) => d.house)?.house
  if (house) pkg.house = house
  return pkg
}

function normalizeUrl(url) {
  return String(url).trim().replace(/\/+$/, "").toLowerCase()
}

const MD_LINK = /\[[^\]\n]+\]\((https?:\/\/[^)\s]+)\)/gi

function collectLinks(value, out, depth = 0) {
  if (depth > 8 || value === null || value === undefined) return
  if (typeof value === "string") {
    for (const m of value.matchAll(MD_LINK)) {
      if (safeHref(m[1])) out.add(normalizeUrl(m[1]))
    }
  } else if (Array.isArray(value)) {
    for (const v of value) collectLinks(v, out, depth + 1)
  } else if (typeof value === "object") {
    for (const v of Object.values(value)) collectLinks(v, out, depth + 1)
  }
}

/** Every http(s) URL a deliverable's Markdown links to (summary and body). */
function markdownLinks(d) {
  const out = new Set()
  collectLinks(d.summary, out)
  collectLinks(d.body, out)
  return out
}

/**
 * Distinct sources across deliverables: each registered source (by URL when
 * it has one, else by title), plus every http(s) page the Markdown links to
 * that is not already registered. An agent that cites a page inline has read
 * it, so the cover counts it even when `sources` was left short.
 */
export function countSources(deliverables) {
  const seen = new Set()
  for (const d of deliverables) {
    for (const s of d.sources ?? []) {
      seen.add(
        s.url ? `u:${normalizeUrl(s.url)}` : `t:${s.title.trim().toLowerCase()}`
      )
    }
    for (const url of markdownLinks(d)) seen.add(`u:${url}`)
  }
  return seen.size
}

// ---------------------------------------------------------------------------
// Rendering helpers
// ---------------------------------------------------------------------------

function humanize(key) {
  const s = String(key ?? "")
    .replace(/[_-]+/g, " ")
    .trim()
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""
}

function badge(tone, label) {
  return `<span class="badge tone-${tone}">${escapeHtml(label)}</span>`
}

function statusBadge(map, status) {
  return badge(
    own(map, status, "neutral"),
    own(STATUS_LABELS, status, humanize(status))
  )
}

function mono(value) {
  return `<span class="mono">${escapeHtml(value)}</span>`
}

function formatNumber(n) {
  return n === null || n === undefined ? "none" : String(n)
}

/** Per-deliverable rendering context: anchors and citation numbers. */
function context(d, prefix, headingLevel) {
  const index = new Map(d.sources.map((s, i) => [s.id, i + 1]))
  const cite = (id) => {
    const n = index.get(id)
    return n
      ? `<sup class="cite"><a href="#${prefix}src-${n}">${n}</a></sup>`
      : null
  }
  const cites = (ids) => (ids ?? []).map(cite).filter(Boolean).join("")
  const h = Math.min(headingLevel, 6)
  return {
    prefix,
    h,
    md: { cite, headingBase: Math.min(h + 1, 6) },
    cite,
    cites,
  }
}

function section(ctx, id, title, content, extra = "") {
  return `<section class="section" id="${ctx.prefix}${id}"${extra}>
<h${ctx.h}>${escapeHtml(title)}</h${ctx.h}>
${content}
</section>`
}

function md(ctx, text) {
  return renderMarkdown(text, ctx.md)
}
function inline(ctx, text) {
  return renderInlineMarkdown(text, ctx.md)
}

function empty(text) {
  return `<p class="empty">${escapeHtml(text)}</p>`
}

function table(headers, rows, cls = "") {
  if (rows.length === 0) return ""
  return `<div class="table-wrap"><table${cls ? ` class="${cls}"` : ""}><thead><tr>${headers
    .map((h) => `<th>${escapeHtml(h)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`
}

function deckAuditSection(ctx, audit, id = "deck-audit") {
  const facts = []
  if (audit.slides !== undefined && audit.slides !== null) {
    facts.push(`Slides: ${mono(audit.slides)}`)
  }
  const counts = CLAIM_STATUSES.map((s) => [
    s,
    audit.claims.filter((c) => c.status === s).length,
  ]).filter(([, n]) => n > 0)
  if (counts.length > 0) {
    facts.push(
      `Claims: ${counts.map(([s, n]) => `${mono(n)} ${escapeHtml(own(STATUS_LABELS, s, humanize(s)).toLowerCase())}`).join(" · ")}`
    )
  }
  const missing =
    audit.missingSlides.length > 0
      ? `<p>Missing standard slides: ${escapeHtml(audit.missingSlides.join(", "))}</p>`
      : ""
  const rows = audit.claims.map((c) => [
    c.slide === undefined || c.slide === null ? "" : mono(c.slide),
    `<q>${inline(ctx, c.claim)}</q>`,
    statusBadge(TONES.claim, c.status),
    escapeHtml(c.basis ?? ""),
    `${inline(ctx, c.note ?? "")}${ctx.cites(c.sourceIds)}`,
  ])
  const inconsistencies =
    audit.inconsistencies.length > 0
      ? `<h${ctx.h + 1}>Inconsistencies</h${ctx.h + 1}><ul>${audit.inconsistencies
          .map((t) => `<li>${inline(ctx, t)}</li>`)
          .join("")}</ul>`
      : ""
  const body =
    rows.length > 0
      ? table(["Slide", "Claim", "Status", "Basis", "Evidence"], rows)
      : empty("No deck claims were audited.")
  return section(
    ctx,
    id,
    "Deck audit",
    `${facts.length ? `<p class="facts">${facts.join(" · ")}</p>` : ""}${missing}${body}${inconsistencies}`
  )
}

function sourcesSection(ctx, d) {
  if (d.sources.length === 0) return ""
  const items = d.sources
    .map((s, i) => {
      const href = safeHref(s.url)
      const title = href ? link(href, escapeHtml(s.title)) : escapeHtml(s.title)
      const url =
        s.url && !href ? ` <span class="muted">${escapeHtml(s.url)}</span>` : ""
      const kind = s.kind
        ? ` <span class="muted">(${escapeHtml(s.kind)})</span>`
        : ""
      return `<li id="${ctx.prefix}src-${i + 1}">${title}${kind}${url}</li>`
    })
    .join("")
  return section(ctx, "sources", "Sources", `<ol class="sources">${items}</ol>`)
}

function openItemsList(items, { showFrom = false } = {}) {
  if (items.length === 0) return empty("No open items.")
  return `<ol class="open-items">${items
    .map((o) => {
      const meta = [
        o.closes ? `Closes with: ${escapeHtml(o.closes)}` : "",
        o.owner ? `Owner: ${escapeHtml(o.owner)}` : "",
        showFrom
          ? `From: ${escapeHtml(own(TYPE_LABELS, o.from, humanize(o.from)))}`
          : "",
      ].filter(Boolean)
      return `<li>${renderInlineMarkdown(o.text)}${meta.length ? `<div class="item-meta">${meta.join(" · ")}</div>` : ""}</li>`
    })
    .join("")}</ol>`
}
// ---------------------------------------------------------------------------
// Screening report
// ---------------------------------------------------------------------------

function filterMark(v) {
  if (v === true) return badge("success", "Met")
  if (v === false) return badge("danger", "Not met")
  return badge("neutral", "Not checked")
}

function statusRec(rec) {
  return rec
    ? badge(own(TONES.recommendation, rec, "neutral"), humanize(rec))
    : ""
}

function percent(fraction) {
  return `${Number((fraction * 100).toFixed(1))}%`
}

/** A criterion's free-text sources: URLs become links, the rest text. */
function freeSources(list) {
  if (!list || list.length === 0) return ""
  return `<div class="item-meta">Sources: ${list
    .map((s) => {
      const href = safeHref(s)
      return href ? link(href, escapeHtml(s)) : escapeHtml(s)
    })
    .join("; ")}</div>`
}

function list(ctx, title, items) {
  return items && items.length > 0
    ? `<h${ctx.h + 1}>${escapeHtml(title)}</h${ctx.h + 1}><ul>${items
        .map((t) => `<li>${inline(ctx, t)}</li>`)
        .join("")}</ul>`
    : ""
}

function screeningVerdict(ctx, v) {
  const filters = v.hardFilters
    ? `<p class="facts">Mandate ${filterMark(v.hardFilters.mandate)} · Round size ${filterMark(v.hardFilters.roundSize)} · Network connection ${filterMark(v.hardFilters.networkConnection)}</p>`
    : ""
  const decided =
    v.decidedBy && v.decidedBy.length > 0
      ? `<p class="label">Decided by</p><ol>${v.decidedBy.map((t) => `<li>${inline(ctx, t)}</li>`).join("")}</ol>`
      : ""
  return section(
    ctx,
    "verdict",
    "Verdict",
    `<div class="verdict"><p class="verdict-decision">${escapeHtml(v.decision)}</p>${v.band ? `<p class="verdict-band">${statusRec(v.band)}</p>` : ""}<div class="verdict-reason">${md(ctx, v.reason)}</div>${v.referTo ? `<p>Refer to: ${inline(ctx, v.referTo)}</p>` : ""}</div>${decided}${filters}`
  )
}

function screeningScorecard(ctx, s) {
  const withheld = s.published.withheld
    ? `Withheld${s.published.withheldBecause?.length ? ` (${escapeHtml(s.published.withheldBecause.join(", "))})` : ""}`
    : "Published"
  const assessed = s.criteria.filter((c) => c.status === "scored").length
  const of = s.scale
    ? ` <span class="muted">of ${escapeHtml(s.scale.max)}</span>`
    : ""
  const summary = `<dl class="facts-grid">
<div><dt>Rubric version</dt><dd>${mono(`v${s.rubricVersion}`)}</dd></div>
<div><dt>Composite</dt><dd>${mono(formatNumber(s.composite.score))}${s.composite.score === null ? "" : of} ${statusRec(s.composite.band)}</dd></div>
<div><dt>Published score</dt><dd>${s.published.score === null ? "Withheld" : `${mono(s.published.score)}${of}`}</dd></div>
<div><dt>Coverage</dt><dd>${mono(percent(s.coverage))} of Rubric weight</dd></div>
<div><dt>Assessed</dt><dd>${mono(`${assessed} of ${s.criteria.length}`)}</dd></div>
<div><dt>Gate</dt><dd>${withheld}</dd></div>
</dl>`
  const rows = s.criteria.map((c) => [
    escapeHtml(criterionLabel(c)),
    c.weight === undefined || c.weight === null ? "" : mono(c.weight),
    c.status === "scored"
      ? `<span class="score">${mono(c.score)}</span>`
      : badge("neutral", STATUS_LABELS.not_assessed),
    `${c.status === "not_assessed" ? '<p class="muted">Needed:</p>' : ""}${md(ctx, c.reasoning)}${ctx.cites(c.sourceIds)}${freeSources(c.sources)}`,
  ])
  return section(
    ctx,
    "scorecard",
    "Scorecard",
    `${summary}${table(["Criterion", "Weight", "Score", "Reasoning"], rows, "scorecard")}${list(ctx, "Highlights", s.highlights)}${list(ctx, "Risks", s.risks)}`
  )
}

/** Structured sections in the fixed order; absent ones are left out. */
function renderScreening(d, ctx) {
  const b = d.body
  const out = []
  if (b.verdict) out.push(screeningVerdict(ctx, b.verdict))
  if (hasContent(b.stageBar)) {
    out.push(section(ctx, "stage-bar", "Stage bar", md(ctx, b.stageBar)))
  }
  if (b.scorecard) out.push(screeningScorecard(ctx, b.scorecard))
  if (hasContent(b.founders) || hasContent(b.foundersNote)) {
    out.push(
      section(
        ctx,
        "founders",
        "Founders",
        `${
          hasContent(b.founders)
            ? table(
                ["Founder", "Role", "Relevant history", "Gap or question"],
                b.founders.map((f) => [
                  `${escapeHtml(f.name)}${f.notChecked ? ` ${badge("neutral", "Not checked")}` : ""}`,
                  escapeHtml(f.role ?? ""),
                  `${f.verification ? `${statusBadge(TONES.verification, f.verification)} ` : ""}${md(ctx, f.history)}${ctx.cites(f.sourceIds)}`,
                  inline(ctx, f.gap ?? ""),
                ])
              )
            : ""
        }${b.foundersNote ? md(ctx, b.foundersNote) : ""}`
      )
    )
  }
  if (b.deckAudit) out.push(deckAuditSection(ctx, b.deckAudit))
  if (b.research.length > 0 || b.missingConnectors.length > 0) {
    const missing =
      b.missingConnectors.length > 0
        ? `<p class="notice">${badge("neutral", "Not checked")} Research connectors not available for this run: ${escapeHtml(b.missingConnectors.join(", "))}. Anything that needed them is marked not checked.</p>`
        : ""
    const items = b.research
      .map(
        (r) =>
          `<li><p class="research-topic">${escapeHtml(r.topic)} ${statusBadge(TONES.research, r.status)}${r.connector ? ` <span class="muted">${escapeHtml(r.connector)}</span>` : ""}</p>${
            r.status === "not_checked"
              ? `<p class="muted">Not checked${r.findings ? `: ${inline(ctx, r.findings)}` : "."}</p>`
              : md(ctx, r.findings ?? "")
          }${ctx.cites(r.sourceIds)}</li>`
      )
      .join("")
    out.push(
      section(
        ctx,
        "research",
        "Research",
        `${missing}${items ? `<ul class="research">${items}</ul>` : ""}`
      )
    )
  }
  if (hasContent(b.questions)) {
    out.push(
      section(
        ctx,
        "questions",
        "Questions for the screening call",
        `<ol class="questions">${b.questions
          .map(
            (q) =>
              `<li>${inline(ctx, q.question)}${q.why ? `<div class="item-meta">${inline(ctx, q.why)}</div>` : ""}</li>`
          )
          .join("")}</ol>`
      )
    )
  }
  return out
}

// ---------------------------------------------------------------------------
// Diligence plan
// ---------------------------------------------------------------------------

function renderDiligence(d, ctx) {
  const b = d.body
  const out = []
  if (hasContent(b.stageBar)) {
    out.push(section(ctx, "stage-bar", "Stage bar", md(ctx, b.stageBar)))
  }
  if (b.workstreams) {
    const byKey = new Map(b.workstreams.map((w) => [w.key, w]))
    const streams = WORKSTREAMS.filter((k) => byKey.has(k))
      .map((k) => {
        const w = byKey.get(k)
        const rows = w.needs.map((n) => [
          `${inline(ctx, n.item)}${ctx.cites(n.sourceIds)}`,
          escapeHtml(humanize(n.kind)),
          statusBadge(TONES.need, n.status),
          inline(ctx, n.note ?? ""),
        ])
        return `<div class="workstream" id="${ctx.prefix}ws-${k}"><h${ctx.h + 1}>${escapeHtml(own(WORKSTREAM_LABELS, k, humanize(k)))}</h${ctx.h + 1}>${
          rows.length > 0
            ? table(["Needed", "Kind", "Status", "Note"], rows)
            : empty("Nothing listed.")
        }${w.notes ? md(ctx, w.notes) : ""}</div>`
      })
      .join("")
    const notPlanned = WORKSTREAMS.filter((k) => !byKey.has(k))
    out.push(
      section(
        ctx,
        "workstreams",
        "Workstreams",
        `${streams || empty("No workstreams were planned.")}${
          notPlanned.length > 0
            ? `<p class="muted">Not planned: ${escapeHtml(notPlanned.map((k) => own(WORKSTREAM_LABELS, k, humanize(k))).join(", "))}</p>`
            : ""
        }`
      )
    )
  }
  if (b.dataRoom) {
    const counts = DATA_ROOM_STATUSES.map((s) => [
      s,
      b.dataRoom.filter((x) => x.status === s).length,
    ]).filter(([, n]) => n > 0)
    out.push(
      section(
        ctx,
        "data-room",
        "Data room audit",
        `${counts.length ? `<p class="facts">${counts.map(([s, n]) => `${mono(n)} ${escapeHtml(own(STATUS_LABELS, s, humanize(s)).toLowerCase())}`).join(" · ")}</p>` : ""}${
          b.dataRoom.length > 0
            ? table(
                ["Document", "Workstream", "Status", "Note"],
                b.dataRoom.map((x) => [
                  `${inline(ctx, x.document)}${ctx.cites(x.sourceIds)}`,
                  escapeHtml(
                    x.workstream
                      ? own(
                          WORKSTREAM_LABELS,
                          x.workstream,
                          humanize(x.workstream)
                        )
                      : ""
                  ),
                  statusBadge(TONES.dataRoom, x.status),
                  inline(ctx, x.note ?? ""),
                ])
              )
            : empty("The data room was not audited.")
        }`
      )
    )
  }
  const analysis = (id, title, v) =>
    section(
      ctx,
      id,
      title,
      `${md(ctx, v.analysis)}${
        v.missing?.length
          ? `<p class="label">Missing</p><ul>${v.missing.map((m) => `<li>${inline(ctx, m)}</li>`).join("")}</ul>`
          : ""
      }`
    )
  if (b.unitEconomics) {
    out.push(analysis("unit-economics", "Unit economics", b.unitEconomics))
  }
  if (b.capTable) out.push(analysis("cap-table", "Cap table", b.capTable))
  if (b.deckAudit) out.push(deckAuditSection(ctx, b.deckAudit))
  if (b.gaps.length > 0) {
    out.push(
      section(
        ctx,
        "gaps",
        "Gaps as tasks",
        table(
          ["Task", "Closes with", "Suggested owner", "Workstream"],
          b.gaps.map((g) => [
            inline(ctx, g.task),
            inline(ctx, g.closes),
            escapeHtml(g.owner ?? ""),
            escapeHtml(
              g.workstream
                ? own(WORKSTREAM_LABELS, g.workstream, humanize(g.workstream))
                : ""
            ),
          ])
        )
      )
    )
  }
  if (b.requests.length > 0) {
    out.push(
      section(
        ctx,
        "requests",
        "Requests to the company",
        table(
          ["Request", "Workstream", "Priority", "Due"],
          b.requests.map((r) => [
            `${inline(ctx, r.request)}${r.detail ? `<br><span class="muted">${inline(ctx, r.detail)}</span>` : ""}`,
            escapeHtml(
              r.workstream
                ? own(WORKSTREAM_LABELS, r.workstream, humanize(r.workstream))
                : ""
            ),
            statusBadge(TONES.request, r.priority ?? "required"),
            escapeHtml(r.due ?? ""),
          ])
        )
      )
    )
  }
  return out
}

// ---------------------------------------------------------------------------
// IC memo
// ---------------------------------------------------------------------------

/** memo-format's ten sections, in order; absent ones are left out. */
function renderIcMemo(d, ctx) {
  const b = d.body
  const derived = new Set(b.agentDerived)
  const s = (key, id, title, content) =>
    section(
      ctx,
      id,
      title,
      `${
        derived.has(key)
          ? `<p class="notice">${badge("info", "Agent-derived")} Worked out by the agent, not taken from confirmed analysis.</p>`
          : ""
      }${content}`,
      derived.has(key) ? ` data-derived="true"` : ""
    )
  const out = []
  const text = (key, id, title) => {
    if (hasContent(b[key])) out.push(s(key, id, title, md(ctx, b[key])))
  }
  text("recommendation", "recommendation", "Recommendation")
  text("company", "company", "The company in one paragraph")
  text("whyNow", "why-now", "Why now")
  text("whyTeam", "why-team", "Why this team")
  if (b.whatHasToBeTrue) {
    out.push(
      s(
        "whatHasToBeTrue",
        "what-has-to-be-true",
        "What has to be true",
        b.whatHasToBeTrue.length > 0
          ? `<ol class="truths">${b.whatHasToBeTrue
              .map(
                (t) =>
                  `<li>${inline(ctx, t.statement)}${t.status ? ` ${statusBadge(TONES.truth, t.status)}` : ""}<div class="item-meta">Tested by: ${inline(ctx, t.test)}</div></li>`
              )
              .join("")}</ol>`
          : empty("Not stated.")
      )
    )
  }
  text("traction", "traction", "Traction and economics")
  text("terms", "terms", "Terms and returns")
  if (b.risks || hasContent(b.bearCase)) {
    const risks = b.risks ?? []
    const incomplete =
      risks.length < 3
        ? `<p class="notice">${badge("warning", "Incomplete")} The house format needs at least three real risks; this draft lists ${mono(risks.length)}.</p>`
        : ""
    out.push(
      s(
        "risks",
        "risks",
        "Risks and the bear case",
        `${incomplete}${
          risks.length > 0
            ? table(
                ["Risk", "Mitigant", "Status"],
                risks.map((r) => [
                  inline(ctx, r.risk),
                  inline(ctx, r.mitigant ?? ""),
                  statusBadge(TONES.risk, r.status),
                ])
              )
            : ""
        }${hasContent(b.bearCase) ? `<h${ctx.h + 1}>Bear case</h${ctx.h + 1}>${md(ctx, b.bearCase)}` : ""}`
      )
    )
  }
  text("networkFit", "network-fit", "Network fit")
  // Section 10 is part of the house format whenever the memo is structured.
  if (out.length > 0 || d.openItems.length > 0) {
    out.push(
      s(
        "openItems",
        "open-items",
        "Open items",
        openItemsList(d.openItems.map((o) => ({ ...o, from: d.type })))
      )
    )
  }
  return out
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

function companyLine(company, house) {
  const bits = []
  if (company.stage) bits.push(`Stage ${escapeHtml(stageLabel(company.stage))}`)
  bits.push(
    company.kind === "outside"
      ? "Outside company"
      : house
        ? `${escapeHtml(house)} company`
        : "Company on the platform"
  )
  if (company.dealId !== undefined && company.dealId !== null) {
    bits.push(
      link(
        `/deals/${encodeURIComponent(String(company.dealId))}`,
        `Deal ${escapeHtml(company.dealId)}`
      )
    )
  }
  const site = safeHref(company.website)
  if (site) bits.push(link(site, escapeHtml(company.website)))
  else if (company.website) bits.push(escapeHtml(company.website))
  return bits.join(" · ")
}

function runBy(p) {
  return p.person || p.agent
}

function preparedLine(p, generatedAt, timeZone) {
  return `Prepared ${mono(localDay(generatedAt, timeZone))} by ${escapeHtml(p.agent)}${p.person ? ` for ${escapeHtml(p.person)}` : ""} (${escapeHtml(own(RUNTIME_LABELS, p.runtime, p.runtime))})`
}

/** Whether the body has structured sections beyond the verdict and scorecard. */
function hasNarrativeSections(d) {
  return own(SECTION_KEYS, d.type, [])
    .filter((k) => k !== "verdict" && k !== "scorecard")
    .some((k) => hasContent(d.body[k]))
}

function renderParts(d, prefix, headingLevel) {
  const ctx = context(d, prefix, headingLevel)
  const parts =
    d.type === "screening"
      ? renderScreening(d, ctx)
      : d.type === "diligence"
        ? renderDiligence(d, ctx)
        : renderIcMemo(d, ctx)
  if (hasContent(d.body.document)) {
    const main = !hasNarrativeSections(d)
    parts.push(
      section(
        ctx,
        main ? "draft" : "full-draft",
        main ? own(DRAFT_TITLES, d.type, "Draft") : "Full draft",
        `<div class="draft">${md(ctx, d.body.document)}</div>`
      )
    )
  }
  const hasOwnOpenItems =
    d.type === "ic_memo" &&
    parts.some((p) => p.includes(`id="${prefix}open-items"`))
  const open =
    !hasOwnOpenItems && d.openItems.length > 0
      ? section(
          ctx,
          "open-items",
          "Open items",
          openItemsList(d.openItems.map((o) => ({ ...o, from: d.type })))
        )
      : ""
  const summary = d.summary
    ? `<div class="lead">${md(ctx, d.summary)}</div>`
    : ""
  return `${summary}${parts.join("\n")}${open}${sourcesSection(ctx, d)}`
}

const DRAFT_TITLES = {
  screening: "Screening draft",
  diligence: "Plan",
  ic_memo: "Memo",
}

function headerBlock(d, level, timeZone, house) {
  const h = d.type === "ic_memo" ? (d.body.header ?? {}) : {}
  const memoDraft =
    d.type === "ic_memo" && h.scorecardStatus === "draft"
      ? ` ${badge("warning", "Scorecard is a draft")}`
      : ""
  const terms =
    d.type === "ic_memo"
      ? [
          h.stage ? `Stage ${escapeHtml(stageLabel(h.stage))}` : "",
          h.ask
            ? `Ask ${escapeHtml(h.ask)}${h.valuation ? ` at ${escapeHtml(h.valuation)}${h.valuationBasis ? ` ${escapeHtml(h.valuationBasis)}` : ""}` : ""}`
            : "",
        ]
          .filter(Boolean)
          .join(" · ")
      : ""
  const rubric = rubricVersionOf(d)
  return `<p class="doc-type">${escapeHtml(own(TYPE_LABELS, d.type, "Deliverable"))}</p>
<h${level} class="doc-title">${escapeHtml(d.company.name)}</h${level}>
<p class="doc-meta">${companyLine(d.company, d.house ?? house)}</p>
${terms ? `<p class="doc-meta">${terms}</p>` : ""}
<p class="doc-meta">${preparedLine(d.preparedBy, d.generatedAt, timeZone)}${rubric !== undefined && rubric !== null ? ` · Rubric ${mono(`v${rubric}`)}` : ""}</p>
<p class="doc-status">${badge("neutral", "Draft for staff review")}${memoDraft}</p>`
}

// The stylesheet is ours, but `<` is still CSS-escaped so nothing in it can
// close the <style> element; valid CSS never needs a raw `<`.
function page(title, css, body) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="no-referrer">
<meta name="generator" content="SkaFld VC deliverable renderer (${DELIVERABLE_FORMAT})">
<title>${escapeHtml(title)}</title>
<style>${String(css ?? "").replace(/</g, "\\3c ")}</style>
</head>
<body>
${body}
</body>
</html>
`
}

function requireValid(result) {
  if (!result.ok) throw new DeliverableValidationError(result.errors)
  return result.value
}

const DISCLAIMER =
  "Draft for staff review. Not investment, legal or tax advice. A named reviewer confirms scores, memos and triage decisions before they reach members or founders."

/**
 * One deliverable as a self-contained HTML document. Validates first and
 * throws DeliverableValidationError (with `.errors`) when the input is not
 * a v1 deliverable.
 */
export function renderDeliverable(deliverable, options = {}) {
  const d = requireValid(validateDeliverable(deliverable))
  return page(
    `${d.company.name}: ${own(TYPE_LABELS, d.type, "Deliverable")} (draft)`,
    options.css,
    `<main class="doc doc-${d.type.replace("_", "-")}">
<header class="doc-header">
${headerBlock(d, 1, options.timeZone, options.house)}
</header>
${renderParts(d, "", 2)}
<footer class="doc-footer"><p>${escapeHtml(DISCLAIMER)}</p></footer>
</main>`
  )
}

/**
 * A package as one HTML document: cover (company, date, who ran it, Rubric
 * version, distinct sources), contents, each deliverable as a part, and the
 * combined open items (collectOpenItems). Validates first and throws
 * DeliverableValidationError when the input is not a v1 package.
 */
export function renderPackage(pkg, options = {}) {
  const p = requireValid(validatePackage(pkg))
  const parts = p.deliverables.map((d, i) => ({
    d,
    id: `part-${i + 1}-${own(TYPE_SLUGS, d.type, "deliverable")}`,
    prefix: `p${i + 1}-`,
  }))
  const open = p.deliverables.flatMap(collectOpenItems)
  const rubric =
    p.rubricVersion ??
    p.deliverables
      .map(rubricVersionOf)
      .find((v) => v !== null && v !== undefined)
  const who = [...new Set(p.deliverables.map((d) => runBy(d.preparedBy)))]
  const cover = `<header class="doc-header cover">
<p class="doc-type">Deal package</p>
<h1 class="doc-title">${escapeHtml(p.company.name)}</h1>
<p class="doc-meta">${companyLine(p.company, p.house ?? options.house)}</p>
<dl class="facts-grid">
<div><dt>Date</dt><dd>${mono(localDay(p.generatedAt, options.timeZone))}</dd></div>
<div><dt>Run by</dt><dd>${escapeHtml(who.join(", "))}</dd></div>
<div><dt>Assembled by</dt><dd>${escapeHtml(runBy(p.preparedBy))} (${escapeHtml(own(RUNTIME_LABELS, p.preparedBy.runtime, p.preparedBy.runtime))})</dd></div>
<div><dt>Rubric version</dt><dd>${rubric !== undefined && rubric !== null ? mono(`v${rubric}`) : "Not scored"}</dd></div>
<div><dt>Sources</dt><dd>${mono(countSources(p.deliverables))}</dd></div>
<div><dt>Open items</dt><dd>${mono(open.length)}</dd></div>
</dl>
<p class="doc-status">${badge("neutral", "Draft for staff review")}</p>
</header>`
  const toc = `<nav class="toc" aria-label="Contents"><h2>Contents</h2><ol>${parts
    .map(
      ({ d, id }) =>
        `<li><a href="#${id}">${escapeHtml(own(TYPE_LABELS, d.type, "Deliverable"))}</a> <span class="muted">${escapeHtml(runBy(d.preparedBy))} · ${mono(localDay(d.generatedAt, options.timeZone))}</span></li>`
    )
    .join(
      ""
    )}<li><a href="#open-items">Open items</a> <span class="muted">${mono(open.length)}</span></li></ol></nav>`
  const body = parts
    .map(
      ({ d, id, prefix }) =>
        `<article class="package-part doc-${d.type.replace("_", "-")}" id="${id}">
<header class="part-header">
<h2 class="part-title">${escapeHtml(own(TYPE_LABELS, d.type, "Deliverable"))}</h2>
<p class="doc-meta">${preparedLine(d.preparedBy, d.generatedAt, options.timeZone)}</p>
</header>
${renderParts(d, prefix, 3)}
</article>`
    )
    .join("\n")
  const combined = `<section class="package-part" id="open-items"><h2 class="part-title">Open items</h2>${openItemsList(open, { showFrom: true })}</section>`
  return page(
    `${p.company.name}: deal package (draft)`,
    options.css,
    `<main class="doc doc-package">
${cover}
${toc}
${body}
${combined}
<footer class="doc-footer"><p>${escapeHtml(DISCLAIMER)}</p></footer>
</main>`
  )
}
