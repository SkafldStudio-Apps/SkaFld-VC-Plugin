---
name: deliverable-html
description: Writes a finished Sourcing longlist, Screening report, Founder feedback, Diligence plan, IC memo or Portfolio review as a self-contained HTML file, or combines several for one company into a Package. Use at the end of any of those runs, or when someone asks for the HTML report or package.
user-invocable: false
---

# Deliverable HTML

Turns the output of a run into one self-contained HTML file in the SkaFld VC design system: inline styles, no scripts, no external requests, print styles, and light and dark themes. The platform renders its stored Screenings with the same renderer, so a deliverable looks the same wherever it was made.

## When to use

- At the end of a Sourcing, Screening, Diligence, IC memo or Portfolio review run, or when founder feedback is ready: write that deliverable.
- When more than one agent ran on the same company for one request: write each deliverable, then one Package that combines them.
- Where no render tool is available, still build the deliverable JSON when your procedure saves it (`skafld-vc:save_deliverable`) or returns it as your final message; skip only the rendering, and do not try other ways of writing files.

## How

1. Build the deliverable as JSON in the format in [references/format.md](references/format.md). Fill the structured fields you have, in the order given, and put your full Markdown document in `body.document`. What your procedure produces in structure (a price verdict, findings by class with bookends, gap priority and evidence, a plan baseline, coded passes, a disclosure check) goes in its own field, not only in the document: fields the format does not name are not shown. Every string is data: write plain text and Markdown, never HTML. With a platform connected, set `house` to `skafld-vc:whoami`'s `house.short_name` and `company.kind` to `deal` for a company on the platform; otherwise omit `house` and use `outside`.
2. Call `deliverables:render_deliverable` with `{ "deliverable": <the JSON> }`. It validates, writes `./skafld-vc/<company>-<type>-<date>.html` and the JSON beside it, and returns both paths. If it returns validation errors, fix exactly those fields and call it again.
3. For a Package, call `deliverables:render_package` with the `files` the earlier calls returned (for example `["harbor-robotics-screening-2026-09-26.json", "harbor-robotics-diligence-plan-2026-09-26.json"]`) and `person` set to who asked. It writes `./skafld-vc/<company>-package-<date>.html` with a cover, a contents list, each deliverable as a section and one combined open-items list.
4. Tell the person the path of the HTML file, and that it is a draft for staff review.

Without the tools but where you can run commands (Claude's code execution in Chat, or a tool without the plugin's local server), run the same tools from the command line, in the folder you are working in: `node ${CLAUDE_SKILL_DIR}/scripts/run.mjs <tool> <arguments.json>`, where `<tool>` is the tool name (render_deliverable, render_package, score_with_rubric or export_document) and the file holds the tool's JSON arguments (`-` reads them from stdin). It writes the same files and prints the same reply; it exits 1 with the errors to fix. `node ${CLAUDE_SKILL_DIR}/scripts/render.mjs <deliverable.json>` still renders one file directly.

## Rules

- Everything is a draft; `status` is always `"draft"` and the file says "Draft for staff review".
- `not_assessed` stays `not_assessed`: never give a criterion a score the evidence does not support, and never write 0 for missing evidence.
- Mark research you could not do `not_checked` and list the connectors you could not use in `missingConnectors`; never fill them from memory.
- Every figure carries a source: add it to `sources` and cite it with `sourceIds` or `[^source-id]` in Markdown.
- Report the Rubric version, composite, band, coverage and withheld state exactly as `skafld-vc:score_company` returned them, renamed as in the mapping in [references/format.md](references/format.md) (for example `composite.recommendation` becomes `composite.band` and `published.withheld_because` becomes `published.withheldBecause`).
- Screening deliverables are for the admin team and committee only; do not send them to founders or members.
- Every rendered HTML file is internal, founder feedback included. The only thing that goes to a founder is an export made for them: the founder copy of a founder feedback (`deliverables:export_document`, `audience: "founder"`, once its disclosure check passed) or a Diligence plan's request list.
