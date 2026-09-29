#!/usr/bin/env python3
"""Documents-only rubric scoring, with no dependencies beyond Python 3.8.

A line-for-line port of the platform's arithmetic (lib/ai/rubric/scoring-core.mjs)
and of the Files add-on's score_with_rubric tool (score.mjs), for where Node
and the add-on are not installed: Claude's code execution in Chat and Cowork,
or any tool that runs Python. Same arguments, same reply, same numbers; a CI
test runs both on the same fixtures and fails if they ever differ.

    python3 score.py <arguments.json>
    python3 score.py -              (the arguments as JSON on stdin)

The arguments are score_with_rubric's: {"criteria": {...}, "knockouts": [...],
"document_count": n, "rubric_path": "...", "project_dir": "..."}. The rubric is
rubric_path (inside the project), else rubric.json in the project folder, else
the plugin's rubrics/default.json. Prints the reply as JSON; exits 1 with the
problems to fix. Reads files only; no network, no writes.
"""

import json
import math
import os
import re
import sys
from pathlib import Path

PLUGIN_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_RUBRIC = PLUGIN_ROOT / "rubrics" / "default.json"
PROJECT_RUBRIC = "rubric.json"


class ScoreError(Exception):
    def __init__(self, message, errors=None):
        super().__init__(message)
        self.message = message
        self.errors = errors or []


def is_number(value):
    """JavaScript's typeof value === "number" for parsed JSON (never a bool)."""
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def is_finite_number(value):
    return is_number(value) and math.isfinite(value)


def js_round(value):
    """Math.round: the nearest integer, halves toward positive infinity."""
    floor = math.floor(value)
    return floor + 1 if value - floor >= 0.5 else floor


def js_number_text(value):
    """How JavaScript prints a number: 2 rather than 2.0."""
    if is_number(value) and float(value).is_integer():
        return str(int(value))
    return repr(value)


# The arithmetic: scoring-core.mjs, function for function.


def total_weight(definition):
    total = 0
    for c in definition["criteria"]:
        total = total + c["weight"]
    return total


def round_score(value, rounding):
    factor = 10 ** rounding["decimals"]
    return js_round(value * factor) / factor


def weighted_mean(entries):
    total_w = 0
    weighted_sum = 0
    for entry in entries.values():
        weighted_sum += entry["score"] * entry["weight"]
        total_w += entry["weight"]
    if total_w == 0:
        return 0
    return weighted_sum / total_w


def recommendation_for(score, definition):
    for band in definition["recommendation"]["bands"]:
        if is_number(band.get("min_score")) and score >= band["min_score"]:
            return band["recommendation"]
    return definition["recommendation"]["floor"]


def is_assessed(entry):
    if not isinstance(entry, dict):
        return False
    return entry.get("status") != "not_assessed" and is_finite_number(
        entry.get("score")
    )


def assess_criteria(raw, definition):
    weighted = {}
    not_assessed = []
    assessed_weight = 0
    raw = raw if isinstance(raw, dict) else {}
    for criterion in definition["criteria"]:
        entry = raw.get(criterion["key"])
        if is_assessed(entry):
            weighted[criterion["key"]] = {
                "score": entry["score"],
                "weight": criterion["weight"],
            }
            assessed_weight += criterion["weight"]
        else:
            not_assessed.append(criterion["key"])
    return weighted, not_assessed, assessed_weight


def coverage_of(assessed_weight, definition):
    total = total_weight(definition)
    return assessed_weight / total if total > 0 else 0


def blocking_condition(recommendation, weighted, definition):
    for condition in definition.get("band_conditions") or []:
        if condition.get("recommendation") != recommendation:
            continue
        requires = condition.get("requires") or {}
        at_least = requires.get("all_at_least") or {}
        floor = requires.get("none_at_or_below")
        for key, minimum in at_least.items():
            entry = weighted.get(key)
            if not entry or entry["score"] < minimum:
                return condition
        if is_number(floor):
            for entry in weighted.values():
                if entry["score"] <= floor:
                    return condition
    return None


def composite_for(weighted, definition):
    rounding = definition["recommendation"]["rounding"]
    raw = weighted_mean(weighted)
    score = round_score(raw, rounding)
    recommendation = recommendation_for(
        score if rounding.get("before_banding") else raw, definition
    )
    seen = set()
    blocked = blocking_condition(recommendation, weighted, definition)
    while blocked and recommendation not in seen:
        seen.add(recommendation)
        recommendation = blocked.get("otherwise")
        blocked = blocking_condition(recommendation, weighted, definition)
    return {"score": score, "recommendation": recommendation}


def triggered_knockouts(results, definition):
    known = {k.get("key") for k in definition.get("knockouts") or []}
    if not isinstance(results, list):
        return []
    return [
        r
        for r in results
        if isinstance(r, dict) and r.get("triggered") is True and r.get("key") in known
    ]


def knockout_recommendation_for(recommendation, definition):
    knockout = definition.get("knockout_recommendation") or "pass"
    order = [b["recommendation"] for b in definition["recommendation"]["bands"]]
    order.append(definition["recommendation"]["floor"])

    def index(value):
        return order.index(value) if value in order else -1

    return recommendation if index(recommendation) > index(knockout) else knockout


def apply_gates(coverage, chunk_count, composite, definition):
    gates = definition["gates"]
    min_chunks = gates.get("min_document_chunks")
    has_enough_coverage = coverage >= gates["min_coverage"]
    has_document_evidence = is_number(min_chunks) and chunk_count >= min_chunks
    publishable = has_enough_coverage and has_document_evidence
    return {
        "hasEnoughCoverage": has_enough_coverage,
        "hasDocumentEvidence": has_document_evidence,
        "publishable": publishable,
        "publishedScore": composite["score"] if publishable else None,
        "publishedRecommendation": composite["recommendation"]
        if publishable
        else definition["recommendation"].get("withheld"),
    }


def score_with_rubric(definition, criteria, chunk_count, knockouts_in):
    weighted, not_assessed, assessed_weight = assess_criteria(criteria, definition)
    composite = composite_for(weighted, definition)
    coverage = coverage_of(assessed_weight, definition)
    gates = apply_gates(coverage, chunk_count, composite, definition)
    knockouts = triggered_knockouts(knockouts_in, definition)
    worksheet = []
    for c in definition["criteria"]:
        entry = weighted.get(c["key"])
        if entry:
            worksheet.append(
                {
                    "key": c["key"],
                    "weight": c["weight"],
                    "score": entry["score"],
                    "contribution": entry["score"] * entry["weight"],
                }
            )
        else:
            worksheet.append(
                {"key": c["key"], "weight": c["weight"], "status": "not_assessed"}
            )
    if knockouts and gates["publishable"]:
        recommendation = knockout_recommendation_for(
            gates["publishedRecommendation"], definition
        )
    else:
        recommendation = gates["publishedRecommendation"]
    return {
        "worksheet": worksheet,
        "notAssessed": not_assessed,
        "assessedWeight": assessed_weight,
        "coverage": coverage,
        "rawMean": weighted_mean(weighted),
        "composite": composite,
        "gates": gates,
        "knockouts": knockouts,
        "recommendation": recommendation,
    }


# Finding and checking the rubric: score.mjs.

KEY_PATTERN = re.compile(r"^[a-z][a-z0-9_]*$")


def rubric_shape_problems(definition):
    problems = []
    if not isinstance(definition, dict):
        return ["the rubric is not a JSON object"]
    criteria = definition.get("criteria")
    criteria = criteria if isinstance(criteria, list) else None
    if not criteria:
        problems.append("criteria must be a non-empty array")
    total = 0
    keys = set()
    for i, c in enumerate(criteria or []):
        key = c.get("key") if isinstance(c, dict) else None
        if not isinstance(key, str) or not KEY_PATTERN.match(key):
            problems.append(f"criteria[{i}].key must be lower snake_case")
        elif key in keys:
            problems.append(f'criteria[{i}].key "{key}" appears more than once')
        else:
            keys.add(key)
        weight = c.get("weight") if isinstance(c, dict) else None
        if not is_number(weight) or not weight > 0:
            problems.append(f"criteria[{i}].weight must be a number above 0")
        else:
            total += weight
    if criteria and abs(total - 1) > 1e-6:
        problems.append(
            "criterion weights must add up to 1 (they add up to "
            f"{js_number_text(round(total, 6))})"
        )
    rec = definition.get("recommendation")
    rec = rec if isinstance(rec, dict) else None
    bands = rec.get("bands") if rec else None
    if not isinstance(bands, list) or not bands:
        problems.append("recommendation.bands must be a non-empty array")
    else:
        for i in range(1, len(bands)):
            here = bands[i].get("min_score") if isinstance(bands[i], dict) else None
            prev = bands[i - 1].get("min_score") if isinstance(bands[i - 1], dict) else None
            if not (is_number(here) and is_number(prev) and here < prev):
                problems.append(
                    "recommendation.bands must be listed from the highest min_score down"
                )
    if not rec or not isinstance(rec.get("floor"), str):
        problems.append("recommendation.floor is required")
    rounding = rec.get("rounding") if rec else None
    if not isinstance(rounding, dict) or not is_number(rounding.get("decimals")):
        problems.append("recommendation.rounding.decimals is required")
    gates = definition.get("gates")
    if not isinstance(gates, dict) or not is_number(gates.get("min_coverage")):
        problems.append("gates.min_coverage is required")
    return problems


def is_within(path, root):
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def project_dir(requested=None, env=os.environ):
    if env.get("CLAUDE_PROJECT_DIR"):
        folder = Path(env["CLAUDE_PROJECT_DIR"]).resolve()
    elif isinstance(requested, str) and os.path.isabs(requested) and os.path.isdir(requested):
        folder = Path(requested).resolve()
    else:
        folder = Path.cwd().resolve()
    if is_within(folder, PLUGIN_ROOT):
        raise ScoreError(
            "The project folder is not known here: pass project_dir, the absolute "
            "path of the folder you are working in."
        )
    return folder


def read_json(path, label):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, ValueError) as err:
        raise ScoreError(f"could not read {label}: {err}")


def resolve_rubric(rubric_path, requested_project=None):
    project = project_dir(requested_project)
    if rubric_path:
        path = (project / str(rubric_path)).resolve()
        if path == project or not is_within(path, project):
            raise ScoreError(f"refusing a rubric outside the project: {rubric_path}")
        source = f"project file {path.relative_to(project).as_posix()}"
    elif (project / PROJECT_RUBRIC).exists():
        path = project / PROJECT_RUBRIC
        source = f"project file {PROJECT_RUBRIC}"
    else:
        path = DEFAULT_RUBRIC
        source = "the SkaFld VC default rubric"
    definition = read_json(path, source)
    problems = rubric_shape_problems(definition)
    if problems:
        raise ScoreError(f"{source} is not a usable rubric", problems)
    return definition, source


def score_documents(args):
    criteria = args.get("criteria") if isinstance(args, dict) else None
    if not isinstance(criteria, (dict, list)):
        raise ScoreError(
            "criteria is required: one entry per criterion key, scored or not_assessed"
        )
    definition, source = resolve_rubric(args.get("rubric_path"), args.get("project_dir"))
    count = args.get("document_count")
    result = score_with_rubric(
        definition,
        criteria,
        count if is_number(count) else 0,
        args.get("knockouts"),
    )
    known = {c["key"] for c in definition["criteria"]}
    unknown = [k for k in criteria if k not in known] if isinstance(criteria, dict) else []
    return {
        "rubric": source,
        "rubric_criteria": [
            {"key": c["key"], "name": c.get("name"), "weight": c["weight"]}
            for c in definition["criteria"]
        ],
        "ignored_keys": unknown,
        **result,
    }


def main(argv):
    if len(argv) > 2:
        sys.stderr.write("usage: python3 score.py <arguments.json | ->\n")
        return 2
    source = argv[1] if len(argv) == 2 else None
    try:
        raw = sys.stdin.read() if source == "-" else Path(source).read_text("utf-8") if source else "{}"
        args = json.loads(raw)
    except (OSError, ValueError) as err:
        sys.stderr.write(f"score: cannot read the arguments: {err}\n")
        return 2
    try:
        reply = score_documents(args)
    except ScoreError as err:
        lines = "\n".join(f"- {e}" for e in err.errors)
        sys.stderr.write(f"{err.message}{':' + chr(10) + lines if lines else ''}\n")
        return 1
    sys.stdout.write(json.dumps(reply, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
