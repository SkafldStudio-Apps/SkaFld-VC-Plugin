---
name: deal-scorecard
description: Score an early-stage deal against a rubric read at run time (the connected platform's get_rubric, else a rubric.json in the working folder, else the plugin's default rubric), with knock-outs checked first, each criterion scored independently on percentile anchors, not_assessed for missing evidence, and the composite computed by a tool or shown as a worksheet. Use when asked to score, grade, rate or re-assess a deal, or when a screening or memo needs a scorecard.
---

# Deal scorecard

This skill is procedure only. The criteria, weights, anchors, knock-outs, bands, gates and stage table all come from the rubric; this file carries none of them. If anything here seems to disagree with the rubric you loaded, the rubric wins.

## Procedure

### 1. Get the rubric and cite it

Use the first of these that works:

1. **Connected platform**: call `get_rubric`. It returns the version number and the full definition. Cite it as "Rubric version <n> (platform)".
2. **A `rubric.json` in the working folder**: read it. It must have the same shape (criteria with keys and weights that add up to 1, `scale`, `composite`, `recommendation`, `gates`, `not_assessed`, `stage_calibration`). If it does not parse or the weights do not add up to 1, say so in one line and fall back to the default. Cite it as "rubric.json (working folder)".
3. **The plugin's default rubric** at `${CLAUDE_PLUGIN_ROOT}/rubrics/default.json`. Cite it as "SkaFld VC default rubric (rubrics/default.json)".

Put the citation in the scorecard header. Never score from memory or from a criteria list in another document.

### 2. Fix the stage bar

Load `skafld-vc:stage-calibration` and write its one-line stage bar. Every score below is relative to that stage.

### 3. Check the knock-outs before scoring anything

Read the knock-outs from the rubric's `knockouts` list, or, where the rubric has none, from its `composite.description`. For each one write: triggered yes or no, and the evidence. If the materials say nothing either way, write "not determinable from the materials"; that does not trigger it.

Knock-outs come first because early-stage screeners reject on a single fatal flaw before they weigh anything, and a conjunctive "critical flaw first, then tally" rule out-predicted a regression model (Åstebro and Elhedhli, Management Science 2006; Maxwell et al., JBV 2011). Missing sector experience and missing leadership experience on the team are the two knock-outs measured in a VC conjoint study (Franke et al., ETP 2008).

A triggered knock-out forces the recommendation to `pass` with the knock-out named, whatever the composite. Still score the criteria, so the reader sees the whole picture.

### 4. Score each criterion independently

For each criterion in the rubric, in the rubric's order:

1. Collect the evidence for that criterion alone: deck, application, data room, the platform's `get_deal_details` where connected. Quote every figure with its source (document and page, or tool and field).
2. Score it before reading your notes on the other criteria. Independent scoring of predefined assessments, with judgment deferred until the profile is complete, is the practice with the strongest evidence for reducing noise (Kahneman, Lovallo and Sibony, MIT SMR 2019).
3. Use the rubric's anchors: the criterion's `anchors` map where it has one, else the score descriptions in its `evaluates` text, read against the scale's percentile anchors (5 = top decile of deals seen at that stage, 4 = top quartile, 3 = median, 2 = bottom quartile, 1 = bottom decile). Anchors are comparative, never adjectives.
4. Where the rubric asks for an evidence class, record it (paid, behavioural, product, discovery, none).
5. If the materials contain no evidence bearing on the criterion, set `status: not_assessed`, give no score, and name the document or fact that would resolve it. Never turn missing information into a low score; investors already tend to read "not shown" as "below threshold" (Bernstein, Korteweg and Laws, J. Finance 2017), and the rubric's gates exist so absence cannot drag a composite down.
6. A criterion about network fit, where the rubric has one, is scored against the house profile from `whoami` (its `network_fit` label and description, and its `thesis`). Without a platform, score it against the network's thesis if the user gave one; otherwise it is `not_assessed`.

### 5. Look for deal killers

While scoring, note any deal killer. The classic list: historical performance vastly different from what was reported; company or industry prospects significantly diminished; a major liability or potential liability discovered; major concerns about the company's or management's ethics and reputation; significant unforeseen investment required to reach the plan; systems and controls found inadequate (Stanford Search Fund Primer, 2021). A deal killer forces `pass` with the killer named, whatever the composite, and appears first in the risks.

### 6. The composite

**With the platform**: call `score_company` with one entry per criterion (scored with its evidence and sources, or `not_assessed` with what would be needed). Report the composite, band, coverage and withheld state exactly as the tool returns them. Never compute, adjust or round them yourself.

**Without the platform**: if the plugin's local `score_with_rubric` tool is available, call it with `criteria` (an object keyed by criterion: `{"score": n, "reasoning": "..."}` or `{"status": "not_assessed", "reasoning": "what would be needed"}`), `knockouts` (your step 3 results as `[{"key", "triggered", "evidence"}]`), `document_count` (how many documents the scores rest on) and, only for a rubric file other than `rubric.json`, `rubric_path`. It finds the rubric in the same order as step 1 and returns which one it used, the worksheet, composite, band, coverage, gates and knock-out result; report them the same way. If no scoring tool is available, show the worksheet below in full and label the composite "arithmetic not tool-verified".

Worksheet, using the rubric's own method (`composite.method`, normally `weighted_mean_of_assessed`), gates and rounding:

```
| Criterion | Weight | Score | Weight x score |
| <key>     | <w>    | <s>   | <w x s>        |
| <key>     | <w>    | not_assessed | -       |
...
Assessed weight W = sum of weights of scored criteria = <W>
Coverage = W / total weight = <c>  (gate: gates.min_coverage = <g>)
Composite = sum(weight x score) / W = <x> -> rounded per recommendation.rounding = <r>
Band from recommendation.bands = <band>
```

If coverage is below the rubric's `gates.min_coverage`, or there are fewer readable documents than `gates.min_document_chunks`, the composite is withheld and the recommendation is the rubric's `withheld` value.

A mechanical composite with consistent weights beat holistic judgment in every head-to-head test found; an equal-weight model built from VCs' own cues beat 52 of 53 of them (Zacharakis and Meyer, JBV 2000). So the arithmetic is done the same way every time, and your judgment goes into the evidence and the override, not into the sum.

### 7. Apply the top-band condition, then the forced passes

1. **Top-band condition.** Use the rubric's `band_conditions` where it has them; otherwise the rule in its `composite.description`. In the default rubric, `strong_consider` also needs the market and product criteria both at 4 or above and no criterion at 2 or below; otherwise report `consider`. The reason: high product and high market together roughly doubled the chance of a $10M-plus later financing, more than any single score (Jang and Kaplan, NBER 2025), and a critical flaw should not be averaged away (Åstebro and Elhedhli, 2006). If the tool already applied the condition, report its result. If it returned `strong_consider` and the condition fails, report the tool's result and state beside it that the band is `consider` and why.
2. **Knock-outs and deal killers.** Any triggered knock-out or deal killer makes the recommendation `pass`, with its name beside the composite.
3. **Override.** Any other change to the band needs a stated reason in one sentence. The score is one input to the human decision, as angel groups use it (Galbraith, DeNoble and Ehrlich, JSBS 2009).

## Output

```
## Scorecard: <Company> (<stage>)
Rubric: <version or source> · Draft for a human reviewer
Stage bar: <the stage-calibration line>
Assessed <n> of <m> criteria (coverage <c>) · Composite <score or withheld> [arithmetic not tool-verified] · <Recommendation>
<Forced pass: knock-out or deal killer named, or "No knock-out or deal killer triggered">

### Knock-outs
| Knock-out | Triggered | Evidence |

### Criteria
| Criterion | Weight | Score | Evidence class | Reasoning (with sources) |

### Worksheet (only when no tool computed the composite)

### Highlights
- <evidence class>: <highlight with source>

### Key risks (most severe first)
- <type> (<class>): <risk>; mitigant: <mitigant or none>

### Missing evidence
- <criterion>: <document or fact that would resolve it>
```

**Key risks** are strings in that exact format, so they can be passed to `save_screening` unchanged. Use the vocabulary in the rubric's `output_schema` where it defines one; the default vocabulary is:

- Types (twelve, after the Risk Factor Summation sheet of the GoingVC valuation workbook): `competition`, `technology`, `litigation`, `international`, `reputation`, `exit`, `management`, `stage`, `legislation_political`, `manufacturing`, `sales_marketing`, `funding`.
- Classes (five, after the Stanford Search Fund Primer, 2021, which sorts diligence findings into deal killers, price issues, terms issues, and risks to mitigate or opportunities): `deal_killer`, `price`, `terms`, `operating_risk`, `opportunity`.

Example: `management (operating_risk): no one on the team has sold to hospital buyers; mitigant: an adviser with ten years in hospital procurement is named in the deck, p.9`.

## Rules

- Everything this skill produces is a draft for a human reviewer, who confirms every score before anyone else sees it. Say so in the header.
- `not_assessed`, never a low score, for evidence the materials do not contain.
- Bounded absence claims: write "no LOIs are mentioned in the materials", never "the company has no LOIs".
- Cite the source of every figure, and the rubric version or source in the header.
- Never compute or round the composite when a scoring tool is available; without one, show the worksheet and mark it not tool-verified.
- Never contact the founder or draft founder-facing messages.
- Name no network in the scorecard except as the house profile from `whoami` names it.

## Sources

- Åstebro and Elhedhli (2006). The effectiveness of simple decision heuristics: forecasting commercial success for early-stage ventures. Management Science 52(3). https://ideas.repec.org/a/inm/ormnsc/v52y2006i3p395-409.html
- Bernstein, Korteweg and Laws (2017). Attracting early-stage investors: evidence from a randomized field experiment. Journal of Finance 72(2). https://onlinelibrary.wiley.com/doi/10.1111/jofi.12470
- Franke, Gruber, Harhoff and Henkel (2008). VCs' evaluations of start-up teams: trade-offs, knock-out criteria, and VC experience. Entrepreneurship Theory and Practice 32(3). https://exa.ai/library/publication/qcr3m0sqp8q
- Galbraith, DeNoble and Ehrlich (2009). The use and content of formal rating systems in angel group initial screening. Journal of Small Business Strategy. https://libjournals.mtsu.edu/index.php/jsbs/article/view/128
- GoingVC (n.d.). The GoingVC Valuation Model workbook, Risk Summation Method sheet. Practitioner reference library; no public URL.
- Jang and Kaplan (2025). Venture Capital Start-up Selection. NBER Working Paper w33483. https://www.nber.org/system/files/working_papers/w33483/w33483.pdf
- Kahneman, Lovallo and Sibony (2019). A structured approach to strategic decisions. MIT Sloan Management Review. https://sloanreview.mit.edu/article/a-structured-approach-to-strategic-decisions/
- Maxwell, Jeffrey and Lévesque (2011). Business angel early stage decision making. Journal of Business Venturing 26(2). https://www.sciencedirect.com/science/article/abs/pii/S0883902609000974
- Stanford (2021). Search Fund Primer 2021, section on evaluating diligence findings. Practitioner reference library; no public URL.
- Zacharakis and Meyer (2000). The potential of actuarial decision models: can they improve the venture capital investment decision? Journal of Business Venturing 15(4). https://www.sciencedirect.com/science/article/abs/pii/S0883902698000160
