# SkaFld VC Connectors

Optional connectors for SkaFld VC. The SkaFld VC plugin already declares the connectors most angels and funds use (Exa, Apollo, Harmonic, Specter, Dealroom, Clay, Notion, Granola, Fireflies, Attio, Affinity, Carta and Standard Metrics). This add-on declares the rest: paid company data, more CRMs and note-takers, data rooms, portfolio and finance metrics, public comparables and contracts. The SkaFld VC agents read them when you have signed in; without them they work as before.

Every connector is the vendor's own remote MCP server, verified on 2026-09-28. Each signs in with your own account (run `/mcp` in Claude Code and choose Authenticate, or sign in from the plugin's connectors in Claude Desktop); nothing here carries a key, and paid ones need your own plan. Install it only if you use some of these tools: the ones you never sign in to stay idle.

The full list, what each is used for and what it needs is in SkaFld VC's `CONNECTORS.md`.

The agents use connectors read-only. A connector's write tools (sending, creating, updating) are never called by the agents, and Claude asks you before any such call.
