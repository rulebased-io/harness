---
name: agent-autonomy
description: 에이전트 자율성 평가 항목 — 컨텍스트 완성도, 도구 설정, 메모리 시스템
type: reference
created: 2026-03-18
---

# Agent Autonomy (3 items)

에이전트가 사람의 개입 없이 자율적으로 작업을 완수할 수 있는 환경.

---

### auto-context-completeness
- **Weight**: → index.md 참조
- **What**: 에이전트가 추가 질문 없이 작업 가능한 컨텍스트 완성도
- **Why**: Stripe Minions의 핵심은 "완전한 컨텍스트를 조립해 단일 LLM 콜로 PR 생산". Shopify CEO도 "추가 정보 없이 풀 수 있을 만큼 충분한 컨텍스트"를 강조.
- **How to Check**: AGENTS.md에 빌드 방법 + 아키텍처 + 컨벤션 + 제약 + 실수 방지가 모두 포함되어 있는지 (ctx-* 항목 5개 이상 통과)
- **Fix**: 위 ctx-* 항목들을 모두 충족시키면 자동으로 달성
- **Reference**: [Stripe — Minions Part 2](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2), [Shopify — Tobi Lutke on context engineering](https://x.com/tobi/status/1909251946235437514)

---

### auto-tool-config
- **Weight**: → index.md 참조
- **What**: MCP 서버 또는 Agent Skills 설정 존재 여부
- **Why**: 에이전트의 능력을 외부 도구(DB, API, 파일 시스템 등)로 확장. Anthropic Agent Skills는 크로스 플랫폼 호환 오픈 스탠다드.
- **How to Check**: `.claude/settings.json`에 MCP 서버 설정, 또는 `skills/` 디렉토리에 SKILL.md 파일 존재
- **Fix**: 필요한 MCP 서버 설정 추가 또는 Agent Skills 설치
- **Reference**: [Anthropic — Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

---

### auto-memory-system
- **Weight**: → index.md 참조
- **What**: 지속적 메모리/학습 시스템 존재 여부
- **Why**: 세션 간 학습을 유지하여 반복적인 컨텍스트 재설정 방지. Anthropic의 컨텍스트 엔지니어링에서 메모리는 프롬프트·도구와 함께 핵심 토큰 구성 요소.
- **How to Check**: `.claude/` 메모리 디렉토리, `memory/` 폴더, 또는 AGENTS.md에 학습/피드백 메커니즘 명시
- **Fix**: 프로젝트 메모리 디렉토리 설정 또는 피드백 기록 워크플로우 구축
- **Reference**: [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
