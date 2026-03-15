# README 이중 언어 관리 + 자동 동기화

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 내용

- README.md (영어, 기본) + README.ko.md (한국어) 쌍으로 관리
- 스펙 추가/변경 시 양쪽 README에 반영
- 자동 동기화를 스킬 또는 훅으로 처리

## 자동화 방법

- AGENTS.md에 규칙 추가: README.md 수정 시 README.ko.md도 동일하게 반영
- 또는 PostToolUse 훅에서 README.md 변경 감지 시 알림
