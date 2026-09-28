// Documents-only scoring for the skafld-vc plugin (ADR 0006): find the rubric,
// check its shape, and run the platform's own arithmetic (scoring-core.mjs,
// a verbatim copy of lib/ai/rubric/scoring-core.mjs written by
// `pnpm agents:sync`). Reads files only; no network, no writes.
import { existsSync, readFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { scoreWithRubric } from "./scoring-core.mjs"
import { projectDir, RenderError } from "./write.mjs"

const here = dirname(fileURLToPath(import.meta.url))

/** The rubric the plugin ships: ${CLAUDE_PLUGIN_ROOT}/rubrics/default.json. */
export const DEFAULT_RUBRIC = resolve(
  here,
  "..",
  "..",
  "..",
  "rubrics",
  "default.json"
)

/** A rubric in the project root that overrides the default. */
export const PROJECT_RUBRIC = "rubric.json"

/**
 * The minimum a definition needs for the arithmetic to be meaningful. The
 * platform validates the full schema with zod; this is the dependency-free
 * subset: criteria with keys and positive weights summing to 1, bands from
 * the highest down, a floor, rounding and gates.
 */
export function rubricShapeProblems(def) {
  const problems = []
  if (!def || typeof def !== "object")
    return ["the rubric is not a JSON object"]
  const criteria = Array.isArray(def.criteria) ? def.criteria : null
  if (!criteria || criteria.length === 0)
    problems.push("criteria must be a non-empty array")
  let sum = 0
  const keys = new Set()
  for (const [i, c] of (criteria ?? []).entries()) {
    if (!c || typeof c.key !== "string" || !/^[a-z][a-z0-9_]*$/.test(c.key)) {
      problems.push(`criteria[${i}].key must be lower snake_case`)
    } else if (keys.has(c.key)) {
      problems.push(`criteria[${i}].key "${c.key}" appears more than once`)
    } else keys.add(c.key)
    if (typeof c?.weight !== "number" || !(c.weight > 0)) {
      problems.push(`criteria[${i}].weight must be a number above 0`)
    } else sum += c.weight
  }
  if (criteria && Math.abs(sum - 1) > 1e-6) {
    problems.push(
      `criterion weights must add up to 1 (they add up to ${Number(sum.toFixed(6))})`
    )
  }
  const rec = def.recommendation
  if (!rec || !Array.isArray(rec.bands) || rec.bands.length === 0) {
    problems.push("recommendation.bands must be a non-empty array")
  } else {
    rec.bands.forEach((b, i) => {
      if (i > 0 && !(b.min_score < rec.bands[i - 1].min_score)) {
        problems.push(
          "recommendation.bands must be listed from the highest min_score down"
        )
      }
    })
  }
  if (!rec || typeof rec.floor !== "string")
    problems.push("recommendation.floor is required")
  if (!rec?.rounding || typeof rec.rounding.decimals !== "number") {
    problems.push("recommendation.rounding.decimals is required")
  }
  if (!def.gates || typeof def.gates.min_coverage !== "number") {
    problems.push("gates.min_coverage is required")
  }
  return problems
}

function readJson(file, label) {
  try {
    return JSON.parse(readFileSync(file, "utf8"))
  } catch (err) {
    throw new RenderError(`could not read ${label}: ${err?.message ?? err}`)
  }
}

/**
 * The rubric to score against, in order: a path the user named (inside the
 * project only), then rubric.json in the project root, then the default.
 */
export function resolveRubric(rubricPath, env = process.env, requestedProject) {
  const project = projectDir(env, requestedProject)
  let file
  let source
  if (rubricPath) {
    file = resolve(project, String(rubricPath))
    const rel = relative(project, file)
    if (!rel || rel.startsWith("..")) {
      throw new RenderError(
        `refusing a rubric outside the project: ${rubricPath}`
      )
    }
    source = `project file ${rel}`
  } else if (existsSync(join(project, PROJECT_RUBRIC))) {
    file = join(project, PROJECT_RUBRIC)
    source = `project file ${PROJECT_RUBRIC}`
  } else {
    file = DEFAULT_RUBRIC
    source = "the SkaFld VC default rubric"
  }
  const definition = readJson(file, source)
  const problems = rubricShapeProblems(definition)
  if (problems.length > 0)
    throw new RenderError(`${source} is not a usable rubric`, problems)
  return { definition, source }
}

/** Score per-criterion entries against the resolved rubric. */
export function scoreDocuments(args = {}, env = process.env) {
  if (!args.criteria || typeof args.criteria !== "object") {
    throw new RenderError(
      "criteria is required: one entry per criterion key, scored or not_assessed"
    )
  }
  const { definition, source } = resolveRubric(
    args.rubric_path,
    env,
    args.project_dir
  )
  const result = scoreWithRubric(definition, {
    criteria: args.criteria,
    chunkCount:
      typeof args.document_count === "number" ? args.document_count : 0,
    knockouts: args.knockouts,
  })
  const unknown = Object.keys(args.criteria).filter(
    (k) => !definition.criteria.some((c) => c.key === k)
  )
  return {
    rubric: source,
    rubric_criteria: definition.criteria.map((c) => ({
      key: c.key,
      name: c.name,
      weight: c.weight,
    })),
    ignored_keys: unknown,
    ...result,
  }
}
