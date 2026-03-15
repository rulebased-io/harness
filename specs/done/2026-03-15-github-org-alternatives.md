# GitHub 오거니제이션 - rulebased 확보 불가 대안

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 상황

`github.com/rulebased` 오거니제이션을 확보하지 못함.
npm scope `@rulebased/*`와 도메인 `rulebased.io`는 보유 중.

## 대안 옵션

### 1. 유사 오거니제이션명 사용
- `rulebased-io`
- `rulebased-dev`
- `rulebased-ai`
- `rulebasedio`
- `rulebased-hq`

### 2. 개인 계정 하위에 레포
- `jungyoun/rulebased-harness`
- 마켓플레이스에서는 레포 경로만 필요하므로 오거니제이션 필수 아님

### 3. 기존 소유자에게 요청
- GitHub에서 상표/도메인 기반으로 organization name claim 가능
- https://support.github.com/contact → "Trademark or Name Squatting" 카테고리
- `rulebased.io` 도메인 보유가 근거가 될 수 있음

### 4. GitHub 이름과 npm scope 분리
- npm: `@rulebased/harness` (확보 완료)
- GitHub: `rulebased-io/harness` (대체)
- 플러그인명/브랜드에는 영향 없음

## 판단 포인트

- GitHub org name은 플러그인 사용자에게 거의 노출되지 않음 (설치 시 한 번만)
- npm scope와 도메인이 브랜드 핵심
- GitHub name claim 절차 소요 시간 불확실
