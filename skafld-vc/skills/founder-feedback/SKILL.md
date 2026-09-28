---
name: founder-feedback
description: Prepare feedback for a founder after a screening as a founder_feedback deliverable - an internal call brief and a founder-facing note of strengths, suggestions and questions across seven areas (story, business model, competition, metrics, team, product, valuation), with a disclosure check so it never communicates a pass, a score, a vote or a member name - rendered for the team and exported as a founder copy that leaves the brief out; a draft for a named person to send. Use when someone asks for "founder feedback", "a feedback note", "prep for the feedback call" or "what should we tell the founder".
---

# Founder feedback

This skill turns a Screening (or the materials behind one) into something a person at the house can say or send. It never carries the decision: whether and how to decline belongs to the admin's decline flow in `skafld-vc:founder-outreach`, and this note stays neutral about the outcome. No study measures the effect of founder feedback or decline etiquette on deal flow or outcomes (no published study found, literature search, September 2026); the reason for doing it well is that an investor's reputation with founders is priced: offers from high-reputation VCs are about three times as likely to be accepted, at a 10 to 14% lower valuation (Hsu, "What Do Entrepreneurs Pay for Venture Capital Affiliation?", Journal of Finance, 2004).

The seven areas and their order come from the GoingVC Founder Feedback Guide (GoingVC Investor Program, undated), a checklist investors read before a feedback call.

## Who runs it

A person at the house asks for it, and a person uses it; nothing is sent by an agent. An agent whose own rules forbid founder-facing drafts (the Screening, Diligence and IC memo agents) writes only part A, the internal call brief (in its own deliverable, not a `founder_feedback` one), and leaves the note to the person who asks for it in the main conversation.

## How

1. **Gather the evidence.** The Screening report (scorecard reasoning, deck audit, founder table, research, ranked questions) where one exists; otherwise the deck, application and documents the user gives. With the platform, `get_deliverables` for the deal's current Screening. Read `house.name` from `whoami`, or use the name the user gives. Feedback rests only on what those materials show.
2. **Try the product first.** The guide asks reviewers to get to know the product (a beta sign-up or a demo) before commenting on it. If no one at the house has, the Product area is "not discussed" and becomes a question.
3. **Rate each area**, internally, as `strong`, `adequate`, `gap` or `not_discussed`, with the evidence behind it. An area the materials do not cover is `not_discussed`, never a gap. Judge against the stage bar from the Screening or `skafld-vc:stage-calibration`: an incomplete team at pre-seed is not a gap.
   - **Story**: is the problem and solution clear; is there a case for why now and for why this team.
   - **Business model**: is the market size reasoned from the bottom up as well as the top down (`skafld-vc:market-sizing`); how the company makes money and what has to be true for it to scale.
   - **Competition**: have they considered adjacent and indirect competitors; a competitor map with, per competitor, size and revenue or share where public, team, strengths and weaknesses and business model, as the guide suggests (`skafld-vc:competitive-landscape`).
   - **Metrics**: at an early call, metrics are scarce; the guide's advice is to help founders decide which metrics to track and how to set goals. Suggest the few that fit the model and stage, with definitions from `skafld-vc:unit-economics`.
   - **Team**: are the roles the stage needs covered, or is there a plan to cover them. Only professional facts; never age, school, personality or other non-cues.
   - **Product**: is it usable; does the website make the problem, solution and product obvious; how defensible is the technology.
   - **Valuation**: the construction of the round, not the house's view of the price. Does the raise fund 12 to 18 months to a named milestone (Wittenborn, "The Investor Checklist", Point Nine, 2015; the guide's own window is 18 to 24 months); are uses of funds specific; can the founder explain the post-money, the pool and the SAFE stack. Never share the house's comparables, ceiling, counter or price verdict; negotiation belongs to the deal lead.
4. **Write the strengths.** Three at most across the note, each specific, traceable to evidence and filed under its area ("the pilot with two hospital systems converted to paid contracts in eight weeks"), never generic praise.
5. **Write the suggestions.** Three to five, each under one area, each something the founder can act on, phrased as what would make the case stronger for any investor. Turn internal findings into neutral, useful advice: "the deck's retention figure is hard to reconcile with the financials" becomes "show retention by monthly cohort, from the same data as the financials".
6. **Write the questions.** Three to five open questions, taken from the Screening's ranked questions where they exist, each under its area; a `not_discussed` area gets a question, never a criticism. Add one hypothetical to see how the founders reason, of the kind the pitch guide suggests (a customer's bad experience, a serious bug found just after launch, a competitor launching a rival product; GoingVC, What to Look for in a Founder Pitch, undated).
7. **Run the disclosure check** on every founder-facing line (each area's strengths, suggestions and questions, the note and the next step) before building the deliverable; every line must pass:

   - no pass, decline, "not accepted", "not a fit" or any outcome, and no hint of one ("unfortunately", "at this time we");
   - no promise of investment, amount or timeline;
   - no score, band, composite, rubric, vote, committee view, internal note or member name;
   - no names or confidential figures of other companies from the pipeline, no off-list references and nothing from a conflict check;
   - nothing about the founders beyond professional history;
   - no figure the materials do not support.

   Remove or rewrite a line that fails, and record what was taken out. The check has passed only when every remaining line passes.

8. **Build the `founder_feedback` deliverable** in the `skafld-vc:deliverable-html` format: the envelope with `type: "founder_feedback"`, the company, `preparedBy` with the person it is for, and every document it rests on in `sources`; and this body:
   - internal fields (never in the founder copy): `basedOn` (the Screening version or documents), `stageBar`, `brief` (the call brief in Markdown: what to cover, in what order, and what to leave alone), `leaveAlone` (areas that would reveal the decision or internal findings), and in each area `status`, `evidence`, `say` and `doNotSay`;
   - `areas`: all seven, each once, in the guide's order (`story`, `business_model`, `competition`, `metrics`, `team`, `product`, `valuation`), with the founder-facing `strengths`, `suggestions` and `questions` for that area, and `sourceIds`;
   - founder-facing fields: `note` (Markdown: a one-sentence thank-you specific to what they shared, and anything else to send) and `nextStep` (the step the person chooses; never an outcome);
   - `disclosureCheck`: `passed` (true only when every founder-facing line passed step 7), `items` (how many lines were checked) and `removed` (what was taken out to pass).
9. **Render and export.** Render the deliverable with `render_deliverable` for the team: the HTML shows the brief and the note together and is internal. Export the founder copy with `export_document` and `audience: "founder"` (Word or PDF), which leaves out the brief and every internal field; export it only when `disclosureCheck.passed` is true. Nothing is saved to a platform: this is a plugin-only deliverable, and `save_deliverable` does not take it.
10. **Hand it over.** Give the team HTML and the founder copy's path to the person who asked. If they want a covering message or a call invitation, draft it with `skafld-vc:founder-outreach` (its feedback-call prep type, under 150 words). A person reads the founder copy and sends it; you never do.

## Output

The `founder_feedback` deliverable, rendered and exported, and in the conversation:

```
# Founder feedback: <Company> — DRAFT for <person>, not sent

## A. Internal call brief (not for the founder)
Based on: <basedOn> · Stage bar: <stageBar>
| Area | Status | Evidence (source) | Say | Do not say |
Leave alone on the call: <leaveAlone>

## B. Founder copy (export_document, audience "founder")
Note: <one-sentence thank-you>
What stands out: 1-3 strengths, each labelled with its area
Suggestions: 3-5, each labelled with its area
Questions we'd like to understand better: 3-5
Next step: <nextStep; no outcome>

Disclosure check: passed on <items> lines · removed: <what, or none>
Files: <team HTML path> · <founder copy path>
```

Keep the founder copy to one page; a founder should read it in three minutes.

## Rules

- Never communicate a pass, decline or any outcome, and never imply one; the admin's decline flow owns that (`skafld-vc:founder-outreach`).
- Never quote scores, bands, votes, committee views, internal notes or member names.
- Feedback only on what the materials show; an area without evidence is "not discussed" and becomes a question, never a criticism.
- Professional history only; no comment on personal characteristics.
- Paraphrase the practitioner guides; the note is in the house's voice, not theirs.
- Only the export with `audience: "founder"` goes to a founder, and only after the disclosure check passed; the team HTML never leaves the house.
- A draft for a named person to use. Never send it and never contact the founder.

## Sources

- GoingVC (undated). Founder Feedback Guide (GoingVC Investor Program); What to Look for in a Founder Pitch. Practitioner reference library; no public URL.
- Hsu (2004). What do entrepreneurs pay for venture capital affiliation? Journal of Finance 59(4). https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2004.00680.x
- Wittenborn (2015). The Investor Checklist. Point Nine. https://medium.com/point-nine-news/the-investor-checklist-b9d1e6d3daab
