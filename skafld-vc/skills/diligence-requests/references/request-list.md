# Canonical request list by stage

The seed list every Diligence plan starts from. `SKILL.md` step 1 says how to use it: take the rows for the company's stage, subtract what the data room already holds, and add what the plan found missing. Nothing here is sent as is.

## How to read this list

- **Stage tag.** Each row carries the earliest stage at which it is asked: `pre-seed` rows are asked at every stage, `seed` rows at seed and Series A, `A` rows at Series A only. A row the company cannot produce at its stage is left out, not marked missing.
- **Workstream.** Each section maps to one of the six workstreams the request file groups by: `team`, `market_customers`, `product_technology`, `financial`, `legal_corporate`, `deal_terms`. A row that serves two workstreams is listed once, under the one that owns the decision.
- **Canonical name.** The bold words at the start of each row are the document's canonical name. Start the `request` text with it, so the request list, the data room audit and the tracker name the same document.
- **Why it is on the list.** Every list of this kind is long for a reason, but the reason may not apply to this company. Before a row goes in, say to yourself why it is there and what decision it informs; if neither applies, drop it. Prioritise: the company has little capacity to produce documents and the deal team little capacity to read them (Stanford Search Fund Primer, 2021, Exhibit 25). Separate the elephants, the items that could kill the deal, from the ants (Stanford Search Fund Primer, 2021, Part VI).
- **Ask for what exists.** A lighter report the company already runs often answers the question as well as a bespoke analysis would (Stanford Search Fund Primer, 2021, Part VI). Ask for the most recent statements, not years of history (Y Combinator, Series A Diligence Checklist, c. 2019).
- **Materiality.** A contract is material, and requested, when it is worth more than $25,000 (Y Combinator, c. 2019); a smaller contract the business could not easily replace is worth asking for too. For the rest, ask only for the standard form.
- **Warranty instead of investigation.** After the term sheet, legal diligence looks for skeletons and structural risk, and some items are better covered by a representation in the financing documents than by collecting paper (Wittenborn, 2015; Langer, 2018). Say so in the plan rather than requesting the document.

## Proportionality

Depth scales with the cheque and the stage (Hustle Fund, 2025; Wittenborn, 2015). The practitioner norms, which are consensus rather than measured (1752vc, Waveup and BVJ Consulting syntheses, 2026; Marathon VC, n.d.; Kruze Consulting, 2018 onward):

| Stage             | Typical scope                                                                                                                            | Length                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Pre-seed on SAFEs | Incorporation and the cap table, founder equity and IP, cash in the bank; often nothing else. A data room of about 8 to 12 documents.    | 1 to 2 weeks                                           |
| Seed              | The pre-seed rows plus monthly accounts, customer contracts and 3 to 5 customer calls; bank statements and cohort data where they exist. | 2 to 4 weeks, in parallel with the financing documents |
| Series A          | The full list below, with investor counsel on the legal rows; cohorts, CAC and gross-margin analysis expected.                           | 4 to 8 weeks                                           |

Pre-seed diligence is a questionnaire more than a document list (Gunderson Dettmer, Example Pre-Seed Due Diligence Checklist, n.d.); where a question answers the need, ask the question.

## 0. Access and process (all workstreams)

Source: Stanford Search Fund Primer, 2021, Part VI and Exhibit 15.

| #   | Request                                                                                                                                                                                                                                                     | Stage    |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 0.1 | **Confidentiality agreement.** Where the company requires an NDA before sharing documents, agree it before the list is sent; the list asks for nothing confidential until then.                                                                             | pre-seed |
| 0.2 | **One prioritised list.** Send a single list with what the deal team is trying to learn at this stage and who on the team will read what, so the company can see why each item is asked.                                                                    | pre-seed |
| 0.3 | **Tracking.** The deal team records who asked for each item, the date it was asked for and the date it arrived, in its own tracker only (Exhibit 15's "Requested By / Date Requested / Date Received" columns). These dates never go on the company's copy. | pre-seed |

## A. Corporate and governance (`legal_corporate`)

Sources: Cooley GO, Sample VC Due Diligence Request List, 2023; Y Combinator, c. 2019; Gunderson Dettmer, n.d.; Hudson, Due Diligence Checklist for Pre-Seed Companies, 2023.

| #   | Request                                                                                                                                                                                                                | Stage    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| A.1 | **Certificate of incorporation (charter)** with all amendments, and the **bylaws**. Say where the company is incorporated and as what (C-corporation, PBC, LLC), and whether it is qualified to do business elsewhere. | pre-seed |
| A.2 | **Board and stockholder consents and minutes** since formation, including the consents that issued founder stock and approved each SAFE or note.                                                                       | seed     |
| A.3 | **Stockholder agreements** from any prior priced round: voting, right of first refusal and co-sale, investor rights.                                                                                                   | A        |
| A.4 | **Stock ledger.**                                                                                                                                                                                                      | A        |
| A.5 | **Subsidiaries and foreign entities**, only if any exist.                                                                                                                                                              | A        |
| A.6 | **Licences and permits** the business needs to operate, where the sector is regulated.                                                                                                                                 | seed     |
| A.7 | **Accelerator or incubator agreements**, and any equity or rights they carry.                                                                                                                                          | pre-seed |

## B. Capitalisation and securities (`deal_terms`)

Sources: Cooley GO, 2023; Y Combinator, c. 2019; Hudson, 2023; GoingVC, Cap Tables 101, the convertible tutorial workbook and the angels cap table template, n.d. Every row here feeds `skafld-vc:cap-table` and `skafld-vc:term-sheet`.

| #    | Request                                                                                                                                                                                                   | Stage    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| B.1  | **Fully diluted cap table** by holder and class, with issued options, the unallocated pool and every convertible, in one file. One cap table that shows every SAFE is the pre-seed test (Hudson, 2023).   | pre-seed |
| B.2  | **Option plan and option holders schedule**: grant dates, vesting, cliff and any acceleration; the pool's size and whether it was sized on the pre-money or the post-money; the latest 409A valuation.    | seed     |
| B.3  | **Every SAFE**: investor, amount, valuation cap, discount, MFN, pre-money or post-money form, and any side letter.                                                                                        | pre-seed |
| B.4  | **Every convertible note**: principal, interest rate, issue date, maturity date, cap and discount.                                                                                                        | pre-seed |
| B.5  | **Warrants**, if any.                                                                                                                                                                                     | seed     |
| B.6  | **Founder stock purchase agreements and vesting schedules**, with founder share counts by person and evidence that 83(b) elections were filed. How the founders split the equity, and why (Hudson, 2023). | pre-seed |
| B.7  | **Promised equity**: anything offered to advisers, accelerators, early hires or contractors and not yet granted (Hudson, 2023; Gunderson Dettmer, n.d.).                                                  | pre-seed |
| B.8  | **Departed founders**: who left, what they kept, and any unsettled claim (Hudson, 2023).                                                                                                                  | pre-seed |
| B.9  | **Loans or repurchase agreements with founders or other insiders.**                                                                                                                                       | seed     |
| B.10 | **Prior round documents and the proposed term sheet** for this round: round size, pre- and post-money, the pool target and how the equity sold is calculated.                                             | seed     |
| B.11 | **Lead and co-investors** in this round, and which existing investors are following on (GoingVC, The Complete Guide to VC Due Diligence, n.d.).                                                           | pre-seed |
| B.12 | **Securities-law filings** for past issuances (Form D, state notices, Rule 701 for option grants).                                                                                                        | A        |

## C. Historical financials (`financial`)

Sources: Stanford Search Fund Primer, 2021, Exhibit 15 (scaled to seed); Y Combinator, c. 2019; Hudson, 2023; GoingVC, The Complete Guide to Due Diligence for Angels, n.d.

| #   | Request                                                                                                                                                   | Stage    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| C.1 | **Bank account and current cash**: the balance today, with a recent statement, set apart from money that is "closed" but not yet received (Hudson, 2023). | pre-seed |
| C.2 | **Bank statements** for the last 6 to 12 months, and a list of the company's accounts and who can sign on each.                                           | seed     |
| C.3 | **Monthly management accounts** (income statement, balance sheet, cash flow) since inception or for the last 12 to 24 months; unaudited is fine.          | seed     |
| C.4 | **Founder salaries**: what each founder is paid now and what the plan assumes (Hudson, 2023).                                                             | pre-seed |
| C.5 | **Budget against actual** for the current year.                                                                                                           | A        |
| C.6 | **Deferred revenue and pre-sales schedule**, with the revenue recognition policy: cash collected ahead of delivery is a liability, not revenue.           | seed     |
| C.7 | **Related-party transactions** and any contingent liabilities.                                                                                            | A        |
| C.8 | **Debt**: every loan, lender and covenant.                                                                                                                | seed     |
| C.9 | **Non-recurring items** in the periods reported.                                                                                                          | A        |

## D. Projections, runway and use of funds (`financial`)

Sources: Y Combinator, c. 2019; Wittenborn, 2015; GoingVC, What to Look for in a Founder Pitch, n.d.

| #   | Request                                                                                                                                                           | Stage    |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| D.1 | **Operating model** with its assumptions explicit (headcount, pricing, marketing spend, R&D).                                                                     | seed     |
| D.2 | **Burn and runway**: current monthly net burn and the runway this round buys, to a named milestone. The test is 12 to 18 months (Wittenborn, 2015; Langer, 2018). | pre-seed |
| D.3 | **Use of funds** by category and by milestone, more specific than "to build the product".                                                                         | pre-seed |

## E. Customers, revenue and pipeline (`market_customers`)

Sources: Stanford Search Fund Primer, 2021, Exhibits 15 and 25 (scaled to seed); Y Combinator, c. 2019; Hustle Fund, 2025; GoingVC, The Complete Guide to Due Diligence for Angels, n.d.

| #   | Request                                                                                                                                                                                                                                | Stage                              |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| E.1 | **Customer list with terms**: start date, contract length, recurring or one-off, price, and any pending cancellation.                                                                                                                  | seed                               |
| E.2 | **Standard customer contract**, and every customer contract worth more than $25,000.                                                                                                                                              | seed                               |
| E.3 | **Revenue by customer and by product or plan**, so concentration can be read (level, top-three share, trend; see `skafld-vc:unit-economics`).                                                                                          | seed                               |
| E.4 | **Discounts and pricing by contract.**                                                                                                                                                                                                 | A                                  |
| E.5 | **Pipeline report**, with how leads are generated and any channel partners.                                                                                                                                                            | seed                               |
| E.6 | **Outstanding proposals** and their revenue if won.                                                                                                                                                                                    | A                                  |
| E.7 | **Letters of intent, pilots and design-partner agreements.** An LOI is interest, not traction (Hustle Fund, 2025); ask whether each one is paid.                                                                                       | pre-seed                           |
| E.8 | **Lost customers** and the reason each left; **cohort retention by month** where there are enough customers to have cohorts.                                                                                                           | seed (lost customers); A (cohorts) |
| E.9 | **Customer references**: names of 3 to 5 customers the team may call, including one that churned or a prospect that chose someone else where one exists (1752vc and others, 2026). Calls come last, when the deal lead is leaning yes. | seed                               |

## F. Product and technology (`product_technology`)

Sources: GoingVC, The Complete Guide to Due Diligence for Angels, n.d. (technical section); Martinez, Point Nine, 2016; Stanford Search Fund Primer, 2021, Exhibit 15 (scaled). The call guide and the verdict are in `skafld-vc:technical-diligence`.

| #   | Request                                                                                                                                         | Stage    |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F.1 | **Product status and roadmap**: idea, MVP, beta or in market, and what ships next. A walkthrough or demo login where there is a product.        | pre-seed |
| F.2 | **Architecture overview**: the stack and why it was chosen, hosting, and the monthly infrastructure cost.                                       | seed     |
| F.3 | **Code repository access**, read only, or a description of where the code lives and who can change it. Only when the technical review needs it. | A        |
| F.4 | **Product analytics access**, read only (Mixpanel, Amplitude, PostHog or similar), or an export of the key usage metrics.                       | seed     |
| F.5 | **Security and data summary**: what customer data is collected and kept, and how it is protected.                                               | seed     |
| F.6 | **Contractor and outsourced development agreements**, with their IP assignment clauses.                                                         | pre-seed |
| F.7 | **Open-source licence inventory.**                                                                                                              | seed     |
| F.8 | **Backup and recovery**: how source code and customer data are backed up, and any outage or incident since launch.                              | A        |

## G. Intellectual property (`legal_corporate`)

Sources: Cooley GO, 2023; Y Combinator, c. 2019; Wittenborn, 2015.

| #   | Request                                                                                                                                                                                                                                                | Stage    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| G.1 | **IP assignment agreements** from every person who has contributed to the product: each founder, employee and contractor, including departed founders and anything written before incorporation. Name anyone who has not signed one (Cooley GO, 2023). | pre-seed |
| G.2 | **Domains** the company uses, and in whose name each is registered.                                                                                                                                                                                    | pre-seed |
| G.3 | **Trademark** applications and registrations.                                                                                                                                                                                                          | seed     |
| G.4 | **Patent** applications and grants, and any invention disclosures.                                                                                                                                                                                     | seed     |
| G.5 | **Licences in and out**, and any royalty agreement.                                                                                                                                                                                                    | A        |

## H. Team and people (`team`)

Sources: Stanford Search Fund Primer, 2021, Exhibits 15 and 25 (scaled); Y Combinator, c. 2019; GoingVC, The Complete Guide to Due Diligence for Angels, n.d.

| #   | Request                                                                                                                | Stage    |
| --- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| H.1 | **Organisation chart and people list**: role, start date, and whether full-time, part-time or contractor.              | seed     |
| H.2 | **Founder and management biographies**, professional history only.                                                     | pre-seed |
| H.3 | **Employment agreements and offer letters** (the standard form plus any that differ), and **contractor agreements**.   | seed     |
| H.4 | **Compensation summary** by person, including equity.                                                                  | A        |
| H.5 | **Departures** since founding and the reason for each.                                                                 | A        |
| H.6 | **Adviser agreements**, and what each adviser was promised.                                                            | seed     |
| H.7 | **Restrictive covenants** from founders' former employers (non-competes, non-solicits) that could touch this business. | seed     |
| H.8 | **Change-of-control benefits** and employee classification (Y Combinator, c. 2019).                                    | A        |

## I. Material agreements and legal (`legal_corporate`)

Sources: Cooley GO, 2023; Y Combinator, c. 2019; Hudson, 2023.

| #   | Request                                                                                                                                                                          | Stage    |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| I.1 | **Material agreements**: partnership, distribution, licensing or joint-venture agreements worth more than $25,000 or hard to replace.                                       | seed     |
| I.2 | **Insider contracts**, and any money owed to or by insiders.                                                                                                                     | seed     |
| I.3 | **Litigation**: any pending or threatened claim, demand letter or regulator correspondence. At pre-seed these most often involve former employees or co-founders (Hudson, 2023). | pre-seed |
| I.4 | **Privacy policy and terms of service** where the product collects personal data (Gunderson Dettmer, n.d.).                                                                      | seed     |
| I.5 | **Schedule of NDAs** the company has signed.                                                                                                                                     | A        |

## J. Market and competition (`market_customers`)

Sources: GoingVC, Founder Feedback Guide, n.d.; Stanford Search Fund Primer, 2021, Exhibit 15 (scaled).

| #   | Request                                                                                                     | Stage    |
| --- | ----------------------------------------------------------------------------------------------------------- | -------- |
| J.1 | **Market size workings**, both top-down and bottom-up, with their sources.                                  | pre-seed |
| J.2 | **Competitive overview**: the founders' own comparison with the main alternatives, including doing nothing. | pre-seed |
| J.3 | **Customer discovery notes**, surveys and pilot results, with the number of people behind each.             | pre-seed |

## K. Management reports and KPIs (`financial`)

Sources: Stanford Search Fund Primer, 2021, Exhibit 15; GoingVC, The Complete Guide to Due Diligence for Angels, n.d.

| #   | Request                                                                                                                                  | Stage |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| K.1 | **Management reports**: the dashboards or reports the founders actually run the company on, and how often.                               | seed  |
| K.2 | **KPI definitions** the company uses for MRR or ARR, churn, retention and CAC, so the figures can be recomputed on standard definitions. | seed  |

## L. Tax and compliance (`legal_corporate`)

Sources: Stanford Search Fund Primer, 2021, Exhibit 15 (scaled); Cooley GO, 2023.

| #   | Request                                                                       | Stage |
| --- | ----------------------------------------------------------------------------- | ----- |
| L.1 | **Tax returns** since inception, and any correspondence with a tax authority. | seed  |
| L.2 | **Payroll tax filings**, and the list of contractors paid.                    | A     |
| L.3 | **Sales tax or VAT registrations** where they apply.                          | A     |

## N. Conflicts (`deal_terms`)

Source: GoingVC, The Complete Guide to VC Due Diligence, n.d. The deal team's own conflict check against the portfolio and pipeline is internal and never appears in a request (`SKILL.md`, "What never goes in a request").

| #   | Request                                                                                                                                                                                                                 | Stage |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| N.1 | **Co-investor holdings**: whether the round's lead or co-investors hold a stake or a board seat in a company that competes with this one. A neutral disclosure request; never name a company the team is worried about. | seed  |

## Left out on purpose

These appear in the M&A and search-fund lists the categories above were scaled from, and do not belong at pre-seed to Series A: audited or statutory statements, auditors' working papers and management letters, quality-of-earnings reports, five-year budgets, transfer pricing, pension and actuarial items, union and employment-agency histories, environmental audits, IT strategy and disaster-recovery test results, and every insurance item (policy certificates, premium histories, claims, reinsurance, bonds) (Stanford Search Fund Primer, 2021, Exhibits 15 and 25; Y Combinator, c. 2019). If a specific exposure makes one of them decision-relevant, the deal team adds it with its reason.

## Sources

- 1752vc, Waveup and BVJ Consulting (2026). Practitioner syntheses of seed data-room and diligence norms. https://www.1752.vc/learn/due-diligence-checklist ; https://waveup.com/blog/due-diligence-checklist-for-fundraising/ ; https://www.bvjconsulting.com/checklist
- Cooley GO (2023). Sample VC Due Diligence Request List. https://www.cooleygo.com/documents/sample-vc-due-diligence-request-list/
- GoingVC (n.d.). The Complete Guide to Due Diligence for Angels; The Complete Guide to VC Due Diligence; Founder Feedback Guide; What to Look for in a Founder Pitch; Cap Tables 101; convertible tutorial and angels cap table workbooks. Practitioner reference library; no public URL.
- Gunderson Dettmer (n.d.). Example Pre-Seed Due Diligence Checklist. https://catalyze.gunder.com/print/v2/content/22419/example-pre-seed-due-diligence-checklist.pdf?lang=en
- Hudson (2023). Due Diligence Checklist for Pre-Seed Companies. Precursor Ventures. https://chudson.substack.com/p/due-diligence-checklist-for-pre-seed
- Hustle Fund (2025). How to Evaluate a Startup Before the Metrics Exist; Different levels of due diligence. https://www.hustlefund.vc/post/evaluate-pre-seed-founder-no-metrics ; https://www.hustlefund.vc/post/different-levels-of-due-diligence
- Kruze Consulting (2018 onward). VC Due Diligence Checklist by stage. https://kruzeconsulting.com/blog/due-diligence-checklist/
- Langer (2018). Due Diligence Humanized (cont'd). Point Nine. https://medium.com/point-nine-news/due-diligence-humanized-contd-55f95971bbdd
- Marathon VC (n.d.). Seed Stage Due Diligence Guidelines. https://marathon.vc/blog/seed-stage-due-diligence-guidelines
- Martinez (2016). A technical due diligence framework for early stage startups. Point Nine. https://medium.com/point-nine-news/a-technical-due-diligence-framework-for-early-stage-startups-c24d5408256e
- Stanford GSB (2021). Search Fund Primer, Part VI and Exhibits 15 and 25 (sample due diligence lists and topics). Practitioner guide; no public URL recorded.
- Wittenborn (2015). The Investor Checklist. Point Nine. https://medium.com/point-nine-news/the-investor-checklist-b9d1e6d3daab
- Y Combinator (Harris and Kwon, c. 2019). Series A Diligence Checklist. https://www.ycombinator.com/library/3h-series-a-diligence-checklist
