---
name: guide-build-and-test
description: 빌드 및 테스트 평가 가이드 — 4항목 평가 방법론, 에이전트 검증 인프라
type: reference
created: 2026-03-18
---

# Build & Test — 평가 가이드

에이전트가 코드를 빌드하고 검증할 수 있는 인프라를 평가한다.

> 항목별 상세 정의는 [build-and-test.md](build-and-test.md) 참조.

## 왜 중요한가

테스트 스크립트는 에이전트 자율 작업의 최소 조건. OpenAI 하네스 엔지니어링에서 빌드/테스트 커맨드는 AGENTS.md의 필수 요소. Stripe Minions는 "CI 통과하는 PR"을 에이전트의 성공 기준으로 정의 — 빌드/테스트 인프라 없이는 에이전트가 자신의 변경을 검증할 방법이 없음.

## 평가 항목 요약

| ID | Item | Severity | Weight |
|----|------|----------|--------|
| build-test-script | 테스트 스크립트 | critical | 3 |
| build-build-script | 빌드 스크립트 | important | 2 |
| build-ci | CI/CD 설정 | nice-to-have | 1 |
| build-lockfile | Lock 파일 | nice-to-have | 1 |

**만점**: 7점 (critical 3 + important 2 + nice-to-have 2)

## 평가 방법

1. `package.json`의 `scripts.test` 존재 확인 (또는 Makefile, Cargo.toml 등)
2. `package.json`의 `scripts.build` 존재 확인
3. `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile` 등 CI 설정 확인
4. `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` 등 lock 파일 확인

## 등급 기준

- **A**: 4/4 — 테스트 + 빌드 + CI + lock 완비
- **B**: critical + important 통과 (테스트 + 빌드)
- **C**: 테스트 스크립트만 존재
- **F**: 테스트 스크립트 없음

## 개선 전략

1. **즉시**: `package.json`에 test, build 스크립트 추가
2. **단기**: `npm install` 후 lock 파일 커밋
3. **중기**: `.github/workflows/ci.yml` 생성 (push/PR 시 자동 테스트)
