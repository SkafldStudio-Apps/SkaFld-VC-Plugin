# KPI set for portfolio reviews

The metrics `skafld-vc:founder-update` extracts and `skafld-vc:kpi-variance` compares. Use the definitions and formulas in `skafld-vc:unit-economics` for every metric it defines; where a company's definition differs, keep its figure as stated, note its definition, and recompute under the standard one only when the inputs allow.

Pick the tiers that fit the company. Tier A applies to every company; the others switch on by what the company does and its stage. A metric in a tier that applies but is absent from the update is "not stated", never estimated.

## Minimum every period

The update guides agree on a short fixed core: revenue (MRR or ARR) with the change from last period, retention or churn, cash, net burn and runway (Bromberg, 2024; Warp, 2024; Harris of YC via Visible, 2019). If any of these is missing, say so in the review.

## Tier A: every company

| Metric                                  | Notes                                                                                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MRR, ARR                                | ARR is recurring revenue only; services and one-off revenue are excluded (a16z, 2015). An ARR figure computed as MRR x 12 is a run-rate and is labelled so. |
| Customers                               | beginning and end of period, new, lost                                                                                                                      |
| Churn and revenue retention             | logo churn and dollar (net revenue) retention, read together (GoingVC angel diligence guide, n.d.)                                                          |
| Revenue, COGS, gross profit and margin  | what sits in COGS, as stated                                                                                                                                |
| Operating expenses                      | split into sales, general and administrative versus R&D where given                                                                                         |
| EBITDA                                  | with each add-back listed if the company reports an adjusted figure                                                                                         |
| Net burn, cash, runway                  | cash on hand at a stated date and who controls the account (Stanford Search Fund Primer, 2021, operating dashboard); runway = cash / net burn               |
| Headcount against plan                  | whether hiring matches the revenue growth it is meant to produce (GoingVC angel diligence guide, n.d.)                                                      |
| Use of funds against plan               | spend by category against the raise plan in the IC memo                                                                                                     |
| Deferred revenue, receivables, payables | where the company reports a balance sheet (Stanford Search Fund Primer, 2021, operating dashboard)                                                          |

## Tier B: once the company is acquiring customers

| Metric                                   | Notes                                                                                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAC, customer lifetime value, LTV to CAC | fully loaded and on a gross margin basis, as `skafld-vc:unit-economics` computes them                                                                                                         |
| CAC payback                              | months, gross margin basis                                                                                                                                                                    |
| Acquisition by channel                   | per channel (organic, paid, affiliates, events, influencers, referrals): leads, conversion rate, new customers, spend, cost per click (Forecastr, marketplace financial model template, n.d.) |
| Pipeline                                 | sales pipeline and sales by category or region where given (Stanford Search Fund Primer, 2021)                                                                                                |
| Usage                                    | how often users use the product; for consumer products cohort retention and DAU/MAU                                                                                                           |
| Marketplace                              | GMV, take rate (revenue / GMV), liquidity (fill rate, time to match), concentration (share of GMV from the top sellers or buyers); GMV is not revenue (a16z, 2020)                            |

## Tier C: physical and operating businesses only

Shipments, on-time delivery, manufacturing yield and customer service measures (Stanford Search Fund Primer, 2021, operating dashboard). These come from the search-fund dashboard, which was written for acquired operating companies; use them only for hardware, manufacturing or services-heavy companies, never as the default for software.

## Tier D: later stage only

EBITDA and operating margin, days sales outstanding and days payable outstanding, the cash conversion cycle, current and quick ratios, debt to equity, interest coverage (at least 1.20 where the company carries debt, GoingVC angel diligence guide, n.d.; meaningless while EBIT is negative), free cash flow and free cash flow to revenue (GoingVC late-stage DCF model, n.d., ratio analysis). Use only for companies with debt or at Series B and later.

## Reading rules

- Read metrics in pairs, never alone: churn with net revenue retention, burn with growth, GMV with take rate and liquidity. High churn together with low dollar retention is the pairing the angel diligence guide calls a major warning (GoingVC angel diligence guide, n.d.).
- A run-rate is never trailing revenue. Label every annualised figure run-rate and name the months it came from (Stanford Search Fund Primer, 2021).
- Keep the metric list and definitions the same from period to period so the series compares; a change of definition is recorded, not smoothed over.

## Sources

- Bromberg, A., "Investor updates", 2024. https://andybromberg.com/investor-updates
- Warp, "How to write investor updates", 2024. https://www.warp.co/blog/how-to-write-investor-updates
- Harris, A. (Y Combinator), via Visible, "Tips from YC", 2019. https://visible.vc/blog/tips-from-yc-using-asks-metrics-and-a-recap-to-power-your-investor-updates/
- Jordan, Hariharan, Chen and Kasireddy (a16z), "16 Startup Metrics", 2015. https://a16z.com/16-startup-metrics/
- a16z, "13 Metrics for Marketplace Companies", 2020. https://a16z.com/13-metrics-for-marketplace-companies/
- GoingVC Research Library, "Complete Due Diligence for Angels" (Product KPIs and Accounting chapters), undated; GoingVC late-stage DCF model, undated. Read from a reference folder; no public URL recorded.
- Forecastr, marketplace financial model template, undated. Read from a reference folder; no public URL recorded.
- Stanford GSB, "Search Fund Primer", 2021 edition, Part VII (operating dashboard). Read from a reference folder; no public URL recorded.
