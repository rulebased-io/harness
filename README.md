# @rulebased/harness

A harness-building tool for AI agents. Assess how well your project's harness engineering is set up, get recommendations for missing elements, and auto-generate them.

> **Harness Engineering** = A system design approach that constrains agent behavior (Constraints), provides context (Context), and evaluates results (Eval). See [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/).

[한국어](README.ko.md)

## Installation

### skills.sh (Recommended)

Supports 40+ agents (Claude Code, Cursor, Copilot, etc.)

```bash
# Install all skills
npx skills add rulebased-io/harness

# Install a specific skill only
npx skills add rulebased-io/harness --skill harness-audit
```

### Claude Code Plugin

```bash
# Inside Claude Code
/plugin install rulebased@marketplace-name
```

### CLI

```bash
npx rulebased-harness audit
npx rulebased-harness init
npx rulebased-harness recommend
npx rulebased-harness score
npx rulebased-harness eval-log
```

## Skills

### harness-audit

Audits how well your project's harness is set up. Checks 17 items and assigns a score from 0 to 100.

```bash
npx rulebased-harness audit
npx rulebased-harness audit --json
```

**Checklist items:**

| Category | Items Checked |
|----------|---------------|
| Context Engineering | AGENTS.md, CLAUDE.md, build commands, architecture, common pitfalls |
| Constraints | Linter/formatter, pre-commit hooks |
| Eval | Eval datasets |
| Workflow | specs/, tasks/ directories |
| Build | Test/build scripts, CI/CD |
| Conventions | .editorconfig, TypeScript strict |
| Docs | README.md, .gitignore |

### harness-score

Per-category detailed score report. Shows how well each harness area is implemented.

```bash
npx rulebased-harness score

# Example output:
# ## Harness Score Report
#
# [################----]  **81/100 (B)**
#
# ### Context Engineering  [####################]  100/100  (5/5)
# - [PASS] AGENTS.md exists
# - [PASS] AGENTS.md includes build commands
# ...
#
# ### Constraints  [--------------------]  0/100  (0/2)
# - [FAIL] Linter/formatter configuration exists
#   -> Add a configuration file for ESLint, Prettier, Biome, or similar.
```

### harness-init

Initializes the harness structure for your project.

```bash
npx rulebased-harness init
npx rulebased-harness init --preset minimal
npx rulebased-harness init --force
```

Creates: `AGENTS.md`, `CLAUDE.md`, `.harness.json`, `specs/`, `tasks/`, `.gitignore`

**Presets:**
- `standard` (default) — all checks enabled
- `minimal` — essential checks only (AGENTS.md + build commands)

Customize via `.harness.json`:
```json
{
  "preset": "standard",
  "checks": { "disable": ["eval-dir", "cst-precommit"] }
}
```

### harness-recommend

Recommends missing harness elements and can auto-generate them.

```bash
npx rulebased-harness recommend
npx rulebased-harness recommend --json
```

### harness-eval-log

Evaluates a Claude Code conversation transcript against harness compliance.

```bash
npx rulebased-harness eval-log
npx rulebased-harness eval-log --file /path/to/transcript.jsonl
```

**Evaluation criteria:**
- Human turn count (fewer = more autonomous)
- Autonomy ratio (agent turns / total turns)
- Build/test execution (Bash tool usage)
- Tool diversity (number of unique tools used)
- Session duration

**Auto-trigger:** Runs automatically via Stop hook when a session with 10+ agent turns ends.

## Project Structure

```
@rulebased/harness (pnpm monorepo)
├── skills/                      # Skills (skills.sh + Claude Code)
│   ├── audit/SKILL.md
│   ├── score/SKILL.md
│   ├── init/SKILL.md
│   ├── recommend/SKILL.md
│   └── eval-log/SKILL.md
├── packages/
│   ├── core/                    # @rulebased/core - Auditor, recommender, initializer, transcript parser
│   ├── cli/                     # @rulebased/cli - CLI entry point
│   └── plugin-claude/           # @rulebased/plugin-claude - Claude Code plugin (hooks, agents)
├── specs/                       # Spec workflow (todo/done/backlog)
├── tasks/                       # Task workflow (todo/done)
└── docs/                        # Documentation
```

## Development

```bash
pnpm install
pnpm build
pnpm test          # 26 tests
```

## Scoring System

| Severity | Weight | Examples |
|----------|--------|----------|
| Critical | 3 | AGENTS.md exists, build commands, test scripts |
| Important | 2 | Architecture description, linter, TypeScript strict |
| Nice-to-have | 1 | Workflow directories, eval, pre-commit |

Grades: A (90+), B (75+), C (60+), D (40+), F

## Roadmap

- [ ] Onboarding wizard — interactive setup by project type (frontend, backend, fullstack)
- [ ] Built-in templates — per-project-type AGENTS.md, hooks, and audit presets
- [ ] Harness import — bring harness setup from another project, diff and apply
- [ ] Multi-agent plugins — Codex, Cursor support
- [ ] npm publish — `@rulebased/core` and `@rulebased/cli`

## License

MIT
