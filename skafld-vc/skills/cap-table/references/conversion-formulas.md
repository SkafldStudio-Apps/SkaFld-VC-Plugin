# Conversion formulas, checks and a worked fixture

Formulas for the `skafld-vc:cap-table` skill. Unless marked otherwise they come from three GoingVC files in the practitioner reference library: the RL Convertible Tutorial workbook ("the tutorial"), the Cap Tables 101 guide ("the guide") and the Angels Cap Table template ("the template"), all undated.

## Notation

| Symbol          | Meaning                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `S`             | Fully diluted shares before the round (common, issued options and existing pool, prior preferred) |
| `pre`, `post`   | Pre-money and post-money valuation of the round; `post = pre + R`                                 |
| `R`             | New money in the round                                                                            |
| `p`             | Option pool target as a share of the post-round total                                             |
| `P`             | Round price per share                                                                             |
| `a`, `cap`, `d` | A SAFE's amount, valuation cap and discount                                                       |

## 1. A priced round with no convertibles (the template)

- New investor percentage = R / post.
- Every existing class after the round = its percentage before x (1 - R / post).
- Total shares = founder shares / founder percentage; price = post / total shares; class shares = total shares x class percentage; class valuation = class percentage x post.

## 2. Convertibles (the tutorial)

- **Discount price** = P x (1 - d).
- **Cap price** = cap / fully diluted shares before the round. In the tutorial's Series A the denominator is common plus option pool shares; in its Series B it is the fully diluted total after Series A. This is the tutorial's pre-money treatment; for a post-money SAFE use section 4, where the denominator includes the SAFE shares themselves.
- **Conversion price** = min(discount price, cap price). A note with no discount: min(P, cap price).
- **Converted shares** = amount / conversion price. For a note, use its maturity value as the amount.
- **Note maturity value** = principal x (1 + rate)^(days / 365).
- **Round price** P = pre / (S + pool shares + converting shares), where pool shares = p x post / P.

The round price is circular: the pool and the converting shares depend on P, and P depends on them. The tutorial's spreadsheet resolves it by iteration. Do the same: start from P = pre / S, compute pool and converted shares, recompute P, and repeat until P changes by less than $0.0001. When every convertible converts at its discount price, the algebra closes (derived here from the formula above, not printed in the source):

```
P = (pre - p x post - sum of a / (1 - d)) / S
```

Check afterwards that the discount price really was below the cap price for each instrument; if not, iterate.

## 3. The three checks (the tutorial)

Run all three after every modelled round. A failure means the model is wrong.

1. **Post-money check**: total shares after the round x P = post.
2. **Option pool check**: pool shares / total shares after the round = p.
3. **New-money non-dilution check**: new-money shares / total shares after the round = R / post (the tutorial's "Equity Given Away"). This proves the pool and the conversions diluted the existing holders, not the new money.

## 4. Post-money SAFEs (Y Combinator, not the reference library)

- Ownership at conversion = a / post-money cap. Total ownership sold on SAFEs = the sum of a / cap.
- Measured against a capitalisation that includes every SAFE and note, all issued and promised options and the unissued pool, but not the new money or any pool increase adopted in the priced round. Those dilute the SAFE holders further; say so.
- Conversion at the lower price of the cap price and the round (or discount) price.
- **Shares.** Company Capitalization CC = (issued shares + issued and promised options + unissued pool) / (1 - sum of a / cap). Each SAFE's shares = CC x a / cap, and all SAFE shares together = CC minus the shares before the SAFEs. Safe price = cap / CC.
- Worked example (the User Guide): 9,250,000 shares + 650,000 issued and promised options + 100,000 unissued pool, with SAFEs converting into 15%: CC = 10,000,000 / 0.85 = 11,764,706, so the SAFEs receive 1,764,706 shares.

Source: Y Combinator Post-Money SAFE User Guide and Primer, as summarised in the research report on diligence and terms (2026-09).

## 5. Pre-money SAFEs and MFN (not from the reference library; uncited)

- The reference library defines neither pre-money SAFE conversion nor MFN clauses; every SAFE in the tutorial is labelled post-money. Treat pre-money SAFEs like the tutorial's instruments (section 2: converting shares inside the pre-money denominator) and say this treatment is uncited.
- An MFN SAFE: Y Combinator's MFN form has no cap. Ask which later SAFE's terms the holder adopted; until then mark it unresolved rather than assume a cap.

## 6. The option pool naming trap

Three sources describe a pool with the same words and different arithmetic:

- The tutorial calls it a "Post Money Option Pool" because it is sized as a percentage of post-money, yet its shares sit in the pre-money denominator and dilute existing holders.
- The guide keeps post-money "unchanged at $15M" and takes the pool out of the founders' percentage.
- The angel diligence guide deducts the pool's dollar value from pre-money ("10% x $4M = $400,000. The adjusted pre-money valuation is therefore $3.6M").

Term sheets state the pool as a share of post-money fully diluted shares and carve it from the pre-money: pool dollars = p x post; effective pre-money = pre - pool dollars (Nivi and Ravikant, 2007). The seed median pool is 12.1% of fully diluted shares (Carta Founder Ownership, 2026).

**Rule:** state both how the pool is sized (share of post-money, share of pre-money, or dollars) and whom it dilutes, then prove it with the new-money non-dilution check.

## 7. Worked fixture: the guide's two-round example

Inputs: 1,000,000 founder shares; round 1 is $5M at a $10M pre-money; then a 20% option pool; round 2 is $10M at a $30M pre-money.

Expected figures, as the guide prints them:

| Step                 | Expected  | How it is reproduced                                                                                                                                                                                |
| -------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Round 1 total shares | 1,492,537 | 1,000,000 / 0.67 (the guide rounds the founders to 67%; at exactly two-thirds it is 1,500,000)                                                                                                      |
| After the 20% pool   | 2,142,847 | 1,000,000 / (2/3 - 0.20) = 2,142,857; the guide prints 2,142,847, a 10-share slip. Its rounded "47%" would give 2,127,660                                                                           |
| Round 2 total shares | 2,857,143 | 1,000,000 / 0.35, where 0.35 = (2/3 - 0.20) x (1 - 0.25). The guide writes "1M / 0.3525" (its rounded 47% x 0.75), which gives 2,836,879, but prints 2,857,143, the exact-fraction figure used here |
| Round 2 price        | $14.00    | $40M / 2,857,143                                                                                                                                                                                    |
| Round 2 new shares   | 714,286   | 25% x 2,857,143                                                                                                                                                                                     |

A test of the skill should match these within the guide's own rounding, which moves share counts by up to 0.5% (1,492,537 against 1,500,000), and match the price and the new shares exactly.

In this construction the investors' percentage is held at one-third and share counts are re-derived from the founders' fixed 1,000,000 shares, so the investors' share count rises and the price falls from about $10 to $7 when the pool is added. The pool comes entirely out of the founders, which is the same economic effect as a pool in the round 1 pre-money.

After the pool, at exact fractions:

| Equity Class | Shares    | Preferred Price | Valuation | Percentage |
| ------------ | --------- | --------------- | --------- | ---------- |
| Founders     | 1,000,000 | $7.00           | $7.0M     | 46.67%     |
| Investors    | 714,286   | $7.00           | $5.0M     | 33.33%     |
| Option Pool  | 428,571   | $7.00           | $3.0M     | 20.00%     |
| Total        | 2,142,857 | $7.00           | $15.0M    | 100%       |

After round 2:

| Equity Class  | Shares    | Preferred Price | Valuation | Percentage |
| ------------- | --------- | --------------- | --------- | ---------- |
| Founders      | 1,000,000 | $14.00          | $14.0M    | 35.00%     |
| Investors     | 714,286   | $14.00          | $10.0M    | 25.00%     |
| Option Pool   | 428,571   | $14.00          | $6.0M     | 15.00%     |
| New Investors | 714,286   | $14.00          | $10.0M    | 25.00%     |
| Total         | 2,857,143 | $14.00          | $40.0M    | 100%       |

Checks: 2,857,143 x $14.00 = $40.0M (post-money); new investors 714,286 / 2,857,143 = 25% = $10M / $40M (non-dilution); the pool was not topped up, so it falls from 20% to 15%. The guide's lesson: earlier holders are diluted in percentage, but "the value of their holdings has increased meaningfully".

## 8. Second example: the tutorial's Series A (derived, not printed in the source)

Inputs from the tutorial's case study: 8,000,000 founder shares; two SAFEs of $500,000, each with a $20M cap, discounts 20% and 10%; Series A $5M at a $20M pre-money with a 15% pool sized on post-money.

Applying section 2 (these results are computed here, not printed in the tutorial): both SAFEs convert at their discount price; P = (20,000,000 - 0.15 x 25,000,000 - 500,000 / 0.8 - 500,000 / 0.9) / 8,000,000 = about $1.8837; pool about 1,990,783 shares; converted SAFE shares about 626,728; new-money shares about 2,654,378; total about 13,271,889. Checks: total x P = $25.0M; pool = 15.0%; new money = 20.0% = $5M / $25M.

## Sources

- Carta (2026). Founder Ownership 2026. https://carta.com/data/founder-ownership-2026/
- GoingVC (n.d.). Cap Tables 101; RL Convertible Tutorial workbook; Angels Cap Table template; The Complete Guide to Due Diligence for Angels. Practitioner reference library; no public URL.
- Nivi and Ravikant (2007). The Option Pool Shuffle. Venture Hacks. https://venturehacks.com/option-pool-shuffle
- Y Combinator (2018-2026). Post-Money SAFE User Guide; Primer for the post-money SAFE v1.1; SAFE documents. https://www.ycombinator.com/documents ; https://www.ycombinator.com/safe
