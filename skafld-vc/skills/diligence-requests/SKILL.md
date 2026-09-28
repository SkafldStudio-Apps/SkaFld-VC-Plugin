---
name: diligence-requests
description: Write the diligence request list a company receives, and export it as a ready-to-send Excel file in the firm's brand. Use when a Diligence plan is built, or when someone asks for a request list, a document request, a DD checklist or "what should we ask the founders for", in Excel or otherwise.
---

# Diligence requests

A Diligence plan is for the deal team. The request list is the part the company sees: what to send, in what form, by when. It goes out under the firm's name, so it has to be complete, courteous and free of anything internal. The founder request list in Excel is built from the plan's `body.requests` and nothing else, so what you write there is exactly what the company reads.

## How

1. **Start from the plan's gaps.** Take every need marked `missing` or `partial`, every data room document `missing` or `outdated`, and every item listed as missing under unit economics and the cap table. Keep only what the company itself can provide. Background checks, off-list references, market research and anything the team does itself are not requests.
2. **Scale to the stage.** Ask for what a company at this stage can produce (the stage bar from the Screening or `skafld-vc:stage-calibration`). A seed company has monthly management accounts, a cap table, its contracts and a product walkthrough. It does not have audited statements or cohort retention by channel. Asking for what cannot exist delays the answers you need.
3. **Write each request in `body.requests`:**
   - `request`: one thing, named plainly, with the period it covers ("Monthly management accounts for the last 12 months", not "Financials").
   - `detail` (optional): the form that is easiest for you and for them ("In Excel if you have it; unaudited is fine"), or a scope note. Never a reason that reveals a concern.
   - `workstream`: team, market_customers, product_technology, financial, legal_corporate or deal_terms. The file groups by it.
   - `priority`: `required` if the decision cannot be made without it, `helpful` if it only speeds things up. If most rows are required, the list is too long.
   - `due` (optional, YYYY-MM-DD): one realistic date for documents they already have and a later one for things they must prepare. Leave it out when the deal team sets dates.
4. **Merge and order.** Combine duplicates. Group by workstream in the order above, with required items first within each group (the file does this). Keep a seed list short enough to finish in a sitting.
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
