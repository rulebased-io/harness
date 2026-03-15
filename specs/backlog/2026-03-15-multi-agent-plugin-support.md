# 멀티 에이전트 플러그인 지원 - Claude Code vs Codex vs Cursor

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 내용

Claude Code 플러그인과 OpenAI Codex 플러그인은 구조가 다름.
모노레포에서 에이전트별 플러그인을 별도 패키지로 분리할 필요가 있는지 검토.

## 현재 상황

- `packages/plugin/` → Claude Code 전용 (.claude-plugin/, skills/, hooks/, agents/)
- Codex → AGENTS.md 기반이지만 플러그인 구조는 다를 수 있음
- Cursor → .cursor/rules 등 자체 형식
- skills.sh → 에이전트 40+ 지원, 통합 포맷

## 가능한 구조

```
packages/
├── core/           # 핵심 로직 (에이전트 무관)
├── cli/            # CLI (에이전트 무관)
├── plugin-claude/  # Claude Code 플러그인
├── plugin-codex/   # Codex 플러그인 (필요 시)
├── plugin-cursor/  # Cursor 플러그인 (필요 시)
└── docs/           # 문서 사이트
```

## 판단 포인트

- core/cli는 에이전트 무관 → 이미 분리됨
- skills.sh가 통합 포맷을 제공하므로 별도 플러그인이 불필요할 수 있음
- 당장은 Claude Code만 지원하고, 수요 있을 때 확장
