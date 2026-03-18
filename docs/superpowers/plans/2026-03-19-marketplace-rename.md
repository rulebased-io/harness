# Marketplace Rename + Monorepo Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename marketplace/plugin, merge 3 packages into 1, restructure into monorepo-ready layout.

**Architecture:** `rulebased-harness/` moves to `packages/harness/`. `packages/core/` and `packages/cli/` merge into it. Root becomes a private workspace root (`rulebased-plugin`). Marketplace name → `rulebased`, plugin name → `harness`.

**Tech Stack:** TypeScript, pnpm workspaces, Jest (ESM), Claude Code plugin system

---

## File Structure (Target)

```
├── .claude-plugin/marketplace.json       ← name: "rulebased", plugins[0]: "harness"
├── package.json                          ← name: "rulebased-plugin" (private)
├── pnpm-workspace.yaml                   ← packages: ["packages/*"]
├── tsconfig.json                         ← base config
├── packages/
│   └── harness/                          ← @rulebased/harness (merged)
│       ├── .claude-plugin/plugin.json    ← name: "harness"
│       ├── skills/, commands/, agents/, hooks/, reference/, docs/
│       ├── src/                          ← core + cli merged
│       │   ├── auditor.ts
│       │   ├── recommender.ts
│       │   ├── initializer.ts
│       │   ├── types.ts
│       │   ├── presets.ts
│       │   ├── transcript.ts
│       │   ├── log-evaluator.ts
│       │   └── cli.ts                   ← renamed from index.ts
│       ├── tests/
│       │   ├── core/
│       │   └── fixtures/
│       ├── dist/
│       ├── package.json
│       ├── tsconfig.json
│       └── jest.config.js
├── templates/, specs/, tasks/, docs/, references/
├── AGENTS.md, CLAUDE.md, README.md, README.ko.md
```

---

### Task 1: Move plugin directory

**Files:**
- Move: `rulebased-harness/` → `packages/harness/`

- [ ] **Step 1: git mv the plugin directory**

```bash
git mv rulebased-harness/ packages/harness/
```

Note: This must happen BEFORE merging core/cli, since `packages/harness/` must not exist yet for git mv to work. The directory will contain skills/, commands/, agents/, hooks/, reference/, docs/, .claude-plugin/.

- [ ] **Step 2: Verify the move**

```bash
ls packages/harness/.claude-plugin/plugin.json
ls packages/harness/skills/audit/SKILL.md
ls packages/harness/hooks/hooks.json
```

Expected: All files exist at new location.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: move rulebased-harness/ to packages/harness/"
```

---

### Task 2: Merge core into packages/harness

**Files:**
- Move: `packages/core/src/*.ts` → `packages/harness/src/`
- Move: `packages/core/tests/` → `packages/harness/tests/`
- Move: `packages/core/jest.config.js` → `packages/harness/jest.config.js`
- Delete: `packages/core/`

- [ ] **Step 1: Move core source files**

```bash
mkdir -p packages/harness/src
cp packages/core/src/*.ts packages/harness/src/
```

Files to copy: `auditor.ts`, `recommender.ts`, `initializer.ts`, `types.ts`, `presets.ts`, `transcript.ts`, `log-evaluator.ts`

- [ ] **Step 2: Move tests and fixtures**

```bash
cp -r packages/core/tests packages/harness/tests
```

- [ ] **Step 3: Move jest config**

```bash
cp packages/core/jest.config.js packages/harness/jest.config.js
```

- [ ] **Step 4: Remove packages/core**

```bash
git rm -r packages/core
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: merge packages/core into packages/harness"
```

---

### Task 3: Merge CLI into packages/harness

**Files:**
- Move: `packages/cli/src/index.ts` → `packages/harness/src/cli.ts`
- Delete: `packages/cli/`
- Delete: `packages/plugin-claude/`

- [ ] **Step 1: Copy CLI source, rename to cli.ts**

```bash
cp packages/cli/src/index.ts packages/harness/src/cli.ts
```

- [ ] **Step 2: Update imports in cli.ts**

Replace all `@rulebased/core/*` imports with relative imports:

```typescript
// Before:
import { audit, formatReport, formatScore } from "@rulebased/core/auditor";
import { recommend, formatRecommendations } from "@rulebased/core/recommender";
import { initHarness } from "@rulebased/core/initializer";
import { findLatestTranscript, parseTranscript, computeStats } from "@rulebased/core/transcript";
import { evaluateLog, formatLogEval } from "@rulebased/core/log-evaluator";

// After:
import { audit, formatReport, formatScore } from "./auditor.js";
import { recommend, formatRecommendations } from "./recommender.js";
import { initHarness } from "./initializer.js";
import { findLatestTranscript, parseTranscript, computeStats } from "./transcript.js";
import { evaluateLog, formatLogEval } from "./log-evaluator.js";
```

- [ ] **Step 3: Update help text in cli.ts**

Replace the `printUsage()` function content:

```typescript
function printUsage(): void {
  console.log(`
  @rulebased/harness - Harness scaffolding tool for AI agents
  https://github.com/rulebased-io/claude-plugin

  Usage:
    npx @rulebased/harness <command> [options]

  Commands:
    audit [path]          Audit harness coverage (17 criteria, score 0-100)
    score [path]          Per-category harness score report
    recommend [path]      Recommend missing harness elements (by priority)
    init [path]           Initialize harness structure (AGENTS.md, specs/, tasks/)
    eval-log [path]       Evaluate conversation log against harness compliance

  Options:
    --force               Overwrite existing files (init)
    --json                Output in JSON format (audit, recommend)
    -h, --help            Show help
    -v, --version         Show version

  Examples:
    npx @rulebased/harness audit              Audit the current directory
    npx @rulebased/harness audit ./my-app     Audit a specific path
    npx @rulebased/harness audit --json       Output as JSON
    npx @rulebased/harness recommend          Get improvement recommendations
    npx @rulebased/harness init               Initialize harness
    npx @rulebased/harness init --force       Overwrite existing files

  Skills (skills.sh):
    npx skills add rulebased-io/claude-plugin
`);
}
```

- [ ] **Step 4: Update version string in cli.ts**

```typescript
// Before:
console.log("@rulebased/harness v1.0.0");

// After:
console.log("@rulebased/harness v1.4.2");
```

- [ ] **Step 5: Remove packages/cli and packages/plugin-claude**

```bash
git rm -r packages/cli
git rm -r packages/plugin-claude
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: merge packages/cli into packages/harness, delete plugin-claude"
```

---

### Task 4: Create packages/harness/package.json and tsconfig.json

**Files:**
- Create: `packages/harness/package.json`
- Create: `packages/harness/tsconfig.json`

- [ ] **Step 1: Create packages/harness/package.json**

```json
{
  "name": "@rulebased/harness",
  "version": "1.4.2",
  "description": "Harness engineering tools for AI agents — audit, init, recommend, eval-log",
  "type": "module",
  "bin": "dist/cli.js",
  "main": "dist/auditor.js",
  "types": "dist/auditor.d.ts",
  "exports": {
    "./auditor": "./dist/auditor.js",
    "./recommender": "./dist/recommender.js",
    "./initializer": "./dist/initializer.js",
    "./types": "./dist/types.js",
    "./presets": "./dist/presets.js",
    "./transcript": "./dist/transcript.js",
    "./log-evaluator": "./dist/log-evaluator.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "NODE_OPTIONS='--experimental-vm-modules' pnpm exec jest",
    "test:watch": "NODE_OPTIONS='--experimental-vm-modules' pnpm exec jest --watch"
  },
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.5.0"
  },
  "files": [
    "dist/"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/rulebased-io/claude-plugin"
  },
  "license": "MIT"
}
```

Note: No `dependencies` — the `@rulebased/core` workspace dep is gone because core is now internal. The `bin` field uses shorthand form (`"bin": "dist/cli.js"`) so the binary name is the package name.

- [ ] **Step 2: Create packages/harness/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "tests"]
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: create packages/harness package.json and tsconfig"
```

---

### Task 5: Update root configs

**Files:**
- Modify: `package.json` (root)
- Modify: `CLAUDE.md`
- No change: `pnpm-workspace.yaml` (already `packages: ["packages/*"]`, works as-is)
- No change: root `tsconfig.json` (no project references to update)

- [ ] **Step 1: Update root package.json**

```json
{
  "name": "rulebased-plugin",
  "version": "1.4.2",
  "private": true,
  "description": "Claude Code plugins by rulebased.io",
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "dev": "pnpm --filter @rulebased/harness dev",
    "audit:harness": "pnpm --filter @rulebased/harness dev -- audit"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@10.28.1"
}
```

Changes: `name` → `rulebased-plugin`, `description` updated, scripts filter `@rulebased/cli` → `@rulebased/harness`.

- [ ] **Step 2: Update CLAUDE.md**

```markdown
# CLAUDE.md

@AGENTS.md 를 참조하세요. 이 프로젝트의 모든 규칙과 컨텍스트는 AGENTS.md에 정의되어 있습니다.

\```bash
pnpm install && pnpm run build && pnpm test
\```
```

- [ ] **Step 3: Commit**

```bash
git add package.json CLAUDE.md && git commit -m "chore: update root package.json and CLAUDE.md"
```

---

### Task 6: Update marketplace.json and plugin.json

**Files:**
- Modify: `.claude-plugin/marketplace.json`
- Modify: `packages/harness/.claude-plugin/plugin.json`

- [ ] **Step 1: Update marketplace.json**

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "rulebased",
  "version": "1.4.2",
  "description": "Claude Code plugins by rulebased.io",
  "owner": {
    "name": "rulebased.io",
    "email": "jungyoun@rulebased.io",
    "url": "https://rulebased.io"
  },
  "plugins": [
    {
      "name": "harness",
      "description": "Harness audit, score, init, recommend, and eval-log for AI agent projects",
      "source": "./packages/harness",
      "version": "1.4.2",
      "category": "development",
      "author": {
        "name": "rulebased.io",
        "email": "jungyoun@rulebased.io"
      }
    }
  ]
}
```

Changes: `name` → `rulebased`, plugins[0].`name` → `harness`, plugins[0].`source` → `./packages/harness`.

- [ ] **Step 2: Update plugin.json**

```json
{
  "name": "harness",
  "description": "Harness engineering tools for AI agents — audit, score, init, recommend, eval-log",
  "version": "1.4.2",
  "author": {
    "name": "rulebased.io"
  },
  "homepage": "https://rulebased.io",
  "repository": "https://github.com/rulebased-io/claude-plugin",
  "license": "MIT"
}
```

Changes: `name` → `harness`, `repository` → `rulebased-io/claude-plugin`.

- [ ] **Step 3: Commit**

```bash
git add .claude-plugin/marketplace.json packages/harness/.claude-plugin/plugin.json && git commit -m "chore: rename marketplace to 'rulebased', plugin to 'harness'"
```

---

### Task 7: Update hook scripts

**Files:**
- Modify: `packages/harness/hooks/scripts/resolve-plugin-path.sh`
- Modify: `packages/harness/hooks/scripts/check-version-bump.sh`
- Modify: `packages/harness/hooks/scripts/eval-on-stop.sh`

- [ ] **Step 1: Update resolve-plugin-path.sh**

Line 30: Change `[rulebased-harness plugin]` → `[harness plugin]`
Line 33: Change `the rulebased-harness plugin` → `the harness plugin`

Full replacement for lines 29-36:

```bash
cat <<EOF
[harness plugin]
CLAUDE_PLUGIN_PATH=${PLUGIN_PATH}

This is the installed path of the harness plugin.
Use this path to read any plugin files referenced in the skill documentation.
For example: ${PLUGIN_PATH}/reference/checklist.md
EOF
```

- [ ] **Step 2: Update check-version-bump.sh**

Line 3: `# check-version-bump.sh — Warn if packages/harness/ was modified without a version bump`
Line 5: `# Triggered on Stop. Checks git diff for changes in packages/harness/ and`
Line 18: Change `-- rulebased-harness/` → `-- packages/harness/` (both occurrences)
Line 29: Change `[harness] rulebased-harness/ has changes` → `[harness] packages/harness/ has changes`

Full file:

```bash
#!/bin/bash
#
# check-version-bump.sh — Warn if packages/harness/ was modified without a version bump
#
# Triggered on Stop. Checks git diff for changes in packages/harness/ and
# verifies that .claude-plugin/plugin.json version was also updated.
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
REPO_ROOT="$(cd "$PLUGIN_DIR/../.." && pwd)"

cd "$REPO_ROOT"

# Check if packages/harness/ has any staged or unstaged changes
CHANGED_FILES=$(git diff --name-only HEAD -- packages/harness/ 2>/dev/null || git diff --name-only -- packages/harness/ 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  exit 0
fi

# Check if plugin.json version was modified
VERSION_BUMPED=$(echo "$CHANGED_FILES" | grep -c "\.claude-plugin/plugin.json" || echo "0")

if [ "$VERSION_BUMPED" -eq 0 ]; then
  CURRENT_VERSION=$(grep -o '"version": *"[^"]*"' "$PLUGIN_DIR/.claude-plugin/plugin.json" | cut -d'"' -f4)
  echo "[harness] packages/harness/ has changes but version is still ${CURRENT_VERSION}. Please bump the version in .claude-plugin/plugin.json."
fi
```

Note: `REPO_ROOT` path changed from `$PLUGIN_DIR/..` to `$PLUGIN_DIR/../..` because the plugin moved from `rulebased-harness/` (1 level deep) to `packages/harness/` (2 levels deep).

- [ ] **Step 3: Update eval-on-stop.sh**

Line 38: Change `npx rulebased-harness eval-log` → `npx @rulebased/harness eval-log`

```bash
# Run eval-log
npx @rulebased/harness eval-log --file "$TRANSCRIPT_PATH" 2>/dev/null || true
```

- [ ] **Step 4: Commit**

```bash
git add packages/harness/hooks/scripts/ && git commit -m "chore: update hook scripts for new paths"
```

---

### Task 8: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

This is a large file with many references. All changes listed below:

- [ ] **Step 1: Update 프로젝트 개요 (lines 7-13)**

```markdown
**@rulebased/harness** - AI 에이전트를 위한 하네스 구축 도구.
프로젝트의 하네스 구축 정도를 점검(audit), 빠진 요소를 추천(recommend), 하네스를 초기화(init)합니다.

- 플러그인명: `rulebased` → `/rulebased:harness-init`, `/rulebased:harness-audit`, `/rulebased:harness-recommend`
- npm: `@rulebased/harness`
- GitHub: `rulebased-io/claude-plugin`
- 도메인: `rulebased.io`
```

Change: `rulebased-io/harness` → `rulebased-io/claude-plugin`

- [ ] **Step 2: Update 빌드 & 검증 (lines 15-22)**

```markdown
## 빌드 & 검증

\```bash
pnpm install          # 의존성 설치
pnpm run build        # TypeScript → dist/
pnpm test             # Jest (26개 테스트)
pnpm run audit:harness  # 이 프로젝트의 하네스 점검
\```
```

Change: `npm` → `pnpm`, `npm run audit` → `pnpm run audit:harness`

- [ ] **Step 3: Update 프로젝트 구조 (lines 70-89)**

```markdown
### 3. 프로젝트 구조

\```
├── packages/
│   └── harness/                    # 플러그인 + 코어 + CLI 통합 (@rulebased/harness)
│       ├── .claude-plugin/plugin.json  # 플러그인 매니페스트
│       ├── docs/                   # 공유 문서 (skills/commands 공통)
│       │   ├── audit.md
│       │   ├── init.md
│       │   ├── recommend.md
│       │   └── eval-log.md
│       ├── skills/                 # Claude Code slash 커맨드 (docs/ 링크)
│       ├── commands/               # Claude Code slash 커맨드 (docs/ 링크)
│       ├── agents/                 # 하네스 감사 에이전트 (독립 내용)
│       ├── hooks/                  # 자동화 훅
│       ├── reference/              # 평가 기준 (index → guide → criteria)
│       ├── src/                    # 핵심 로직 + CLI
│       └── tests/                  # 테스트 + fixtures
├── references/                     # 외부 레퍼런스 링크 모음
├── templates/                      # specs/tasks 템플릿
├── specs/ / tasks/                 # 이 프로젝트 워크플로우
└── docs/                           # 프로젝트 문서
\```
```

- [ ] **Step 4: Update 버전 관리 Rule 5 (lines 98-110)**

```markdown
### 5. 버전 관리 (자동 적용)

**플러그인/마켓플레이스 관련 변경 시 반드시 버전을 올린다.**

다음 파일의 `version`을 동시에 올려야 함:
- `package.json` (루트)
- `packages/harness/package.json`
- `packages/harness/.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

patch 단위(x.y.Z)로 올리고, 기능 추가 시 minor(x.Y.0).
```

Removed: `packages/core/package.json`, `packages/cli/package.json`, `packages/plugin-claude/.claude-plugin/plugin.json`, `plugins/rulebased/.claude-plugin/plugin.json`

- [ ] **Step 5: Update Rule 8 경로 (lines 141-162)**

Change `rulebased-harness/` → `packages/harness/` in the directory diagram:

```markdown
\```
packages/harness/
├── docs/             ← 공유 문서 (실제 내용)
│   ├── audit.md
│   ├── init.md
│   ├── recommend.md
│   └── eval-log.md
├── skills/*/SKILL.md ← 링크만 (frontmatter + docs/*.md 참조)
├── commands/*.md     ← 링크만 (frontmatter + docs/*.md 참조)
└── agents/           ← 에이전트 전용 (독립 내용 가능)
\```
```

- [ ] **Step 6: Update Rule 9 (line 166)**

Change `rulebased-harness/reference/` → `packages/harness/reference/`

```markdown
**`packages/harness/reference/`의 평가 기준은 init·audit·recommend 스킬이 공통으로 사용하는 중립 데이터이다.**
```

- [ ] **Step 7: Update 라우팅 테이블 (lines 183-189)**

```markdown
| 영역 | 인덱스 | 내용 |
|------|--------|------|
| 문서 | `docs/index.md` | 시작하기, 아키텍처, 설치, 사용법 |
| 공유 문서 | `packages/harness/docs/` | skills/commands 공통 문서 (audit, init, recommend, eval-log) |
| 스킬/커맨드 | `packages/harness/skills/`, `commands/` | docs/ 링크 래퍼 |
| Audit 기준 인덱스 | `packages/harness/reference/index.md` | 8 카테고리, 36항목 → guide-*.md → *.md |
| 외부 레퍼런스 | `references/harness-engineering/` | 업체별 공식 문서/블로그 링크 모음 (14개 파일) |
```

- [ ] **Step 8: Commit**

```bash
git add AGENTS.md && git commit -m "chore: update AGENTS.md for monorepo restructure"
```

---

### Task 9: Update README.md and README.ko.md

**Files:**
- Modify: `README.md`
- Modify: `README.ko.md`

- [ ] **Step 1: Update README.md Installation section**

Claude Code section:

```markdown
### Claude Code

1. Add the marketplace, then install the plugin:

\```bash
# Step 1: Add marketplace (inside Claude Code)
/plugin marketplace add rulebased-io/claude-plugin

# Step 2: Install the plugin
/plugin install harness@rulebased
\```

2. Or test locally during development:

\```bash
claude --plugin-dir ./packages/harness
\```
```

skills.sh section:

```markdown
### skills.sh

\```bash
# Install all skills
npx skills add rulebased-io/claude-plugin

# Install a specific skill only
npx skills add rulebased-io/claude-plugin --skill harness-audit
\```
```

CLI section:

```markdown
### CLI (npm)

\```bash
npx @rulebased/harness audit
npx @rulebased/harness score
npx @rulebased/harness init
npx @rulebased/harness recommend
npx @rulebased/harness eval-log
\```
```

- [ ] **Step 2: Update README.md Project Structure**

```markdown
## Project Structure

\```
@rulebased/harness (pnpm monorepo)
├── packages/
│   └── harness/                 # @rulebased/harness - plugin + core + CLI
│       ├── skills/              # Skills (skills.sh + Claude Code)
│       ├── commands/            # Claude Code commands
│       ├── agents/              # Autonomous agents
│       ├── hooks/               # Plugin hooks
│       ├── reference/           # Evaluation criteria
│       ├── docs/                # Shared docs (skills/commands)
│       ├── src/                 # Auditor, recommender, initializer, CLI
│       └── tests/               # Tests + fixtures
├── specs/                       # Spec workflow (todo/done/backlog)
├── tasks/                       # Task workflow (todo/done)
└── docs/                        # Documentation
\```
```

- [ ] **Step 3: Update README.md Roadmap**

```markdown
## Roadmap

- [x] npm publish — `@rulebased/harness`
- [ ] Onboarding wizard — interactive setup by project type (frontend, backend, fullstack)
- [ ] Built-in templates — per-project-type AGENTS.md, hooks, and audit presets
- [ ] Harness import — bring harness setup from another project, diff and apply
- [ ] Multi-agent plugins — Codex, Cursor support
```

Change: Remove `@rulebased/core` and `@rulebased/cli` mentions.

- [ ] **Step 4: Apply identical changes to README.ko.md**

Mirror all changes from steps 1-3 in Korean. Key translations:

- `/plugin marketplace add rulebased-io/claude-plugin`
- `/plugin install harness@rulebased`
- `claude --plugin-dir ./packages/harness`
- `npx skills add rulebased-io/claude-plugin`
- `npx @rulebased/harness audit` (etc.)
- Project structure updated to match
- Roadmap: `@rulebased/harness` only

- [ ] **Step 5: Commit**

```bash
git add README.md README.ko.md && git commit -m "chore: update READMEs for rename and restructure"
```

---

### Task 10: Build, test, and verify

**Files:** None (verification only)

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules packages/harness/node_modules packages/harness/dist
pnpm install
```

Expected: No errors, no warnings about missing packages.

- [ ] **Step 2: Build**

```bash
pnpm run build
```

Expected: `packages/harness/dist/` created with all `.js` and `.d.ts` files including `cli.js`.

- [ ] **Step 3: Run tests**

```bash
pnpm test
```

Expected: 26 tests pass.

- [ ] **Step 4: Verify cleanup**

```bash
# These directories should NOT exist:
ls packages/core 2>&1 | grep "No such file"
ls packages/cli 2>&1 | grep "No such file"
ls packages/plugin-claude 2>&1 | grep "No such file"
ls rulebased-harness 2>&1 | grep "No such file"

# No @rulebased/core imports remaining:
grep -r "@rulebased/core" packages/harness/src/ && echo "FAIL: stale imports" || echo "OK: no stale imports"

# No stale "rulebased-harness" references (exclude specs/done/ and git):
grep -r "rulebased-harness" --include='*.json' --include='*.md' --include='*.sh' --include='*.ts' . --exclude-dir=specs/done --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist && echo "FAIL: stale references" || echo "OK: no stale references"
```

- [ ] **Step 5: Verify CLI works**

```bash
node packages/harness/dist/cli.js --help
node packages/harness/dist/cli.js audit .
```

Expected: Help text shows `npx @rulebased/harness`, audit runs successfully.

- [ ] **Step 6: Commit if any fixes were needed**

```bash
git add -A && git commit -m "chore: fix build/test issues from restructure"
```

Only commit if there were fixes. If everything passed clean, skip this step.

---

### Task 11: Final squash commit (optional)

- [ ] **Step 1: Squash all restructure commits into one**

If the user prefers a single Big Bang commit (as per spec), squash all commits from Tasks 1-10 into one:

```bash
git reset --soft <commit-before-task-1>
git commit -m "chore: rename marketplace/plugin, restructure to monorepo

- Marketplace: rulebased-harness → rulebased
- Plugin: rulebased-harness → harness
- Directory: rulebased-harness/ → packages/harness/
- Merged: packages/core + packages/cli → packages/harness
- Deleted: packages/plugin-claude (duplicate)
- GitHub URL: rulebased-io/harness → rulebased-io/claude-plugin
- CLI: npx rulebased-harness → npx @rulebased/harness
- Root package: @rulebased/harness → rulebased-plugin (private)
- Build commands: npm → pnpm"
```

---

## Post-Implementation Notes

- **GitHub repo rename**: Must be done manually in GitHub Settings (`rulebased-io/harness` → `rulebased-io/claude-plugin`). GitHub auto-redirects old URLs.
- **npm publish**: Separate step. `@rulebased/core` and `@rulebased/cli` are deprecated; only `@rulebased/harness` remains.
- **Version bump**: Do NOT bump in this change. Next release will be minor bump.
