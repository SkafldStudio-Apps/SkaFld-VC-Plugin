---
name: kpi-variance
description: Compares a portfolio company's KPIs with its history, budget, the IC memo plan and benchmarks, runs early-warning flags, and sets out cash, burn and runway. Use after a founder update is read, for a portfolio review, or when someone asks how a company is tracking against plan or how much runway it has.
---

# KPI variance

Four comparisons for every metric, in this order: against the company's own history (the prior period), against its budget, against the plan the IC memo recorded at investment, and against an outside benchmark band. The first three follow board-package practice, which reports results against history, budget and the projections made at the deal (Stanford Search Fund Primer, 2021), and angel-group guidance, which reports metrics against expectations and the business plan (Hudson, Angel Capital Education Foundation, c. 2008). The benchmark is added because the plan can be wrong and the external band is not the founder's own number.

This skill fills `kpis` and `cash` in a `portfolio_review`. The metric set is in `references/kpi-set.md`; the formulas and benchmark tables are those of `skafld-vc:unit-economics`. Read both before computing.

## How

1. **Collect the baselines.** The current period's stated figures (from `skafld-vc:founder-update`), the prior periods (previous portfolio reviews, or earlier updates), the company's budget if it shared one, and the plan baseline in the IC memo's monitoring hand-off: each metric with its value expected by a date. With a platform connected, read the IC memo and earlier reviews with `get_deliverables` and the documents with `search_documents`; otherwise use the files the user gave. A baseline that does not exist is "none", not zero.

2. **Fix the business model and the ARR band**, and select the tiers in `references/kpi-set.md`. Load `skafld-vc:stage-calibration` for the stage bar. The benchmark row for each metric depends on both.

3. **Build one row per metric** (`kpis[]`):

   - `metric`, `unit`, `actual`, `prior`, `budget`, `plan`: each as a number with its period, or left out when not stated.
   - `basis`: `stated` when the company gave the actual; `derived` when you computed it (the formula and inputs go in `note`); `benchmark` only for a row that carries a reference value and no company figure.
   - `variance`: every available comparison in one line, in the order prior, budget, plan: absolute and percent for amounts ("vs prior +$18k (+8%); vs budget −$6k (−3%); vs plan −$40k (−16%)"), percentage points for rates. Compare like periods only; a quarter is not compared with a month, and a run-rate is not compared with trailing revenue.
   - `note`: the benchmark band for the model and ARR band, with its source and year in the same line (from `skafld-vc:unit-economics`), and any definition change.
   - `sourceIds`: the update page or file for every figure.

4. **Set `status` against the band, not a fixed tolerance.** No published variance tolerance for KPIs against plan exists at seed, and angel-group guidance leaves the threshold to the group while warning that early companies rarely hit projections because they are only projections (Hudson, Angel Capital Education Foundation, c. 2008). So a miss against plan alone is not `off_track`. Use this rule and say it is a judgment:

   - `on_track`: at or above plan (or budget when there is no plan), or inside or above the benchmark band when there is neither, and no warning flag touches the metric.
   - `watch`: below plan or budget but inside the benchmark band, or worse than the prior period for two periods running.
   - `off_track`: a warning flag below fires on the metric, or it sits below the benchmark band and moved further away since the prior period.

   If the user or the house has set a tolerance for a metric, apply it and name where it came from. Never invent one.

5. **Run the warning flags** independently of the plan, and list any that fire first in the review with their source:

   1. Runway under 12 months, below the "good" level of 12 months in Bessemer's good/better/best scale (Bessemer, 2023). Running out of capital is the most cited cause in 431 shutdowns but is almost always the last cause, with product-market fit, timing and unit economics behind it (CB Insights, 2026), so name the underlying problem too.
   2. Burn multiple at 3 or above, or rising as the company matures (Sacks, 2020). It gathers gross margin, CAC, churn and growth problems into one number, so show those components beside it.
   3. Gross revenue retention below the median for the ARR band (about 90% is the norm, High Alpha, 2025; SaaSCan, 2025), or net revenue retention under 100% for a B2B company.
   4. Growth endurance (this year's growth divided by last year's) below the private-cloud median of about 65-70% (Bessemer, 2023; Benchmarkit and SaaSCan, 2025).
   5. No priced markup within about three years of the seed round: a seed deal not marked up by then seems unlikely ever to be (AngelList, 2023), and only 25-30% of seed companies reach Series A within 24 months in a normal year (Carta, 2018 cohorts).
   6. A proposed inside or bridge round with no outside lead (Ewens, Rhodes-Kropf and Strebulaev, 2016; Broughman and Fried, 2012).
   7. Cohort retention curves that keep falling instead of flattening (Rachitsky, 2020), or DAU/MAU falling while DAU is flat, meaning new users replace lost ones (UXCam, 2024, vendor data).
   8. High churn together with low dollar retention, which the angel diligence guide names as a major warning (GoingVC angel diligence guide, n.d.).
   9. A missed reporting period, from `skafld-vc:founder-update`. This is a behavioural flag only; no study with a stated method links update cadence to outcomes.
   10. Idle cash: runway beyond about 24 months at current burn with no dated uses for the surplus in the operating plan. The angel diligence guide warns that capital raised beyond an 18-to-24-month need tends to sit idle, that more cash than needed can lead a CEO into poor decisions, and that there should always be uses lined up for the cash (GoingVC angel diligence guide, n.d.). Name the surplus and ask what it is for; a planned acquisition or a hiring wave with dates clears it.
   11. Interest coverage below 1.20 where the company carries debt: EBIT / interest expense should be at least 1.20 (GoingVC angel diligence guide, n.d.). Where EBIT is negative, as it usually is before scale, the ratio means nothing; report instead the debt's interest and principal due in the next 12 months against cash and runway, and any covenant the lender can call.

   A long gap since the last financing is information too: the probability of a new round rises with time since the last one only up to a point (Korteweg and Sorensen, 2010). Mention it in the cash analysis when the gap is long.

6. **Read metrics in pairs.** Churn with net revenue retention, burn multiple with growth, GMV with take rate and liquidity (GoingVC angel diligence guide, n.d.; Sacks, 2020; a16z, 2020). Write each pair's reading in one sentence under the table.

7. **Set out cash** (`cash`):

   - `cash` at a stated date, `monthlyBurn` (net burn, a positive number, averaged over the last three months when available and said so) and `runwayMonths` = cash / net burn.
   - `analysis` in Markdown: how the cash figure is supported (bank statement, management accounts or stated only) and who controls the account (Stanford Search Fund Primer, 2021); runway at current burn and at burn plus and minus the last period's change; the month the company must start raising, as runway minus the fundraising time the company states (or "fundraising time not stated"); and any financing in the period, so cash movement reconciles with burn.
   - `sourceIds` for every figure.

8. **Flag the three sensitivities** the picture depends on most (a single large customer, a planned hire wave, a pending round) and what data would resolve each.

## Output

```
## KPI variance: <Company>, <period>
Model: <...> · ARR band: <...> · Plan baseline: IC memo <version, date>
Warning flags: <flag: evidence [source, year]> (or "none fired")

| Metric | Actual | Prior | Budget | Plan | Variance (prior; budget; plan) | Basis | Status | Benchmark band [source, year] |

Pairs: churn with NRR: ...; burn multiple with growth: ...
Cash: $<cash> at <date> (<how supported>; controlled by <...>) · net burn $<n>/month · runway <m> months (<m1>-<m2> at burn ± last change) · raise must start by <month> · idle cash <none | $<surplus> with no dated use> · debt service <interest coverage x, or due in 12 months vs cash, or no debt>
Sensitivities: 1. ... 2. ... 3. ...
Gaps: <baselines or metrics not stated>
```

## Rules

- Never infer a KPI the company does not state. A missing actual leaves the row with "not stated" and no status.
- Never present a derived figure without its formula and inputs, and never annualise fewer than three months without saying so. A run-rate is never trailing revenue (Stanford Search Fund Primer, 2021).
- Every benchmark carries its source and year. Where the business model has no dated benchmark, say "no dated benchmark found" and compare with history, budget and plan only.
- A status is a judgment against the band and the flags, labelled as such. There is no published tolerance at seed, so none is invented.
- The plan baseline is the IC memo's, never one you reconstruct after the fact. If the memo has none, say so; do not backfill a plan from the current results.
- Never contact the company or its founders. List questions for the human team.

## Sources

- Stanford GSB, "Search Fund Primer", 2021 edition, Part VII (first board meeting, reporting against history, budget and projections; operating dashboard). Read from a reference folder; no public URL recorded.
- Hudson (Angel Capital Education Foundation), "Best Practice Guidance for Angel Groups: Post Investment Monitoring", c. 2008. https://angelcapitalassociation.org/data/Documents/Resources/AngelCapitalEducation/ACEF_BEST_PRACTICES_Post_Investment.pdf
- Bessemer Venture Partners, "State of the Cloud 2023", 2023. https://www.bvp.com/atlas/state-of-the-cloud-2023
- CB Insights, "Why startups fail" (431 post-2023 shutdowns), 2026. https://www.cbinsights.com/research/report/startup-failure-reasons-top/
- Sacks (Craft Ventures), "The Burn Multiple", 2020. https://medium.com/craft-ventures/the-burn-multiple-51a7e43cb200
- High Alpha, "2025 SaaS Benchmarks Report", 2025. https://www.highalpha.com/saas-benchmarks
- Benchmarkit and SaaSCan (Thibodeau and Rike), "B2B SaaS Metric Benchmarks 2025", 2025. https://saascan.ca/wp-content/uploads/2025/06/SaaSCan-B2B-SaaS-Metric-Benchmarks-2025.pdf
- AngelList, "Do Startup Valuations Matter for Investment Returns?", 2023. https://www.angellist.com/blog/do-startup-valuations-matter-for-investment-returns
- Carta, seed-to-Series-A graduation cohorts, 2024-2026. https://carta.com/data/newsletter-graduation-rate-from-seed-to-series-a/
- Ewens, M., Rhodes-Kropf, M. and Strebulaev, I., "Inside Rounds and Venture Capital Returns", working paper, 2016. https://cear.gsu.edu/files/gravity_forms/25-64ec8d3580cca1f8f19bb5130dc7be11/2016/04/InsideRounds20160328.pdf
- Broughman, B. and Fried, J., "Do VCs Use Inside Rounds to Dilute Founders?", Journal of Corporate Finance 18(5), 2012.
- Rachitsky (with Winters), "What is good retention", 2020. https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29
- UXCam, "Mobile app retention benchmarks", 2024 (aggregated vendor data). https://uxcam.com/blog/mobile-app-retention-benchmarks/
- Korteweg, A. and Sorensen, M., "Risk and Return Characteristics of Venture Capital-Backed Entrepreneurial Companies", Review of Financial Studies 23(10), 2010.
- a16z, "13 Metrics for Marketplace Companies", 2020. https://a16z.com/13-metrics-for-marketplace-companies/
- GoingVC Research Library, "Complete Due Diligence for Angels" (Product KPIs chapter), undated. Read from a reference folder; no public URL recorded.
