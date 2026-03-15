# skills.sh 배포 채널 검토

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 내용

Vercel이 만든 skills.sh (The Open Agent Skills Ecosystem)에서 우리 스킬이 배포될 수 있음.
이 경우 **GitHub 저장소 경로가 곧 패키지 이름으로 노출**됨.

## 노출 형태

```bash
# 설치 시 이렇게 보임
npx skills add rulebased-io/harness
npx skills add rulebased-io/harness --skill harness-audit
npx skills add rulebased-io/harness@harness-init

# 검색 시 저장소명으로 노출
npx skills find harness
```

## GitHub org 결정에 미치는 영향

| org명 | 설치 커맨드 | 인상 |
|-------|-------------|------|
| `rulebased-io` | `npx skills add rulebased-io/harness` | 도메인과 일치, 깔끔 |
| `rulebased-ai` | `npx skills add rulebased-ai/harness` | AI 도구 느낌 강조 |
| `rulebased-dev` | `npx skills add rulebased-dev/harness` | 개발자 커뮤니티 느낌 |

## skills.sh 핵심 정보

- 스킬 = 마크다운 파일 (자연어 명령, 코드 아님)
- 설치 위치: `.agents/skills/<스킬명>/` → 에이전트별 심볼릭 링크
- 40+ 에이전트 지원 (Claude Code, Cursor, Copilot 등)
- 이미 존재하는 스킬 레포: vercel-labs/agent-skills, daleseo/korean-skills 등
- Claude Code 플러그인 시스템과 별개의 배포 채널

## 판단 포인트

- skills.sh와 Claude Code Plugin 양쪽 모두 지원할 것인가
- GitHub org명이 skills.sh에서 브랜드로 직접 노출되므로 중요
