---
name: founder-outreach
description: Draft founder-facing messages for a named person at the house to send (screening invitation, diligence request, sourcing first touch, referral ask, feedback-call prep, pitch logistics, follow-up, keep-in-touch for monitored longlist companies, monitoring check-in, and a decline draft only for the admin's decline flow) to a stated response standard, with the platform's rules on what may never be communicated. Drafts only; a human sends. Use whenever a founder-facing message is needed.
---

# Founder outreach

## House profile first

When the platform is connected, call `whoami` for `house.name` and `house.thesis`, and use the sender the user names. Without a platform, use the network name and thesis the user gave; if none, leave `<house>` placeholders for the sender to fill.

## Voice

Warm, direct, specific, brief. Founders are busy: every message states the ask, the why and the date in the first three lines. Sign as the named person, never as "the team". Successful seed founders hold about 40 meetings over 11 to 15 weeks, and half of 2023's seed rounds took 13 to 24 weeks (DocSend 2020, 2023), so a clear answer in week one is worth more to them than a slow maybe.

## Response standard (the sender commits to it)

1. Reply within 48 hours of a decision or a founder's message.
2. One named person owns the thread.
3. One honest, specific reason where a reason is allowed (see the decline draft).
4. A concrete next step, or a stated "not this round; re-engage when <milestone>".

Source: practitioner consensus (TechCrunch 2025 quoting Lightspeed; Signature Block 2023; CRV 2025; AlleyWatch 2016: "a rejection is better than silence"). No study measures the effect of decline etiquette on deal flow (no published study found, literature search, September 2026); the justification is that reputation is a priced deal-flow asset (offers from high-reputation VCs are about 3x more likely to be accepted, at a 10-14% valuation discount, Hsu 2004) and that access, not idea quality, drives who gets funded (Howell and Nanda 2024).

## Message types

- **Screening invitation**: what we liked in two lines, the format of the call, three time slots, who will attend. End with the re-engagement line.
- **Diligence request**: the prioritised subset, not the full checklist: the few items that decide go or no-go first, each with why it matters and a lighter existing document that would do instead ("separate the ants from the elephants"; prioritise "bearing in mind the limited capacity of the company to generate information", Stanford GSB Search Fund Primer 2021 and its Exhibit 25). Say what stage the process is in, who is involved, what help is needed from the founder, and that timing depends on receiving the information promptly (same primer, Part VI). Where it saves the founder time, ask for a short walk-through of a document (the model, the pipeline) instead of written answers. Give the data-room link and a date. The list comes from `skafld-vc:diligence-requests` (its founder request list, which never carries internal findings); attach the full list only as an appendix.
- **Sourcing first touch**: why this company fits `house.thesis` in one line, the house's criteria up front (stage, cheque range from `house.check_range_usd`), and one low-effort next step.
- **Referral ask**: to the referrer, the company in two lines, what the house is looking for, and a forwardable blurb. To a founder the house has met, whatever the outcome, one closing line may ask for a single introduction to another founder who fits the mandate; never in a message that also carries a decline.
- **Feedback-call prep**: the areas the call will cover and one question per area, so the founder can prepare.
- **Pitch logistics**: date, format, audience, time limit, what to send in advance.
- **Follow-up after silence**: one line acknowledging they are busy, the original ask restated, a single question, and the re-engagement line.
- **Keep in touch** (a longlist company at `monitor` in `skafld-vc:thesis-fit`): only where a relationship already exists (a meeting, an introduction, a prior exchange); never a cold first message dressed as a check-in. One line on what the house has followed since, the milestone that would make a conversation timely (the thing the card says would move it), and an open offer to talk then. No request for documents, no outcome and no suggestion the house has assessed them.
- **Monitoring check-in** (after investment): the metrics the plan baseline tracks, the period, and any ask the house can help with.
- **Decline draft (admin decline flow only)**: written only when an admin asks for it for their own decline message. Give a reason only if it is the deciding reason from the triage note or memo; otherwise say the fit is with the house's mandate, not the company (CRV 2025 separates "no to this version" from "no to this mandate"). Founders are rightly told to "believe the no, don't believe the why" (Y Combinator 2024), so never invent a softer reason. Leave the door open with a concrete condition. The draft is returned to the admin; the skill never sends it.

**Re-engagement line** (screening invitations and follow-ups): "Reply with a date or a data-room link; no deck needed." Under-networked founders are the ones least likely to follow up after contact with investors (Howell and Nanda 2024), so the next step must cost them almost nothing.

## Rules

- Never send, and never communicate a pass, decline or "not accepted" outcome on your own. The platform's decline flow owns that: moving a deal to passed or canceled records a decline without sending email, and admins decide separately whether to write. The decline draft above exists only for that admin.
- Never quote committee votes, scores, notes or member names.
- Never promise an investment amount or timeline.
- Keep under 150 words unless attaching a checklist.
- No figure in a message that the materials or the platform do not support.

## Output

Subject line, body, and a one-line note of anything the sender should personalise or check before sending. Draft only; a human sends it.

## Sources

- AlleyWatch (2016). "The Art of the Pass." https://alleywatch.com/2016/07/the-art-of-the-pass/
- CRV (2025). "Why Investors Pass." https://www.crv.com/content/why-investors-pass
- DocSend (2020, 2023). "A (Brief) Anatomy of a Successful Seed Raise"; annual seed report. https://www.docsend.com/blog/a-brief-anatomy-of-a-successful-seed-raise/ ; https://www.prnewswire.com/news-releases/why-now-successful-founders-display-urgency-among-market-competition-in-docsends-annual-seed-report-302008136.html
- Howell, S. and Nanda, R. (2024). "Networking Frictions in Venture Capital, and the Gender Gap." _JFQA_ 59(6). https://www.nber.org/system/files/working_papers/w26449/w26449.pdf
- Hsu, D. (2004). "What Do Entrepreneurs Pay for Venture Capital Affiliation?" _Journal of Finance_ 59(4); 148 offers to 51 startups. https://faculty.wharton.upenn.edu/wp-content/uploads/2015/07/3_1.pdf
- Signature Block (2023). "How to say 'no': A guide to passing." https://signatureblock.co/articles/how-to-say-no-a-guide-to-passing
- Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, Part VI and Exhibit 25 (prioritised diligence requests; communicating with the company).
- TechCrunch (Azevedo) (2025). "Why VCs ghost founders", quoting Lightspeed. https://techcrunch.com/2025/03/06/why-vcs-ghost-founders-or-reject-deals-and-never-speak-to-the-founder-again/
- Y Combinator (Blomfield et al.) (2024). "Investors Said No, Now What?" https://techcrunch.com/2024/04/27/your-team-sucks/
