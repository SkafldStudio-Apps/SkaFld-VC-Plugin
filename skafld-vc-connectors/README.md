# SkaFld VC Connectors

Optional connectors for SkaFld VC. The SkaFld VC plugin declares only Exa and Apollo. This add-on declares the other connectors the agents can read: company and funding data (Harmonic, Specter, Dealroom, Clay, Crunchbase, PitchBook and more), CRMs (Attio, Affinity, Pipedrive and more), notes and call transcripts (Notion, Granola, Fireflies, Otter, Fathom), data rooms, portfolio and finance metrics (Carta, Standard Metrics and more), public comparables and contracts. The SkaFld VC agents read them when you have signed in; without them they work as before.

You do not need this add-on for a connector you already have: a server you added yourself under its usual name, or one from the Claude directory, is read the same way.

Every connector is the vendor's own remote MCP server, verified on 2026-09-28. Each signs in with your own account (run `/mcp` in Claude Code and choose Authenticate, or sign in from the plugin's connectors in Claude Desktop); nothing here carries a key, and paid ones need your own plan. Install it only if you use some of these tools: Claude Code connects to every server it declares when it starts, so the ones you never sign in to show in `/mcp` as needing sign-in.

The full list, what each is used for and what it needs is in SkaFld VC's `CONNECTORS.md`.

The agents use connectors read-only. A connector's write tools (sending, creating, updating) are never called by the agents, and Claude asks you before any such call.
