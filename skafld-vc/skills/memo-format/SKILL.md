---
name: memo-format
description: The format for investment memos, screening notes and committee write-ups - section order, thesis fit and network fit read from the house profile, a price verdict instead of a blended valuation, risks classified with bookends, a monitoring hand-off, citation style and the mandatory balanced case. Load whenever drafting or revising a memo, screening note or committee brief so every document reads as one voice.
---

# Memo format

## House profile first

When the platform is connected, call `whoami` and read `house`: `name`, `thesis`, `network_fit` (`label`, `description`), `decision_format`, `board_seats`, `check_range_usd`. Without a platform, use the network's thesis and network-fit description if the user gave them; otherwise write "not provided" in those sections rather than inventing a house view. Never name a network in the memo that the profile or the user did not supply.

## Audience and length

`house.decision_format` decides which document is the decision document:

| decision_format  | Decision document                                                    | Reader                            |
| ---------------- | -------------------------------------------------------------------- | --------------------------------- |
| `committee_memo` | IC memo; the screening note only decides whether diligence starts    | a committee reading before a vote |
| `partner_screen` | screening note, with the IC memo sections added where a partner asks | one or two partners               |
| `solo`           | a short screening note the investor keeps for themselves             | the investor                      |

Length defaults (a house style, not an evidence claim): one to two pages for a screening note, three to five for an IC memo. For `solo`, drop Network fit and Open-item owners if there is no one else to own them.

## Sections, in order

1. **Recommendation** in two sentences: what to do and the single most important reason.
2. **The company in one paragraph**: what it does, for whom, stage, ask, valuation.
3. **Why now**: the market, technology, platform or regulatory shift that makes this the moment (a required field in Sequoia's template, c. 2010-18).
4. **Thesis fit**: how the deal sits against `house.thesis` (sector, stage, geography, cheque within `house.check_range_usd`), quoting the thesis phrase it meets or misses. A miss is stated plainly; it is a house decision, not a flaw in the company.
5. **Why this team**: specific, verifiable reasons, not adjectives. Use the outcome-linked cues: a prior VC-backed company that went public (30% vs 21% success for first-time founders, Gompers, Kovner, Lerner and Scharfstein 2010), three or more years in the sector (Azoulay, Jones, Kim and Miranda 2020), leadership experience, and preparedness shown as command of market size and unit economics (Eisenmann 2020). Do not use school, age or displayed passion: they move investors but do not predict outcomes (elite-school founders are backed about 3x more than justified, Lyonnet and Stern 2022-24). Team scores predict raising the first $1M, while product and market scores predict $10M-plus outcomes (Jang and Kaplan 2025), so this section does not carry the memo alone.
6. **What has to be true**: three to five statements the thesis depends on, each tagged with how diligence tested it and the evidence strength that closes it: paid, behavioural, product, discovery or none (Hustle Fund 2025-26 proof ladder).
7. **Traction and economics**: figures with sources; the unit-economics table from `skafld-vc:unit-economics` if available, each benchmark cell with its year and sample.
8. **Terms and returns**:
   - _Price verdict_, four lines: where the ask sits in the comparables range (percentile, with the comparables' dates and count); the ceiling price at which the stage target multiple is still reachable after dilution; the break-even probability of the strong or outlier case against the base rate; terms flags (anything other than 1x, non-participating, pari passu, broad-based weighted average, no redemption; Cooley Q2 2026: 95.8% of deals 1x, 96.4% non-participating). Never show a blended or averaged "triangulated" value; the methods answer different questions. Include the sentence: the headline post-money is the price of the last preferred, not the company's value (Gornall and Strebulaev 2020).
   - _Structure and ownership_: instrument, cheque, ownership, the cap table from `skafld-vc:cap-table`.
   - _Scenario table_ from `skafld-vc:returns-analysis`, with its base-rate line and judgment-weighted multiple.
9. **Risks and the bear case**: written as if by a sceptical reader. Every finding is classified and bookended:

   | Finding | Class | Bookends (min / max impact on price and plan) | Evidence | Status |
   | ------- | ----- | --------------------------------------------- | -------- | ------ |

   Classes (Stanford GSB Search Fund Primer 2021, adapted to seed): **deal killer** (history materially different from what was reported, a major undisclosed liability, ethics or reputation concerns including criminal behaviour, prospects significantly diminished); **price** (moves what the round is worth); **terms** (only when a standard NVCA or SAFE lever exists for it: vesting, milestone tranche, pro rata, information rights, protective provision; otherwise it is price, operating risk or a pass); **operating risk** (to mitigate after close). At least three findings. A deal killer means the recommendation is pass, whatever the scores.

10. **Network fit**: headed with `house.network_fit.label`; assess the deal against `house.network_fit.description`, naming the members or expertise that match when the platform provides them. Engaged diligence and sector expertise are where the evidence for value beyond capital sits (Wiltbank and Boeker 2007: over 20 hours of diligence 5.9x versus 1.1x; industry expertise and involvement a couple of times a month relate to higher returns).
11. **Monitoring hand-off**: the "what has to be true" statements restated as the plan baseline, each with the metric, its value today, the value expected by a date, and the source. These are the numbers post-investment updates are compared against. State whether the house takes a board seat (`house.board_seats`) and what consent items or reporting that implies.
12. **Open items**: what is unresolved, who owns it, and by when.

## Variants

- **Follow-on memo**: open with the new-money test, "with no position, would we invest today at this price and on this evidence?" (Hustle Fund, n.d.). Then milestones against the stored plan baseline, round composition (insider-only rounds are about 20% more likely to fail and return 15-18% lower cash-on-cash, Ewens, Rhodes-Kropf and Strebulaev 2016, 22,382 follow-on rounds), pro-rata arithmetic with and without participation, and the opportunity cost against a new cheque.
- **Pre-close update**: what changed since the decision memo in findings, terms and plan baseline, and whether any change is a deal killer.

## Style

- Lead with conclusions; evidence follows.
- Cite inline with date and, where one exists, sample size: `[deck p.4]`, `[data room: financials.xlsx, FY2025]`, `[call 2026-09-12]`, `[platform: rubric v2, scored 2026-09-20]`, `[Carta, Jul 2026, software rounds]`, `[Wiltbank & Boeker 2007, n=1,137 exits]`.
- Numbers carry units and periods. No unexplained acronyms.
- Present both the bull and bear case honestly; a memo that only argues for the deal is returned for revision.
- A criterion or figure the materials do not support is written "not assessed" with what would resolve it, never scored down or guessed.
- Draft status is stated in the header until a named reviewer approves. The memo is for humans to decide; it never contacts the founder.

## Output header

```
# <Company> — <Screening note | IC memo | Follow-on memo> — DRAFT
<house.name or "no house profile"> · Stage <stage> · Ask $<n> at $<valuation> <pre|post> · Prepared <date> by <agent or person>
```

## Sources

- Azoulay, P., Jones, B., Kim, J. D. and Miranda, J. (2020). "Age and High-Growth Entrepreneurship." _AER: Insights_ 2(1). https://www.nber.org/system/files/working_papers/w24489/w24489.pdf
- Cooley (2026). Q2 2026 Venture Financing Report (166 deals). https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- Ewens, M., Rhodes-Kropf, M. and Strebulaev, I. (2016). "Inside Rounds and Venture Capital Returns." Working paper; 10,104 firms, 22,382 follow-on rounds 1992-2014. https://cear.gsu.edu/files/gravity_forms/25-64ec8d3580cca1f8f19bb5130dc7be11/2016/04/InsideRounds20160328.pdf
- Eisenmann, T. (2020). "Determinants of Early-Stage Startup Performance: Survey Results." HBS Working Paper 21-057. https://www.hbs.edu/ris/Publication%20Files/21-057_0c4f5410-3dcb-4c2f-8c4e-6fcbc358b92f.pdf
- Gompers, P., Kovner, A., Lerner, J. and Scharfstein, D. (2010). "Performance Persistence in Entrepreneurship." _Journal of Financial Economics_ 96(1). https://gwern.net/doc/economics/2010-gompers.pdf
- Gornall, W. and Strebulaev, I. (2020). "Squaring Venture Capital Valuations with Reality." _Journal of Financial Economics_ 135(1). https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Hustle Fund (2025-26). "How to Evaluate a Startup Before the Metrics Exist"; "Different levels of due diligence"; and "Angel Investing Psychology" (n.d.). https://www.hustlefund.vc/post/evaluate-pre-seed-founder-no-metrics ; https://www.hustlefund.vc/post/angel-squad-angel-investing-mindset-mistakes-the-mental-trap-costing-you-100x-returns
- Jang, Y. and Kaplan, S. (2025). "Venture Capital Start-up Selection." NBER Working Paper 33483; 8,000+ sourced deals at one early-stage VC, 2015-21. https://www.nber.org/system/files/working_papers/w33483/w33483.pdf
- Lyonnet and Stern (2022-2024). "Venture Capital (Mis)allocation in the Age of AI." SSRN 4260882. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4260882
- NVCA (2020-2026). Model Legal Documents. https://nvca.org/model-legal-documents/
- Sequoia Capital (c. 2010-18). "Writing a Business Plan" pitch template. https://www.nebraskaangels.org/file_download/7370ce25-b802-4cb9-b293-8b95737da264
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part VI "Evaluating due diligence findings" (deal killers, price, terms, risks; bookends).
- Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
