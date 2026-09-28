# Term definitions

Short working definitions for the terms `SKILL.md` extracts, in plain words, each with its source. They explain what a clause does; the prevalence of each is in `SKILL.md` step 4, and the share arithmetic is in the `references/conversion-formulas.md` of `skafld-vc:cap-table`. This is not legal advice: a clause that departs from these descriptions goes to counsel.

## What seed terms are mostly about

In 213 venture investments, cash-flow, board, voting, liquidation and control rights were allocated separately and often made contingent on later performance; founder vesting appeared in 55% of pre-revenue rounds (Kaplan and Strömberg, Review of Economic Studies, 2003). With 1x non-participating preferred now nearly universal (Cooley, 2026), the terms that move value at seed are mostly vesting, board control and milestones, not the preference stack.

A cap table shows who owns what before and after each round. What a holder receives at exit depends on more than the percentage: options and warrants exercised, preferences and other provisions all change the payout (GoingVC, Cap Tables 101, n.d.).

## Price and pool

- **Pre-money and post-money.** Pre-money excludes the new money; post-money includes it. $250k into a $500k post-money buys 50%; into a $500k pre-money it buys 250 / 750 = 33% (GoingVC, VC interview guide, finance section, n.d.).
- **Option pool in the pre-money versus the post-money.** A pool "in the pre-money" is created before the new money arrives, so only the existing holders are diluted by it; the new investor's percentage is untouched. Term sheets usually state the pool as a share of the post-money fully diluted shares and carve it from the pre-money: effective pre-money = headline pre-money − pool share × post-money (Nivi and Ravikant, "The Option Pool Shuffle", 2007). A pool added after the round (in the post-money) dilutes everyone, the new investor included. Pools are typically 10 to 20% (GoingVC, VC interview guide, n.d.); the seed median is 12.1% of fully diluted shares (Carta, Founder Ownership 2026). Worked example from an angel term-sheet guide: a $6M pre-money that must include a pool worth 20% leaves about $4.8M for the existing holders (McCarter & English, "Anatomy of a Term Sheet", 2016).

## Vesting

- **Employee vesting.** Typically four years, earned monthly (1/48 a month), with a one-year cliff: nothing vests in the first year, then 25% vests at once (GoingVC, VC interview guide, n.d.; Rosen, Alliance of Angels model term sheet, 2013).
- **Founder vesting.** In angel-round model terms, 25 to 50% of founder stock is vested at closing and the rest vests monthly or quarterly over two to four years (Angel Capital Association, Angel Guidebook term sheet, undated; Rosen, 2013). Unvested stock can be bought back if a founder leaves.
- **Single-trigger acceleration.** Unvested shares vest on a sale of the company alone.
- **Double-trigger acceleration.** Unvested shares vest only on a sale followed by the holder's termination without cause, or resignation for good reason, within a stated period (GoingVC, VC interview guide, n.d.).

## Anti-dilution

Protects preferred holders when the company later sells shares at a lower price than they paid (a down round), by lowering the price at which their preferred converts into common (GoingVC, VC interview guide, n.d.).

- **Full ratchet.** The old conversion price is reset to the new, lower price, however few shares are sold at it. Rare: 0 to 1% of rounds (Wilson Sonsini, 2026).
- **Broad-based weighted average.** The standard (NVCA model term sheet; 94 to 100% of rounds, Wilson Sonsini, 2026). The new conversion price is a blend weighted by how many shares were sold cheaply:

  ```
  CP2 = CP1 × (A + B) / (A + C)

  CP1 = the conversion price in effect before the new issue
  CP2 = the adjusted conversion price
  A   = shares outstanding immediately before the new issue, on the basis the charter defines
  B   = shares the new money would have bought at CP1 (total consideration received ÷ CP1)
  C   = shares actually issued in the new issue
  ```

  **Broad-based** counts in A the common, the preferred as converted and the options outstanding (and, in most charters, the shares reserved in the pool); **narrow-based** counts fewer shares, so the same down round moves the price further. Read how A is defined in the document; that one definition decides how strong the protection is (NVCA Model Legal Documents; the same formula in words in GoingVC, VC interview guide, n.d.).

  Example (derived here): CP1 = $1.00; A = 10,000,000; the company sells $1,000,000 at $0.50, so C = 2,000,000 and B = 1,000,000. CP2 = $1.00 × 11,000,000 / 12,000,000 = $0.9167. A full ratchet would reset it to $0.50.

## Preference and payout

- **Liquidation preference multiple.** On a sale or wind-down (a "deemed liquidation event"), preferred is paid this multiple of what it invested before common receives anything; 1x is the standard (NVCA; Cooley, 2026). It matters most when the company sells for less than the money invested (GoingVC, VC interview guide, n.d.).
- **Participation.** Non-participating preferred takes the greater of its preference and what it would receive as common. Fully participating preferred takes its preference and then shares in the rest as if converted. Capped participation does the same up to a total cap, after which the holder converts if that pays more (GoingVC, VC interview guide, n.d.; NVCA).
- **Seniority.** Senior preferred is paid before junior series; pari passu series share pro rata when proceeds fall short.
- **Dividends.** Non-cumulative dividends are paid only if the board declares them; cumulative or accruing dividends build up each year and add to the preference.
- **Redemption.** The investor may require the company to buy back its shares after a date. Rare today (Cooley, 2026).

## Control

- **Protective provisions.** A separate vote of the preferred, in effect a veto, over listed actions: changing the charter, creating a senior or equal series, redeeming shares, paying dividends, selling the company, changing the board's size, and borrowing above a threshold (GoingVC, VC interview guide, n.d.; NVCA).
- **Drag-along.** Holders who sign agree to vote for, and join, a sale approved by the board and a stated majority of the preferred (sometimes of the common too), so a small holder cannot block it (GoingVC, VC interview guide, n.d.; NVCA). Check the approval thresholds and that dragged holders get the same price per share and limited liability.
- **Pay-to-play.** Investors who do not take their pro rata share of a later round lose some or all of their preferred rights, usually by conversion to common (GoingVC, VC interview guide, n.d.). It matters in down rounds, where it is mostly found (Wilson Sonsini, 2026).
- **Tranches and special mandatory conversion.** The round's money is paid in instalments released when milestones are met. The October 2025 NVCA documents add mechanics for this, including special mandatory conversion: an investor that fails to fund a tranche has its preferred converted to common (NVCA Model Legal Documents, October 2025 update). Check that each milestone is objective and dated.
- **Information rights, pro rata and the Major Investor threshold.** Rights to financial statements and to buy a share of later rounds, often granted only to holders above a stated investment size (NVCA).

## SAFEs

A post-money SAFE is not debt: it carries no interest and **no maturity date**, so nothing forces repayment or conversion before a priced round. At the priced round it converts into **shadow preferred**, a sub-series of that round's preferred whose liquidation preference equals the SAFE's purchase amount (1x) and whose price is the SAFE price rather than the round price. In a sale before conversion it takes the greater of its purchase amount and what it would receive converted at the cap. Pro rata rights come only through a side letter, and only with a capped form; the MFN form has no cap (Y Combinator, Post-Money SAFE User Guide and forms, 2018 onward).

## Angel rights

Angels may receive a board seat and, more often, a vote (sometimes a veto) on new share issuances, debt financing and option grants or exercises, and in rare cases on hiring or removing the CEO. Later rounds bring new investors whose terms can override these (GoingVC, Intro to Angel Investing, n.d.). `skafld-vc:founder-update` lists them as consent items after the investment.

## Sources

- Angel Capital Association (undated). Angel Guidebook: term sheet. https://www.angelcapitalassociation.org/data/Documents/Resources/AngelCapitalEducation/Angel_Guidebook_-_Term_Sheet_1.pdf
- Carta (2026). Founder Ownership 2026. https://carta.com/data/founder-ownership-2026/
- Cooley (2026). Q2 2026 Venture Financing Report. https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- GoingVC (n.d.). VC interview guide, finance section; Intro to Angel Investing; Cap Tables 101. Practitioner reference library; no public URL.
- Kaplan and Strömberg (2003). Financial contracting theory meets the real world: an empirical analysis of venture capital contracts. Review of Economic Studies 70(2). https://www.nber.org/system/files/working_papers/w7660/w7660.pdf
- McCarter & English (2016). Anatomy of a Term Sheet. https://www.lexology.com/library/detail.aspx?g=002fd3b5-ecfd-46bd-94e5-2e451642bd8b
- Nivi and Ravikant (2007). The Option Pool Shuffle. Venture Hacks. https://venturehacks.com/option-pool-shuffle
- NVCA (2020-2026). Model Legal Documents: model term sheet (2020; Enhanced v3.0, 2022); certificate of incorporation, stock purchase and investors' rights agreements (October 2025 update). https://nvca.org/model-legal-documents/
- Rosen (2013). Model term sheet for Alliance of Angels. http://www.danrosen.com/Model%20Term%20Sheet%20for%20Alliance%20of%20Angels%20-%20May%202013.pdf
- Wilson Sonsini (2026). The Entrepreneurs Report, Q1 and Q2 2026; Full Year 2025. https://www.wsgr.com/a/web/ntbxCfmspTLoevehaAoUgh/entrepreneurs-report-q2-2026.pdf
- Y Combinator (2018 onward). Post-Money SAFE User Guide; SAFE forms. https://www.ycombinator.com/documents
