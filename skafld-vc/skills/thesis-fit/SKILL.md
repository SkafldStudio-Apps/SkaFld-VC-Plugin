---
name: thesis-fit
description: Read the firm's investment thesis and run candidate companies through it (strategic-fit and super-priority gates, pillar mapping, criteria, optional anchored scoring) to keep one card per company with a status of view, monitor, pursue, engaged founder or investment memo, plus current portfolio concentration, the sourcing funnel through term sheets and next actions for the longlist. Use when asked to source against the thesis, build a longlist or market map, check whether a company fits the thesis, report sourcing activity, or draft a thesis.
---

# Thesis fit

A thesis is a bet on a place and a time, owned by people who know the place. This skill reads the firm's thesis, runs candidate companies through it in a fixed order, and keeps one card per company with a status a human sets. It fills the `thesis`, `mandate`, `marketMap`, `companies[]`, `sourcingActivity` (including `termSheets`) and `nextActions[]` fields of the `thesis_longlist` deliverable. It does not score the team, it does not decide to invest, and it never contacts a founder.

Why it matters: sourcing explains more of experienced VCs' results than picking. Which deals a VC sees is almost twice as important as its influence on them (Sørensen 2007), and 57-74% of the persistence in VC returns is explained by improved deal access rather than repeated picking skill (Nanda, Samila and Sorenson 2020).

## Before starting

- **The thesis, in this order.** (1) With the platform connected, call `whoami` and read `house.thesis`, `house.network_fit` and `house.check_range_usd`. (2) Otherwise a `thesis.json` or `thesis.md` in the working folder; the fields are described in `references/thesis-json.md`. (3) Otherwise ask the person for it. Never invent a thesis, and never add a sector, stage or geography the source does not name. Say which source you used in the first line of the output.
- **Owners.** Record the one or two people who own the thesis and their domain depth. The specialisation effect sits with individual investors, not the firm: a generalist firm whose people specialise has a 1.7-2.7 point higher annual success rate than one whose people do not (Gompers, Kovner and Lerner 2009); partner human capital explains 2-5 times more of performance than the firm's (Ewens and Rhodes-Kropf 2015); angels with industry expertise earn more (Wiltbank and Boeker 2007). No owner named: write "owner: not named" and add it to `nextActions`.
- **Why now, vintage and a review date.** The thesis must state why this is the moment (Sequoia's pitch template makes "why now" a required slide), the funding climate it assumes (startups first funded in hot markets fail more often but have fatter tails; Nanda and Rhodes-Kropf 2013) and when it will be reviewed, because firms do not persist in choosing the right sectors and times (Nanda, Samila and Sorenson 2020). Missing any of the three: `thesis.decision` is `draft` and the gap is the first next action. A review date in the past is flagged, not silently extended.

## How

1. **State the thesis.** Fill `thesis` (title, version, decision, pillar names) and `mandate` (sectors, geographies, stages, cheque size from `house.check_range_usd` or the file, and the super-priority list). Quote the thesis text for each; do not paraphrase a mandate from memory.
2. **Gather candidates.** From the person's list, the platform (`query_deals`, `search_records`), and research when connected: Exa web search and fetch for companies in each taxonomy leaf, Apollo organization search for headcount, location and funding, and trade-association member directories and trade-show exhibitor lists for the segment (the query pattern in `skafld-vc:competitive-landscape`). Apollo enrichment spends the person's credits: name the lookups (which companies, which fields) and ask before the first one. Headcount and revenue in company databases are often self-reported; say so wherever you use them (Stanford GSB Search Fund Primer 2021, Part V). With the platform connected, run `resolve_company` on each candidate: a company already on the platform keeps its `dealId` and is never added twice.
3. **Strategic fit gate.** Test the mandate first: sector, geography, stage, cheque. Screens are set per house and an agnostic house drops the ones it does not use ("Complete Due Diligence for Angels", GoingVC Research Library, n.d.). A miss on a required item stops here at `view` with the item named in `reason`. Desirable criteria are a framework of ideal circumstances, not hard limits (Stanford primer 2021, Part IV): missing one is recorded, not a stop.
4. **Super-priority gate.** Only when the thesis lists them: two or three criteria that eliminate anything missing even one (Stanford primer 2021, Part IV). Any miss is `view`.
5. **Map to pillars.** Which pillars the company addresses (`pillars[]`) and which taxonomy leaf it sits in, quoting the company's own description of what it does. A company that maps to no pillar is out of thesis, whatever its quality.
6. **Business before team.** Judge market, segment and business-model fit here; the team is judged later by `skafld-vc:deal-scorecard`. Of 50 VC-backed IPOs only one had changed its core line of business, while the founder was still CEO at IPO in 49% (Kaplan, Sensoy and Strömberg 2009). Use `skafld-vc:market-sizing` for the size bar (derived from the cheque, never a fixed floor) and `skafld-vc:competitive-landscape` when the leaf looks crowded.
7. **Criteria.** List each desirable and undesirable criterion the thesis names that the company meets, one source each. A criterion that needed research you could not run is "not checked", never inferred. If the thesis carries a `scoring` block, score each criterion against its anchored description and report the weighted result per axis; weights sum to 100% per axis and every score has an anchor (Stanford primer 2021, Exhibit 13). Without one, a 1-3 fit per criterion is enough (same primer, Part IV sample scorecard). Never invent anchors or weights. The result goes in `fit` as Markdown.
8. **Fill the card**, in this order: `name`, `oneLine`, `website`, `stage` (checked with `skafld-vc:stage-calibration`), `founded`, `hq`, `teamSize`, `funding` (amount, round, year), `investors`, `pillars`, `fit`, `sourceIds`, then `channel` (how the company reached the house: `network`, `self_generated`, `investor_referral`, `portfolio`, `inbound` or `event`) and `thesisVersion` (the version it was judged under). The field order follows the company card of a published practitioner thesis ("Investment thesis: digital health and clinician burnout", 2023). Leave out what you cannot source; never estimate a field.
9. **Propose a status** with a one-line `reason` that names the thesis version; the person sets it:
   - `view`: seen; outside the mandate or not yet assessed.
   - `monitor`: in thesis, not ready (stage, evidence or timing); name what would move it.
   - `pursue`: in thesis and ready. Requires a named warm path: who could introduce, and how they know the founder. Warm introductions are preferred to cold approaches in both the angel and search-fund guides (GoingVC, n.d.; Stanford primer 2021, Part V), and ties carry information about reputation (Shane and Cable 2002). Where your tools include `query_members`, it can find members with the sector interest or a sourcing role; otherwise ask the person who could introduce.
   - `engaged_founder`: a conversation has happened. This is the point to add the company to the platform (step 14).
   - `investment_memo`: a deal exists on the platform; `dealId` is set.
10. **Market map.** `marketMap` in Markdown: taxonomy leaves as rows, companies in each with their status, and the leaves with no company named as gaps.
11. **Current concentration.** State the portfolio's current concentration by sector, stage and geography, as `skafld-vc:portfolio-construction` computes it (its concentration step: share of invested capital and of positions), so the thesis says where new exposure is wanted and where the house is already heavy. With the platform, the funded deals come from `query_deals`; without one, from the positions the person gives. No positions available: write "concentration not known" and add it to `nextActions`. Put the result at the head of `marketMap`, and mark each leaf as adding to a concentrated area or diversifying.
12. **Sourcing activity.** Fill `sourcingActivity` for a stated period: companies contacted, meetings, introductions, term sheets issued (`termSheets`), and counts per source channel (network, self-generated, other-investor referral, portfolio, inbound, event). Counts come from the person or `pipeline_summary`, never estimated. Report the channel mix beside the VC base rates of about 30% network, 30% self-generated, 20% other-investor referral, 8% portfolio and 10% inbound, and the funnel beside roughly 100 companies considered per closed deal (101, 28 management meetings, 10 partner meetings, 4.8 diligences, 1.7 term sheets, 1 close) (Gompers, Gornall, Kaplan and Strebulaev 2020, 885 VCs). Where the counts exist, compute the house's own stage-to-stage conversion (contacted to meeting, meeting to term sheet) and set it beside the published funnel, with the counts; a handful of deals is listed, not turned into a rate. A channel mix that leans on inbound and one network under-reaches founders who do not reach out: under-networked founders contacted investors far less after meeting them (Howell and Nanda 2024).
13. **Next actions.** One per `pursue` and `engaged_founder` card (`company`, `action`, `owner`, `by`), plus the thesis review date and any gap from "Before starting".
14. **Add to the platform only on confirmation.** For an `engaged_founder` card, offer to add it only where your tools include `add_company`, after the person confirms the preview: show them its disclosure and call it again only after they confirm (full admins only; a founder application needs the founder's permission). Otherwise list it as a next action ("add <company> to the platform") for the person to do. Nothing else is written.
15. **Deliver** the `thesis_longlist` with `skafld-vc:deliverable-html`, the full write-up in `document`; other formats through `skafld-vc:document-export` when asked.

## Drafting a thesis

Only when the person asks for one. Draft `thesis.md` with `decision: draft` in two parts: the problem, cause (the pillars), opportunity and disruption (the market map and cards), as in the 2023 practitioner thesis above; then the industry sections of the Stanford primer 2021, Part IV: description, size, players, business model, strategic assessment (five forces), exogenous variables, megatrends, and a go / no-go assessment. Every figure carries its source, date and sample size. The primer's budget is about three days per industry. The person owns and approves the thesis; the draft never becomes the mandate by itself.

## Output

```
## Thesis fit — <thesis title> v<version> (<source: house profile | thesis.json | thesis.md | given by the person>)
Decision: go | no_go | draft · Owners: <names | not named> · Why now: <one line> · Review by: <date>
<Company> — <status> · <oneLine> · Pillars: <names> · Gates: mandate ✓/✗, super-priority ✓/✗/n.a.
  Fit: <criteria met / not met / not checked, weighted result if scored> · Warm path: <who | none>
Concentration (<date>): sector <top share> · stage <...> · geography <...> · new exposure wanted in: <...> | not known
Funnel (<period>): <n> view · <n> monitor · <n> pursue · <n> engaged · <n> memo · contacted <n> → meetings <n> → term sheets <n> (house conversion beside 101 → 28 → 1.7 → 1) · Channels: ... (VC base rates 30/30/20/8/10)
Next: 1. ... 2. ...
```

## Rules

- No thesis, no run: ask. The house profile or the person's file is the only mandate.
- Status is a proposal; a human sets it. No automated thesis-fit method has published accuracy: the data-driven sourcing systems describe their pipelines but not their hit rates (Moonfire 2023; EQT Ventures' Motherbrain reports 7 of 50 investments, self-reported), so every card says what it rests on.
- Never contact founders or anyone else. A cold approach, if the person wants one, is drafted by `skafld-vc:founder-outreach` and sent by them.
- Research-backed fields you could not check (no Exa, no Apollo, no platform) are "not checked", never guessed.
- Team quality is not judged here; public professional background at `pursue` comes from `skafld-vc:founder-research`.
- Keep the thesis version on every card, in `thesisVersion` and in its `reason`, so `skafld-vc:anti-portfolio` can later read which thesis a pass was made under.

## Sources

- Ewens, M. and Rhodes-Kropf, M. (2015). "Is a VC Partnership Greater than the Sum of its Partners?" _Journal of Finance_. https://www.nber.org/papers/w19120
- EQT Ventures (2019-20). Motherbrain, as reported by VentureBeat and Crunchbase News (self-reported; directional). https://venturebeat.com/business/how-eqt-ventures-motherbrain-uses-ai-to-find-promising-startups
- GoingVC Research Library (n.d.). "Complete Due Diligence for Angels", strategic-fit screens and deal sourcing (practitioner guide).
- Gompers, P., Gornall, W., Kaplan, S. and Strebulaev, I. (2020). "How Do Venture Capitalists Make Decisions?" _Journal of Financial Economics_ 135(1); 885 VCs. https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Gompers, P., Kovner, A. and Lerner, J. (2009). "Specialization and Success: Evidence from Venture Capital." _Journal of Economics and Management Strategy_ 18(3). https://onlinelibrary.wiley.com/doi/10.1111/j.1530-9134.2009.00230.x
- Howell, S. and Nanda, R. (2024). "Networking Frictions in Venture Capital, and the Gender Gap." _JFQA_ 59(6). https://www.nber.org/system/files/working_papers/w26449/w26449.pdf
- "Investment thesis: digital health and clinician burnout" (2023). Practitioner thesis document (problem, cause, opportunity, disruption; company cards with a five-value status). Reference library; no public URL.
- Kaplan, S., Sensoy, B. and Strömberg, P. (2009). "Should Investors Bet on the Jockey or the Horse?" _Journal of Finance_ 64(1). https://papers.ssrn.com/sol3/papers.cfm?abstract_id=657721
- Moonfire (2023). "More needles, bigger haystacks." https://www.moonfire.com/stories/more-needles-bigger-haystacks-what-we-mean-when-we-talk-about-data-driven-vc/
- Nanda, R. and Rhodes-Kropf, M. (2013). "Investment Cycles and Startup Innovation." _Journal of Financial Economics_ 110(2). https://www.hbs.edu/ris/Publication%20Files/12-032_87eecafd-ac01-4b6d-83e8-390b7c03539a.pdf
- Nanda, R., Samila, S. and Sorenson, O. (2020). "The Persistent Effect of Initial Success: Evidence from Venture Capital." _Journal of Financial Economics_ 137(1). https://www.nber.org/system/files/working_papers/w24887/w24887.pdf
- Sequoia Capital (c. 2010-18). "Writing a Business Plan" pitch template. https://www.nebraskaangels.org/file_download/7370ce25-b802-4cb9-b293-8b95737da264
- Shane, S. and Cable, D. (2002). "Network Ties, Reputation, and the Financing of New Ventures." _Management Science_ 48(3). https://pubsonline.informs.org/doi/10.1287/mnsc.48.3.364.7731
- Sørensen, M. (2007). "How Smart Is Smart Money? A Two-Sided Matching Model of Venture Capital." _Journal of Finance_ 62(6). https://papers.ssrn.com/sol3/papers.cfm?abstract_id=878692
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part IV (investment criteria, industry funnel, sample scorecard, thesis template), Part V (sourcing) and Exhibit 13 (industry and investment attractiveness matrix).
- Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
