# Foodevents Copilot instructions

Follow the repository-root `AGENTS.md` as the authoritative project guidance.

## Start of task

1. Run:
   - `git status --short --branch`
   - `git rev-parse --short HEAD`
2. Read the current task under `docs/codex/tasks/` when one is provided.
3. Read the latest relevant `docs/notes/` handoff only when continuing existing work.
4. Search for relevant components, routes, data keys, CSS classes, or symbols.
5. Open only directly relevant files first.

Do not perform a broad repository scan by default.

## Project architecture

Foodevents is currently a frontend React application deployed as a static site through GitHub Pages.

Do not assume the existence of:

- a backend;
- a database;
- server-side sessions;
- server-side secrets;
- API infrastructure;
- migrations;
- workers.

Do not introduce these unless explicitly required by the task.

Reuse existing React, styling, content, routing, and data patterns before creating new abstractions.

## Context efficiency

- Do not repeatedly reopen unchanged files.
- Do not inspect unrelated files because the working tree is dirty.
- Search before reading large files.
- Prefer targeted diffs instead of full repository diffs.
- Keep terminal output concise.
- Do not repeat project architecture in every response.
- Do not reproduce task specifications in notes.
- Run focused checks while iterating.
- Run broad validation only at the appropriate completion checkpoint.
- Stop when the task is complete.

## GitHub Pages and security

Preserve static GitHub Pages compatibility.

Never expose secrets to client-side JavaScript.

Treat every value available through `VITE_*` as public.

GitHub Environment or Actions secrets are safe only while used within trusted CI operations.
If their values are injected into the React build, they are no longer secret.

Do not implement functionality requiring private credentials entirely in browser code.

## Package management

Use the package manager and scripts already defined by the repository.

Prefer existing package scripts over direct tool invocation.

Do not introduce another package manager.

## Completion

Report:

- what changed;
- important decisions;
- verification actually run;
- anything blocked or not run.

For continued work, use:

`node .agents/skills/foodevents-handoff/scripts/collect-state.mjs --format markdown`

Keep handoffs concise.