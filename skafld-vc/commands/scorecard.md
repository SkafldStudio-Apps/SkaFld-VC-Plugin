---
description: Score a deal on the house rubric (from the platform, a rubric.json in the folder, or the generic default), stage-aware, with not_assessed for missing evidence.
argument-hint: "[company name, deal id, deck path or application]"
---

Load the `skafld-vc:stage-calibration` skill, then the `skafld-vc:deal-scorecard` skill, and score the company.

If a company, deal, deck or application is given, use it. Otherwise ask the user what to score.

When the platform is connected, call `whoami` for the house profile, read the criteria with `get_rubric`, and fetch the deal with `get_deal_details` and its documents with `search_documents` before scoring. Without a platform, score against the rubric the skill resolves and say which one. For the deal-terms criterion, load `skafld-vc:term-sheet` and `skafld-vc:valuation-triangulation` first and score from their terms table and price verdict; with no term sheet, SAFE or stated ask it is `not_assessed`. A deal killer means pass whatever the composite. Output the scorecard in the skill's format, cite the rubric version, and end with the missing-evidence list.
