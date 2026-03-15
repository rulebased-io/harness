import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { audit } from "../../src/core/auditor.js";
import { recommend, formatRecommendations } from "../../src/core/recommender.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(__dirname, "../fixtures");

describe("Recommender", () => {
  describe("empty project", () => {
    const report = audit(join(FIXTURES, "empty-project"));
    const recs = recommend(report);

    it("많은 추천 항목을 반환", () => {
      expect(recs.length).toBeGreaterThanOrEqual(3);
    });

    it("AGENTS.md 생성을 최우선 추천", () => {
      const agentsRec = recs.find((r) => r.id === "rec-agents-md");
      expect(agentsRec).toBeDefined();
      expect(agentsRec!.priority).toBe("high");
    });

    it("모든 추천에 id, title, description 포함", () => {
      for (const r of recs) {
        expect(r.id).toBeTruthy();
        expect(r.title).toBeTruthy();
        expect(r.description).toBeTruthy();
      }
    });

    it("우선순위 순으로 정렬", () => {
      const priorities = recs.map((r) => r.priority);
      const order = { high: 0, medium: 1, low: 2 };
      for (let i = 1; i < priorities.length; i++) {
        expect(order[priorities[i]]).toBeGreaterThanOrEqual(order[priorities[i - 1]]);
      }
    });
  });

  describe("full-harness project", () => {
    const report = audit(join(FIXTURES, "full-harness"));
    const recs = recommend(report);

    it("추천 항목이 적거나 없음", () => {
      expect(recs.length).toBeLessThanOrEqual(3);
    });

    it("AGENTS.md 관련 추천 없음", () => {
      const agentsRecs = recs.filter((r) => r.id.startsWith("rec-agents"));
      expect(agentsRecs.length).toBe(0);
    });
  });

  describe("formatRecommendations", () => {
    it("추천 없으면 완료 메시지", () => {
      const text = formatRecommendations([]);
      expect(text).toContain("추천 사항이 없습니다");
    });

    it("추천 있으면 목록 포맷", () => {
      const report = audit(join(FIXTURES, "empty-project"));
      const recs = recommend(report);
      const text = formatRecommendations(recs);

      expect(text).toContain("Recommendations");
      expect(text).toContain("High Priority");
    });
  });
});
