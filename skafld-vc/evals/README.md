# SkaFld VC evaluations

Test cases for `claude plugin eval` (Claude Code 2.1.269 or later). They check that requests reach the right skill or agent, that an unrelated request loads nothing, and, with a judge, that the answers are sound. The companies and terms in the fixtures are fictional.

Run from the repository root, with your own Claude credentials (every run is billed to them):

```
claude plugin eval packages/agents/skafld-vc --trust-plugin --ablation none --runs 1
```

Then without `--ablation none` and with `--runs 3` to compare against Claude without the plugin. The plugin's servers are not started by default, which is enough for these cases (they check which skill or agent runs); add `--allow-real-servers` to let the agents render and export files too. Results go to `evals/results/`, which is not committed.
