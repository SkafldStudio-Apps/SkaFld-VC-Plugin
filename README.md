# SkaFld VC

Venture capital agents and skills for Claude Code and Claude Desktop, across the deal lifecycle: sourcing against your thesis, screening, diligence plans, investment committee memos and portfolio reviews, with returns, valuation, term sheets, market sizing, unit economics and cap tables. They work from your own documents, research with Exa and Apollo on your own account, read the other tools you already use (company data, CRMs, notes, data rooms, portfolio metrics) when you have connected them, and write designed HTML reports, Word, PDF, PowerPoint and Excel files, in your firm's brand once you set one up.

> This repository is generated from the SkaFld VC source on each release (version 2.4.0). Changes made here are overwritten; open issues rather than pull requests.

## Install

In Claude Code:

```
/plugin marketplace add skafldstudio-apps/skafld-vc-plugin
/plugin install skafld-vc@skafld-vc
```

In Claude Desktop and Cowork, add the same marketplace under Settings, then install **SkaFld VC**. The designed files, brand setup, a firm profile saved across projects and the scoring tool run as two local servers that need **Node.js 18 or later** on your PATH (check with `node --version`). Without Node.js those two servers do not start, and SkaFld VC still works: reports come out as Markdown, files are made with Claude's own document tools, and scoring runs the Python scorer.

Then run `/skafld-vc:setup` once, and just ask: for a longlist against your thesis, a screening of a deck in your folder, a diligence plan, an IC memo or a review of a founder update. Claude hands the work to the right agent. To see everything it can do, or to work through several steps at once, run `/skafld-vc:ask`.

## What you get

Everything below works with the plugin alone: no account, no platform, nothing sent anywhere but the connectors you sign in to yourself.

- **Two commands:** `/skafld-vc:setup` saves your firm's details so the agents stop asking, and the look of your files; `/skafld-vc:ask` is the front door that routes a request to the right agent, and Claude opens it on its own when you ask what SkaFld VC can do. Everything else you just ask for.
- **Agents:** one per phase of the deal lifecycle (Sourcing, Screening, Diligence, IC memo and Portfolio), each working in its own context with its own tools. Ask in plain words ("screen this deck") and Claude picks the agent, or name one with `@agent-skafld-vc:screening-agent` in Claude Code. The Orchestrator behind `/skafld-vc:ask` routes a request to them and runs several in order. Claude's Chat runs no agents; there `/skafld-vc:ask` follows the same agent's procedure itself.
- **Skills:** the know-how the agents use (valuation, term sheets, market sizing, unit economics, cap tables, founder research and more). Claude loads the right one when you ask ("is this cap too high?", "check this SAFE"), and you can run one directly, for example `/skafld-vc:valuation-triangulation` or `/skafld-vc:term-sheet`. Agents load a skill only when a step needs it, so a run carries what it uses and no more.
- **Scoring:** a research-based default rubric (`skafld-vc/rubrics/default.json`), or your own `rubric.json` in the project folder. The arithmetic is never left to the model: the local scoring tool and a dependency-free Python scorer (`skafld-vc/skills/deal-scorecard/scripts/score.py`, which runs wherever Claude can run code, including Claude's code execution in Chat) compute the same result, and both are tested against each other and against the platform on every release.
- **Files:** every deliverable as a designed HTML report in `./skafld-vc/`, and on request as Word, PDF, a PowerPoint deck or a PDF deck. A Diligence plan's request list comes out as an Excel file ready to send to the company. Files are unbranded until you set up a brand.
- **Setup:** run `/skafld-vc:setup` first to save your firm's details and thesis so the agents stop asking, and your firm's brand from your website, a logo or a description. Run it again any time to change one part.
- **Connectors:** the plugin runs only its two local servers, so `/mcp` shows nothing you did not add. Exa (free, no key) and Apollo (your own account) are the recommended research connectors; every other connector the agents can read (company and funding data such as Harmonic, Crunchbase and PitchBook, CRMs such as Attio and Affinity, notes, data rooms, portfolio and finance metrics, public comparables and contracts) is recommended for what it unlocks. Add one from the Claude connector directory, or in Claude Code with `claude mcp add --transport http <name> <address>`, and the agents use it read-only under its usual name. Without one they mark the research they could not do as not checked. Firecrawl, if you add it, is only the fallback for a page Exa could not read; the agents never search with it. See `skafld-vc/CONNECTORS.md` for each connector's address.

## Other tools: Codex, Cursor and Muse

The same skills work in OpenAI Codex, Cursor and Meta's Muse Code; each plugin ships a manifest for them beside the Claude one. What differs is agents and sign-in:

| | Codex | Cursor | Muse Code |
| --- | --- | --- | --- |
| Install | `codex plugin marketplace add skafldstudio-apps/skafld-vc-plugin`, then `codex plugin add skafld-vc@skafld-vc` | Add this repository as a plugin marketplace (team marketplaces import it from GitHub), then install **SkaFld VC** | `muse plugins marketplace add skafld-vc skafldstudio-apps/skafld-vc-plugin`, `muse plugins install skafld-vc@skafld-vc`, then `muse plugins approve skafld-vc` |
| Agents | Run through `$skafld-vc:ask`, which follows each agent's procedure (or hands it to a Codex subagent where multi-agent is on) | Run as Cursor subagents | Run through `/skafld-vc:ask`, which follows each agent's procedure |
| Designed files and exports | Included (Node.js 18 or later) | Included (Node.js 18 or later) | Included (Node.js 18 or later) |
| Connectors | Add Exa, Apollo and others to `~/.codex/config.toml` and sign in with `codex mcp login` | Add Exa, Apollo and others in Cursor's MCP settings | Add Exa, Apollo and others to your Muse settings and sign in with `muse mcp login` |
| SkaFld VC Platform | Add the platform to `~/.codex/config.toml` as `[mcp_servers.skafld-vc]` and run `codex mcp login skafld-vc` | Install **SkaFld VC Platform** and enter the platform address | Add the platform to your Muse settings and run `muse mcp login` |

`skafld-vc/skills/ask/references/tools-codex.md`, `tools-cursor.md` and `tools-muse.md` tell each tool which of its own names to use for what the skills call the Skill tool, the Agent tool and `server:tool`. These packages follow each tool's published plugin format; report anything that does not work as an issue.

## Tested

`skafld-vc/evals` holds test cases for `claude plugin eval` (Claude Code 2.1.269 or later): they check that a request reaches the right skill or agent and that an unrelated request loads none. See `skafld-vc/evals/README.md`.

## With a SkaFld VC platform (optional, for platform customers only)

A SkaFld VC platform is a hosted deal-flow system that SkaFld Studio sets up for a firm. If yours runs one, the **SkaFld VC Platform** add-on (`skafld-vc-platform`) connects these same agents to it: they read the firm's house profile, pipeline, documents and rubric, score with the platform, and save Screening reports, Diligence plans and IC memos on the deal. Install it only if your firm has a platform; it asks for the platform's address. See `skafld-vc-platform/README.md`.

**No platform? Ignore every platform reference.** The agent and skill files are written for both cases, so you will see steps marked **Platform** and tools such as `whoami` or `save_deliverable`. Without a platform the agents skip them and never mention them. `skafld-vc/PLATFORM.md` explains each of those terms and what a platform adds. To get a platform for your firm, write to hello@skafldstudio.com.

## Earlier versions

Before 2.0 the designed files and the extra connectors were the separate plugins SkaFld VC Files and SkaFld VC Connectors. Both are now part of SkaFld VC; updating the marketplace moves an install of either to SkaFld VC.

## Licence

MIT; the bundled fonts are under the SIL Open Font License. See LICENSE.
