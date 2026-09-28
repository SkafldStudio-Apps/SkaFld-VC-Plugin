# Deliverable format (skafld-vc.deliverable/v1)

The platform's TypeScript types are the source of truth; this is the same format in prose. Documents written as `anchor-angels.deliverable/v1` (the name before the SkaFld VC rename) still validate. Fields marked Markdown go through a safe Markdown subset (headings, lists, bold, italic, code, tables, links to http(s), mailto or `/deals/...`); everything else is plain text. Raw HTML is always shown as text.

## Envelope (every deliverable)

```json
{
  "format": "skafld-vc.deliverable/v1",
  "house": "Example Angels",
  "type": "thesis_longlist | screening | founder_feedback | diligence | ic_memo | portfolio_review",
  "status": "draft",
  "company": {
    "name": "Harbor Robotics",
    "website": "https://harbor.example",
    "dealId": 42,
    "kind": "deal | outside",
    "stage": "seed"
  },
  "generatedAt": "2026-09-26T14:00:00Z",
  "preparedBy": {
    "agent": "screening-agent",
    "runtime": "claude_code",
    "person": "Jane Doe"
  },
  "rubricVersion": 3,
  "summary": "Markdown lead paragraph",
  "sources": [
    {
      "id": "deck",
      "title": "Pitch deck, Sept 2026",
      "url": "https://...",
      "kind": "deck"
    },
    {
      "id": "carta-seed",
      "title": "Carta, seed round benchmarks",
      "url": "https://...",
      "kind": "web",
      "date": "2026-07",
      "sample": "n=431"
    }
  ],
  "openItems": [
    {
      "text": "Confirm the pilot contract",
      "owner": "Deal lead",
      "closes": "Signed contract",
      "sourceIds": ["deck"]
    }
  ],
  "body": {}
}
```

- `house` is optional: the network's short name from `skafld-vc:whoami` (`house.short_name`). It labels a `deal` company as "<house> company"; without it the label is "Company on the platform". Omit it when there is no platform.
- `kind` is `deal` for a deal or application on the platform and `outside` for anything else, including every documents-only run. `dealId` only for a `deal` company; omit it for an Outside company.
- `sources[].id` is what `sourceIds` and `[^id]` in Markdown point at; an unknown id fails validation. `date` (for example "2025", "2026-07" or "2026-09-12") and `sample` (for example "n=431" or "885 VCs") are optional strings; fill them for every benchmark and study, and the Sources list prints "title, date, n=…".
- Every body section below is optional, and every body takes `document` (Markdown): your full draft. Present sections render in the order listed, and `document` renders last as "Full draft" (or as the main content when there is little else). A body with no sections and no `document` is invalid.

## Screening report (`type: "screening"`)

Order: verdict, stage bar, scorecard, price, founders, deck audit, research, questions for the screening call.

- `verdict`: `{ decision, band?, reason, decidedBy?, hardFilters?, referTo?, sourceQuality?, redFlags?, thesisFit? }`. `decision` is a short label ("Advance to screening call", "Pass on a hard filter", "Refer"); `reason`, `sourceQuality` (the quality of the source and referral) and `thesisFit` (how the deal sits against the house thesis) are Markdown; `redFlags` is a list of strings; `hardFilters` is `{ mandate, roundSize, networkConnection, stage?, geography? }` with true (met), false (not met) or null (not checked).
- `stageBar`: Markdown, the stage-calibration line.
- `scorecard`: the `skafld-vc:score_company` result, renamed to this format's camelCase fields as in the mapping below. Copy the numbers; never compute or round them.
  - `rubricVersion`, `scale?` (`{ min, max }`), `coverage` (0 to 1).
  - `composite`: `{ score, band }`. `score` is a number, band one of strong_consider, consider, neutral, pass, strong_pass, insufficient_evidence.
  - `published`: `{ score | null, withheld, withheldBecause? }` (`["coverage"]`, `["evidence"]`).
  - `criteria`: one per Rubric criterion, in Rubric order: `{ key, name?, weight?, status: "scored" | "not_assessed", score? (scored only), reasoning (Markdown), sources? (names or URLs), sourceIds? }`. A `not_assessed` criterion has no score; its `reasoning` says what evidence would be needed.
  - `missingConnectors?`, `highlights?`, `risks?`.
- `price`: the price verdict from `valuation-triangulation`, judged separately from the score and never blended into one value: `{ ask?, comparables, ceiling, breakEven, terms?, askVsCeiling?: below | above | not_assessed, termsStandard?, counter?, sourceIds? }`. `ask` (the ask decoded as arithmetic), `comparables` (where the ask sits in the range, and the fair range), `ceiling`, `breakEven`, `terms` (the terms flags) and `counter` (for the deal lead; never sent to the founder) are Markdown. A line that cannot run says "not assessed" and what would let it. `askVsCeiling` is the ceiling line's result; `termsStandard` is true (standard), false (off-market) or null (not checked).

### From `skafld-vc:score_company` to `body.scorecard`

`skafld-vc:score_company` answers in snake_case; the deliverable is camelCase and some fields change shape. Map every field like this (anything not listed is not carried):

| `skafld-vc:score_company` returns                                    | Deliverable field                                           | Notes                                                                                                                                                                     |
| ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rubric_version`                                           | `scorecard.rubricVersion`, and the envelope `rubricVersion` | Both must equal the scored run's version, or `skafld-vc:save_deliverable` refuses.                                                                                                  |
| `composite.score`                                          | `scorecard.composite.score`                                 | Always a number. `skafld-vc:save_deliverable` refuses a missing composite or one more than 0.005 from the scored run's.                                                             |
| `composite.recommendation`                                 | `scorecard.composite.band`                                  | The band before the gates.                                                                                                                                                |
| `published.score`                                          | `scorecard.published.score`                                 | `null` when withheld; never 0.                                                                                                                                            |
| `published.withheld`                                       | `scorecard.published.withheld`                              | A boolean.                                                                                                                                                                |
| `published.withheld_because`                               | `scorecard.published.withheldBecause`                       | `["coverage"]`, `["evidence"]`, both, or `[]`.                                                                                                                            |
| `knockouts_triggered`                                      | `scorecard.knockouts`                                       | Copy as returned: `{ key, triggered, evidence }` per triggered knock-out. Any one means the recommendation is pass.                                                       |
| `published.recommendation`                                 | (not carried; optionally `verdict.band`)                    | `insufficient_evidence` when withheld.                                                                                                                                    |
| `coverage`                                                 | `scorecard.coverage`                                        | Already 0 to 1.                                                                                                                                                           |
| `criteria` (an object keyed by criterion key)              | `scorecard.criteria` (an array in Rubric order)             | One entry per key: `{ key, status, score, reasoning, sources }`. A scored entry may omit `status`; write `"scored"`. A `not_assessed` entry has no `score`; leave it out. |
| `criteria.<key>.sources`                                   | `scorecard.criteria[].sources`                              | Names or URLs as given; add `sourceIds` for sources in the envelope.                                                                                                      |
| `not_assessed`                                             | (nothing; it is the criteria with `status: "not_assessed"`) |                                                                                                                                                                           |
| `missing_connectors`                                       | `scorecard.missingConnectors`                               | Also `body.missingConnectors` when research used them.                                                                                                                    |
| `evidence_count`, `run_id`, `persisted`, `next`, `subject` | (not carried)                                               |                                                                                                                                                                           |

From `skafld-vc:get_rubric`, per criterion, `name` and `weight` go on each `scorecard.criteria[]` entry, and the Rubric's `scale` (`{ min, max }`) goes in `scorecard.scale`.

- `founders`: `[{ name, role?, history (Markdown), verification?: verified | single_source | claimed, gap?, notChecked?, sourceIds? }]`, and `foundersNote?` (Markdown).
- `deckAudit`: `{ slides?, missingSlides?, claims: [{ slide?, claim (verbatim), status: supported | contradicted | unsupported | not_checked, basis?: sourced | asserted | marketing, note?, sourceIds? }], inconsistencies? }`.
- `research`: `[{ topic, status: checked | not_checked, findings? (Markdown), connector?, sourceIds? }]`, and `missingConnectors?` (for example `["apollo"]`).
- `questions`: ranked, most scorecard-moving first: `[{ question, why? }]`.

## Diligence plan (`type: "diligence"`)

Order: stage bar, workstreams, data room audit, unit economics, cap table, technical determination, deck audit, findings, gaps as tasks, requests to the company.

- `stageBar`: Markdown.
- `workstreams`: `[{ key, needs: [{ item, kind: document | call, status: in_data_room | partial | missing, note?, sourceIds? }], notes? }]`, key one of team, market_customers, product_technology, financial, legal_corporate, deal_terms (rendered in that order).
- `dataRoom`: `[{ document, workstream?, status: present | partial | missing | outdated, note?, requestedAt?, receivedAt?, requestedBy?, sourceIds? }]`. `requestedAt` and `receivedAt` are YYYY-MM-DD; `requestedBy` names who asked for it.
- `unitEconomics`, `capTable`: `{ analysis (Markdown), missing? }`.
- `techDetermination`: the product and technology verdict from `technical-diligence`: `{ verdict: technically_sound | workable | here_be_dragons | not_assessed, driver (Markdown: the axis and finding that drive it), sourceIds? }`. It states execution risk over the next 12 to 24 months, never survival.
- `deckAudit`: as in the Screening report, statuses against the data room.
- `findings`: the findings ledger: `[{ finding, class: deal_killer | price | terms | operating_risk | opportunity, low?, high?, lever?, workstream?, sourceIds? }]`. `low` and `high` are the bookends (the least and the most the finding moves price or plan; a string or a number). `lever` names the NVCA or SAFE lever for a `terms` finding. Rendered grouped by class, deal killers first; every deal killer joins the open items, and a deal killer means the recommendation is pass.
- `gaps`: `[{ task, closes, owner?, workstream?, priority?: deal_killer | elephant | ant, evidence?: paid | behavioural | product | discovery | none, substitute? }]`: one line each, with the document or call that closes it and a suggested owner. `priority` ranks it, `evidence` is the strongest evidence that would close it, and `substitute` is what to use if that cannot be had. Deal-killer gaps come first in the open items.
- `requests`: `[{ request, detail?, workstream?, priority?: required | helpful, due? (YYYY-MM-DD) }]`: what the company is asked for, worded to be sent to the founder as is (see the `diligence-requests` skill). The founder request list in Excel is built from these and nothing else, so nothing internal goes here.

## IC memo (`type: "ic_memo"`)

Order (memo-format): header, recommendation, company, use of funds, why now, thesis fit, why this team, what has to be true, traction and unit economics, terms and returns, price verdict, risks and the bear case, network fit, monitoring hand-off, open items.

- `header`: `{ stage?, ask?, valuation?, valuationBasis?: pre | post, scorecardStatus?: draft | confirmed }`.
- `recommendation`, `company`, `useOfFunds`, `whyNow`, `thesisFit`, `whyTeam`, `traction`, `terms`, `bearCase`, `networkFit`: Markdown.
- `whatHasToBeTrue`: `[{ statement, test, status?: supported | contradicted | open }]`.
- `valuation`: the price verdict, the same shape as the Screening's `price`.
- `risks`: `[{ risk, mitigant?, status: mitigated | open, class?: deal_killer | price | terms | operating_risk, type?, low?, high? }]`. At least three real risks. `type` is one of memo-format's risk types as text; `low` and `high` are the bookends. Opportunities are not risks.
- `planBaseline`: the monitoring hand-off, one entry per statement in `whatHasToBeTrue`: `[{ metric, today?, target, by?, sourceIds? }]`. `today` and `target` are numbers or strings; `by` is when the target is due ("2027-06", "Q2 2027"). Portfolio reviews measure updates against it.
- `agentDerived`: section keys you derived yourself rather than read from confirmed work: recommendation, company, useOfFunds, whyNow, thesisFit, whyTeam, whatHasToBeTrue, traction, terms, valuation, risks, networkFit, planBaseline, openItems.
- Open items go in the envelope `openItems`.

## Sourcing longlist (`type: "thesis_longlist"`)

Written by the Sourcing agent (`thesis-fit`, `anti-portfolio`); never saved on a platform. The subject is the thesis, not one company: `company.name` is the thesis name (for example "Port automation thesis") with `kind: "outside"` and no `dealId`.

Order: thesis and mandate, market map, companies, anti-portfolio, sourcing activity, next actions.

- `thesis`: `{ title, version?, decision?: go | no_go | draft, pillars? }`.
- `mandate`: `{ sectors?, geographies?, stages?, checkSize?, superPriority? }` (lists of strings; `checkSize` a string).
- `marketMap`: Markdown.
- `companies`: `[{ name, oneLine, website?, stage?, founded?, hq?, teamSize?, funding?, investors?, pillars?, fit?, reason?, status: view | monitor | pursue | engaged_founder | investment_memo, dealId?, channel?, thesisVersion?, sourceIds? }]`. One card per company; `fit` and `reason` are Markdown. `channel` is how the company reached the house: network, self_generated, investor_referral, portfolio, inbound or event; `thesisVersion` is the thesis version it was judged under.
- `antiPortfolio`: `[{ company, passReason, reasonCode?, passedAt?, stageReached?, thesisVersion?, channel?, nearMiss?, checks?, outcomeCheck?, lesson?, sourceIds? }]`.
  - `reasonCode`: out_of_scope, product_model, market, financial_valuation, team, agency or not_recorded. `passReason` is the one sentence naming the deciding factor.
  - `stageReached`: pre_screen, screen, diligence, committee or negotiation. `channel` as for companies. `nearMiss`: true when the decision was one vote or one read short.
  - `checks`: `[{ at: 12m | 24m | 36m, outcome: raised_priced | operating | acquired | shut_down | not_found | not_checked | due, date?, note? (Markdown), sourceIds? }]`: the outcome checks from `passedAt`. `outcomeCheck` may carry a Markdown summary.
  - With reason codes, the Anti-portfolio section adds a count by reason: passes, how many were checked, and how many later raised a priced round or were acquired.
- `sourcingActivity`: `{ period?, contacted?, meetings?, introductions?, termSheets?, sources?: [{ source, count? }] }`.
- `nextActions`: `[{ company, action, owner?, by? }]`. They join the Package's open items.

## Founder feedback (`type: "founder_feedback"`)

Written from `founder-feedback` for a person to use; never saved on a platform. One company, `kind` as for a Screening. The rendered HTML is the team view: the internal call brief and the note together, each labelled. The founder copy is `deliverables:export_document` with `audience: "founder"` (Word or PDF): it holds only the founder-facing fields (`note`, each area's `strengths`, `suggestions` and `questions`, the areas not discussed, and `nextStep`), and leaves out the brief, the ratings, the evidence, the disclosure check, the summary, the sources, the open items, the house label and the person it was prepared for. It is refused until `disclosureCheck.passed` is true. There is no deck.

Order: internal call brief, note for the founder, disclosure check.

- Internal: `basedOn?` (the Screening version or documents), `stageBar?` and `brief?` (Markdown: what to cover, in what order and what to leave alone), `leaveAlone?` (a list of strings).
- `areas`: all seven, each once: `[{ area: story | business_model | competition | metrics | team | product | valuation, status: strong | adequate | gap | not_discussed, evidence?, say?, doNotSay?, strengths?, suggestions?, questions?, sourceIds? }]`. `status`, `evidence` (Markdown), `say` and `doNotSay` are internal; `strengths`, `suggestions` and `questions` (lists of strings) are founder-facing. They render in the order above whatever order they are written in.
- Founder-facing: `note?` (Markdown: the thank-you line and anything else to send) and `nextStep?` (the step the person chooses; never an outcome).
- `disclosureCheck`: `{ passed, items?, removed? }`: `passed` is true only when every founder-facing line passed; `items` is how many lines were checked; `removed` lists what was taken out. A check that has not passed joins the open items.

## Portfolio review (`type: "portfolio_review"`)

Written by the Portfolio agent (`founder-update`, `kpi-variance`, `portfolio-construction`); never saved on a platform. One company per review, `kind: "outside"` unless the platform holds it as a deal. For a portfolio-wide review with no single company, name the portfolio in `company.name` (for example "Portfolio, Q3 2026") and fill `portfolioView`.

Order: next-stage bar and plan, period, highlights and lowlights, key takeaways, KPIs, cash and runway, concerns, decisions for investors, next three months, opportunities, asks of the network, our position, cap table events, the portfolio, transaction recap.

- `header`: `{ nextStageBar? (Markdown: what the next round will need to see), icPlanVersion? (the IC memo plan the KPIs are measured against) }`.
- `period`: `{ label, start?, end?, sourceDocuments? }`: the update or board pack the review reads.
- `highlights`, `lowlights`, `asksOfNetwork`: lists of strings.
- `keyTakeaways`, `operatingPlan`, `opportunities`, `transactionRecap`: Markdown.
- `kpis`: `[{ metric, unit?, actual?, prior?, budget?, plan?, variance?, basis: stated | derived | benchmark, status?: on_track | watch | off_track, note?, sourceIds? }]`. Figures are numbers or strings; leave out what the update does not give rather than writing a guess. `plan` is the IC memo plan.
- `cash`: `{ cash?, monthlyBurn?, runwayMonths?, analysis (Markdown), sourceIds? }`.
- `concerns`: `[{ concern, options?, status: open | mitigating | resolved }]`. Unresolved ones join the Package's open items.
- `consentItems`: `[{ item, due? (YYYY-MM-DD), note? }]`: what investors are asked to approve. They join the open items.
- `cadence`: `{ expected, lastUpdate?, onTime (true or false), note? }`.
- `position`: `{ invested?, ownership?, mark?, outcome?: loser | breakeven | decent | good | big | too_early, followOn? (Markdown), realisationYear? }`.
- `capTableEvents`: `[{ date?, event, note? }]`: issuances, conversions, transfers and pool changes in the period.
- `portfolioView`: `{ positions: [{ company, invested?, stage?, sector?, vintage?, status?, outcome? }], analysis (Markdown) }`.

## Package (skafld-vc.package/v1)

Built by `deliverables:render_package` (or `buildPackage` on the platform) from deliverables about one company: `{ format, house?, company, generatedAt, preparedBy, rubricVersion?, deliverables[] }`, ordered Sourcing longlist, Screening, Founder feedback, Diligence, IC memo, Portfolio review. The cover shows the company, the date, the thesis when a Sourcing longlist is included, who ran each deliverable, the Rubric version and how many distinct sources were used. The combined open-items list holds every deliverable's `openItems`, each not-assessed criterion and not-checked research topic of a Screening, the missing connectors, each Diligence deal-killer finding and gap (deal killers first), each open IC memo risk, each Sourcing next action, a founder feedback disclosure check that has not passed, and each unresolved Portfolio concern and consent item.
