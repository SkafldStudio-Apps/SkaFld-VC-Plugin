---
description: One-page brief on a deal from your firm's SkaFld VC platform: scorecard, documents, fit with the network's thesis, open questions.
argument-hint: "[company name or deal id]"
---

Load the `skafld-vc:platform-access` skill, call `whoami`, then load the `skafld-vc:member-insights` skill and follow its recipe "Brief me on a deal". Read the scorecard as the `skafld-vc:deal-scorecard` skill defines it.

If a company name or deal id is given, use it. Otherwise ask the user which deal to brief.

Resolve the company with `search_records` if the name is ambiguous. Name the network with `house.name` from `whoami`, and judge fit against `house.thesis`. Cite the documents you read and link the deal as [Company](/deals/{id}). Internal notes, if you can see them, stay internal.
