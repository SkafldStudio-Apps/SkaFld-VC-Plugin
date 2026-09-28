---
description: Draft the investment committee memo with the IC memo agent, on top of the Screening and Diligence plan - or a follow-on memo for a company the network already holds.
argument-hint: "[company or deal, and 'follow-on' if it is one]"
---

Use the `skafld-vc:ic-memo-agent` agent to draft the IC memo for: $ARGUMENTS

If nothing is given, ask the user which company or deal, and whether it is a new investment or a follow-on. For a deal on the platform, check first with `get_deliverables` that it has a current Diligence plan; if not, offer to run `/skafld-vc:diligence` first. When it returns, give the recommendation in one line, where the memo is, and that it is a draft for the committee's review.
