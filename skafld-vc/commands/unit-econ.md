---
description: Reconstruct a startup's unit economics from its disclosures and show what is stated, derived or a dated benchmark.
argument-hint: "[company name, deal or file paths]"
---

Load the `skafld-vc:unit-economics` skill and reconstruct the company's unit economics. Load `skafld-vc:stage-calibration` first so benchmarks are read at the right stage.

If a company, deal or materials are given, use them. Otherwise ask the user which materials to work from. When the platform is connected and a deal is named, fetch it with `get_deal_details`.

Reconcile revenue, margin and burn before presenting any derived metric. Every benchmark carries its source, year and sample. A metric the materials do not support is not assessed, never guessed. Close with the three sensitivities and the gaps that would resolve them.
