# 사용자 온보딩 + 템플릿 import 시스템

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: high

## 내용

플러그인 사용자가 하네스를 자연스럽게 세팅할 수 있어야 함.
초기 세팅 유도, 빠진 요소 추천, 템플릿 참조 3가지 흐름이 필요.

## 3가지 흐름

### 1. 초기 온보딩 (대화형 세팅 유도)

- 플러그인 최초 설치 또는 init 시 대화형으로 진행
- 프로젝트 타입 물어보기 (frontend, backend, fullstack, library, monorepo 등)
- 타입에 맞는 기본 하네스 구조 제안
- 스킬/훅 중 빠진 것을 단계별로 안내

### 2. 내장 템플릿 (프로젝트 타입별)

- 레포에 미리 올려둔 개발 타입별 템플릿
- 예: `templates/frontend/`, `templates/backend/`, `templates/fullstack/`
- 각 템플릿에 해당 타입에 맞는 AGENTS.md, audit 체크, 권장 훅/스킬 정의
- `harness-init --template frontend` 같은 형태로 사용

### 3. 외부 하네스 참조 (가져오기)

- 다른 프로젝트에 적용된 하네스를 참조로 가져옴
- 사용자가 "이 프로젝트의 하네스를 가져와" 하면:
  1. 대상 프로젝트의 AGENTS.md, .harness.json, specs/, hooks 등을 읽음
  2. 현재 프로젝트에 평가(audit) 실행
  3. 대상 대비 빠진 부분 diff 리포트
  4. 옮겨오기를 추천하는 항목 안내
  5. 사용자 동의 후 적용
- `harness-import <path-or-url>` 커맨드

## 두 가지 모두 가능해야 함

- 내장 템플릿으로 빠르게 시작
- 외부 레포에서 하네스를 가져와서 적용

## 구현 아이디어

### 스킬

- `harness-setup`: 대화형 온보딩 (프로젝트 타입 선택 → 템플릿 적용 → 빠진 요소 안내)
- `harness-import`: 외부 하네스 참조 + 비교 + 적용

### 훅

- SessionStart 훅: 하네스가 없는 프로젝트에서 처음 시작 시 세팅 유도
- audit score가 낮을 때 recommend 자동 안내

### 템플릿 구조

```
templates/
├── frontend/
│   ├── AGENTS.md
│   ├── .harness.json
│   └── recommended-hooks.json
├── backend/
│   ├── AGENTS.md
│   ├── .harness.json
│   └── recommended-hooks.json
└── fullstack/
    └── ...
```

## 판단 포인트

- 온보딩 대화는 스킬(SKILL.md)로 구현하면 Claude가 대화형으로 진행 가능
- 템플릿은 레포 내 정적 파일로 관리
- 외부 참조는 git clone 또는 파일 경로로 접근
