/**
 * Harness Recommender - 빠진 하네스 요소를 추천
 *
 * audit 결과를 기반으로 프로젝트에 추가할 요소를 추천합니다.
 * 추천 항목에는 자동 생성 가능한 템플릿이 포함됩니다.
 */

import type { AuditReport, Recommendation } from "../types.js";

/** audit 리포트에서 추천 항목 도출 */
export function recommend(report: AuditReport): Recommendation[] {
  const recs: Recommendation[] = [];
  const failedIds = new Set(report.checks.filter((c) => !c.pass).map((c) => c.id));

  // ─── Context ───

  if (failedIds.has("ctx-agents-exists")) {
    recs.push({
      id: "rec-agents-md",
      category: "context",
      title: "AGENTS.md 생성",
      description: "에이전트가 프로젝트에서 따를 규칙, 빌드 방법, 아키텍처, 흔한 실수를 정의합니다.",
      priority: "high",
      effort: "medium",
      template: "agents-md",
      targetPath: "AGENTS.md",
    });
  }

  if (failedIds.has("ctx-claude-exists")) {
    recs.push({
      id: "rec-claude-md",
      category: "context",
      title: "CLAUDE.md 생성",
      description: "Claude Code가 자동으로 읽는 프로젝트 가이드. AGENTS.md를 참조하면 충분합니다.",
      priority: "high",
      effort: "small",
      template: "claude-md",
      targetPath: "CLAUDE.md",
    });
  }

  if (failedIds.has("ctx-agents-build")) {
    recs.push({
      id: "rec-agents-build-section",
      category: "context",
      title: "AGENTS.md에 빌드 명령어 섹션 추가",
      description: "에이전트가 프로젝트를 빌드/테스트하는 방법을 알아야 합니다.",
      priority: "high",
      effort: "small",
    });
  }

  if (failedIds.has("ctx-agents-arch")) {
    recs.push({
      id: "rec-agents-arch-section",
      category: "context",
      title: "AGENTS.md에 아키텍처 섹션 추가",
      description: "프로젝트의 디렉토리 구조, 계층, 모듈 관계를 설명합니다.",
      priority: "medium",
      effort: "medium",
    });
  }

  if (failedIds.has("ctx-agents-pitfalls")) {
    recs.push({
      id: "rec-agents-pitfalls-section",
      category: "context",
      title: "AGENTS.md에 흔한 실수 방지 목록 추가",
      description: "과거 에이전트 실패에서 도출된 규칙을 기록합니다. 예: 잘못된 import 경로, 환경 변수 누락 등.",
      priority: "medium",
      effort: "small",
    });
  }

  // ─── Workflow ───

  if (failedIds.has("wf-specs-dir")) {
    recs.push({
      id: "rec-specs-dir",
      category: "workflow",
      title: "specs 폴더 구조 생성",
      description: "아이디어/요구사항을 체계적으로 기록하고 추적합니다.",
      priority: "low",
      effort: "small",
      template: "specs-dir",
      targetPath: "specs/",
    });
  }

  if (failedIds.has("wf-tasks-dir")) {
    recs.push({
      id: "rec-tasks-dir",
      category: "workflow",
      title: "tasks 폴더 구조 생성",
      description: "구현 단위 작업을 추적합니다.",
      priority: "low",
      effort: "small",
      template: "tasks-dir",
      targetPath: "tasks/",
    });
  }

  // ─── Constraints ───

  if (failedIds.has("cst-lint")) {
    recs.push({
      id: "rec-lint",
      category: "constraints",
      title: "린터/포맷터 설정 추가",
      description: "코드 스타일을 기계적으로 강제합니다. 에이전트가 생성하는 코드도 규칙을 따르게 됩니다.",
      priority: "medium",
      effort: "small",
    });
  }

  if (failedIds.has("cst-precommit")) {
    recs.push({
      id: "rec-precommit",
      category: "constraints",
      title: "Pre-commit 훅 설정",
      description: "커밋 전 lint/test를 자동 실행하여 제약을 강제합니다.",
      priority: "low",
      effort: "small",
    });
  }

  // ─── Eval ───

  if (failedIds.has("eval-dir")) {
    recs.push({
      id: "rec-eval",
      category: "eval",
      title: "Eval 데이터셋 생성",
      description: "에이전트 행동을 평가하는 프롬프트 데이터셋을 만듭니다. 10-20개 프롬프트로 시작합니다.",
      priority: "low",
      effort: "medium",
      template: "eval-dataset",
      targetPath: "evals/datasets/",
    });
  }

  // ─── Build ───

  if (failedIds.has("build-test-script")) {
    recs.push({
      id: "rec-test-script",
      category: "build",
      title: "테스트 스크립트 추가",
      description: "package.json에 test 스크립트를 정의하세요.",
      priority: "high",
      effort: "small",
    });
  }

  if (failedIds.has("build-ci")) {
    recs.push({
      id: "rec-ci",
      category: "build",
      title: "CI/CD 설정 추가",
      description: "GitHub Actions 등으로 자동 빌드/테스트 파이프라인을 구축합니다.",
      priority: "low",
      effort: "medium",
    });
  }

  // ─── Docs ───

  if (failedIds.has("docs-readme")) {
    recs.push({
      id: "rec-readme",
      category: "docs",
      title: "README.md 작성",
      description: "프로젝트 개요, 설치 방법, 사용 방법을 담는 기본 문서입니다.",
      priority: "medium",
      effort: "small",
    });
  }

  if (failedIds.has("docs-gitignore")) {
    recs.push({
      id: "rec-gitignore",
      category: "docs",
      title: ".gitignore 추가",
      description: "node_modules, dist, .env 등을 추적에서 제외합니다.",
      priority: "medium",
      effort: "small",
      template: "gitignore",
      targetPath: ".gitignore",
    });
  }

  // 우선순위 정렬: high → medium → low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs;
}

/** 추천 결과를 읽기 좋은 텍스트로 포맷 */
export function formatRecommendations(recs: Recommendation[]): string {
  if (recs.length === 0) {
    return "모든 하네스 요소가 갖추어져 있습니다. 추천 사항이 없습니다.";
  }

  const lines: string[] = [];
  lines.push(`## Harness Recommendations (${recs.length}개)`);
  lines.push(``);

  const grouped = { high: [] as Recommendation[], medium: [] as Recommendation[], low: [] as Recommendation[] };
  for (const r of recs) grouped[r.priority].push(r);

  const labels = { high: "High Priority", medium: "Medium Priority", low: "Nice to Have" };

  for (const [priority, items] of Object.entries(grouped)) {
    if (items.length === 0) continue;
    lines.push(`### ${labels[priority as keyof typeof labels]}`);
    lines.push(``);
    for (const r of items) {
      const autoTag = r.template ? " [auto-fix]" : "";
      lines.push(`- **${r.title}**${autoTag} (${r.effort})`);
      lines.push(`  ${r.description}`);
      if (r.targetPath) {
        lines.push(`  -> ${r.targetPath}`);
      }
    }
    lines.push(``);
  }

  return lines.join("\n");
}
