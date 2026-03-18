---
name: guide-security
description: 보안 평가 가이드 — 3항목 평가 방법론, 에이전트 보안 사고 방지
type: reference
created: 2026-03-18
---

# Security — 평가 가이드

에이전트가 보안 사고를 일으키지 않도록 하는 방어 장치를 평가한다.

> 항목별 상세 정의는 [security.md](security.md) 참조.

## 왜 중요한가

GitHub 2,500개 AGENTS.md 분석에서 **"절대 시크릿 커밋 금지"가 가장 흔한 제약**. 에이전트는 파일을 구분 없이 스테이징하고 커밋할 수 있으므로, .gitignore와 명시적 규칙으로 방어 필수. 의존성 취약점도 에이전트가 패키지를 추가할 때 자동 감사가 없으면 놓칠 수 있음.

## 평가 항목 요약

| ID | Item | Severity | Weight |
|----|------|----------|--------|
| sec-no-secrets | 시크릿 제외 | critical | 3 |
| sec-gitignore-patterns | 민감 파일 패턴 차단 | important | 2 |
| sec-dependency-audit | 의존성 감사 설정 | nice-to-have | 1 |

**만점**: 6점 (critical 3 + important 2 + nice-to-have 1)

## 평가 방법

1. `.gitignore`에 시크릿 패턴 포함 확인 (아래 필수 패턴 목록 참조)
2. `.gitignore`에 일반 민감 파일 패턴 확인
3. `.github/dependabot.yml`, CI의 `npm audit` 단계, 또는 Snyk 설정 확인

## 설정 예시

### sec-no-secrets + sec-gitignore-patterns — .gitignore

**.gitignore 권장 내용:**
```gitignore
# === Secrets (sec-no-secrets: critical) ===
.env
.env.*
!.env.example
*.key
*.pem
*.p12
*.pfx
credentials.*
secrets.*
**/service-account*.json
.gcp-credentials.json

# === Dependencies ===
node_modules/
.pnpm-store/
vendor/
__pycache__/
*.pyc
venv/
.venv/

# === Build outputs ===
dist/
build/
out/
*.tsbuildinfo

# === IDE / OS (sec-gitignore-patterns: important) ===
.DS_Store
Thumbs.db
.idea/
.vscode/settings.json
*.swp
*.swo
*~

# === Logs ===
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# === Coverage / Test ===
coverage/
.nyc_output/
```

**확인할 필수 시크릿 패턴 (sec-no-secrets):**

| 패턴 | 대상 |
|------|------|
| `.env` `.env.*` | 환경 변수 |
| `*.key` `*.pem` | SSL/SSH 키 |
| `credentials.*` `secrets.*` | 인증 정보 |
| `**/service-account*.json` | 클라우드 서비스 계정 |

**확인할 일반 패턴 (sec-gitignore-patterns):**

| 패턴 | 대상 |
|------|------|
| `node_modules/` | 의존성 |
| `dist/` `build/` | 빌드 산출물 |
| `.DS_Store` `Thumbs.db` | OS 파일 |
| `*.log` | 로그 파일 |
| `.idea/` `.vscode/settings.json` | IDE 설정 |

### sec-dependency-audit — 의존성 감사

**GitHub Dependabot (.github/dependabot.yml):**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
```

**CI에서 npm audit (.github/workflows/security.yml):**
```yaml
name: Security Audit

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 9 * * 1'  # 매주 월요일

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm audit --audit-level=high
```

**Python (pip-audit):**
```yaml
      - run: pip install pip-audit
      - run: pip-audit --strict
```

## 등급 기준

- **A**: 3/3 — 시크릿 차단 + 패턴 완비 + 의존성 감사
- **B**: critical + important 통과 (시크릿 + 패턴)
- **C**: .gitignore 존재하나 시크릿 패턴 불완전
- **F**: .gitignore 없거나 시크릿 패턴 전무

## 개선 전략

1. **즉시**: `.gitignore`에 위 시크릿 패턴 추가
2. **단기**: gitignore.io 활용하여 포괄적 .gitignore 생성
3. **중기**: `.github/dependabot.yml` 또는 CI에 `npm audit` 추가
