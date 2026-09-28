---
name: stage-calibration
description: Fix the evidence bar for a startup's stage (idea, pre-seed, seed, Series A) from the rubric's stage table, read at run time, so scoring, triage and diligence judge the company against its peers rather than a later-stage bar. Use before any scorecard, screen or memo, and whenever a deal is criticised for lacking something.
---

# Stage calibration

Early-stage evaluation fails most often by applying a later-stage bar to an earlier company. This skill fixes the bar before anything is scored. It carries no stage table of its own: the table is the rubric's `stage_calibration` block.

## Procedure

1. **Load the stage table.** Take `stage_calibration` from the same rubric `skafld-vc:deal-scorecard` uses: the connected platform's `get_rubric`, else a `rubric.json` in the working folder, else the plugin's default rubric at `${CLAUDE_PLUGIN_ROOT}/rubrics/default.json`. Cite which one (and its version when the platform gives one). Follow its `rule`, its `procedure` and its `anti_patterns`; where they say more than this file, they win.
2. **Identify the stage.** Start from the round label the company gives. Sanity-check it against the row's typical ask, the instrument (SAFE, note or priced round), team size, product status, revenue, and the time since the last round. If they disagree, state the discrepancy and use the more conservative reading.
3. **Write the stage line:** "Stage: <stage>. Reasonable evidence at this stage: <list>. Not reasonable to expect: <list>." Take the reasonable evidence from the rubric's row for that stage (`typical_ask`, `product`, `reasonable_traction`, `team`). The rubric has no "not expected" field: derive that list from the rows of later stages (what they add) and from the rubric's `anti_patterns`.
4. **Carry that line into every downstream skill** so a reader sees the bar that was applied.
5. **Judge against the bar.**
   - Above the bar: say so. It is a highlight, not the baseline.
   - Below the bar for the claimed stage: score it down and name the gap.
   - Absent because the stage does not produce it yet: `not_assessed`, never a low score.
6. **Check the raise against the milestone it must reach:** 12 to 18 months of runway to a named milestone, usually the next round's bar, is the test (Point Nine's investor checklist, Wittenborn, 2015; Langer, 2018). The angel diligence guide's "eighteen to twenty-four months" (GoingVC, n.d.) is practitioner context for a longer plan, not the test. Where the rubric's `stage_calibration` states its own window, use the rubric's and cite it. Uses of funds must be more specific than "to develop the MVP" (GoingVC founder pitch guide, n.d.).
7. **Adjust for the benchmark population.** The medians in the default stage table are US figures from 2024 and 2025 (Carta, 2025) and from Point Nine's SaaS Funding Napkin (Janz, 2023). They skew to software and to the coastal hubs; Carta's own analyst advises adjusting down outside San Francisco (Walker, via PMF Show, 2025). Angel-group prices sit lower: the 2024 median seed pre-money among Angel Capital Association members was $10M (ACA, 2025), about 60% of Carta's $16M seed pre-money median. When the company is outside that population (a non-software business, a region outside the hubs, an angel-only round), say so in the stage line and adjust the bar down.

## Output

One line, placed above the scorecard or triage note:

```
Stage: <stage> (<rubric source/version>). Reasonable evidence at this stage: <list>. Not reasonable to expect: <list>. [Discrepancy: <label vs signals>.] [Benchmark adjustment: <why>.]
```

## Anti-patterns to name explicitly

- "No revenue" at idea stage is not a risk; it is the definition of the stage. About half of seed rounds are still pre-revenue (Point Nine SaaS Funding Napkin, Janz, 2023).
- A pre-seed company "lacking a sales team" is not a finding.
- An incomplete management team at pre-seed or seed is not a finding. "Do management teams need to be completely in place before being investable? No." (GoingVC angel diligence guide, n.d.)
- More than 24 months since the seed round is a question to ask, not a failing score. The median gap from seed to Series A was 616 days in Q2 2025 (Carta, 2025), and only about a fifth of recent seed cohorts reached Series A within 24 months (Carta and Walker, 2024-2025).
- A seed company is not measured against a VC fund's Series A ARR bar. One practitioner guide lists seed at $1M to $3M ARR, a VC-fund bar that the same guide contradicts elsewhere (FundersClub, via the GoingVC VC diligence guide, n.d.); cite such bars only as what the next round will expect.
- A Series A company with only anecdotal retention is a real gap.

## Rules

- Never hardcode a stage table here or in the output; quote the rubric's row and cite the rubric.
- Missing evidence the stage does not yet produce is `not_assessed`.
- Every benchmark you quote carries its source and date.
- This is part of a draft for a human reviewer.

## Sources

- Angel Capital Association (2025). Angel Funders Report 2025; The Early Stage Valuation Disconnect. https://angelcapitalassociation.org/blog/press-release-aca-publishes-2025-angel-funders-report/ ; https://angelcapitalassociation.org/blog/the-early-stage-valuation-disconnect/
- Carta (2025). State of Private Markets Q1 and Q2 2025; Series A fundraising Q2 2025. https://carta.com/data/state-of-private-markets-q1-2025/ ; https://carta.com/data/state-of-private-markets-q2-2025/ ; https://carta.com/data/series-a-fundraising-q2-2025/
- Carta (2025-2026). State of Pre-Seed 2025; State of Seed 2025. https://carta.com/data/state-of-pre-seed-2025/ ; https://carta.com/data/resources/state-of-seed-2025/
- Carta and Walker, P. (2024-2025). Seed to Series A graduation rates. https://carta.com/data/newsletter-graduation-rate-from-seed-to-series-a/ ; https://carta.com/data/linkedin-seed-2022-only-24-percent-reach-series-a/
- GoingVC (n.d.). The Complete Guide to Due Diligence for Angels; The Complete Guide to VC Due Diligence; What to Look for in a Founder Pitch. GoingVC Research Library, practitioner reference library; no public URL.
- Janz, C. / Point Nine (2023). What does it take to raise capital in SaaS in 2023 (SaaS Funding Napkin). https://medium.com/point-nine-news/what-does-it-take-to-raise-capital-in-saas-in-2023-56d8f617714
- PMF Show (2025). Summaries of Peter Walker (Carta) on Series A requirements. https://www.pmf.show/blog/series-a-requirements-2025-arr-bar-carta-data ; https://www.pmf.show/blog/series-a-fundraising-data-carta-q3-2025
- Wittenborn (2015) and Langer (2018), Point Nine. The Investor Checklist; Due Diligence Humanized. https://medium.com/point-nine-news/the-investor-checklist-b9d1e6d3daab ; https://medium.com/point-nine-news/due-diligence-humanized-contd-55f95971bbdd
