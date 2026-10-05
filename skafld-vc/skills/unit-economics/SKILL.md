---
name: unit-economics
description: Reconstructs a startup's unit economics (burn, runway, gross margin, CAC payback, retention, burn multiple) from what it discloses and compares them with dated benchmarks for its model and stage. Use for diligence, a memo's financial section, or when testing a deck's numbers.
---

# Unit economics

Reconstruct, do not decorate. Every figure carries its source and one label: **stated** (the company says it), **derived** (you computed it, formula and inputs beside it) or **benchmark** (an outside reference, with its source and year). The output is a draft for a human reader.

Worked formulas for every metric are in `references/kpi-definitions.md`. Read it before computing anything.

## Procedure

1. **Collect the inputs.** Monthly revenue split into recurring and non-recurring, gross margin and what sits in COGS, monthly opex by function (sales and marketing, R&D, G&A), cash at each month end and the latest bank statement, money committed by investors but not yet received, what each founder is paid now and what the plan assumes, customers or accounts by month (new, lost, expanded, contracted, returned), revenue by customer with each contract's term, the sales cycle, sales and marketing spend including salaries, and any cohort table. With a platform connected, read the deal's extracted figures with `skafld-vc:get_deal_details` and the data room with `skafld-vc:search_documents`; otherwise use the files the user gave. List every input that is missing.

2. **Fix the business model and the ARR band.** Business model: software (SMB, mid-market or enterprise by contract value), marketplace, consumer subscription, hardware, services-heavy, or other. ARR band: under $1M, $1-5M, $5-20M, $20-50M, over $50M. Load `skafld-vc:stage-calibration` for the stage bar. The benchmark rows you use in step 8 depend on both.

3. **Apply the "not yet measurable" rule under $1M ARR.** Every benchmark in `references/benchmarks.md` comes from companies that already have recurring revenue; none is specific to angel-stage companies, and at this size a ratio rests on a handful of customers. Under $1M ARR:

   - Always report gross margin, net burn and runway; they are measurable at any size.
   - Report NRR, GRR, CAC payback, LTV and burn multiple only when at least 12 months of customer history exist. Otherwise write "not yet measurable" with the reason (for example "4 paying customers, 5 months of history"). Show the raw counts instead.
   - For pre-revenue or thin-revenue companies, run growth accounting on active users or accounts as the proxy (Tribe Capital, 2019).
   - "Not yet measurable" feeds a scorecard as `not_assessed`, never as a low score.
   - **Cash truth before revenue.** At pre-seed the financial work is corporate hygiene plus cash: the bank balance today, shown on a statement, kept apart from money described as "closed" that has not arrived; and runway computed twice, with founder salaries as paid and as the plan assumes them (often zero), so a reader sees what the runway depends on (Hudson, 2023). The level of burn is an effect, not a cause: in one pre-seed fund's first 150 companies, those that went on to raise a seed round had burned more, about $59k a month against $47k, and the fund reads that as spending following progress (Hudson and Girgis, 2023). Ask what the money produced, not whether the burn is low.

4. **Derive what the inputs allow**, using the definitions in `references/kpi-definitions.md`:

   - Net burn and runway (cash / net burn).
   - Gross margin on the company's own COGS, then again with customer support and hosting moved into COGS if they sit in opex.
   - CAC payback on a gross margin basis with fully loaded CAC (KeyBanc and Sapphire, 2024): months = sales and marketing spend / ((new + expansion ARR) x gross margin) x 12. Check that sales and marketing includes founder time spent selling and that customer success sits in COGS; early-stage CAC usually omits both and looks better than it is (High Alpha, 2024).
   - Cohort value. With fewer than 12 months of cohorts, report realised cohort value: cumulative contribution per customer acquired in the cohort at months 3, 6, 12 and 24 as available, with churned customers kept in the denominator (Tribe Capital, 2019; a16z, 2015, which recommends realised 12- and 24-month values over a projected curve when data are few). Do not present a formula LTV. With 12 months or more you may add a formula LTV, but show the retention curve beside it and say that a single retention rate biases the result, because cohort retention rises as low-retention customers leave (Fader and Hardie, 2010).
   - LTV and cohort value on contribution margin (revenue minus COGS minus variable cost to serve), never on revenue (a16z, 2015).
   - Growth accounting for each period: new, expansion, resurrected, churned and contraction ARR (or MRR, or active users), and the quick ratio = (new + expansion + resurrected) / (churned + contraction) (Tribe Capital, 2019).
   - GRR and NRR from beginning-of-period ARR (KeyBanc and Sapphire, 2024).
   - Burn multiple = net burn / net new ARR over the same period (Sacks, 2020).
   - **Cohort rules.** Never annualise or extrapolate a cohort younger than the sales cycle plus one renewal: until customers have had a chance to renew, retention has not been observed. Compare a seed company's cohorts with the ARR-band rows in `references/benchmarks.md`, never with public-company NRR. The small-company numbers are low: at under $300k ARR the median 12-month NRR was 56% (top quartile 78%, top decile 95%), rising to 70% at $300k to $1M and 77% at $1M to $3M (ChartMogul, 2023). Young companies show inflated gross retention because their customers have not yet had time to churn: companies under five years old reported 92 to 94% GRR against a 91% median overall (SaaS Capital, 2023). Say so when a young company's GRR looks strong.

5. **Customer concentration.** Report it every time revenue exists, as five facts: the largest customer's share of revenue (the level), the top three customers' combined share, the trend over the last periods, the largest contracts' remaining term, and whether the relationship is held by a founder personally. The conventions, which are practitioner consensus rather than measured thresholds (Glencoyne, L40 and Pomegra concentration guides, 2025): 10% is the line at which a US public company must disclose a customer (SEC Regulation S-K, as those guides note); 10 to 15% from one customer is where tracking starts at scale; over 25% from one customer makes concentration a primary diligence topic; top three over 50% is concentrated. Under $1M ARR, 40 to 70% from one customer is common and not disqualifying on its own. Judge the trend and the contract, not the level alone. The 20% "flag" some checklists use has no evidence behind it at seed; do not apply it.

6. **Reconcile.** Opex minus gross profit should approximate the stated net burn; treat burn as a positive number so the signs line up. Cash at the start minus cash at the end, less any financing received, should match cumulative net burn. Net new ARR from growth accounting should match the change in ARR. Headcount in the plan should match the revenue growth it is supposed to produce (GoingVC angel diligence guide, n.d.). Show every gap and its size; do not silently correct a stated figure. Reconstruct cash, not accounting profit: a company can generate cash while showing no profit and the reverse, and there is no direct link between profits and valuation (GoingVC, The Complete Guide to VC Due Diligence, n.d.). Deferred revenue (cash collected before delivery) is a liability, not revenue; name it when it flatters cash.

7. **Read metrics in pairs, never alone.** "View these metrics together as either alone can tell a misleading story" and "a high churn rate and low DRR is a major red flag" (GoingVC angel diligence guide, n.d.). The pairs:

   - Churn with NRR: high logo churn with NRR above 100% means expansion is masking losses; high churn with NRR below 100% is the red flag.
   - Burn multiple with growth: a burn multiple is only read with the growth rate that produced it. Bessemer's ideal profile is "100% growth and 1.2x burn multiple" (Bessemer, 2023). Put its components (net burn, net new ARR, gross margin, churn) beside it, because it aggregates several problems into one number (Sacks, 2020).
   - Payback with retention: payback "says nothing about what happens after payback" (Balderton, 2023).
   - Marketplace GMV with take rate: GMV is not revenue (a16z, 2020).

8. **Compare with the benchmarks** in `references/benchmarks.md` for the model and band from step 2. State which direction the company sits and by how much, with the benchmark's source, year and sample size in the same cell. Read the burn multiple's direction by stage: it is expected near 3 at seed, near 2 after Series A, and should fall with scale (Sacks, 2020) toward zero (a16z, 2022); a burn multiple that rises as the company matures is a warning (Sacks, 2020).

9. **Flag the three assumptions** the picture is most sensitive to, and what data would resolve each.

## Benchmarks

The dated benchmark tables (software medians by ARR band, other software references, consumer and marketplace references, the non-software gross margin band) are in `references/benchmarks.md`, each row with its source, year and sample size. Where the company's model has no row there, say "no dated benchmark found" and compare with the company's own history and plan only.

## Output

```
## Unit economics: <Company>
Model: <software segment / marketplace / ...> · ARR band: <band> · Stage bar: <from stage-calibration>
Basis: <n> months of data, <deck p.n / data room file / get_deal_details>

| Metric | Value | Label (stated / derived / benchmark) | Formula and inputs, or source and year |
| Gross margin | ... | ... | ... |
| Net burn, runway (with founder salaries as paid / as planned) | ... | ... | ... |
| Cash: bank balance on <date> vs committed not received | ... | stated | <statement> |
| CAC payback (fully loaded, GM basis) | ... or not yet measurable (<reason>) | ... | ... |
| Cohort value at 3 / 6 / 12 / 24 months | ... or too young (<cohort age> vs sales cycle + one renewal) | derived | ... |
| GRR, NRR | ... | ... | ... |
| Growth accounting (new / expansion / resurrected / churned / contraction), quick ratio | ... | derived | ... |
| Burn multiple | ... | derived | ... |

Customer concentration: largest <x>% · top three <y>% · trend <...> · largest contracts' term <...> · founder-held <yes/no> [convention: practitioner consensus, 2025]
Benchmark comparison: <metric: company vs benchmark (source, year, n), direction>
Joint readings: churn with NRR: ...; burn multiple with growth: ...; payback with retention: ...
Reconciliation: <each check, match or gap with size>
Run-rate versus trailing: <which figures are annualised, from which months>
Sensitivities: 1. ... 2. ... 3. ...
Gaps: <what would resolve them>
```

## Rules

- Never present a derived number without the formula and the inputs beside it.
- Never annualise fewer than three months of data without saying so.
- A run-rate is never trailing revenue. Label every annualised figure "run-rate", name the months it was annualised from, and keep trailing twelve-month revenue separate. Paying on run-rate means "paying for earnings that have not materialized" (Stanford Search Fund Primer, 2021). ARR excludes services and one-off revenue (a16z, 2015).
- Where the company reports an adjusted figure (adjusted EBITDA, "excluding one-offs"), list each add-back and recompute without it.
- Where the company reports a metric with an unusual definition, quote the definition and recompute under the standard one in `references/kpi-definitions.md`.
- Every benchmark cell carries its source, its year and its sample size (n), or "n not disclosed" when the source gives none. Never state a threshold without a source. When a newer edition of a source is available to you, use it and say which edition.
- A metric that cannot be computed yet is "not yet measurable" (and `not_assessed` in a scorecard), never a low score.
- This is a draft for a human decision. Cite every figure to a page, file or tool result. Never contact the company or its founders; list questions for the human team instead.

## Sources

Every source this skill cites, with the benchmarks', is listed in `references/benchmarks.md`.
