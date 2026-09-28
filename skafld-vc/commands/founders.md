---
description: Factual founder profiles with verification status, relevance, gaps and reference-call targets.
argument-hint: "[company name, deal or founder names]"
---

Load the `skafld-vc:founder-research` skill and profile the founding team.

If a company, deal or founder names are given, use them. Otherwise ask the user which company or founders to research. When the platform is connected and a deal is named, start from `get_deal_details`.

Use the Apollo connector for role and tenure history when it is available (see CONNECTORS.md). Professional history only; cite every entry with its source and date. No contact with the founders or their references; reference-call targets are for a human to call.
