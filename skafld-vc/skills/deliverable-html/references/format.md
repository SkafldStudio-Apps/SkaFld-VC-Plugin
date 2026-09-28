# Deliverable format (skafld-vc.deliverable/v1)

The TypeScript source of truth is `lib/deliverables/types.ts` in the platform repository; this is the same format in prose. Documents written as `anchor-angels.deliverable/v1` (the name before the SkaFld VC rename) still validate. Fields marked Markdown go through a safe Markdown subset (headings, lists, bold, italic, code, tables, links to http(s), mailto or `/deals/...`); everything else is plain text. Raw HTML is always shown as text.

## Envelope (every deliverable)

```json
{
  "format": "skafld-vc.deliverable/v1",
  "house": "Example Angels",
  "type": "screening | diligence | ic_memo",
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

- `house` is optional: the network's short name from `whoami` (`house.short_name`). It labels a `deal` company as "<house> company"; without it the label is "Company on the platform". Omit it when there is no platform.
- `kind` is `deal` for a deal or application on the platform and `outside` for anything else, including every documents-only run. `dealId` only for a `deal` company; omit it for an Outside company.
- `sources[].id` is what `sourceIds` and `[^id]` in Markdown point at; an unknown id fails validation.
- Every body section below is optional, and every body takes `document` (Markdown): your full draft. Present sections render in the order listed, and `document` renders last as "Full draft" (or as the main content when there is little else). A body with no sections and no `document` is invalid.

## Screening report (`type: "screening"`)

Order: verdict, stage bar, scorecard, founders, deck audit, research, questions for the screening call.

- `verdict`: `{ decision, band?, reason, decidedBy?, hardFilters?, referTo? }`. `decision` is a short label ("Advance to screening call", "Pass on a hard filter", "Refer"); `reason` is Markdown; `hardFilters` is `{ mandate, roundSize, networkConnection }` with true, false or null.
- `stageBar`: Markdown, the stage-calibration line.
- `scorecard`: the `score_company` result, renamed to this format's camelCase fields as in the mapping below. Copy the numbers; never compute or round them.
  - `rubricVersion`, `scale?` (`{ min, max }`), `coverage` (0 to 1).
  - `composite`: `{ score, band }`. `score` is a number, band one of strong_consider, consider, neutral, pass, strong_pass, insufficient_evidence.
  - `published`: `{ score | null, withheld, withheldBecause? }` (`["coverage"]`, `["evidence"]`).
  - `criteria`: one per Rubric criterion, in Rubric order: `{ key, name?, weight?, status: "scored" | "not_assessed", score? (scored only), reasoning (Markdown), sources? (names or URLs), sourceIds? }`. A `not_assessed` criterion has no score; its `reasoning` says what evidence would be needed.
  - `missingConnectors?`, `highlights?`, `risks?`.

### From `score_company` to `body.scorecard`

`score_company` answers in snake_case; the deliverable is camelCase and some fields change shape. Map every field like this (anything not listed is not carried):

| `score_company` returns                                    | Deliverable field                                           | Notes                                                                                                                                                                     |
| ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rubric_version`                                           | `scorecard.rubricVersion`, and the envelope `rubricVersion` | Both must equal the scored run's version, or `save_deliverable` refuses.                                                                                                  |
| `composite.score`                                          | `scorecard.composite.score`                                 | Always a number. `save_deliverable` refuses a missing composite or one more than 0.005 from the scored run's.                                                             |
| `composite.recommendation`                                 | `scorecard.composite.band`                                  | The band before the gates.                                                                                                                                                |
| `published.score`                                          | `scorecard.published.score`                                 | `null` when withheld; never 0.                                                                                                                                            |
| `published.withheld`                                       | `scorecard.published.withheld`                              | A boolean.                                                                                                                                                                |
| `published.withheld_because`                               | `scorecard.published.withheldBecause`                       | `["coverage"]`, `["evidence"]`, both, or `[]`.                                                                                                                            |
| `published.recommendation`                                 | (not carried; optionally `verdict.band`)                    | `insufficient_evidence` when withheld.                                                                                                                                    |
| `coverage`                                                 | `scorecard.coverage`                                        | Already 0 to 1.                                                                                                                                                           |
| `criteria` (an object keyed by criterion key)              | `scorecard.criteria` (an array in Rubric order)             | One entry per key: `{ key, status, score, reasoning, sources }`. A scored entry may omit `status`; write `"scored"`. A `not_assessed` entry has no `score`; leave it out. |
| `criteria.<key>.sources`                                   | `scorecard.criteria[].sources`                              | Names or URLs as given; add `sourceIds` for sources in the envelope.                                                                                                      |
| `not_assessed`                                             | (nothing; it is the criteria with `status: "not_assessed"`) |                                                                                                                                                                           |
| `missing_connectors`                                       | `scorecard.missingConnectors`                               | Also `body.missingConnectors` when research used them.                                                                                                                    |
| `evidence_count`, `run_id`, `persisted`, `next`, `subject` | (not carried)                                               |                                                                                                                                                                           |

From `get_rubric`, per criterion, `name` and `weight` go on each `scorecard.criteria[]` entry, and the Rubric's `scale` (`{ min, max }`) goes in `scorecard.scale`.

- `founders`: `[{ name, role?, history (Markdown), verification?: verified | single_source | claimed, gap?, notChecked?, sourceIds? }]`, and `foundersNote?` (Markdown).
- `deckAudit`: `{ slides?, missingSlides?, claims: [{ slide?, claim (verbatim), status: supported | contradicted | unsupported | not_checked, basis?: sourced | asserted | marketing, note?, sourceIds? }], inconsistencies? }`.
- `research`: `[{ topic, status: checked | not_checked, findings? (Markdown), connector?, sourceIds? }]`, and `missingConnectors?` (for example `["apollo"]`).
- `questions`: ranked, most scorecard-moving first: `[{ question, why? }]`.

## Diligence plan (`type: "diligence"`)

Order: stage bar, workstreams, data room audit, unit economics, cap table, deck audit, gaps as tasks, requests to the company.

- `stageBar`: Markdown.
- `workstreams`: `[{ key, needs: [{ item, kind: document | call, status: in_data_room | partial | missing, note?, sourceIds? }], notes? }]`, key one of team, market_customers, product_technology, financial, legal_corporate, deal_terms (rendered in that order).
- `dataRoom`: `[{ document, workstream?, status: present | partial | missing | outdated, note?, sourceIds? }]`.
- `unitEconomics`, `capTable`: `{ analysis (Markdown), missing? }`.
- `deckAudit`: as in the Screening report, statuses against the data room.
- `gaps`: `[{ task, closes, owner?, workstream? }]`: one line each, with the document or call that closes it and a suggested owner.
- `requests`: `[{ request, detail?, workstream?, priority?: required | helpful, due? (YYYY-MM-DD) }]`: what the company is asked for, worded to be sent to the founder as is (see the `diligence-requests` skill). The founder request list in Excel is built from these and nothing else, so nothing internal goes here.

## IC memo (`type: "ic_memo"`)

Order (memo-format): header, recommendation, company, why now, why this team, what has to be true, traction and unit economics, terms and comparables, risks and the bear case, network fit, open items.

- `header`: `{ stage?, ask?, valuation?, valuationBasis?: pre | post, scorecardStatus?: draft | confirmed }`.
- `recommendation`, `company`, `whyNow`, `whyTeam`, `traction`, `terms`, `bearCase`, `networkFit`: Markdown.
- `whatHasToBeTrue`: `[{ statement, test, status?: supported | contradicted | open }]`.
- `risks`: `[{ risk, mitigant?, status: mitigated | open }]`. At least three real risks.
- `agentDerived`: section keys you derived yourself rather than read from confirmed work.
- Open items go in the envelope `openItems`.

## Package (skafld-vc.package/v1)

Built by `render_package` (or `buildPackage` on the platform) from deliverables about one company: `{ format, house?, company, generatedAt, preparedBy, rubricVersion?, deliverables[] }`, ordered Screening, Diligence, IC memo. The cover shows the company, the date, who ran each deliverable, the Rubric version and how many distinct sources were used. The combined open-items list holds every deliverable's `openItems`, each not-assessed criterion and not-checked research topic of a Screening, the missing connectors, each Diligence gap and each open IC memo risk.
