# Harness Builder MCP - 설치 및 배포 가이드

## 1단계: 플러그인 빌드

### 로컬 개발 환경에서 빌드
```bash
cd harness-mcp-plugin

# 의존성 설치
npm install

# TypeScript 빌드
npm run build

# 빌드 결과 확인
ls -la dist/
```

### 빌드 출력
```
dist/
├── index.js           # 컴파일된 JavaScript
├── index.d.ts         # TypeScript 타입 정의
└── index.js.map       # 소스맵
```

## 2단계: NPM에 퍼블리시 (선택사항)

### 2.1 NPM 계정 생성 및 로그인
```bash
npm login
# 또는
npm adduser
```

### 2.2 package.json 버전 업데이트
```json
{
  "version": "1.0.0",
  "name": "harness-builder-mcp",
  "private": false
}
```

### 2.3 퍼블리시
```bash
npm publish

# 비공개 패키지 (조직)
npm publish --access restricted

# Scoped 패키지 (개인)
npm publish --access public
```

## 3단계: Claude Code에 연결

### 3.1 설정 파일 위치 찾기

**macOS/Linux:**
```bash
# 설정 파일 경로
~/.config/Claude/claude_desktop_config.json

# 또는 (구 버전)
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
# 설정 파일 경로
%APPDATA%\Claude\claude_desktop_config.json
```

### 3.2 설정 파일 편집

**옵션 A: NPM 패키지로 설치한 경우**
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

**옵션 B: 로컬 개발 모드 (개발 중)**
```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

**옵션 C: 개발 서버로 실행 (tsx 사용)**
```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "npx",
      "args": ["tsx", "/path/to/src/index.ts"]
    }
  }
}
```

### 3.3 Claude Code 재시작
Claude Code를 완전히 종료했다가 다시 실행합니다.

### 3.4 연결 확인
Claude Code에서:
```
/mcp
```

다음과 같은 메시지가 표시되면 성공입니다:
```
MCP Server Status
  • harness-builder: connected
```

## 4단계: 검증 및 테스트

### 테스트 1: 하네스 초기화
```
Claude Code에서:
"Jest 기반의 TypeScript 하네스를 'test-project'로 초기화해줘"
```

예상 응답:
```
하네스 'test-project' 초기화 완료
...설정 정보...
```

### 테스트 2: 테스트 케이스 생성
```
Claude Code에서:
"간단한 두 수를 더하는 함수의 테스트 케이스를 만들어줘"
```

예상 응답:
```typescript
describe('...', () => {
  it('...', async () => {
    // 테스트 코드
  });
});
```

## 5단계: 고급 설정

### 5.1 환경 변수 추가
```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "npx",
      "args": ["-y", "harness-builder-mcp"],
      "env": {
        "DEBUG": "true",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

### 5.2 Docker로 실행
```bash
# Dockerfile 작성
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY dist/ ./dist/

CMD ["node", "dist/index.js"]
```

```bash
# 빌드
docker build -t harness-builder-mcp .

# Claude Code 설정
{
  "mcpServers": {
    "harness-builder": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "harness-builder-mcp"]
    }
  }
}
```

## 6단계: 팀과 공유

### 6.1 설정 파일 공유
```bash
# 설정 파일을 프로젝트에 커밋
git add .claude.json
git commit -m "Add harness-builder MCP configuration"
```

### 6.2 `.claude.json` 포맷 (프로젝트별 설정)
프로젝트 루트에 `.claude.json` 파일을 생성:
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

팀원들이 프로젝트를 받으면 자동으로 MCP 서버가 로드됩니다.

## 7단계: 문제 해결

### 문제: "Command not found"
```bash
# 해결책 1: 전역 설치
npm install -g harness-builder-mcp

# 해결책 2: 전체 경로 지정
{
  "command": "/Users/username/.npm/_npx/abc123/bin/harness-builder-mcp"
}

# 해결책 3: npx 직접 사용
npm install npx -g
```

### 문제: 연결이 안 됨
```bash
# MCP 로그 확인
# macOS/Linux
tail -f ~/.config/Claude/logs/mcp*.log

# Windows
Get-Content $env:APPDATA\Claude\logs\mcp*.log -Tail 50
```

### 문제: 포트 충돌
기본 포트가 사용 중인 경우:
```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "npx",
      "args": ["-y", "harness-builder-mcp"],
      "env": {
        "PORT": "3001"
      }
    }
  }
}
```

## 8단계: 지속적 개선

### 버전 업데이트
```bash
# package.json 버전 업데이트
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# NPM에 퍼블리시
npm publish

# 또는 로컬에서
npm run build
```

### 기능 추가
1. `src/index.ts`에 새로운 도구 추가
2. 빌드: `npm run build`
3. 테스트: `npm test`
4. 배포: `npm publish`

## 체크리스트

- [ ] 로컬에서 빌드 성공
- [ ] MCP Inspector에서 도구 확인
- [ ] Claude Code 설정 파일 업데이트
- [ ] Claude Code 재시작
- [ ] `/mcp` 명령어로 연결 확인
- [ ] 기본 기능 테스트
- [ ] 팀원과 설정 공유
- [ ] 문서화 완료

## 지원

문제가 발생하면:
1. 로그 파일 확인
2. MCP Inspector로 디버깅
3. GitHub Issues에 보고
