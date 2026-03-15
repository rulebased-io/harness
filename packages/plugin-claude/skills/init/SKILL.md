---
name: init
description: 현재 프로젝트에 하네스 구조를 초기화합니다 (AGENTS.md, specs/, tasks/ 등)
---

현재 프로젝트에 하네스 엔지니어링 구조를 초기화합니다.

## 수행 작업

1. 프로젝트 루트에 다음을 생성합니다:
   - `AGENTS.md` - 에이전트 규칙 (빌드 방법, 아키텍처, 흔한 실수)
   - `CLAUDE.md` - AGENTS.md 참조
   - `specs/todo/`, `specs/done/`, `specs/backlog/` - 스펙 워크플로우
   - `tasks/todo/`, `tasks/done/` - 태스크 워크플로우
   - `.gitignore` (없는 경우)

2. 이미 존재하는 파일은 건너뜁니다.

3. AGENTS.md에는 TODO 마커가 있으니, 생성 후 프로젝트에 맞게 내용을 채워야 합니다.

## 실행

CLI를 사용합니다:
```bash
npx rulebased-harness init
```

또는 수동으로 위 파일들을 직접 생성하세요.

생성된 AGENTS.md의 TODO 항목을 이 프로젝트에 맞게 채워주세요:
- 프로젝트 설명
- 빌드/테스트 명령어
- 디렉토리 구조
- 코딩 규칙
- 흔한 실수 방지 목록

$ARGUMENTS
