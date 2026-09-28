---
name: founder-update
description: Reads a portfolio company's investor update or board pack into a fixed structure and checks it for arithmetic, changed or missing metrics, and candour. Use when a founder update, investor letter or board deck arrives, or someone asks what an update said, whether anything needs a vote, or whether a company reports on time.
---

# Founder update

Parse and check; do not summarise into flattering prose. An update is the founder's own account, so every figure in it is **stated**, anything you compute from it is **derived** (formula and inputs beside it), and a metric the update does not give is "not stated". The output is a draft for the member or deal lead who follows the company.

This skill fills these parts of a `portfolio_review`: `period`, `highlights`, `lowlights`, `keyTakeaways`, `concerns`, `consentItems`, `operatingPlan`, `opportunities`, `asksOfNetwork`, `cadence` and `transactionRecap`. The stated figures go to `skafld-vc:kpi-variance`, which fills `kpis` and `cash`; `skafld-vc:portfolio-construction` fills `position` and `portfolioView`.

## How

1. **Collect the update and its context.** The update itself (email, PDF, deck or board pack), the date it arrived and the period it covers. Find it in this order:

   - A file or pasted text the person gave you.
   - Where the person has connected their mail (Gmail), search it by the sender (the founders' names or the company's domain) and the period (the month or quarter, and words such as "update" or "investor letter"), then read the thread and its attachments. Where they have connected Google Drive, search it for the update or board pack for the period.
   - With a platform connected, `skafld-vc:search_documents` for the company.
   - Otherwise, or when nothing matches, ask the person for the update. Never reconstruct one from memory or the web.

   Mail and Drive are read only: never send, reply, forward, draft, label, move, share or delete anything, and read only the threads and files about this company and period. Record where the update was found in `period.sourceDocuments`.

   For context: with a platform connected (`skafld-vc:platform-access`), call `skafld-vc:whoami` for the house profile and read the company's IC memo and last portfolio review with `skafld-vc:get_deliverables`; otherwise use the files the user gave. The IC memo's monitoring hand-off is the plan the update is measured against. `house.board_seats` tells you whether to expect a board pack as well as investor letters; `house.name` names the network. List what is missing (no prior update, no IC memo, no close documents).

2. **Map the update to one fixed structure.** The widely used investor-update templates converge on the same order: a short summary, key metrics with the change from last period, highlights, lowlights or worries, team, fundraising, asks and thanks (Harris of YC, as circulated by Visible, 2019; Founder Collective, 2017; Bromberg, 2024; Warp, 2024). A board pack adds activities measured against what diligence expected, concerns with the options for each, results against history, budget and projections, a three-month operating plan with activities and benchmarks, and opportunities (Stanford Search Fund Primer, 2021). Fill each field from what the update says:

   - `period`: a label ("March 2026", "Q1 2026"), `start` and `end` when stated, and `sourceDocuments`.
   - `highlights` and `lowlights`: one line each, the founder's facts in plain words, not your adjectives.
   - KPIs: every figure exactly as stated, with its unit, period and page or slide, handed to `skafld-vc:kpi-variance`. Use the metric names of its KPI set; where the founder's name or definition differs, keep theirs in the row's note.
   - `concerns`: each problem the update raises, and each one the figures reveal that it does not, with the options the founder names in `options` and a `status`: `open`, `mitigating` (a named action is under way) or `resolved`.
   - `operatingPlan`: the activities for the next period, up to three months, and the milestone each is measured by, as stated. If the update has no plan, write "not stated".
   - `opportunities`: upside the founder names (a partnership, a segment, a grant), without your estimate of its size.
   - `transactionRecap`: two or three lines on the investment (date, instrument, round size and price, the network's cheque and ownership), taken from the IC memo or the close documents, not the update. Investors are served by a short standing recap of the deal in each update (Stanford Search Fund Primer, 2021).

3. **Check the arithmetic the update allows.** Recompute runway (cash / net burn, burn as a positive number) and, for recurring revenue, the burn multiple (net burn / net new ARR over the same period; Sacks, 2020), and growth against the prior period's stated value. Where the founder states a figure you can recompute, show both. A mismatch is a finding in `concerns`, never a silent correction. Any annualised figure is labelled run-rate with the months it came from; a run-rate is never trailing revenue (Stanford Search Fund Primer, 2021; Jordan and others at a16z, 2015).

4. **Check that the metrics are the same metrics.** Compare the metric list, definitions and periods with the previous update. Keeping the same core metrics every period is the common advice to founders (Founder Collective, 2017; Bromberg, 2024). A metric that disappears, changes definition (ARR that now includes services, churn that moves from revenue to logos) or changes period is a finding: name it, say what replaced it, and add a question asking for the old series.

5. **Apply the candour test.** An update with no lowlight, no worry and no missed target is itself a finding, because every template above has a slot for what is going badly and the primer's standard is that bad news is reported early and plainly (Stanford Search Fund Primer, 2021). Flag, too, good news the figures do not show (a "record month" with revenue flat on the prior period).

6. **Flag consent items.** List in `consentItems` everything members or the board are asked to approve, or soon will be: a new share issuance or round, debt financing, an option pool increase, option grants or exercises, and occasionally hiring or removing the CEO. These are the votes an angel is typically asked to cast (GoingVC Research Library, Intro to Angel Investing, n.d.). Give `due` when a date is stated and a `note` on what the item changes for the network's position. For a new round, record who leads it: an insider-only or bridge round with no outside lead is a base-rate warning, because inside rounds are about 20% more likely to fail and return 15-18% less cash on cash (Ewens, Rhodes-Kropf and Strebulaev, 2016, 22,382 follow-on rounds) and have historically backstopped companies that could not raise outside money (Broughman and Fried, 2012). Record it; the follow-on decision belongs to the IC memo's follow-on variant in `skafld-vc:memo-format`. When `house.board_seats` is true, also list the items for the next board meeting.

7. **Extract the asks.** Copy each ask into `asksOfNetwork` in the founder's words, one per entry, with who it is aimed at when stated. The templates ask founders for specific, forwardable asks, so keep them specific (Founder Collective, 2017; Bromberg, 2024). Matching an ask to members is a separate step (`skafld-vc:member-insights`); you never reply to the founder or make an introduction.

8. **Record the cadence.** `cadence.expected`: the reporting interval agreed at investment if the close documents or the IC memo state one. Otherwise monthly before Series A and quarterly after: monthly is what most founders send (Visible, 2026, 3.5 million updates: 65% monthly, 22% quarterly, 13% weekly) and what the update guides recommend (Bromberg, 2024; Warp, 2024), and angel-group guidance leaves the interval to be agreed with the company (Hudson, Angel Capital Education Foundation, c. 2008). The first report is expected within about 30 days of closing (Stanford Search Fund Primer, 2021). Set `lastUpdate` to this update's date and `onTime` to false when more than one expected period passed since the previous update; put the gap in `note`. A missed period is a behavioural finding, not a prediction: the only claims linking update frequency to outcomes are vendor claims with no stated method, so never cite one.

9. **Write `keyTakeaways`**: three to five Markdown lines for a member who reads nothing else: what changed, what is at risk, what needs a decision and by when, and what the network could do.

## Output

```
## Founder update: <Company>, <period label>
Received <date> · expected <monthly / quarterly / agreed interval> · on time: <yes / no, gap>
Sources: <documents, pages>

Key takeaways: <3-5 lines>
Highlights: ... · Lowlights: ... (or "none reported" as a finding)
Stated KPIs: <metric, value, unit, period, page> → skafld-vc:kpi-variance
Arithmetic checks: <stated vs derived, match or gap>
Definition changes: <metric, old definition, new definition>
Concerns: <concern, options, open / mitigating / resolved>
Consent items: <item, due, what it changes; round lead: outside / insider-only / not stated>
Operating plan: <activity, milestone> · Opportunities: ...
Asks of the network: <verbatim>
Transaction recap: <date, instrument, round, cheque, ownership>
Questions for the team to put to the company: 1. ... 2. ...
```

## Rules

- Never contact the company or its founders. Questions go to the human team as a list; they decide whether to ask.
- Connected mail and Drive are read only, and only for this company's updates for the period.
- Never infer a KPI the update does not state, and never carry a prior period's value forward as current. "Not stated" stays "not stated".
- Quote the founder only for asks and metric definitions; paraphrase the rest.
- A mark is never taken from an update. Valuation marks come from priced rounds (`skafld-vc:portfolio-construction`).
- Concerns, the candour test and consent flags are internal to the network. Nothing from them goes into a message to the founder.
- Cite every figure to its document and page or slide.

## Sources

- Harris, A. (Y Combinator), investor update guidance as circulated by Visible, "Tips from YC: using asks, metrics and a recap to power your investor updates", 2019. https://visible.vc/blog/tips-from-yc-using-asks-metrics-and-a-recap-to-power-your-investor-updates/
- Founder Collective (Rosenbloom), "A Fill-In-The-Blank Investor Update Template for Busy Founders", 2017, and "The 1-2-3 Investor Update", n.d. https://foundercollective.com/blog/a-fill-in-the-blank-investor-update-template-for-busy-founders/
- Bromberg, A., "Investor updates", 2024. https://andybromberg.com/investor-updates
- Warp, "How to write investor updates", 2024. https://www.warp.co/blog/how-to-write-investor-updates
- Visible, "2026 Investor Update Benchmarks", 2026 (cadence shares only; its outcome claims have no stated method). https://visible.vc/reports/investor-update-benchmarks/
- Hudson (Angel Capital Education Foundation), "Best Practice Guidance for Angel Groups: Post Investment Monitoring", c. 2008. https://angelcapitalassociation.org/data/Documents/Resources/AngelCapitalEducation/ACEF_BEST_PRACTICES_Post_Investment.pdf
- Stanford GSB, "Search Fund Primer", 2021 edition, Part VII (investor communication, first board meeting). Practitioner guide read from a reference folder; no public URL recorded.
- GoingVC Research Library, "Intro to Angel Investing", undated. Practitioner guide read from a reference folder; no public URL recorded.
- Sacks (Craft Ventures), "The Burn Multiple", 2020. https://medium.com/craft-ventures/the-burn-multiple-51a7e43cb200
- Jordan, Hariharan, Chen and Kasireddy (a16z), "16 Startup Metrics", 2015. https://a16z.com/16-startup-metrics/
- Ewens, M., Rhodes-Kropf, M. and Strebulaev, I., "Inside Rounds and Venture Capital Returns", working paper, 2016. https://cear.gsu.edu/files/gravity_forms/25-64ec8d3580cca1f8f19bb5130dc7be11/2016/04/InsideRounds20160328.pdf
- Broughman, B. and Fried, J., "Do VCs Use Inside Rounds to Dilute Founders?", Journal of Corporate Finance 18(5), 2012.
