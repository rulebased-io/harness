---
name: documentation
description: 문서화 평가 항목 — README, .gitignore, LICENSE, CHANGELOG
type: reference
created: 2026-03-18
---

# Documentation (4 items)

프로젝트의 기본 문서화 수준.

---

### docs-readme
- **Weight**: → index.md 참조
- **What**: README.md 파일 존재 여부
- **Why**: 프로젝트의 첫인상이자 사람과 에이전트 모두가 참조하는 기본 문서.
- **How to Check**: 프로젝트 루트에 `README.md` 파일 존재
- **Fix**: README.md 생성 (프로젝트 설명, 설치, 사용법)
- **Reference**: [GitHub — How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)

---

### docs-gitignore
- **Weight**: → index.md 참조
- **What**: .gitignore 파일 존재 여부
- **Why**: 빌드 산출물, node_modules, 환경 파일 등을 추적에서 제외. 에이전트가 불필요한 파일을 커밋하는 것을 방지.
- **How to Check**: 프로젝트 루트에 `.gitignore` 파일 존재
- **Fix**: `npx gitignore node` 또는 수동 생성
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)

---

### docs-license
- **Weight**: → index.md 참조
- **What**: LICENSE 파일 존재 여부
- **Why**: 오픈소스 프로젝트의 법적 명확성. 에이전트가 의존성 추가 시 라이선스 호환성 판단 가능.
- **How to Check**: 프로젝트 루트에 `LICENSE` 또는 `LICENSE.md` 파일 존재
- **Fix**: GitHub에서 라이선스 선택 후 파일 생성
- **Reference**: [AGENTS.md — Official site](https://agents.md/)

---

### docs-changelog
- **Weight**: → index.md 참조
- **What**: CHANGELOG 또는 릴리스 노트 존재 여부
- **Why**: 에이전트가 최근 변경 이력을 파악하여 맥락 있는 작업 가능. 자동 생성 시 커밋 컨벤션과 연동.
- **How to Check**: `CHANGELOG.md`, `CHANGES.md`, 또는 GitHub Releases 사용 여부
- **Fix**: `CHANGELOG.md` 생성 또는 `npx conventional-changelog-cli` 설정
- **Reference**: [GitHub — Best practices for Copilot coding agent](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)
