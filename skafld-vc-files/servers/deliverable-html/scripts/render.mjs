#!/usr/bin/env node
// Render SkaFld VC deliverables to self-contained HTML, locally and with
// no network. Part of the skafld-vc plugin's deliverable-html skill.
//
//   node render.mjs <deliverable.json>
//   node render.mjs --package <screening.json> <diligence.json> [...]
//   node render.mjs -            (one deliverable or package as JSON on stdin)
//
// Options:
//   --person "<name>"   who ran it, shown on a package cover
//
// Writes ./skafld-vc/<company>-<type>-<date>.html (or
// <company>-package-<date>.html) and the JSON beside it, under the current
// directory, creating the folder when needed, and prints the HTML path.
// Exits 1 with the validation errors when the input is not a valid
// skafld-vc.deliverable/v1 or skafld-vc.package/v1 document.
//
// renderer.mjs is a copy of lib/deliverables/render.mjs and
// ../assets/template.css of lib/deliverables/template.generated.css,
// written by `pnpm agents:sync`; do not edit them here.
import { readFileSync } from "node:fs"

import { RenderError, writeDeliverable, writePackage } from "./write.mjs"

function fail(message, errors = []) {
  process.stderr.write(`render: ${message}\n`)
  for (const e of errors) process.stderr.write(`  - ${e}\n`)
  process.exit(1)
}

function readJson(arg) {
  const label = arg === "-" ? "stdin" : arg
  let text
  try {
    text = readFileSync(arg === "-" ? 0 : arg, "utf8")
  } catch (err) {
    fail(`cannot read ${label}: ${err.message}`)
  }
  try {
    return JSON.parse(text)
  } catch (err) {
    fail(`${label} is not JSON: ${err.message}`)
  }
}

const args = { packageMode: false, person: undefined, inputs: [] }
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === "--package") args.packageMode = true
  else if (a === "--person") args.person = argv[++i]
  else if (a === "-h" || a === "--help") {
    process.stdout.write(
      "usage: render.mjs <deliverable.json> | --package <a.json> <b.json> ... | -\n"
    )
    process.exit(0)
  } else args.inputs.push(a)
}
if (args.inputs.length === 0) fail("give a JSON file, or - for stdin")

try {
  const docs = args.inputs.map(readJson)
  const written =
    docs.length === 1 && !args.packageMode
      ? writeDeliverable(docs[0])
      : writePackage({ deliverables: docs, person: args.person })
  process.stdout.write(`${written.html}\n`)
} catch (err) {
  if (err instanceof RenderError) fail(err.message, err.errors)
  throw err
}
