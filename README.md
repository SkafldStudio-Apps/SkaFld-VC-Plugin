# SkaFld VC

Venture capital agents and skills for Claude Code and Claude Desktop: screening, diligence plans, investment committee memos, returns, market sizing, unit economics, cap tables and deal flow. They work from your own documents, with nothing else to set up, and export branded HTML, Word, PDF, PowerPoint and Excel files.

> This repository is generated from the SkaFld VC source on each release (version 1.0.1). Changes made here are overwritten; open issues rather than pull requests.

## Install

In Claude Code:

```
/plugin marketplace add skafldstudio-apps/skafld-vc-plugin
/plugin install skafld-vc@skafld-vc
```

In Claude Desktop, add the same marketplace under Settings, then install **SkaFld VC**.

Then ask for a screening of a deck in your folder, a diligence plan, an IC memo, or run `/skafld-vc:ask`.

## What you get

- **Agents:** Screening, Diligence and IC memo agents, and an Orchestrator that routes a request to them (`/skafld-vc:ask`).
- **Scoring:** a research-based default rubric (`skafld-vc/rubrics/default.json`), or your own `rubric.json` in the project folder, computed by the local `score_with_rubric` tool.
- **Files:** every deliverable as self-contained HTML in `./skafld-vc/`, and on request as Word, PDF, a PowerPoint deck or a PDF deck. A Diligence plan's request list comes out as an Excel file ready to send to the company.
- **Your brand:** run `/skafld-vc:brand` to keep the SkaFld look or use your firm's: from your website, a logo or brand guide, or a description.

Research connectors such as Exa and Apollo are not shipped. Connect your own once; the agents mark research they could not do as not checked.

## SkaFld VC Platform (for platform customers only)

`skafld-vc-platform` connects these agents to a firm's SkaFld VC platform: its pipeline, documents, rubric and house profile. Install it only if your firm runs one; it asks for your platform's address. To get a platform for your firm, write to hello@skafldstudio.com.

## Licence

MIT; the bundled fonts are under the SIL Open Font License. See LICENSE.
