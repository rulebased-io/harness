# Claude Code MCP 플러그인 개발 완벽 가이드
## 하네스 구축 플러그인 사례

---

## 📋 목차

1. [개요](#개요)
2. [MCP란 무엇인가](#mcp란-무엇인가)
3. [플러그인 아키텍처](#플러그인-아키텍처)
4. [단계별 개발 가이드](#단계별-개발-가이드)
5. [코드 설명](#코드-설명)
6. [Claude Code에 연결하기](#claude-code에-연결하기)
7. [테스트 및 배포](#테스트-및-배포)
8. [확장 및 커스터마이징](#확장-및-커스터마이징)

---

## 개요

**하네스 구축 MCP 플러그인**은 Claude Code에서 테스트 하네스를 자동으로 생성하는 도구입니다.

### 프로젝트 구조

```
harness-mcp-plugin/
├── src/
│   └── index.ts                    # MCP 서버 구현
├── dist/                            # 컴파일된 코드
├── examples/
│   └── example-test-harness.test.ts # 사용 예제
├── package.json                     # 프로젝트 메타데이터
├── tsconfig.json                   # TypeScript 설정
├── jest.config.js                  # Jest 설정
├── README.md                        # 개발 가이드
├── USAGE.md                         # 사용 설명서
└── SETUP.md                         # 설치 가이드
```

---

## MCP란 무엇인가?

**Model Context Protocol (MCP)**은 Claude와 외부 도구 간의 표준화된 통신 프로토콜입니다.

### MCP의 장점

- ✅ **표준화**: 모든 LLM이 같은 프로토콜 사용
- ✅ **보안**: 정의된 도구만 노출
- ✅ **확장성**: 쉽게 새 도구 추가 가능
- ✅ **유연성**: stdio, HTTP, WebSocket 지원

### MCP 구성 요소

```
┌─────────────────────────────────────────┐
│          Claude Code                     │
│  (클라이언트)                            │
└──────────────┬──────────────────────────┘
               │
         (stdio/HTTP)
               │
┌──────────────▼──────────────────────────┐
│      MCP Server (플러그인)               │
│  - Tools (도구)                         │
│  - Resources (자료)                     │
│  - Prompts (프롬프트)                   │
└──────────────────────────────────────────┘
               │
        (내부 처리)
               │
    ┌──────────┴──────────┐
    │                     │
 (파일)              (API)
```

---

## 플러그인 아키텍처

### 1. 도구 (Tools)

MCP 서버가 노출하는 실행 가능한 함수입니다.

```typescript
interface Tool {
  name: string;              // 도구 이름
  description: string;       // 설명
  inputSchema: {            // 입력 스키마
    type: "object";
    properties: {...};
    required: [...];
  };
}
```

### 2. 하네스 빌더 클래스

테스트 하네스를 생성하는 핵심 비즈니스 로직입니다.

```typescript
class HarnessBuilder {
  constructor(config: Partial<HarnessConfig>);
  
  // 프레임워크 설정 생성
  generateConfigFile(): string;
  
  // 테스트 템플릿 생성
  generateTestTemplate(testCase: TestCase): string;
  
  // 통합 테스트 생성
  generateIntegrationHarness(...): string;
  
  // 성능 테스트 생성
  generatePerformanceHarness(...): string;
  
  // 상태 조회
  getHarnessStatus(): object;
}
```

### 3. MCP 서버

Claude Code와의 통신을 담당합니다.

```typescript
const server = new Server({
  name: "harness-builder-mcp",
  version: "1.0.0"
});

// 도구 목록 제공
server.setRequestHandler(
  { name: "list_tools", kind: "request" },
  async () => { /* ... */ }
);

// 도구 실행
server.setRequestHandler(
  { name: "call_tool", kind: "request" },
  async (request) => { /* ... */ }
);
```

---

## 단계별 개발 가이드

### 1단계: 프로젝트 초기화

```bash
# 디렉토리 생성
mkdir harness-mcp-plugin
cd harness-mcp-plugin

# npm 초기화
npm init -y

# 필수 의존성 설치
npm install @anthropic-ai/sdk mcp
npm install --save-dev typescript @types/node tsx jest @types/jest
```

### 2단계: 설정 파일 작성

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

**package.json 스크립트**:
```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "test": "jest",
    "mcp:inspect": "npx @modelcontextprotocol/inspector node dist/index.js"
  }
}
```

### 3단계: MCP 서버 구현

**src/index.ts** 구조:

```typescript
// 1. 타입 정의
interface HarnessConfig { /* ... */ }
interface TestCase { /* ... */ }

// 2. 비즈니스 로직 클래스
class HarnessBuilder {
  // 도구 구현
}

// 3. MCP 서버 설정
const server = new Server({...});

// 4. 도구 등록
server.setRequestHandler("list_tools", async () => {
  return { tools: [...] };
});

// 5. 도구 실행 처리
server.setRequestHandler("call_tool", async (request) => {
  switch (request.name) {
    case "init_harness":
      // 구현
      break;
    // ...
  }
});

// 6. 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main().catch(console.error);
```

### 4단계: 도구 정의

각 도구는 다음을 포함합니다:

```typescript
{
  name: "init_harness",                    // 도구명
  description: "하네스를 초기화합니다",      // 설명
  inputSchema: {                           // 입력 스키마
    type: "object",
    properties: {
      name: { type: "string" },
      framework: { enum: [...] },
      // ...
    },
    required: ["name", "framework"]
  }
}
```

### 5단계: 테스트 작성

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests']
};

// tests/harness-builder.test.ts
describe('HarnessBuilder', () => {
  it('should create valid test case', () => {
    const builder = new HarnessBuilder({ name: 'test' });
    const code = builder.generateTestTemplate({
      name: 'Test',
      description: 'A test',
      execute: 'expect(true).toBe(true);',
      assertions: ['true === true']
    });
    expect(code).toContain('describe');
  });
});
```

### 6단계: 빌드 및 테스트

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 테스트
npm test

# MCP Inspector로 테스트
npm run mcp:inspect
```

---

## 코드 설명

### 핵심 메서드

#### 1. `generateConfigFile()`

테스트 프레임워크의 설정 파일을 JSON 형식으로 생성합니다.

```typescript
generateConfigFile(): string {
  const configs: Record<string, object> = {
    jest: {
      testEnvironment: "node",
      testMatch: ["**/*.test.ts"],
      // ...
    },
    mocha: {
      require: ["ts-node/register"],
      // ...
    }
  };
  return JSON.stringify(configs[this.config.framework], null, 2);
}
```

**목적**: 프로젝트에 복사하기만 하면 되는 즉시 사용 가능한 설정

#### 2. `generateTestTemplate()`

개별 테스트 케이스를 생성합니다.

```typescript
generateTestTemplate(testCase: TestCase): string {
  if (this.config.language === "typescript") {
    return this.generateTypeScriptTest(testCase);
  }
  return this.generateJavaScriptTest(testCase);
}
```

**구조**:
- Arrange: 테스트 데이터 준비
- Act: 함수 실행
- Assert: 결과 검증

#### 3. `generateIntegrationHarness()`

여러 테스트를 하나의 파일로 통합합니다.

```typescript
generateIntegrationHarness(
  testCases: TestCase[],
  setupCode: string = "",
  teardownCode: string = ""
): string {
  // 모든 테스트를 describe 블록으로 감싸기
  // beforeAll/afterAll로 전체 세팅/정리
}
```

**구조**:
```typescript
describe('Integration Test Suite', () => {
  beforeAll(() => { /* setup */ });
  
  describe('Test 1', () => { /* ... */ });
  describe('Test 2', () => { /* ... */ });
  
  afterAll(() => { /* teardown */ });
});
```

#### 4. `generatePerformanceHarness()`

성능 측정 코드를 생성합니다.

```typescript
generatePerformanceHarness(
  testCases: TestCase[],
  threshold: number = 100
): string {
  return `describe('Performance Tests', () => {
    it('should complete within ${threshold}ms', async () => {
      const start = performance.now();
      ${testCase.execute}
      const end = performance.now();
      expect(end - start).toBeLessThan(${threshold});
    });
  });`;
}
```

---

## Claude Code에 연결하기

### 1단계: 설정 파일 찾기

**macOS/Linux:**
```bash
# 설정 파일 위치
~/.config/Claude/claude_desktop_config.json

# 또는 (구 경로)
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

### 2단계: MCP 서버 등록

설정 파일에 다음을 추가합니다:

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

**로컬 개발 중인 경우:**
```json
{
  "mcpServers": {
    "harness-builder": {
      "command": "node",
      "args": ["/Users/username/harness-mcp-plugin/dist/index.js"]
    }
  }
}
```

### 3단계: Claude Code 재시작

1. Claude Code 완전 종료
2. Claude Code 재시작
3. `/mcp` 명령어로 확인:

```
/mcp

MCP Server Status
  • harness-builder: connected ✓
```

### 4단계: 사용 시작

```
Claude Code에서:
"Jest 기반의 TypeScript 하네스를 'my-app'으로 초기화해줘"
```

---

## 테스트 및 배포

### 테스트 방법

#### 1. MCP Inspector 사용 (권장)

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

브라우저에서 도구를 대화형으로 테스트할 수 있습니다.

#### 2. Jest 단위 테스트

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

#### 3. 실제 Claude Code에서 테스트

설정 후 Claude Code에서 직접 플러그인을 사용해봅니다.

### 배포 과정

#### Step 1: 로컬 테스트 완료
```bash
npm run build
npm test
npx @modelcontextprotocol/inspector node dist/index.js
```

#### Step 2: NPM 퍼블리시 (선택)
```bash
npm login
npm version patch
npm publish
```

#### Step 3: 팀과 공유

**프로젝트 루트에 `.claude.json` 추가:**
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

---

## 확장 및 커스터마이징

### 새로운 도구 추가

```typescript
// 1. HarnessBuilder 클래스에 메서드 추가
class HarnessBuilder {
  generateStressTestHarness(): string {
    // 구현
  }
}

// 2. MCP 서버에 도구 등록
server.setRequestHandler("list_tools", async () => {
  return { tools: [
    // ... 기존 도구들
    {
      name: "generate_stress_test",
      description: "스트레스 테스트 생성",
      inputSchema: { /* ... */ }
    }
  ]};
});

// 3. 도구 실행 케이스 추가
case "generate_stress_test":
  result = builder.generateStressTestHarness();
  break;
```

### 새로운 프레임워크 지원

```typescript
interface HarnessConfig {
  framework: "jest" | "mocha" | "vitest" | "playwright";
}

generateConfigFile(): string {
  const configs = {
    // ...
    playwright: {
      testDir: "./tests",
      timeout: 30000
    }
  };
}
```

### 새로운 언어 지원

```typescript
interface HarnessConfig {
  language: "typescript" | "javascript" | "python" | "go";
}

generateTestTemplate(testCase: TestCase): string {
  switch (this.config.language) {
    case "python":
      return this.generatePythonTest(testCase);
    case "go":
      return this.generateGoTest(testCase);
  }
}
```

---

## 사용 예제

### 예제 1: API 테스트 하네스

```
Claude Code:
"Express.js API의 GET /users/:id 엔드포인트에 대한 완전한 테스트 하네스를 만들어줄래?
존재하는 사용자 조회, 없는 사용자, 잘못된 ID 형식을 테스트해야 해"

생성 결과:
describe('User API', () => {
  it('should return user when exists', () => {
    const result = await GET('/users/1');
    expect(result.status).toBe(200);
    expect(result.body.id).toBe(1);
  });
  
  it('should return 404 when not found', () => {
    const result = await GET('/users/999');
    expect(result.status).toBe(404);
  });
  
  it('should return 400 for invalid ID', () => {
    const result = await GET('/users/invalid');
    expect(result.status).toBe(400);
  });
});
```

### 예제 2: 데이터베이스 통합 테스트

```
Claude Code:
"PostgreSQL 데이터베이스의 사용자 CRUD 작업을 테스트하는 하네스를 만들어줘.
마이그레이션, 데이터 생성, 조회, 업데이트, 삭제를 포함해야 해"

생성 결과:
describe('User Database', () => {
  beforeAll(async () => {
    await runMigrations();
  });
  
  it('should create user', () => { /* ... */ });
  it('should read user', () => { /* ... */ });
  it('should update user', () => { /* ... */ });
  it('should delete user', () => { /* ... */ });
  
  afterAll(async () => {
    await cleanupDatabase();
  });
});
```

---

## 문제 해결

| 문제 | 해결책 |
|------|-------|
| "Command not found" | NPM 전역 설치: `npm install -g harness-builder-mcp` |
| MCP 연결 안 됨 | Claude Code 재시작, 로그 확인 |
| 도구가 보이지 않음 | 설정 파일 다시 확인, 포맷 검증 |
| TypeScript 오류 | `npx tsc --noEmit` 실행해서 문제 확인 |

---

## 다음 단계

1. ✅ 기본 플러그인 구현 완료
2. → **프레임워크 확장** (Mocha, Playwright 등)
3. → **언어 지원 확장** (Python, Go, Java)
4. → **고급 기능** (커버리지 리포트, CI/CD 통합)
5. → **커뮤니티** (GitHub, NPM 퍼블리시)

---

## 참고 자료

- Claude Code MCP 문서
- MCP Python SDK
- MCP Testing Framework

---

## 지원

- 📧 이메일: support@example.com
- 🐛 버그 리포트: GitHub Issues
- 💬 토론: GitHub Discussions
- 📚 문서: README.md, USAGE.md, SETUP.md
