import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { initHarness } from "../../src/initializer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP_DIR = join(__dirname, "../tmp-init-test");

describe("Initializer", () => {
  beforeEach(() => {
    rmSync(TMP_DIR, { recursive: true, force: true });
    mkdirSync(TMP_DIR, { recursive: true });
  });

  afterAll(() => {
    rmSync(TMP_DIR, { recursive: true, force: true });
  });

  it("빈 디렉토리에 하네스 구조 생성", () => {
    const result = initHarness(TMP_DIR);

    expect(result.created.length).toBeGreaterThan(0);
    expect(existsSync(join(TMP_DIR, "AGENTS.md"))).toBe(true);
    expect(existsSync(join(TMP_DIR, "CLAUDE.md"))).toBe(true);
    expect(existsSync(join(TMP_DIR, "specs/todo"))).toBe(true);
    expect(existsSync(join(TMP_DIR, "tasks/todo"))).toBe(true);
  });

  it("AGENTS.md에 TODO 마커 포함", () => {
    initHarness(TMP_DIR);
    const content = readFileSync(join(TMP_DIR, "AGENTS.md"), "utf-8");

    expect(content).toContain("TODO:");
    expect(content).toContain("Build");
    expect(content).toContain("Pitfalls");
  });

  it("이미 있는 파일은 건너뜀", () => {
    initHarness(TMP_DIR);
    const result2 = initHarness(TMP_DIR);

    expect(result2.skipped.length).toBeGreaterThan(0);
    expect(result2.created.length).toBe(0);
  });

  it("--force로 덮어쓰기", () => {
    initHarness(TMP_DIR);
    const result2 = initHarness(TMP_DIR, { force: true });

    expect(result2.created.length).toBeGreaterThan(0);
  });

  it("skipWorkflow 시 specs/tasks 미생성", () => {
    const result = initHarness(TMP_DIR, { skipWorkflow: true });

    expect(existsSync(join(TMP_DIR, "AGENTS.md"))).toBe(true);
    expect(existsSync(join(TMP_DIR, "specs"))).toBe(false);
    expect(existsSync(join(TMP_DIR, "tasks"))).toBe(false);
  });

  it("package.json에서 프로젝트 이름 추출", () => {
    writeFileSync(join(TMP_DIR, "package.json"), '{"name":"my-cool-app"}');

    initHarness(TMP_DIR);
    const agents = readFileSync(join(TMP_DIR, "AGENTS.md"), "utf-8");

    expect(agents).toContain("my-cool-app");
  });
});
