---
name: guide-constraints
description: 제약 조건 평가 가이드 — 5항목 평가 방법론, 에이전트 코드 품질 자동 보장
type: reference
created: 2026-03-18
---

# Constraints — 평가 가이드

에이전트가 생성한 코드의 품질을 자동으로 보장하는 아키텍처 제약을 평가한다.

> 항목별 상세 정의는 [constraints.md](constraints.md) 참조.

## 왜 중요한가

OpenAI 하네스 엔지니어링의 두 번째 기둥 "Architectural Constraints". Stripe는 모든 에이전트 PR이 CI(린트+테스트)를 통과해야 머지 가능하게 하여 주당 1,300+ PR을 안전하게 머지. 제약 없는 에이전트는 동작하지만 유지보수 불가능한 코드를 생산.

## 평가 항목 요약

> 가중치(W)의 정의는 [index.md](index.md) Summary Table이 SSOT이다.

| ID | Item | W |
|----|------|---|
| cst-lint | 린터/포매터 | 2 |
| cst-precommit | Pre-commit 훅 | 1 |
| cst-type-safety | 타입 안전성 | 2 |
| cst-editorconfig | .editorconfig | 1 |
| cst-commit-convention | 커밋 컨벤션 | 1 |

**만점**: 7점

## 평가 방법

1. 린터 설정 파일 탐색: `.eslintrc*`, `eslint.config.*`, `biome.json`, `.prettierrc*`
2. Pre-commit 훅 설정: `.husky/`, `lefthook.yml`, `.pre-commit-config.yaml`
3. 타입 검사: `tsconfig.json`의 `strict: true`, `mypy.ini`, `pyproject.toml`
4. `.editorconfig` 파일 존재 확인
5. 커밋 컨벤션: `commitlint.config.*`, `.czrc`, AGENTS.md 내 커밋 규칙

## 설정 예시

### cst-lint — 린터/포매터

**ESLint (eslint.config.js):**
```javascript
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  },
];
```

**Biome (biome.json):**
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": { "noExplicitAny": "error" }
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

### cst-type-safety — 타입 안전성

**TypeScript (tsconfig.json 발췌):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}
```

**Python (pyproject.toml 발췌):**
```toml
[tool.mypy]
strict = true
warn_return_any = true
disallow_untyped_defs = true
```

### cst-precommit — Pre-commit 훅

**Husky + lint-staged:**
```bash
# 설치
npx husky init
npm install --save-dev lint-staged
```

`.husky/pre-commit`:
```bash
npx lint-staged
```

`package.json` 발췌:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**Lefthook (lefthook.yml):**
```yaml
pre-commit:
  commands:
    lint:
      glob: "*.{ts,tsx}"
      run: npx eslint --fix {staged_files}
    format:
      glob: "*.{ts,tsx,json,md}"
      run: npx prettier --write {staged_files}
```

### cst-editorconfig

**.editorconfig:**
```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

### cst-commit-convention — 커밋 컨벤션

**commitlint (commitlint.config.js):**
```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore',
    ]],
    'subject-max-length': [2, 'always', 72],
  },
};
```

Husky 연동 (`.husky/commit-msg`):
```bash
npx --no -- commitlint --edit "$1"
```

## 등급 기준

- **A**: 5/5 — 린터 + 타입 + pre-commit + editorconfig + 커밋 컨벤션 완비
- **B**: important 항목 모두 통과 (린터 + 타입)
- **C**: 린터 또는 타입 중 하나만 존재
- **F**: 제약 조건 전무

## 개선 전략

1. **즉시**: `npx eslint --init` 또는 `npx @biomejs/biome init`
2. **단기**: `tsconfig.json`에 `"strict": true` 설정
3. **중기**: `npx husky init` + pre-commit에 lint-staged 연동
4. **장기**: commitlint + conventional commits 도입
