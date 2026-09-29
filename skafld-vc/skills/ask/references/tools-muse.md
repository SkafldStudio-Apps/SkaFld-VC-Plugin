# SkaFld VC in Muse

The skills and agent procedures are written for Claude Code. In Muse Code, read them with these substitutions.

| The text says                                                            | In Muse                                                                                                                                                                                                     |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Load `skafld-vc:<skill>` with the Skill tool                             | `read_skill` with `skafld-vc:<skill>`, or read `skills/<skill>/SKILL.md`. The person can type `/skafld-vc:<skill>`.                                                                                         |
| Start the `skafld-vc:<agent>` agent (the Agent tool)                     | Muse runs no agents from plugins. Follow `skills/ask/references/<agent>.md` yourself, here; where a subagent tool is available, give it that file and the request.                                          |
| `deliverables:<tool>`, `setup:<tool>`, `exa:<tool>`                      | `mcp__plugin_skafld_vc_deliverables__<tool>`, `mcp__plugin_skafld_vc_setup__<tool>`, `mcp__plugin_skafld_vc_exa__<tool>`                                                                                    |
| `apollo:<tool>`, other connectors, and `skafld-vc:<tool>` (the platform) | Only when the person added the server to `~/.config/muse/settings.json` (a `streamable-http` entry with its URL; the platform's is `<platform address>/api/mcp`) and signed in with `muse mcp login <name>` |
| `${CLAUDE_SKILL_DIR}`                                                    | The folder of the skill you are following, inside the installed plugin                                                                                                                                      |
| Run `node <script>`                                                      | `bash`, always as `node <script>`                                                                                                                                                                           |
| Ask the person                                                           | `request_user_input`                                                                                                                                                                                        |

The deliverables, setup and Exa servers start only after `muse plugins approve skafld-vc`, and need Node.js 18 or later on the PATH.
