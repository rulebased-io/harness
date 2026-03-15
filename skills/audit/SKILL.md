---
name: harness-audit
description: 프로젝트의 하네스 구축 정도를 점검하고 점수를 매깁니다 (AGENTS.md, specs, constraints, eval 등 17개 항목)
license: MIT
metadata:
  author: rulebased-io
  version: "1.0.0"
---

현재 프로젝트의 하네스 엔지니어링 구축 정도를 점검합니다.

## 점검 기준

OpenAI Harness Engineering의 3가지 기둥을 기준으로 감사합니다:

### 1. Context Engineering
- AGENTS.md 존재 + 필수 섹션 (빌드 명령어, 아키텍처, 흔한 실수)
- CLAUDE.md 존재

### 2. Architectural Constraints
- 린터/포맷터 설정 (ESLint, Prettier, Biome 등)
- Pre-commit 훅 설정 (Husky, Lefthook 등)

### 3. Eval & Workflow
- Eval 데이터셋 존재
- Specs/Tasks 워크플로우 폴더

### 4. Build & Docs
- 테스트/빌드 스크립트 정의
- CI/CD 설정
- README.md, .gitignore

## 점수 체계

- **Critical** 항목 (가중치 3): AGENTS.md 존재, 빌드 명령어, 테스트 스크립트
- **Important** 항목 (가중치 2): 아키텍처 설명, 린터, TypeScript strict
- **Nice-to-have** 항목 (가중치 1): 워크플로우 폴더, eval, pre-commit

점수: 0-100 / 등급: A(90+), B(75+), C(60+), D(40+), F

## 실행

프로젝트 루트에서 다음 파일/폴더의 존재 여부를 확인하세요:

체크리스트는 [checklist.md](./checklist.md)를 참조하세요.

CLI를 사용할 수도 있습니다:
```bash
npx rulebased-harness audit
npx rulebased-harness audit --json
```

결과를 분석하고 실패한 항목에 대해 구체적인 개선 방안을 제시하세요.
빠진 항목을 자동으로 생성하려면 `/rulebased:harness-recommend`를 실행하세요.

$ARGUMENTS
