---
description: Build a diligence plan with the Diligence agent on top of the Screening - workstreams, data room audit, findings by class, gaps as tasks and a request list ready to send.
argument-hint: "[company or deal]"
---

Use the `skafld-vc:diligence-agent` agent to build the Diligence plan for: $ARGUMENTS

If nothing is given, ask the user which company or deal. For a deal on the platform, check first with `get_deliverables` that it has a current Screening; if not, offer to run `/skafld-vc:screen` first. For an outside company, pass the Screening file from this folder if there is one. When it returns, give the paths of the plan and of the founder request list, and say which file goes to the company.
