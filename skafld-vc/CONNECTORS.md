# Connectors

SkaFld VC works on your documents alone. The only servers it runs are two local ones on your computer, which need Node.js 18 or later, so `/mcp` shows nothing else from the plugin:

- `deliverables`: writes deliverables as designed HTML, and any deliverable or answer as Word, PDF, a PowerPoint or PDF deck, or (a Diligence plan) Excel, into `./skafld-vc/`, unbranded unless a brand is configured (your platform's, a project `brand/` folder or the one saved with setup); scores against a rubric as a tool. Its only network call downloads your platform's brand from the address `whoami` gives (with SkaFld VC Platform), cached on your machine.
- `setup`: `/skafld-vc:setup`'s brand (reads the website you name for colours, fonts and logo, and fetches fonts from Google Fonts) and a firm profile saved in the plugin's data folder, on your machine.

Without Node.js the two servers do not start, and the agents write reports as Markdown, make files with Claude's own document tools, score with the core's Python scorer, and keep your firm profile in `skafld-vc/firm-profile.md`.

Everything else is a recommended connector: you add it yourself (in Claude Code with `claude mcp add`, from the Claude connector directory, or with another plugin such as the official Exa or Apollo plugin), and the agents use it when it is in your session, under its usual name. Start with these two:

| Server   | What it is                                                                                                             | Address                     | Sign-in                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| `exa`    | Exa web search and page reads, for market, competitor and customer claims (Sourcing, Screening, Diligence, Portfolio)  | `https://mcp.exa.ai/mcp`    | None; free with rate limits. Add your key for more, below  |
| `apollo` | Apollo company and people lookups, for founders, headcount, founding year and funding (Sourcing, Screening, Diligence) | `https://mcp.apollo.io/mcp` | Your own Apollo account                                    |

- **Research: Exa and Apollo.** Recommended; add them as below. They run on your own account, never the platform's. Without them the agents still run from your documents and mark what needed outside research "not checked". Apollo lookups spend your Apollo credits; the agents name the lookups and the credits and ask before the first one, and they use only Apollo's search and lookup tools.
- **Fallback page reads: Firecrawl.** Optional. Exa stays the default for every search and page read; the agents use Firecrawl's scrape only for a page Exa could not read (a JavaScript-rendered site, a blocked page, a PDF, or a nearly empty result), never to search, map or crawl. Add it as below if you want it; it runs on your own Firecrawl account.
- **Your firm's SkaFld VC platform.** Only if your firm runs one: install the SkaFld VC Platform add-on (`skafld-vc-platform`), which asks for your platform's address. See its README. Without a platform, nothing else is needed.

## More connectors, by what they unlock

Beyond Exa and Apollo, these are the connectors a venture firm or angel is likely to use, each verified on 2026-09-28 as the vendor's own MCP server. SkaFld VC does not declare any of them, so it never connects to a connector you have not added and never asks you to sign in to one. The agents use a connector once you add it yourself, in either of two ways:

- **In Claude Code:** `claude mcp add --transport http <server> <url>`, with the server name and address from the tables below (for example `claude mcp add --transport http clay https://api.clay.com/v3/mcp`). The agents read it under that name.
- **From the Claude connector directory** (Settings, Connectors), where the connector is listed. Google's and others that need their own app registration or an admin come only this way. The agents find them there under their directory names (`Clay` for `clay`, for example).

Each signs in with your own account (in Claude Code run `/mcp`, pick the server and choose Authenticate); nothing in the plugins carries a key, and paid ones need your own plan. The agents use connectors read-only: they never send, create, update, sign or delete anything in them, and Claude asks you before any such call. Add each under the server name in the tables, so the agents find it.

<!-- connectors:start (generated; do not edit) -->

### Web research fallback (read by Diligence, Portfolio, Screening, Sourcing)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Firecrawl | `https://mcp.firecrawl.dev/v2/mcp`, or from the Claude connector directory | Fallback page reads: a page Exa could not read (JavaScript-rendered, blocked, a PDF or nearly empty), never search | Firecrawl account; free credits to start |

### Company, funding and people data (read by Diligence, Screening, Sourcing)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Harmonic | `https://mcp.api.harmonic.ai`, or from the Claude connector directory | Company and founder search, funding, headcount and saved searches for sourcing | Harmonic account; free tier without deal data |
| Specter | `https://mcp.tryspecter.com/mcp` | Company, people and investor signals for sourcing and screening | Specter account; 100 free calls a day |
| Dealroom | `https://mcp.dealroom.co/mcp` | Company, funding round and investor data, read-only | Dealroom subscription |
| Clay | `https://api.clay.com/v3/mcp`, or from the Claude connector directory | Enrichment waterfall when Apollo misses a person or company | Clay account; free credits to start |
| Crunchbase | `https://mcp.crunchbase.com`, or from the Claude connector directory | Funding rounds, investors and acquisitions; anti-portfolio outcome checks | Crunchbase plan with an MCP seat |
| PitchBook | `https://premium.mcp.pitchbook.com/mcp`, or from the Claude connector directory | Deals, valuations and comparables, read-only | PitchBook enterprise licence |
| CB Insights | `https://mcp.cbinsights.com/`, or from the Claude connector directory | Company, market and funding intelligence, read-only | CB Insights enterprise package |
| Tracxn | `https://platform.tracxn.com/mcp` | Company and sector coverage for sourcing and market maps, read-only | Tracxn subscription with MCP enabled |
| Coresignal | `https://mcp.coresignal.com/mcp/v2` | Headcount and hiring history from public professional data | Coresignal credits |
| Ramp Data | `https://mcp.ramp.com/ramp-data/anthropic/mcp`, or from the Claude connector directory | Vendor adoption and spend benchmarks for market sizing | Free, no sign-in |

### CRM and pipeline (read by IC memo, Orchestrator, Portfolio, Sourcing)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Attio | `https://mcp.attio.com/mcp`, or from the Claude connector directory | The firm's pipeline, passes and relationship history | Attio workspace, any plan |
| Affinity | `https://mcp.affinity.co/mcp`, or from the Claude connector directory | The firm's pipeline, relationship strength and warm paths | Affinity Scale plan or higher |
| Pipedrive | `https://mcp.pipedrive.ai/mcp`, or from the Claude connector directory | Pipeline and deal notes for firms that track deals there | Pipedrive account (beta) |
| 4Degrees | `https://mcp.4degrees.ai/mcp` | VC relationship CRM: pipeline and warm introductions | 4Degrees account |
| Airtable | `https://mcp.airtable.com/mcp`, or from the Claude connector directory | Deal trackers and lists kept in Airtable bases | Airtable account, all plans |

### Notes and call transcripts (read by Diligence, Orchestrator, Portfolio, Screening, Sourcing)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Notion | `https://mcp.notion.com/mcp`, or from the Claude connector directory | Deal notes, theses and IC notes kept in Notion | Notion workspace |
| Granola | `https://mcp.granola.ai/mcp`, or from the Claude connector directory | Founder, reference and customer call notes | Granola; transcripts on paid plans |
| Fireflies | `https://api.fireflies.ai/mcp`, or from the Claude connector directory | Screening, reference and customer call transcripts | Fireflies account |
| Otter | `https://mcp.otter.ai/mcp`, or from the Claude connector directory | Call transcripts, read-only | Otter account |
| Fathom | `https://api.fathom.ai/mcp`, or from the Claude connector directory | Call recordings and summaries | Fathom account |
| Gong | Claude connector directory | Call transcripts where the firm records on Gong | Gong seat; an admin creates the integration |

### Documents and data rooms (read by Diligence, Orchestrator, Portfolio, Screening)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Google Drive | Claude connector directory | Data rooms and board packs shared on Drive | Add from the Claude connector directory |
| Dropbox | `https://mcp.dropbox.com/mcp`, or from the Claude connector directory | Data rooms and files shared on Dropbox | Dropbox account (beta) |
| DocSend | `https://docsend.com/mcp` | Decks and data rooms shared through DocSend | DocSend Advanced Data Rooms plan (beta) |

### Mail (read by Portfolio)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Gmail | Claude connector directory | Founder updates as they arrive, search and read only | Add from the Claude connector directory |

### Code (read by Diligence)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| GitHub | Claude connector directory | A repository the company shared, for the technical review | Add from the Claude connector directory or the GitHub plugin |

### Portfolio, fund and company metrics (read by IC memo, Portfolio)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| Carta | `https://mcp.app.carta.com/mcp`, or from the Claude connector directory | Holdings, cap tables and investor data for follow-on and portfolio views | Carta account |
| Standard Metrics | `https://mcp.standardmetrics.io/mcp` | Portfolio company financials and KPIs collected from founders | Standard Metrics account |
| AngelList | `https://mcp.angellist.com/mcp`, or from the Claude connector directory | Fund and SPV holdings, read-only (for GPs) | AngelList GP account |
| Stripe | `https://mcp.stripe.com/`, or from the Claude connector directory | Revenue metrics where a founder grants access | Stripe account |
| ChartMogul | `https://mcp.chartmogul.com/`, or from the Claude connector directory | Subscription metrics (MRR, churn, cohorts) | ChartMogul account |
| Mixpanel | `https://mcp.mixpanel.com/mcp`, or from the Claude connector directory | Product usage and retention where a founder grants access | Mixpanel project access |
| Amplitude | `https://mcp.amplitude.com/mcp`, or from the Claude connector directory | Product usage and retention where a founder grants access | Amplitude project access |
| PostHog | `https://mcp.posthog.com/mcp`, or from the Claude connector directory | Product analytics where a founder grants access | PostHog project access |
| Mercury | `https://mcp.mercury.com/mcp`, or from the Claude connector directory | Cash and burn from bank data | Mercury account |
| Brex | `https://api.brex.com/mcp`, or from the Claude connector directory | Spend and burn | Brex customer |
| Ramp | `https://ramp-mcp-remote.ramp.com/mcp`, or from the Claude connector directory | Spend and vendors, read-only | Ramp customer |

### Public comparables and valuation (read by IC memo, Screening)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| S&P Global (Kensho) | `https://kfinance.kensho.com/integrations/mcp`, or from the Claude connector directory | Public company financials, capitalization and competitors | S&P Capital IQ entitlement |
| Morningstar | `https://mcp.morningstar.com/mcp`, or from the Claude connector directory | Public market data and valuations | Morningstar entitlement |
| Daloopa | `https://mcp.daloopa.com/server/mcp`, or from the Claude connector directory | Public company fundamentals from filings | Daloopa subscription |
| Alpha Vantage | `https://mcp.alphavantage.co/mcp`, or from the Claude connector directory | Public market prices and fundamentals | Alpha Vantage account; free tier |
| Financial Modeling Prep | `https://financialmodelingprep.com/mcp`, or from the Claude connector directory | Public company financials and multiples | FMP account; free tier |

### Contracts and closing (read by Diligence)

| Connector | How to add it | What the agents use it for | What you need |
| --- | --- | --- | --- |
| PandaDoc | `https://mcp.pandadoc.com/v1/mcp`, or from the Claude connector directory | Closing documents and their status | PandaDoc account |
| Ironclad | `https://mcp.na1.ironcladapp.com/mcp`, or from the Claude connector directory | The firm's contract repository (US region; EU customers use mcp.eu1.ironcladapp.com) | Ironclad customer |

<!-- connectors:end -->

### Useful, but connected outside the plugins

These have official servers that need your own app registration or an admin's approval, so no plugin can declare them. Connect them from the Claude connector directory where they are listed, and ask your admin where approval is needed: Google Calendar, Slack, HubSpot, Salesforce, Box, Zoom, Microsoft 365 (Outlook, SharePoint, OneDrive, Teams), Xero, Docusign and Google Analytics. The agents do not read these yet; paste or attach what you need from them.

### No official server yet

SEC EDGAR, USPTO and patents, Companies House, OpenCorporates, WHOIS and Product Hunt have only community servers, which we do not recommend without review; LinkedIn has no legitimate one (use a licensed data provider above instead). Visible.vc, Pulley, Ledgy, Cake Equity and Juniper Square had announced servers without a public endpoint on 2026-09-28.

Not recommended at angel and seed stage: paid private-company databases for target lists (they rely on self-reported numbers), background-check and psychological-testing firms, quality-of-earnings work and auditors' papers, expert marketplaces, and deep technical audits. Reference calls and the founder's own documents cover these at this stage.

## Claude Code

### Exa (recommended, free)

Add it once, for every project. It works without a key, with rate limits:

```bash
claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp
```

For higher limits, add it with your key from https://dashboard.exa.ai/api-keys instead:

```bash
claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp --header "x-api-key: YOUR_EXA_API_KEY"
```

Agents find Exa under any of its names: `mcp__exa__*` (a server you added), `mcp__plugin_exa_exa__*` (the official Exa plugin) or the claude.ai Exa connector.

### Apollo (recommended, your own account)

```bash
claude mcp add --scope user --transport http apollo https://mcp.apollo.io/mcp
```

Then run `/mcp`, select `apollo`, choose Authenticate and sign in with your Apollo account (or install the official Apollo plugin, `plugin:apollo:apollo`). Lookups spend your Apollo credits, not the team's, and the agents ask before they spend any. Agents find Apollo under any of its names: `mcp__apollo__*` (a server you added), `mcp__plugin_apollo_apollo__*` (the official Apollo plugin) or the claude.ai Apollo.io connector.

### Firecrawl (optional, the fallback for pages Exa cannot read)

Nothing connects until you add it. Add it with your key from https://www.firecrawl.dev/app/api-keys, in a header and never in the URL:

```bash
claude mcp add --scope user --transport http firecrawl https://mcp.firecrawl.dev/v2/mcp --header "Authorization: Bearer YOUR_FIRECRAWL_API_KEY"
```

To sign in with your Firecrawl account instead of a key, add `https://mcp.firecrawl.dev/v2/mcp-oauth` and authenticate it from `/mcp`. The agents list only its scrape tool, under any of its names: `mcp__firecrawl__firecrawl_scrape` (a server you added), `mcp__plugin_firecrawl_firecrawl__firecrawl_scrape` (the official Firecrawl plugin) or the claude.ai Firecrawl connector. They call it only for a page Exa already tried and could not read, with the same URL, and say in that source's title that Firecrawl read it. Scrapes spend your Firecrawl credits.

If you already use Exa or Apollo through another plugin or the claude.ai directory, you can keep it: the agents look under every name.

## Claude Desktop and Cowork

1. Settings, Plugins, Add plugin: paste the marketplace repository URL and pick SkaFld VC.
2. If the computer has Node.js 18 or later, SkaFld VC's two local servers run in Claude Desktop as in Claude Code, for designed files (unbranded until you set up a brand) and brand setup. Without Node.js, and on claude.ai in the browser where no local server can run, reports come as Markdown and files from Claude's own document tools.
3. Add Exa, Apollo and any other connector from the claude.ai connector directory (Settings, Connectors); the agents use them there (they appear as `mcp__claude_ai_Exa__*` and `mcp__claude_ai_Apollo_io__*`, or `mcp__Exa__*` and `mcp__Apollo_io__*`).

## How the names are built

Claude Code names a plugin server's tools `mcp__plugin_<plugin>_<server>__<tool>` and a server you added `mcp__<server>__<tool>`, replacing anything outside letters, digits, `_` and `-` with `_`. SkaFld VC declares no connector, so a connector you added yourself is the one the agents use: `mcp__clay__*` from `claude mcp add`, or `mcp__claude_ai_Clay__*` from the directory. Claude Code connects each URL once: a server you added wins over a plugin's, and among plugins the first to declare a URL keeps it. These were read from Claude Code 2.1.280 and from the official `exa` (3.4.1) and `apollo` (0.1.1) plugins' manifests; verified against Claude Code 2.1.280.
