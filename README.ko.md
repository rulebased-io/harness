# @rulebased/harness

AI 에이전트를 위한 하네스 구축 도구. 프로젝트의 하네스 엔지니어링 구축 정도를 평가하고, 빠진 요소를 추천하고, 자동으로 생성합니다.

> **하네스 엔지니어링** = 에이전트의 행동을 제약(Constraints)하고, 컨텍스트(Context)를 제공하고, 결과를 평가(Eval)하는 시스템 설계. [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/) 참고.

[English](README.md)

## 설치

### skills.sh (권장)

40개 이상의 에이전트 지원 (Claude Code, Cursor, Copilot 등)

```bash
# 전체 스킬 설치
npx skills add rulebased-io/harness

# 특정 스킬만 설치
npx skills add rulebased-io/harness --skill harness-audit
```

### Claude Code Plugin

```bash
# Claude Code 내에서
/plugin install rulebased@marketplace-name
```

### CLI

```bash
npx rulebased-harness audit
npx rulebased-harness init
npx rulebased-harness recommend
npx rulebased-harness score
npx rulebased-harness eval-log
```

## 스킬

### harness-audit

프로젝트의 하네스 구축 정도를 점검합니다. 17개 항목을 검사하고 0-100 점수를 매깁니다.

```bash
npx rulebased-harness audit
npx rulebased-harness audit --json
```

**점검 항목:**

| 카테고리 | 점검 내용 |
|----------|-----------|
| Context Engineering | AGENTS.md, CLAUDE.md, 빌드 명령어, 아키텍처, 흔한 실수 |
| Constraints | 린터/포맷터, pre-commit 훅 |
| Eval | eval 데이터셋 |
| Workflow | specs/, tasks/ 디렉토리 |
| Build | 테스트/빌드 스크립트, CI/CD |
| Conventions | .editorconfig, TypeScript strict |
| Docs | README.md, .gitignore |

### harness-score

카테고리별 상세 점수 리포트. 각 하네스 영역이 얼마나 구현되어 있는지 보여줍니다.

```bash
npx rulebased-harness score

# 출력 예시:
# ## Harness Score Report
#
# [################----]  **81/100 (B)**
#
# ### Context Engineering  [####################]  100/100  (5/5)
# - [PASS] AGENTS.md exists
# - [PASS] AGENTS.md includes build commands
# ...
#
# ### Constraints  [--------------------]  0/100  (0/2)
# - [FAIL] Linter/formatter configuration exists
#   -> ESLint, Prettier, Biome 등의 설정 파일을 추가하세요.
```

### harness-init

프로젝트에 하네스 구조를 초기화합니다.

```bash
npx rulebased-harness init
npx rulebased-harness init --preset minimal
npx rulebased-harness init --force
```

생성되는 파일: `AGENTS.md`, `CLAUDE.md`, `.harness.json`, `specs/`, `tasks/`, `.gitignore`

**프리셋:**
- `standard` (기본) — 전체 체크 활성화
- `minimal` — 필수 체크만 (AGENTS.md + 빌드 명령어)

`.harness.json`으로 커스터마이즈:
```json
{
  "preset": "standard",
  "checks": { "disable": ["eval-dir", "cst-precommit"] }
}
```

### harness-recommend

빠진 하네스 요소를 추천하고 자동 생성할 수 있습니다.

```bash
npx rulebased-harness recommend
npx rulebased-harness recommend --json
```

### harness-eval-log

Claude Code 대화 기록(transcript)을 분석하여 하네스 부합도를 평가합니다.

```bash
npx rulebased-harness eval-log
npx rulebased-harness eval-log --file /path/to/transcript.jsonl
```

**평가 기준:**
- 사람 턴 수 (적을수록 자율적)
- 자율성 비율 (에이전트 턴 / 전체 턴)
- 빌드/테스트 실행 (Bash 도구 사용)
- 도구 다양성 (사용한 도구 종류 수)
- 세션 시간

**자동 실행:** 10회 이상의 에이전트 턴이 있는 세션 종료 시 Stop hook으로 자동 실행됩니다.

## 프로젝트 구조

```
@rulebased/harness (pnpm 모노레포)
├── skills/                      # 스킬 (skills.sh + Claude Code)
│   ├── audit/SKILL.md
│   ├── score/SKILL.md
│   ├── init/SKILL.md
│   ├── recommend/SKILL.md
│   └── eval-log/SKILL.md
├── packages/
│   ├── core/                    # @rulebased/core - auditor, recommender, initializer, transcript parser
│   ├── cli/                     # @rulebased/cli - CLI 엔트리포인트
│   └── plugin-claude/           # @rulebased/plugin-claude - Claude Code 플러그인 (훅, 에이전트)
├── specs/                       # 스펙 워크플로우 (todo/done/backlog)
├── tasks/                       # 태스크 워크플로우 (todo/done)
└── docs/                        # 문서
```

## 개발

```bash
pnpm install
pnpm build
pnpm test          # 26개 테스트
```

## 점수 체계

| 심각도 | 가중치 | 예시 |
|--------|--------|------|
| Critical | 3 | AGENTS.md 존재, 빌드 명령어, 테스트 스크립트 |
| Important | 2 | 아키텍처 설명, 린터, TypeScript strict |
| Nice-to-have | 1 | 워크플로우 폴더, eval, pre-commit |

등급: A (90+), B (75+), C (60+), D (40+), F

## 로드맵

- [ ] 온보딩 위자드 — 프로젝트 타입별 대화형 세팅 (frontend, backend, fullstack)
- [ ] 내장 템플릿 — 타입별 AGENTS.md, 훅, audit 프리셋
- [ ] 하네스 가져오기 — 다른 프로젝트의 하네스를 비교 후 적용
- [ ] 멀티 에이전트 플러그인 — Codex, Cursor 지원
- [ ] npm 배포 — `@rulebased/core`, `@rulebased/cli`

## 라이선스

MIT
