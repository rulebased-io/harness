# npx skills add 네이밍 조사 결과

- **생성일**: 2026-03-15
- **상태**: todo
- **우선순위**: medium

## 핵심 발견

### Claude Code 플러그인은 npm 패키지가 아니다

플러그인 배포는 **GitHub 기반 마켓플레이스**가 주류. npm은 기술적으로 지원되지만 실제 사용 사례 거의 없음.

```bash
# 실제 설치 방식
/plugin install plugin-name@marketplace-name
claude plugin install plugin-name@marketplace-name
```

`npx skills add` 같은 명령어는 존재하지 않음.

### 공식 플러그인 네이밍 패턴

| 패턴 | 예시 |
|------|------|
| **단순 kebab-case** (주류) | `commit-commands`, `code-review`, `feature-dev`, `hookify` |
| **서비스/도구명 그대로** | `github`, `slack`, `sentry`, `vercel`, `stripe`, `playwright` |
| **회사 브랜드명** | `greptile`, `serena`, `firecrawl`, `coderabbit` |
| **회사-설명** | `sanity-plugin`, `huggingface-skills`, `qodo-skills` |

### GitHub 레포 네이밍

| 패턴 | 예시 |
|------|------|
| `{회사}/claude-code-plugin` | `vercel/vercel-deploy-claude-code-plugin` |
| `{회사}/claude-plugin` | `coderabbitai/claude-plugin` |
| `{회사}/skills` | `huggingface/skills`, `wix/skills` |

### npm 커뮤니티 패키지 (참고)

| 패키지 | 설명 |
|--------|------|
| `claude-code-templates` | agents, commands, hooks 모음 |
| `@claude-collective/cli` | 80+ 스킬 레포 |

### npm 배포 시 marketplace.json 설정

```json
{
  "name": "rulebased",
  "source": {
    "source": "npm",
    "package": "@rulebased/harness",
    "version": "1.0.0"
  }
}
```

## 우리 프로젝트에 적용 — 결정 필요

### 1. 플러그인명 (slash 커맨드 prefix)

| 옵션 | 커맨드 예시 | 장단점 |
|------|-------------|--------|
| `rulebased` | `/rulebased:harness-init` | 브랜드 확장 가능, 다소 김 |
| `harness` | `/harness:init` | 짧고 직관적, 브랜드 약함 |

### 2. npm 패키지명

| 옵션 | 비고 |
|------|------|
| `@rulebased/harness` | 스코프 활용, 명확 |
| `@rulebased/claude-plugin` | 범용적, harness 외 확장 시 |

### 3. GitHub 레포명

| 옵션 | 비고 |
|------|------|
| `rulebased/harness` | 간결 |
| `rulebased/claude-plugin` | 생태계 관례 따름 |

### 4. 배포 채널

| 채널 | 현실성 |
|------|--------|
| 자체 GitHub 마켓플레이스 레포 | 바로 가능 |
| 공식 마켓플레이스 제출 | 가능 (external_plugins) |
| npm 배포 | 지원되지만 관례상 비주류 |
