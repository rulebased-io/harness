---
name: constraints
description: 제약 조건 평가 항목 — 린터, 타입 안전성, pre-commit, 커밋 컨벤션
type: reference
created: 2026-03-18
---

# Constraints (5 items)

에이전트가 생성한 코드의 품질을 자동으로 보장하는 아키텍처 제약.

---

### cst-lint
- **Severity**: important (weight 2)
- **What**: 린터/포매터 설정 존재 여부
- **Why**: 에이전트가 생성한 코드가 프로젝트 스타일과 일치하는지 자동 검증. Stripe는 CI 통과가 PR 머지 조건.
- **How to Check**: `.eslintrc*`, `eslint.config.*`, `biome.json`, `.prettierrc*`, `deno.json` 등 존재
- **Fix**: `npx eslint --init` 또는 `npx @biomejs/biome init`
- **Reference**: [Stripe — Minions Part 1](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)

---

### cst-precommit
- **Severity**: nice-to-have (weight 1)
- **What**: Pre-commit 훅 설정 존재 여부
- **Why**: 커밋 전 린트/테스트를 강제하여 에이전트의 실수가 레포에 들어가는 것을 방지.
- **How to Check**: `.husky/`, `lefthook.yml`, `.pre-commit-config.yaml` 등 존재
- **Fix**: `npx husky init` 또는 `npx lefthook install`
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### cst-type-safety
- **Severity**: important (weight 2)
- **What**: 타입 안전성 설정 (TypeScript strict 또는 동등)
- **Why**: strict 모드는 에이전트가 생성한 코드의 타입 오류를 컴파일 타임에 잡아줌. 런타임 버그 감소.
- **How to Check**: `tsconfig.json`에 `"strict": true`, 또는 `mypy.ini`, `pyproject.toml`의 타입 검사 설정
- **Fix**: `tsconfig.json`에 `"strict": true` 추가
- **Reference**: [Anthropic — Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### cst-editorconfig
- **Severity**: nice-to-have (weight 1)
- **What**: .editorconfig 파일 존재 여부
- **Why**: 에디터/에이전트 간 들여쓰기, 줄바꿈 등 기본 포맷을 통일. 불필요한 diff 노이즈 방지.
- **How to Check**: 프로젝트 루트에 `.editorconfig` 파일 존재
- **Fix**: `.editorconfig` 파일 생성 (indent_style, indent_size, end_of_line 등)
- **Reference**: [Cursor — Agent Documentation](https://cursor.com/docs/agent/overview)

---

### cst-commit-convention
- **Severity**: nice-to-have (weight 1)
- **What**: 커밋 메시지 컨벤션 설정 여부
- **Why**: 일관된 커밋 메시지는 자동 CHANGELOG 생성과 에이전트의 git log 파악을 용이하게 함.
- **How to Check**: `commitlint.config.*`, `.czrc`, `package.json`의 commitlint 설정, 또는 AGENTS.md에 커밋 규칙 명시
- **Fix**: `npm install --save-dev @commitlint/cli @commitlint/config-conventional`
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)
