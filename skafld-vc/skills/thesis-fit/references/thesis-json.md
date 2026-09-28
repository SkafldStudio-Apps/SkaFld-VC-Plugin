# thesis.json and thesis.md

A thesis in the working folder, for when no platform is connected (with a platform, `skafld-vc:whoami`'s house profile is the thesis and this file is not read). It overrides the thesis saved with `/skafld-vc:setup` for this project; the same shape can be saved there as `thesis_detail` so it applies everywhere. The shape follows the practitioner convention of pillars, a target taxonomy and explicit criteria, with the Stanford primer's criteria table and optional anchored scoring (Stanford GSB Search Fund Primer 2021, Part IV and Exhibit 13; "Investment thesis: digital health and clinician burnout", 2023). Every field except `title` is optional; a missing field is reported as missing, never filled in.

## thesis.json

```json
{
  "title": "Clinical workflow software",
  "version": "3",
  "decision": "go",
  "owners": [{ "name": "…", "depth": "ten years running hospital IT" }],
  "date": "2026-06-01",
  "reviewBy": "2027-06-01",
  "philosophy": "One paragraph: what the firm believes and why it is right to act on it.",
  "whyNow": "The shift that makes this the moment.",
  "vintage": "The funding climate the thesis assumes (hot or cold market) and why.",
  "mandate": {
    "sectors": ["healthcare software"],
    "geographies": ["United States", "Canada"],
    "stages": ["pre-seed", "seed"],
    "checkSize": { "min": 25000, "max": 250000 },
    "superPriority": ["sells to providers, not payers", "recurring revenue"]
  },
  "pillars": [
    {
      "key": "documentation",
      "name": "Documentation burden",
      "problem": "What is still burdensome, with a sourced figure.",
      "sourceIds": ["s1"]
    }
  ],
  "taxonomy": [
    {
      "key": "ambient-scribe",
      "name": "Ambient scribing",
      "pillarKeys": ["documentation"],
      "examples": ["…"]
    }
  ],
  "criteria": {
    "desirable": [
      "integrates with the major EHRs",
      "clinician-led founding team"
    ],
    "undesirable": ["single-customer revenue above 30%"],
    "gates": ["no hardware"]
  },
  "scoring": {
    "axes": [
      {
        "name": "Fit",
        "criteria": [
          {
            "name": "Pillar depth",
            "weight": 40,
            "anchors": { "1": "…", "2": "…", "3": "…", "4": "…", "5": "…" }
          }
        ]
      }
    ]
  },
  "missRateTolerance": "We accept passing on up to 1 in 10 companies that later raise a priced round.",
  "network": {
    "coInvestors": ["…"],
    "referralPartners": [{ "name": "…", "pillarKeys": ["documentation"] }]
  },
  "sources": [
    { "id": "s1", "title": "…", "url": "…", "date": "2025", "sample": "n=573" }
  ]
}
```

## Field notes

| Field                   | Meaning and how the skill uses it                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decision`              | `go`, `no_go` or `draft`, the primer's go / no-go final assessment. Anything missing owners, `whyNow` or `reviewBy` is read as `draft`.                                                                       |
| `owners[].depth`        | One line on the owner's domain experience. The specialisation effect is individual (Gompers, Kovner and Lerner 2009).                                                                                         |
| `whyNow`, `vintage`     | The timing claim and the market climate it assumes (Sequoia's "why now"; Nanda and Rhodes-Kropf 2013). `reviewBy` is when the claim is re-examined.                                                           |
| `mandate`               | The strategic-fit screens. Only the ones listed are applied; an agnostic house leaves them out. `checkSize` is whole dollars; it becomes a string such as "$25k-$250k" in the longlist's `mandate.checkSize`. |
| `mandate.superPriority` | Two or three criteria that eliminate a company missing any one of them (primer, Part IV).                                                                                                                     |
| `pillars`, `taxonomy`   | Pillars are the drivers of the problem; taxonomy leaves are the kinds of company that address them. Card `pillars[]` holds pillar names; the market map has one row per leaf.                                 |
| `criteria`              | Desirable and undesirable items are a framework, not hard limits (primer, Part IV); `gates` are hard. Each is checked with a source or marked "not checked".                                                  |
| `scoring`               | Optional. Weights sum to 100 per axis and every criterion has an anchored description per score (primer, Exhibit 13). Without it, fit is a 1-3 per criterion (primer's sample industry scorecard).            |
| `missRateTolerance`     | Optional. The house's stated tolerance for passing on companies that later succeed; `skafld-vc:inbound-triage` and `skafld-vc:anti-portfolio` report it, or "not set" when absent (Maurer, Buz, Dremel and de Melo 2024).                                                              |
| `network`               | Co-investors and referral partners per pillar: the warm paths a `pursue` status needs.                                                                                                                        |
| `sources`               | Every figure in the thesis cites one, with date and sample size where the source gives one.                                                                                                                   |

## thesis.md

A Markdown thesis is read by its headings, matched loosely: `# <title>`, then `Version`, `Decision`, `Owners`, `Review by` as lines near the top, and sections `Philosophy`, `Why now`, `Mandate` (sectors, geographies, stages, cheque size, super-priority as bullet lists), `Pillars` (one `###` per pillar with its taxonomy leaves as bullets), `Criteria` (desirable, undesirable, gates) and `Sources`. A section that is not there is reported as missing. When a heading is ambiguous, quote it and ask rather than guess what it means.
