# 시작하기

Harness Builder MCP는 Claude Code에서 테스트 하네스를 자동 생성하는 MCP 서버입니다.

## 빠른 시작

### 1. Claude Code에 MCP 서버 등록

설정 파일을 열고 MCP 서버를 추가합니다:

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

### 2. Claude Code 재시작

### 3. 연결 확인

Claude Code에서 `/mcp` 입력 → `harness-builder: connected` 확인

### 4. 사용

```
"Jest 기반의 TypeScript 하네스를 'my-project'로 초기화해줘"
```

## 5가지 핵심 도구

| 도구 | 설명 |
|------|------|
| `init_harness` | 테스트 프레임워크 설정 초기화 |
| `generate_test_case` | 개별 테스트 케이스 생성 |
| `generate_integration_suite` | 여러 테스트를 통합 스위트로 |
| `generate_performance_harness` | 성능 테스트 (응답 시간 측정) |
| `get_harness_config` | 현재 설정 조회 |

## 지원 프레임워크

- **Jest** (권장) - TypeScript/JavaScript
- **Mocha** - 전통적 Node.js
- **Vitest** - Vite 프로젝트
- **Custom** - 사용자 정의

## 지원 언어

- TypeScript, JavaScript, Python

## 사용 예제

### API 테스트

```
"Express API의 /api/users 엔드포인트를 테스트하는 하네스를 만들어줘.
정상 조회, 없는 데이터, 에러 처리를 포함해줘"
```

### DB 통합 테스트

```
"PostgreSQL 사용자 테이블의 CRUD 작업을 테스트하는 통합 하네스를 만들어줘"
```

### 성능 테스트

```
"API 응답이 100ms 이내인지 확인하는 성능 테스트를 만들어줘"
```

## 다음 단계

- 상세 사용법 → [usage.md](usage.md)
- 개발/기여 → [architecture.md](architecture.md)
- 설치/배포 → [setup.md](setup.md)
