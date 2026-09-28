---
description: Review a portfolio company with the Portfolio agent - its latest founder update or board pack against history, budget and the IC memo plan, cash and runway, what investors must decide - or the whole portfolio.
argument-hint: "[company, update file, or 'all']"
---

Use the `skafld-vc:portfolio-agent` agent to write a Portfolio review for: $ARGUMENTS

If nothing is given, ask the user which company (and which update or board pack), or whether they want the portfolio view. Pass the agent the company, the update file or pasted text, and the period. When it returns, give the path of the review, the warning flags that fired and any decisions investors are asked to make, with their due dates. Never contact the founder.
