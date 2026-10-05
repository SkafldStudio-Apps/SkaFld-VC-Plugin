# Liquidation waterfall

The one exit waterfall in SkaFld VC: how an exit value is paid through the preference stack. `skafld-vc:returns-analysis` uses it for every scenario; `skafld-vc:valuation-triangulation` (its break-even test) and `skafld-vc:term-sheet` (what a term does to proceeds) point here rather than keep their own. `E` is the exit value, the equity value to all holders at exit.

## Procedure

Pay each scenario's exit value `E` through the stack, never ownership × `E`:

1. Assume every preferred class and every SAFE converts; each converting holder gets its share of the proceeds left after the non-converting classes are paid.
2. A non-participating class takes its preference instead when that is larger than its converted share. Pay preferences in seniority order; pari passu classes share pro rata when proceeds fall short.
3. Recompute the converted shares for the classes still converting, and repeat until no class switches.
4. Participating preferred takes its preference and then its converted share of the rest; with a cap, it converts once its converted share exceeds the cap.
5. A post-money SAFE in a liquidity event before it converts takes the greater of its purchase amount and its converted amount at the cap, alongside preferred and ahead of common (Y Combinator post-money SAFE form; confirm against the signed document).

The headline post-money is the price of the last preferred share, not the company's value; the evidence and its date are in the `references/market-data.md` of `skafld-vc:valuation-triangulation`.

**Example (derived here).** Exit $10M. Seed preferred invested $4M for 20% (1x, non-participating); converted SAFEs hold 10% with a $1.5M preference, pari passu; common and pool hold 70%. All converting: seed $2.0M, SAFEs $1.0M, both below their preferences, so both take them ($5.5M). Common receives the remaining $4.5M (against $7.0M pro rata). Re-check: converting would now give the seed about $1.9M and the SAFEs $0.75M, still below their preferences, so the result stands. A $100k seed cheque receives $100k (1.0x), not 0.5% × $10M = $50k.

## Sources

- Y Combinator (2018 onward). Post-Money SAFE User Guide and forms. https://www.ycombinator.com/documents
