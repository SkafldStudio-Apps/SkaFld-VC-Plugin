---
description: Judge whether a round's price is reasonable - comparables first, then a ceiling from exit expectations and a break-even test, as a four-line verdict and a counter, never a blended value.
argument-hint: "[company or deal, with the ask]"
---

Load the `skafld-vc:valuation-triangulation` skill and judge the price for: $ARGUMENTS

If nothing is given, ask the user for the company and the ask (raise and valuation or cap). When the platform is connected, call `whoami` for the house cheque range and read the deal with `get_deal_details`; otherwise use what the user gives. Say that the headline post-money is the price of the last preferred share, not the company's value, and give the four lines side by side with a counter.
