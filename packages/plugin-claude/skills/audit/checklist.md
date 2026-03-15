# Harness Audit Checklist

## Context Engineering (핵심)

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| ctx-agents-exists | AGENTS.md 존재 | critical | `AGENTS.md` 파일 존재 여부 |
| ctx-agents-build | 빌드 명령어 포함 | critical | AGENTS.md에 npm/yarn/pnpm/make 등 명령어 |
| ctx-agents-arch | 아키텍처 설명 | important | AGENTS.md에 구조/계층/디렉토리 설명 |
| ctx-agents-pitfalls | 흔한 실수 방지 | important | AGENTS.md에 주의/금지/피해야 할 사항 |
| ctx-claude-exists | CLAUDE.md 존재 | important | `CLAUDE.md` 파일 존재 여부 |

## Workflow

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| wf-specs-dir | specs 폴더 | nice-to-have | `specs/` 또는 `spec/` 존재 |
| wf-tasks-dir | tasks 폴더 | nice-to-have | `tasks/` 또는 `task/` 존재 |

## Constraints

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| cst-lint | 린터/포맷터 | important | .eslintrc, biome.json 등 존재 |
| cst-precommit | Pre-commit 훅 | nice-to-have | .husky/, lefthook.yml 등 존재 |

## Eval

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| eval-dir | Eval 데이터셋 | nice-to-have | evals/ 또는 eval/ 존재 |

## Conventions

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| conv-editorconfig | .editorconfig | nice-to-have | 파일 존재 |
| conv-ts-strict | TS strict 모드 | important | tsconfig.json에 strict: true |

## Build & Test

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| build-test-script | 테스트 스크립트 | critical | package.json scripts.test 존재 |
| build-build-script | 빌드 스크립트 | important | package.json scripts.build 존재 |
| build-ci | CI/CD 설정 | nice-to-have | .github/workflows/ 등 존재 |

## Documentation

| ID | 항목 | 심각도 | 확인 방법 |
|----|------|--------|-----------|
| docs-readme | README.md | important | 파일 존재 |
| docs-gitignore | .gitignore | important | 파일 존재 |
