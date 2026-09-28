---
name: portfolio-construction
description: Gives the portfolio-level view of a network's or investor's positions, with diversification against power-law evidence, concentration, outcomes against base rates, reserves, and each position's line. Use for a portfolio review or report, or when someone asks how diversified a portfolio is, how much to reserve, or how the investments are doing.
---

# Portfolio construction

Early-stage returns follow a power law, so a portfolio is judged by how many shots it has, how they are spread and how the few winners are backed, not by the average company. This skill reports exposures and outcomes against published evidence. It does not attribute results to decisions and it does not forecast a portfolio IRR.

It fills `position` for the company under review and `portfolioView` (`positions[]` and `analysis`) in a `portfolio_review`. Per-deal scenarios come from `skafld-vc:returns-analysis`; ownership after later rounds from `skafld-vc:cap-table`.

## How

1. **Collect the positions.** For each company: amount invested and date (first cheque and follow-ons separately), stage at entry, sector, geography, vintage (year of first cheque), instrument, ownership at entry and now, last priced round (date, post-money, lead outside or insider), reserves set aside, last update date and status, and the lead contact: the one member or deal lead who follows the company, gathers its metrics on the agreed interval and reports them against expectations and plan (Hudson, Angel Capital Education Foundation, c. 2008; the "ambassador", often the diligence lead, in Angel Capital Association practice, 2025). A company with no lead contact is a gap to name. With a platform connected, call `skafld-vc:whoami` and read the funded deals and their deliverables with `skafld-vc:query_deals`, `skafld-vc:get_deal_details` and `skafld-vc:get_deliverables`; otherwise use the list the user gave. `house.check_range_usd` gives the usual cheque; the house profile carries no fund or allocation size, so ask for it. List what is missing per company.

2. **Fill the company's `position`.**

   - `invested`: first cheque plus follow-ons, with dates.
   - `ownership`: fully diluted, after every round since entry (`skafld-vc:cap-table`).
   - `mark`: the value implied by the last priced round at the current ownership, labelled "last-round implied" with the round's date. It is not the company's value: the headline post-money is the price of the last preferred share, and preferred is worth on average 56% more than common (Gornall and Strebulaev, 2020 and 2021). A SAFE or note is not a priced round; without one, the mark is cost.
   - `outcome`: one bucket, on the multiple of invested capital realised or implied: `loser` (about 0x), `breakeven` (about 1x), `decent` (about 5x at seed, 3x at Series A), `good` (about 15x and 10x), `big` (about 50x and 30x), the vocabulary and multiples of the GoingVC Fund Model (n.d.), or `too_early`. Use `too_early` until there is an exit, a write-off, or a priced round after entry; a markup only moves a company out of `too_early` when an outside investor led the round. Seed deals not marked up within about three years seem unlikely ever to be (AngelList, 2023), so say when a company is past that point with no markup.
   - `followOn`: whether a pro-rata right exists, the cheque that holds ownership through the next round (Wilson, 2014: 1% at a $3M round on $12M post needs $30k), the reserve it would draw on by name, and what that reserve holds before and after the cheque. The decision is made in the IC memo's follow-on variant (`skafld-vc:memo-format`), not here.

3. **List `portfolioView.positions[]`**: `company`, `invested`, `stage`, `sector`, `vintage`, `status` and `outcome` for every position. For `status`, use a coarse grade with its evidence, such as the six-step scale one angel group applies (write-off, diving, surviving, striving, thriving, exit; Queen City Angels, 2025). The grade is a judgment and is labelled so.

4. **Position count against the power law.** With a power-law exponent near 2, a portfolio needs about 34 or more companies for a 90% chance of returning its capital, and about 85 for an even chance of 2x; a 20-company portfolio has about a 20% chance of 3x (Neumann, 2017). Platform data point the same way: a broad index beat about three quarters of simulated ten-company pickers (AngelList, 2020), each added company is worth about 9 basis points of median IRR across 10,665 portfolios (Koh and Othman, 2020), and in angel groups 52% of deals returned under 1x while only 39% of investors did, because they held several (Wiltbank and Boeker, 2007). State the count and where it sits. These figures replace the practitioner claim that risk stabilises at about fifty positions (GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.), which gives no data. For an individual angel, also note the startup allocation relative to their other assets, the core-and-satellite view the same GoingVC paper recommends; ask, never assume.

5. **Concentration.** Share of invested capital and of positions by sector, stage, geography and vintage, and the largest single position as a share of the total. Report exposures only. Attribution analysis has little value on a small private portfolio with few data points (GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.), so do not explain results by factor.

6. **Outcome distribution against base rates.** Count companies per outcome bucket and compare the realised ones with the published distributions: half to two thirds of early-stage investments return under 1x and about 5-7% return 10x or more, with the top tenth of exits producing 75-85% of the cash (Wiltbank and Boeker, 2007, 1,137 exits; Wiltbank and Brooks, 2016, 245 exits; Horsley Bridge data via Evans, 2016); 65% of 21,640 financings returned under 1x (Correlation Ventures 2004-2013, via Levine, 2014). Losers arrive earlier than winners, about 3 years to exit for under 1x against 6 for over 30x (Wiltbank and Boeker, 2007), so a young portfolio shows its losses before its gains. Do not judge the distribution on marks: funds take at least six years to settle into their final quartile (Cambridge Associates, 2026).

7. **Multiples and time.** Report invested, current value (marks as labelled in step 2), unrealised multiple (TVPI) and cash returned (DPI), each with the vintage. Compare only with a benchmark of the same vintage chosen in advance; the GoingVC paper cites PitchBook for a median fund TVPI below 2.0x (GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.), and Cambridge Associates publishes net pooled index returns by horizon (2026). If an IRR is asked for, give it only beside the multiple and the years: the same ten $10,000 cheques returning a larger net gain later ($300,000, 14.87% IRR) or a smaller one sooner ($257,000, 27.96% IRR) show that neither number stands alone (GoingVC, "How to Maximize Returns and Minimize Risk in VC", n.d.).

8. **Reserves and follow-on exposure.** Show capital reserved against the follow-ons expected, and which companies they are meant for. The evidence to set beside it:

   - Institutional funds commonly hold about one dollar of reserves per dollar of first cheques (Wilson, 2017; Suster, 2014; Thompson, 2022), but reserves only add to returns when concentrated in the highest-multiple companies; spread evenly they lower the fund's multiple (Thompson, 2022). One manager now argues funds of $100M or less should hold almost none (Walk, 2026).
   - Each follow-on is new underwriting: would you invest today, with no position, at this price and on this evidence (Hustle Fund, n.d.; Thompson, 2022)?
   - Inside rounds underperform (Ewens, Rhodes-Kropf and Strebulaev, 2016), and in angel-group data follow-on investing was associated with lower returns (Wiltbank and Boeker, 2007).
   - How many companies will need a follow-on depends on graduation: 25-30% of seed companies reached Series A within 24 months in a normal year, about 15-17% for 2022 cohorts (Carta, 2024-2026).

   For every follow-on expected in the next 12 months, name the reserve it draws on (a fund's reserve line, a member's own allocation, or "no reserve set"), the cheque, and what the reserve holds after it; a reserve drawn by more expected cheques than it can meet is a finding. The IC memo's follow-on variant carries the same line.

   Ask who in the network holds pro-rata rights; do not assume the network or its members have them.

9. **Write `portfolioView.analysis`** in Markdown, in this order: count against the power-law figures; concentration; outcome distribution against base rates with the portfolio's age; multiples with vintage and, if asked, IRR beside them; reserves and the companies they are meant for; three things to watch. For a report to members, follow angel-group practice rather than a fund's fee template (a network has no management fee or carry): per company the investment date, cost, last-round implied value, ownership, status, lead contact, last update date and next expected round (Angel Capital Association, 2025; Carta, 2025). Deliver a quarterly report within 60 days of the quarter's end (120 days at the fiscal year-end), the institutional reporting standard (ILPA Reporting Template v2.0, 2025); say when the underlying company updates arrived too late for that.

## Output

```
## Portfolio view: <network or investor>, as of <date>
Positions: <n> (<first cheques> + <follow-ons>) · invested $<x> · vintages <years>
Count against the power law: <n> vs ~34 for a 90% chance of 1x [Neumann 2017]; <reading>
Concentration: sector <...>; stage <...>; geography <...>; vintage <...>; largest position <x>%
Outcomes: loser <n> · breakeven <n> · decent <n> · good <n> · big <n> · too early <n>; realised vs base rates [Wiltbank and Boeker 2007; Wiltbank and Brooks 2016; Evans 2016]
Multiples: TVPI <x> (unrealised, last-round marks) · DPI <x> · vintage <year>; IRR only with multiple and years
Reserves: $<r> held for <companies>; expected follow-ons <n>, each with the reserve it draws on and what is left
Lead contacts: <company: member> (or "none" as a gap) · Report due: <date, 60 days after quarter-end>

| Company | Invested | Stage | Sector | Vintage | Status (judgment) | Outcome |

Position (<company>): invested $<x> · ownership <y>% · mark $<m> (last-round implied, <date>) · outcome <bucket> · follow-on <pro-rata, cheque to hold, reserve drawn and remaining> · lead contact <member>
Watch: 1. ... 2. ... 3.
```

## Rules

- Never present an IRR without the multiple and the time to liquidity beside it.
- A mark is last-round implied value, labelled with the round's date; never call it the company's value.
- Report exposures, not attribution, and do not judge a portfolio younger than about six years by its marks.
- Every external figure carries its source and year, and its sample size where the source gives one.
- Outcome buckets and status grades are judgments; label them so and give the evidence.
- The house profile has no fund size, reserve policy or pro-rata record; ask for them rather than assuming.
- Never contact portfolio companies or their founders.

## Sources

- Neumann, J., "Power Laws in Venture Portfolio Construction", 2017. https://reactionwheel.net/2017/12/power-laws-in-venture-portfolio-construction.html
- AngelList, "What AngelList Data Says About Power-Law Returns in Venture Capital", 2020. https://www.angellist.com/blog/what-angellist-data-says-about-power-law-returns-in-venture-capital
- Koh, S. and Othman, A. (AngelList), "How Portfolio Size Affects Early-Stage Venture Returns", 2020. https://angel.co/pdf/lp-performance.pdf
- AngelList, "Do Startup Valuations Matter for Investment Returns?", 2023. https://www.angellist.com/blog/do-startup-valuations-matter-for-investment-returns
- Wiltbank, R. and Boeker, W., "Returns to Angel Investors in Groups", Kauffman Foundation and ACEF, 2007; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
- Wiltbank, R. and Brooks, W., "Tracking Angel Returns", Angel Resource Institute, 2016; 245 exits (figures from published summaries). https://www.venturesouth.vc/2016-5-20-3u3wdqmmhkcygzpnonoygks594kunk
- Evans, B., "In praise of failure" (Horsley Bridge data, 7,000+ investments), 2016. https://www.ben-evans.com/benedictevans/2016/4/28/winning-and-losing
- Levine, S., "Venture outcomes are even more skewed than you think" (Correlation Ventures, 21,640 financings 2004-2013), 2014. https://sethlevine.com/archives/2014/08/venture-outcomes-are-even-more-skewed-than-you-think.html
- Cambridge Associates, "US Venture Capital Index and Selected Benchmark Statistics", Q4 2025, published 2026. https://www.cambridgeassociates.com/wp-content/uploads/2026/06/2025-Q4-USVC-Benchmark-Book.pdf
- Gornall, W. and Strebulaev, I., "Squaring Venture Capital Valuations with Reality", Journal of Financial Economics 135(1), 2020; and "A Valuation Model of VC-Backed Companies with Multiple Financing Rounds", 2021. https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Wilson, F. (USV), "The Pro-Rata Participation Right", 2014, and "Reserves", 2017. https://avc.com/2014/03/the-pro-rata-participation-right/ ; https://avc.com/2017/01/reserves/
- Suster, M. (Upfront), "The Authoritative Guide to Pro-rata Rights", 2014. https://www.inc.com/mark-suster/the-authoritative-guide-to-prorata-rights.html
- Thompson, B. (Sapphire Partners), "Dirty Secret: Venture Reserves are Not Always a Good Thing", 2022. https://sapphireventures.com/blog/dirty-secret-venture-reserves-are-not-always-a-good-thing/
- Walk, H. (Homebrew), "Early stage venture funds of $100 million or less should hold almost no reserves for follow-on", 2026. https://hunterwalk.com/2026/07/23/ive-changed-my-mind-early-stage-venture-funds-of-100-million-or-less-should-hold-almost-no-reserves-for-follow-on/
- Hustle Fund, "Angel investing psychology", undated. https://www.hustlefund.vc/post/angel-squad-angel-investing-mindset-mistakes-the-mental-trap-costing-you-100x-returns
- Ewens, M., Rhodes-Kropf, M. and Strebulaev, I., "Inside Rounds and Venture Capital Returns", working paper, 2016. https://cear.gsu.edu/files/gravity_forms/25-64ec8d3580cca1f8f19bb5130dc7be11/2016/04/InsideRounds20160328.pdf
- Carta, seed-to-Series-A graduation cohorts, 2024-2026. https://carta.com/data/newsletter-graduation-rate-from-seed-to-series-a/
- Carta, "Investor Reporting: From Compliance to Strategy", 2025. https://carta.com/learn/private-funds/management/portfolio-management/investor-reporting/
- Hudson (Angel Capital Education Foundation), "Best Practice Guidance for Angel Groups: Post Investment Monitoring", c. 2008. https://angelcapitalassociation.org/data/Documents/Resources/AngelCapitalEducation/ACEF_BEST_PRACTICES_Post_Investment.pdf
- ILPA, Reporting Template v2.0 and Performance Template, 2025. https://ilpa.org/industry-guidance/templates-standards-model-documents/ilpa-templates-hub/ilpa-reporting-template/
- Angel Capital Association, "Methods to Capture Key Data Elements on Investments and Outcomes", 2025. https://angelcapitalassociation.org/blog/methods-to-capture-key-data-elements-on-investments-and-outcomes/
- Queen City Angels, "Standards and Practices Guide at a Glance", 2025. https://www.qca.com/wp-content/uploads/2025/02/QCA-Standards-and-Practices-Guide-At-A-Glance_2025.pdf
- GoingVC, "How to Maximize Returns and Minimize Risk in VC", and the GoingVC Fund Model workbook, undated. Practitioner material read from a reference folder; no public URL recorded.
