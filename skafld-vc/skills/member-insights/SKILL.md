---
name: member-insights
description: Recipes for the questions members and staff of a SkaFld VC platform deployment actually ask ("what's new", "how is the pipeline", "brief me on this deal", "which deals fit my interests", "who in the network should champion this deal", "tell me about this member", "what should I do this week"), each composed from the platform tools and answered at the member's scope. Use when the user asks about the network in general terms rather than naming a specific skill.
---

# Member insights

Load `skafld-vc:platform-access` first and call `whoami`: every recipe below answers at the member's scope and names the network with `house.name` or `house.short_name`, never a name of your own.

## What's new

1. `my_notifications` (limit 20) and, for the admin tier, `my_tasks`.
2. `pipeline_summary`, then `query_deals` with `sort_by: "created_at"` and a small `limit` for the newest deals.
3. Answer in three short sections: needs your attention, new in the pipeline, upcoming. Link deals.

## How is the pipeline

1. `pipeline_summary` for counts and ask by stage.
2. `query_deals` per stage of interest (`pipeline_stage`) for the names.
3. Present a stage table, then two or three observations (concentration by sector, large asks, deals stuck at a stage). Say the scope you are seeing.

## Brief me on a deal

1. `get_deal_details` by `company_name` or `deal_id`; if the name is ambiguous, `search_records` first.
2. `search_documents` with the deal id for the three things the scorecard does not carry: the founder's own framing, the go-to-market, the ask and use of funds.
3. For the admin tier, `deal_notes` for team context, kept internal.
4. Write a one-page brief: what it is, stage and ask, scorecard highlights and risks (read them as `skafld-vc:deal-scorecard` defines them), fit with `house.thesis`, open questions. Cite documents. If `house.decision_format` is `committee_memo`, say the brief is input to the IC memo, not the decision.

## Which deals fit me

1. Ask the member for two or three interests if not stated (sector, stage, check size, geography).
2. `query_deals` with those filters; `compare_deals` on the shortlist.
3. Explain the fit in one line per deal and what to read next.

## Who in the network should champion this deal (admin tier)

Judge fit against `house.network_fit` from `whoami`. The outcome-linked evidence to bring to it is a member with **ten or more years in the deal's sector who will champion it and lead diligence**. The evidence is from angel groups: investing in a sector where the angel has industry expertise (typically about 14 years in the sample) roughly doubled exit multiples; more than 20 hours of diligence went with 5.9x against 1.1x below 20 hours; and angels who engaged with the company a couple of times a month saw 3.7x against 1.3x for a couple of times a year (Wiltbank and Boeker 2007, 539 angels, 1,137 exits, 1990 to 2007). The ten-year line is a conservative reading of that result, below the sample's typical 14 years, not a cut-off the paper tested. The data are self-reported by group-affiliated angels at a 13% response rate (Wiltbank and Boeker 2007), so treat them as direction, not a guarantee.

1. `get_deal_details` for the deal's sector, stage and ask.
2. `query_members` with `sector` and `stage` and, when the cheque matters, `check_size`; run it once with `involvement: "lead_deals"` and once with `involvement: "diligence"`. Page with `offset` while `next_offset` is set.
3. `get_member_details` on the short list: experience, expertise, sectors and past investments. Count years in the sector only from what the record states; if it does not say, write "years not recorded" and do not infer them from a title.
4. Rank by, in order: stated sector years at or above ten; willingness to lead or do diligence (the involvement interests); recent engagement (engagement score, RSVPs, activity in the last 90 days); investments in the same sector. Then check anything else `house.network_fit.description` requires and say whether each member meets it.
5. List each member with a one-line reason and the evidence behind it. Member records are internal: never share them outside the team, and never contact a member on the user's behalf.

## Tell me about a member (admin tier)

1. `search_records` or `query_members` with `query` to find the member id.
2. `get_member_details`: investor profile, dues and comped, committee membership and votes, investments, RSVPs and recent activity. The subscription appears only for full admins.
3. Summarise in a few lines and link to `/admin/members/{id}`.

## Compare two deals

`compare_deals`, then a table of stage, ask, score, recommendation, and a paragraph on the trade-off. Never rank by score alone; note where evidence is `not_assessed`. For price questions, use `skafld-vc:deal-comparables`.

## What should I do this week (admin tier)

1. `my_tasks` for owned follow-ups.
2. `pipeline_summary` and `query_deals` for the screening and diligence stages to spot deals with no recent activity (`deal_activity` on the ones in doubt).
3. Produce a short ordered list. The user creates or closes tasks; if they ask you to, use `create_deal_task`, show the preview and confirm only after they approve it.

## Rules

- State the scope once when it affects what is shown.
- Keep answers short; link to the record as `[Company](/deals/{id})` rather than reproducing it, and cite deal ids and document names.
- Internal notes, committee information and member records never leave the team.
- Anything addressed to a founder or a member is a draft for a human to send.

## Sources

1. Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation and Angel Capital Education Foundation. SSRN 1028592, https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592 ; PDF https://angelcapitalassociation.org/data/Documents/Resources/AngelGroupResarch/1d%20-%20Resources%20-%20Research/6%20RSCH_-_ACEF_-_Returns_to_Angel_Investor_in_Groups.pdf . 539 angels in 86 groups, 3,097 investments, 1,137 exits; industry expertise, diligence hours and post-investment participation relate to higher multiples.
