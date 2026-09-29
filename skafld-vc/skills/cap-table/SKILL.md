---
name: cap-table
description: Models a startup's cap table through a proposed round, including SAFE and note conversion, option pool dilution and fully diluted ownership. Use when evaluating round terms, sizing a cheque, or explaining dilution in a screening or memo.
---

# Cap table

The formulas, the checks and a worked fixture are in `references/conversion-formulas.md`. Read it before computing anything.

## Inputs

- Fully diluted shares outstanding today by holder and class (founders, prior preferred, issued options, unallocated pool), or the current ownership percentages.
- Every SAFE: investor, amount, valuation cap, discount, MFN, and whether it is a pre-money or post-money SAFE.
- Every convertible note: principal, interest rate, days outstanding, valuation cap, discount, maturity date.
- The proposed round: amount, pre- or post-money valuation, option pool target and how it is stated (a share of post-money, of pre-money, or a dollar amount), lead and pro rata allocations.
- The allocation under consideration: the check the network in the house profile from `skafld-vc:whoami` is considering (its `check_range_usd` gives the usual range), or, without a platform, the check the user names, or the saved firm profile's `check_range_usd` (`setup:get_profile`, or `skafld-vc/firm-profile.md` in the working folder).

## Procedure

1. **Classify every instrument** as a post-money SAFE, a pre-money SAFE, a convertible note or priced preferred, and say which. When the documents do not say, ask. A document's label and its arithmetic can differ: the convertible tutorial labels its SAFEs "post-money" yet converts them inside the pre-money share count (GoingVC convertible tutorial, n.d.).
2. **Accrue and convert the convertibles** with the formulas in the reference file: note maturity value, discount price, cap price, conversion price as the lower of the two, converted shares.
   - Post-money SAFEs: ownership = amount / post-money cap, measured against a capitalisation that includes every SAFE and note, all issued and promised options and the unissued pool, but not the new money or a pool increase adopted in the priced round, which dilute the SAFE holders further (Y Combinator, Post-Money SAFE User Guide).
   - Pre-money SAFEs and notes convert at the lower of the cap price and the discount price on the new round. The reference library does not define pre-money SAFE conversion, so say that this treatment is general practice and uncited.
   - MFN: the reference library does not cover MFN clauses. Y Combinator's MFN form has no cap (Y Combinator, SAFE documents). Ask which later terms an MFN holder adopted; until you know, mark the row unresolved.
3. **Place the option pool and state whom it dilutes.** State both how the pool is sized and whom it dilutes, and verify with the non-dilution check. The convention in term sheets: the pool is a share of post-money fully diluted shares, carved from the pre-money, so pool dollars = pool share x post-money and effective pre-money = headline pre-money - pool dollars; the new investor's ownership is unchanged and existing holders absorb the pool (Nivi and Ravikant, Venture Hacks, 2007). Say this in plain words. If the term sheet gives no pool size, assume the seed median of 12.1% of fully diluted shares (Carta Founder Ownership, 2026) and state the assumption. The reference file lists three ways sources describe the same pool; do not rely on a label.
4. **Compute the round price and ownership**: round price = pre-money / (existing fully diluted shares + pool shares + converting shares). The pool and converting shares depend on the price, so solve it (the reference file shows how). Then each holder's shares and fully diluted percentage after the round. If the round is priced below an earlier series' conversion price, apply that series' anti-dilution adjustment first (reference file section 9; broad-based weighted average unless the charter says otherwise) and say how the charter defines its base.
5. **Run the three checks** from the reference file: post-money = total shares x round price; the pool's share of the total equals the target; the new money's share of the total equals raise / post-money. If a check fails, the model is wrong; fix it before writing anything.
6. **Show the investor's position**: check size, shares, percentage, and what a pro rata right is worth at the next round under a stated step-up. If no step-up is given, use the median seed to Series A post-money step-up of about 2.5x (about 3.5x for AI companies) as a stated assumption (Walker, Carta data on 9,184 Series A rounds, 2025).
7. **Run the two alternatives** a decision-maker will ask about: a smaller round at the same valuation, and the same round at a lower valuation.
8. **Note the cap table's condition.** "For Angel Investors, who are investing at the earliest stages of a company, a messy cap table this early on may be a red flag" (GoingVC Cap Tables 101, n.d.). Count holders and instruments and say whether the table is clean.

## Output

State every assumption above the table: pre- or post-money valuation, how the pool is sized and whom it dilutes, each instrument's form, and any default you used with its source.

Then one table per stage (before the round, after conversion, after the round), with these columns (GoingVC Angels cap table template, n.d.):

```
| Equity Class | Shares | Preferred Price | Valuation | Percentage |
| Founders     |        |                 |           |            |
| <prior preferred / SAFE holders by class> |
| Option Pool  |        |                 |           |            |
| <Series X-2: converted SAFEs and notes>   |
| <Series X-1: new money>                   |
| Total        |        |                 | = post-money | 100%    |
```

Keep converted instruments (X-2) and new money (X-1) as separate rows so a reader can see how much of the round is conversion rather than cash. Class valuation = class percentage x post-money.

Below the table:

- `Checks: post-money <pass/fail> · pool <pass/fail> · new-money non-dilution <pass/fail>`
- The investor's position (step 6) and the two alternatives (step 7).
- Three plain-language lines on who is diluted by what.

## Rules

- Do not guess cap, discount, interest or pool values; ask, or mark the row unresolved.
- Always state whether a valuation is pre- or post-money, and how the pool is sized and whom it dilutes.
- Round percentages to one decimal in prose; keep full precision in the table.
- The headline post-money is the price of the last preferred share, not the value of the company or of common stock (Gornall and Strebulaev, JFE 2020).
- Cite every figure: the term sheet or document it came from, or the benchmark and its date.
- This is a draft for a human reviewer. Never contact the founder.

## Sources

- Carta (2026). Founder Ownership 2026; State of Private Markets Q1 2026. https://carta.com/data/founder-ownership-2026/ ; https://carta.com/data/state-of-private-markets-q1-2026/
- GoingVC (n.d.). Cap Tables 101 (Research Library guide); RL Convertible Tutorial workbook; Angels Cap Table template. Practitioner reference library; no public URL.
- Gornall and Strebulaev (2020). Squaring venture capital valuations with reality. Journal of Financial Economics 135(1). https://www.sciencedirect.com/science/article/abs/pii/S0304405X19301692
- Nivi and Ravikant (2007). The Option Pool Shuffle. Venture Hacks. https://venturehacks.com/option-pool-shuffle
- Walker (Carta) (2025). Seed to Series A step-up, 9,184 Series A rounds 2019 to Q3 2025. https://www.linkedin.com/posts/peterjameswalker_startups-founders-valuations-activity-7379183405038460929-rGli
- Y Combinator (2018-2026). Post-Money SAFE User Guide; SAFE documents. https://www.ycombinator.com/documents ; https://www.ycombinator.com/safe
