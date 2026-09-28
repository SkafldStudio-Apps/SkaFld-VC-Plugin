---
description: Review the anti-portfolio - the deals passed on, their coded pass reasons and what happened to them at 12, 24 and 36 months, compared with the deals funded in the same period.
argument-hint: "[period, sector or company]"
---

Load the `skafld-vc:anti-portfolio` skill and review the passed deals for: $ARGUMENTS

If nothing is given, review the last four quarters. When the platform is connected, call `whoami`, then find passed deals with `query_deals` and read why with `get_deal_details`; without a platform, ask the user for the list of passes and their reasons. Never re-score a passed deal; compare passes with the deals funded in the same period before drawing any conclusion about judgement, and say which pass reasons turned out wrong and which held.
