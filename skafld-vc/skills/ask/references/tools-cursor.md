# SkaFld VC in Cursor

The skills and agent procedures are written for Claude Code. In Cursor, read them with these substitutions.

| The text says                                                                                 | In Cursor                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Load `skafld-vc:<skill>` with the Skill tool                                                  | Read `skills/<skill>/SKILL.md` in the installed plugin in full. The person can type `/<skill>`.                                                   |
| Start the `skafld-vc:<agent>` agent (the Agent tool)                                          | The `Task` tool with `subagent_type` set to the agent's name without the prefix, for example `screening-agent`                                    |
| `deliverables:<tool>`, `setup:<tool>`, `exa:<tool>`, `apollo:<tool>` and the other connectors | The tool of that name on the MCP server of that name                                                                                              |
| `skafld-vc:<tool>` (the platform)                                                             | The tool of that name on the `skafld-vc` server, which the SkaFld VC Platform plugin adds with the platform address as its `PLATFORM_URL` setting |
| `${CLAUDE_SKILL_DIR}`                                                                         | The folder of the skill you are following, inside the installed plugin                                                                            |
| Run `node <script>`                                                                           | The `Shell` tool, always as `node <script>`                                                                                                       |
| Ask the person                                                                                | `AskQuestion`                                                                                                                                     |

Remote connectors sign in the first time they are used. The deliverables and setup servers need Node.js 18 or later on the PATH.
