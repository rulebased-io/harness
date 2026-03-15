# 사용법

## 도구 1: init_harness

테스트 프로젝트를 초기화합니다.

### 파라미터

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| name | string | O | 하네스 이름 |
| framework | "jest" / "mocha" / "vitest" / "custom" | O | 테스트 프레임워크 |
| language | "typescript" / "javascript" / "python" | X | 언어 (기본: typescript) |
| testDir | string | X | 테스트 디렉토리 (기본: ./tests) |
| outputDir | string | X | 결과 디렉토리 (기본: ./test-results) |
| parallel | boolean | X | 병렬 실행 (기본: true) |
| timeout | number | X | 타임아웃 ms (기본: 30000) |

### 사용 예

```
"Jest 기반의 TypeScript 하네스를 'my-api-tests'로 초기화해줘"
```

---

## 도구 2: generate_test_case

개별 테스트 케이스를 생성합니다.

### 파라미터

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| testName | string | O | 테스트 이름 |
| description | string | O | 테스트 설명 |
| execute | string | O | 실행할 코드 |
| assertions | string[] | O | assertion 목록 |
| setup | string | X | 사전 세팅 코드 |
| teardown | string | X | 정리 코드 |
| framework | string | X | 프레임워크 |
| language | string | X | 언어 |

### 사용 예

```
"사용자 로그인 기능의 테스트 케이스를 만들어줘.
이메일과 비밀번호로 로그인 시도하고 토큰 반환을 검증해야 해"
```

### 생성 결과 (TypeScript)

```typescript
describe('UserLogin', () => {
  beforeEach(() => {
    // setup code
  });

  it('올바른 자격증명으로 로그인 성공', async () => {
    // Arrange & Act
    const result = await login('user@test.com', 'password');

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.token).toBeTruthy();
  });
});
```

---

## 도구 3: generate_integration_suite

여러 테스트를 통합 스위트로 묶습니다.

### 파라미터

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| testCases | TestCase[] | O | 테스트 케이스 배열 |
| setupCode | string | X | 전체 세팅 코드 |
| teardownCode | string | X | 전체 정리 코드 |

### 사용 예

```
"DB 연결, 사용자 CRUD, 정리까지 순서대로 테스트하는 통합 하네스를 만들어줘"
```

---

## 도구 4: generate_performance_harness

응답 시간 측정 테스트를 생성합니다.

### 파라미터

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| testCases | TestCase[] | O | 테스트 케이스 배열 |
| threshold | number | X | 임계값 ms (기본: 100) |

### 사용 예

```
"5개 API 엔드포인트가 200ms 이내로 응답하는지 테스트해줘"
```

---

## 도구 5: get_harness_config

현재 설정 상태를 조회합니다.

### 사용 예

```
"현재 하네스 설정을 보여줘"
```

---

## 실전 시나리오

### 새 프로젝트 테스트 환경 구축

1. `init_harness`로 프레임워크 설정 생성
2. `generate_test_case`로 개별 테스트 작성
3. `generate_integration_suite`로 통합
4. `generate_performance_harness`로 성능 검증

### CI/CD 연동

생성된 테스트 코드를 프로젝트에 복사하면 기존 CI 파이프라인에서 바로 실행 가능합니다.
