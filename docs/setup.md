# Installation and Deployment

## Local Development Environment Setup

```bash
# Clone
git clone <repo-url>
cd harness-plugin

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Architecture constraint validation
npm run lint
```

### Build Output

```
dist/
├── index.js           # MCP server (entry point)
├── harness-builder.js # Core logic
├── types.js           # Type definitions
├── eval/              # Eval system
└── constraints/       # Constraint validation
```

## Connecting to Claude Code

### Option A: NPM Package (after publishing)

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

### Option B: Local Build

```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

### Option C: Development Mode (tsx)

```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/src/index.ts"]
    }
  }
}
```

### Configuration File Location

| OS | Path |
|----|------|
| macOS/Linux | `~/.config/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

After connecting, restart Claude Code and verify with `/mcp`.

## Debugging with MCP Inspector

```bash
npm run build
npm run mcp:inspect
# Open http://localhost:5173 in your browser
```

## Publishing to NPM

```bash
npm login
npm version patch   # Bump version
npm publish          # Publish
```

## Team Sharing

Add `.claude.json` to the project root:

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

When team members clone the project, the MCP server loads automatically.

## Docker Deployment

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
CMD ["node", "dist/index.js"]
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Command not found" | `npm install -g harness-builder-mcp` or use an absolute path |
| MCP connection failed | Restart Claude Code, `tail -f ~/.config/Claude/logs/mcp*.log` |
| TypeScript compilation error | `npx tsc --noEmit`, `rm -rf node_modules && npm install` |
| Tools not visible | Validate the configuration file JSON format, restart Claude Code |
