---
description: Check a term sheet, SAFE or note against the market standard - flags off-market terms with their prevalence, what each class receives at four exit values, and whether the raise buys enough runway.
argument-hint: "[term sheet file, company or deal]"
---

Load the `skafld-vc:term-sheet` skill and review the terms for: $ARGUMENTS

If nothing is given, ask the user for the term sheet, SAFE or note. When the platform is connected, call `whoami` and read the deal's documents; otherwise use the file the user gives. Leave the standard package unflagged, flag everything else with its prevalence, and send a price question to `skafld-vc:valuation-triangulation` rather than answering it here.
