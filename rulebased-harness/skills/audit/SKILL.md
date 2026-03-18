---
name: audit
description: Audits your project's harness engineering setup and assigns a score (36 items across 8 categories)
---

> **Plugin path**: The `CLAUDE_PLUGIN_PATH` value provided by the hook is the root of this plugin.
> Start by reading `${CLAUDE_PLUGIN_PATH}/reference/index.md` — it indexes all evaluation guides.
>
> **Reading order**: `index.md` → `guide-*.md` (methodology) → `*.md` (item details, only if needed)
>
> ```
> ${CLAUDE_PLUGIN_PATH}/reference/
> ├── index.md                        ← Start here: 8 categories, 36 items, scoring
> ├── guide-context-engineering.md     ← Evaluation guide (links to criteria)
> ├── guide-workflow.md
> ├── guide-constraints.md
> ├── guide-eval.md
> ├── guide-build-and-test.md
> ├── guide-documentation.md
> ├── guide-security.md
> ├── guide-agent-autonomy.md
> ├── context-engineering.md           ← Per-item criteria (What/Why/How/Fix)
> ├── workflow.md
> ├── constraints.md
> ├── eval.md
> ├── build-and-test.md
> ├── documentation.md
> ├── security.md
> └── agent-autonomy.md
> ```

Audits the current project's harness engineering setup.

## How to Audit

1. Read `${CLAUDE_PLUGIN_PATH}/reference/index.md` for the scoring system and 36-item summary
2. For each category, read the `guide-*.md` file for evaluation methodology and grade criteria
3. Check each item against the current project by reading files, checking directories, inspecting configs
4. If an item needs deeper understanding, follow the guide's link to the criteria file
5. Calculate the weighted score and convert to 0-100 scale

## Scoring

Each item has a severity that determines its weight:
- **Critical** (weight 3): AGENTS.md, build commands, test scripts, secrets exclusion
- **Important** (weight 2): Architecture, pitfalls, conventions, boundaries, linter, type safety, quality gate, context completeness, README, .gitignore, gitignore patterns
- **Nice-to-have** (weight 1): All other items

**Formula**: `score = (sum of passed weights / sum of all weights) × 100`
**Grades**: A (90+), B (75+), C (60+), D (40+), F (<40)

## Output

Present results as a per-category breakdown with pass/fail per item, category scores, and an overall grade. Provide specific fix suggestions for failed items referencing the guide's improvement strategy.

To auto-generate missing items, run `/rulebased:harness-recommend`.

$ARGUMENTS
