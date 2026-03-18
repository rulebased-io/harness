---
name: init
description: Initializes the harness structure for the current project (AGENTS.md, specs/, tasks/, etc.)
---

> **Plugin path**: The `CLAUDE_PLUGIN_PATH` value provided by the hook is the root of this plugin.
> Read `${CLAUDE_PLUGIN_PATH}/reference/index.md` for the full list of harness elements to initialize.
> **Reading order**: `index.md` → `guide-*.md` → `*.md` (only if needed)

Initializes the harness engineering structure for the current project.

## What to Create

Based on the 36-item audit criteria in `${CLAUDE_PLUGIN_PATH}/reference/index.md`, initialize:

### Critical (must create)
- `AGENTS.md` — Agent rules with: build commands, architecture, pitfalls, conventions, boundaries
- `CLAUDE.md` — References AGENTS.md
- Test script in `package.json` (if missing)

### Important (should create)
- `.gitignore` with secret exclusion patterns (`.env*`, `*.key`, `*.pem`)
- `README.md` (if missing)

### Workflow structure
- `specs/todo/`, `specs/done/`, `specs/backlog/`
- `tasks/todo/`, `tasks/done/`

## Execution

Existing files are skipped. AGENTS.md contains TODO markers to fill in.

CLI alternative:
```bash
npx rulebased-harness init
```

$ARGUMENTS
