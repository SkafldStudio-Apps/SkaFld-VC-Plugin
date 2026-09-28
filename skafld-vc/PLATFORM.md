# SkaFld VC and the SkaFld VC platform

**SkaFld VC works on its own.** You do not need a SkaFld VC platform, an account or anything but the plugin. Every agent and skill works from your documents, scores against the default rubric or your own `rubric.json`, and writes its deliverables as files.

The agent and skill files are written for two kinds of reader: people using the plugin on its own, and people at firms that run a SkaFld VC platform (a hosted deal-flow system SkaFld Studio sets up for venture firms and angel networks) and have connected it with the optional **SkaFld VC Platform** add-on (`skafld-vc-platform`). This page explains the platform references you will see in those files, so you can tell what applies to you.

## On its own, and what a platform adds

|                                                      | On its own                                                                  | With a platform connected                                                                               |
| ---------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Who the agents work for                              | Your firm profile from `/skafld-vc:setup` (optional), or what you tell them | The firm's house profile on the platform                                                                |
| Where the company comes from                         | Your documents, files and connectors                                        | Also the firm's pipeline: deals, applications and data rooms                                            |
| Rubric                                               | The default rubric, or your `rubric.json`                                   | The firm's current rubric, with the platform doing the arithmetic                                       |
| Scoring tool                                         | `score_with_rubric` (local)                                                 | `score_company` (on the platform)                                                                       |
| Earlier work (a Screening before a Diligence plan)   | The files you hand the agent                                                | The saved versions on the deal                                                                          |
| Results                                              | HTML, Word, PDF, decks and Excel files in `./skafld-vc/`                    | The same files; Screening reports, Diligence plans and IC memos are also saved on the deal for the team |
| Checks against the firm's portfolio and passed deals | Not run                                                                     | Run by the Sourcing and Diligence agents                                                                |

Without a platform, no platform call is made and nothing is sent anywhere: the agents skip those steps without asking you about them.

## Reading the files

Each agent's first step decides which case it is in, with two branches:

- **Documents only**: the normal case. The agent reads your firm profile with `get_profile` and works from what you give it.
- **Platform**: only when `whoami` answers. Everything that follows under **Platform**, **A deal on the platform** or **With a platform** applies only there.

Tools are written with their server, as Anthropic's skill guide recommends: `deliverables:render_deliverable` and `setup:get_profile` are the plugin's own local tools, `exa:` and `apollo:` the research connectors, and `skafld-vc:` the platform's tools, which exist only with a platform.

Terms that only mean something with a platform:

| Term                                                                                                                                                                         | What it is                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `whoami`                                                                                                                                                                     | The platform tool that says who is signed in and returns the firm's **house profile**. Without a platform the agents use your saved firm profile in its place, with the same fields. |
| House profile                                                                                                                                                                | The firm's name, thesis, mandate, cheque range, decision format and brand as the platform holds them.                                                                                |
| A deal on the platform, an outside company                                                                                                                                   | A company the firm's platform tracks as a deal, versus any other company. Without a platform every company is an outside company.                                                    |
| Admin team, committee, member                                                                                                                                                | Roles on a firm's platform; they decide who may run a Screening or read a memo there. They do not apply on your own.                                                                 |
| `resolve_company`, `get_deal_details`, `search_documents`, `query_deals`, `get_rubric`, `score_company`, `get_deliverables`, `save_deliverable` and the other platform tools | Tools of the platform's connector. They do not exist without one.                                                                                                                    |
| Platform run, Platform Screening                                                                                                                                             | An agent run on the firm's platform itself, started from the platform, with research caps and consent handled there.                                                                 |
| `platform-access`, `member-insights`                                                                                                                                         | Skills for reading a platform. They load only when a platform answers.                                                                                                               |

## Getting a platform

SkaFld Studio sets up SkaFld VC platforms for venture firms, angel networks and university investor networks. Write to **hello@skafldstudio.com**. Once your firm has one, install the SkaFld VC Platform add-on and sign in; see its README.
