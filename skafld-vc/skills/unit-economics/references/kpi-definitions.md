# KPI definitions with worked formulas

The standard definitions `unit-economics` computes against. When a company uses a different definition, quote theirs and recompute under this one. Worked examples marked "(GoingVC)" are taken from the GoingVC angel diligence guide; examples marked "illustration" are made-up numbers that only show the arithmetic.

## Revenue

**MRR.** "The total contractually obligated revenue to be collected in a given month" (GoingVC). Recurring subscription revenue only.

**ARR.** MRR x 12. It excludes services, implementation and one-off revenue, and bookings are not revenue (a16z, 2015). ARR is a run-rate, not trailing revenue: always name the month that was annualised.

**Trailing twelve-month revenue (TTM).** The sum of recognised revenue over the last 12 months. Report it separately from ARR; never substitute one for the other.

**Net new ARR.** New + expansion + resurrected - churned - contraction, over the period.

## Retention

**Logo churn.** Customers lost in the period / customers at the start of the period. Example (GoingVC): 500 customers at the start, 400 at the end: (500 - 400) / 500 = 20%.

**Dollar revenue retention (DRR) in the guide's form.** Revenue from the starting customers at the end of the period / their revenue at the start. Example (GoingVC): $150 at the start, $200 at the end from the same customers: 200 / 150 = 133%, despite 50% logo churn. "It is important to view these metrics together as either alone can tell a misleading story."

**GRR (gross revenue or dollar retention).** (Beginning ARR - churned ARR - contraction ARR) / beginning ARR (KeyBanc and Sapphire, 2024). Cannot exceed 100%.

**NRR (net revenue or dollar retention).** (Beginning ARR + expansion ARR - churned ARR - contraction ARR) / beginning ARR (KeyBanc and Sapphire, 2024). New customers acquired during the period are excluded.

Illustration: beginning ARR $1,000k; expansion $150k; churned $80k; contraction $20k. GRR = (1,000 - 80 - 20) / 1,000 = 90%. NRR = (1,000 + 150 - 80 - 20) / 1,000 = 105%.

## Growth accounting and quick ratio

For each period, split the change in ARR (or MRR; or active users or accounts for a pre-revenue company) into five parts (Tribe Capital, 2019):

- **New**: from customers who were not customers before.
- **Expansion**: increases from existing customers.
- **Resurrected**: from customers who had left and came back.
- **Churned**: lost from customers who left.
- **Contraction**: decreases from customers who stayed.

**Quick ratio** = (new + expansion + resurrected) / (churned + contraction) (Tribe Capital, 2019).

Illustration: new $60k, expansion $20k, resurrected $5k, churned $15k, contraction $5k. Quick ratio = 85 / 20 = 4.25. Net new ARR = 85 - 20 = $65k.

## Burn, runway and burn multiple

**Net burn (monthly).** Cash out minus cash in from operations, per month; equivalently (cash at the start - cash at the end - financing received) / months. Treat it as a positive number. Example (GoingVC): raised $500,000 eight months ago, $150,000 left: (500,000 - 150,000) / 8 = $43,750 a month.

**Runway.** Cash / net burn. Example (GoingVC): 150,000 / 43,750 = 3.4 months.

**Burn multiple.** Net burn / net new ARR over the same period (Sacks, 2020). Bessemer's efficiency score is its inverse (Bessemer, 2023).

Illustration: net burn over the last four quarters $1,200k; net new ARR over the same four quarters $600k. Burn multiple = 1,200 / 600 = 2.0. When net new ARR is zero or negative the burn multiple is undefined: say so and report the components.

## Gross margin and contribution margin

**Gross margin.** (Revenue - COGS) / revenue. For software, COGS should include hosting, third-party software used to deliver the product, customer support and customer success. When support or success sits in opex, recompute with it moved into COGS and show both (High Alpha, 2024).

**Contribution margin.** Revenue - COGS - other variable cost to serve each customer (payment fees, variable support, onboarding). LTV and cohort value use contribution margin, not revenue or gross margin alone (a16z, 2015).

## Acquisition cost and payback

**Fully loaded CAC.** All sales and marketing expense in the period (salaries including founders' selling time, commissions, tools, paid acquisition, events, agencies) / new customers acquired. The guide's narrower form (marketing, advertising and PR / new customers) understates CAC; early-stage companies often omit founder salaries (High Alpha, 2024).

**CAC payback, company level (fully loaded, gross margin basis).** Months = sales and marketing expense for the period / ((new ARR + expansion ARR) x gross margin) x 12 (KeyBanc and Sapphire, 2024). Balderton writes a close variant, (CAC ratio / subscription gross margin) x 12 (Balderton, 2023); if its CAC ratio counts new ARR only, not new plus expansion, it gives a longer payback than KeyBanc's form for a company with expansion revenue, so name which one you used.

Illustration: quarterly sales and marketing $600k; new plus expansion ARR in the quarter $500k; gross margin 75%. Payback = 600 / (500 x 0.75) x 12 = 19.2 months.

**CAC payback, per customer.** Fully loaded CAC / (monthly revenue per new customer x gross margin).

## Lifetime value

**Realised cohort value (use with fewer than 12 months of cohorts).** For a cohort of customers acquired in one month or quarter: cumulative contribution from that cohort up to month n / number of customers acquired in the cohort, with churned customers kept in the denominator (Tribe Capital, 2019; a16z, 2015). Report it at months 3, 6 and 12 as the data allows and compare with CAC.

Illustration: 40 customers acquired in January; cumulative contribution through month 6 is $96,000. Realised value at month 6 = 96,000 / 40 = $2,400 per acquired customer. With a fully loaded CAC of $3,000 the cohort has not paid back at month 6.

**Formula LTV (only with 12 months of cohorts or more).** Monthly contribution per customer / monthly churn rate. Show the retention curve beside it and state that a single constant churn rate biases the result: real cohorts retain better over time as the least loyal customers leave, so a constant-rate formula misstates residual value (Fader and Hardie, 2010). A shifted-beta-geometric fit to the retention curve is the spreadsheet-sized alternative (Fader and Hardie, 2007).

**LTV to CAC.** LTV (contribution basis) / fully loaded CAC.

## Marketplace

**GMV** is the value transacted, not revenue. **Take rate** = revenue / GMV. Read GMV growth with take rate and liquidity (match or fill rate) (a16z, 2020).

## Sources

- GoingVC Research Library, "Complete Due Diligence for Angels", Product KPIs chapter, undated. Practitioner guide read from a reference folder; no public URL recorded.
- Jordan, Hariharan, Chen and Kasireddy (a16z), "16 Startup Metrics", 2015. https://a16z.com/16-startup-metrics/
- a16z, "13 Metrics for Marketplace Companies", 2020. https://a16z.com/13-metrics-for-marketplace-companies/
- KeyBanc Capital Markets and Sapphire Ventures, "2024 KeyBanc Capital Markets and Sapphire SaaS Survey", 2024. https://www.key.com/content/dam/kco/documents/businesses___institutions/2024_kbcm_sapphire_saas_survey.pdf
- Cunningham (Balderton Capital), "The SaaS metrics that matter in 2023", 2023. https://www.balderton.com/wp-content/uploads/2023/07/The-SaaS-metrics-that-matters-in-2023_Balderton-Capital-1.pdf
- High Alpha, OpenView and Paddle, "2024 SaaS Benchmarks Report", 2024. https://www.highalpha.com/saas-benchmarks/2024
- Sacks (Craft Ventures), "The Burn Multiple", 2020. https://medium.com/craft-ventures/the-burn-multiple-51a7e43cb200
- Bessemer Venture Partners, "State of the Cloud 2023", 2023. https://www.bvp.com/atlas/state-of-the-cloud-2023
- Hsu (Tribe Capital), "A Quantitative Approach to Product Market Fit", 2019. https://tribecap.co/essays/a-quantitative-approach-to-product-market-fit
- Fader and Hardie, "Customer-Base Valuation in a Contractual Setting: The Perils of Ignoring Heterogeneity", Marketing Science 29(1), 2010. https://pubsonline.informs.org/doi/10.1287/mksc.1080.0482
- Fader and Hardie, "How to Project Customer Retention", Journal of Interactive Marketing 21(1), 2007. https://journals.sagepub.com/doi/10.1002/dir.20074
