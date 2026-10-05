# SkaFld VC evaluations

Test cases for `claude plugin eval` (Claude Code 2.1.269 or later). They check that requests reach the right skill or agent, that an unrelated request loads nothing, and, with a judge, that the answers are sound. The companies and terms in the fixtures are fictional.

The cases tagged `collisions` come in pairs for an agent and a skill whose descriptions overlap: the full workflow reaches the agent (`build-a-longlist`, `review-the-portfolio`, `screen-a-deck`, `diligence-plan`), and a single item on its own reaches the skill without starting the agent (`does-it-fit-the-thesis`, `read-one-update`, `how-diversified`, `scorecard-only`, `request-list-only`). `triage-an-application` and `audit-a-deck` separate the two skills that both read an inbound deck. Run only them with `--tag collisions`.

Run from the repository root, with your own Claude credentials (every run is billed to them):

```
claude plugin eval skafld-vc --trust-plugin --ablation none --runs 1
```

Then without `--ablation none` and with `--runs 3` to compare against Claude without the plugin. The plugin's servers are not started by default, which is enough for these cases (they check which skill or agent runs); add `--allow-real-servers` to let the agents render and export files too. Results go to `evals/results/`, which is not committed.
