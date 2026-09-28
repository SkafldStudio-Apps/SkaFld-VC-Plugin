---
description: Audit a pitch deck slide by slide for claims, inconsistencies, red flags and missing standard slides; produce the ranked founder question list.
argument-hint: "[deck path or deal]"
---

Load the `skafld-vc:deck-audit` skill and audit the deck.

If a deck file or deal is given, use it. Otherwise ask the user for the deck. When the platform is connected and a deal is named, read its documents with `search_documents`.

Read every slide. Quote claims with slide numbers. For the market slide, load `skafld-vc:market-sizing` and test the deck's figure against the bottom-up size and the bar the round implies. Rank the founder questions by how much a good answer would move the scorecard. Draft for a human; nothing is sent to the founder.
