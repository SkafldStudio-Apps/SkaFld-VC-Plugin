---
name: request-list-only
description: Asking only for the document request list loads the diligence-requests skill without starting the Diligence agent.
tags: [triggering, skills, collisions]
runs: 3
max_turns: 8
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Write just the document request list we should send the founders for seed diligence. No plan, only the list they will receive.

Screening summary (fictional, for evaluation only): Lumen Ledger, seed, B2B finance software. Verdict: consider. Not checked: customer references, the cap table, IP assignment from a former contractor, the cohort data behind the 118% net revenue retention. Raising $3M on a post-money SAFE with an $18M cap.
