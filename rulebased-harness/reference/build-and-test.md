---
name: build-and-test
description: 빌드 및 테스트 평가 항목 — 테스트/빌드 스크립트, CI/CD, lock 파일
type: reference
created: 2026-03-18
---

# Build & Test (4 items)

에이전트가 코드를 빌드하고 검증할 수 있는 인프라.

---

### build-test-script
- **Severity**: critical (weight 3)
- **What**: package.json (또는 동등)에 test 스크립트 정의 여부
- **Why**: 에이전트가 자신의 변경을 검증하는 가장 기본적인 수단. 테스트가 없으면 자율 작업이 사실상 불가능.
- **How to Check**: `package.json`의 `scripts.test`, `Makefile`의 test 타겟, `Cargo.toml`의 test 설정 등
- **Fix**: `package.json`에 `"test": "jest"` 등 테스트 커맨드 추가
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### build-build-script
- **Severity**: important (weight 2)
- **What**: 빌드 스크립트 정의 여부
- **Why**: TypeScript 등 컴파일 언어에서 빌드 성공 여부가 코드 정확성의 1차 검증.
- **How to Check**: `package.json`의 `scripts.build`, `Makefile`의 build 타겟, `Cargo.toml` 등
- **Fix**: `package.json`에 `"build": "tsc"` 등 빌드 커맨드 추가
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### build-ci
- **Severity**: nice-to-have (weight 1)
- **What**: CI/CD 파이프라인 설정 존재 여부
- **Why**: PR마다 자동으로 빌드/테스트를 실행하여 에이전트 코드의 품질 게이트 역할.
- **How to Check**: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/` 등 존재
- **Fix**: `.github/workflows/ci.yml` 생성
- **Reference**: [Stripe — Minions Part 1](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)

---

### build-lockfile
- **Severity**: nice-to-have (weight 1)
- **What**: 패키지 lock 파일 존재 여부
- **Why**: 재현 가능한 빌드 보장. 에이전트가 설치한 의존성이 다음 실행에서도 동일하게 동작.
- **How to Check**: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `Cargo.lock`, `poetry.lock` 등 존재
- **Fix**: `npm install` 또는 `pnpm install` 실행 후 lock 파일 커밋
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)
