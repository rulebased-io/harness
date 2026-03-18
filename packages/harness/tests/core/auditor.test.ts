import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { audit, formatReport } from "../../src/auditor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(__dirname, "../fixtures");

describe("Auditor", () => {
  describe("full-harness project", () => {
    const report = audit(join(FIXTURES, "full-harness"));

    it("높은 점수를 반환", () => {
      expect(report.score).toBeGreaterThanOrEqual(70);
      expect(["A", "B"]).toContain(report.grade);
    });

    it("critical 항목 전부 통과", () => {
      expect(report.summary.byCritical.passed).toBe(report.summary.byCritical.total);
    });

    it("AGENTS.md 관련 체크 모두 통과", () => {
      const ctxChecks = report.checks.filter((c) => c.id.startsWith("ctx-agents"));
      for (const c of ctxChecks) {
        expect(c.pass).toBe(true);
      }
    });

    it("모든 체크에 id와 category가 있음", () => {
      for (const c of report.checks) {
        expect(c.id).toBeTruthy();
        expect(c.category).toBeTruthy();
      }
    });
  });

  describe("empty project", () => {
    const report = audit(join(FIXTURES, "empty-project"));

    it("낮은 점수를 반환", () => {
      expect(report.score).toBeLessThan(30);
      expect(["D", "F"]).toContain(report.grade);
    });

    it("AGENTS.md 없음", () => {
      const check = report.checks.find((c) => c.id === "ctx-agents-exists");
      expect(check?.pass).toBe(false);
    });

    it("실패 항목에 fix 안내 포함", () => {
      const failed = report.checks.filter((c) => !c.pass);
      const withFix = failed.filter((c) => c.fix);
      expect(withFix.length).toBeGreaterThan(0);
    });
  });

  describe("partial-harness project", () => {
    const report = audit(join(FIXTURES, "partial-harness"));

    it("중간 점수", () => {
      expect(report.score).toBeGreaterThan(0);
      expect(report.score).toBeLessThan(80);
    });

    it("AGENTS.md는 있지만 빌드 명령어 없음", () => {
      const exists = report.checks.find((c) => c.id === "ctx-agents-exists");
      const build = report.checks.find((c) => c.id === "ctx-agents-build");
      expect(exists?.pass).toBe(true);
      expect(build?.pass).toBe(false);
    });
  });

  describe("formatReport", () => {
    it("리포트를 텍스트로 포맷", () => {
      const report = audit(join(FIXTURES, "full-harness"));
      const text = formatReport(report);

      expect(text).toContain("Harness Audit Report");
      expect(text).toContain("Score:");
      expect(text).toContain("Context Engineering");
    });
  });

  describe("report structure", () => {
    const report = audit(join(FIXTURES, "full-harness"));

    it("summary에 byCategory 포함", () => {
      expect(report.summary.byCategory.context).toBeDefined();
      expect(report.summary.byCategory.bootstrap).toBeDefined();
      expect(report.summary.byCategory.constraints).toBeDefined();
      expect(report.summary.byCategory.safety).toBeDefined();
    });

    it("timestamp 포함", () => {
      expect(report.timestamp).toBeTruthy();
    });
  });
});
