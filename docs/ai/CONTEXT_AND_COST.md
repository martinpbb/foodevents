# Context, caching, and AI-credit policy

Verified on **2026-08-06**. This policy optimizes behavior without claiming an unmeasured percentage of token savings.

## Stable-prefix rule

Prompt caching benefits from repeated, identical prefixes. Keep these stable during a focused session:

- model and reasoning level;
- instruction hierarchy;
- enabled tool/MCP set;
- repository root and task boundary;
- task/ExecPlan/handoff paths.

Do not restate the complete architecture in each prompt, attach the same files repeatedly, or switch models/tools merely to retry. A change in model or tool configuration can require context reconstruction and may reduce cache reuse.

## Reading budget

Use progressive disclosure:

1. root and applicable scoped instructions;
2. task, ExecPlan, and latest handoff/delivery log;
3. branch, HEAD, status, changed-file names, and targeted diff;
4. directly relevant symbols/modules/tests/contracts/migrations;
5. one-hop callers and consumers;
6. broader repository exploration only when an unresolved question has evidence that requires it.

Search for a symbol, route, SQL object, contract, or test name before opening a large file. Do not reopen unchanged files unless a new question requires a different section.

## Output budget

- Keep plans and progress reports decision-oriented.
- Summarize command failures as command, exit status, failing target, and first actionable cause.
- Do not paste complete diffs, generated files, test logs, lockfiles, or large JSON payloads into chat.
- Persist durable task state in the existing ExecPlan/delivery log/final handoff rather than replaying it in every session.
- Final reports contain actual verification evidence, not narrated terminal history.

## Verification budget

- During implementation: run the narrowest affected test/typecheck/lint target.
- At a phase checkpoint: run affected-package or affected-domain gates named by the task.
- At final review: run only the broad gates required by repository policy or the ExecPlan.
- Do not rerun an unchanged expensive gate without a code/config/environment change that could affect its result.

## Session commands by surface

### Copilot in VS Code

- Start a new Chat session for a new unrelated task.
- Use `/compact` at a coherent checkpoint or when the context indicator is high.
- Use the context indicator and diagnostics rather than assuming Copilot CLI command parity. Use VS Code Cache Explorer when you need measured prompt-cache hit evidence.

### Copilot CLI

- `/context`: inspect current context usage.
- `/compact [focus]`: compact manually; the CLI can also compact automatically near its context limit.
- `/new`, `/clear`, or `/reset`: discard old task history.
- `/usage`: inspect session usage and AI-credit/token information.
- `/instructions` and `/env`: verify which instructions, skills, agents, and MCP servers were loaded.

### OpenAI Codex

- `/compact`: summarize a long session at a checkpoint.
- `/new`: start the next unrelated task cleanly.
- `/status`: inspect session/context/rate-limit state; do not assume Copilot CLI's `/context` command exists.
- `/usage`: inspect account usage where the active Codex surface supports it.

## Cost controls

- Use Copilot code completions and next-edit suggestions freely on paid plans; GitHub currently does not bill them as AI credits.
- Use Copilot Auto for ordinary work when adaptive routing is desirable; paid plans currently receive a 10% model-cost discount for Auto-selected models.
- Prefer Luna/fast models for mechanically bounded work, Terra/Sonnet for normal implementation, and Sol/Opus only after a concrete need is identified.
- Avoid broad autonomous cloud-agent tasks, Copilot `/fleet`, or multi-agent/subagent orchestration when one focused agent can complete the task.
- Treat Copilot code review as an additional paid review signal: it uses AI credits and GitHub Actions minutes.
- Codex plan consumption depends on model, context, reasoning, tools, retrieval, caching, and local/cloud execution. Prompt character count alone is not a reliable allowance estimate.

## Measurement

For representative tasks, record only lightweight evidence:

- model and reasoning level;
- number of sessions/retries;
- whether a handoff was needed;
- files intentionally inspected;
- targeted versus broad verification runs;
- AI credits or product usage shown by the relevant surface;
- task outcome and review defects.

Compare like-for-like tasks before changing the policy. Do not publish claimed savings without measured evidence.

