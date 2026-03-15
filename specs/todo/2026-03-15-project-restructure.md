# 프로젝트 구조 재설계 - Claude Code Plugin 기반

- **생성일**: 2026-03-15
- **상태**: todo
- **우선순위**: high

## 배경

현재 구조는 Claude Desktop MCP 서버 기반으로 초기에 대충 만들어진 것.
실제로는 `npx harness-plugin init` 같은 CLI로 다른 프로젝트에 하네스를 도입하고,
Claude Code에서 slash 커맨드로 하네스를 점검/관리하는 도구가 되어야 함.

## 핵심 판단 사항

### 1. MCP vs Plugin vs CLI

| 방식 | 용도 | 이 프로젝트에 필요? |
|------|------|---------------------|
| **MCP 서버** | 외부 API/DB 연동 | X - 하네스는 로컬 파일 기반 |
| **Claude Code Plugin** | 스킬/훅/에이전트 배포 | O - 핵심 배포 방식 |
| **CLI** | 프로젝트 초기 셋업 | O - `npx harness-plugin init` |

**결론: Plugin + CLI 조합. MCP 불필요.**

### 2. 모노레포 여부

단일 패키지로 충분:
- 플러그인 구조 자체가 skills/, hooks/, agents/ 를 포함
- CLI는 `bin/` 엔트리포인트로 제공
- 별도 패키지로 분리할 이유 없음

**결론: 단일 패키지. 모노레포 불필요.**

### 3. 배포 방식

```bash
# 플러그인 설치 (Claude Code에서)
claude plugin install harness-plugin

# 또는 CLI로 프로젝트에 하네스 초기화
npx harness-plugin init
```

## 새 프로젝트 구조 (안)

```
harness-plugin/
├── .claude-plugin/
│   └── plugin.json              # 플러그인 매니페스트
│
├── skills/                      # Claude Code slash 커맨드 (하네스 전용)
│   ├── init/
│   │   └── SKILL.md             # /harness-plugin:init
│   ├── audit/
│   │   ├── SKILL.md             # /harness-plugin:audit
│   │   └── checklist.md         # 감사 체크리스트 참조
│   └── recommend/
│       └── SKILL.md             # /harness-plugin:recommend
│
├── hooks/
│   └── hooks.json               # 자동화 훅
│
├── agents/
│   └── harness-auditor.md       # 하네스 감사 에이전트
│
├── templates/                   # init 시 복사되는 템플릿
│   ├── AGENTS.md.hbs
│   ├── specs/
│   └── tasks/
│
├── src/                         # CLI + 핵심 로직
│   ├── cli/
│   │   ├── index.ts             # CLI 엔트리포인트
│   │   └── commands/
│   │       ├── init.ts
│   │       └── audit.ts
│   ├── core/
│   │   ├── auditor.ts           # 하네스 감사 로직
│   │   ├── recommender.ts       # 추천 로직
│   │   └── scorer.ts            # 점수 계산
│   └── types.ts
│
├── tests/
├── docs/
├── specs/                       # 이 프로젝트 자체의 워크플로우
├── tasks/
│
├── package.json                 # bin: harness-plugin
├── tsconfig.json
└── AGENTS.md
```

## 제공할 커맨드 목록 (하네스 전용만)

| 커맨드 | 설명 |
|--------|------|
| `/harness-plugin:init` | 현재 프로젝트에 하네스 구조 초기화 |
| `/harness-plugin:audit` | 하네스 구축 정도 점검 + 점수 |
| `/harness-plugin:recommend` | 빠진 하네스 요소 추천 + 자동 생성 |

> 워크플로우 커맨드(spec, task, done 등)는 Claude Code 기본 기능으로 처리 가능하므로 제외

### audit가 점검하는 항목

- [ ] AGENTS.md 존재 여부 + 필수 섹션 포함
- [ ] CLAUDE.md 존재 여부
- [ ] specs/tasks 폴더 구조
- [ ] .claude/rules/ 워크플로우 규칙
- [ ] 빌드/테스트 명령어 정의
- [ ] 아키텍처 제약 정의
- [ ] eval 데이터셋 존재
- [ ] 코딩 컨벤션 정의
- [ ] 흔한 실수 방지 목록

## 수용 기준 (Acceptance Criteria)

- [ ] `claude plugin install` 또는 `--plugin-dir`로 설치 가능
- [ ] 설치 후 `/harness-plugin:audit` 실행 가능
- [ ] `npx harness-plugin init`으로 프로젝트 초기화 가능
- [ ] 기존 테스트 27개 유지
- [ ] 기존 MCP 서버 기능은 별도 스킬로 전환 또는 제거 판단

## 참고

- Claude Code Plugin 공식 구조: `.claude-plugin/plugin.json` 매니페스트
- 스킬 네임스페이스: `/harness-plugin:skill-name`
- `${CLAUDE_PLUGIN_ROOT}` 변수로 플러그인 내부 파일 참조 가능
