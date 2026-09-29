---
name: deliverable-html
description: Writes a finished Sourcing longlist, Screening report, Founder feedback, Diligence plan, IC memo or Portfolio review as a deliverable (structured JSON plus a report, HTML with the Files add-on or Markdown without it), or combines several for one company into a Package. Use at the end of any of those runs, or when someone asks for the report or package.
user-invocable: false
---

# Deliverable HTML

Turns the output of a run into a deliverable: always the structured JSON, and a readable report for the person. With the SkaFld VC Files add-on installed, the report is one self-contained HTML file in the SkaFld VC design system (inline styles, no scripts, no external requests, print styles, light and dark themes), the same renderer the platform uses for its stored Screenings. Without it, you write the report with Claude's own tools, and it looks however this Claude is set up to write documents.

## When to use

- At the end of a Sourcing, Screening, Diligence, IC memo or Portfolio review run, or when founder feedback is ready: write that deliverable.
- When more than one agent ran on the same company for one request: write each deliverable, then one Package that combines them.

## 1. Build the deliverable (always)

Build the deliverable as JSON in the format in [references/format.md](references/format.md). Fill the structured fields you have, in the order given, and put your full Markdown document in `body.document`. What your procedure produces in structure (a price verdict, findings by class with bookends, gap priority and evidence, a plan baseline, coded passes, a disclosure check) goes in its own field, not only in the document: fields the format does not name are not shown. Every string is data: write plain text and Markdown, never HTML. With a platform connected, set `house` to `skafld-vc:whoami`'s `house.short_name` and `company.kind` to `deal` for a company on the platform; otherwise omit `house` and use `outside`.

The JSON is what a platform saves (`skafld-vc:save_deliverable`), what a Package and an export are built from, and, in a platform run, your final message. Build it even where nothing can be rendered.

## 2. With the Files add-on (`deliverables:render_deliverable` is available)

1. Call `deliverables:render_deliverable` with `{ "deliverable": <the JSON> }`. It validates, writes `./skafld-vc/<company>-<type>-<date>.html` and the JSON beside it, and returns both paths. If it returns validation errors, fix exactly those fields and call it again.
2. For a Package, call `deliverables:render_package` with the `files` the earlier calls returned (for example `["harbor-robotics-screening-2026-09-26.json", "harbor-robotics-diligence-plan-2026-09-26.json"]`) and `person` set to who asked. It writes `./skafld-vc/<company>-package-<date>.html` with a cover, a contents list, each deliverable as a section and one combined open-items list.
3. Tell the person the path of the HTML file, and that it is a draft for staff review.

## 3. Without the Files add-on

In a platform run (the request says it is one), your final message is the deliverable JSON and nothing else; the platform renders it. Everywhere else, give the person a readable report with what this environment has:

1. **The report.** Write the deliverable as one Markdown document: a first line "Draft for staff review", the title (`<Company>: <type>`), the verdict or summary, then `body.document`, followed by the tables your structured fields hold that the document does not already show (the scorecard worksheet with the rubric named, the price verdict, the request list, open items) and the sources with their dates.
2. **Where it goes.** Where you can write files (Claude Code, Cowork), save it as `./skafld-vc/<company>-<type>-<date>.md` with the JSON beside it as `.json`, the same names the Files add-on uses, and give both paths. Where you cannot (Claude's Chat, or an agent with no file tool), show it as a document or artifact if you have one; otherwise put it in your reply, and as an agent end your final message with the deliverable JSON in a `json` block, so the conversation that started you can save both.
3. **A file in a format.** When the person asked for Word, PDF, a deck or Excel, follow `skafld-vc:document-export`; it says how to make them with Claude's own document tools.
4. **A Package** is the same: one Markdown document with a cover line, a contents list, each deliverable as a section and one combined open-items list.
5. Say once per conversation, in one line, that the optional SkaFld VC Files add-on writes these as designed HTML, Word, PDF, decks and Excel in the firm's brand. Do not repeat it, and do not try other ways of running the add-on's code.

## Rules

- Everything is a draft; `status` is always `"draft"` and the file says "Draft for staff review".
- `not_assessed` stays `not_assessed`: never give a criterion a score the evidence does not support, and never write 0 for missing evidence.
- Mark research you could not do `not_checked` and list the connectors you could not use in `missingConnectors`; never fill them from memory.
- Every figure carries a source: add it to `sources` and cite it with `sourceIds` or `[^source-id]` in Markdown.
- Report the Rubric version, composite, band, coverage and withheld state exactly as `skafld-vc:score_company` returned them, renamed as in the mapping in [references/format.md](references/format.md) (for example `composite.recommendation` becomes `composite.band` and `published.withheld_because` becomes `published.withheldBecause`).
- Screening deliverables are for the admin team and committee only; do not send them to founders or members.
- Every rendered HTML file is internal, founder feedback included. The only thing that goes to a founder is an export made for them: the founder copy of a founder feedback (`deliverables:export_document`, `audience: "founder"`, once its disclosure check passed) or a Diligence plan's request list.
