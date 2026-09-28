---
description: Compare a company with similar deals - the ones the network has seen and dated external comparables in the same funding climate - for price and progress.
argument-hint: "[company or deal]"
---

Load the `skafld-vc:deal-comparables` skill and find comparables for: $ARGUMENTS

If nothing is given, ask the user which company. When the platform is connected, call `whoami`, then use `query_deals` and `compare_deals` for the network's own deals; otherwise work from what the user gives and dated external sources. Keep comparisons within the same funding climate and say where the ask sits in the range.
