---
name: guide-eval
description: 평가 체계 가이드 — 4항목 평가 방법론, 에이전트 품질 측정과 피드백 루프
type: reference
created: 2026-03-18
---

# Eval — 평가 가이드

에이전트 행동과 결과물의 품질을 측정하는 평가 체계를 점검한다.

> 항목별 상세 정의는 [eval.md](eval.md) 참조.

## 왜 중요한가

OpenAI 하네스 엔지니어링의 세 번째 기둥 "Eval System". Manus는 KV-cache 히트율을 핵심 프로덕션 지표로, Stripe는 원샷 CI 통과율을 측정. "측정하지 않으면 개선할 수 없다" — 평가 체계가 하네스 개선의 피드백 루프.

## 평가 항목 요약

| ID | Item | Severity | Weight |
|----|------|----------|--------|
| eval-dir | Eval 데이터셋 | nice-to-have | 1 |
| eval-log-config | 세션 로그 평가 | nice-to-have | 1 |
| eval-autonomy-metric | 자율성 지표 정의 | nice-to-have | 1 |
| eval-quality-gate | 품질 게이트 | important | 2 |

**만점**: 5점 (important 2 + nice-to-have 3)

## 평가 방법

1. `evals/`, `eval/`, `tests/evals/` 디렉토리 존재 확인
2. hooks 설정에 eval-log 관련 설정 존재 확인
3. AGENTS.md 또는 eval 설정에 자율성/효율성 목표 지표 정의 확인
4. GitHub branch protection, CI required checks, 또는 AGENTS.md에 품질 규칙 명시 확인

## 등급 기준

- **A**: 4/4 — 데이터셋 + 로그 평가 + 지표 + 품질 게이트 완비
- **B**: 품질 게이트 + 1개 이상 보조 항목
- **C**: 품질 게이트만 존재
- **F**: 평가 체계 전무

## 개선 전략

1. **즉시**: AGENTS.md에 "테스트 통과 후 커밋" 규칙 명시
2. **단기**: `mkdir -p evals` + 기본 평가 시나리오 작성
3. **중기**: Stop 훅에 eval-log 자동 실행 연동
4. **장기**: 자율성 지표 정의 및 주기적 측정 (사람 개입 비율, 원샷 성공률)
