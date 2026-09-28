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
