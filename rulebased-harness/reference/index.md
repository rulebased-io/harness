---
name: harness-audit-criteria
description: 하네스 평가 기준 인덱스 — 8 카테고리, 36항목. guide → criteria 순으로 점진적 참조.
type: reference
created: 2026-03-18
---

# Harness Audit Criteria

8 카테고리, 36개 평가 항목.

## 읽는 순서

```
index.md (이 파일)  →  guide-*.md (평가 가이드)  →  *.md (항목 정의)
```

1. **이 파일**(index.md): 전체 카테고리 구조와 점수 체계 파악
2. **guide-*.md**: 각 카테고리의 평가 방법론, 등급 기준, 개선 전략
3. ***.md** (guide가 링크): 개별 항목의 What, Why, How to Check, Fix, Reference

모든 항목을 읽을 필요 없이 guide 수준에서 평가를 수행할 수 있다.
항목별 상세가 필요할 때만 guide가 링크하는 criteria 파일을 참조한다.

## Scoring

- **Critical** (weight 3): 없으면 에이전트가 제대로 동작할 수 없는 항목
- **Important** (weight 2): 품질과 일관성에 직접 영향
- **Nice-to-have** (weight 1): 성숙도를 높이는 보조 항목

**등급**: A (90+), B (75+), C (60+), D (40+), F (<40)
**만점**: 50점 (critical 12 + important 22 + nice-to-have 16)

## Categories

| # | 카테고리 | 항목 수 | 만점 | 가이드 |
|---|----------|---------|------|--------|
| 1 | Context Engineering | 8 | 17 | [guide-context-engineering.md](guide-context-engineering.md) |
| 2 | Workflow | 5 | 5 | [guide-workflow.md](guide-workflow.md) |
| 3 | Constraints | 5 | 7 | [guide-constraints.md](guide-constraints.md) |
| 4 | Eval | 4 | 5 | [guide-eval.md](guide-eval.md) |
| 5 | Build & Test | 4 | 7 | [guide-build-and-test.md](guide-build-and-test.md) |
| 6 | Documentation | 4 | 6 | [guide-documentation.md](guide-documentation.md) |
| 7 | Security | 3 | 6 | [guide-security.md](guide-security.md) |
| 8 | Agent Autonomy | 3 | 4 | [guide-agent-autonomy.md](guide-agent-autonomy.md) |

## Summary Table

| ID | Item | Severity | Category |
|----|------|----------|----------|
| ctx-agents-exists | AGENTS.md exists | critical | Context Engineering |
| ctx-agents-build | Build commands in AGENTS.md | critical | Context Engineering |
| ctx-agents-arch | Architecture description | important | Context Engineering |
| ctx-agents-pitfalls | Common pitfalls | important | Context Engineering |
| ctx-agents-conventions | Coding conventions | important | Context Engineering |
| ctx-agents-persona | Agent persona/role | nice-to-have | Context Engineering |
| ctx-agents-boundaries | Boundaries/restrictions | important | Context Engineering |
| ctx-claude-exists | CLAUDE.md exists | important | Context Engineering |
| wf-specs-dir | specs directory | nice-to-have | Workflow |
| wf-tasks-dir | tasks directory | nice-to-have | Workflow |
| wf-backlog | backlog directory | nice-to-have | Workflow |
| wf-spec-template | spec template | nice-to-have | Workflow |
| wf-done-archive | done archive structure | nice-to-have | Workflow |
| cst-lint | Linter/formatter | important | Constraints |
| cst-precommit | Pre-commit hook | nice-to-have | Constraints |
| cst-type-safety | Type safety (strict mode) | important | Constraints |
| cst-editorconfig | .editorconfig | nice-to-have | Constraints |
| cst-commit-convention | Commit message convention | nice-to-have | Constraints |
| eval-dir | Eval dataset | nice-to-have | Eval |
| eval-log-config | Session log evaluation | nice-to-have | Eval |
| eval-autonomy-metric | Autonomy metric defined | nice-to-have | Eval |
| eval-quality-gate | Quality gate (CI pass) | important | Eval |
| build-test-script | Test script | critical | Build & Test |
| build-build-script | Build script | important | Build & Test |
| build-ci | CI/CD configuration | nice-to-have | Build & Test |
| build-lockfile | Package lock file | nice-to-have | Build & Test |
| docs-readme | README.md | important | Documentation |
| docs-gitignore | .gitignore | important | Documentation |
| docs-license | LICENSE file | nice-to-have | Documentation |
| docs-changelog | CHANGELOG or release notes | nice-to-have | Documentation |
| sec-no-secrets | Secrets excluded from repo | critical | Security |
| sec-gitignore-patterns | Sensitive file patterns blocked | important | Security |
| sec-dependency-audit | Dependency audit configured | nice-to-have | Security |
| auto-context-completeness | Context completeness | important | Agent Autonomy |
| auto-tool-config | MCP/Agent Skills configured | nice-to-have | Agent Autonomy |
| auto-memory-system | Persistent memory system | nice-to-have | Agent Autonomy |
