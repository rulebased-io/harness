# GitHub 오거니제이션 이름 변형 패턴 조사 결과

- **생성일**: 2026-03-15
- **상태**: todo
- **우선순위**: medium

## 핵심 발견

**GitHub org 이름에 언더스코어(`_`)는 사용 불가.** 영숫자와 하이픈(`-`)만 허용.

## rulebased 가용 현황

| URL | 상태 |
|-----|------|
| `github.com/rulebased` | 점유됨 (비활성 개인 계정, 2015) |
| `github.com/rulebasedio` | 점유됨 (빈 org, 2025) |
| `github.com/rulebased-io` | **사용 가능** |
| `github.com/rulebased-dev` | **사용 가능** |
| `github.com/rulebased-ai` | **사용 가능** |
| `github.com/rulebased-hq` | **사용 가능** |

## 실제 사례 (유명 프로젝트)

### AI 회사들 (`X-ai` 패턴)
- langchain-ai, cohere-ai, stability-ai, mistralai, deepset-ai

### SaaS 회사들 (`XHQ` 패턴)
- slackhq, notionhq, brexhq, dopplerhq

### .io 도메인 (`Xio` 패턴)
- socketio (socket.io), temporalio (temporal.io), n8nio (n8n.io)

### 기타
- `getX`: getsentry, getredash
- `withX`: withastro
- `Xlabs`: modal-labs, knocklabs
- `X-oss`: t3-oss
- `Xs`: anthropics

## 결정 필요

`rulebased-io`, `rulebased-ai`, `rulebased-dev`, `rulebased-hq` 중 선택
