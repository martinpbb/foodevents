#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { Buffer } from "node:buffer";
import console from "node:console";

const root = resolve(process.argv[2] ?? process.cwd());
const atRoot = (path) => resolve(root, path);

const requiredGenerated = [
  ".github/copilot-instructions.md",
  ".github/instructions/database-migrations.instructions.md",
  ".github/instructions/contracts-api.instructions.md",
  ".github/instructions/tests.instructions.md",
  ".agents/skills/foodevents-handoff/SKILL.md",
  ".agents/skills/foodevents-handoff/scripts/collect-state.mjs",
  "docs/ai/WORKFLOW.md",
  "docs/ai/HANDOFF_TEMPLATE.md",
  "docs/ai/SURFACE_SUPPORT.md",
  "docs/ai/MODEL_ROUTING.md",
  "docs/ai/CONTEXT_AND_COST.md",
  "docs/ai/MCP_POLICY.md",
];

const expectedExistingAgents = [
  "AGENTS.md",
  "apps/admin/AGENTS.md",
  "apps/admin-api/AGENTS.md",
  "apps/storefront/AGENTS.md",
  "apps/storefront-api/AGENTS.md",
  "apps/commerce-worker/AGENTS.md",
  "apps/public-projection-worker/AGENTS.md",
  "apps/chat-agent/AGENTS.md",
  "apps/chat-widget/AGENTS.md",
];

let errors = 0;
let warnings = 0;

for (const path of requiredGenerated) {
  if (!existsSync(atRoot(path))) {
    console.error(`ERROR missing generated file: ${path}`);
    errors += 1;
  }
}

for (const path of expectedExistingAgents) {
  if (!existsSync(atRoot(path))) {
    console.warn(`WARN expected existing instruction file not found: ${path}`);
    warnings += 1;
  }
}

const copilotInstructions = atRoot(".github/copilot-instructions.md");
if (existsSync(copilotInstructions)) {
  const text = readFileSync(copilotInstructions, "utf8");
  if (/^\s*@[^\s]+/m.test(text)) {
    console.warn("WARN @file includes are not portable across every Copilot surface; keep the bridge self-contained.");
    warnings += 1;
  }
  if (Buffer.byteLength(text, "utf8") > 12000) {
    console.warn("WARN copilot-instructions.md exceeds 12 KB; review for repeated or task-specific context.");
    warnings += 1;
  }
}

if (existsSync(atRoot(".github/skills"))) {
  console.warn("WARN .github/skills exists. Avoid duplicating the canonical .agents/skills handoff skill.");
  warnings += 1;
}

if (existsSync(atRoot(".github/agents"))) {
  console.warn("WARN custom Copilot agents are installed. Confirm they do not duplicate or conflict with AGENTS.md.");
  warnings += 1;
}

console.log(`AI setup validation complete for ${root}: ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);

