# Architecture

## MCP (Model Context Protocol)

A standardized communication protocol between Claude and external tools.

```
Claude Code (Client)
    ↕ stdio
MCP Server (harness-builder-mcp)
    ↕
HarnessBuilder (Core Logic)
```

## Project Structure

```
harness-plugin/
├── CLAUDE.md                 # → See AGENTS.md
├── AGENTS.md                 # SSOT: Project rules + routing
├── .claude/
│   ├── commands/             # Custom slash commands
│   │   └── index.md          # Command list
│   └── rules/                # Auto-applied rules
│       └── index.md          # Rule list
├── specs/                    # Specs (idea → requirements)
│   ├── todo/ / done/ / backlog/
├── tasks/                    # Tasks (implementation units)
│   ├── todo/ / done/
├── src/
│   ├── types.ts              # Types layer
│   ├── harness-builder.ts    # Service layer
│   ├── index.ts              # Runtime layer (MCP server)
│   ├── eval/                 # Eval system
│   │   ├── runner.ts
│   │   └── scorer.ts
│   └── constraints/          # Architecture constraint validation
│       └── validator.ts
├── tests/                    # Unit tests
├── evals/                    # Eval datasets & results
│   ├── datasets/
│   └── schemas/
├── docs/                     # Documentation
│   └── index.md              # Documentation routing
└── examples/                 # Usage examples
```

## Layered Dependency Model

Applies the architecture constraint concept from OpenAI Harness Engineering.

```
Types → Service → Runtime
(lower)            (upper)
```

| Layer | File | Allowed Imports |
|-------|------|-----------------|
| Types | `types.ts` | None (pure types) |
| Service | `harness-builder.ts`, `eval/*`, `constraints/*` | Types only |
| Runtime | `index.ts` | Types, Service |

Violations are automatically detected via `npm run lint`.

## MCP Server Implementation

Uses the `McpServer` class from `@modelcontextprotocol/sdk`.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "harness-builder-mcp", version: "1.0.0" });

server.tool("tool_name", "description", { /* zod schema */ }, async (args) => {
  return { content: [{ type: "text", text: "result" }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

## HarnessBuilder Class

Core logic for generating test harnesses.

```typescript
class HarnessBuilder {
  generateConfigFile(): string          // Framework configuration JSON
  generateTestTemplate(tc): string      // Test code generation
  generateIntegrationHarness(...): string  // Integration tests
  generatePerformanceHarness(...): string  // Performance tests
  getHarnessStatus(): object            // Status inquiry
}
```

## Eval System

Applies the eval pattern from OpenAI Harness Engineering.

```
Prompt → Captured Run → Checks → Score
```

- **Datasets**: `evals/datasets/*.csv` (id, should_trigger, prompt, expected_tool, tags)
- **Tier 1**: Tool invocation capability (fast)
- **Tier 2**: Generated output structure validation (medium)
- **Tier 3**: Build/execution validation (slow)
- **Regression detection**: Warns on score drops compared to previous results

## Harness Workflow

Harness rules are also applied to this project itself:

1. Idea → `specs/todo/` (write spec)
2. Spec → `tasks/todo/` (derive tasks)
3. Implementation complete → `tasks/done/`
4. All tasks complete → `specs/done/`

Detailed rules: `.claude/rules/workflow.md`
Available commands: `.claude/commands/index.md`
