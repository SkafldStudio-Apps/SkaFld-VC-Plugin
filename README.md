# SkaFld VC

Venture capital agents and skills for Claude Code and Claude Desktop, across the deal lifecycle: sourcing against your thesis, screening, diligence plans, investment committee memos and portfolio reviews, with returns, valuation, term sheets, market sizing, unit economics and cap tables. They work from your own documents, with nothing else to set up, research with Exa and Apollo on your own account, and export branded HTML, Word, PDF, PowerPoint and Excel files.

> This repository is generated from the SkaFld VC source on each release (version 1.5.0). Changes made here are overwritten; open issues rather than pull requests.

## Install

In Claude Code:

```
/plugin marketplace add skafldstudio-apps/skafld-vc-plugin
/plugin install skafld-vc@skafld-vc
```

In Claude Desktop, add the same marketplace under Settings, then install **SkaFld VC**. The plugin's local servers (files and brand setup) run with Node.js 18 or later, which must be on your PATH; Claude Desktop uses the Node it finds there.

Then run `/skafld-vc:setup` once, and just ask: for a longlist against your thesis, a screening of a deck in your folder, a diligence plan, an IC memo or a review of a founder update. Claude hands the work to the right agent. To see everything it can do, or to work through several steps at once, run `/skafld-vc:ask`.

## What you get on its own

Everything below works with the plugin alone: no account, no platform, nothing sent anywhere but the research connectors you sign in to yourself.

- **Two commands:** `/skafld-vc:setup` sets the look of your files and, if you want, your firm's details; `/skafld-vc:ask` is the front door that routes a request to the right agent, and Claude opens it on its own when you ask what SkaFld VC can do. Everything else you just ask for.
- **Agents:** one per phase of the deal lifecycle (Sourcing, Screening, Diligence, IC memo and Portfolio), each working in its own context with its own tools. Ask in plain words ("screen this deck") and Claude picks the agent, or name one with `@agent-skafld-vc:screening-agent` in Claude Code. The Orchestrator behind `/skafld-vc:ask` routes a request to them and runs several in order. Claude's Chat runs no agents; there `/skafld-vc:ask` follows the same agent's procedure itself.
- **Skills:** the know-how the agents use (valuation, term sheets, market sizing, unit economics, cap tables, founder research and more). Claude loads the right one when you ask ("is this cap too high?", "check this SAFE"), and you can run one directly, for example `/skafld-vc:valuation-triangulation` or `/skafld-vc:term-sheet`. Agents load a skill only when a step needs it, so a run carries what it uses and no more.
- **Scoring:** a research-based default rubric (`skafld-vc/rubrics/default.json`), or your own `rubric.json` in the project folder, computed by the local scoring tool (also runnable as `node skafld-vc/skills/deliverable-html/scripts/run.mjs score_with_rubric` where the plugin's local tools do not run).
- **Files:** every deliverable as self-contained HTML in `./skafld-vc/`, and on request as Word, PDF, a PowerPoint deck or a PDF deck. A Diligence plan's request list comes out as an Excel file ready to send to the company.
- **Setup:** run `/skafld-vc:setup` first: keep the SkaFld look or use your firm's brand (from your website, a logo or a description), and optionally save your firm's details and thesis so the agents stop asking. Run it again any time to change one part.
- **Connectors:** the plugin declares the ones most angels and funds use: Exa (free, no key), Apollo, Harmonic, Specter, Dealroom, Clay, Notion, Granola, Fireflies, Attio, Affinity, Carta and Standard Metrics. Sign in to the ones you use with your own account. The optional **SkaFld VC Connectors** plugin adds paid data (Crunchbase, PitchBook, CB Insights, Tracxn), more CRMs and note-takers, data rooms, portfolio and finance metrics, public comparables and contracts. The agents read them read-only; without them they mark research they could not do as not checked. See `skafld-vc/CONNECTORS.md`.

## Other tools: Codex, Cursor and Muse

The same skills work in OpenAI Codex, Cursor and Meta's Muse Code; each plugin ships a manifest for them beside the Claude one. What differs is agents and sign-in:

| | Codex | Cursor | Muse Code |
| --- | --- | --- | --- |
| Install | `codex plugin marketplace add skafldstudio-apps/skafld-vc-plugin`, then `codex plugin add skafld-vc@skafld-vc` | Add this repository as a plugin marketplace (team marketplaces import it from GitHub), then install **SkaFld VC** | `muse plugins marketplace add skafld-vc skafldstudio-apps/skafld-vc-plugin`, `muse plugins install skafld-vc@skafld-vc`, then `muse plugins approve skafld-vc` |
| Agents | Run through `$skafld-vc:ask`, which follows each agent's procedure (or hands it to a Codex subagent where multi-agent is on) | Run as Cursor subagents | Run through `/skafld-vc:ask`, which follows each agent's procedure |
| Local files and exports | Yes (Node.js 18 or later) | Yes (Node.js 18 or later) | Yes (Node.js 18 or later), after `muse plugins approve` |
| Connectors | Exa is on; turn on others in `~/.codex/config.toml` and sign in with `codex mcp login` | All declared; each signs in on first use | Exa is on; add others to your Muse settings and sign in with `muse mcp login` |
| SkaFld VC Platform | Add the platform to `~/.codex/config.toml` as `[mcp_servers.skafld-vc]` and run `codex mcp login skafld-vc` | Install **SkaFld VC Platform** and enter the platform address | Add the platform to your Muse settings and run `muse mcp login` |

`skafld-vc/skills/ask/references/tools-codex.md`, `tools-cursor.md` and `tools-muse.md` tell each tool which of its own names to use for what the skills call the Skill tool, the Agent tool and `server:tool`. These packages follow each tool's published plugin format; report anything that does not work as an issue.

## Tested

`skafld-vc/evals` holds test cases for `claude plugin eval` (Claude Code 2.1.269 or later): they check that a request reaches the right skill or agent and that an unrelated request loads none. See `skafld-vc/evals/README.md`.

## With a SkaFld VC platform (optional, for platform customers only)

A SkaFld VC platform is a hosted deal-flow system that SkaFld Studio sets up for a firm. If yours runs one, the **SkaFld VC Platform** add-on (`skafld-vc-platform`) connects these same agents to it: they read the firm's house profile, pipeline, documents and rubric, score with the platform, and save Screening reports, Diligence plans and IC memos on the deal. Install it only if your firm has a platform; it asks for the platform's address. See `skafld-vc-platform/README.md`.

**No platform? Ignore every platform reference.** The agent and skill files are written for both cases, so you will see steps marked **Platform** and tools such as `whoami` or `save_deliverable`. Without a platform the agents skip them and never mention them. `skafld-vc/PLATFORM.md` explains each of those terms and what a platform adds. To get a platform for your firm, write to hello@skafldstudio.com.

## Licence

MIT; the bundled fonts are under the SIL Open Font License. See LICENSE.
