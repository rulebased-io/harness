# 설치 및 배포

## 로컬 개발 환경 세팅

```bash
# 클론
git clone <repo-url>
cd harness-plugin

# 의존성 설치
npm install

# 빌드
npm run build

# 테스트
npm test

# 아키텍처 제약 검증
npm run lint
```

### 빌드 결과

```
dist/
├── index.js           # MCP 서버 (entry point)
├── harness-builder.js # 핵심 로직
├── types.js           # 타입 정의
├── eval/              # Eval 시스템
└── constraints/       # 제약 검증
```

## Claude Code에 연결

### 옵션 A: NPM 패키지 (배포 후)

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

### 옵션 B: 로컬 빌드

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

### 옵션 C: 개발 모드 (tsx)

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

### 설정 파일 위치

| OS | 경로 |
|----|------|
| macOS/Linux | `~/.config/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

연결 후 Claude Code 재시작 → `/mcp`로 확인

## MCP Inspector로 디버깅

```bash
npm run build
npm run mcp:inspect
# 브라우저에서 http://localhost:5173 접속
```

## NPM 배포

```bash
npm login
npm version patch   # 버전 업
npm publish          # 퍼블리시
```

## 팀 공유

프로젝트 루트에 `.claude.json` 추가:

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

팀원이 프로젝트를 받으면 자동으로 MCP 서버 로드.

## Docker 배포

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
CMD ["node", "dist/index.js"]
```

## 문제 해결

| 문제 | 해결 |
|------|------|
| "Command not found" | `npm install -g harness-builder-mcp` 또는 절대경로 사용 |
| MCP 연결 안 됨 | Claude Code 재시작, `tail -f ~/.config/Claude/logs/mcp*.log` |
| TypeScript 컴파일 오류 | `npx tsc --noEmit`, `rm -rf node_modules && npm install` |
| 도구 안 보임 | 설정 파일 JSON 포맷 검증, Claude Code 재시작 |
