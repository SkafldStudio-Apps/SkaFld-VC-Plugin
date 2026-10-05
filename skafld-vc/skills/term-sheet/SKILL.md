---
name: term-sheet
description: Extracts the terms of a seed or Series A round (SAFE, convertible note or priced preferred), explains what each clause does, and flags anything off market standard. Use when someone asks what a clause or preference does, whether terms are standard, to review a term sheet or check a SAFE, or when a screening or diligence plan works the deal terms. For whether the price is fair use valuation-triangulation; for payouts at exit, returns-analysis.
---

# Term sheet

Seed and Series A terms are standardised: nearly every priced deal carries a 1x, non-participating preference and broad-based weighted-average anti-dilution (the dated prevalence is in the `references/market-data.md` of `skafld-vc:valuation-triangulation`). So the useful work is extracting the terms exactly and detecting what departs from the standard, not modelling every clause. Early-round contracts put their contingencies in founder vesting, board control and milestones rather than in the preference stack (Kaplan and Strömberg, Review of Economic Studies, 2003), so read those clauses as closely as the price. The price itself is judged by `skafld-vc:valuation-triangulation`; the share arithmetic of conversions and pools is `skafld-vc:cap-table`; what each class receives at exit is `skafld-vc:returns-analysis`. This skill reads, explains and judges the terms.

## How

1. **Identify the instrument and the documents.** Post-money SAFE (cap, discount, MFN, side letter), pre-money SAFE, convertible note, or priced preferred. Say which documents you read: a signed or draft term sheet, the SAFE itself, or only the deck's summary. Terms seen only in a deck are "stated in the deck; document not seen". List every outstanding SAFE and note with its cap and discount, and all issued and promised options and the pool, because they decide who is diluted.
2. **Extract a SAFE.** Purchase amount; post-money cap; discount (note whether the form writes it as a discount or as a "discount rate" of 100 minus the discount); MFN; pro rata side letter and which round it covers; any change to the standard form, which should be none (Y Combinator, Post-Money SAFE User Guide and forms, 2018 onward). Ownership sold = the sum of amount / cap, before the priced round's new money and pool increase dilute it further; say so. A cap far from the market bands (the SAFE caps in the `references/market-data.md` of `skafld-vc:valuation-triangulation`) is a price question for `skafld-vc:valuation-triangulation`, not a terms flag.
3. **Extract a priced round, in the order of the NVCA model term sheet** (NVCA Model Legal Documents, term sheet 2020, Enhanced v3.0 2022, other documents updated October 2025): pre- and post-money and whether the pool sits in the pre-money (effective pre-money = pre − pool share × post; Nivi and Ravikant, "The Option Pool Shuffle", 2007); price per share; liquidation preference multiple, participation and any cap; seniority against prior series; dividends and whether cumulative; anti-dilution type and how its base is defined; conversion and automatic-conversion thresholds; protective provisions; board composition; founder vesting (share vested at closing, schedule, single or double trigger acceleration); pool size; drag-along thresholds; right of first refusal and co-sale; pro rata rights; information rights and the "Major Investor" threshold that grants them; redemption; pay-to-play; tranches or milestones; no-shop and expenses. A term the document does not contain is "not in the document", never assumed standard. What each term does, including the broad-based weighted-average formula CP2 = CP1 × (A + B) / (A + C) and how A is defined, is in `references/definitions.md`; read it before judging a clause.
4. **Run the off-market detector.** Report the standard package without comment: 1x, non-participating, pari passu with prior preferred, non-cumulative dividends, broad-based weighted average, no redemption, no pay-to-play in an up round, a post-money capped SAFE, founder vesting in place. Flag anything else with its prevalence and source beside it, from the term prevalence table in the `references/market-data.md` of `skafld-vc:valuation-triangulation`, and say what that table says about which stages its figures cover. Beside any flag, add one line: experienced investors take fewer downside protections, so heavy protections say something about the investor or the round, not only the company (Bengtsson and Sensoy, Journal of Financial Intermediation, 2011); participation lowers firm value while raising the investor's share (Ewens, Gorbenko and Korteweg, "Venture Capital Contracts", JFE, 2022).

5. **Check the terms against the house.** Read `house.check_range_usd` and `house.board_seats` from the house profile (resolved as the `references/house-profile.md` of `skafld-vc:setup` says: the platform's `skafld-vc:whoami`, else the saved firm profile from `setup:get_profile`, else the person). Does the house cheque clear the Major Investor threshold, so it gets information and pro rata rights? If the house takes board seats, does the board clause give one; if not, are information rights enough to monitor the company? Where the person names the cheque for this deal, use it; whatever none of them gives is "not checked".
6. **Say what each flagged term does to the classes.** For every off-market preference, participation, seniority or stack of SAFEs, say in one line which way it moves what common and the house's position receive, and that the headline post-money is the price of the last preferred share, not the company's value. The payout at exit values (0.5x, 1x, 2x and 5x the post-money) is computed in one place, `skafld-vc:returns-analysis` and its waterfall; run it there when the reader needs the figures, rather than here.
7. **Test the raise.** The round should fund 12 to 18 months of runway to a named milestone, usually the next round's bar (Wittenborn, "The Investor Checklist", Point Nine, 2015; Langer, "Due Diligence Humanized", Point Nine, 2018; the same test as `skafld-vc:stage-calibration`). Uses of funds should be specific. The angel diligence guide warns that a large surplus of cash can lead a CEO into poor decisions and treats unallocated cash as a red flag (GoingVC, The Complete Guide to Due Diligence for Angels, undated); flag a raise far beyond the plan's needs as idle cash.
8. **Classify the findings.** For a Diligence plan, class every finding as deal killer, price, terms or operating risk, with its low and high impact. A finding is "terms" only when a standard NVCA or SAFE lever exists for it (vesting, a milestone tranche, pro rata, information rights, a protective provision, a warranty); otherwise it is price, operating risk or a pass. For a Screening, the terms table and the raise test are the evidence for the rubric's deal-terms criterion; the rubric's anchors decide the score, and with no term sheet, SAFE or stated ask in the materials the criterion is `not_assessed`.

## Output

```
## Terms: <Company> (<instrument>, <documents read>)
Effective pre-money $<E> (pool <z>% in the <pre|post>-money) · post $<P> · price/share $<x> [source]
| Term | Value | Standard? | Prevalence (source) | Note / what it is worth |
Off-market: none | <flags>
House: Major Investor threshold <cleared | not cleared | not in the document> · board <...> · information rights <...>
Effect on proceeds: <one line per flagged term> · payouts at exit values: skafld-vc:returns-analysis
Raise test: <months> of runway to <milestone> [source] · uses of funds <specific | vague> · idle cash <yes/no>
Findings: <class>: <finding> (low <..> / high <..>)
```

In a Diligence plan the table and findings go under the `deal_terms` workstream and the gaps (a missing term sheet, an unsigned side letter) become tasks and, where the company can close them, requests through `skafld-vc:diligence-requests`.

## Rules

- Extract terms from the documents only. A term that is not there is "not in the document"; a document you have not seen is "not checked". Never infer a clause from market norms.
- Flag the deviation, give its prevalence and source, and stop; negotiating positions are the deal lead's. This skill is not legal advice; say so when a clause needs counsel.
- Quote the dated figures as dated, with the as-of date `references/market-data.md` gives them; they come from US law-firm and platform data and will age.
- Never contact the founder or the company's counsel. This is a draft for a human reviewer.

## Sources

The dated term prevalence and SAFE caps carry their sources in the `references/market-data.md` of `skafld-vc:valuation-triangulation`.

- Bengtsson and Sensoy (2011). Investor abilities and financial contracting. Journal of Financial Intermediation 20(4). https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1240844
- Ewens, Gorbenko and Korteweg (2022). Venture capital contracts. Journal of Financial Economics. https://www.nber.org/papers/w26115
- GoingVC (undated). The Complete Guide to Due Diligence for Angels. Practitioner reference library; no public URL.
- Kaplan and Strömberg (2003). Financial contracting theory meets the real world. Review of Economic Studies 70(2). https://www.nber.org/system/files/working_papers/w7660/w7660.pdf
- Langer (2018). Due Diligence Humanized (cont'd). Point Nine. https://medium.com/point-nine-news/due-diligence-humanized-contd-55f95971bbdd
- Nivi and Ravikant (2007). The Option Pool Shuffle. Venture Hacks. https://venturehacks.com/option-pool-shuffle
- NVCA (2020-2026). Model Legal Documents, including the model term sheet. https://nvca.org/model-legal-documents/
- Wittenborn (2015). The Investor Checklist. Point Nine. https://medium.com/point-nine-news/the-investor-checklist-b9d1e6d3daab
- Y Combinator (2018 onward). Post-Money SAFE User Guide; SAFE forms. https://www.ycombinator.com/documents
