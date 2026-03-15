# Harness Builder MCP 플러그인

Claude Code에서 테스트 하네스를 쉽게 구축할 수 있는 MCP 플러그인입니다.

## 기능

### 1. 하네스 초기화 (`init_harness`)
테스트 프레임워크와 프로젝트 설정을 초기화합니다.

**사용 예제:**
```typescript
// Claude Code에서
"Jest 기반의 TypeScript 테스트 하네스를 'my-test-suite'라는 이름으로 초기화해줘"

// 요청 파라미터:
{
  "name": "my-test-suite",
  "framework": "jest",
  "language": "typescript",
  "testDir": "./tests",
  "outputDir": "./test-results",
  "parallel": true
}
```

**응답:**
```json
{
  "message": "하네스 'my-test-suite' 초기화 완료",
  "config": {
    "name": "my-test-suite",
    "framework": "jest",
    "language": "typescript",
    "testDir": "./tests",
    "outputDir": "./test-results",
    "parallel": true,
    "timeout": 30000,
    "generatedAt": "2024-01-20T10:30:00.000Z"
  },
  "configFile": "{ Jest 설정 JSON }"
}
```

### 2. 테스트 케이스 생성 (`generate_test_case`)
개별 테스트 케이스 템플릿을 생성합니다.

**사용 예제:**
```typescript
// Claude Code에서
"사용자 로그인 기능을 테스트하는 테스트 케이스를 만들어줘.
 이메일과 비밀번호를 입력받아 로그인을 시도하고, 성공 여부를 확인해야 해"

// 요청 파라미터:
{
  "testName": "User Login",
  "description": "사용자 로그인 성공 테스트",
  "execute": "const result = await loginUser('test@example.com', 'password123');",
  "assertions": ["result.success === true", "result.token !== null"],
  "setup": "const loginUser = require('./auth').loginUser;",
  "teardown": "// Clean up after test"
}
```

**생성 결과:**
```typescript
describe('User Login', () => {
  beforeEach(() => {
    const loginUser = require('./auth').loginUser;
  });
  
  it('사용자 로그인 성공 테스트', async () => {
    // Setup
    const loginUser = require('./auth').loginUser;
    
    // Execute
    const result = await loginUser('test@example.com', 'password123');
    
    // Assertions
    expect(result.success === true).toBeTruthy();
    expect(result.token !== null).toBeTruthy();
  });
  
  afterEach(() => {
    // Clean up after test
  });
});
```

### 3. 통합 테스트 스위트 생성 (`generate_integration_suite`)
여러 테스트 케이스를 하나의 스위트로 통합합니다.

**사용 예제:**
```typescript
// Claude Code에서
"데이터베이스 연결, 사용자 조회, 업데이트를 순서대로 테스트하는 통합 테스트를 만들어줘"

// 요청 파라미터:
{
  "testCases": [
    {
      "name": "DB Connection",
      "description": "데이터베이스 연결 테스트",
      "execute": "const db = await connectDB();",
      "assertions": ["db.connected === true"]
    },
    {
      "name": "User Query",
      "description": "사용자 조회 테스트",
      "execute": "const user = await db.query('SELECT * FROM users WHERE id = 1');",
      "assertions": ["user.id === 1", "user.name !== null"]
    }
  ],
  "setupCode": "const { connectDB } = require('./database');",
  "teardownCode": "await db.close();"
}
```

### 4. 성능 테스트 하네스 생성 (`generate_performance_harness`)
응답 시간을 측정하는 성능 테스트를 생성합니다.

**사용 예제:**
```typescript
// Claude Code에서
"API 응답 시간이 100ms 이내인지 확인하는 성능 테스트를 만들어줘"

// 요청 파라미터:
{
  "testCases": [
    {
      "name": "API Performance",
      "description": "API 응답 시간 측정",
      "execute": "await fetch('https://api.example.com/users');",
      "assertions": ["response.status === 200"]
    }
  ],
  "threshold": 100
}
```

**생성 결과:**
```typescript
describe('Performance Tests', () => {
  it('API 응답 시간 측정 should complete within 100ms', async () => {
    const start = performance.now();
    await fetch('https://api.example.com/users');
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
```

### 5. 설정 조회 (`get_harness_config`)
현재 하네스의 설정을 조회합니다.

**사용 예제:**
```typescript
// Claude Code에서
"현재 하네스 설정을 보여줘"
```

## 설치 및 사용

### 1. 플러그인 설치
```bash
npm install harness-builder-mcp
```

### 2. Claude Code 설정
Claude Code의 설정 파일에 다음을 추가합니다:

**macOS/Linux:**
```bash
# 설정 파일 경로
~/.config/Claude/claude_desktop_config.json
```

**Windows:**
```bash
# 설정 파일 경로
%APPDATA%\Claude\claude_desktop_config.json
```

**설정 내용:**
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

### 3. Claude Code 재시작
설정 후 Claude Code를 재시작합니다.

### 4. 플러그인 연결 확인
Claude Code에서 `/mcp` 명령어를 실행하여 플러그인이 연결되었는지 확인합니다:
```
/mcp
```

## 사용 사례

### 사례 1: 새로운 API 엔드포인트 테스트
```
Claude Code에게:
"Express API의 /users/:id 엔드포인트에 대한 완전한 테스트 하네스를 만들어줘.
GET 요청으로 존재하는 사용자를 조회, 존재하지 않는 사용자 조회, 
그리고 잘못된 ID 형식 테스트를 포함해야 해"
```

### 사례 2: 데이터베이스 마이그레이션 테스트
```
Claude Code에게:
"PostgreSQL 마이그레이션을 테스트하는 하네스를 만들어줘.
마이그레이션 업, 다운, 그리고 이미 적용된 마이그레이션 재실행 테스트를 포함해야 해"
```

### 사례 3: 성능 회귀 테스트
```
Claude Code에게:
"5개의 API 엔드포인트에 대한 성능 테스트 하네스를 만들어줘.
각 엔드포인트는 200ms 이내에 응답해야 해"
```

## 개발 및 디버깅

### MCP Inspector로 테스트
```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

이 명령어는 브라우저에서 MCP 서버의 도구들을 테스트할 수 있는 인터페이스를 제공합니다.

### 로컬 개발 모드
```bash
npm run dev
```

## 지원 프레임워크

- **Jest** - TypeScript/JavaScript 프로젝트용 (권장)
- **Mocha** - 전통적인 Node.js 테스팅 프레임워크
- **Vitest** - Vite 기반 프로젝트용
- **Custom** - 사용자 정의 테스트 프레임워크

## 지원 언어

- TypeScript
- JavaScript
- Python (기본 구조)

## 팁 및 최적화

1. **템플릿 재사용**: 자주 사용하는 설정은 저장해두고 복사해서 사용하세요.

2. **단계적 생성**: 먼저 작은 테스트 케이스부터 만들고, 나중에 통합 스위트를 만드세요.

3. **성능 임계값**: 프로덕션 환경의 성능을 고려하여 임계값을 설정하세요.

4. **CI/CD 통합**: 생성된 테스트는 GitHub Actions, GitLab CI 등에 쉽게 통합될 수 있습니다.

## 라이센스

MIT
