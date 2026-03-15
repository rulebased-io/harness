# 빌드 툴링 결정 - Vite / pnpm / 프로젝트 구조 정비

- **생성일**: 2026-03-15
- **상태**: todo
- **우선순위**: medium

## 현재 상태 분석

| 항목 | 현재 | 규모 |
|------|------|------|
| 소스 | ~1000줄 (5개 파일) | 소규모 |
| dist | 112KB (12개 파일) | 매우 가벼움 |
| 외부 runtime 의존성 | 0개 | Node.js 내장만 사용 |
| devDependencies | 6개 | jest, ts-jest, tsx, typescript, @types/* |
| 빌드 | tsc (~1초) | 빠름 |
| 패키지 매니저 | npm | |

## 판단

### Vite 번들러 → 불필요

- runtime 의존성이 0개 → 번들링할 것이 없음
- tsc로 1초 빌드 → 속도 이점 없음
- CLI + 라이브러리 모듈 → Vite는 웹앱/라이브러리 번들링에 더 적합
- dist 112KB → 단일 파일로 합칠 필요 없음
- **결론: tsc 유지. Vite 도입 불필요.**

### pnpm → 도입 권장

- strict dependency resolution → phantom dependency 방지
- 디스크 효율 (심볼릭 링크 기반)
- lockfile이 더 안정적
- CI에서 더 빠름
- 업계 표준 트렌드 (Vercel, Turborepo 등)
- **결론: pnpm으로 전환.**

### 추가 정비

- [ ] pnpm 전환 (npm → pnpm)
- [ ] engines에 pnpm 명시

## 수용 기준

- [ ] pnpm install + pnpm build + pnpm test 모두 통과
- [ ] package-lock.json 제거, pnpm-lock.yaml 생성
