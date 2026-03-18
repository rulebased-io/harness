---
name: 마켓플레이스/플러그인 네이밍 변경
description: GitHub 레포 리네임 및 marketplace.json, plugin.json 이름 변경
type: backlog
created: 2026-03-19
priority: medium
---

## 변경 사항

| 항목 | 현재 | 변경 |
|------|------|------|
| GitHub 레포 | `rulebased-io/harness` | `rulebased-io/claude-plugin` |
| marketplace.json `name` | `rulebased-harness` | `rulebased` |
| plugin.json `name` | `rulebased-harness` | `harness` |

## 설치 명령어 변경

```bash
# Before
/plugin marketplace add rulebased-io/harness
/plugin install rulebased-harness@rulebased-harness

# After
/plugin marketplace add rulebased-io/claude-plugin
/plugin install harness@rulebased
```

## 영향 범위

- `.claude-plugin/marketplace.json`
- `rulebased-harness/.claude-plugin/plugin.json`
- `packages/plugin-claude/.claude-plugin/plugin.json`
- README.md / README.ko.md 설치 가이드
- AGENTS.md 프로젝트 개요
- GitHub 레포 리네임 (GitHub Settings에서)
