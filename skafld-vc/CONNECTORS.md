# Connectors

SkaFld VC works on your documents alone. It declares two MCP servers of its own, both local:

| Server         | What it is                                                                                                                                                                                                  | Sign-in |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `deliverables` | Writes deliverables as HTML, and any deliverable or answer as Word, PDF, a PowerPoint or PDF deck, or (a Diligence plan) Excel, into `./skafld-vc/`; scores against a rubric without a platform. No network | None    |
| `brand`        | Sets up the brand those files use (`/skafld-vc:brand`): reads the website you name for colours, fonts and logo, and fetches fonts from Google Fonts. Saves to the plugin's data folder                      | None    |

Two kinds of connector are added separately:

- **Research: Exa and Apollo.** Not shipped with the plugin. Connect your own once for your whole Claude, as below, and the Screening and Diligence agents use them. Without them the agents still run from your documents and mark what needed outside research "not checked". Apollo enrichment spends your Apollo credits; the agents name the lookups and the credits and ask before the first enrichment.
- **Your firm's SkaFld VC platform.** Only if your firm runs one: install the SkaFld VC Platform add-on (`skafld-vc-platform`), which asks for your platform's address. See its README. Without a platform, nothing else is needed.

## Claude Code

### Exa (recommended, free)

Pick one:

```bash
# Your own server; free without a key, with rate limits
claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp

# Or with your key from https://dashboard.exa.ai/api-keys for higher limits
claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp --header "x-api-key: YOUR_EXA_API_KEY"

# Or the official Exa plugin
claude plugin install exa@claude-plugins-official
```

The name matters: agents look for Exa as `mcp__exa__*` (a server you named `exa`) or `mcp__plugin_exa_exa__*` (the official plugin). If `/mcp` shows Exa under another plugin's name (a plugin that declares the same URL keeps it, and Claude Code drops the duplicate), add your own `exa` server as above; a server you add wins over any plugin's.

### Apollo (recommended, your own account)

Pick one, then run `/mcp`, select the Apollo server and choose Authenticate:

```bash
# Your own server
claude mcp add --scope user --transport http apollo https://mcp.apollo.io/mcp

# Or the official Apollo plugin (tools appear as mcp__plugin_apollo_apollo__*)
claude plugin install apollo@claude-plugins-official
```

Lookups spend your Apollo credits, not the team's, and the agents ask before they spend any. Agents look for Apollo as `mcp__apollo__*` or `mcp__plugin_apollo_apollo__*`.

Without `--scope user`, `claude mcp add` saves a server only for the current folder.

## Cowork

1. Settings, Plugins, Add plugin: paste the marketplace repository URL and pick SkaFld VC.
2. The `deliverables` and `brand` servers run locally in Claude Desktop, so exports and brand setup work there as in Claude Code. On claude.ai in the browser, where no local server can run, agents give you the Markdown document instead of the file.
3. For Exa and Apollo, add them as connectors once. Connectors from the claude.ai directory appear to Claude as `mcp__claude_ai_<connector name>__*`; those names are not yet in the agents' tool lists, so the agents report Exa and Apollo as "not checked" in Cowork until they are.

## How the names are built

Claude Code names a plugin server's tools `mcp__plugin_<plugin>_<server>__<tool>` and a server you added `mcp__<server>__<tool>`, replacing anything outside letters, digits, `_` and `-` with `_`. It connects each URL once: a server you added wins over a plugin's, and among plugins the first to declare a URL keeps it. These were read from Claude Code 2.1.280 and from the official `exa` (3.4.1) and `apollo` (0.1.1) plugins' manifests; verified against Claude Code 2.1.280.
