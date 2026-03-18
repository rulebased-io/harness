---
name: recommend
description: Recommends missing harness elements for your project and auto-generates them
---

> **Plugin path**: The `CLAUDE_PLUGIN_PATH` value provided by the hook is the root of this plugin.
> Read `${CLAUDE_PLUGIN_PATH}/reference/index.md` for the full audit criteria to base recommendations on.
> **Reading order**: `index.md` → `guide-*.md` → `*.md` (only if needed)

Audits the current project's harness state and recommends missing elements.

## Workflow

1. Read `${CLAUDE_PLUGIN_PATH}/reference/index.md` for the 36-item criteria
2. Check each item against the current project (same as audit)
3. For failed items, read the corresponding `guide-*.md` for the improvement strategy
4. Generate a recommendation list sorted by priority (critical → important → nice-to-have)
5. Items tagged [auto-fix] can be auto-generated with user consent

## Priority Mapping

- **High** (auto-fix): AGENTS.md, CLAUDE.md, .gitignore, specs/tasks directories
- **Medium** (auto-fix): Linter config, .editorconfig, CI workflow
- **Low** (manual): Eval dataset, autonomy metrics, memory system, changelog

## Execution

After presenting the recommendation list, ask the user which items to generate.
Only generate files for items the user has approved.

CLI alternative:
```bash
npx rulebased-harness recommend
npx rulebased-harness recommend --json
```

$ARGUMENTS
