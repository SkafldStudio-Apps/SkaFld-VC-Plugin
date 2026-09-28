---
name: market-sizing
description: Size a startup's market bottom-up (customers × revenue per customer), reconcile it with the deck's top-down figure, and test it against the bar the investment itself sets (required exit, revenue and market from cheque, ownership and target multiple) with a sourced leader-share assumption, a why-now field and entry tests for existing and new markets. Use for scorecard market criteria, memos and deck audits.
---

# Market sizing

A market is "big enough" only relative to what the investment needs. This skill derives that bar from the deal, sizes the market bottom-up, and states the share assumption that connects the two. No study relates the market size stated in a deck to later outcomes (no published study found, literature search, September 2026), so the output is a reasoned range with its assumptions in the open, never a verdict on a single number.

## Procedure

1. **Customer unit.** Define it precisely: which buyer, which segment, which geography, which budget line.
2. **Bottom-up size.** Market = number of customers × revenue per customer (Pear VC, "Fundraising and Demo Day 101", 2026). Count customers from a citable source with its year; take revenue per customer from the company's pricing, contracts or a stated comparable. Show TAM (all customers of this unit), SAM (those the company can reach with its current product and channel) and SOM (what it can plausibly win by a stated year). Sequoia's template asks for TAM top-down, SAM bottom-up and SOM (Sequoia, "Writing a Business Plan", c. 2010-18).
3. **Reconcile with the deck.** Put the deck's top-down figure beside yours with its definition and source. Where public companies sell into the same segment, their annual reports (10-K filings on SEC EDGAR, with XBRL segment data) give a dated top-down cross-check of spend and leader share. Explain the gap in one paragraph rather than choosing a side.
4. **The derived bar.** Compute what this investment needs, not a fixed floor (method: Lightspeed, "A TAM Masterclass", 2023):

   - required exit value = cheque ÷ ownership at exit × target multiple
   - required revenue at exit = required exit value ÷ exit revenue multiple
   - required market = required revenue ÷ assumed leader share

   Ownership at exit is entry ownership after the dilution path in `skafld-vc:returns-analysis` (one path for both skills). The target multiple is stage-specific and comes from the same skill (a 10x reference at seed; Gompers et al. 2020 report a 5x median required by VCs, higher for early stage; Payne 2011/2019 reports angels seeking 20-30x). The exit revenue multiple comes from dated exit comparables for the sector; if none is given, say "exit multiple not sourced" and show the chain at two stated values rather than inventing one. Show every line of the arithmetic.

5. **Leader share.** Choose the share from the table below and say why. Flag any plan that needs more than 25% share without network effects that meet the winner-take-all conditions (the conditions from Eisenmann, Parker and Van Alstyne 2006; the 25% flag is this skill's rule, not a published threshold: no study setting one was found, literature search, September 2026).
6. **Market entry test.** Classify the market:
   - _Existing market_: at least one of real product differentiation (at least 10x better), perceived differentiation, or network effects must hold ("Complete Due Diligence for Angels", GoingVC Research Library, n.d.). Name which, with evidence. This is consistent with the benefit-and-barrier test in 7 Powers (Helmer 2016).
   - _New category_: if the founders cannot name their core users in a single phrase, the market may not exist (same guide). Run the TAM-expansion test below.
7. **TAM-expansion test (category creators only).** Does the product change price, utilisation or use cases so that the historical market understates demand? Gurley's three levers (price elasticity, liquidity-driven utilisation, new use cases) took Uber's addressable market well past the $120M San Francisco taxi and limo spend in its seed deck (Gurley 2014). If yes, size the replaced spend and an expansion scenario with the elasticity assumption stated; note that quantitative estimates for novel products are biased low (Allen 2023). Pair it with the Big Market Delusion check: is the round price already paying for the expanded market (Cornell and Damodaran 2020)?
8. **Why now.** Required. The market, technology, platform or regulatory shift that makes this the moment (Sequoia template; Pear VC 2026: "INSIGHT why now?"), and the vintage context: startups first funded in hot markets fail more often but have fatter tails (Nanda and Rhodes-Kropf 2013).
9. **Sensitivity.** State the two assumptions that move the answer most and give a range, not a point.

## Leader-share table

| Situation                               | Share to assume                                                                                                                                                                                | Source                                               |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Market pioneer (first entrant)          | ~10% mean share; 19% among surviving pioneers; 47% of pioneers fail                                                                                                                            | Golder and Tellis 1993, ~500 brands in 50 categories |
| Early leader (enters after the pioneer) | ~28% mean share, 8% fail                                                                                                                                                                       | Golder and Tellis 1993                               |
| Vertical SaaS leader                    | ~15-25% (22-category estimate: average leader 17.4%, none above 26%; directional, analyst estimates)                                                                                           | Product Philosophy 2025                              |
| Horizontal software leader              | ~20-23% (Salesforce in CRM, cited as 20-30% by Lightspeed)                                                                                                                                     | Lightspeed 2023; Product Philosophy 2025             |
| Above 35%                               | only where all three winner-take-all conditions hold: high multi-homing costs for at least one side, strong positive network effects for that side, little demand for differentiated offerings | Eisenmann, Parker and Van Alstyne 2006               |

Revenue share is not outcome share: across 11 software sectors the winner took about two thirds of category exit value (Tunguz 2018, directional). State which one the argument relies on.

## Worked illustration (fund-level chains)

Pear VC's founder workshop teaches the same chain from the fund's side (Pear VC 2026, illustration only; the multiples and 4% share are Pear's assumptions, not benchmarks):

- $400M fund, 2x target → $800M return; at 5% ownership → $16B company value; at a 30x revenue multiple → ~$500M revenue; at 4% share → ~$13B market.
- Same fund at 20% ownership → $4B value; at 10x → $400M revenue; at 4% share → $10B market.
- "$1B exit, 5% ownership = $50M return"; "a $100M fund needs six $1B exits to return 3x".

For a single cheque, run step 4 with the cheque, exit ownership and stage target instead of the fund size. Sequoia's softer narrative check still applies: "a market on the path to a $1B potential allows for error and time for real margins to develop."

## Output

```
## Market — <Company>
Customer unit: ...
Bottom-up: <customers> [source, year] × <revenue per customer> [source] = TAM <x>; SAM <y>; SOM <z> by <year>
Deck top-down: <figure> [deck p.n, definition] — gap explained: ...
Derived bar: $<cheque> ÷ <exit ownership>% × <target>x = required exit $<E>;
  ÷ <exit multiple>x [source, date] = required revenue $<R>; ÷ <share>% [table row] = required market $<M>
Bar vs bottom-up: clears | marginal | does not clear — because ...
Market type: existing (entry test: <which condition holds, evidence>) | new category (core user: "<phrase>"; expansion scenario: ...)
Why now: ... · Vintage: ...
Range: <low> to <high>; drivers: 1. ... 2. ...
```

## Rules

- Cite every figure with source and date, and sample size where the source gives one.
- A market that is large only because of an unproven price point is flagged as such.
- Never quote a research-firm TAM without the definition it uses; state the analyst's leader-share assumption when the deck relies on one.
- Missing inputs (no customer count, no exit comparables) are reported as not assessed with what would resolve them, never guessed and never scored down for being absent.
- Do not replace the derived bar with a fixed dollar floor.

## Sources

- Allen, B. (2023). _Essays on Data-Driven Product Innovation_ (HBS dissertation), market-size inversion chapter. https://exa.ai/library/publication/fsbr9lx4xd4
- Cornell, B. and Damodaran, A. (2020). "The Big Market Delusion: Valuation and Investment Implications." _Financial Analysts Journal_. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3501688
- Eisenmann, T., Parker, G. and Van Alstyne, M. (2006). "Strategies for Two-Sided Markets." _Harvard Business Review_ 84(10). https://hbr.org/2006/10/strategies-for-two-sided-markets
- GoingVC Research Library (n.d.). "Complete Due Diligence for Angels", market-size chapter (practitioner guide).
- Golder, P. and Tellis, G. (1993). "Pioneer Advantage: Marketing Logic or Marketing Legend?" _Journal of Marketing Research_ 30(2). https://gtellis.net/wp-content/uploads/2020/09/pioneering-advantage-marketing-logic-or-marketing-legend.pdf
- Gompers, P., Gornall, W., Kaplan, S. and Strebulaev, I. (2020). "How Do Venture Capitalists Make Decisions?" _Journal of Financial Economics_ 135(1); 885 VCs. https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Gurley, B. (2014). "How to Miss By a Mile: An Alternative Look at Uber's Potential Market Size." https://abovethecrowd.com/2014/07/11/how-to-miss-by-a-mile-an-alternative-look-at-ubers-potential-market-size/
- Helmer, H. (2016). _7 Powers: The Foundations of Business Strategy._ https://7powers.com/
- Lightspeed Venture Partners (2023). "A Total Addressable Market (TAM) Masterclass." https://medium.com/lightspeed-venture-partners/a-total-addressable-market-tam-masterclass-1650b1f04c1d
- Nanda, R. and Rhodes-Kropf, M. (2013). "Investment Cycles and Startup Innovation." _Journal of Financial Economics_ 110(2). https://www.hbs.edu/ris/Publication%20Files/12-032_87eecafd-ac01-4b6d-83e8-390b7c03539a.pdf
- Payne, B. (2011, rev. 2019). "Scorecard Valuation Methodology." https://angelcapitalassociation.org/blog/blog-scorecard-valuation-methodology-rev-2019-establishing-the-valuation-of-pre-revenue-start-up-companies/
- Pear VC (Hershenson, M.) (2026). "Fundraising and Demo Day 101" / "Pear Fundraise 2026" founder workshop slides (modified 2026-08-26).
- Product Philosophy (Ova) (2025). "Winner-Take-Most vs Multi-Homing in Vertical SaaS" (analyst estimates; directional). https://productphilosophy.com/articles/winner-take-most-multi-homing-vertical-saas
- Sequoia Capital (c. 2010-18). "Writing a Business Plan" pitch template. https://www.nebraskaangels.org/file_download/7370ce25-b802-4cb9-b293-8b95737da264
- Tunguz, T. (2018). "Does Winner Take Most in SaaS?" (directional). https://tomtunguz.com/does-winner-take-most-in-saas/
- U.S. Securities and Exchange Commission. EDGAR full-text search; 10-K filings and XBRL financial data. https://www.sec.gov/edgar/search/
