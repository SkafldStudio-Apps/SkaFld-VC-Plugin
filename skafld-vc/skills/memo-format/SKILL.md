---
name: memo-format
description: The format for investment memos, screening notes and committee write-ups - section order, thesis fit and network fit read from the house profile, a committee pre-read for independent scoring, a price verdict instead of a blended valuation, the lead investor, risks classified with bookends including the portfolio-conflict result, a monitoring hand-off as a plan baseline, the follow-on variant with reserves and signalling, citation style and the mandatory balanced case. Load whenever drafting or revising a memo, screening note or committee brief so every document reads as one voice.
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

### Committee pre-read (`committee_memo` only)

Open the IC memo with a short pre-read instruction for the committee, above the Recommendation:

- Before any discussion, each member records a score per rubric criterion privately, from the memo and the evidence, without seeing anyone else's.
- The scores are combined mechanically (the rubric's own method) and the combined result is shown to the room before discussion begins; discussion then explains the spread rather than forming it.
- Each member notes any shared school, employer, investor network or prior working relationship with the founders, so affinity is on the record before the vote.

Why: when the same judges scored the same ventures independently, a judge moved about 0.14 points for each point the other judges' mean moved; once they conferred, about 0.8, and founder status cues became more salient (Fehder 2018). Judges who shared gender, ethnicity or university with a founder gave 8 to 11% higher pre-interview scores (Northern Finance Association paper, 2024, one VC accelerator). Multiple ratings improve reliability only when they are combined mechanically, not by discussion (Conway, Jako and Goodman 1995). The memo carries the instruction only: never record members' scores, votes or names in the memo.

## Sections, in order

1. **Recommendation** in two sentences: what to do and the single most important reason.
2. **The company in one paragraph**: what it does, for whom, stage, ask, valuation, and the use of funds: what the round pays for and the runway to a named milestone (the raise test in `skafld-vc:term-sheet`; 12 to 18 months is the working window). Written as `useOfFunds` (Markdown) in the IC memo deliverable.
3. **Why now**: the market, technology, platform or regulatory shift that makes this the moment (a required field in Sequoia's template, c. 2010-18).
4. **Thesis fit**: how the deal sits against `house.thesis` (sector, stage, geography, cheque within `house.check_range_usd`), quoting the thesis phrase it meets or misses, and the thesis version where the house profile or thesis file carries one. A miss is stated plainly; it is a house decision, not a flaw in the company. Written as `thesisFit` in the IC memo deliverable.
5. **Why this team**: specific, verifiable reasons, not adjectives. Use the outcome-linked cues: a prior VC-backed company that went public (30% vs 21% success for first-time founders, Gompers, Kovner, Lerner and Scharfstein 2010), three or more years in the sector (Azoulay, Jones, Kim and Miranda 2020), leadership experience, and preparedness shown as command of market size and unit economics (Eisenmann 2020). Do not use school, age or displayed passion: they move investors but do not predict outcomes (elite-school founders are backed about 3x more than justified, Lyonnet and Stern 2022-24). Team scores predict raising the first $1M, while product and market scores predict $10M-plus outcomes (Jang and Kaplan 2025), so this section does not carry the memo alone.
6. **What has to be true**: three to five statements the thesis depends on, each tagged with how diligence tested it and the evidence strength that closes it: paid, behavioural, product, discovery or none (Hustle Fund 2025-26 proof ladder).
7. **Traction and economics**: figures with sources; the unit-economics table from `skafld-vc:unit-economics` if available, each benchmark cell with its year and sample.
8. **Terms and returns**:
   - _Price verdict_, four lines: where the ask sits in the comparables range (percentile, with the comparables' dates and count); the ceiling price at which the stage target multiple is still reachable after dilution; the break-even probability of the strong or outlier case against the base rate; terms flags (anything other than 1x, non-participating, pari passu, broad-based weighted average, no redemption; Cooley Q2 2026: 95.8% of deals 1x, 96.4% non-participating). Never show a blended or averaged "triangulated" value; the methods answer different questions. Include the sentence: the headline post-money is the price of the last preferred, not the company's value (Gornall and Strebulaev 2020). Structured as `valuation` in the IC memo deliverable, the same price-verdict shape as the Screening's `price` (`comparables`, `ceiling`, `breakEven`, `terms`, and the `counter` for the deal lead), never a weighted table of methods.
   - _Lead investor_: who leads and prices the round, whether the lead is committed, and whether the house relies on the lead's diligence for any workstream (it can reduce depth, never replace the house's own read). "No lead yet" is a finding.
   - _Structure and ownership_: instrument, cheque, ownership, the cap table from `skafld-vc:cap-table`.
   - _Scenario table_ from `skafld-vc:returns-analysis`, with its base-rate line and judgment-weighted multiple.
9. **Risks and the bear case**: written as if by a sceptical reader. Every finding is classified and bookended:

   | Finding | Class | Type | Bookends: low / high impact on price and plan | Evidence | Status |
   | ------- | ----- | ---- | --------------------------------------------- | -------- | ------ |

   In the IC memo deliverable each row is a `risks` entry with `class` (`deal_killer`, `price`, `terms` or `operating_risk`), `type` (one of the twelve risk types in `skafld-vc:deal-scorecard`), `low` and `high` (the bookends) beside `risk`, `mitigant` and `status`. Opportunities are not risks: write them in the bear-case prose or the Diligence plan's findings.

   Always include the portfolio-conflict result from the Diligence plan's conflict check as a finding: "no conflict found" with what was searched, or the conflicting company and its stage, classed by what it means (usually operating risk; a direct conflict where the house takes board seats may be a deal killer).

   Classes (Stanford GSB Search Fund Primer 2021, adapted to seed): **deal killer** (history materially different from what was reported, a major undisclosed liability, ethics or reputation concerns including criminal behaviour, prospects significantly diminished); **price** (moves what the round is worth); **terms** (only when a standard NVCA or SAFE lever exists for it: vesting, milestone tranche, pro rata, information rights, protective provision; otherwise it is price, operating risk or a pass); **operating risk** (to mitigate after close); **opportunity** (upside diligence found, to act on after close). At least three risk findings. A deal killer means the recommendation is pass, whatever the scores.

10. **Network fit**: headed with `house.network_fit.label`; assess the deal against `house.network_fit.description`, naming the members or expertise that match when the platform provides them. Engaged diligence and sector expertise are where the evidence for value beyond capital sits (Wiltbank and Boeker 2007: over 20 hours of diligence 5.9x versus 1.1x; industry expertise and involvement a couple of times a month relate to higher returns).
11. **Monitoring hand-off**: the "what has to be true" statements restated as the plan baseline, each with the metric, its value today, the target value, the date it is expected by, and the source; in the IC memo deliverable these are `planBaseline` entries (`metric`, `today`, `target`, `by`, `sourceIds`), one per statement in `whatHasToBeTrue`. These are the numbers post-investment updates are compared against by `skafld-vc:kpi-variance`, so a statement with no metric is rewritten until it has one or marked "not measurable". State whether the house takes a board seat (`house.board_seats`) and what consent items or reporting that implies.
12. **Open items**: what is unresolved, who owns it, and by when.

## Variants

- **Follow-on memo**: new underwriting, in this order.
  1. The new-money test: "with no position, would we invest today at this price and on this evidence?" (Hustle Fund, n.d.). If not, it is a pass memo whatever the signalling cost.
  2. Milestones against the stored plan baseline (the original memo's `planBaseline`), with the three-way table from `skafld-vc:kpi-variance` (prior periods, budget, plan), one row per statement: met, missed or not reported.
  3. Round composition: who leads and prices it. Insider-only rounds are about 20% more likely to fail and return 15-18% lower cash-on-cash (Ewens, Rhodes-Kropf and Strebulaev 2016, 22,382 follow-on rounds).
  4. Pro-rata arithmetic with and without participation (`skafld-vc:cap-table`).
  5. Reserves: the reserve this cheque draws on and what is left after it (from `skafld-vc:portfolio-construction`). Reserves add to returns only when concentrated in the highest-multiple companies; spread evenly they lower the fund's multiple (Thompson 2022), and a small early-stage fund may be better holding almost none and judging each pro-rata against a new investment (Walk 2026). Say where this company sits in the portfolio's multiples, then compare the same money as a new cheque (`skafld-vc:returns-analysis` on both).
  6. Signalling: not following on can be read by later investors as a negative signal, and a token follow-on does not remove it (Destin 2015). Weigh it, but never let it override the new-money test; if the recommendation is to pass, say whether the reason is the company or the house's own strategy.
- **Pre-close update**: what changed since the decision memo in findings, terms and plan baseline, and whether any change is a deal killer.

## Style

- Lead with conclusions; evidence follows.
- Every source registered in the deliverable's `sources` carries its date and, where the source gives one, its sample size.
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
- Conway, J., Jako, R. and Goodman, D. (1995). "A Meta-Analysis of Interrater and Internal Consistency Reliability of Selection Interviews." _Journal of Applied Psychology_ 80(5). https://exa.ai/library/publication/sjs19c44nwr
- Cooley (2026). Q2 2026 Venture Financing Report (166 deals). https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- Destin, F. (Accel) (2015). "Signalling Risk in Seed Rounds." https://medium.com/@fdestin/signalling-risk-in-seed-rounds-e5e5348c0420
- Eisenmann, T. (2020). "Determinants of Early-Stage Startup Performance: Survey Results." HBS Working Paper 21-057. https://www.hbs.edu/ris/Publication%20Files/21-057_0c4f5410-3dcb-4c2f-8c4e-6fcbc358b92f.pdf
- Ewens, M., Rhodes-Kropf, M. and Strebulaev, I. (2016). "Inside Rounds and Venture Capital Returns." Working paper; 10,104 firms, 22,382 follow-on rounds 1992-2014. https://cear.gsu.edu/files/gravity_forms/25-64ec8d3580cca1f8f19bb5130dc7be11/2016/04/InsideRounds20160328.pdf
- Fehder, D. (2018). "Evaluation of early-stage ventures: bias across evaluation regimes" (MassChallenge judges). AEA conference paper. https://www.aeaweb.org/conference/2018/preliminary/paper/bD36YfKn
- Gompers, P., Kovner, A., Lerner, J. and Scharfstein, D. (2010). "Performance Persistence in Entrepreneurship." _Journal of Financial Economics_ 96(1). https://gwern.net/doc/economics/2010-gompers.pdf
- Gornall, W. and Strebulaev, I. (2020). "Squaring Venture Capital Valuations with Reality." _Journal of Financial Economics_ 135(1). https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Hustle Fund (2025-26). "How to Evaluate a Startup Before the Metrics Exist"; "Different levels of due diligence"; and "Angel Investing Psychology" (n.d.). https://www.hustlefund.vc/post/evaluate-pre-seed-founder-no-metrics ; https://www.hustlefund.vc/post/angel-squad-angel-investing-mindset-mistakes-the-mental-trap-costing-you-100x-returns
- Jang, Y. and Kaplan, S. (2025). "Venture Capital Start-up Selection." NBER Working Paper 33483; 8,000+ sourced deals at one early-stage VC, 2015-21. https://www.nber.org/system/files/working_papers/w33483/w33483.pdf
- Lyonnet and Stern (2022-2024). "Venture Capital (Mis)allocation in the Age of AI." SSRN 4260882. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4260882
- Northern Finance Association (2024). "Group decision making under real-world uncertainty: internal evidence from a VC accelerator." Conference paper. https://portal.northernfinanceassociation.org/viewp.php?n=2240195440
- NVCA (2020-2026). Model Legal Documents. https://nvca.org/model-legal-documents/
- Sequoia Capital (c. 2010-18). "Writing a Business Plan" pitch template. https://www.nebraskaangels.org/file_download/7370ce25-b802-4cb9-b293-8b95737da264
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part VI "Evaluating due diligence findings" (deal killers, price, terms, risks; bookends).
- Thompson, B. (Sapphire Partners) (2022). "Dirty Secret: Venture Reserves are Not Always a Good Thing." https://sapphireventures.com/blog/dirty-secret-venture-reserves-are-not-always-a-good-thing/
- Walk, H. (Homebrew) (2026). "Early stage venture funds of $100 million or less should hold almost no reserves for follow-on." https://hunterwalk.com/2026/07/23/ive-changed-my-mind-early-stage-venture-funds-of-100-million-or-less-should-hold-almost-no-reserves-for-follow-on/
- Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
