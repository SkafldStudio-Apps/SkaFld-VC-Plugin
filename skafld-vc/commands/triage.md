---
description: One-page PASS / SCREEN / REFER decision on an inbound application against the house thesis, with deal killers first, source channel, coded pass reason and screening-call questions.
argument-hint: "[application, company name or deck path]"
---

Load the `skafld-vc:inbound-triage` skill and triage the application.

If an application, company name or deck is given, use it. Otherwise ask the user which application to triage. When the platform is connected, call `whoami` for the house thesis and cheque range and use `list_applications` or `get_deal_details` for the materials; without a platform, ask for the network's thesis if the user has not given one.

Keep it under 250 words. Do not score criteria and do not draft or send any message to the founder; a pass is never communicated by this command.
