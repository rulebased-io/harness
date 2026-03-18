---
name: guide-constraints
description: 제약 조건 평가 가이드 — 5항목 평가 방법론, 에이전트 코드 품질 자동 보장
type: reference
created: 2026-03-18
---

# Constraints — 평가 가이드

에이전트가 생성한 코드의 품질을 자동으로 보장하는 아키텍처 제약을 평가한다.

> 항목별 상세 정의는 [constraints.md](constraints.md) 참조.

## 왜 중요한가

OpenAI 하네스 엔지니어링의 두 번째 기둥 "Architectural Constraints". Stripe는 모든 에이전트 PR이 CI(린트+테스트)를 통과해야 머지 가능하게 하여 주당 1,300+ PR을 안전하게 머지. 제약 없는 에이전트는 동작하지만 유지보수 불가능한 코드를 생산.

## 평가 항목 요약

| ID | Item | Severity | Weight |
|----|------|----------|--------|
| cst-lint | 린터/포매터 | important | 2 |
| cst-precommit | Pre-commit 훅 | nice-to-have | 1 |
| cst-type-safety | 타입 안전성 | important | 2 |
| cst-editorconfig | .editorconfig | nice-to-have | 1 |
| cst-commit-convention | 커밋 컨벤션 | nice-to-have | 1 |

**만점**: 7점 (important 4 + nice-to-have 3)

## 평가 방법

1. 린터 설정 파일 탐색: `.eslintrc*`, `eslint.config.*`, `biome.json`, `.prettierrc*`
2. Pre-commit 훅 설정: `.husky/`, `lefthook.yml`, `.pre-commit-config.yaml`
3. 타입 검사: `tsconfig.json`의 `strict: true`, `mypy.ini`, `pyproject.toml`
4. `.editorconfig` 파일 존재 확인
5. 커밋 컨벤션: `commitlint.config.*`, `.czrc`, AGENTS.md 내 커밋 규칙

## 등급 기준

- **A**: 5/5 — 린터 + 타입 + pre-commit + editorconfig + 커밋 컨벤션 완비
- **B**: important 항목 모두 통과 (린터 + 타입)
- **C**: 린터 또는 타입 중 하나만 존재
- **F**: 제약 조건 전무

## 개선 전략

1. **즉시**: `npx eslint --init` 또는 `npx @biomejs/biome init`
2. **단기**: `tsconfig.json`에 `"strict": true` 설정
3. **중기**: `npx husky init` + pre-commit에 lint-staged 연동
4. **장기**: commitlint + conventional commits 도입
