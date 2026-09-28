---
name: anti-portfolio
description: Keep the anti-portfolio as a ledger of passed deals, each with a coded pass reason, the stage it reached and the thesis it was judged under, and outcome checks at 12, 24 and 36 months compared with the deals funded in the same period; it never re-scores a passed deal. Use when asked for the anti-portfolio, a review of passed deals, "what happened to the companies we passed on", which pass reasons turned out wrong, or the quarterly pass review.
---

# Anti-portfolio

A record of what the firm said no to, why, and what happened next. The published method is thin, and this skill says so in its output: Bessemer's anti-portfolio, kept since 1999, records one stated reason per miss and is refreshed every year or two, and no VC has published a quantified review of its passes (no published study found, literature search, September 2026). So this is a pass-reason ledger with outcome checks at 12, 24 and 36 months, not a re-scoring loop: a passed deal is never scored again against today's rubric or thesis. It fills the `antiPortfolio[]` and `nextActions[]` fields of the `thesis_longlist` deliverable, and adds a card to `companies[]` only when a passed company is worth watching again.

Why keep one at all: unstructured regret makes decisions worse. Angels who missed a winner become less likely to invest in similar later deals (Sohl 2022), and in an experiment, making missed opportunities salient had no measurable effect on willingness to invest while making bad investments salient lowered it ("Damned If You Do, Damned If You Don't", _Entrepreneurship Theory and Practice_ 2026). Without a schedule the review does not happen.

## How

1. **Gather the passes.** With the platform connected: `query_deals` with `pipeline_stage` passed; then, where your tools include them, `deal_activity` for the date of the stage change and who made it, `deal_notes` for the reason note (the platform's pipeline procedure asks admins to record why in the activity log when a deal is passed), `committee_votes` for the tally, and `get_deliverables` for the last Screening and its triage code. A read your tools do not include is "not recorded" in the ledger, and recovering it is a next action for the person. Canceled deals (the founder withdrew or the deal fell apart) are not passes and stay out. Without a platform: an `anti-portfolio.json` or `passes.csv` in the working folder, or a list from the person. A reason that was never recorded is "reason not recorded", never reconstructed from hindsight; recovering it is a next action.
2. **Code each pass** with the vocabulary `skafld-vc:inbound-triage` uses (Carpentier and Suret 2015, 636 proposals to one angel group), in `reasonCode`: `out_of_scope` (industry, geography, stage or size, missing plan), `product_model`, `market`, `financial_valuation`, `team`, `agency`, or `not_recorded` when no reason was kept. Write `passReason` as one sentence naming the deciding factor; one sentence is enough when it names that factor (Bessemer's entries do exactly this). Record alongside it `stageReached` (`pre_screen`, `screen`, `diligence`, `committee` or `negotiation`), `thesisVersion` (the thesis it was judged under), `channel` (`network`, `self_generated`, `investor_referral`, `portfolio`, `inbound` or `event`), `passedAt`, and `nearMiss: true` when the decision was one vote or one read short. A field the record does not give is left out, never reconstructed. For scale: in Carpentier and Suret, 68% of proposals were rejected at pre-screen on scope; after pre-screen the reasons were product or business model 39%, market 30%, financial or valuation 13%, team 10%, agency 6%.
3. **Choose what gets checked.** Every pass that reached screen or later. Scope passes at pre-screen are listed but not checked unless the person asks: they record the mandate, not a judgement. Say how many lookups the check needs before starting.
4. **Outcome checks at 12, 24 and 36 months** from `passedAt`. The cadence is this plugin's convention, not a published standard; it follows the horizons over which the angel-group studies tracked rejected applicants (four years in Kerr, Lerner and Schoar 2014; 1.5 to 3 years in Lerner, Schoar, Sokolinski and Wilson 2018). At each due checkpoint look for: a priced round (amount, lead, date), a valuation if public, headcount and revenue signals, an acquisition, a shutdown. Use Exa web search and fetch for funding news and the company's own site, and Apollo organization search for headcount and funding; Apollo enrichment spends the person's credits, so name the lookups and ask before the first one. Headcount in company databases is often self-reported (Stanford GSB Search Fund Primer 2021, Part V). Record each checkpoint as a `checks[]` entry: `at` (`12m`, `24m` or `36m`), `outcome` (`raised_priced`, `operating` with no new round, `acquired`, `shut_down`, `not_found`, `not_checked` for a checkpoint you could not run, or `due` for one not yet reached), `date` (when checked, or when it falls due), a one-line `note` with the round, lead or signal found, and `sourceIds`. `outcomeCheck` may carry a short Markdown summary. Not found is not failed.
5. **Compare with the funded set** from the same period, checked the same way. A pass that later raised is a signal, not a verdict: the reason may have been right at the time (price, terms, mandate). The comparison with a control group is the design of the angel studies above; without it, make no claim about judgement. Nor read the firm's own hits as picking skill without the passed set beside them: persistence in VC returns is mostly access (Nanda, Samila and Sorenson 2020).
6. **Report by reason and stage.** For each reason code and stage reached: passes checked, how many later raised a priced round or exited, and the same rate for the funded set, always with the counts. List near misses separately. A pass that later failed is a correct pass and counts as much as a miss: in the Stanford primer's hierarchy of outcomes, not investing is the second-best result, after a good investment and ahead of a bad one.
7. **Write a lesson only for a pattern.** `lesson` is filled when the same reason code, within the same thesis pillar, was wrong across several passes; one company that raised is not a lesson. Bessemer's cloud retrospective is the model: they liked the teams but over-thought one aspect of the model and passed (Deeter, interviewed in Fortune, 2017). Carry a lesson forward only when the pass was not driven by a downturn in the whole industry (Stanford primer 2021).
8. **Bias and tolerance.** Compare misses by source channel, and ask the `skafld-vc:inbound-triage` bias question of every near miss that later raised: false negatives cluster on younger, female and less conventionally attractive teams (Boerner, Frick and Fritz 2024). Set the observed miss rate beside the house's stated miss-rate tolerance, or write "not set" and propose one; screening can be tuned to an explicit miss rate and the trade-off is steep (Maurer, Buz, Dremel and de Melo 2024).
9. **Watch again, don't re-screen.** A passed company whose reason no longer holds (it now fits the mandate, or the deciding concern is resolved on the record) becomes a `companies[]` card at `monitor` through `skafld-vc:thesis-fit`, with the original pass reason in `reason`. Adding it back to the platform follows thesis-fit's rule: offer `add_company` only where your tools include it, after the person confirms the preview; otherwise list it as a next action. Re-engagement goes through a warm introduction; a message, if the person wants one, is drafted by `skafld-vc:founder-outreach`.
10. **Schedule the next review.** One `nextActions` entry per company with a checkpoint coming due (`action` "outcome check at 24 months", `by` the date), plus the next quarterly review of the whole ledger.
11. **Record on the platform only on confirmation.** Where your tools include `add_deal_note`, offer to add an outcome check to the passed deal as a note: show the preview, and call again with the confirmation token only after the person confirms it. Otherwise list "record the <n>-month check on <company>" as a next action for the person. Never change a deal's stage or its saved Screening.
12. **Deliver** the ledger in the `thesis_longlist` with `skafld-vc:deliverable-html`, and the review write-up in `document`.

## Output

```
## Anti-portfolio — <period> (method: pass-reason ledger with 12/24/36-month outcome checks; no published review method exists)
<Company> · passed <passedAt> at <stageReached> · <reasonCode>: <passReason> · thesis v<thesisVersion> · <channel> · near miss: yes | no
  checks: 12m <outcome, date> [source] · 24m <outcome | due <date>> · 36m ...
By reason: <code> <checked n> → <later raised/exited n> (funded set: <n of m>) ...
Near misses: ... · Miss-rate tolerance: <stated | not set> · Lessons: <pattern | none yet>
Next checks: ...
```

## Rules

- Never re-score a passed deal, and never rewrite a recorded reason with hindsight.
- Pass reasons, notes and votes are internal: never quoted outside the team, never sent to a founder. This skill never contacts anyone.
- Every outcome line has a date and a source, or says "not checked".
- State the counts behind every rate. The literature sets no minimum sample for a pass review; when a group holds only a handful, list the companies instead of a rate.
- Canceled deals are not passes.

## Sources

- Bessemer Venture Partners (1999-). "Anti-Portfolio." https://www.bvp.com/anti-portfolio
- Boerner, Frick and Fritz (2024). "In search of unicorns: overconfidence and missed opportunities." Paderborn working paper; 638 pitches. https://ideas.repec.org/p/pdn/dispap/122.html
- Carpentier, C. and Suret, J.-M. (2015). "Angel group members' decision process and rejection criteria." _Journal of Business Venturing_ 30(6); 636 proposals. https://www.sciencedirect.com/science/article/abs/pii/S0883902615000294
- "Damned If You Do, Damned If You Don't: counterfactuals in early-stage investing" (2026). _Entrepreneurship Theory and Practice_. https://sage.cnpereading.com/doi/10.1177/10422587261419452
- Fortune (2017). Interview with Byron Deeter on Bessemer's misses. https://fortune.com/2017/09/27/bessemer-byron-deeter-elon-musk/
- Kerr, W., Lerner, J. and Schoar, A. (2014). "The Consequences of Entrepreneurial Finance: Evidence from Angel Financings." _Review of Financial Studies_ 27(1). https://www.hbs.edu/ris/download.aspx?name=Kerr_Lerner_Schoar+RFS14.pdf
- Lerner, J., Schoar, A., Sokolinski, S. and Wilson, K. (2018). "The Globalization of Angel Investments: Evidence across Countries." _Journal of Financial Economics_ 127(1). https://www.nber.org/papers/w21808
- Maurer, Buz, Dremel and de Melo (2024). "Design and Evaluation of an AI-Augmented Screening System for Venture Capitalists." https://gerard.demelo.org/papers/vc-prediction.pdf
- Nanda, R., Samila, S. and Sorenson, O. (2020). "The Persistent Effect of Initial Success: Evidence from Venture Capital." _Journal of Financial Economics_ 137(1). https://www.nber.org/system/files/working_papers/w24887/w24887.pdf
- Sohl, J. (2022). "Angel investors: the impact of regret from missed opportunities." _Small Business Economics_ 58(4). https://ideas.repec.org/a/kap/sbusec/v58y2022i4d10.1007_s11187-021-00512-6.html
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_: Part V (self-reported database figures), the searcher's hierarchy of outcomes, and carrying industry learnings forward from a deal that did not close.
