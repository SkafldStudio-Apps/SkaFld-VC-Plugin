# Connectors

SkaFld VC works on your documents alone. It declares four MCP servers: two local ones it runs itself, and the two research services it recommends.

| Server         | What it is                                                                                                                                                                                                  | Sign-in                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `deliverables` | Writes deliverables as HTML, and any deliverable or answer as Word, PDF, a PowerPoint or PDF deck, or (a Diligence plan) Excel, into `./skafld-vc/`; scores against a rubric without a platform. No network | None                                                      |
| `brand`        | Sets up the brand those files use (`/skafld-vc:brand`): reads the website you name for colours, fonts and logo, and fetches fonts from Google Fonts. Saves to the plugin's data folder                      | None                                                      |
| `exa`          | Exa web search and page reads, for market, competitor and customer claims (Sourcing, Screening, Diligence, Portfolio)                                                                                       | None; free with rate limits. Add your key for more, below |
| `apollo`       | Apollo company and people lookups, for founders, headcount, founding year and funding (Sourcing, Screening, Diligence)                                                                                      | Your own Apollo account                                   |

- **Research: Exa and Apollo.** Recommended, and declared by the plugin so they show up as its connectors; they run on your own account, never the platform's. Without them the agents still run from your documents and mark what needed outside research "not checked". Apollo lookups spend your Apollo credits; the agents name the lookups and the credits and ask before the first one, and they use only Apollo's search and lookup tools.
- **Your firm's SkaFld VC platform.** Only if your firm runs one: install the SkaFld VC Platform add-on (`skafld-vc-platform`), which asks for your platform's address. See its README. Without a platform, nothing else is needed.

## More connectors, by what they unlock

Beyond Exa and Apollo, these are the sources the research behind SkaFld VC recommends, in priority order. Connect the ones your firm already uses from the Claude connector directory (Settings, Connectors) or as your own MCP server. None is required: where a source is missing, the agents say what they could not check. "Agents read it" means the named agents have it in their tool lists and use it read-only when you have connected it (each call still asks you unless you allowed it); for the rest, attach or paste what you have.

| Priority | Connector                                                                                     | What it unlocks                                                                                                                                   | Status                                                         |
| -------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1        | Google Drive                                                                                  | Data rooms and decks founders share there, and board packs                                                                                        | Agents read it: Diligence (data room), Portfolio (board packs) |
| 1        | Gmail                                                                                         | Founder updates as they arrive                                                                                                                    | Agents read it: Portfolio (search and read only; never sends)  |
| 2        | One funding-data source: Harmonic, Specter, Dealroom or Crunchbase (PitchBook where licensed) | Who raised, when and from whom: Sourcing, the anti-portfolio outcome checks, co-investor quality and comparables. Exa cannot answer this reliably | Recommended; not yet in the agents' tool lists                 |
| 3        | SEC EDGAR (Form D, and 10-K/XBRL for public comparables)                                      | US raises before they reach the press; market size, growth and margin benchmarks from public companies                                            | Free community servers; not yet in tool lists                  |
| 3        | USPTO, and WHOIS for domains                                                                  | Patents and trademarks in deep-tech screens and IP diligence; domain ownership                                                                    | Free community servers; not yet in tool lists                  |
| 4        | Apollo job postings                                                                           | Headcount growth as a traction proxy                                                                                                              | Screening uses it with Apollo connected                        |
| 5        | Call transcripts: Fireflies, Gong or Apollo Conversations                                     | Screening-call and reference-call notes turned into findings                                                                                      | Agents read it: Diligence (Fireflies, Gong); paste others      |
| 6        | GitHub                                                                                        | Code ownership, access and activity for developer tools, only when the company shared the repository                                              | Agents read it: Diligence                                      |
| 6        | SimilarWeb or Semrush; app store data                                                         | Web traffic and app traction signals by company type                                                                                              | Recommended; not yet in tool lists                             |
| 6        | Product analytics, read-only: Mixpanel, PostHog or Amplitude                                  | The company's own usage and retention, where the founder grants access                                                                            | Optional; founder-granted                                      |
| 6        | DocSend                                                                                       | Deck analytics and data-room views                                                                                                                | Optional                                                       |
| 7        | Cap tables: Pulley or AngelList (Carta's API is limited)                                      | Ownership and follow-on modelling; until then `cap-table` works on a spreadsheet                                                                  | Later                                                          |
| 7        | Clay                                                                                          | An enrichment waterfall above Apollo when Apollo misses a person                                                                                  | Later                                                          |
| 7        | Accounting and bank read access                                                               | Ledger and bank statements; at seed a document request, not a connector                                                                           | Later                                                          |
| 7        | Affinity                                                                                      | The CRM many funds already use, for firms that will not move their pipeline                                                                       | Later                                                          |

Not recommended at angel and seed stage: paid private-company databases for target lists (they rely on self-reported numbers), background-check and psychological-testing firms, quality-of-earnings work and auditors' papers, expert marketplaces, and deep technical audits. Reference calls and the founder's own documents cover these at this stage.

## Claude Code

### Exa (recommended, free)

Nothing to do: the plugin's `exa` server works without a key, with rate limits. For higher limits, add your own server with your key from https://dashboard.exa.ai/api-keys; a server you add wins over the plugin's:

```bash
claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp --header "x-api-key: YOUR_EXA_API_KEY"
```

Agents find Exa under any of its names: `mcp__exa__*` (a server you added), `mcp__plugin_skafld-vc_exa__*` (the plugin's), `mcp__plugin_exa_exa__*` (the official Exa plugin) or the claude.ai Exa connector.

### Apollo (recommended, your own account)

Run `/mcp`, select the plugin's Apollo server and choose Authenticate, then sign in with your Apollo account. Lookups spend your Apollo credits, not the team's, and the agents ask before they spend any. Agents find Apollo under any of its names: `mcp__apollo__*` (a server you added), `mcp__plugin_skafld-vc_apollo__*` (the plugin's), `mcp__plugin_apollo_apollo__*` (the official Apollo plugin) or the claude.ai Apollo.io connector.

If you already use Exa or Apollo through another plugin or the claude.ai directory, you can keep it: Claude Code connects each URL once, and the agents look under every name.

## Claude Desktop and Cowork

1. Settings, Plugins, Add plugin: paste the marketplace repository URL and pick SkaFld VC.
2. The `deliverables` and `brand` servers run locally in Claude Desktop, so exports and brand setup work there as in Claude Code. On claude.ai in the browser, where no local server can run, agents give you the Markdown document instead of the file.
3. Exa and Apollo appear under the plugin's connectors. Sign in to Apollo there when asked. If you have already added Exa or Apollo from the claude.ai connector directory, the agents use those too (they appear as `mcp__claude_ai_Exa__*` and `mcp__claude_ai_Apollo_io__*`, or `mcp__Exa__*` and `mcp__Apollo_io__*`).

## How the names are built

Claude Code names a plugin server's tools `mcp__plugin_<plugin>_<server>__<tool>` and a server you added `mcp__<server>__<tool>`, replacing anything outside letters, digits, `_` and `-` with `_`. It connects each URL once: a server you added wins over a plugin's, and among plugins the first to declare a URL keeps it. These were read from Claude Code 2.1.280 and from the official `exa` (3.4.1) and `apollo` (0.1.1) plugins' manifests; verified against Claude Code 2.1.280.
