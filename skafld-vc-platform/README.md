# SkaFld VC Platform

**Only for firms that run a SkaFld VC platform.** This add-on connects the SkaFld VC agents to your firm's platform: its deal pipeline, applications, documents, rubric, house profile and saved deliverables, at the access your login has. It installs SkaFld VC with it.

**No platform? You do not need this.** Install SkaFld VC on its own: every agent and skill works from your documents, scores against the default rubric or your own `rubric.json`, and exports files (in your brand with the optional SkaFld VC Files add-on).

## Install

```
/plugin install skafld-vc-platform@<marketplace>
```

You are asked for **your SkaFld VC platform address**, such as `https://vc.yourfirm.com`. Your firm's platform admin can tell you what it is. Then sign in once: run `/mcp`, choose `plugin:skafld-vc-platform:skafld-vc` and Authenticate. A browser window opens on your platform; sign in with your own login there.

**In Cowork and Claude's Chat** (the Claude desktop app or claude.ai), which do not ask for the address at install: install SkaFld VC, then add your platform once as a custom connector. Settings, Connectors, Add custom connector, name it exactly **SkaFld VC**, and enter `<your platform address>/api/mcp` (for example `https://vc.yourfirm.com/api/mcp`). Sign in when asked. The agents find it under that name, and Claude Code picks it up too when you are signed in to Claude there, so this one connection works everywhere.

To change the address later: `/plugin configure skafld-vc-platform`.

## What you get

With the platform connected, the agents read your firm's house profile (who you are, your thesis, your cheque range, what "fit" means to you), score against your firm's current rubric with the platform doing the arithmetic, check a company against your pipeline, and save Screening reports, Diligence plans and IC memos on the deal, where your team downloads them. Everything is scoped to your login: you never see more than you would in the platform itself.

What each agent does differently with a platform, and what the platform terms in the agent and skill files mean, is in SkaFld VC's `PLATFORM.md`.

## Other ways in

The connector is the platform's MCP server at `<platform address>/api/mcp`. The same operations, with the same sign-in and the same access, are a REST API at `<platform address>/api/v1/tools/<operation>`, described by an OpenAPI 3.1 document at `<platform address>/api/v1/openapi.json`. Use that document to generate a client or SDK for your own scripts.

## No access?

- **Signed in but refused:** your account on that platform does not have access to these tools. Ask your platform's admin team.
- **Cannot connect at all:** the address is probably wrong; change it with `/plugin configure skafld-vc-platform`.
- **Your firm has no SkaFld VC platform:** contact SkaFld Studio at **hello@skafldstudio.com**.

## Get a SkaFld VC platform

SkaFld Studio sets up and runs SkaFld VC platforms for venture firms, angel networks and university investor networks:

- **One place for the deal flow:** applications and inbound triage, the pipeline from first look to funded, data rooms, committee voting and your member or LP network.
- **Your rules:** your investment thesis, your rubric and weights, your stage bars and your house profile, so every agent and every score speaks for your firm.
- **The same agents, inside the platform:** the Screening, Diligence and IC memo agents you use here also run on your pipeline, with outside research connected once for the whole team.
- **Your brand:** reports, memos, decks and documents in your firm's identity.
- **Your deployment and your data:** a platform for your firm, not a shared database.

Write to **hello@skafldstudio.com** to talk about a platform for your firm.
