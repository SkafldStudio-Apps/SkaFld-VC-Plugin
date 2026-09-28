---
description: Prepare feedback for a founder after a screening - an internal call brief and a founder-facing copy across seven areas, with a disclosure check so it never states a pass, a score, a vote or a member's name.
argument-hint: "[company or deal]"
---

Load the `skafld-vc:founder-feedback` skill and prepare feedback for: $ARGUMENTS

Work from the company's Screening: with the platform connected, call `whoami` and read it with `get_deliverables`; otherwise use the Screening file or notes the user gives. If there is none, ask for it; feedback is never written from the deck alone. Build a `founder_feedback` deliverable, render it with `render_deliverable`, and export the founder copy with `export_document` and `audience: "founder"` only when the user asks and the disclosure check passed. A person reviews and sends it; never send anything yourself.
