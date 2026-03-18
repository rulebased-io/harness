---
name: eval
description: 평가 체계 항목 — eval 데이터셋, 세션 로그 평가, 자율성 지표, 품질 게이트
type: reference
created: 2026-03-18
---

# Eval (4 items)

에이전트 행동과 결과물의 품질을 측정하는 평가 체계.

---

### eval-dir
- **Severity**: nice-to-have (weight 1)
- **What**: Eval 데이터셋 디렉토리 존재 여부
- **Why**: 에이전트의 반복 가능한 평가를 위한 입력/기대 출력 데이터셋. 하네스 변경 시 회귀 테스트 역할.
- **How to Check**: `evals/`, `eval/`, 또는 `tests/evals/` 디렉토리 존재
- **Fix**: `mkdir -p evals` 후 평가 시나리오 파일 작성
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### eval-log-config
- **Severity**: nice-to-have (weight 1)
- **What**: 세션 로그 평가 설정 존재 여부
- **Why**: 에이전트 세션의 자율성, 도구 다양성, 작업 완성도를 정량 측정. 하네스 개선의 피드백 루프.
- **How to Check**: hooks에 eval-log 관련 설정, 또는 eval-log 스크립트 존재
- **Fix**: Stop 훅에 eval-log 평가 실행 추가
- **Reference**: [Manus — Context Engineering for AI Agents](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)

---

### eval-autonomy-metric
- **Severity**: nice-to-have (weight 1)
- **What**: 에이전트 자율성 측정 기준 정의 여부
- **Why**: Manus는 KV-cache 히트율을, Stripe는 원샷 성공률을 핵심 지표로 삼음. 측정하지 않으면 개선할 수 없음.
- **How to Check**: AGENTS.md 또는 eval 설정에 자율성/효율성 목표 지표 정의 존재
- **Fix**: 목표 지표 정의 (예: 사람 개입 비율 < 20%, 원샷 CI 통과율 > 80%)
- **Reference**: [Manus — Context Engineering for AI Agents](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)

---

### eval-quality-gate
- **Severity**: important (weight 2)
- **What**: 품질 게이트 설정 (CI 통과 필수 등)
- **Why**: Stripe는 모든 에이전트 PR이 CI를 통과해야 머지 가능. 자동화된 품질 보장의 마지막 방어선.
- **How to Check**: GitHub branch protection, CI required checks, 또는 AGENTS.md에 "테스트 통과 후 커밋" 규칙 명시
- **Fix**: GitHub branch protection에 required status checks 설정, 또는 AGENTS.md에 품질 규칙 명시
- **Reference**: [Stripe — Minions Part 1](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)
