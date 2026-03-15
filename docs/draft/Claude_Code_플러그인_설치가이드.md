# 🎉 Claude Code 플러그인으로 하네스 빌더 설치하기

**좋은 소식:** 이제 **플러그인으로 한 번의 클릭**만으로 설치할 수 있습니다! ⚡

---

## ⚡ 5분 설치 가이드

### 1️⃣ Claude Code에서 명령 실행

Claude Code를 열고:

```
/plugin install github:yourusername/harness-plugin-complete
```

또는 플러그인 마켓플레이스에서 **"harness-builder"** 검색

### 2️⃣ 완료! 🎊

자동으로 다음이 활성화됩니다:
- ✅ 5가지 슬래시 커맨드
- ✅ 설정 페이지
- ✅ 상태 바 표시

### 3️⃣ 바로 사용

```
Claude Code에서:
/harness-init my-project jest typescript
```

**끝!** 완벽한 Jest 설정이 생성됩니다. 🚀

---

## 🎯 5가지 슬래시 커맨드

플러그인 설치 후 자동으로 사용 가능:

### 1️⃣ `/harness-init` - 프로젝트 초기화
```
/harness-init my-tests jest typescript
```

**생성:**
- jest.config.js
- 프로젝트 설정
- 테스트 디렉토리 구조

### 2️⃣ `/test-case` - 테스트 케이스 생성
```
/test-case LoginTest "사용자 로그인 기능"
```

**생성:**
```typescript
describe('LoginTest', () => {
  it('사용자 로그인 기능', async () => {
    // 테스트 코드
  });
});
```

### 3️⃣ `/integration-tests` - 통합 테스트
```
/integration-tests user-crud
```

**생성:**
- Setup 테스트
- Main 테스트  
- Cleanup 테스트

### 4️⃣ `/performance-test` - 성능 테스트
```
/performance-test api-response 100
```

**생성:**
```typescript
describe('Performance Tests', () => {
  it('api-response should complete within 100ms', async () => {
    const start = performance.now();
    // 코드 실행
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
```

### 5️⃣ `/harness-config` - 설정 조회
```
/harness-config
```

**표시:**
- 현재 프레임워크
- 언어 설정
- 디렉토리 경로
- 기타 설정값

---

## ⚙️ 플러그인 설정

**설정 → 플러그인 → 하네스 빌더**에서:

| 설정 | 옵션 | 기본값 |
|------|------|-------|
| **프레임워크** | Jest / Mocha / Vitest | Jest |
| **언어** | TypeScript / JavaScript / Python | TypeScript |
| **테스트 디렉토리** | 경로 입력 | ./tests |
| **결과 디렉토리** | 경로 입력 | ./test-results |
| **병렬 실행** | On / Off | On |
| **타임아웃** | 1000-300000ms | 30000 |

---

## 🎓 실제 사용 시나리오

### 시나리오 1: 새 프로젝트에 테스트 추가

```
Claude Code:
"새로운 Express API 프로젝트에 테스트를 추가하고 싶어. 
Jest로 TypeScript 프로젝트를 설정해줄래?"

사용:
/harness-init my-api jest typescript

결과:
✅ jest.config.js 생성
✅ 테스트 디렉토리 구조
✅ 모든 설정 자동 완성
```

### 시나리오 2: 로그인 기능 테스트

```
Claude Code:
"로그인 기능에 대한 완전한 테스트 케이스를 만들어줄래?
- 성공 케이스
- 실패 케이스
- 엣지 케이스"

사용:
/test-case LoginTest "사용자 로그인"
/test-case LoginTestFail "로그인 실패"
/test-case LoginEdgeCase "엣지 케이스"

결과:
✅ 3개의 완전한 테스트 케이스
```

### 시나리오 3: 데이터베이스 테스트

```
Claude Code:
"PostgreSQL 사용자 테이블의 CRUD를 테스트하는 
통합 테스트를 만들어줄래?"

사용:
/integration-tests user-crud

결과:
✅ Create, Read, Update, Delete 테스트
✅ Setup/Teardown 포함
✅ 완전한 통합 테스트 스위트
```

---

## 🔄 플러그인의 작동 원리

```
Claude Code 플러그인 시스템
    ↓
하네스 빌더 플러그인
    ├── Slash Commands (5개)
    │   ├── /harness-init
    │   ├── /test-case
    │   ├── /integration-tests
    │   ├── /performance-test
    │   └── /harness-config
    │
    ├── MCP Server (선택)
    │   └── 더 강력한 기능
    │
    └── Settings UI
        └── 설정 변경
```

---

## 📦 플러그인에 포함된 것

### 코드 생성
- ✅ Jest 설정 (jest.config.js)
- ✅ Mocha 설정 (mocha.opts)
- ✅ Vitest 설정 (vitest.config.ts)
- ✅ 테스트 템플릿 (describe/it)
- ✅ 통합 테스트 (beforeAll/afterAll)
- ✅ 성능 테스트 (performance.now())

### 언어 지원
- ✅ TypeScript (타입 안전성)
- ✅ JavaScript (빠른 프로토타이핑)
- ✅ Python (기본 구조)

### 프레임워크 지원
- ✅ Jest (권장)
- ✅ Mocha
- ✅ Vitest
- ✅ Custom

---

## 🚀 고급 사용법

### MCP 서버와 함께 사용

플러그인만으로도 충분하지만, 더 강력한 기능이 필요하면 MCP 서버도 추가:

```json
설정 파일에 추가:
{
  "mcpServers": {
    "harness-builder-mcp": {
      "command": "npx",
      "args": ["-y", "harness-builder-mcp"]
    }
  }
}
```

그러면:
- 🔌 더 강력한 MCP 도구 사용 가능
- 🌐 다른 도구와도 연동 가능
- 💪 복잡한 작업 자동화

### 설정 커스터마이징

```
설정 → 플러그인 → 하네스 빌더

프레임워크를 "Mocha"로 변경하면:
/harness-init my-project
→ Mocha 설정이 자동으로 생성됨
```

---

## ✅ 설치 체크리스트

- [ ] Claude Code 버전 확인 (2.0.0 이상)
- [ ] 플러그인 설치 (`/plugin install ...`)
- [ ] Claude Code 재시작
- [ ] `/harness-init test-project` 실행
- [ ] 테스트 설정이 생성되었는지 확인
- [ ] 첫 번째 테스트 케이스 생성 (`/test-case`)

---

## 🎓 학습 경로

### 초급 (5분)
```
1. 플러그인 설치
2. /harness-init 실행
3. 테스트 설정 확인
```

### 중급 (20분)
```
1. 모든 슬래시 커맨드 사용해보기
2. 설정 커스터마이징
3. 여러 테스트 케이스 생성
```

### 고급 (1시간)
```
1. MCP 서버 추가
2. 플러그인 코드 분석
3. 커스텀 기능 추가
```

---

## 🐛 문제 해결

### Q: 플러그인이 설치되지 않음
**A:** 
```bash
# Claude Code 버전 확인
Claude Code → About → Version (2.0.0 이상 필요)

# 재시도
/plugin install github:yourusername/harness-plugin-complete
```

### Q: 슬래시 커맨드가 안 보임
**A:**
```bash
1. Claude Code 재시작
2. /plugin list로 플러그인 확인
3. /plugin enable harness-builder
```

### Q: 설정이 적용되지 않음
**A:**
```bash
1. 설정 저장 확인
2. Claude Code 재시작
3. /harness-config로 확인
```

---

## 🌟 플러그인의 장점

✨ **초간단 설치** - `/plugin install` 한 번이면 끝
✨ **슬래시 커맨드** - 자동 완성과 빠른 실행
✨ **설정 UI** - GUI로 쉬운 설정 변경
✨ **상태 표시** - 상태 바에 플러그인 상태 표시
✨ **완전 통합** - Claude Code와 100% 호환
✨ **MCP 지원** - 필요시 추가 기능 확장 가능

---

## 📚 추가 자료

- `설치방식_비교_가이드.md` - MCP vs 플러그인 비교
- `PLUGIN_GUIDE.md` - 플러그인 개발 가이드
- `COMPLETE_GUIDE.md` - 전체 기술 가이드

---

## 🎯 지금 바로 시작하세요!

```
Claude Code에서:
/plugin install github:yourusername/harness-plugin-complete
```

그 다음:
```
/harness-init my-project jest typescript
```

**완료! 이제 완전한 테스트 하네스를 갖추었습니다!** 🎉

---

**문제가 있으시면 로그를 확인하거나 플러그인 마켓플레이스의 지원 섹션을 참고하세요.**
