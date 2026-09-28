---
description: Frame the return case as proceeds at exit across scenarios through the preference stack, with base rates and a stage-specific target, not a point IRR.
argument-hint: "[company name or deal, with round terms if known]"
---

Load the `skafld-vc:returns-analysis` skill and frame the return case. Load the `skafld-vc:cap-table` skill too if entry ownership or terms are not given.

If a company, deal or round terms are given, use them. Otherwise ask the user for the company and the round terms. When the platform is connected, call `whoami` for the house profile (the cheque range; ask the user for the fund or allocation size for the fund-returner line) and `get_deal_details` for the round.

State the dilution path and the stage target multiple above the table, print the base-rate line, pay each scenario through the preference stack, and finish with the judgment-weighted multiple, its two sensitivities and the three "what has to be true" bullets. Never lead with an IRR.
