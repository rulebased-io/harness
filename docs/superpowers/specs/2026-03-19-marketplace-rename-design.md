---
name: Marketplace & Plugin Rename + Monorepo Restructure
description: 마켓플레이스/플러그인 이름 변경 및 모노레포 구조 전환 스펙
type: spec
created: 2026-03-19
priority: high
---

# Marketplace & Plugin Rename + Monorepo Restructure

## 배경

현재 프로젝트는 단일 플러그인(`rulebased-harness`) 구조이다. 앞으로 `second-brain` 등 추가 플러그인을 같은 마켓플레이스에서 배포하기 위해:

1. 마켓플레이스/플러그인 이름을 정리한다
2. 모노레포 구조로 전환하여 플러그인별 독립 패키지를 지원한다
3. 분산된 패키지(`core`, `cli`, `plugin-claude`)를 하나로 통합한다

## 목표 구조

```
rulebased-io/claude-plugin                (GitHub 레포)
├── .claude-plugin/marketplace.json       ← name: "rulebased"
├── package.json                          ← name: "rulebased-plugin" (private, 워크스페이스 루트)
├── pnpm-workspace.yaml                   ← packages: ["packages/*"]
├── packages/
│   ├── harness/                          ← @rulebased/harness (플러그인 + 코어 + CLI 통합)
│   │   ├── .claude-plugin/plugin.json    ← name: "harness"
│   │   ├── skills/, commands/, agents/, hooks/, reference/, docs/
│   │   ├── src/                          ← core + cli 소스 통합
│   │   ├── tests/
│   │   ├── dist/
│   │   ├── tsconfig.json                 ← core + cli tsconfig 통합
│   │   ├── jest.config.js                ← 테스트 설정
│   │   └── package.json                  ← @rulebased/harness, bin: "dist/cli.js"
│   └── second-brain/                     ← 미래 (이번 스펙 범위 밖)
├── templates/                            ← specs/tasks 템플릿 (변경 없음)
├── specs/, tasks/
├── docs/                                 ← 프로젝트 문서 (packages/harness/docs/와 별개)
├── references/
├── README.md, README.ko.md
└── AGENTS.md
```

## 변경 매핑

### 이름 변경

| # | 대상 | 변경 전 | 변경 후 |
|---|------|---------|---------|
| R1 | 마켓플레이스 이름 | `rulebased-harness` | `rulebased` |
| R2 | 플러그인 이름 | `rulebased-harness` | `harness` |
| R3 | GitHub 레포 | `rulebased-io/harness` | `rulebased-io/claude-plugin` |
| R4 | CLI 호출 | `npx rulebased-harness` | `npx @rulebased/harness` |
| R5 | 루트 패키지명 | `@rulebased/harness` | `rulebased-plugin` (private) |

### 디렉토리 이동

| 변경 전 | 변경 후 | 방법 |
|---------|---------|------|
| `rulebased-harness/` | `packages/harness/` | `git mv` |
| `packages/core/src/` | `packages/harness/src/`에 통합 | merge |
| `packages/core/tests/` | `packages/harness/tests/`에 통합 | merge |
| `packages/cli/src/` | `packages/harness/src/`에 통합 | merge |
| `packages/plugin-claude/` | 삭제 | `git rm` |

### 삭제 대상

- `packages/plugin-claude/` — 중복, `packages/harness/`로 대체
- `packages/core/` — `packages/harness/`에 통합 후 삭제
- `packages/cli/` — `packages/harness/`에 통합 후 삭제

## 파일별 변경 상세

### JSON 설정 파일

| 파일 | 변경 내용 |
|------|-----------|
| `.claude-plugin/marketplace.json` | `name` → `rulebased`, plugins[0].`name` → `harness`, plugins[0].`source` → `./packages/harness` |
| `packages/harness/.claude-plugin/plugin.json` | `name` → `harness`, `repository` → `rulebased-io/claude-plugin` URL |
| `package.json` (루트) | `name` → `rulebased-plugin`, `private: true` |
| `packages/harness/package.json` | `@rulebased/harness`, core + cli 의존성 통합, `bin`: 단일 진입점 (`"bin": "dist/cli.js"`) |
| `pnpm-workspace.yaml` | 변경 없음 (`packages: ["packages/*"]` 유지) |

### 빌드 설정

| 파일 | 변경 내용 |
|------|-----------|
| `packages/harness/tsconfig.json` | `packages/core/tsconfig.json` + `packages/cli/tsconfig.json` 통합. 루트 tsconfig 상속 |
| `packages/harness/jest.config.js` | `packages/core/`의 jest 설정 이전. fixture 경로 조정 |
| 루트 `tsconfig.json` | 변경 없음 (현재 project references 미사용) |

### 소스 코드

| 파일 | 변경 내용 |
|------|-----------|
| `packages/harness/src/` | core + cli 소스 통합, help 텍스트 내 이름/URL 변경 |
| import 경로 | `@rulebased/core/*` → 상대 경로 (`./auditor`, `./recommender` 등)로 변환 |
| `dist/*` | 빌드로 자동 재생성 |

### 루트 package.json 스크립트

현재 `pnpm --filter @rulebased/cli` 기반 스크립트를 `--filter @rulebased/harness`로 업데이트:

```jsonc
{
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "dev": "pnpm --filter @rulebased/harness dev",
    "audit:harness": "pnpm --filter @rulebased/harness dev -- audit"
  }
}
```

### 훅 스크립트

| 파일 | 변경 내용 |
|------|-----------|
| `hooks/scripts/resolve-plugin-path.sh` | 메시지 텍스트 `rulebased-harness` → `harness` |
| `hooks/scripts/check-version-bump.sh` | `rulebased-harness/` → `packages/harness/` |
| `hooks/scripts/eval-on-stop.sh` | `npx rulebased-harness` → `npx @rulebased/harness` |

### 문서

| 파일 | 변경 내용 |
|------|-----------|
| `AGENTS.md` | 프로젝트 개요, 구조 다이어그램, 라우팅 테이블, 버전 관리 경로 (Rule 5에서 존재하지 않는 경로 `packages/plugin-claude/.claude-plugin/plugin.json`, `plugins/rulebased/.claude-plugin/plugin.json` 제거), 규칙 8·9 경로, "빌드 & 검증" 섹션 `npm` → `pnpm` |
| `CLAUDE.md` | 빌드 명령어 `npm` → `pnpm` |
| `README.md` | 설치 가이드, skills.sh 명령어, GitHub URL |
| `README.ko.md` | 동일 (이중 언어 동기화) |

## 설치 명령어 변경

```bash
# Before
/plugin marketplace add rulebased-io/harness
/plugin install rulebased-harness@rulebased-harness

# After
/plugin marketplace add rulebased-io/claude-plugin
/plugin install harness@rulebased
```

## 접근 방식

**Big Bang (단일 커밋)** — 모든 변경을 하나의 커밋으로 처리.

1. `git mv rulebased-harness/ packages/harness/` (플러그인 디렉토리 이동)
2. `packages/core/`, `packages/cli/` 소스를 `packages/harness/`에 통합
3. `@rulebased/core` import 경로를 상대 경로로 변환
4. tsconfig, jest 설정 통합
5. `packages/plugin-claude/` 삭제
6. 모든 파일 내 문자열 치환 (R1~R5)
7. 루트 package.json 스크립트 업데이트
8. `pnpm install && pnpm run build && pnpm test`
9. 단일 커밋

## 검증 체크리스트

- [ ] `pnpm install` 경고 없이 성공
- [ ] `pnpm run build` → `packages/harness/dist/` 생성
- [ ] `pnpm test` → 26개 테스트 통과
- [ ] 슬래시 커맨드 접두어 `rulebased:` 유지 확인
- [ ] `grep -r "@rulebased/core" packages/harness/src/` → 결과 없음
- [ ] `packages/core/`, `packages/cli/`, `packages/plugin-claude/` 디렉토리 삭제 확인

## 범위 밖

- GitHub 레포 리네임 실행 (GitHub Settings에서 수동. 코드에는 새 URL 반영)
- npm publish
- `specs/done/` 과거 스펙 수정
- `second-brain` 플러그인 생성 (구조만 준비)
- 버전 bump (리네임 후 다음 릴리스에서 minor bump)

## 주의사항

- AGENTS.md Rule 5의 존재하지 않는 경로 2개 정리: `packages/plugin-claude/.claude-plugin/plugin.json`, `plugins/rulebased/.claude-plugin/plugin.json`
- `plugins/rulebased/` 경로가 AGENTS.md에 언급됨 → 실제 디렉토리 없으므로 해당 라인 삭제
- `resolve-plugin-path.sh`의 슬래시 커맨드 접두어 `rulebased:`는 변경 없음
- `packages/core/tests/`에 테스트와 fixtures가 있음 → `packages/harness/tests/`로 이동
- `templates/` 디렉토리는 루트에 그대로 유지
- `docs/` (루트, 프로젝트 문서)와 `packages/harness/docs/` (skills/commands 공유 문서)는 별개 — 혼동 주의
