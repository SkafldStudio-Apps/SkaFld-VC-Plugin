---
name: returns-analysis
description: Frame the return case for an early-stage investment as proceeds at exit under a few outcome scenarios, paid through the liquidation preference stack after an explicit dilution path, with base-rate priors, a stage-specific target multiple, years to exit, a judgment-weighted multiple with its sensitivities, a fund-returner line and what has to be true. Never a point IRR. Use for memos and investment committee discussion.
---

# Returns analysis

Early-stage returns follow a power law, so a single IRR or an average hides the case. This skill produces scenario proceeds and multiples on the cheque, tied to published base rates, with every assumption in the open.

## Base rates (print this line in every output)

Half to two thirds of early-stage investments return less than 1x; about 5-7% return 10x or more; the top tenth of exits produce about 75-85% of all cash (Wiltbank and Boeker 2007, 1,137 angel-group exits: 52% under 1x, 7% above 10x, top 10% of exits 75% of cash; Wiltbank and Brooks 2016, 245 exits: ~70% under 1x, 10% of exits 85% of cash; Horsley Bridge data via Evans 2016, 7,000+ investments: ~half under 1x, 6% at 10x or more made 60% of returns). A scenario table whose probabilities are far from these must say why.

## Procedure

1. **Entry.** Start from the cheque and entry ownership on a fully diluted basis (load `skafld-vc:cap-table` if not already computed). Record the instrument and its terms: liquidation multiple, participation, seniority. At seed these are almost always 1x non-participating (Cooley Q2 2026: 95.8% 1x, 96.4% non-participating); flag anything else.
2. **Dilution path.** One path, stated round by round, shared with the valuation analysis so price and returns use the same retention. Default per-round dilution from Carta medians: 18% at seed and Series A (software rounds, six months to July 2026), 12% at Series B (July 2026); the blended seed-to-C median fell from 18% to 16% over 2025 (Carta 2026). Add pool top-ups where the company will need them (seed median pool 12.1% of fully diluted, Carta Founder Ownership 2026). No published source gives cumulative seed-to-exit dilution, so the number of future rounds is a stated assumption. Show the arithmetic for each round: new ownership = old ownership × (1 − round dilution). Wilson's pro-rata example shows one round: $50k at a $5M cap is 1%; a $3M round at $9M pre / $12M post takes it to 0.75% unless the holder invests 1% × $3M = $30k (Wilson 2014). Report exit ownership.
3. **Target multiple (stage-specific).** At seed use a 10x reference per deal, with 20-30x as the "what has to be true" case (Gompers et al. 2020: VCs require a 5x median, 5.5x mean, higher for early stage; Payne 2011/2019: angels seek 20-30x in 5-8 years; Berkus 2016: a 10x hurdle). The arithmetic behind it: if 60% of a seed portfolio returns ~0.25x and 30% returns ~2x, the remaining 10% must average ~22x for the portfolio to reach 3x gross (derived from the base rates above; not a published figure). At Series A an illustrative ladder is 3x decent, 10x good, 30x big winner (GoingVC fund model, n.d.; seed 5x / 15x / 50x). Three times is a portfolio outcome, never the per-deal test.
4. **Scenarios.** Three to five: loss, modest exit, strong exit, outlier (and breakeven if useful). For each give exit value, exit ownership, proceeds to the cheque, gross multiple and years to exit.
   - **Pay each scenario through the preference stack**, not ownership × exit value. Each preferred class takes the greater of its preference and its as-converted share, senior classes first; ownership × exit value is only correct above the conversion point (Gornall and Strebulaev: the headline post-money is the price of the last preferred, not the company's value, and averages 48% above fair value, 2020; the latest preferred is worth on average 56% more than common, 2021). In loss and modest scenarios show the stack.
   - **Years to exit** default to the angel-group ladder: 3.0 years for under 1x, 3.3 for 1-5x, 4.6 for 5-10x, 4.9 for 10-30x, 6.0 for above 30x (Wiltbank and Boeker 2007, "lemons ripen faster than plums"). Outlier outcomes at seed come from the fat-tailed regime only after about five years (Othman 2019, AngelList: power-law exponent below 2 after ~5.1 years), and today's gaps are long: unicorns' median time since first VC round is 8.5 years (PitchBook-NVCA Venture Monitor, 2025 editions).
5. **Probabilities.** Coarse judgments, labelled as such, starting from the default outcome prior (under 1x 55-65%, 1-3x 25-30%, 3-10x 5-10%, 10x or more 3-6%; section 5 of the `references/methods.md` of `skafld-vc:valuation-triangulation`, synthesised from the base rates above) and adjusted with a stated reason (scorecard, traction, terms). A company past its next-round bar earns a lower failure probability than one that is not (Damodaran, 2009).
6. **Judgment-weighted multiple.** Sum of probability × multiple, named "judgment-weighted multiple", never "expected multiple": with a power-law exponent near 2 a sample mean does not estimate the true mean (Neumann 2017). Give two sensitivities in one sentence each: the outlier probability halves; the outlier goes to zero.
7. **Break-even at the stage target.** The exit value at which proceeds reach the stage target multiple, after dilution and through the stack, and whether that exit is plausible against the market from `skafld-vc:market-sizing`.
8. **Fund-returner line.** The exit value at which the house's aggregate cheque returns its fund or allocation N times at the exit ownership. Sapphire's arithmetic: 7.5% ownership needs a $666M exit to return a $50M fund (Thompson 2022); Pear VC: "$1B exit, 5% ownership = $50M return" (Pear VC 2026). Ask the user for the fund or allocation size; the house profile has only the per-deal cheque range, not a fund size. If unknown, show the line per $10M of fund and say so. Whenever a memo or a person calls the deal a fund returner, print the asset-class base rates beside the line, so the claim is read against what funds actually return: the US venture index returned a pooled net IRR of 14.86% over 10 years and 12.85% over 20 years (Cambridge Associates, US Venture Capital Index to Q4 2025, 2,816 funds, 2026), and the median venture fund's TVPI is below 2.0x (PitchBook, as cited by GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.; the PitchBook release itself was not seen). A fund returner is by definition the rare outcome: say which row of the outcome prior it sits in.
9. **What has to be true.** Walk the critical path first. One author treats the chance of success as the product of the probabilities of the objectives that must all go right, so a single weak link sinks the case (GoingVC, Early-Stage Valuations guide, undated). Use the guide's seven as prompts, one line each on what the evidence says and what would test it:

   1. Product feasibility: can a competent team build the product at an acceptable cost?
   2. Product team: is the current team able to build it, or can such a team be hired?
   3. Market appeal: will customers buy it once they know about it?
   4. Marketing: will the go-to-market plan work, or can one that works be designed?
   5. Delivery team: can the sales, delivery and support teams do what is needed, or be assembled?
   6. Management team: can management cope at each stage?
   7. No major adverse event: nothing outside the plan (regulation, a platform change, a lawsuit) derails it.

   A prompt the evidence cannot answer is "not assessed", not a low probability; never multiply the seven into a point probability. Then write three bullets a committee member can test in diligence, drawn from the weakest links, always including the three-year checkpoint: a priced up-round led by an outside investor within about three years, because a seed deal not marked up by then is unlikely ever to be (AngelList 2023), and only 25-30% of seed companies reached Series A within 24 months in a normal year (Carta, 2018 cohorts; about 15-17% for 2022 cohorts).

10. **Portfolio note.** One line: the judgment-weighted multiple is reachable only across a diversified portfolio; with a power-law exponent near 2, about 34 or more positions give a 90% chance of returning capital (Neumann 2017), and each added company is worth about +9 bps of median IRR (Koh and Othman 2020, AngelList, 10,665 LP portfolios).

## IRR rule

Never present an IRR as the answer. If asked, give it per scenario only, and always beside the multiple and the years: the same ten $10,000 cheques can return a net gain of $300,000 (4.0x over ten years) at a 14.87% IRR when payouts are larger and later, or a net gain of $257,000 (3.57x) at a 27.96% IRR when smaller and sooner (GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.). VCs report MOIC as their main metric more often than IRR (63% vs 42%, Gompers et al. 2020).

## Output

```
## Returns — <Company>
Entry: $<cheque> for <x>% fully diluted · <instrument, terms; flags>
Dilution path: <round: d% [source]> → ... · exit ownership <y>%
Target (stage <stage>): <n>x reference; <m>x what-has-to-be-true case [source]
Base rates: 50-70% of deals <1x; 5-7% ≥10x; top decile of exits 75-85% of cash [Wiltbank & Boeker 2007, n=1,137; Wiltbank & Brooks 2016, n=245; Horsley Bridge via Evans 2016]

| Scenario | Probability (judgment) | Exit value | Proceeds via stack | Multiple | Years |
| ... |

Judgment-weighted multiple: <n>x · outlier probability halved: <n>x · outlier to zero: <n>x
Break-even at <target>x: exit $<E> — plausible? ...
Fund-returner: exit $<F> returns <fund> <N>x at <y>% · asset class: 14.86% net 10-year pooled IRR [Cambridge Associates 2026, n=2,816 funds]; median fund TVPI < 2.0x [PitchBook via GoingVC]
Critical path: feasibility <...> · product team <...> · market appeal <...> · marketing <...> · delivery team <...> · management <...> · no major adverse event <...>
What has to be true: 1. ... 2. ... 3. Outside-led priced up-round by <date>
Portfolio note: ...
```

## Rules

- Probabilities are judgments; label them so and keep them coarse.
- Every external figure carries source and date, and sample size where the source gives one.
- Missing terms or round data are marked not assessed with the assumption used; never scored down for being absent.
- If the round is priced above stage comparables, give the exit value needed for the stage target multiple (not 3x) and whether the market supports it.

## Sources

- AngelList (2023). "Do Startup Valuations Matter for Investment Returns?" https://www.angellist.com/blog/do-startup-valuations-matter-for-investment-returns
- Berkus, D. (2016). "After 20 Years: Updating the Berkus Method." https://berkonomics.com/?p=2752
- Carta (2026). State of Private Markets Q1 2026; VC fundraising benchmarks (Jul 2026); Round Benchmarking Tool; Founder Ownership 2026. https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/linkedin-vc-fundraising-benchmarks-2026/ ; https://carta.com/data/founder-ownership-2026/
- Cambridge Associates (2026). US Venture Capital Index and Selected Benchmark Statistics, Q4 2025 (2,816 funds). https://www.cambridgeassociates.com/wp-content/uploads/2026/06/2025-Q4-USVC-Benchmark-Book.pdf
- Carta (2024-2026). Seed-to-Series-A graduation cohorts. https://carta.com/data/newsletter-graduation-rate-from-seed-to-series-a/
- Cooley (2026). Q2 2026 Venture Financing Report (166 deals). https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- Damodaran, A. (2009). "Valuing Young, Start-up and Growth Companies." NYU Stern working paper. https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/younggrowth.pdf
- Evans, B. (2016). "In praise of failure" (Horsley Bridge data, 7,000+ investments 1985-2014). https://www.ben-evans.com/benedictevans/2016/4/28/winning-and-losing
- GoingVC (n.d.). "How to Maximize Returns and Minimize Risk in VC" (citing PitchBook for median fund TVPI); Early-Stage Valuations guide (critical-path objectives); the GoingVC Fund Model workbook. Practitioner material; no public URL.
- Gompers, P., Gornall, W., Kaplan, S. and Strebulaev, I. (2020). "How Do Venture Capitalists Make Decisions?" _Journal of Financial Economics_ 135(1); 885 VCs. https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Gornall, W. and Strebulaev, I. (2020). "Squaring Venture Capital Valuations with Reality." _Journal of Financial Economics_ 135(1); and (2021) "A Valuation Model of VC-Backed Companies with Multiple Financing Rounds", SSRN 3725240. https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Koh, S. and Othman, A. (2020). "How Portfolio Size Affects Early-Stage Venture Returns." AngelList. https://angel.co/pdf/lp-performance.pdf
- Neumann, J. (2017). "Power Laws in Venture Portfolio Construction." https://reactionwheel.net/2017/12/power-laws-in-venture-portfolio-construction.html
- Othman, A. (2019). "Startup Growth and Venture Returns." AngelList. https://angel.co/pdf/growth.pdf
- Payne, B. (2011, rev. 2019). "Scorecard Valuation Methodology." https://angelcapitalassociation.org/blog/blog-scorecard-valuation-methodology-rev-2019-establishing-the-valuation-of-pre-revenue-start-up-companies/
- Pear VC (Hershenson, M.) (2026). "Fundraising and Demo Day 101" / "Pear Fundraise 2026" founder workshop slides.
- PitchBook-NVCA (2025-2026). Venture Monitor, Q4 2024 to Q4 2025 editions. https://nvca.org/wp-content/uploads/2025/01/Q4-2024-PitchBook-NVCA-Venture-Monitor.pdf ; https://nvca.org/wp-content/uploads/2025/10/Q3-2025-PitchBook-NVCA-Venture-Monitor.pdf
- Thompson, B. (2022). "Dirty Secret: Venture Reserves are Not Always a Good Thing." Sapphire Partners. https://sapphireventures.com/blog/dirty-secret-venture-reserves-are-not-always-a-good-thing/
- Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
- Wiltbank, R. and Brooks, W. (2016). "Tracking Angel Returns." Angel Resource Institute; 245 exits 2010-2016 (report offline; figures from published summaries). https://www.venturesouth.vc/2016-5-20-3u3wdqmmhkcygzpnonoygks594kunk
- Wilson, F. (2014). "The Pro-Rata Participation Right." https://avc.com/2014/03/the-pro-rata-participation-right/
