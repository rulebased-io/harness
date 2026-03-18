---
name: guide-documentation
description: 문서화 평가 가이드 — 4항목 평가 방법론, 프로젝트 기본 문서 수준
type: reference
created: 2026-03-18
---

# Documentation — 평가 가이드

프로젝트의 기본 문서화 수준을 평가한다.

> 항목별 상세 정의는 [documentation.md](documentation.md) 참조.

## 왜 중요한가

README.md는 사람과 에이전트 모두가 프로젝트를 처음 만나는 문서. .gitignore는 에이전트가 불필요한 파일을 커밋하는 것을 방지하는 1차 방어선. GitHub 분석에서 잘 작성된 문서가 에이전트의 작업 품질을 직접적으로 향상시킴.

## 평가 항목 요약

> 가중치(W)의 정의는 [index.md](index.md) Summary Table이 SSOT이다.

| ID | Item | W |
|----|------|---|
| docs-readme | README.md | 2 |
| docs-gitignore | .gitignore | 2 |
| docs-license | LICENSE 파일 | 1 |
| docs-changelog | CHANGELOG | 1 |

**만점**: 6점

## 평가 방법

1. 프로젝트 루트에 `README.md` 존재 확인
2. 프로젝트 루트에 `.gitignore` 존재 확인
3. `LICENSE` 또는 `LICENSE.md` 존재 확인
4. `CHANGELOG.md`, `CHANGES.md`, 또는 GitHub Releases 사용 확인

## 등급 기준

- **A**: 4/4 — 전체 문서 완비
- **B**: important 항목 모두 통과 (README + .gitignore)
- **C**: README만 존재
- **F**: 기본 문서 전무

## 개선 전략

1. **즉시**: README.md + .gitignore 생성
2. **단기**: LICENSE 파일 추가
3. **중기**: CHANGELOG.md 또는 conventional-changelog 자동화 설정
