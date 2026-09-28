# SkaFld VC

Venture capital agents and skills for Claude Code and Claude Desktop, across the deal lifecycle: sourcing against your thesis, screening, diligence plans, investment committee memos and portfolio reviews, with returns, valuation, term sheets, market sizing, unit economics and cap tables. They work from your own documents, with nothing else to set up, research with Exa and Apollo on your own account, and export branded HTML, Word, PDF, PowerPoint and Excel files.

> This repository is generated from the SkaFld VC source on each release (version 1.1.1). Changes made here are overwritten; open issues rather than pull requests.

## Install

In Claude Code:

```
/plugin marketplace add skafldstudio-apps/skafld-vc-plugin
/plugin install skafld-vc@skafld-vc
```

In Claude Desktop, add the same marketplace under Settings, then install **SkaFld VC**. The plugin's local servers (files and brand setup) run with Node.js 18 or later, which must be on your PATH; Claude Desktop uses the Node it finds there.

Then ask for a longlist against your thesis, a screening of a deck in your folder, a diligence plan, an IC memo, a review of a founder update, or run `/skafld-vc:ask`.

## What you get

- **Agents:** one per phase of the deal lifecycle (Sourcing, Screening, Diligence, IC memo and Portfolio), and an Orchestrator that routes a request to them (`/skafld-vc:ask`). Each has its own command: `/skafld-vc:source`, `/skafld-vc:screen`, `/skafld-vc:diligence`, `/skafld-vc:memo` and `/skafld-vc:portfolio`.
- **Quick analyses:** `/skafld-vc:triage`, `/skafld-vc:scorecard`, `/skafld-vc:valuation`, `/skafld-vc:terms`, `/skafld-vc:comps`, `/skafld-vc:market`, `/skafld-vc:landscape`, `/skafld-vc:unit-econ`, `/skafld-vc:returns`, `/skafld-vc:founders`, `/skafld-vc:audit-deck`, `/skafld-vc:passes` (the anti-portfolio) and `/skafld-vc:feedback` (founder feedback after a screening).
- **Scoring:** a research-based default rubric (`skafld-vc/rubrics/default.json`), or your own `rubric.json` in the project folder, computed by the local `score_with_rubric` tool.
- **Files:** every deliverable as self-contained HTML in `./skafld-vc/`, and on request as Word, PDF, a PowerPoint deck or a PDF deck. A Diligence plan's request list comes out as an Excel file ready to send to the company.
- **Your brand:** run `/skafld-vc:brand` to keep the SkaFld look or use your firm's: from your website, a logo or brand guide, or a description.

- **Research:** Exa (free, no key needed) and Apollo (your own account) come with the plugin as recommended connectors; sign in to Apollo when asked. Without them the agents mark research they could not do as not checked. See `skafld-vc/CONNECTORS.md`.

## SkaFld VC Platform (for platform customers only)

`skafld-vc-platform` connects these agents to a firm's SkaFld VC platform: its pipeline, documents, rubric and house profile. Install it only if your firm runs one; it asks for your platform's address. To get a platform for your firm, write to hello@skafldstudio.com.

## Licence

MIT; the bundled fonts are under the SIL Open Font License. See LICENSE.
