---
name: security
description: 보안 평가 항목 — 시크릿 관리, gitignore 패턴, 의존성 감사
type: reference
created: 2026-03-18
---

# Security (3 items)

에이전트가 보안 사고를 일으키지 않도록 하는 방어 장치.

---

### sec-no-secrets
- **Weight**: → index.md 참조
- **What**: .env, credentials 등 시크릿 파일이 .gitignore에 포함되어 있는지
- **Why**: GitHub 2,500개 AGENTS.md 분석에서 "절대 시크릿 커밋 금지"가 가장 흔한 제약. 에이전트는 파일을 구분 없이 커밋할 수 있으므로 .gitignore로 방어 필수.
- **How to Check**: `.gitignore`에 `.env*`, `*.key`, `*.pem`, `credentials*`, `secrets*` 등 패턴 포함
- **Fix**: `.gitignore`에 시크릿 패턴 추가
- **Reference**: [GitHub — How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)

---

### sec-gitignore-patterns
- **Weight**: → index.md 참조
- **What**: 민감 파일 패턴이 체계적으로 차단되어 있는지
- **Why**: .env만이 아니라 IDE 설정, OS 파일, 빌드 산출물 등도 차단해야 깨끗한 레포 유지.
- **How to Check**: `.gitignore`에 `node_modules/`, `dist/`, `.DS_Store`, `*.log` 등 일반적 패턴 포함
- **Fix**: gitignore.io 또는 `npx gitignore node` 활용
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)

---

### sec-dependency-audit
- **Weight**: → index.md 참조
- **What**: 의존성 보안 감사 설정 여부
- **Why**: 에이전트가 추가한 의존성에 알려진 취약점이 있을 수 있음. 자동 감사로 사전 방지.
- **How to Check**: `npm audit`, GitHub Dependabot (`dependabot.yml`), Snyk 설정 등 존재
- **Fix**: `.github/dependabot.yml` 생성 또는 CI에 `npm audit` 단계 추가
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)
