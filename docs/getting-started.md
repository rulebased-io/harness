# Getting Started

Harness Builder MCP is an MCP server that automatically generates test harnesses in Claude Code.

## Quick Start

### 1. Register the MCP Server in Claude Code

Open the configuration file and add the MCP server:

```bash
# macOS/Linux
~/.config/Claude/claude_desktop_config.json
```

```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "npx",
      "args": ["-y", "harness-builder-mcp"]
    }
  }
}
```

### 2. Restart Claude Code

### 3. Verify the Connection

In Claude Code, type `/mcp` and confirm `harness-builder: connected`

### 4. Start Using It

```
"Initialize a Jest-based TypeScript harness named 'my-project'"
```

## 5 Core Tools

| Tool | Description |
|------|-------------|
| `init_harness` | Initialize test framework configuration |
| `generate_test_case` | Generate individual test cases |
| `generate_integration_suite` | Combine multiple tests into an integration suite |
| `generate_performance_harness` | Performance tests (response time measurement) |
| `get_harness_config` | View current configuration |

## Supported Frameworks

- **Jest** (recommended) - TypeScript/JavaScript
- **Mocha** - Traditional Node.js
- **Vitest** - Vite projects
- **Custom** - User-defined

## Supported Languages

- TypeScript, JavaScript, Python

## Usage Examples

### API Testing

```
"Create a harness to test the /api/users endpoint of an Express API.
Include normal retrieval, missing data, and error handling."
```

### DB Integration Testing

```
"Create an integration harness to test CRUD operations on a PostgreSQL users table."
```

### Performance Testing

```
"Create a performance test to verify API responses are within 100ms."
```

## Next Steps

- Detailed usage guide → [usage.md](usage.md)
- Development/contributing → [architecture.md](architecture.md)
- Installation/deployment → [setup.md](setup.md)
