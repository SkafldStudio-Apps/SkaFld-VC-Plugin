// A platform's brand, served by the platform and cached on this computer.
// whoami returns brand.url, https://<platform>/api/brand/<version>, where
// version is a content hash, so a cached copy never goes stale: a new brand
// is a new URL. This is the only place the deliverables server touches the
// network, and only when export_document is given such a URL.
//
// The bundle (skafld-vc.brand-bundle/v1) is brand.json plus the logo, rail
// and font files it names, base64 encoded. Everything is checked before a
// byte is written: the format and version, every file path (relative, no
// "..", PNG/JPEG/TTF/OTF only, exactly the files brand.json names), the
// decoded size and the brand itself. The folder is written whole (a .tmp
// folder, then a rename), so a cache folder is either complete or absent.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"

export const BUNDLE_FORMAT = "skafld-vc.brand-bundle/v1"
export const FETCH_TIMEOUT_MS = 15_000
/** Largest response read, before decoding. */
export const MAX_RESPONSE_BYTES = 4 * 1024 * 1024
/** Largest total of the decoded files. */
export const MAX_FILES_BYTES = 3 * 1024 * 1024
const MAX_REDIRECTS = 3

const VERSION = /^[0-9a-f]{16}$/
const PATH = /^\/api\/brand\/([0-9a-f]{16})$/
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"])
const IMAGE = /\.(png|jpe?g)$/i
const FONT = /\.(ttf|otf)$/i

export class PlatformBrandError extends Error {
  constructor(message) {
    super(message)
    this.name = "PlatformBrandError"
  }
}

/** Whether a brand argument is meant as a URL (and so never a folder). */
export function looksLikeUrl(value) {
  return typeof value === "string" && /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
}

/**
 * The parts of a platform brand URL, or null when it is not one:
 * https://<host>/api/brand/<16 hex>, or http on localhost or 127.0.0.1 for
 * development. No credentials, query or fragment.
 */
export function parsePlatformBrandUrl(value) {
  if (typeof value !== "string") return null
  let url
  try {
    url = new URL(value)
  } catch {
    return null
  }
  if (url.username || url.password || url.search || url.hash) return null
  const local = LOCAL_HOSTS.has(url.hostname)
  if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) {
    return null
  }
  if (!/^[a-z0-9.-]+$/.test(url.hostname)) return null
  const m = PATH.exec(url.pathname)
  if (!m) return null
  return {
    url: url.href,
    origin: url.origin,
    host: url.host,
    // A folder name on every system (no colon before the port).
    hostKey: url.port ? `${url.hostname}_${url.port}` : url.hostname,
    version: m[1],
  }
}

/** The cache folder for a parsed URL under the setup home. */
export function cacheDir(home, parsed) {
  return join(home, "platform-brands", parsed.hostKey, parsed.version)
}

/** Every file a brand.json names, as written in it. */
export function namedFiles(brand) {
  const out = new Set()
  const add = (v) => {
    if (typeof v === "string" && v) out.add(v)
  }
  for (const key of ["primary", "on_dark", "mark"]) add(brand?.logo?.[key])
  if (typeof brand?.style?.rail === "string") add(brand.style.rail)
  for (const table of Object.values(brand?.font_files ?? {})) {
    for (const name of Object.values(table ?? {})) add(name)
  }
  return out
}

/** Why a named file path is unsafe, or null when it is fine. */
export function pathProblem(name, { font = false } = {}) {
  if (typeof name !== "string" || !name) return "an empty file name"
  if (name.length > 200) return `${name.slice(0, 40)}... is too long`
  if (name.startsWith("/") || /^[a-z]:/i.test(name) || name.includes("\\")) {
    return `${name} is not a relative path`
  }
  const parts = name.split("/")
  if (parts.some((p) => p === "" || p === "." || p === "..")) {
    return `${name} is not a plain relative path`
  }
  if (parts.some((p) => !/^[\w.-]+$/.test(p))) {
    return `${name} has characters a file name may not have`
  }
  if (!(font ? FONT : IMAGE).test(name)) {
    return `${name} must be ${font ? "a TTF or OTF font" : "a PNG or JPEG"}`
  }
  return null
}

function fontNames(brand) {
  const out = new Set()
  for (const table of Object.values(brand?.font_files ?? {})) {
    for (const name of Object.values(table ?? {})) out.add(name)
  }
  return out
}

function magicOk(name, data) {
  if (/\.png$/i.test(name)) {
    return data.length > 24 && data.readUInt32BE(0) === 0x89504e47
  }
  if (/\.jpe?g$/i.test(name)) {
    return data.length > 4 && data[0] === 0xff && data[1] === 0xd8
  }
  const tag = data.length >= 4 ? data.readUInt32BE(0) : 0
  // TrueType, OpenType (CFF) and the old Apple "true" tag.
  return tag === 0x00010000 || tag === 0x4f54544f || tag === 0x74727565
}

const BASE64 = /^[A-Za-z0-9+/]*={0,2}$/

/**
 * Check a bundle and decode its files. Returns { brand, files: Map<name,
 * Buffer> }; throws PlatformBrandError with the first problem.
 */
export function checkBundle(bundle, version, brandProblems) {
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
    throw new PlatformBrandError("the response is not a brand bundle")
  }
  if (bundle.format !== BUNDLE_FORMAT) {
    throw new PlatformBrandError(`the response format is not ${BUNDLE_FORMAT}`)
  }
  if (bundle.version !== version) {
    throw new PlatformBrandError(
      `the bundle is version ${String(bundle.version).slice(0, 32)}, not ${version}`
    )
  }
  const brand = bundle.brand
  const problems = brandProblems(brand)
  if (problems.length > 0) {
    throw new PlatformBrandError(
      `its brand.json is not usable (${problems.join("; ")})`
    )
  }
  const files = bundle.files
  if (!files || typeof files !== "object" || Array.isArray(files)) {
    throw new PlatformBrandError("the bundle has no files object")
  }
  const named = namedFiles(brand)
  const fonts = fontNames(brand)
  for (const name of named) {
    const p = pathProblem(name, { font: fonts.has(name) })
    if (p) throw new PlatformBrandError(`brand.json names ${p}`)
  }
  const sent = Object.keys(files)
  for (const name of sent) {
    if (!named.has(name)) {
      throw new PlatformBrandError(
        `the bundle has a file brand.json does not name: ${name.slice(0, 80)}`
      )
    }
  }
  const out = new Map()
  let total = 0
  for (const name of named) {
    const b64 = files[name]
    if (typeof b64 !== "string") {
      throw new PlatformBrandError(`the bundle is missing ${name}`)
    }
    if (!BASE64.test(b64) || b64.length % 4 !== 0) {
      throw new PlatformBrandError(`${name} is not base64`)
    }
    const data = Buffer.from(b64, "base64")
    total += data.length
    if (total > MAX_FILES_BYTES) {
      throw new PlatformBrandError("the brand files are larger than 3 MB")
    }
    if (!magicOk(name, data)) {
      throw new PlatformBrandError(`${name} is not the file type its name says`)
    }
    out.set(name, data)
  }
  return { brand, files: out }
}

async function readCapped(res, max) {
  const length = Number(res.headers?.get?.("content-length") ?? "")
  if (Number.isFinite(length) && length > max) {
    throw new PlatformBrandError("the response is larger than 4 MB")
  }
  const reader = res.body?.getReader?.()
  if (!reader) {
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length > max) {
      throw new PlatformBrandError("the response is larger than 4 MB")
    }
    return buf
  }
  const chunks = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.length
    if (size > max) {
      await reader.cancel().catch(() => {})
      throw new PlatformBrandError("the response is larger than 4 MB")
    }
    chunks.push(Buffer.from(value))
  }
  return Buffer.concat(chunks)
}

/** GET the bundle: same-origin redirects only, a timeout and a size cap. */
async function download(parsed, { fetch, timeoutMs, maxBytes }) {
  if (typeof fetch !== "function") {
    throw new PlatformBrandError("this Node.js has no fetch")
  }
  const signal = AbortSignal.timeout(timeoutMs)
  let url = parsed.url
  for (let hop = 0; ; hop++) {
    let res
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal,
        headers: { accept: "application/json" },
      })
    } catch (err) {
      const why =
        err?.name === "TimeoutError" || err?.name === "AbortError"
          ? `no answer within ${Math.round(timeoutMs / 1000)} s`
          : (err?.cause?.message ?? err?.message ?? String(err))
      throw new PlatformBrandError(`could not reach ${parsed.origin}: ${why}`)
    }
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers?.get?.("location")
      let next = null
      try {
        next = location ? new URL(location, url) : null
      } catch {
        next = null
      }
      if (!next || next.origin !== parsed.origin) {
        throw new PlatformBrandError(
          "the platform redirected the brand to another host"
        )
      }
      if (hop >= MAX_REDIRECTS) {
        throw new PlatformBrandError("too many redirects")
      }
      url = next.href
      continue
    }
    const body = await readCapped(res, maxBytes)
    if (res.status === 404) {
      let current = null
      try {
        current = JSON.parse(body.toString("utf8"))?.current ?? null
      } catch {
        current = null
      }
      throw new PlatformBrandError(
        typeof current === "string" && VERSION.test(current)
          ? `version ${parsed.version} is no longer the platform's brand (it is now ${current}); call whoami again for brand.url`
          : `the platform has no brand at version ${parsed.version}`
      )
    }
    if (res.status !== 200) {
      throw new PlatformBrandError(`the platform answered HTTP ${res.status}`)
    }
    try {
      return JSON.parse(body.toString("utf8"))
    } catch {
      throw new PlatformBrandError("the response is not JSON")
    }
  }
}

/** A cached brand folder for a parsed URL, or null when there is none. */
export function cachedPlatformBrand(home, parsed, brandProblems) {
  const dir = cacheDir(home, parsed)
  const file = join(dir, "brand.json")
  if (!existsSync(file)) return null
  try {
    const brand = JSON.parse(readFileSync(file, "utf8"))
    if (brandProblems(brand).length > 0) return null
    for (const name of namedFiles(brand)) {
      if (!existsSync(join(dir, name))) return null
    }
    return { dir, name: brand.name, brand }
  } catch {
    return null
  }
}

function writeAtomically(dir, brand, files) {
  mkdirSync(dirname(dir), { recursive: true })
  const tmp = `${dir}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 10)}`
  rmSync(tmp, { recursive: true, force: true })
  try {
    mkdirSync(tmp, { recursive: true })
    writeFileSync(
      join(tmp, "brand.json"),
      `${JSON.stringify(brand, null, 2)}\n`
    )
    for (const [name, data] of files) {
      mkdirSync(dirname(join(tmp, name)), { recursive: true })
      writeFileSync(join(tmp, name), data)
    }
    // A broken folder left by something else is replaced; a complete one
    // written meanwhile by another call is kept (same version, same bytes).
    if (existsSync(dir) && !existsSync(join(dir, "brand.json"))) {
      rmSync(dir, { recursive: true, force: true })
    }
    if (!existsSync(dir)) renameSync(tmp, dir)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

/**
 * The platform brand for a URL as a brand folder on this computer: from
 * the cache, else downloaded, checked and cached. Returns { dir, name,
 * version, host, cached } (cached: it was already here). Throws
 * PlatformBrandError with a short reason when it is not available.
 *
 * options: home (the setup folder), brandProblems (from the exporter),
 * fetch, timeoutMs, maxBytes (tests).
 */
export async function platformBrand(value, options = {}) {
  const {
    home,
    brandProblems,
    fetch = globalThis.fetch,
    timeoutMs = FETCH_TIMEOUT_MS,
    maxBytes = MAX_RESPONSE_BYTES,
  } = options
  const parsed = parsePlatformBrandUrl(value)
  if (!parsed) {
    throw new PlatformBrandError(
      "it is not a platform brand URL (https://<platform>/api/brand/<16 hex characters>)"
    )
  }
  if (!home) {
    throw new PlatformBrandError("there is no setup folder to keep it in")
  }
  const host = parsed.host
  const hit = cachedPlatformBrand(home, parsed, brandProblems)
  if (hit) {
    return {
      dir: hit.dir,
      name: hit.name,
      version: parsed.version,
      host,
      cached: true,
    }
  }
  const bundle = await download(parsed, { fetch, timeoutMs, maxBytes })
  const { brand, files } = checkBundle(bundle, parsed.version, brandProblems)
  const dir = cacheDir(home, parsed)
  try {
    writeAtomically(dir, brand, files)
  } catch (err) {
    throw new PlatformBrandError(
      `it could not be saved in ${dirname(dir)}: ${err?.message ?? err}`
    )
  }
  return { dir, name: brand.name, version: parsed.version, host, cached: false }
}
