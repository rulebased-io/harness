---
name: guide-context-engineering
description: 컨텍스트 엔지니어링 평가 가이드 — 8항목 평가 방법론, 점수 산정, 개선 전략
type: reference
created: 2026-03-18
---

# Context Engineering — 평가 가이드

에이전트가 프로젝트를 이해하고 자율적으로 작업하기 위한 컨텍스트 품질을 평가한다.

> 항목별 상세 정의(What, Why, How to Check, Fix, Reference)는 [context-engineering.md](context-engineering.md) 참조.

## 왜 중요한가

OpenAI 하네스 엔지니어링의 첫 번째 기둥. Stripe는 "완전한 컨텍스트를 조립해 단일 LLM 콜로 PR 생산"하며, Shopify CEO는 "추가 정보 없이 풀 수 있을 만큼 충분한 컨텍스트로 문제를 정의하는 것"이 AI 활용의 핵심이라 정의. AGENTS.md는 이 컨텍스트의 중심 문서.

## 평가 항목 요약

| ID | Item | Severity | Weight |
|----|------|----------|--------|
| ctx-agents-exists | AGENTS.md 존재 | critical | 3 |
| ctx-agents-build | 빌드 커맨드 포함 | critical | 3 |
| ctx-agents-arch | 아키텍처 설명 | important | 2 |
| ctx-agents-pitfalls | 흔한 실수 목록 | important | 2 |
| ctx-agents-conventions | 코딩 컨벤션 | important | 2 |
| ctx-agents-persona | 에이전트 페르소나 | nice-to-have | 1 |
| ctx-agents-boundaries | 금지 행동/경계 | important | 2 |
| ctx-claude-exists | CLAUDE.md 존재 | important | 2 |

**만점**: 17점 (critical 6 + important 10 + nice-to-have 1)

## 평가 방법

1. AGENTS.md 파일 존재 여부 확인 → 없으면 critical 2개(6점) 즉시 실패
2. AGENTS.md 내용을 읽고 각 섹션(빌드, 아키텍처, 실수, 컨벤션, 경계) 존재 확인
3. CLAUDE.md 존재 확인
4. 페르소나 정의 확인 (AGENTS.md 상단에 역할/전문 분야 기술)

## 등급 기준

- **A**: 8/8 항목 통과 (모든 섹션이 구체적이고 코드 예시 포함)
- **B**: critical + important 항목 통과 (7/8)
- **C**: critical 항목 통과 + important 일부
- **F**: AGENTS.md 없음

## 개선 전략

1. **즉시**: `npx rulebased-harness init`으로 AGENTS.md 스캐폴딩 생성
2. **단기**: 빌드 커맨드, 아키텍처 트리, 흔한 실수 섹션 채우기
3. **중기**: 코딩 컨벤션에 코드 예시 추가, 금지 행동 목록 작성
4. **장기**: 페르소나 정의, 주기적 AGENTS.md 갱신 워크플로우 구축

## 참고 사례

- **GitHub 분석**: 2,500개 AGENTS.md에서 "페르소나 + 명확한 커맨드 + 경계 + 코드 예시"가 가장 효과적 패턴
- **Stripe**: 에이전트마다 완전한 컨텍스트를 조립해 원샷 PR 생산
- **Manus**: 에이전트 프레임워크를 4번 재구축하며 컨텍스트 완성도가 핵심임을 확인
