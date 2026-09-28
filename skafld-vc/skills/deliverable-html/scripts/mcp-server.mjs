#!/usr/bin/env node
// The skafld-vc plugin's local deliverables server: a stdio MCP server
// with two tools that write HTML deliverables under
// <project>/skafld-vc/ and nowhere else. It opens no network
// connection; the agents get these two tools instead of Bash or Write.
//
//   render_deliverable  { deliverable }                    one Sourcing longlist, Screening report, Diligence plan, IC memo or Portfolio review
//   render_package      { files?, deliverables?, person? } one Package combining several for one company
//   score_with_rubric   { criteria, ... }                  documents-only scoring against a rubric
//   export_document     { format, file? | deliverable? | markdown?, ... }
//                       Word, PDF, PowerPoint, a PDF deck or Excel, in the brand
//
// Every tool takes an optional project_dir: the absolute folder the agent is
// working in, used when the host does not pass CLAUDE_PROJECT_DIR.
// Newline-delimited JSON-RPC 2.0 on stdin/stdout (MCP stdio transport), with
// no dependencies. Declared in the plugin's .mcp.json as
// `node ${CLAUDE_PLUGIN_ROOT}/skills/deliverable-html/scripts/mcp-server.mjs`.
import { createInterface } from "node:readline"

import { runTool } from "./tools.mjs"

const SERVER = { name: "skafld-vc-deliverables", version: "1.2.0" }

const PROJECT_DIR = {
  type: "string",
  description:
    "The absolute path of the folder you are working in. Pass it always; it is used when the host does not tell the server the project folder.",
}
const FALLBACK_PROTOCOL = "2025-06-18"

const FORMAT_HINT =
  "Load the skafld-vc:deliverable-html skill for the format (skafld-vc.deliverable/v1)."

const TOOLS = [
  {
    name: "render_deliverable",
    title: "Write an HTML deliverable",
    description: `Validate one deliverable (a Sourcing longlist, Screening report, Founder feedback, Diligence plan, IC memo or Portfolio review) and write it as a self-contained HTML file in ./skafld-vc/, with its JSON beside it. Returns the paths, or the validation errors to fix. ${FORMAT_HINT}`,
    inputSchema: {
      type: "object",
      properties: {
        deliverable: {
          type: "object",
          description:
            "A skafld-vc.deliverable/v1 document: format, type, status, company, generatedAt, preparedBy, sources, openItems and body.",
        },
        project_dir: PROJECT_DIR,
      },
      required: ["deliverable"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "render_package",
    title: "Write an HTML package",
    description: `Combine several deliverables about one company into one Package (cover, contents, each deliverable, combined open items) and write it as HTML in ./skafld-vc/. Name deliverables written earlier by their file names in \`files\` (for example "harbor-robotics-screening-2026-09-26.json"), or pass documents in \`deliverables\`. ${FORMAT_HINT}`,
    inputSchema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: { type: "string" },
          description:
            "File names in ./skafld-vc/ returned by render_deliverable (.json or .html).",
        },
        deliverables: {
          type: "array",
          items: { type: "object" },
          description: "skafld-vc.deliverable/v1 documents.",
        },
        person: {
          type: "string",
          description: "Who the package was prepared for or by, for the cover.",
        },
        project_dir: PROJECT_DIR,
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "score_with_rubric",
    title: "Score against a rubric without a platform",
    description:
      "Documents-only scoring: runs the platform's rubric arithmetic (weighted mean of assessed criteria, rounding, bands, band conditions, knock-outs, coverage and gates) on your per-criterion scores. The rubric is rubric_path if given (inside the project), else rubric.json in the project root, else the SkaFld VC default. Use it only when the platform's score_company is not available; it saves nothing. Returns the worksheet, composite, band, coverage and gate results, and which rubric was used. Load the skafld-vc:deal-scorecard skill first.",
    inputSchema: {
      type: "object",
      properties: {
        criteria: {
          type: "object",
          description:
            'One entry per criterion key: {"score": 1-5, "reasoning": "..."} or {"status": "not_assessed", "reasoning": "what would be needed"}.',
        },
        knockouts: {
          type: "array",
          items: { type: "object" },
          description:
            'The rubric\'s knock-outs as evaluated before scoring: [{"key": "...", "triggered": true|false, "evidence": "..."}].',
        },
        document_count: {
          type: "number",
          description:
            "How many documents (or readable sections) the scores rest on; the rubric's document gate withholds the composite at zero.",
        },
        rubric_path: {
          type: "string",
          description:
            "A rubric JSON file inside the project, when not rubric.json.",
        },
        project_dir: PROJECT_DIR,
      },
      required: ["criteria"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
]

TOOLS.push({
  name: "export_document",
  title: "Export as Word, PDF, PowerPoint or Excel",
  description:
    'Write a branded file in ./skafld-vc/: docx (Word report), pdf (PDF report), pptx (PowerPoint deck), deck_pdf (the deck as PDF) or xlsx (a Diligence plan only: audience "founder" is the request list to send to the company, built from body.requests and nothing else; "team" is the internal tracker). A Founder feedback exports as docx or pdf; audience "founder" is the copy to send, without anything internal. The source is a deliverable or package written earlier (file), a deliverable object, or Markdown (any answer: # title, ## sections, lists, tables). The brand is the one named, else the project\'s brand/ folder, else the person\'s saved brand, else the SkaFld VC default. Load the skafld-vc:document-export skill first.',
  inputSchema: {
    type: "object",
    properties: {
      format: {
        type: "string",
        enum: ["docx", "pdf", "pptx", "deck_pdf", "xlsx"],
      },
      file: {
        type: "string",
        description:
          "A deliverable or package in ./skafld-vc/ returned by render_deliverable or render_package (.json or .html).",
      },
      deliverable: {
        type: "object",
        description: "A skafld-vc.deliverable/v1 or package document.",
      },
      markdown: {
        type: "string",
        description: "Markdown to export when there is no deliverable.",
      },
      title: { type: "string", description: "Title for Markdown exports." },
      subtitle: {
        type: "string",
        description: "Subtitle or label for Markdown exports.",
      },
      audience: {
        type: "string",
        enum: ["founder", "team"],
        description:
          "Who the file is for. xlsx (a Diligence plan): founder, the request list to send (the default), or team, the internal tracker. docx or pdf of a Founder feedback: founder, the copy to send, without the internal brief, ratings or anything internal (refused unless its disclosure check passed); leave it out for the internal version. Ignored otherwise.",
      },
      contact: {
        type: "string",
        description:
          'xlsx founder list: who the company should contact with questions, for example "Dana Whitfield, dana@fund.com".',
      },
      from: {
        type: "string",
        description:
          "xlsx founder list: the firm sending it, when the brand's name is not it.",
      },
      brand: {
        type: "string",
        description:
          "A brand id the plugin ships (the platform's whoami house.brand), or a brand folder inside the project. Leave out to use the saved brand.",
      },
      house: {
        type: "string",
        description:
          "The platform's short name (whoami house.short_name), when connected.",
      },
      project_dir: PROJECT_DIR,
    },
    required: ["format"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
})

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`)
}

function toolResult(text, isError = false) {
  return { content: [{ type: "text", text }], ...(isError ? { isError } : {}) }
}

async function callTool(name, args = {}) {
  const { text, isError } = await runTool(name, args)
  return toolResult(text, isError)
}

let queue = Promise.resolve()

function handle(msg) {
  const { id, method, params } = msg
  const isRequest = id !== undefined && id !== null
  const reply = (result) => isRequest && send({ jsonrpc: "2.0", id, result })
  switch (method) {
    case "initialize":
      return reply({
        protocolVersion: params?.protocolVersion ?? FALLBACK_PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: SERVER,
      })
    case "ping":
      return reply({})
    case "tools/list":
      return reply({ tools: TOOLS })
    case "tools/call": {
      // One call at a time, in the order received: a brand saved or reset
      // by one call is what the next one sees.
      queue = queue.then(() =>
        callTool(params?.name, params?.arguments ?? {}).then(reply)
      )
      return
    }
    default:
      if (isRequest) {
        send({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        })
      }
  }
}

const rl = createInterface({ input: process.stdin })
rl.on("line", (line) => {
  if (!line.trim()) return
  let msg
  try {
    msg = JSON.parse(line)
  } catch {
    send({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    })
    return
  }
  for (const m of Array.isArray(msg) ? msg : [msg]) handle(m)
})
// Answer every call already started before exiting.
rl.on("close", () => {
  void queue.then(() => process.exit(0))
})
