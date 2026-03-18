---
name: guide-workflow
description: 워크플로우 평가 가이드 — 5항목 평가 방법론, spec-driven 작업 흐름
type: reference
created: 2026-03-18
---

# Workflow — 평가 가이드

에이전트의 체계적인 작업 계획과 추적을 위한 워크플로우 구조를 평가한다.

> 항목별 상세 정의는 [workflow.md](workflow.md) 참조.

## 왜 중요한가

OpenAI 하네스 엔지니어링에서 "스펙을 먼저 작성하고, 에이전트가 실행한다"가 핵심 패턴. Martin Fowler는 "스펙·품질 검증·워크플로우 가이드가 하네스이며, 이를 구축·유지하는 것이 사람의 역할"이라 분석. 구조화된 워크플로우 없이는 에이전트가 맥락 없이 임의로 작업하게 됨.

## 평가 항목 요약

> 가중치(W)의 정의는 [index.md](index.md) Summary Table이 SSOT이다.

| ID | Item | W |
|----|------|---|
| wf-specs-dir | specs 디렉토리 | 1 |
| wf-tasks-dir | tasks 디렉토리 | 1 |
| wf-backlog | backlog 디렉토리 | 1 |
| wf-spec-template | spec 템플릿 | 1 |
| wf-done-archive | 완료 아카이브 | 1 |

**만점**: 5점

## 평가 방법

1. 프로젝트 루트에서 `specs/`, `spec/`, `tasks/`, `task/` 디렉토리 존재 확인
2. `specs/backlog/` 또는 `backlog/` 존재 확인
3. `specs/` 또는 `templates/` 하위에 템플릿 파일 존재 확인
4. `specs/done/` 또는 `tasks/done/` 아카이브 디렉토리 존재 확인

## 등급 기준

- **A**: 5/5 — 완전한 spec→todo→done 플로우 + 템플릿
- **B**: 3-4/5 — specs + tasks + 하나 이상의 보조 구조
- **C**: 1-2/5 — 기본 디렉토리만 존재
- **F**: 워크플로우 구조 전무

## 개선 전략

1. **즉시**: `mkdir -p specs/todo specs/done specs/backlog tasks/todo tasks/done`
2. **단기**: spec 템플릿 생성 (제목, 목적, 요구사항, 완료 조건)
3. **중기**: AGENTS.md에 워크플로우 규칙 명시 (새 작업 → spec 작성 → task 도출 → 구현)
