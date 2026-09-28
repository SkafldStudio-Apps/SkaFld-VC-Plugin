---
name: founder-research
description: Researches a founding team into a factual profile with the team signals that predict outcomes, gaps for the stage and reference-call targets, and writes up reference or customer call notes. Use for triage, a scorecard's team criterion, diligence prep and reference-call write-ups.
---

# Founder research

Facts about professional history, each with a source and a verification mark. The output is a draft for the human team; it never contacts anyone.

## Sources, in order

1. The application and the deck (what the founders claim).
2. A people or company data connector if the user has one connected (for example Apollo): roles, tenure, company size, funding history. With Apollo connected, one lookup of the company's job postings (Apollo organization job postings) gives open roles as a proxy for headcount growth and hiring plan; name the lookup and ask before it, since Apollo lookups can spend the person's credits, and say that postings show intent to hire, not hires.
3. The company website, product and pricing pages, changelog or release notes.
4. Press, podcasts, talks, publications, patents, and code repositories where relevant.
5. Prior ventures: outcome, role, duration, co-founders, and whether revenue or an exit is on the public record.
6. With a platform connected: the deal record through `get_deal_details` and the deal's documents through `search_documents`.

## Procedure

1. **Build a timeline per founder**: role, company, dates, what they owned. Mark each entry **verified** (two independent sources), **single-source** or **claimed** (only the founder says so).

2. **Record the four validated team cues** as facts, for the team as a whole. These are the only founder attributes with outcome evidence behind them:

   - **Prior founding with a real outcome.** A founder who previously founded a company that reached a real exit or $10M+ revenue. On a narrower definition, founders whose prior VC-backed company went public succeed 30% of the time against 21% for first-timers and 22% for previously failed founders (Gompers, Kovner, Lerner and Scharfstein, 2010); about 60% of unicorn founders were repeat founders, about 70% of those with a prior real exit or $10M+ revenue (Tamaseb, 2021). A prior failed founding counts the same as a first-timer; record it as a fact, not a negative.
   - **Three or more years in the sector, on the team.** At least one founder with three or more years employed in this specific industry. It roughly doubles the rate of top-tail growth (Azoulay, Jones, Kim and Miranda, 2020), and its absence is a knock-out for VCs, while "some" sector experience on the team is worth about 80% of "all" (Franke, Gruber, Harhoff and Henkel, 2008). Treat it as a floor, not a ladder: most unicorn founders lacked same-industry experience (Tamaseb, 2021).
   - **Leadership experience.** At least one founder who has managed people or led a function. Its absence is a VC knock-out; "some" is worth about the same as "all" (Franke et al., 2008).
   - **Preparedness.** Command of market size and unit economics, shown in the deck or the application: a bottom-up market size with its inputs, unit economics stated with definitions, numbers that reconcile. Preparedness, not displayed passion, predicts funding decisions (Chen, Yao and Kotha, 2009; Cardon, Mitteness and Sudek, 2017), and founders' confidence in market size, unit economics and LTV to CAC predicts seed-stage equity growth (Eisenmann, 2020). Use `skafld-vc:deck-audit` and `skafld-vc:unit-economics` findings as the evidence; record what is shown, not an impression.

   For each cue write present, absent or not in the materials, with the source. "Not in the materials" is `not_assessed` in a scorecard, never a low score.

3. **Name the non-cues and do not score them.** These move investors but have no outcome evidence, and several are documented bias channels:

   - **School and degree.** Top-50 university and MBA do not predict seed-stage growth (Eisenmann, 2020); VCs back elite-school founders about 3x more than their predictive value justifies (Lyonnet and Stern, 2022-2024).
   - **Age.** Never recorded: it is a protected characteristic, and the only population finding (Azoulay et al., 2020) says youth is not a positive signal, which is no basis for judging a person.
   - **Displayed passion.** Preparedness, not displayed passion, predicts funding decisions (Chen et al., 2009); passion moves investors without evidence that it predicts outcomes, so it is a bias channel.
   - **Technical CEO.** About half of unicorn CEOs are non-technical (Tamaseb, 2021).
   - **Co-founder count, including solo founders.** Uncorrelated with unicorn odds (Tamaseb, 2021); solo founders survived longer in crowdfunded firms (Greenberg and Mollick, 2018). Record the count as a fact; never score it.

4. **Tag the idea's genesis**: product-first (a founder "experienced a problem first-hand and [is] seeking a solution") or company-first ("starts with brainstorming possible business ideas before envisioning a solution"), as the GoingVC angel diligence guide (undated) describes Kupor's distinction. This is an unvalidated practitioner heuristic: a September 2026 literature search found no outcome study of it. Write it as a tag with its evidence, say it is unvalidated, and never let it move a score.

5. **Record what gives this team an edge, as facts**: skills, networks and prior roles that bear on this problem, this customer or the discipline the company needs most (technical, sales, regulatory), and skin in the game (full-time commitment; founder capital invested only if the company discloses it) (GoingVC angel diligence guide, undated).

6. **Check role coverage for the stage.** Load `skafld-vc:stage-calibration` for the bar. The question is whether the roles the company needs now are covered, and whether the hiring plan covers the rest; "Do management teams need to be completely in place before being investable? No." (GoingVC angel diligence guide, undated). Use the guide's need-to-have skills per role as a coverage checklist, which is practitioner material only:

   - CEO: leadership, communication, decision making, strategic planning.
   - CTO: technical know-how, engineering and product management.
   - CFO: financial modeling and tools, capital raising, command of financial concepts.
   - CMO: market research, strategic planning, sales management, channel distribution.

   By stage: at pre-seed the founders should cover building the product and reaching the first customers, and a missing CFO or CMO is not a finding. At seed, check that the function the go-to-market depends on is covered or in the hiring plan. At Series A, functional leads are in place or hired against a dated plan; median Series A headcount was 13 in 2025 (Carta data as summarised by PMF Show, 2025). Compare the gaps with the deck's hiring plan and use of funds.

7. **Assess relevance.** Does each founder's history bear on the problem the company is solving, the customer it sells to, or the discipline it needs most? Where fit with an investor's mandate matters, read the sectors and stage from the house profile from `whoami`; without a platform, use the saved firm profile's thesis and mandate (`get_profile`) or the thesis the user gave. Keep relevance to the company's problem separate from fit with the mandate.

8. **List reference-call targets** from professional history only: former managers (especially a founder or CEO they reported to), co-founders from prior ventures, direct reports, early customers, and investors in prior rounds. Never anyone at a founder's current employer (1752vc, Causo and GoingVC reference-check guides, 2026). Group them by the four referee types in `references/reference-call-questions.md`, which is the protocol for the human caller. The agent never contacts anyone.

9. **Record what needs a direct question** rather than an inference: short tenures, unexplained gaps, contested departures, a claimed outcome that no source confirms. Always add one direct question for the founder call: whether the founders would accept board governance and a change of CEO if the company one day needed it. Angel screening worksheets treat an unwillingness to step aside as a deal killer (Payne 2011, rev. 2019), but no outcome study of it was found (literature search, September 2026), so mark it "unvalidated practitioner deal-killer": record the answer as a fact for the humans, never infer it from the materials, and never let it move a score on its own.

## Synthesis mode: call notes or transcripts supplied

When the person supplies notes or transcripts of reference or customer calls, pasted or from a connected transcript service (for example Fireflies, Gong or Apollo Conversations), read them only; never create, send or schedule anything in that service, and never contact anyone. Then:

1. **Write up each call** in the per-referee template of `references/reference-call-questions.md` §5, from what was said: block ratings with the verbatim story behind each, "no basis" where the referee did not observe the behaviour, consistency with the founder's account, and the answer bands the call cleared, did not clear or did not test. A call that did not follow the protocol is written up as far as it goes and marked "unstructured".
2. **Roll up** as §5 says: the pattern across referees, on-list against off-list differences, shared phrasing that suggests coaching, and which hypotheses are cleared, not cleared or untested.
3. **Map each finding** to a diligence workstream (`team`, `market_customers`, `product_technology`, `financial`, `legal_corporate`, `deal_terms`) and a finding class: `deal_killer` (a history materially different from what was reported, an ethics or integrity concern), `price`, `terms` (only where a standard term such as vesting or a milestone tranche addresses it), `operating_risk` or `opportunity` (Stanford GSB Search Fund Primer 2021, Part VI, classes adapted to seed). A deal killer is reported first. Give each finding its bookends (the least and the most it could move price or plan).
4. **Close or open gaps.** Say which open diligence questions the calls closed and which remain, and list the next calls if the eight-to-twelve plan is not complete. The output feeds the Diligence plan's `findings` (`finding`, `class`, `low`, `high`, `workstream`, and `lever` for a terms finding) and `gaps`; it is a draft for the human team.

## Output

```
## Founders: <Company>
| Founder | Role | Timeline (verified / single-source / claimed, with source) | Gap or question |
| ... |

Validated cues (team):
- Prior founding with real exit or $10M+ revenue: present / absent / not in the materials (<source>)
- 3+ years in this sector: ...
- Leadership experience: ...
- Preparedness (market size and unit economics command): ... (<deck-audit / unit-economics finding>)

Recorded, not scored: school and degree, co-founder count, technical or non-technical CEO. (Age and personal details are not recorded.)
Genesis: product-first / company-first / unclear (unvalidated heuristic) — <evidence>
Edge and skin in the game: ...
Role coverage for <stage>: <role: covered by / planned hire / gap>; matches hiring plan: yes / partly / no
Reference targets by type: on-list personal ...; off-list personal ...; on-list customer ...; off-list prospective customer ...
Questions for the founder call: ... (always including governance and CEO change, unvalidated practitioner deal-killer)
```

In synthesis mode:

```
## Reference synthesis: <Company> (<n> calls: on-list personal <n>, off-list personal <n>, customer <n>, prospect <n>)
<one §5 write-up per call; "unstructured" where the call did not follow the protocol>
Roll-up: <pattern across referees; on-list vs off-list; coaching signals; hypotheses cleared / not cleared / untested>
| Finding | Referee(s) | Workstream | Class | Low / high impact | Status |
Gaps closed: ... · Still open: ... · Next calls: ...
Draft for the human team; nobody was contacted.
```

## Rules

- Facts only, no character judgments. Write "left after eleven months per LinkedIn", not "flaky".
- Professional history only. No personal details, family, health, age, or any protected characteristic.
- Cite every entry with its source. A claim with no source other than the founder is marked claimed.
- A cue that the materials do not show is `not_assessed`, never a low score.
- The agent never contacts founders, referees, customers or anyone else. It lists targets and questions for the human team.
- This is a draft for a human decision.

## Sources

- Gompers, Kovner, Lerner and Scharfstein, "Performance Persistence in Entrepreneurship", Journal of Financial Economics 96(1), 2010. https://www.sciencedirect.com/science/article/abs/pii/S0304405X09002311 ; PDF https://gwern.net/doc/economics/2010-gompers.pdf
- Tamaseb, "Super Founders" (dataset of about 200 US unicorns against a control set), 2018 and 2021. https://alitamaseb.medium.com/land-of-the-super-founders-a-data-driven-approach-to-uncover-the-secrets-of-billion-dollar-a69ebe3f0f45
- Azoulay, Jones, Kim and Miranda, "Age and High-Growth Entrepreneurship", AER: Insights 2(1), 2020. https://www.aeaweb.org/articles?id=10.1257%2Faeri.20180582 ; NBER w24489 https://www.nber.org/system/files/working_papers/w24489/w24489.pdf
- Franke, Gruber, Harhoff and Henkel, "Venture Capitalists' Evaluations of Start-Up Teams: Trade-Offs, Knock-Out Criteria, and the Impact of VC Experience", Entrepreneurship Theory and Practice 32(3), 2008. https://exa.ai/library/publication/qcr3m0sqp8q
- Chen, Yao and Kotha, "Entrepreneur Passion and Preparedness in Business Plan Presentations", Academy of Management Journal 52(1), 2009. http://journals.aom.org/doi/10.5465/amj.2009.36462018
- Cardon, Mitteness and Sudek, "Motivational Cues and Angel Investing", Entrepreneurship Theory and Practice 41(6), 2017. https://ideas.repec.org/a/sae/entthe/v41y2017i6p1057-1085.html
- Eisenmann, "Determinants of Early-Stage Startup Performance: Survey Results", HBS Working Paper 21-057, 2020. https://www.hbs.edu/ris/Publication%20Files/21-057_0c4f5410-3dcb-4c2f-8c4e-6fcbc358b92f.pdf
- Lyonnet and Stern, "Venture Capital (Mis)allocation in the Age of AI", 2022-2024. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4260882
- Greenberg and Mollick, "Sole Survivors: Solo Ventures Versus Founding Teams", 2018. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3107898
- Payne, B. (2011, rev. 2019). "Scorecard Valuation Methodology" and the angel screening worksheet (coachability and unwillingness to step aside as deal killers). Angel Capital Association. https://angelcapitalassociation.org/blog/blog-scorecard-valuation-methodology-rev-2019-establishing-the-valuation-of-pre-revenue-start-up-companies/
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part VI "Evaluating due diligence findings" (deal killers, price, terms, risks).
- Carta, "State of Private Markets Q1 and Q2 2025; Series A Q2 2025", 2025. https://carta.com/data/state-of-private-markets-q2-2025/ ; https://carta.com/data/series-a-fundraising-q2-2025/ (headcount figure as summarised in https://www.pmf.show/blog/series-a-requirements-2025-arr-bar-carta-data)
- GoingVC Research Library, "Complete Due Diligence for Angels", Management Assessments chapter (genesis test after Kupor, role need-to-have skills, "skin in the game", "keep background checks and inquiries to those who have actually worked with the person"), undated. Practitioner guide read from a reference folder; no public URL recorded.
- Founder reference-check practice guides (1752vc, Causo, GoingVC), 2026, for the rule against calling a current employer. https://www.1752.vc/learn/how-vcs-run-founder-reference-checks ; https://hub.causo.ai/guides/vc-reference-calls ; https://www.goingvc.com/post/how-to-reference-check-a-founder
- The protocol in `references/reference-call-questions.md` lists its own sources.
