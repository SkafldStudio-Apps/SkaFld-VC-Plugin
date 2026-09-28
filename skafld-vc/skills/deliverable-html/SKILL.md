---
name: deliverable-html
description: Write an agent's finished output as a self-contained HTML deliverable (Screening report, Diligence plan, IC memo) or combine several for one company into a Package. Use at the end of a screening, diligence or IC memo run, or when someone asks for the HTML report or package. Renders locally with no network into ./skafld-vc/.
---

# Deliverable HTML

Turns the output of a run into one self-contained HTML file in the SkaFld VC design system: inline styles, no scripts, no external requests, print styles, and light and dark themes. The platform renders its stored Screenings with the same renderer, so a deliverable looks the same wherever it was made.

## When to use

- At the end of a Screening, Diligence or IC memo run: write that run's deliverable.
- When more than one agent ran on the same company for one request: write each deliverable, then one Package that combines them.
- Where no render tool is available, still build the deliverable JSON when your procedure saves it (`save_deliverable`) or returns it as your final message; skip only the rendering, and do not try other ways of writing files.

## How

1. Build the deliverable as JSON in the format in [references/format.md](references/format.md). Fill the structured fields you have, in the order given, and put your full Markdown document in `body.document`. Every string is data: write plain text and Markdown, never HTML. With a platform connected, set `house` to `whoami`'s `house.short_name` and `company.kind` to `deal` for a company on the platform; otherwise omit `house` and use `outside`.
2. Call `render_deliverable` with `{ "deliverable": <the JSON> }`. It validates, writes `./skafld-vc/<company>-<type>-<date>.html` and the JSON beside it, and returns both paths. If it returns validation errors, fix exactly those fields and call it again.
3. For a Package, call `render_package` with the `files` the earlier calls returned (for example `["harbor-robotics-screening-2026-09-26.json", "harbor-robotics-diligence-plan-2026-09-26.json"]`) and `person` set to who asked. It writes `./skafld-vc/<company>-package-<date>.html` with a cover, a contents list, each deliverable as a section and one combined open-items list.
4. Tell the person the path of the HTML file, and that it is a draft for staff review.

Without the tools (for example on the command line), the same renderer runs as `node ${CLAUDE_SKILL_DIR}/scripts/render.mjs <deliverable.json>`, or `--package <a.json> <b.json>` for a Package.

## Rules

- Everything is a draft; `status` is always `"draft"` and the file says "Draft for staff review".
- `not_assessed` stays `not_assessed`: never give a criterion a score the evidence does not support, and never write 0 for missing evidence.
- Mark research you could not do `not_checked` and list the connectors you could not use in `missingConnectors`; never fill them from memory.
- Every figure carries a source: add it to `sources` and cite it with `sourceIds` or `[^source-id]` in Markdown.
- Report the Rubric version, composite, band, coverage and withheld state exactly as `score_company` returned them, renamed as in the mapping in [references/format.md](references/format.md) (for example `composite.recommendation` becomes `composite.band` and `published.withheld_because` becomes `published.withheldBecause`).
- Screening deliverables are for the admin team and committee only; do not send them to founders or members.
