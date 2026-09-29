#!/usr/bin/env node
// The deliverables tools from the command line, for where the plugin's local
// server does not run (Claude's code execution in Chat, or a tool without
// MCP). Same tools, same arguments, same results as the server.
//
//   node run.mjs <tool> <arguments.json>
//   node run.mjs <tool> -            (the arguments as JSON on stdin)
//
// <tool> is render_deliverable, render_package, score_with_rubric or
// export_document; the arguments are the tool's JSON arguments, for example
// {"deliverable": {...}} or {"format": "docx", "file": "skafld-vc/x.html"}.
// Files are written under ./skafld-vc/ in the current folder (or the
// arguments' project_dir). Prints the reply; exits 1 on an error.
import { readFileSync } from "node:fs"

import { runTool, TOOL_NAMES } from "./tools.mjs"

const [name, source] = process.argv.slice(2)
if (!name || !TOOL_NAMES.includes(name)) {
  process.stderr.write(
    `usage: node run.mjs <${TOOL_NAMES.join("|")}> <arguments.json | ->\n`
  )
  process.exit(2)
}

let args = {}
try {
  const raw =
    source === "-"
      ? readFileSync(0, "utf8")
      : source
        ? readFileSync(source, "utf8")
        : "{}"
  args = JSON.parse(raw)
} catch (err) {
  process.stderr.write(
    `run: cannot read the arguments: ${err?.message ?? err}\n`
  )
  process.exit(2)
}

const { text, isError } = await runTool(name, args)
;(isError ? process.stderr : process.stdout).write(`${text}\n`)
process.exit(isError ? 1 : 0)
