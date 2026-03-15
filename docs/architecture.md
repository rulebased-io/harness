# 아키텍처

## MCP (Model Context Protocol)

Claude와 외부 도구 간의 표준화된 통신 프로토콜입니다.

```
Claude Code (클라이언트)
    ↕ stdio
MCP Server (harness-builder-mcp)
    ↕
HarnessBuilder (핵심 로직)
```

## 프로젝트 구조

```
harness-plugin/
├── CLAUDE.md                 # → AGENTS.md 참조
├── AGENTS.md                 # SSOT: 프로젝트 규칙 + 라우팅
├── .claude/
│   ├── commands/             # 커스텀 slash 커맨드
│   │   └── index.md          # 커맨드 목록
│   └── rules/                # 자동 적용 규칙
│       └── index.md          # 규칙 목록
├── specs/                    # 스펙 (아이디어 → 요구사항)
│   ├── todo/ / done/ / backlog/
├── tasks/                    # 태스크 (구현 단위)
│   ├── todo/ / done/
├── src/
│   ├── types.ts              # Types 계층
│   ├── harness-builder.ts    # Service 계층
│   ├── index.ts              # Runtime 계층 (MCP 서버)
│   ├── eval/                 # Eval 시스템
│   │   ├── runner.ts
│   │   └── scorer.ts
│   └── constraints/          # 아키텍처 제약 검증
│       └── validator.ts
├── tests/                    # 단위 테스트
├── evals/                    # Eval 데이터셋 & 결과
│   ├── datasets/
│   └── schemas/
├── docs/                     # 문서
│   └── index.md              # 문서 라우팅
└── examples/                 # 사용 예제
```

## 계층형 의존성 모델

OpenAI Harness Engineering의 아키텍처 제약 개념을 적용합니다.

```
Types → Service → Runtime
(하위)            (상위)
```

| 계층 | 파일 | import 가능 |
|------|------|-------------|
| Types | `types.ts` | 없음 (순수 타입) |
| Service | `harness-builder.ts`, `eval/*`, `constraints/*` | Types만 |
| Runtime | `index.ts` | Types, Service |

위반은 `npm run lint`로 자동 감지됩니다.

## MCP 서버 구현

`@modelcontextprotocol/sdk`의 `McpServer` 클래스를 사용합니다.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "harness-builder-mcp", version: "1.0.0" });

server.tool("tool_name", "설명", { /* zod 스키마 */ }, async (args) => {
  return { content: [{ type: "text", text: "결과" }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

## HarnessBuilder 클래스

테스트 하네스 생성의 핵심 로직입니다.

```typescript
class HarnessBuilder {
  generateConfigFile(): string          // 프레임워크 설정 JSON
  generateTestTemplate(tc): string      // 테스트 코드 생성
  generateIntegrationHarness(...): string  // 통합 테스트
  generatePerformanceHarness(...): string  // 성능 테스트
  getHarnessStatus(): object            // 상태 조회
}
```

## Eval 시스템

OpenAI Harness Engineering의 eval 패턴을 적용합니다.

```
Prompt → Captured Run → Checks → Score
```

- **데이터셋**: `evals/datasets/*.csv` (id, should_trigger, prompt, expected_tool, tags)
- **Tier 1**: 도구 호출 가능 여부 (빠름)
- **Tier 2**: 생성 결과 구조 검증 (중간)
- **Tier 3**: 빌드/실행 검증 (느림)
- **회귀 감지**: 이전 결과와 비교하여 점수 하락 경고

## 하네스 워크플로우

이 프로젝트 자체에도 하네스 규칙이 적용됩니다:

1. 아이디어 → `specs/todo/` (spec 작성)
2. spec → `tasks/todo/` (task 도출)
3. 구현 완료 → `tasks/done/`
4. 모든 task 완료 → `specs/done/`

자세한 규칙: `.claude/rules/workflow.md`
사용 가능한 커맨드: `.claude/commands/index.md`
