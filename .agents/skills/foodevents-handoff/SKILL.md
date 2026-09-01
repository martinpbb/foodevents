---
name: foodevents-handoff
description: Create a concise repository handoff when pausing, resuming, or transferring a Foodevents development task between agent sessions.
---

# Foodevents handoff

Use this skill when work is paused, resumed, transferred between agents, or continued in a new session.

The objective is to preserve useful task state without forcing the next agent to rediscover the repository.

## Source hierarchy

Use, in this order:

1. current Git state;
2. authoritative task file;
3. latest relevant note or handoff;
4. directly relevant implementation files.

Current repository evidence takes precedence over stale prose.

## Collect Git state

From the repository root, use the basic command:

```powershell
node .agents/skills/foodevents-handoff/scripts/collect-state.mjs --format markdown
```

When transferring work between agents or when task metadata is known, use:

```powershell
node .agents/skills/foodevents-handoff/scripts/collect-state.mjs `
  --from Codex `
  --to Copilot `
  --task docs/codex/tasks/example.md `
  --handoff docs/notes/example-result.md
```