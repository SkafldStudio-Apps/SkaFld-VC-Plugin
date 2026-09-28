---
name: competitive-landscape
description: Maps a startup's competitors, substitutes and incumbents and tests its claimed advantages. Use for the differentiation and market criteria of a scorecard, a memo's competition section, a deck audit, or when someone asks who the competitors are or whether a moat is real.
---

# Competitive landscape

## Procedure

1. **Named and omitted.** Start from the deck's competition slide; list who is named and who is omitted.
2. **Search**, with any search or company-data connector the user has connected (for example Exa or Apollo organizations) or otherwise web search, for direct competitors, substitutes the customer uses today (including doing nothing or a spreadsheet), incumbents that could add the feature, and well-funded adjacent entrants. Include adjacent or tangential markets whose companies could move in (GoingVC Founder Feedback Guide, n.d.).
   - _Participant lists_: for an industry with trade bodies or trade shows, search for the trade association's member directory and the most recent exhibitor list of the main trade show for the segment (for example the queries "<segment> association member directory" and "<segment> <year> exhibitor list", then fetch the list page). These are a free count of the participants in a segment and a source of names the deck omits (Stanford GSB Search Fund Primer 2021, Parts IV and V). Record the list, its date and how many members fit the company's segment; a list shows who is present, not who is winning.
3. **Profile each**: what they sell, to whom, stage and last round with date and source, pricing if public, one line on positioning, and, where a source gives them: size (revenue or headcount, headcount marked as often self-reported), market share, profitability, ownership (founder-held, venture-backed with lead, corporate-owned, public) and the management team; the business model; strengths and weaknesses in one line each; and the points of difference against the company on product, price, brand, channel and function (the competitor profile in Stanford GSB Search Fund Primer 2021, Exhibit 25; the per-competitor fields in the GoingVC Founder Feedback Guide, n.d.). A field no source gives is left blank, never estimated.
   - _Optional 2x2_: when the reader wants a picture, place the company and its competitors on the two axes that matter most to the target buyer, chosen from price, product quality, service quality, feature set, ease of use, strength of benefit, target market and brand (GoingVC Founder Feedback Guide, n.d.). Name the evidence for each placement; a 2x2 drawn from the deck's own claims is labelled as the company's view.
4. **Concentration.** Estimate the leader's share and the number of viable players, using the leader-share table in `skafld-vc:market-sizing`. Vertical SaaS categories typically need four to nine players to reach 80% of the market (Product Philosophy 2025, directional).
5. **Test each claimed advantage with 7 Powers.** A power exists only when a _benefit_ (better cash flows, lower cost or higher price) is paired with a _barrier_ (what stops a well-funded competitor from copying it). Write the barrier sentence first; if it cannot be written, there is no moat yet (Helmer 2016). The seven powers: scale economies, network economies, counter-positioning (the incumbent will not copy because it would damage its existing business), switching costs (financial, procedural, relational), branding, cornered resource, process power.

   - A **cornered resource** must pass five tests: idiosyncratic, non-arbitraged, transferable, ongoing, sufficient; teams usually fail on sufficiency (Helmer 2016).
   - **Map the familiar six moat types** onto the powers so nothing is lost ("Complete Due Diligence for Angels", GoingVC Research Library, n.d.):

     | Moat type (diligence guide)               | Power to test                                                                                                                                                                                                     |
     | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     | Real product differentiation (10x better) | cornered resource (IP, data, talent) or counter-positioning; otherwise a benefit with no barrier                                                                                                                  |
     | Perceived differentiation / brand         | branding (out of window at seed, see below)                                                                                                                                                                       |
     | Low-cost leadership                       | scale economies, process power, or counter-positioning if the incumbent's model prevents matching the price                                                                                                       |
     | High switching costs                      | switching costs (name financial, procedural or relational, and the lock-in class: contracts, durable purchases, training, data, specialised suppliers, search costs, loyalty programmes; Shapiro and Varian 1999) |
     | High barriers to entry                    | the specific barrier: cornered resource (licence, patent, exclusive contract) or scale economies                                                                                                                  |
     | Network effects                           | network economies, tested with the conditions below                                                                                                                                                               |

6. **Timing window.** Counter-positioning and cornered resources are the powers a company can hold at origination (seed); scale economies, network economies and switching costs are won during take-off, when share is decided; branding and process power arrive only in stability (Helmer 2016). A seed company claiming brand or process power as its moat is out of window: record the claim as "not yet a power", not as false.
7. **Network-effect claims.** Classify same-side or cross-side. A market tips to one winner only when all three hold: high multi-homing costs for at least one side, strong positive network effects for that side, and little demand for differentiated offerings (Eisenmann, Parker and Van Alstyne 2006). Test persistence: large user bases without persistent network effects (Myspace, Groupon, Lending Club) did not hold value, and low switching costs dissipate them (MIS Quarterly 2024). Word-of-mouth virality is not a network effect ("Complete Due Diligence for Angels"). Name the incumbent envelopment threat where a platform with an overlapping user base could bundle the feature (Eisenmann et al. 2006).
8. **First-mover claims.** Require a named mechanism: technology leadership, preemption of scarce assets, or buyer switching costs (Lieberman and Montgomery 1988, 1998). Cite the base rate beside the claim: 47% of market pioneers fail, pioneers average about 10% share and lead only 11% of categories, while early leaders who enter later hold about 28% (Golder and Tellis 1993, ~500 brands in 50 categories); industrial-goods pioneers are the exception, surviving ten years more often than early followers (66% vs 48%, Robinson and Min 2002). A first-mover claim with no mechanism is a red flag.
9. **Wedge.** The specific customer or use case where this company wins first, and what would let an incumbent close the gap.
10. **Pipeline and portfolio conflict.** When the platform is connected, check `query_deals` for competitors already in the house's pipeline or portfolio (and `get_deal_details` for their positioning). Say so plainly; it is a conflict the decision-makers must know about. Without a platform, ask the user whether any competitor is a portfolio company.

## Output

```
## Landscape — <Company>
| Competitor | Type (direct / substitute / incumbent / adjacent) | Stage & funding [source, date] | Size · share · profitability | Ownership | Positioning | Points of difference (product / price / brand / channel / function) | Threat |
| ... |
Participant lists: <association or show, date>: <n> members in segment | not searched
Omitted from the deck: ...
Concentration: leader ~<n>% [source]; <k> viable players
Claimed advantages:
| Claim [deck p.n] | Power | Benefit sentence | Barrier sentence | In window at <stage>? | Verdict: holds / not yet / does not |
Network effects: same-side | cross-side · tipping conditions met: <which> · persistence: ...
First-mover: mechanism <named | none — red flag> · base rate: 47% of pioneers fail, ~10% mean share [Golder & Tellis 1993]
Wedge and defensibility: ...
Pipeline / portfolio conflict: none found | <deal, stage> | not checked (no platform)
```

## Rules

- Cite sources and dates for funding figures.
- Distinguish "we found no competitor" from "there is no competitor".
- An advantage the materials do not evidence is "not assessed", not "does not hold".
- Keep the pipeline-conflict check even when triage already ran one; this is the late catch.

## Sources

- Eisenmann, T., Parker, G. and Van Alstyne, M. (2006). "Strategies for Two-Sided Markets." _Harvard Business Review_ 84(10). https://hbr.org/2006/10/strategies-for-two-sided-markets
- GoingVC Investor Program (n.d.). Founder Feedback Guide, Competition area (per-competitor fields and 2x2 axes; practitioner guide).
- GoingVC Research Library (n.d.). "Complete Due Diligence for Angels", "Company and competitors" chapter (practitioner guide).
- Golder, P. and Tellis, G. (1993). "Pioneer Advantage: Marketing Logic or Marketing Legend?" _Journal of Marketing Research_ 30(2). https://gtellis.net/wp-content/uploads/2020/09/pioneering-advantage-marketing-logic-or-marketing-legend.pdf
- Helmer, H. (2016). _7 Powers: The Foundations of Business Strategy._ https://7powers.com/
- Lieberman, M. and Montgomery, D. (1988, 1998). "First-Mover Advantages"; "First-Mover (Dis)Advantages: Retrospective and Link with the Resource-Based View." _Strategic Management Journal_ 9 and 19. https://www.researchgate.net/publication/311908029_First-Mover_Advantage
- MIS Quarterly (2024). "How Users Drive Value in Two-Sided Markets." _MIS Quarterly_ 48(1). https://misq.umn.edu/misq/article/48/1/1/2274/How-Users-Drive-Value-in-Two-Sided-Markets
- Product Philosophy (Ova) (2025). "Winner-Take-Most vs Multi-Homing in Vertical SaaS" (analyst estimates; directional). https://productphilosophy.com/articles/winner-take-most-multi-homing-vertical-saas
- Robinson, W. and Min, S. (2002). "Is the First to Market the First to Fail?" _Journal of Marketing Research_ 39(1). https://journals.sagepub.com/doi/10.1509/jmkr.39.1.120.18938
- Shapiro, C. and Varian, H. (1999). _Information Rules_, chapters 5-7 (lock-in classes). https://www.inforules.com/contents-h.htm
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Parts IV and V (trade-association and trade-show lists as industry sources) and Exhibit 25 (sample due diligence topics: competitor profiles and points of difference).
