/**
 * Harness Recommender - Recommends missing harness elements
 *
 * Generates recommendations for elements to add to a project based on audit results.
 * Recommendations include auto-generatable templates where available.
 */

import type { AuditReport, Recommendation } from "./types.js";

/** Derive recommendations from an audit report */
export function recommend(report: AuditReport): Recommendation[] {
  const recs: Recommendation[] = [];
  const failedIds = new Set(report.checks.filter((c) => !c.pass).map((c) => c.id));

  // ─── Context ───

  if (failedIds.has("ctx-agents-exists")) {
    recs.push({
      id: "rec-agents-md",
      category: "context",
      title: "Create AGENTS.md",
      description: "Defines the rules agents should follow in the project, including build instructions, architecture, and common pitfalls.",
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
      title: "Create CLAUDE.md",
      description: "A project guide that Claude Code reads automatically. Simply referencing AGENTS.md is sufficient.",
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
      title: "Add build commands section to AGENTS.md",
      description: "Agents need to know how to build and test the project.",
      priority: "high",
      effort: "small",
    });
  }

  if (failedIds.has("ctx-agents-arch")) {
    recs.push({
      id: "rec-agents-arch-section",
      category: "context",
      title: "Add architecture section to AGENTS.md",
      description: "Describes the project's directory structure, layers, and module relationships.",
      priority: "medium",
      effort: "medium",
    });
  }

  if (failedIds.has("ctx-agents-pitfalls")) {
    recs.push({
      id: "rec-agents-pitfalls-section",
      category: "context",
      title: "Add common pitfalls list to AGENTS.md",
      description: "Documents rules derived from past agent failures. Examples: incorrect import paths, missing environment variables, etc.",
      priority: "medium",
      effort: "small",
    });
  }

  // ─── Workflow ───

  if (failedIds.has("wf-specs-dir")) {
    recs.push({
      id: "rec-specs-dir",
      category: "workflow",
      title: "Create specs folder structure",
      description: "Systematically records and tracks ideas and requirements.",
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
      title: "Create tasks folder structure",
      description: "Tracks implementation work units.",
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
      title: "Add linter/formatter configuration",
      description: "Mechanically enforces code style. Agent-generated code will also follow the rules.",
      priority: "medium",
      effort: "small",
    });
  }

  if (failedIds.has("cst-precommit")) {
    recs.push({
      id: "rec-precommit",
      category: "constraints",
      title: "Set up pre-commit hooks",
      description: "Enforces constraints by automatically running lint/test before each commit.",
      priority: "low",
      effort: "small",
    });
  }

  // ─── Eval ───

  if (failedIds.has("eval-dir")) {
    recs.push({
      id: "rec-eval",
      category: "eval",
      title: "Create eval dataset",
      description: "Create a prompt dataset for evaluating agent behavior. Start with 10-20 prompts.",
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
      title: "Add test script",
      description: "Define a test script in package.json.",
      priority: "high",
      effort: "small",
    });
  }

  if (failedIds.has("build-ci")) {
    recs.push({
      id: "rec-ci",
      category: "build",
      title: "Add CI/CD configuration",
      description: "Set up an automated build/test pipeline using GitHub Actions or similar.",
      priority: "low",
      effort: "medium",
    });
  }

  // ─── Docs ───

  if (failedIds.has("docs-readme")) {
    recs.push({
      id: "rec-readme",
      category: "docs",
      title: "Write a README.md",
      description: "Basic documentation covering project overview, installation, and usage.",
      priority: "medium",
      effort: "small",
    });
  }

  if (failedIds.has("docs-gitignore")) {
    recs.push({
      id: "rec-gitignore",
      category: "docs",
      title: "Add .gitignore",
      description: "Excludes node_modules, dist, .env, and similar files from tracking.",
      priority: "medium",
      effort: "small",
      template: "gitignore",
      targetPath: ".gitignore",
    });
  }

  // Sort by priority: high -> medium -> low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs;
}

/** Format recommendations as readable text */
export function formatRecommendations(recs: Recommendation[]): string {
  if (recs.length === 0) {
    return "All harness elements are in place. No recommendations.";
  }

  const lines: string[] = [];
  lines.push(`## Harness Recommendations (${recs.length})`);
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
