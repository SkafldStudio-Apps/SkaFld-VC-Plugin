---
name: valuation-triangulation
description: Judge whether an early-stage round's price is reasonable by decoding the ask, checking the terms, placing it in the comparables range, testing it against a ceiling from exit expectations and a break-even stress test, then giving a four-line price verdict and a counter, never a blended value. Use when a Screening scores deal terms, an IC memo writes its valuation verdict, or someone asks "is this price fair", "what should we pay", "is the cap too high" or "triangulate the valuation".
---

# Valuation triangulation

The four steps below answer four different questions: what is being asked, what comparable deals cost, what price still leaves the target return, and what chance of success the price assumes. They are shown side by side and never averaged into one "triangulated value". Comparables and exit expectations are the only valuation inputs with a measured link to the prices investors set: 80% of 885 VCs call comparables important and 86% exit considerations, and MOIC is the main metric for 63% (Gompers, Gornall, Kaplan and Strebulaev, "How Do Venture Capitalists Make Decisions?", Journal of Financial Economics, 2020). No pre-revenue heuristic (Berkus, Scorecard, Risk Factor Summation, the VC method as a point value) has ever been tested against later prices or outcomes; a 2026 search of the academic and practitioner literature found no such test.

The formulas, defaults and a worked example are in `references/methods.md`. Read it before computing anything.

## Inputs

- The ask: raise, instrument (priced round, post-money SAFE, pre-money SAFE, note), pre- or post-money valuation or cap, ownership offered, option pool target and where it sits, every outstanding SAFE and note.
- The terms, from `skafld-vc:term-sheet` (run it first if no one has).
- Sector, stage, region, AI or not, lead investor, quarter of the round.
- The rubric composite from `skafld-vc:deal-scorecard`, for placement.
- The cheque: `house.check_range_usd` from `whoami` when the platform is connected, else the cheque the user names.
- Exit evidence for the sector (acquisition prices or revenue multiples) from a source you can cite.

Anything missing is marked not assessed (an agent's deliverable writes `[TBD - not found in documents]`) and the step that needs it says so. Never fill an input from memory.

## How

1. **Decode the ask, and say it is arithmetic, not a valuation.** Post-money = raise / ownership sold; pre-money = post-money − raise. If the pool is carved from the pre-money, effective pre-money = pre-money − pool share × post-money (Nivi and Ravikant, "The Option Pool Shuffle", Venture Hacks, 2007). For post-money SAFEs, ownership sold = the sum of amount / cap (Y Combinator, Post-Money SAFE User Guide, 2018 onward). Load `skafld-vc:cap-table` for the price per share and conversions. If no pool size is given, use the seed median of 12.1% of fully diluted shares as a stated assumption (Carta, Founder Ownership 2026), not the 20% older guides use. Write one line: "$X for Y% → post $P; effective pre $E after a Z% pool in the pre-money."
2. **Check the terms.** Take the off-market result from `skafld-vc:term-sheet`. Standard at seed and Series A is 1x, non-participating, pari passu, broad-based weighted average, no redemption (Cooley, Q2 2026 Venture Financing Report: 95.8% of deals 1x, 96.4% non-participating; Wilson Sonsini, The Entrepreneurs Report Q2 2026: broad-based weighted average in 98 to 100%). If anything is flagged, say that the headline overstates the common-equivalent value and that step 6 shows by how much. Every output carries the sentence: the headline post-money is the price of the last preferred share, not the company's value (Gornall and Strebulaev, "Squaring Venture Capital Valuations with Reality", JFE, 2020).
3. **Place the ask in the comparables range. This is the primary anchor.** Run `skafld-vc:deal-comparables` (pipeline first on the platform; documents-only, the comparables the user gives plus dated external medians). Compare like with like: headline post-money to headline post-money, SAFE cap to SAFE cap, in the same funding regime (quarter, AI or not, region, lead tier). Report p25, median and p75 for post-money (or cap), round size and dilution, and the ask's percentile on each. Price is largely round size divided by a dilution norm (Carta, State of Private Markets and round benchmarks, 2026: median dilution 18% at seed and Series A, software rounds, six months to July 2026), so a high price with a normal dilution is a large round, and the argument is about the round size.
4. **Place the company inside that range.** Map the rubric composite onto the rubric's own percentile anchors (5 = top decile, 4 = top quartile, 3 = median, 2 = bottom quartile, 1 = bottom decile of deals seen at that stage) to get a placement percentile, and read the fair range off the comparables at the two anchors around it (`references/methods.md`, section 3). This replaces a separate Scorecard: Payne's Scorecard is a regional median times a factor near one, so it is a comparables method in disguise (Payne, "Scorecard Valuation Methodology", 2011, revised 2019). The mapping is a design choice with no validation behind it; say so. Expert scoring of this kind predicted commercialisation in hardware, energy, life sciences and medical devices but not in software or consumer products (Scott, Shu and Lubynsky, Management Science, 2020), so for software say the placement is weak. If the composite is withheld or not run, placement is not assessed and the range stands alone.
5. **Compute the ceiling (the VC method run backwards, with retention).** Maximum post-money today = exit value × retention / target multiple; maximum pre-money = that minus the raise. Retention is the product of (1 − dilution) over the expected later rounds and pool top-ups, from the same dilution path `skafld-vc:returns-analysis` uses, so price and returns never disagree. Target multiple at seed: 10x reference per deal, with 20 to 30x as the "what has to be true" case (Gompers et al. 2020: a 5x median requirement, higher for early stage; Payne 2011: angels seek 20 to 30x; Berkus, "After 20 Years: Updating the Berkus Method", 2016: a 10x hurdle). The target is a success-case return, not a cost of capital: VC target rates of 50 to 70% at start-up compare with realised early-stage VC returns near 21% (Damodaran, "Valuing Young, Start-up and Growth Companies", 2009). Take the exit value only from cited sector exit evidence; without it the ceiling is not assessed, never estimated. Also report the exit value the ask needs to reach the target.
6. **Run the break-even stress test (First Chicago, paid through the waterfall).** Four scenarios (loss, modest, strong, outlier), each paid through the preference stack to get proceeds on the cheque, never ownership × exit value (reuse the scenario table from `skafld-vc:returns-analysis` if it exists). Solve for the probability of the strong and outlier cases (5x or more) at which the judgment-weighted multiple reaches the portfolio target, 3x gross by default and stated. Compare it with the base rate: about 10% of US venture financings returned 5x or more and 4% 10x or more (Correlation Ventures data, 2004 to 2013, via Levine, 2014); 7% of angel-group exits returned more than 10x (Wiltbank and Boeker, "Returns to Angel Investors in Groups", 2007). This moves the unobservable input to the output (Achleitner and Lutz, "First Chicago Method", 2008; Steffens and Douglas, 2007); there is no evidence that scenario methods price better than heuristics, so present it as a sensitivity, never a value. Start the scenario weights from the default outcome prior in `references/methods.md` section 5 (under 1x 55-65%, 1-3x 25-30%, 3-10x 5-10%, 10x or more 3-6%), and remember that the failure probability falls as milestones are met, so a company past its next-round bar earns a better prior (Damodaran, 2009). A plan whose defensible chance of success is under 1% is uninvestable at any price (`references/methods.md` section 7).
7. **Write the verdict and the counter.** Four lines, then one recommended counter. Argue round size and pool placement before the headline number, because valuation is round size over dilution (Carta, 2026) and a pool in the pre-money lowers the effective price without touching the headline (Nivi and Ravikant, 2007). The counter is for the deal lead to use; it is never sent to the founder.

## Output

```
## Price verdict: <Company> (<stage>, <instrument>)
Ask (arithmetic, not a valuation): $<raise> for <x>% → post $<P>; effective pre $<E> after a <z>% pool in the pre-money [source]
1. Comparables: ask at p<n> of <k> in-regime deals (<quarters>, <regime>); placement p<m> from composite <c> → fair range $<a>–$<b> [placement unvalidated]
2. Ceiling: max post $<C> at <T>x, retention <r>, exit $<V> [source] → ask <below | above> by <%>; ask needs a $<V_req> exit
3. Break-even: 5x-plus outcomes must have p* = <x>% for a <3>x portfolio multiple, against a base rate of about 10% [Correlation Ventures 2004–13]
4. Terms: standard | <flags with prevalence> [skafld-vc:term-sheet]
Counter: <round size / pool placement / valuation, in that order of argument>
The headline post-money is the price of the last preferred share, not the company's value (Gornall and Strebulaev, 2020).
```

In a Screening this block goes into the report's document and informs the rubric's deal-terms criterion (the rubric's anchors decide the score). In an IC memo it is the price verdict under "Terms and returns" (`skafld-vc:memo-format`).

## Rules

- Never average, weight or blend the four answers, and never print a single "fair value". Payne's advice to use several methods is a call to compare answers, not to blend them.
- Never use Berkus, Risk Factor Summation, the Step Up checklist or a stand-alone Scorecard as a dollar figure. If a reader asks for them, print them in a footnote labelled "unvalidated heuristics", with their authors' own caveat that the constants must be rescaled to the local market (Berkus, 2016; Payne, 2019).
- Every external figure carries its source and date and is said to age. Market medians are from 2026 US data; angel-group prices run lower (Angel Capital Association, Angel Funders Report 2025: 2024 member median seed pre-money $10M).
- Base-rate priors are stated before any adjustment for the rubric, and each adjustment has a one-line reason.
- Missing evidence is not assessed, never a guess. A step that cannot run says which input would let it.
- Three times is a portfolio outcome, never the per-deal test at seed.
- This is a draft for a human reviewer. Never contact the founder.

## Sources

- Achleitner and Lutz (2008). First Chicago Method: alternative approach to valuing innovative start-ups. SSRN 1133004. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1133004
- Angel Capital Association (2025). Angel Funders Report 2025. https://angelcapitalassociation.org/blog/press-release-aca-publishes-2025-angel-funders-report/
- Berkus (2016). After 20 years: updating the Berkus Method. https://berkonomics.com/?p=2752
- Carta (2026). State of Private Markets Q1 2026; VC fundraising benchmarks (July 2026); Founder Ownership 2026. https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/linkedin-vc-fundraising-benchmarks-2026/ ; https://carta.com/data/founder-ownership-2026/
- Cooley (2026). Q2 2026 Venture Financing Report. https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- Damodaran (2009). Valuing young, start-up and growth companies. NYU Stern working paper. https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/younggrowth.pdf
- Gompers, Gornall, Kaplan and Strebulaev (2020). How do venture capitalists make decisions? Journal of Financial Economics 135(1). https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Gornall and Strebulaev (2020). Squaring venture capital valuations with reality. Journal of Financial Economics 135(1). https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Levine (2014). Venture outcomes are even more skewed than you think (Correlation Ventures data, 21,000 financings 2004-2013). https://sethlevine.com/archives/2014/08/venture-outcomes-are-even-more-skewed-than-you-think.html
- Nivi and Ravikant (2007). The Option Pool Shuffle. Venture Hacks. https://venturehacks.com/option-pool-shuffle
- Payne (2011, revised 2019). Scorecard Valuation Methodology. https://angelcapitalassociation.org/blog/blog-scorecard-valuation-methodology-rev-2019-establishing-the-valuation-of-pre-revenue-start-up-companies/
- Scott, Shu and Lubynsky (2020). Entrepreneurial uncertainty and expert evaluation. Management Science 66(3). https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2638367
- Steffens and Douglas (2007). Valuing technology investments: use real options thinking but forget real options valuation. Conference paper.
- Wilson Sonsini (2026). The Entrepreneurs Report, Q1 and Q2 2026. https://www.wsgr.com/a/web/ntbxCfmspTLoevehaAoUgh/entrepreneurs-report-q2-2026.pdf
- Wiltbank and Boeker (2007). Returns to angel investors in groups. Kauffman Foundation. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
- Y Combinator (2018 onward). Post-Money SAFE User Guide. https://www.ycombinator.com/documents
