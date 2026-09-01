# Foodevents repository guidance

Foodevents is a frontend-first React application focused on articles, events, and related content.

The application is currently deployed as a static site through GitHub Pages.
There is currently no application backend or database.

This file contains durable repository-wide rules.
Task-specific requirements belong in `docs/codex/tasks/`.

## Core workflow

1. Read the current task first.
2. Inspect Git status and only the files directly relevant to the task.
3. Reuse existing components, utilities, data structures, styling patterns, and conventions.
4. Make the smallest change that satisfies the task.
5. Run focused validation during implementation.
6. Run broader validation only when required before completion.
7. Record concise implementation state in `docs/notes/` when the task changes the repository.
8. Stop when the requested acceptance criteria are satisfied.

## Context and token discipline

- Do not perform repository-wide exploration unless the task genuinely requires it.
- Search for components, routes, data keys, CSS classes, or symbols before opening large files.
- Read only directly relevant files first.
- Expand into adjacent files only when concrete evidence requires it.
- Do not repeatedly reopen unchanged files already understood in the current session.
- Do not copy full task specifications into plans, notes, or chat responses.
- Do not paste full diffs, logs, generated files, or large JSON files into task notes.
- Prefer existing task and handoff documents as cached context instead of rediscovering completed work.
- Run the narrowest useful validation while iterating.
- Avoid repeated full builds or full lint runs unless a change requires them.
- Stop at the current task boundary.

## Architecture

Foodevents is currently a client-side React application.

Preserve the existing project structure and package manager unless a task explicitly requires an architectural change.

Do not introduce a backend, database, server runtime, ORM, authentication system, or server-side framework merely as preparation for possible future functionality.

Prefer existing project dependencies before adding new packages.

Avoid speculative abstractions and infrastructure.

## Content and data

Articles, events, site configuration, and other structured content should follow existing repository conventions.

Before changing a data structure:

1. find its current consumers;
2. preserve backward compatibility where practical;
3. update all directly affected consumers;
4. validate the rendered result.

Do not redesign content schemas unless required by the task.

## GitHub Pages

The production application is deployed through GitHub Pages.

Changes must remain compatible with static hosting unless the task explicitly changes the deployment architecture.

Pay particular attention to:

- asset paths;
- base paths;
- client-side routing;
- refresh/deep-link behavior;
- build output;
- environment configuration.

Do not assume server-side runtime capabilities exist on GitHub Pages.

## Security and secrets

Never commit credentials, private API keys, access tokens, passwords, service secrets, or private configuration.

Client-side code must never contain secrets.

Any environment variable exposed to the React/Vite client bundle must be treated as public.

In particular, `VITE_*` variables are compiled into browser-accessible JavaScript and are not suitable for secrets.

GitHub Actions or GitHub Environment secrets may be used for CI/deployment operations, but a secret becomes public if it is injected into the frontend build output.

If functionality requires a true server-side secret, do not emulate security in the frontend. Record that a server-side or external trusted component is required.

## Scope discipline

Do not:

- perform unrelated refactoring;
- rename unrelated files;
- reformat unrelated code;
- upgrade dependencies without a task requirement;
- introduce architecture for hypothetical future features;
- fix unrelated defects automatically.

Record unrelated findings separately.

Every meaningful changed file should be explainable by the current task.

## Validation

During implementation, prefer focused checks for the changed area.

Before declaring completion, run the checks required by the task and relevant repository scripts, commonly:

- targeted tests where available;
- lint for affected work;
- build when deployment behavior could be affected;
- `git diff --check`.

Do not claim a command passed unless it actually ran successfully.

Clearly distinguish:

- IMPLEMENTED
- TESTED
- VERIFIED
- BLOCKED
- NOT RUN

## Handoff

For work continuing in another agent session, use the `foodevents-handoff` skill.

A handoff should contain only:

- current task;
- branch and HEAD;
- meaningful changed files;
- completed work;
- important decisions;
- verification actually run;
- blockers or remaining work;
- one exact next action.

Do not include complete logs, full diffs, source dumps, or chat transcripts.