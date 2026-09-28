---
name: diligence-requests
description: Write the diligence request list a company receives, and export it as a ready-to-send Excel file in the firm's brand. Use when a Diligence plan is built, or when someone asks for a request list, a document request, a DD checklist or "what should we ask the founders for", in Excel or otherwise.
---

# Diligence requests

A Diligence plan is for the deal team. The request list is the part the company sees: what to send, in what form, by when. It goes out under the firm's name, so it has to be complete, courteous and free of anything internal. The founder request list in Excel is built from the plan's `body.requests` and nothing else, so what you write there is exactly what the company reads.

## How

1. **Start from the stage's rows of the canonical list, then subtract and add.** Read `references/request-list.md` and take the rows tagged for the company's stage (the stage bar from the Screening or `skafld-vc:stage-calibration`): `pre-seed` rows at every stage, `seed` rows at seed and Series A, `A` rows at Series A only. Then:
   - **Subtract** what the data room already holds and is current (the plan's data room audit, or `search_documents` for a deal on the platform), and any row that does not apply to this company. For each row you keep, know why it is on the list and what decision it informs; if you cannot say, drop it (Stanford Search Fund Primer, 2021).
   - **Add** what the plan found missing that the list does not cover: every need marked `missing` or `partial`, every data room document `missing` or `outdated`, and every item listed as missing under unit economics, the cap table, the terms and the technical review.
   - Keep only what the company itself can provide. Background checks, off-list references, market research, the conflict check and anything else the team does itself are not requests.
2. **Scale to the stage.** Ask for what a company at this stage can produce. Pre-seed on SAFEs is usually incorporation and the cap table, founder equity and IP, and cash: about 8 to 12 documents. Seed adds monthly accounts, customer contracts and 3 to 5 customer references, over 2 to 4 weeks. Series A is the full list with counsel, over 4 to 8 weeks (practitioner consensus: 1752vc, Waveup and BVJ Consulting, 2026; Marathon VC, n.d.). A seed company does not have audited statements or cohort retention by channel; asking for what cannot exist delays the answers you need. Where an item is better covered by a representation in the financing documents than by paper, say so in the plan instead of requesting it (Wittenborn, 2015; Langer, 2018).
3. **Write each request in `body.requests`:**
   - `request`: one thing, named plainly with the list's canonical document name first, and the period it covers ("Monthly management accounts for the last 12 months", not "Financials"). Material contracts are those worth more than $25,000 (Y Combinator, Series A Diligence Checklist, c. 2019); below that, ask for the standard form only.
   - `detail` (optional): the form that is easiest for you and for them ("In Excel if you have it; unaudited is fine"), or a scope note. Never a reason that reveals a concern.
   - `workstream`: team, market_customers, product_technology, financial, legal_corporate or deal_terms. The file groups by it.
   - `priority`: `required` if the decision cannot be made without it, `helpful` if it only speeds things up. If most rows are required, the list is too long.
   - `due` (optional, YYYY-MM-DD): one realistic date for documents they already have and a later one for things they must prepare. Leave it out when the deal team sets dates.
4. **Merge and order.** Combine duplicates. Group by workstream in the order above, with required items first within each group (the file does this). Prioritise: the items that could kill the deal first, then the rest; keep a seed list short enough to finish in a sitting. If the company asks for a confidentiality agreement before it shares documents, that is settled before the list goes out (Stanford Search Fund Primer, 2021).
5. **Show the person the list** in your reply before or with the file, as a short table. They send it; you never do.
6. **Export** with `export_document`: `format: "xlsx"`, `audience: "founder"`, the plan as `file` (or `deliverable`), `contact` set to who the company should write to (the person you are working for, from `whoami` or what they told you; leave it out if unknown), and `project_dir`. The internal tracker (every need, the data room audit, next steps, deck claims) is `audience: "team"`; offer it, and never send it to the company.

## What never goes in a request

- Internal findings or doubts. "Gross margin by product for 2025 and 2026 to date" is a request. "Explain why the deck's 60% margin doesn't match the financials" is a finding for the deal team.
- Names of references the team found independently (off-list references), other investors' views, or anything from the portfolio conflict check.
- Scores, bands, the Screening verdict or the plan's classifications.
- Personal information about the founders beyond professional history. Never ask for personal financial details.
- Anything already in the data room and current. Ask for an update only when the plan marks it outdated, and say what changed ("Cap table updated for the March 2026 SAFE").

## The file

The founder list has the firm's logo and colours, a short note on how to use it, and one row per request. Columns are Area, Request, Details, Priority and Due, then three columns for the company to fill in: Status (a dropdown: Not started, In progress, Provided, Not applicable), Your response, and File or link. The header row is frozen and filtered, statuses colour themselves as the company updates them, and it prints landscape on one page width with page numbers. Nothing internal is in the workbook.

Who asked for each item, the date it was requested and the date it arrived belong to the deal team's tracker only (the plan's data room entries, exported with `audience: "team"`), following the request-list practice of recording them per item (Stanford Search Fund Primer, 2021, Exhibit 15). They never appear on the company's copy.

## Sources

- 1752vc, Waveup and BVJ Consulting (2026). Practitioner syntheses of seed data-room and diligence norms. https://www.1752.vc/learn/due-diligence-checklist
- Cooley GO (2023). Sample VC Due Diligence Request List. https://www.cooleygo.com/documents/sample-vc-due-diligence-request-list/
- Gunderson Dettmer (n.d.). Example Pre-Seed Due Diligence Checklist. https://catalyze.gunder.com/print/v2/content/22419/example-pre-seed-due-diligence-checklist.pdf?lang=en
- Hudson (2023). Due Diligence Checklist for Pre-Seed Companies. Precursor Ventures. https://chudson.substack.com/p/due-diligence-checklist-for-pre-seed
- Langer (2018). Due Diligence Humanized (cont'd). Point Nine. https://medium.com/point-nine-news/due-diligence-humanized-contd-55f95971bbdd
- Marathon VC (n.d.). Seed Stage Due Diligence Guidelines. https://marathon.vc/blog/seed-stage-due-diligence-guidelines
- Stanford GSB (2021). Search Fund Primer, Part VI and Exhibits 15 and 25. Practitioner guide; no public URL recorded.
- Wittenborn (2015). The Investor Checklist. Point Nine. https://medium.com/point-nine-news/the-investor-checklist-b9d1e6d3daab
- Y Combinator (Harris and Kwon, c. 2019). Series A Diligence Checklist. https://www.ycombinator.com/library/3h-series-a-diligence-checklist

The full list, with each section's sources, is `references/request-list.md`.
