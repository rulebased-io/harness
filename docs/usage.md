# Usage

## Tool 1: init_harness

Initializes a test project.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Harness name |
| framework | "jest" / "mocha" / "vitest" / "custom" | Yes | Test framework |
| language | "typescript" / "javascript" / "python" | No | Language (default: typescript) |
| testDir | string | No | Test directory (default: ./tests) |
| outputDir | string | No | Output directory (default: ./test-results) |
| parallel | boolean | No | Parallel execution (default: true) |
| timeout | number | No | Timeout in ms (default: 30000) |

### Example

```
"Initialize a Jest-based TypeScript harness named 'my-api-tests'"
```

---

## Tool 2: generate_test_case

Generates an individual test case.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| testName | string | Yes | Test name |
| description | string | Yes | Test description |
| execute | string | Yes | Code to execute |
| assertions | string[] | Yes | List of assertions |
| setup | string | No | Setup code |
| teardown | string | No | Teardown code |
| framework | string | No | Framework |
| language | string | No | Language |

### Example

```
"Create a test case for the user login feature.
It should attempt login with email and password and verify that a token is returned."
```

### Generated Output (TypeScript)

```typescript
describe('UserLogin', () => {
  beforeEach(() => {
    // setup code
  });

  it('should successfully log in with valid credentials', async () => {
    // Arrange & Act
    const result = await login('user@test.com', 'password');

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.token).toBeTruthy();
  });
});
```

---

## Tool 3: generate_integration_suite

Combines multiple tests into an integration suite.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| testCases | TestCase[] | Yes | Array of test cases |
| setupCode | string | No | Global setup code |
| teardownCode | string | No | Global teardown code |

### Example

```
"Create an integration harness that tests DB connection, user CRUD, and cleanup in sequence."
```

---

## Tool 4: generate_performance_harness

Generates response time measurement tests.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| testCases | TestCase[] | Yes | Array of test cases |
| threshold | number | No | Threshold in ms (default: 100) |

### Example

```
"Test whether 5 API endpoints respond within 200ms."
```

---

## Tool 5: get_harness_config

Views the current configuration status.

### Example

```
"Show the current harness configuration."
```

---

## Practical Scenarios

### Setting Up a Test Environment for a New Project

1. Generate framework configuration with `init_harness`
2. Write individual tests with `generate_test_case`
3. Combine them with `generate_integration_suite`
4. Validate performance with `generate_performance_harness`

### CI/CD Integration

Copy the generated test code into your project and it can run immediately in your existing CI pipeline.
