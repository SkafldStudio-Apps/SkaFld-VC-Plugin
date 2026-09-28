---
name: deck-audit
description: Audit a pitch deck slide by slide against a standard content list (a practitioner pitch guide's twelve items plus the Sequoia template sections), test every claim for evidence and precision, reconcile the numbers across slides, name red flags (unrealistic expectations, proformas that do not reconcile, vague use of funds, off-market valuation, first-mover claims without a mechanism) and rank questions for the founder call. Use when a deck arrives, before a scorecard, and for diligence prep.
---

# Deck audit

A reading aid for a human reviewer, not a verdict. Every finding quotes the slide it comes from.

## Procedure

1. **Inventory the deck.** List each slide's number and purpose. Map the deck against the standard content list below and mark each item present, partial or missing.

2. **Standard content list.** The union of the twelve "good contents" in the GoingVC founder-pitch guide (undated; marked G) and the twelve sections of the Sequoia pitch template as taught in Pear VC's 2026 founder workshop (Pear VC, 2026; marked S). Sequoia's own template asks for TAM top-down, SAM bottom-up, SOM and a separate "why now" (Sequoia, c. 2010-18).

   | #   | Item                                       | From | What present looks like                                                                                                                                                    |
   | --- | ------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | 1   | Company name, logo and location            | G    | Where the company is incorporated and where the team works                                                                                                                 |
   | 2   | Company purpose                            | S    | One declarative sentence                                                                                                                                                   |
   | 3   | Business description                       | G    | What the company sells, to whom                                                                                                                                            |
   | 4   | Problem                                    | G, S | Who has it, how they solve it today, what it costs them                                                                                                                    |
   | 5   | Solution                                   | G, S | How the product removes the problem; a demo or screenshot                                                                                                                  |
   | 6   | Why now                                    | S    | The technology, platform or regulatory change that makes this possible now                                                                                                 |
   | 7   | Market size and target market              | G, S | Bottom-up: number of customers x revenue per customer, with each input sourced (Pear VC, 2026); the target segment named                                                   |
   | 8   | Business model                             | G, S | How it makes money; price point; value delivered and the share of it captured                                                                                              |
   | 9   | Go to market                               | S    | How the first customers were won and how the next ones will be; at seed, early signs the hypothesis works rather than a full funnel                                        |
   | 10  | Traction                                   | S    | Before launch: validation (interviews with n, pilots, LOIs). After launch: engagement, revenue, retention, pipeline, unit economics                                        |
   | 11  | Team, with names and titles                | G, S | Why this team: relevant history, not only logos                                                                                                                            |
   | 12  | Competition and competitive advantage      | G, S | Named competitors including the status quo; the advantage stated separately from the landscape, with what stops a funded competitor copying it                             |
   | 13  | Product or service roadmap, and the future | G, S | Next 12-24 months of product; the 5- and 10-year vision                                                                                                                    |
   | 14  | Financials, the ask and milestones         | G, S | Proforma or projected financials with assumptions; how much is being raised; how the funds will be used; what the round achieves in one and two years and what it de-risks |

3. **Record every quantitative claim**: the figure verbatim, its slide, and whether a source or method is given. Mark each **sourced** (a named source or a method you can recompute), **asserted** (a number with no source) or **marketing** (superlatives, "the leading", "10x better" with no measure).

4. **Run the precision test.** For each claim that matters to the decision (market, traction, retention, growth, pricing, team outcomes), record whether it is quantified or not. "Our NRR is 146%. 60% of our accounts expand by 70% six months after they start" is precise; "customers love us" is not (Pear VC, 2026). Count quantified against unquantified claims and list the unquantified ones that most need a number.

5. **Reconcile across slides.** Revenue against customers against price; market size against the bottom-up inputs (customers x revenue per customer); hires against use of funds; timeline against burn and runway; headcount growth against revenue growth (GoingVC angel diligence guide, undated). For anything financial, load `skafld-vc:unit-economics` and label figures stated, derived or benchmark. For the ask, compare the round with runway: the test is 12 to 18 months to a named milestone (Point Nine's investor checklist, as in `skafld-vc:stage-calibration`); the angel guide's "next eighteen to twenty-four months" is context for a longer plan, and more capital than planned uses is "an immediate red flag" (GoingVC angel diligence guide, undated).

6. **Check for the named red flags.** Quote the slide for each one found:

   - **Unrealistic expectations** on market size, time to market or price points (GoingVC founder-pitch guide, undated). The guide's caveat applies: "There is a difference between solving problems that have been seen as unrealistic and companies solving problems in an unrealistic way." For price points, a practitioner rule of thumb is that software captures roughly 10-15% of the value it saves, marketplaces take 10-30%, and affiliate fees run 2-25% (Pear VC, 2026); a price far outside these needs an explanation.
   - **Proformas that do not reconcile**: "very loose estimates with inconsistent timelines and proforma financials that in no way line up" (GoingVC founder-pitch guide, undated). Name the two figures that disagree.
   - **Use of funds that stops at "build the MVP."** The guide asks for use of capital "going beyond 'to develop the MVP' and into the specifics of research initiatives, sales and marketing spend, hiring" (GoingVC founder-pitch guide, undated).
   - **Unreasonable valuation expectations.** The guide says the valuation "needs to be reasonable" (GoingVC founder-pitch guide, undated). Compute the implied post-money (raise / stake offered) and compare it with current medians for the stage: seed $24.3M post-money on $4.1M raised at 18% dilution, Series A $80M on $14.4M at 18%, for software in the six months to July 2026 (Carta, 2026). AI and non-AI companies price as different markets (Carta, 2026). State the gap; the price judgement itself belongs to a valuation skill, not this audit.
   - **First-mover claims without a mechanism.** "Relying solely on a first-mover advantage or ignoring the possibility of future competition should be seen as a red flag" (GoingVC angel diligence guide, undated). A first-mover claim needs a mechanism: technology leadership, preemption of scarce assets, or buyer switching costs (Lieberman and Montgomery, 1988). Without one, cite the base rate: 47% of market pioneers fail and their mean share is 10% (Golder and Tellis, 1993).
   - Also note: competitors omitted or "no competition"; a market size with no serviceable slice; traction shown only as cumulative or vanity metrics; a team slide with no relevant operating history (load `skafld-vc:founder-research` for the facts).

7. **Calibrate to stage.** Load `skafld-vc:stage-calibration`. A missing item the stage does not yet produce (no retention curve at pre-seed, no go-to-market numbers at idea stage) is marked "not expected at this stage", not missing, and is `not_assessed` in a scorecard, never a low score.

8. **Compare with platform data.** With a platform connected, read the deal's extracted data with `get_deal_details` and search its documents with `search_documents`; flag every difference between the deck and the record. Where fit with an investor's mandate matters (sector, stage, geography), read it from the house profile from `whoami`; without a platform, use the saved firm profile's thesis and mandate (`get_profile`) or the thesis the user gave.

9. **Write the founder question list**, ranked by how much a good answer would move the scorecard. Always include the three hypothetical questions from the founder-pitch guide, which test how the founders communicate and think through a problem (GoingVC founder-pitch guide, undated):

   - "What would happen if a customer had a negative experience with the service?"
   - "What happens if right after you ship the product you discover a bug?"
   - "What if competitor X launches a rival product?" (name the most relevant competitor from the deck or the landscape)

   The questions are for the human team to ask. The agent never contacts the founders.

## Output

```
## Deck audit: <Company> (<n> slides)
Stage bar: <from stage-calibration>

Content list: <n> of 14 present · <n> partial · <n> missing · <n> not expected at this stage
| # | Item | Slide | Present / partial / missing / not expected | Note |

Claims: <n> sourced · <n> asserted · <n> marketing
Precision: <n> quantified · <n> unquantified; unquantified claims that most need a number: ...

| Slide | Claim (verbatim) | Basis | Quantified | Note |

Reconciliation: <check: match or gap, with both figures and slides>
Red flags: <flag: slide, verbatim quote, why>
Differences from the platform record: <field: deck vs record> (or "no platform connected")

Questions for the founder call (ranked):
1. ...
Hypotheticals: 1. customer negative experience 2. bug after ship 3. competitor <X> launches a rival
```

## Rules

- Quote claims verbatim with the slide number so the founder can find them.
- Keep the tone neutral; the audit is a reading aid, not a verdict, and a draft for a human decision.
- Every benchmark or threshold you cite carries its source and date. Never invent a benchmark to judge a claim; where none exists, say so.
- An item the stage does not produce yet is `not_assessed`, never a low score.
- Cite every figure to its slide or to the tool result it came from.
- Never contact the company or its founders; the question list is for the human team.

## Sources

- GoingVC Research Library, "What to Look for in a Founder Pitch" ("The Good Contents", "Red Flags", hypothetical questions, use of capital, valuation), undated. Practitioner guide read from a reference folder; no public URL recorded.
- GoingVC Research Library, "Complete Due Diligence for Angels" (financial due diligence, raise sizing, moats), undated. Practitioner guide read from a reference folder; no public URL recorded.
- Pear VC (Hershenson), "Pear Fundraise 2026" founder workshop deck (Sequoia pitch template, market size as customers x revenue per customer, pricing rules of thumb, precision examples), 2026. Google Slides deck read from a reference folder; no public URL recorded.
- Sequoia Capital, "Writing a Business Plan" (pitch template), c. 2010-18. Mirror: https://rezascave.com/blog/canonical-checklist-of-sequoiacap-com/ ; https://www.nebraskaangels.org/file_download/7370ce25-b802-4cb9-b293-8b95737da264
- Carta, "State of Private Markets: Q1 2026", "Record-setting early-stage valuations" and related data pages, 2026. https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/record-setting-valuations/
- Lieberman and Montgomery, "First-Mover Advantages", Strategic Management Journal 9, 1988 (and "First-Mover (Dis)Advantages", 1998). Cited via https://www.researchgate.net/publication/311908029_First-Mover_Advantage
- Golder and Tellis, "Pioneer Advantage: Marketing Logic or Marketing Legend?", Journal of Marketing Research 30(2), 1993. https://gtellis.net/wp-content/uploads/2020/09/pioneering-advantage-marketing-logic-or-marketing-legend.pdf
