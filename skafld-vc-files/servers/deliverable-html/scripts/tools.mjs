// The deliverables tools, shared by the local MCP server (mcp-server.mjs)
// and the command line (run.mjs), so both do exactly the same thing.
import { exportReply, writeExport } from "./export.mjs"
import { scoreDocuments } from "./score.mjs"
import {
  projectDir,
  RenderError,
  writeDeliverable,
  writePackage,
} from "./write.mjs"

export const TOOL_NAMES = [
  "render_deliverable",
  "render_package",
  "score_with_rubric",
  "export_document",
]

/** Run one tool. Returns the reply text and whether it is an error. */
export async function runTool(name, args = {}) {
  try {
    const project = () => ({
      project: projectDir(process.env, args.project_dir),
    })
    if (name === "export_document") {
      return { text: exportReply(await writeExport(args)), isError: false }
    }
    if (name === "render_deliverable") {
      const out = writeDeliverable(args.deliverable, project())
      return { text: `Wrote ${out.html} (source ${out.json}).`, isError: false }
    }
    if (name === "score_with_rubric") {
      return {
        text: JSON.stringify(scoreDocuments(args), null, 2),
        isError: false,
      }
    }
    if (name === "render_package") {
      const out = writePackage(
        {
          files: Array.isArray(args.files) ? args.files : [],
          deliverables: Array.isArray(args.deliverables)
            ? args.deliverables
            : [],
          person: typeof args.person === "string" ? args.person : undefined,
        },
        project()
      )
      return { text: `Wrote ${out.html} (source ${out.json}).`, isError: false }
    }
    return { text: `Unknown tool ${name}`, isError: true }
  } catch (err) {
    if (err instanceof RenderError) {
      const lines = err.errors.map((e) => `- ${e}`).join("\n")
      return {
        text: `${err.message}${lines ? `:\n${lines}` : ""}`,
        isError: true,
      }
    }
    return { text: `render failed: ${err?.message ?? err}`, isError: true }
  }
}
