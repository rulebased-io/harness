---
name: workflow
description: 워크플로우 평가 항목 — specs, tasks, backlog, 템플릿, 아카이브 구조
type: reference
created: 2026-03-18
---

# Workflow (5 items)

에이전트의 체계적인 작업 계획과 추적을 위한 워크플로우 구조.

---

### wf-specs-dir
- **Weight**: → index.md 참조
- **What**: specs 디렉토리 존재 여부
- **Why**: 구현 전 스펙을 먼저 작성하는 습관은 OpenAI 하네스 엔지니어링의 핵심. 에이전트에게 무엇을 만들지 명확히 전달.
- **How to Check**: `specs/` 또는 `spec/` 디렉토리 존재
- **Fix**: `mkdir -p specs/todo specs/done specs/backlog`
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### wf-tasks-dir
- **Weight**: → index.md 참조
- **What**: tasks 디렉토리 존재 여부
- **Why**: spec에서 도출된 구체적 작업 단위를 추적. 에이전트가 현재 무엇을 해야 하는지 명확히 알 수 있음.
- **How to Check**: `tasks/` 또는 `task/` 디렉토리 존재
- **Fix**: `mkdir -p tasks/todo tasks/done`
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### wf-backlog
- **Weight**: → index.md 참조
- **What**: backlog 디렉토리 존재 여부
- **Why**: 아이디어와 구현 사이의 버퍼. "다음 할 작업은?" 질문 시 우선순위 기반 제안이 가능해짐.
- **How to Check**: `specs/backlog/` 또는 `backlog/` 디렉토리 존재
- **Fix**: `mkdir -p specs/backlog`
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)

---

### wf-spec-template
- **Weight**: → index.md 참조
- **What**: spec 작성 템플릿 존재 여부
- **Why**: 템플릿이 있으면 에이전트가 일관된 형식으로 스펙을 작성. 사람과 에이전트 모두 빠르게 파악 가능.
- **How to Check**: `specs/` 또는 `templates/` 하위에 템플릿 파일 존재
- **Fix**: spec 템플릿 파일 생성 (제목, 목적, 요구사항, 완료 조건 등)
- **Reference**: [Martin Fowler — Harness Engineering](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)

---

### wf-done-archive
- **Weight**: → index.md 참조
- **What**: 완료 작업 아카이브 구조 존재
- **Why**: 완료된 spec/task를 보관하면 에이전트가 과거 결정과 맥락을 참조 가능. 반복 작업 방지.
- **How to Check**: `specs/done/` 또는 `tasks/done/` 디렉토리 존재
- **Fix**: `mkdir -p specs/done tasks/done`
- **Reference**: [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)
