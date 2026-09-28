---
name: technical-diligence
description: Run the product and technology workstream of a diligence plan, scaled to the company's stage: IP and code ownership first, a call guide for the technical founder, an operability floor, run cost and customer touch-points, and a verdict (Technically Sound, Workable, Here Be Dragons) stated as execution risk over the next 12 to 24 months. Use for the product_technology workstream, or when someone asks for "technical diligence", "a tech DD", "can this team build it" or "review the CTO".
---

# Technical diligence

The question is the one the angel diligence guide asks: is this team technically capable of building this product, for this market (GoingVC, The Complete Guide to Due Diligence for Angels, undated, technical section co-written with David Awad). The same guide says the execution risk of building and shipping matters more than the technology itself, and that the review deserves some scepticism. The procedure follows Point Nine's framework (Martinez, "A Technical Due Diligence Framework for Early Stage Startups", Point Nine, 2016), which the guide's framework reproduces, scaled by stage as K Fund does ("Kfund Tech Due Diligence: Our guidebook", 2025).

What the evidence allows: no peer-reviewed study links technical debt or any technical-diligence finding to startup survival or returns. The academic work is descriptive (Klotins et al., "Exploration of technical debt in start-ups", ICSE-SEIP 2018; Besker et al., "Embracing Technical Debt, from a Startup Company Perspective", ICSME 2018). So the verdict is a statement about execution risk over the next 12 to 24 months, never a prediction of survival.

## How

1. **Scale to the stage first**, from the stage bar (`skafld-vc:stage-calibration`) and the cheque (`house.check_range_usd` from `whoami`, or the cheque the user names):
   - **Pre-seed**: an assessment of the technical founder only; there is little to audit (K Fund, 2025).
   - **Seed**: a one-hour call with the technical founder plus document checks (Martinez, 2016; Doubrovkine, "How To Do Startup Technical Due Diligence", 2017).
   - **Series A**: about a day, possibly with an outside reviewer (Doubrovkine, 2017).
   - **Code reading** only for deep tech, or when the roadmap depends on the existing codebase.
   - For software, document review says little: expert reviews of written summaries predicted commercialisation in hardware, energy, life sciences and medical devices but not in software or consumer products (Scott, Shu and Lubynsky, Management Science, 2020). There the call and customer evidence carry the workstream.
2. **Ownership gate, before anything else.** Invention assignment from every contributor, including contractors, departed co-founders and code written before incorporation; an inventory of open-source licences; rights to any third-party data the product uses (Cooley GO, Sample VC Due Diligence Request List, 2023; Y Combinator, Series A Diligence Checklist, c. 2019; Gunderson Dettmer, Example Pre-Seed Due Diligence Checklist, undated). Where the company claims a patent or trademark, check it against the public USPTO records and mark it verified or stated. An open ownership defect is also a legal_corporate finding.
3. **Read what the documents show.** Product state (idea, MVP, beta, in market), who built what, the stack and the trade-offs behind it, the development path and the roadmap (the guide's who, what, why and how). Mark each item stated by the founder or verified, and by what. Run `skafld-vc:deck-audit`'s claim statuses on the technical claims in the deck.
   - **A repository the company shared.** Only when the company has given the deal team access to its code for this review and the person has connected GitHub, read the repository, read only: the contributors and their share of commits (who wrote what, whether the original author still leads, whether contractors or departed founders wrote the core, for the ownership gate), the licence files and dependency manifests (for the open-source inventory), whether tests and continuous integration exist, and the release cadence. Never clone it elsewhere, run its code, run scans against it, or open issues, comments or pull requests. A repository you find that the company did not share is out of bounds.
   - **Product analytics the company shared** (read access to Mixpanel, Amplitude, PostHog or similar, or an export): read the usage figures the deck claims and mark them verified or contradicted.
4. **Write the call guide** for a person on the deal team, in Point Nine's three parts (Martinez, 2016), paraphrased:
   - **Assessment.** Code ownership: in-house or contractors, is the original author still the main developer, how is quality kept, who owns contractor IP. Agility: speed or reliability, chosen on purpose and why; version control; release cadence. Monitoring: what is watched, how fast an outage is noticed and diagnosed. Compliance and security: what data is collected and kept, what security level that needs, whether the team has that knowledge, what an attacker would gain. Scalability: what happens under a sudden spike in traffic.
   - **Learning.** How the product could be misused and what guards exist; what happens after downtime; the goals in place and how far ahead; who makes technical decisions.
   - **Teaching.** Hiring plan and order, retention, how engineers are managed.
   - **Added for 2026**: what share of the code is generated with AI tools and how it is reviewed (a practitioner concern with no published evidence; ask it, never flag it); monthly run cost now and at ten times today's load; who else can change each core component.
     Before the call, write for each question the answer that would clear the bar and the one that would not.
5. **Check the operability floor.** Source code backed up outside one provider; customer data recoverable, with a tested restore; basic monitoring; capacity estimated or load-tested; security proportional to the data held; bought, not built, for payments, invoicing and monitoring (Martinez, 2016). In Point Nine's survey more than 10% of seed teams had no source-code backup or could not recover customer data (Martinez, "12 observations from a tech due diligence survey", Point Nine, 2016).
6. **Record technical debt as trajectory, not as a score.** Known debt versus debt the team has not noticed, and the plan for it. Startups take on debt on purpose until revenue is proven (Besker et al., 2018); testing debt is the most common and code debt costs the most productivity, and both worsen as the team grows (Klotins et al., 2018). Named red flags from the angel guide, paraphrased: a multi-sided product built for only one side, and features added without listening to users. In Point Nine's calculator, red flags weigh more than positives.
7. **Give the verdict on three axes**, each with its evidence: **capability** (can this team ship the next 12 to 24 months of the roadmap), **ownership** (does the company own what it ships), **trajectory** (debt, build-or-buy discipline, hiring plan). Then one of the guide's three verdicts, with the axis that drives it:
   - **Technically Sound**: all three axes supported by evidence, and no open item on the operability floor.
   - **Workable**: the guide says most companies land here; real debt or gaps, and the knowledge to fix them.
   - **Here Be Dragons**: reserved for an unresolved ownership defect, customer data that cannot be recovered, or a single person on whom the core depends with no plan.
   - **Not assessed**: when the call has not happened and the documents do not show a Here Be Dragons trigger, give no verdict; name what would decide it. A document can establish a trigger on its own (a contractor codebase with no assignment, for example).
8. **Write the required summary** the guide asks for: average monthly cost of running the technology (hosting, data centres and the like) and how customers touch the product (web, mobile, API, hardware), plus what customer data the product touches.

## Output

```
## Product and technology: <Company> (<stage>; depth: <CTO assessment | call + documents | one day>)
Verdict: <Technically Sound | Workable | Here Be Dragons | not assessed> · driver: <axis and finding>
Execution risk over the next 12-24 months; not a survival prediction.

| Axis | Finding | Evidence (source; stated or verified) | Status |
| Capability | ... |
| Ownership | ... |
| Trajectory | ... |

Ownership gate: assignments <all | missing: ...> · OSS licences <inventoried | not> · third-party data <...>
Operability floor: backup · restore tested · monitoring · capacity · security · buy-not-build — each yes / no / not checked
Run cost: $<n>/month now; $<n> at 10x [source] · Touch-points: <web, mobile, API, hardware> · Customer data: <...>
Call guide: <questions with the bar-clearing and failing answers>
Open items: <task> — closes with <document or call> — owner <suggested>
```

In a Diligence plan this is the `product_technology` workstream: the needs go in its `needs`, the summary and verdict in its `notes`, open items in `gaps`, and anything the company can send (assignment agreements, licence inventory, architecture overview) in `body.requests` through `skafld-vc:diligence-requests` (sections F and G of its request list). A Here Be Dragons ownership defect is also a finding classed deal killer or terms (a warranty or a closing condition can fix it) with its bookends.

## Rules

- Missing evidence is "not assessed" or "not checked", never a guess and never a low verdict.
- The agent never calls the founder or the engineers, never accesses the company's systems or code unless the company shared them for this purpose, and never runs scans against them. A shared repository or analytics account is read only. It writes the call guide; people make the call.
- The verdict is execution risk over 12 to 24 months, never a claim about whether the company will survive.
- AI-generated code share is a question, never a red flag on its own.
- Professional history only for people named in the review.
- This is a draft for a human reviewer.

## Sources

- Besker, Martini, Edirisooriya Lokuge, Blincoe and Bosch (2018). Embracing technical debt, from a startup company perspective. ICSME. https://kblincoe.github.io/publications/2018_ICSME_Startups.pdf
- Cooley GO (2023). Sample VC Due Diligence Request List. https://www.cooleygo.com/documents/sample-vc-due-diligence-request-list/
- Doubrovkine (2017). How to do startup technical due diligence. https://code.dblock.org/2017/10/29/how-to-do-startup-technical-due-diligence.html
- GoingVC (undated). The Complete Guide to Due Diligence for Angels, technical due diligence section. Practitioner reference library; no public URL.
- Gunderson Dettmer (undated). Example Pre-Seed Due Diligence Checklist. https://catalyze.gunder.com/print/v2/content/22419/example-pre-seed-due-diligence-checklist.pdf?lang=en
- K Fund (2025). Kfund Tech Due Diligence: our guidebook. https://www.kfund.vc/post/kfund-tech-due-diligence
- Klotins, Unterkalmsteiner, Chatzipetrou, Gorschek, Prikladnicki, Tripathi and Pompermaier (2018). Exploration of technical debt in start-ups. ICSE-SEIP. https://arxiv.org/pdf/2309.12434
- Martinez (2016). A technical due diligence framework for early stage startups; 12 observations from a tech due diligence survey. Point Nine. https://medium.com/point-nine-news/a-technical-due-diligence-framework-for-early-stage-startups-c24d5408256e ; https://medium.com/point-nine-news/12-observations-from-a-tech-due-diligence-survey-8fe32f650b50
- Scott, Shu and Lubynsky (2020). Entrepreneurial uncertainty and expert evaluation. Management Science 66(3). https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2638367
- Y Combinator (c. 2019). Series A Diligence Checklist. https://www.ycombinator.com/library/3h-series-a-diligence-checklist
