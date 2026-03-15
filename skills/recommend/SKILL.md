---
name: harness-recommend
description: 프로젝트에 빠진 하네스 요소를 추천하고 자동 생성합니다 (AGENTS.md, lint, eval, CI 등)
license: MIT
metadata:
  author: rulebased-io
  version: "1.0.0"
---

현재 프로젝트의 하네스 상태를 점검한 후, 빠진 요소를 추천합니다.

## 수행 순서

1. 먼저 audit를 실행합니다 (프로젝트 루트의 파일/폴더 존재 여부 확인)
2. 실패한 항목을 기반으로 추천 목록을 생성합니다
3. 추천 항목을 우선순위 순으로 정렬합니다 (high → medium → low)
4. [auto-fix] 태그가 있는 항목은 사용자 동의 후 자동으로 파일을 생성합니다

## 추천 가능 항목

- **AGENTS.md 생성/보완** - 빌드 명령어, 아키텍처, 흔한 실수 섹션
- **CLAUDE.md 생성** - AGENTS.md 참조
- **specs/tasks 폴더** - 워크플로우 구조
- **린터/포맷터** - ESLint, Prettier 설정
- **Eval 데이터셋** - 에이전트 평가 프롬프트
- **CI/CD** - GitHub Actions 워크플로우
- **.gitignore, .editorconfig** - 기본 설정

## 실행

CLI:
```bash
npx rulebased-harness recommend
npx rulebased-harness recommend --json
```

추천 목록을 보여준 후, 사용자에게 어떤 항목을 생성할지 물어보세요.
사용자가 동의한 항목만 파일을 생성합니다.

$ARGUMENTS
