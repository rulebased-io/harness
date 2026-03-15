# 플러그인 이름 변경 - 배포용 이름 결정

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 내용

현재 이름 `harness-plugin`이 배포 시 너무 짧고 일반적임. npm/플러그인 마켓에서 충돌 가능성 있음.
더 구체적이고 고유한 이름이 필요.

## 보유 자산

- 도메인: `rulebased.io`
- npm scope: `@rulebased/*` (선점 완료)

## 후보 아이디어

### @rulebased 스코프 활용

- `@rulebased/harness`
- `@rulebased/harness-plugin`
- `@rulebased/agent-harness`
- `@rulebased/cli`

### 플러그인명 `rulebased` + 스킬명에 harness prefix (사용자 제안)

- 플러그인명: `rulebased`
- 커맨드: `/rulebased:harness-init`, `/rulebased:harness-audit`, `/rulebased:harness-recommend`
- 장점: rulebased 브랜드 아래 harness 외 다른 스킬도 확장 가능 (예: `/rulebased:lint`, `/rulebased:review`)
- npm: `@rulebased/plugin` 또는 `@rulebased/claude-plugin`

### 기타

- `claude-harness-engineering`
- `ai-harness-toolkit`
- `agent-harness-plugin`

## 판단 포인트

- `@rulebased/*` 스코프를 활용하면 npm 충돌 없음 + 브랜딩 통일
- Claude Code 플러그인 네임스페이스 (slash 커맨드 prefix가 됨: `/rulebased:audit` vs `/harness:audit`)
- 너무 길면 불편 — scoped name과 플러그인 display name을 다르게 할 수 있는지 확인 필요
- rulebased.io 도메인과 연계한 문서/홈페이지 활용 가능성
