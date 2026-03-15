# @rulebased/harness

A harness-building tool for AI agents. Assess how well your project's harness engineering is set up, get recommendations for missing elements, and auto-generate them.

> **Harness Engineering** = A system design approach that constrains agent behavior (Constraints), provides context (Context), and evaluates results (Eval). See [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/).

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
```

## Skills

### harness-audit

Audits how well your project's harness is set up. Checks 17 items and assigns a score from 0 to 100.

```bash
npx rulebased-harness audit

# Example output:
# Score: 77/100 (B)
# Passed: 12/17 | Critical: 3/3
#
# [FAIL] No linter/formatter configuration found
#   Fix: Add a configuration file for ESLint, Prettier, Biome, etc.
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

### harness-init

Initializes the harness structure for your project.

```bash
npx rulebased-harness init

# Files created:
# + AGENTS.md        (Agent rules - includes TODO markers)
# + CLAUDE.md        (References AGENTS.md)
# + specs/todo/      (Spec workflow)
# + specs/done/
# + specs/backlog/
# + tasks/todo/      (Task workflow)
# + tasks/done/
# + .gitignore       (If not already present)
```

Existing files are skipped. Use `--force` to overwrite them.

### harness-recommend

Recommends missing harness elements and can auto-generate them.

```bash
npx rulebased-harness recommend

# Example output:
# ## Harness Recommendations (5 items)
#
# ### High Priority
# - Generate AGENTS.md [auto-fix] (medium)
# - Add test script (small)
#
# ### Medium Priority
# - Add linter/formatter configuration (small)
# - Write README.md (small)
```

## Project Structure

```
@rulebased/harness (pnpm monorepo)
├── skills/                      # Skills (skills.sh + Claude Code)
│   ├── audit/SKILL.md
│   ├── init/SKILL.md
│   └── recommend/SKILL.md
├── packages/
│   ├── core/                    # @rulebased/core - Core logic
│   ├── cli/                     # @rulebased/cli - CLI
│   └── plugin-claude/           # @rulebased/plugin-claude - Claude Code plugin
├── specs/                       # Spec workflow
├── tasks/                       # Task workflow
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

## License

MIT
