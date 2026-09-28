// Rubric scoring arithmetic (ADR 0004), as pure functions of a Rubric
// definition. No dependencies and no imports, so both runtimes run the same
// file: the platform imports it through lib/ai/rubric/scoring.ts, and
// `pnpm agents:sync` copies it verbatim into the skafld-vc plugin, where the
// local `score_with_rubric` tool scores in documents-only mode (ADR 0006).
// `pnpm agents:check` fails when the copy is stale.
//
// Every number comes from the definition passed in: weighted mean over the
// assessed criteria, rounding, banding, the optional band conditions and
// knock-outs, coverage and the two gates.

/** Sum of all criterion weights. */
export function totalWeight(definition) {
  return definition.criteria.reduce((sum, c) => sum + c.weight, 0)
}

/** Round half up to the Rubric's number of decimals. */
export function roundScore(value, rounding) {
  const factor = 10 ** rounding.decimals
  return Math.round(value * factor) / factor
}

/**
 * Weighted mean over whatever entries are present, renormalised to the
 * weight present. Zero when nothing carries weight. Unrounded.
 */
export function weightedMean(entries) {
  let totalW = 0
  let weightedSum = 0
  for (const entry of Object.values(entries)) {
    weightedSum += entry.score * entry.weight
    totalW += entry.weight
  }
  if (totalW === 0) return 0
  return weightedSum / totalW
}

/** The band a score falls in: the first band whose min_score it reaches. */
export function recommendationFor(score, definition) {
  for (const band of definition.recommendation.bands) {
    if (score >= band.min_score) return band.recommendation
  }
  return definition.recommendation.floor
}

function isAssessed(entry) {
  if (!entry || typeof entry !== "object") return false
  return (
    entry.status !== "not_assessed" &&
    typeof entry.score === "number" &&
    Number.isFinite(entry.score)
  )
}

/**
 * Split raw per-criterion entries into assessed and not assessed. A missing
 * key, an explicit not_assessed status and a null or non-numeric score all
 * mean "no evidence": excluded, never coerced to a low score. Keys that are
 * not Rubric criteria are ignored.
 */
export function assessCriteria(raw, definition) {
  const weighted = {}
  const notAssessed = []
  let assessedWeight = 0
  for (const criterion of definition.criteria) {
    const entry = raw ? raw[criterion.key] : undefined
    if (isAssessed(entry)) {
      weighted[criterion.key] = { score: entry.score, weight: criterion.weight }
      assessedWeight += criterion.weight
    } else {
      notAssessed.push(criterion.key)
    }
  }
  return { weighted, notAssessed, assessedWeight }
}

/** Share of total Rubric weight that was assessed (0 to 1). */
export function coverageOf(assessedWeight, definition) {
  const total = totalWeight(definition)
  return total > 0 ? assessedWeight / total : 0
}

/**
 * The first band condition that blocks `recommendation`, or null. A condition
 * lets a band stand only when named criteria reach a minimum and no assessed
 * criterion sits at or below a floor; a named criterion that was not assessed
 * cannot confirm the condition, so it blocks.
 */
export function blockingCondition(recommendation, weighted, definition) {
  for (const condition of definition.band_conditions ?? []) {
    if (condition.recommendation !== recommendation) continue
    const { all_at_least: atLeast = {}, none_at_or_below: floor } =
      condition.requires
    for (const [key, min] of Object.entries(atLeast)) {
      const entry = weighted[key]
      if (!entry || entry.score < min) return condition
    }
    if (typeof floor === "number") {
      for (const entry of Object.values(weighted)) {
        if (entry.score <= floor) return condition
      }
    }
  }
  return null
}

/**
 * Composite and band. With `before_banding`, the band is taken from the
 * rounded score, so a raw 4.16 publishes as 4.2. Band conditions then step a
 * band down to its `otherwise` until one stands.
 */
export function compositeFor(weighted, definition) {
  const { rounding } = definition.recommendation
  const raw = weightedMean(weighted)
  const score = roundScore(raw, rounding)
  let recommendation = recommendationFor(
    rounding.before_banding ? score : raw,
    definition
  )
  const seen = new Set()
  let blocked = blockingCondition(recommendation, weighted, definition)
  while (blocked && !seen.has(recommendation)) {
    seen.add(recommendation)
    recommendation = blocked.otherwise
    blocked = blockingCondition(recommendation, weighted, definition)
  }
  return { score, recommendation }
}

/**
 * The knock-outs reported as triggered, restricted to the Rubric's own list.
 * `results` is an array of { key, triggered, evidence }.
 */
export function triggeredKnockouts(results, definition) {
  const known = new Set((definition.knockouts ?? []).map((k) => k.key))
  return (Array.isArray(results) ? results : []).filter(
    (r) => r && r.triggered === true && known.has(r.key)
  )
}

/**
 * The recommendation a scorecard with triggered knock-outs publishes: the
 * Rubric's `knockout_recommendation` (pass by default), or the composite's
 * own band when that is already harsher. A knock-out never raises a
 * recommendation (a strong_pass stays strong_pass). Harsher means lower in
 * the band order, with the floor lowest.
 */
export function knockoutRecommendationFor(recommendation, definition) {
  const knockout = definition.knockout_recommendation ?? "pass"
  const order = [
    ...definition.recommendation.bands.map((b) => b.recommendation),
    definition.recommendation.floor,
  ]
  return order.indexOf(recommendation) > order.indexOf(knockout)
    ? recommendation
    : knockout
}

/**
 * The coverage gate and the document gate. Either one failing withholds the
 * composite: too little of the Rubric evidenced, or no document read at all.
 */
export function applyGates(input, definition) {
  const hasEnoughCoverage = input.coverage >= definition.gates.min_coverage
  const hasDocumentEvidence =
    input.chunkCount >= definition.gates.min_document_chunks
  const publishable = hasEnoughCoverage && hasDocumentEvidence
  return {
    hasEnoughCoverage,
    hasDocumentEvidence,
    publishable,
    publishedScore: publishable ? input.composite.score : null,
    publishedRecommendation: publishable
      ? input.composite.recommendation
      : definition.recommendation.withheld,
  }
}

/**
 * The whole scorecard from per-criterion entries: assessed and not, the
 * weighted worksheet, composite, band, coverage, gates and knock-outs. A
 * triggered knock-out forces the Rubric's `knockout_recommendation` (pass by
 * default) unless the composite is already harsher, and names the knock-out.
 */
export function scoreWithRubric(definition, input) {
  const { weighted, notAssessed, assessedWeight } = assessCriteria(
    input.criteria,
    definition
  )
  const composite = compositeFor(weighted, definition)
  const coverage = coverageOf(assessedWeight, definition)
  const gates = applyGates(
    { coverage, chunkCount: input.chunkCount ?? 0, composite },
    definition
  )
  const knockouts = triggeredKnockouts(input.knockouts, definition)
  const worksheet = definition.criteria.map((c) => {
    const entry = weighted[c.key]
    return entry
      ? {
          key: c.key,
          weight: c.weight,
          score: entry.score,
          contribution: entry.score * entry.weight,
        }
      : { key: c.key, weight: c.weight, status: "not_assessed" }
  })
  return {
    worksheet,
    notAssessed,
    assessedWeight,
    coverage,
    rawMean: weightedMean(weighted),
    composite,
    gates,
    knockouts,
    recommendation:
      knockouts.length > 0 && gates.publishable
        ? knockoutRecommendationFor(gates.publishedRecommendation, definition)
        : gates.publishedRecommendation,
  }
}
