// Structure check for the generated marketplace: every source exists with a
// plugin.json whose name matches, dependencies resolve inside the
// marketplace, every JSON file parses, and the local servers start.
import { spawnSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const problems = []
const manifest = JSON.parse(readFileSync(".claude-plugin/marketplace.json", "utf8"))
const names = new Set(manifest.plugins.map((p) => p.name))
for (const p of manifest.plugins) {
  const file = join(p.source, ".claude-plugin", "plugin.json")
  if (!existsSync(file)) { problems.push(p.name + ": no " + file); continue }
  const plugin = JSON.parse(readFileSync(file, "utf8"))
  if (plugin.name !== p.name) problems.push(file + ": name " + plugin.name)
  for (const dep of plugin.dependencies ?? []) {
    const name = typeof dep === "string" ? dep.split("@")[0] : dep.name
    if (!names.has(name)) problems.push(p.name + ": unknown dependency " + name)
  }
  const mcp = join(p.source, ".mcp.json")
  if (!existsSync(mcp)) continue
  for (const [server, def] of Object.entries(JSON.parse(readFileSync(mcp, "utf8")).mcpServers ?? {})) {
    if (def.command !== "node") continue
    const args = def.args.map((a) => a.replace("${CLAUDE_PLUGIN_ROOT}", p.source))
    const r = spawnSync("node", args, {
      input: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }) + "\n",
      encoding: "utf8",
      timeout: 20000,
    })
    if (!/"tools"/.test(r.stdout)) problems.push(p.name + ": server " + server + " did not list its tools: " + r.stderr.slice(0, 300))
  }
}
// Codex, Cursor and Muse: each manifest names its plugin, and every path it
// points to exists.
const read = (f) => JSON.parse(readFileSync(f, "utf8"))
for (const p of manifest.plugins) {
  for (const dir of [".codex-plugin", ".cursor-plugin", ".muse-plugin"]) {
    const file = join(p.source, dir, "plugin.json")
    if (!existsSync(file)) continue
    const m = read(file)
    if (m.name !== p.name) problems.push(file + ": name " + m.name)
    const paths = [m.skills, m.agents, typeof m.mcpServers === "string" ? m.mcpServers : null]
      .concat((m.capabilities?.skills ?? []).map((s) => s.path))
      .filter((x) => typeof x === "string")
    for (const rel of paths) {
      if (!existsSync(join(p.source, rel))) problems.push(file + ": " + rel + " does not exist")
    }
    for (const s of m.capabilities?.mcpServers ?? []) {
      if (s.command && !existsSync(join(p.source, s.command[1]))) problems.push(file + ": " + s.command[1] + " does not exist")
    }
  }
  const codexMcp = join(p.source, ".codex-plugin", "mcp.json")
  if (existsSync(codexMcp)) {
    for (const [server, def] of Object.entries(read(codexMcp).mcpServers ?? {})) {
      if (def.command !== "node") continue
      const r = spawnSync("node", def.args, {
        cwd: join(p.source, def.cwd ?? "."),
        input: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }) + "\n",
        encoding: "utf8",
        timeout: 20000,
      })
      if (!/"tools"/.test(r.stdout)) problems.push(p.name + ": Codex server " + server + " did not list its tools")
    }
  }
}
// The core's Python scorer and the Files add-on's scoring tool give the same
// answer on the default rubric.
{
  const args = JSON.stringify({
    criteria: { team_founders: { score: 4 }, market_opportunity: { score: 5 }, product_differentiation: { score: 4 }, traction_validation: { status: "not_assessed" }, deal_terms: { score: 3 } },
    knockouts: [{ key: "no_sector_experience", triggered: false }],
    document_count: 2,
  })
  const py = spawnSync("python3", ["skafld-vc/skills/deal-scorecard/scripts/score.py", "-"], { input: args, encoding: "utf8" })
  const js = spawnSync("node", ["skafld-vc-files/servers/deliverable-html/scripts/run.mjs", "score_with_rubric", "-"], { input: args, encoding: "utf8" })
  if (py.status !== 0 || js.status !== 0) problems.push("scorer did not run: " + py.stderr + js.stderr)
  else if (JSON.stringify(JSON.parse(py.stdout)) !== JSON.stringify(JSON.parse(js.stdout))) problems.push("the Python scorer and score_with_rubric disagree")
}
for (const [file, plugins] of [
  [".agents/plugins/marketplace.json", read(".agents/plugins/marketplace.json").plugins],
  [".cursor-plugin/marketplace.json", read(".cursor-plugin/marketplace.json").plugins],
]) {
  for (const entry of plugins) {
    const source = typeof entry.source === "string" ? entry.source : entry.source.path
    if (!names.has(entry.name) || !existsSync(source)) problems.push(file + ": " + entry.name + " at " + source)
  }
}

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  if (n === ".git" || n === "node_modules") return []
  return statSync(p).isDirectory() ? walk(p) : [p]
})
for (const f of walk(".").filter((f) => f.endsWith(".json"))) {
  try { JSON.parse(readFileSync(f, "utf8")) } catch (e) { problems.push(f + ": " + e.message) }
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1) }
console.log("ok: " + manifest.plugins.length + " plugins")
