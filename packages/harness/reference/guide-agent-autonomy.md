---
name: guide-agent-autonomy
description: 에이전트 자율성 평가 가이드 — 3항목 평가 방법론, 자율 작업 환경 구축
type: reference
created: 2026-03-18
---

# Agent Autonomy — 평가 가이드

에이전트가 사람의 개입 없이 자율적으로 작업을 완수할 수 있는 환경을 평가한다.

> 항목별 상세 정의는 [agent-autonomy.md](agent-autonomy.md) 참조.

## 왜 중요한가

Stripe Minions의 핵심은 "완전한 컨텍스트를 조립해 단일 LLM 콜로 CI 통과하는 PR 생산". Anthropic은 프롬프트·메모리·도구·데이터의 최적 조합을 "컨텍스트 엔지니어링"으로 정의. 자율성이 높을수록 사람의 개입 비용이 줄고, 에이전트의 처리량이 증가.

## 평가 항목 요약

> 가중치(W)의 정의는 [index.md](index.md) Summary Table이 SSOT이다.

| ID | Item | W |
|----|------|---|
| auto-context-completeness | 컨텍스트 완성도 | 2 |
| auto-tool-config | 도구 설정 (MCP/Skills) | 1 |
| auto-memory-system | 메모리 시스템 | 1 |

**만점**: 4점

## 평가 방법

1. **컨텍스트 완성도**: Context Engineering 카테고리의 ctx-* 항목 중 5개 이상 통과하면 자동 달성
2. **도구 설정**: `.claude/settings.json`에 MCP 서버, 또는 `skills/` 디렉토리에 SKILL.md 존재
3. **메모리 시스템**: `.claude/` 메모리 디렉토리, `memory/` 폴더, 또는 AGENTS.md에 학습 메커니즘 명시

## 등급 기준

- **A**: 3/3 — 완전한 컨텍스트 + 도구 + 메모리
- **B**: 컨텍스트 완성도 달성 + 도구 또는 메모리 중 1개
- **C**: 컨텍스트 완성도만 달성
- **F**: 컨텍스트 불완전 (ctx-* 5개 미만 통과)

## 개선 전략

1. **즉시**: Context Engineering 항목부터 채우기 (자동으로 completeness 달성)
2. **단기**: 필요한 MCP 서버 설정 또는 Agent Skills 설치
3. **중기**: 프로젝트 메모리 디렉토리 설정 및 피드백 기록 워크플로우 구축
4. **장기**: 세션 간 학습 → 하네스 자동 개선 루프 구축
