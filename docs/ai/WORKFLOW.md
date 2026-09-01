# Codex–Copilot workflow for Foodevents

## Canonical instruction hierarchy

1. Existing global Codex `AGENTS.md` for personal cross-repository defaults.
2. Existing repository-root `AGENTS.md` for Foodevents-wide architecture and engineering rules.
3. Existing scoped `AGENTS.md` files for application-specific rules.
4. Authoritative task file and ExecPlan for the current task.
5. Delivery log or final handoff for current execution state.
6. `.github/copilot-instructions.md` only as a concise Copilot bridge and safety summary.
7. `.github/instructions/*.instructions.md` only for narrow, high-risk file classes.
8. `.agents/skills/foodevents-handoff` only when a handoff workflow is relevant.

Never copy the full `AGENTS.md` architecture into Copilot instructions, prompt files, custom agents, or handoffs.

For cache and billing details, also follow `docs/ai/CONTEXT_AND_COST.md`.

## Context-expansion budget

Use this sequence for every session:

1. **Instructions:** root `AGENTS.md`, then only applicable scoped `AGENTS.md`.
2. **Current work:** authoritative task, current ExecPlan, latest handoff/delivery log.
3. **Repository state:** branch, HEAD, status, changed-file names, targeted diff.
4. **Direct modules:** symbols and files named by the task/handoff.
5. **One-hop dependencies:** callers, consumers, contracts, tests, migrations, and configuration directly connected to the change.
6. **Broader exploration:** only when a concrete unresolved question cannot be answered within steps 1–5.

Search before opening large files. Keep a short in-session list of already-read unchanged files and do not reopen them without a reason.

## Session boundaries

- One unrelated task = one new session.
- Keep the selected model, reasoning level, context tier, and tool set stable for the session unless evidence shows they are insufficient.
- Compact a long session at a coherent checkpoint: after plan approval, after implementation, or before final review.
- Do not rely on compaction as a substitute for an external handoff when switching products.

### Copilot VS Code

Use a new Chat session for a new task. Use `/compact` when the context indicator is high or after a completed phase. Prompt files are optional convenience commands and are public preview.

### Copilot CLI

- `/context` shows context use.
- `/compact [focus]` compresses history; automatic compaction also occurs near the limit.
- `/new`, `/clear`, or `/reset` starts a fresh conversation.
- `/usage` shows session statistics and AI-credit/token use.
- `/instructions` shows discovered instructions.
- `/env` shows loaded instructions, MCP servers, skills, agents, and related environment state.
- Do not run `/init` over the curated setup without reviewing the proposed changes.
- Avoid `/fleet`, custom subagents, or delegation for tightly coupled work unless parallelization is clearly separable and worth the additional usage.

### Codex

- `/compact` summarizes the conversation.
- `/new` starts a fresh chat.
- `/status` reports session/context/rate-limit information; Codex does not use Copilot CLI's `/context` command.
- `/usage` reports account usage where available.
- `/review` is suitable for a separate final review checkpoint.
- AGENTS discovery is built once per run/session, so launch from the repository root or the intended scoped working directory.

## Codex -> Copilot

1. Stop at a coherent checkpoint; do not leave a half-applied migration or undocumented contract change when avoidable.
2. Update the existing ExecPlan/delivery log/final handoff with outcomes and real verification.
3. Run the handoff state script.
4. Fill `docs/ai/HANDOFF_TEMPLATE.md` with only current high-value state.
5. In a fresh Copilot session, provide the task path and handoff. Do not paste the full architecture or logs.
6. Copilot validates Git state, states the exact next action, and continues.

## Copilot -> Codex

1. Run focused verification and record unresolved failures accurately.
2. Update the existing task records; do not create a Copilot-specific plan.
3. Generate the concise handoff with the shared skill.
4. Start a fresh Codex session at the repository root.
5. Provide the authoritative task path, ExecPlan path, and handoff. Ask Codex to validate repository evidence before broad review.
6. Reserve Codex Sol/high reasoning for architecture, security, migrations, difficult debugging, or final review; otherwise continue with Terra.

## Test cadence

### During implementation

Run the narrowest relevant unit, integration, typecheck, lint, or Playwright target. Re-run only after changes that can affect it.

### Phase checkpoint

Run the task-defined affected-package or affected-domain gates.

### Final checkpoint

Run the broad gates required by the task/ExecPlan and report exact evidence. Do not automatically run every repository gate for a documentation-only or narrowly scoped change unless repository policy requires it.

## Final report contract

Keep the final report concise:

- decision and outcome;
- changed areas;
- migrations/contracts/endpoints;
- verification actually run;
- unresolved risks or blockers;
- exact next action or scope stop.

