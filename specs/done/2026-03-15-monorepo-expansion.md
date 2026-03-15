# 모노레포 + Vite 재검토 - 확장성 관점

- **생성일**: 2026-03-15
- **상태**: backlog
- **우선순위**: medium

## 사용자 지적

- 앞으로 docs 사이트(pages 배포)가 추가될 수 있음
- Vite 없이 빌드 번들/폴더 설정이 어려울 수 있음
- 확장을 고려해서 지금부터 구조를 잡는 게 나을 수 있음

## 예상되는 패키지 후보

| 패키지 | 용도 | 빌드 도구 |
|--------|------|-----------|
| `packages/core` | auditor, recommender, initializer | tsc 또는 tsup |
| `packages/cli` | CLI 엔트리포인트 | tsc 또는 tsup |
| `packages/plugin` | Claude Code 플러그인 (skills, hooks, agents) | 없음 (마크다운) |
| `packages/docs` 또는 `apps/docs` | rulebased.io 문서 사이트 | Vite + VitePress/Astro/등 |

## 판단 포인트

- pnpm workspace가 모노레포의 사실상 표준
- turborepo로 빌드 캐싱/병렬화
- docs 사이트가 추가되면 Vite 기반 프레임워크가 자연스러움
- 지금 잡아놓으면 나중에 마이그레이션 비용 없음
- 반면 현재 규모에서는 오버엔지니어링 가능성
