---
name: inbound-triage
description: Gives a first-pass PASS, SCREEN or REFER verdict on an inbound application or deck against the firm's thesis and cheque range, with a coded pass reason and the questions for a screening call. Use when a new application or deck arrives, or for a quick consistent read across many deals.
---

# Inbound triage

One pass, one page, consistent across every application. Triage is not a scorecard; it decides whether the deal earns one. Most rejections are scope: in one angel group's 636 proposals, 68% were rejected at pre-screen within a month, mostly on industry (27%), geography (16%), size or policy (12%) and missing plan (11%) (Carpentier and Suret 2015).

## Before starting

- **Mandate.** When the platform is connected, call `whoami` and read `house.thesis` and `house.check_range_usd` (plus `decision_format` and `board_seats` for the optional screens). Without a platform, use the network's thesis and cheque range if the user gave them; if not, ask. Never apply a mandate that is not in the profile or the user's words.
- **Miss-rate tolerance.** State the house's tolerance for passing on companies that later succeed, if the user or the house has set one; otherwise write "not set". Screening can be tuned to an explicit miss rate and the trade-off is steep: a live screener at one VC auto-rejected 23% of inbound founders at a 1% miss rate and 57% at a 10% miss rate (Maurer, Buz, Dremel and de Melo 2024).

## Procedure

1. **Deal killers and red flags, before anything else.** Check for: history materially different from what was reported; a major undisclosed liability; ethics or reputation concerns including criminal behaviour (Stanford GSB Search Fund Primer 2021, deal-killer list); and the pitch red flags: unrealistic market size, time to market or price points; pro forma financials that do not line up with each other; use of funds that stops at "to develop the MVP"; unreasonable valuation expectations ("What to Look for in a Founder Pitch", GoingVC Research Library, n.d.). If one is present in the materials, stop: the decision is PASS, the flag is named, and nothing else is weighed. A flag that is only an inference from missing material is not a stop; it becomes the first screening question.
2. **Stage bar.** Load `skafld-vc:stage-calibration` and fix the bar in one line.
3. **Mandate filters.** Sector, stage and geography against `house.thesis`; round and cheque against `house.check_range_usd`. A good company outside the mandate is REFER, with where it should go.
4. **Capital necessity.** Does this company need outside capital at all, and is it raising toward venture rounds or seeding a business that will not need further financing? ("Complete Due Diligence for Angels", GoingVC Research Library, n.d.: "whether or not external capital raising is necessary".) A company that does not need the round is a REFER or a PASS coded out of scope, not a weak company.
5. **Source channel.** Record one: network, self-generated, other-investor referral, portfolio, inbound, event. Report it against the VC base rates: about 30% professional network, 30% self-generated, 20% other-investor referral, 8% portfolio companies, 10% inbound (Gompers, Gornall, Kaplan and Strebulaev 2020, 885 VCs surveyed 2015-16; no base rate exists for events). Referral is a legitimate signal because ties carry information about reputation (Shane and Cable 2002), but it is recorded, not assumed.
6. **Quality of the opportunity, as facts.** Record each with its citation, or "not in the materials"; none is scored here and none is a stop on its own. The angel diligence guide lists these as the quality screens that follow strategic fit ("Complete Due Diligence for Angels", GoingVC Research Library, n.d., screening chapter, paraphrased):
   - _Referral source_: who introduced the deal, how they know the founder, and whether they know the sector. A warm introduction from someone who has worked with the founder is preferred to a cold approach (same guide), but it is a fact to weigh, not a pass mark.
   - _Lead and co-investors_: who else is in the round, named, and whether each is committed (signed or wired) or only in conversation. A strong syndicate carries information: better-networked VCs' investments exit more often (Hochberg, Ljungqvist and Lu 2007), and high-reputation investors are accepted at a lower price (Hsu 2004), so a name also changes the price comparison. It never substitutes for the house's own read.
   - _Company counsel and accountant_: named or not named, and whether they act for other venture-backed companies where the materials say so. Poorly structured entities, employment contracts and customer agreements are costly to fix later (same guide); an unnamed adviser at pre-seed is recorded, not held against the company.
   - _First customers_: the strongest customer evidence present, as one of signed contract, paid pilot, letter of intent, unpaid pilot or none, with counts and names where given. A letter of intent is intent, not revenue. Record the largest customer's share of revenue (or of contracted value, pre-revenue) and flag it above 25%, the customer-concentration line in the default rubric's traction criterion; ask what happens if that relationship ends (same guide).
   - _Genesis_: the product-first or company-first tag from `skafld-vc:founder-research` when it has run; an unvalidated heuristic, recorded and never weighed.
7. **The three early-stage reads.** A credible team for this specific problem, evidence someone wants the product, and a reason the timing is now. Absent evidence is written "not in the materials", never read as a negative.
8. **Optional fund-side screens**, run only when the house profile calls for them:
   - _Portfolio conflict_: when the platform is connected, search `query_deals` over funded and active deals for direct competitors. When `house.board_seats` is true a direct conflict is a hard filter ("Does this company directly compete with others in which the VC has a vested interest?", "Complete Guide to VC Due Diligence", GoingVC Research Library, n.d.); otherwise it is recorded as a fact for the committee.
   - _Lead-investor reliance_: when `house.decision_format` is `partner_screen`, say whether the lead named in step 6 has done diligence the house can rely on for depth (same guide); a triage fact, never a substitute for the house's own read.
   - _Off-stage or off-size_: a round the house cannot size into, per `house.check_range_usd`, is REFER, not PASS on merit (same guide: off-stage deals "can be passed on (or perhaps referred out)").
9. **Decide.** PASS (a deal killer, a mandate miss, or none of the three reads), SCREEN (two or three reads present), REFER (good company outside the mandate or cheque range; name where it should go). A pass that was one vote or one read short is marked "near miss".
10. **Code the pass reason** with the Carpentier and Suret vocabulary so passes can be reviewed later: `out_of_scope` (industry, geography, stage or size, missing plan), `product_model`, `market`, `financial_valuation`, `team`, `agency`. After pre-screen, product or business model (39%) and market strategy (30%) dominate, then financial or valuation (13%), team (10%) and agency (6%) (Carpentier and Suret 2015).
11. **Bias line.** Answer in one line: would this decision change if the founder were older, male, or from a well-known school? False negatives cluster on younger, female and less conventionally attractive teams (Boerner, Frick and Fritz 2024, 638 televised pitches), and under-networked founders reach out far less after contact with investors (Howell and Nanda 2024).
12. **Screening questions**, ranked by how much a good answer would change the decision. Seed them from: what is the problem and your solution; why are the founders the best people to solve it; how did you get to where you are ("Intro to Angel Investing", GoingVC Research Library, n.d.); and one hypothetical (what if a customer has a bad experience, a bug ships, a competitor launches) ("What to Look for in a Founder Pitch"). A quality fact recorded as "not in the materials" that would change the decision (no named customer, an unclear syndicate) becomes a question.

## Output

In a Screening deliverable, the source channel and the step 6 quality facts go in `verdict.sourceQuality`, named red flags in `verdict.redFlags`, and the mandate read in `verdict.thesisFit`.

```
## Triage — <Company>
Decision: PASS | SCREEN | REFER · Stage: <stage> · Near miss: yes | no
Deal killers / red flags: none | <named flag, evidence>
Decided by: 1. ... 2. ... 3. ...
Mandate (<house.name or "user-given thesis">): thesis ✓/✗ · cheque range ✓/✗ · capital needed ✓/✗
Source channel: <channel> (VC base rate <n>%)
Quality: referral <who, relationship> · lead <name | none> · co-investors <names, committed | in talks | none> · counsel <named | not named> · accountant <named | not named> · customer evidence <contract | paid pilot | LOI | unpaid pilot | none> · top customer <n>% of revenue <flag if >25%> · genesis <tag | not run>
Fund-side screens: portfolio conflict <result | not run> · lead <result | not run>
Pass reason code: <code | n/a> · Miss-rate tolerance: <stated | not set>
Bias check: <one line>
Screening call questions: 1. ... 2. ... 3.
Draft — for a human to decide; the founder is not notified by this note.
```

## Rules

- Keep the note under 250 words so a reader can take in ten in a sitting. The 20-hour diligence median (Wiltbank and Boeker 2007) is for a deal, not for triage.
- This skill never communicates a pass or any outcome to the founder. The platform's decline flow owns that; a stage change to passed records a decline without sending email, and admins decide separately whether to write (`skafld-vc:founder-outreach` drafts that message only when asked).
- Do not score criteria here; if the reader wants scores, run `skafld-vc:deal-scorecard`.
- Cite the materials for every fact: `[deck p.n]`, `[application: field]`.

## Sources

- Boerner, Frick and Fritz (2024). "In search of unicorns: overconfidence and missed opportunities." Paderborn working paper; 638 pitches. https://ideas.repec.org/p/pdn/dispap/122.html
- Carpentier, C. and Suret, J.-M. (2015). "Angel group members' decision process and rejection criteria." _Journal of Business Venturing_ 30(6); 636 proposals. https://www.sciencedirect.com/science/article/abs/pii/S0883902615000294
- GoingVC Research Library (n.d.). "Complete Due Diligence for Angels" (screening chapter: strategic fit, then quality of the opportunity); "Complete Guide to VC Due Diligence"; "Intro to Angel Investing"; "What to Look for in a Founder Pitch" (practitioner guides).
- Gompers, P., Gornall, W., Kaplan, S. and Strebulaev, I. (2020). "How Do Venture Capitalists Make Decisions?" _Journal of Financial Economics_ 135(1); 885 VCs. https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Hochberg, Y., Ljungqvist, A. and Lu, Y. (2007). "Whom You Know Matters: Venture Capital Networks and Investment Performance." _Journal of Finance_ 62(1). https://www.stat.berkeley.edu/~aldous/Networks/hochberg.pdf
- Howell, S. and Nanda, R. (2024). "Networking Frictions in Venture Capital, and the Gender Gap." _JFQA_ 59(6). https://www.nber.org/system/files/working_papers/w26449/w26449.pdf
- Hsu, D. (2004). "What Do Entrepreneurs Pay for Venture Capital Affiliation?" _Journal of Finance_ 59(4). https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2004.00680.x
- Maurer, Buz, Dremel and de Melo (2024). "Design and Evaluation of an AI-Augmented Screening System for Venture Capitalists." https://gerard.demelo.org/papers/vc-prediction.pdf
- Shane, S. and Cable, D. (2002). "Network Ties, Reputation, and the Financing of New Ventures." _Management Science_ 48(3). https://pubsonline.informs.org/doi/10.1287/mnsc.48.3.364.7731
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part VI (deal-killer list).
- Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF; 539 angels, 1,137 exits. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
