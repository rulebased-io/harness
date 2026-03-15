# Harness Builder MCP 플러그인 개발 가이드

이 문서는 Claude Code에서 사용할 **하네스 구축 MCP 플러그인**을 개발하는 방법을 설명합니다.

## 목차

1. [개요](#개요)
2. [프로젝트 구조](#프로젝트-구조)
3. [설치 및 실행](#설치-및-실행)
4. [플러그인 기능](#플러그인-기능)
5. [확장 및 커스터마이징](#확장-및-커스터마이징)
6. [테스트](#테스트)
7. [배포](#배포)

## 개요

**Harness Builder MCP**는 Claude Code에서 테스트 하네스를 자동으로 생성하고 관리할 수 있는 MCP(Model Context Protocol) 서버입니다.

### 주요 기능

- ✅ **하네스 초기화**: 테스트 프레임워크 설정
- ✅ **테스트 케이스 생성**: 자동 템플릿 생성
- ✅ **통합 테스트**: 여러 테스트를 하나의 스위트로 통합
- ✅ **성능 테스트**: 응답 시간 측정 테스트
- ✅ **설정 관리**: 하네스 설정 조회 및 수정

## 프로젝트 구조

```
harness-mcp-plugin/
├── src/
│   └── index.ts              # MCP 서버 메인 파일
├── dist/                      # 컴파일된 JavaScript
├── examples/
│   └── example-test-harness.test.ts  # 사용 예제
├── package.json              # 프로젝트 메타데이터
├── tsconfig.json            # TypeScript 설정
├── jest.config.js           # Jest 설정
├── USAGE.md                 # 사용 설명서
├── SETUP.md                 # 설치 가이드
└── README.md                # 이 파일
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

**설치되는 주요 패키지:**
- `@anthropic-ai/sdk`: Anthropic API 클라이언트
- `mcp`: Model Context Protocol 라이브러리
- `typescript`: TypeScript 컴파일러
- `jest`: 테스팅 프레임워크
- `tsx`: TypeScript 실행기

### 2. 개발 모드 실행

```bash
npm run dev
```

이 명령어는 `tsx`를 사용해 TypeScript를 직접 실행합니다.

### 3. 빌드

```bash
npm run build
```

TypeScript를 JavaScript로 컴파일하여 `dist/` 디렉토리에 저장합니다.

### 4. 프로덕션 실행

```bash
npm start
```

컴파일된 JavaScript를 실행합니다.

### 5. MCP Inspector로 테스트

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

브라우저에서 `http://localhost:5173`에 접속하여 MCP 서버의 도구들을 테스트할 수 있습니다.

## 플러그인 기능

### 도구 1: init_harness

**목적**: 테스트 프로젝트를 초기화합니다.

**입력 파라미터**:
```typescript
{
  name: string;              // 하네스 이름
  framework: 'jest' | 'mocha' | 'vitest' | 'custom'; // 테스트 프레임워크
  language?: 'typescript' | 'javascript' | 'python'; // 언어 (기본값: typescript)
  testDir?: string;          // 테스트 디렉토리 (기본값: ./tests)
  outputDir?: string;        // 결과 디렉토리 (기본값: ./test-results)
  parallel?: boolean;        // 병렬 실행 여부 (기본값: true)
  timeout?: number;          // 타임아웃 (ms, 기본값: 30000)
}
```

**출력**:
```json
{
  "message": "하네스 초기화 완료",
  "config": { /* 설정 객체 */ },
  "configFile": "{ /* 프레임워크 설정 JSON */ }"
}
```

### 도구 2: generate_test_case

**목적**: 개별 테스트 케이스를 생성합니다.

**입력 파라미터**:
```typescript
{
  testName: string;           // 테스트 이름
  description: string;        // 설명
  execute: string;            // 실행 코드
  assertions: string[];       // 단언 배열
  setup?: string;             // 세팅 코드
  teardown?: string;          // 정리 코드
}
```

### 도구 3: generate_integration_suite

**목적**: 여러 테스트 케이스를 통합합니다.

**입력 파라미터**:
```typescript
{
  testCases: TestCase[];      // 테스트 케이스 배열
  setupCode?: string;         // 전체 세팅
  teardownCode?: string;      // 전체 정리
}
```

### 도구 4: generate_performance_harness

**목적**: 성능 테스트 하네스를 생성합니다.

**입력 파라미터**:
```typescript
{
  testCases: TestCase[];      // 테스트 케이스 배열
  threshold?: number;         // 성능 임계값 (ms, 기본값: 100)
}
```

## 확장 및 커스터마이징

### 새로운 도구 추가

1. **도구 클래스에 메서드 추가**:

```typescript
// HarnessBuilder 클래스에 추가
generateStressTestHarness(
  testCases: TestCase[],
  concurrency: number = 10
): string {
  // 스트레스 테스트 코드 생성
  return `describe('Stress Tests', () => {
    // 구현...
  });`;
}
```

2. **MCP 서버에 도구 등록**:

```typescript
// list_tools 핸들러에 추가
{
  name: "generate_stress_test",
  description: "동시성 테스트 하네스 생성",
  inputSchema: {
    type: "object" as const,
    properties: {
      testCases: { type: "array", description: "테스트 케이스" },
      concurrency: { type: "number", description: "동시성 수준" }
    },
    required: ["testCases"],
  },
}
```

3. **call_tool 핸들러에 케이스 추가**:

```typescript
case "generate_stress_test":
  result = {
    message: "스트레스 테스트 하네스 생성 완료",
    stressCode: builder.generateStressTestHarness(args.testCases, args.concurrency)
  };
  break;
```

### 새로운 프레임워크 지원 추가

1. **프레임워크 설정 추가** (HarnessBuilder.generateConfigFile):

```typescript
const configs: Record<string, object> = {
  // ... 기존 프레임워크들
  playwright: {
    testDir: "./tests",
    outputDir: "./test-results",
    retries: 2,
    timeout: 30000,
  },
};
```

2. **프레임워크별 템플릿 생성** (필요시):

```typescript
private generatePlaywrightTest(testCase: TestCase): string {
  return `test('${testCase.description}', async ({ page }) => {
    ${testCase.execute}
  });`;
}
```

### 커스텀 언어 지원

1. **언어 타입 추가**:

```typescript
interface HarnessConfig {
  language: "typescript" | "javascript" | "python" | "go" | "java";
}
```

2. **언어별 템플릿 생성**:

```typescript
generateTestTemplate(testCase: TestCase): string {
  switch (this.config.language) {
    case "python":
      return this.generatePythonTest(testCase);
    case "go":
      return this.generateGoTest(testCase);
    // ...
  }
}
```

## 테스트

### 단위 테스트 실행

```bash
npm run test
```

### 감시 모드 (Watch Mode)

```bash
npm run test:watch
```

파일이 변경될 때마다 테스트가 자동으로 실행됩니다.

### 테스트 커버리지

```bash
npm test -- --coverage
```

### 테스트 작성 예제

```typescript
// src/__tests__/harness-builder.test.ts
describe('HarnessBuilder', () => {
  it('should initialize with default config', () => {
    const builder = new HarnessBuilder({ name: 'test' });
    const config = builder.getHarnessStatus();
    expect(config.name).toBe('test');
  });

  it('should generate valid Jest config', () => {
    const builder = new HarnessBuilder({
      name: 'test',
      framework: 'jest',
    });
    const config = builder.generateConfigFile();
    const parsed = JSON.parse(config);
    expect(parsed.testEnvironment).toBe('node');
  });
});
```

## 배포

### 로컬 테스트

```bash
# 빌드
npm run build

# MCP Inspector로 테스트
npx @modelcontextprotocol/inspector node dist/index.js
```

### NPM에 퍼블리시

```bash
# 1. 버전 업데이트
npm version patch  # 또는 minor, major

# 2. 퍼블리시
npm publish
```

### Claude Code에 설정

**~/.config/Claude/claude_desktop_config.json**:
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

## 일반적인 문제 해결

### 문제: TypeScript 컴파일 오류

```bash
# tsconfig.json 검증
npx tsc --noEmit

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 문제: MCP 연결 실패

```bash
# 로그 확인 (macOS/Linux)
tail -f ~/.config/Claude/logs/mcp*.log

# 포트 확인
lsof -i :8000
```

### 문제: 도구가 보이지 않음

```bash
# 서버 재시작
# 1. Claude Code 종료
# 2. 설정 파일 검증
# 3. Claude Code 재시작
```

## 성능 최적화 팁

1. **대용량 테스트 케이스**: 스트리밍 응답 구현
2. **코드 생성**: 템플릿 캐싱
3. **메모리 관리**: 큰 파일 처리 시 스트림 사용

## 기여 가이드

1. Feature branch 생성
2. 변경사항 커밋
3. Pull Request 제출
4. 리뷰 및 병합

## 라이센스

MIT

## 지원

- 📧 이메일: support@example.com
- 🐛 버그 리포트: GitHub Issues
- 💬 토론: GitHub Discussions
