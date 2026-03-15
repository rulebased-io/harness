/**
 * Harness Auditor - Evaluates the harness setup of a project
 *
 * Audits based on the 3 pillars of OpenAI Harness Engineering:
 * 1. Context Engineering (AGENTS.md, documentation)
 * 2. Architectural Constraints (constraints, lint)
 * 3. Eval System (evaluation datasets)
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { AuditCheck, AuditCategory, AuditReport, HarnessConfig } from "./types.js";
import { getPreset, mergeConfig, isCheckDisabled, getSeverity } from "./presets.js";

/** Load .harness.json (falls back to standard preset if not found) */
export function loadConfig(projectPath: string): HarnessConfig {
  const configPath = join(projectPath, ".harness.json");
  const base = getPreset("standard");

  if (!existsSync(configPath)) return base;

  try {
    const raw = JSON.parse(readFileSync(configPath, "utf-8"));
    const preset = raw.preset ? getPreset(raw.preset) : base;
    return mergeConfig(preset, raw);
  } catch {
    return base;
  }
}

/** Run a harness audit on the given project path */
export function audit(projectPath: string, config?: HarnessConfig): AuditReport {
  const cfg = config ?? loadConfig(projectPath);

  const allChecks: AuditCheck[] = [
    ...auditContext(projectPath),
    ...auditWorkflow(projectPath),
    ...auditConstraints(projectPath),
    ...auditEval(projectPath),
    ...auditConventions(projectPath),
    ...auditBuild(projectPath),
    ...auditDocs(projectPath),
  ];

  // Filter checks and override severity based on preset/config
  const checks = allChecks
    .filter((c) => !isCheckDisabled(c.id, cfg))
    .map((c) => ({
      ...c,
      severity: getSeverity(c.id, c.severity, cfg),
    }));

  return buildReport(projectPath, checks);
}

// ─── Context Engineering ───

function auditContext(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  // AGENTS.md existence
  const agentsPath = join(p, "AGENTS.md");
  const agentsExists = existsSync(agentsPath);
  checks.push({
    id: "ctx-agents-exists",
    category: "context",
    name: "AGENTS.md exists",
    description: "AGENTS.md must be present in the project root",
    pass: agentsExists,
    severity: "critical",
    fix: "Create an AGENTS.md file. You can auto-generate one with /rulebased:harness-init.",
  });

  if (agentsExists) {
    const content = readFileSync(agentsPath, "utf-8");

    // Build commands section
    checks.push({
      id: "ctx-agents-build",
      category: "context",
      name: "AGENTS.md includes build commands",
      description: "Agents need to know how to build and test the project",
      pass: /npm run|yarn|pnpm|make|cargo|go build/i.test(content),
      severity: "critical",
      fix: "Add a '## Build & Test' section to AGENTS.md.",
    });

    // Architecture information
    checks.push({
      id: "ctx-agents-arch",
      category: "context",
      name: "AGENTS.md includes architecture description",
      description: "Project structure and layer descriptions are needed",
      pass: /구조|아키텍처|architecture|계층|layer|디렉토리/i.test(content),
      severity: "important",
      fix: "Add a project structure/architecture section to AGENTS.md.",
    });

    // Common pitfalls
    checks.push({
      id: "ctx-agents-pitfalls",
      category: "context",
      name: "AGENTS.md includes common pitfalls list",
      description: "Rules derived from past agent failures should be documented",
      pass: /실수|주의|금지|하지.마|pitfall|gotcha|avoid|don'?t/i.test(content),
      severity: "important",
      fix: "Add a '## Common Pitfalls' section to AGENTS.md.",
    });
  }

  // CLAUDE.md existence
  checks.push({
    id: "ctx-claude-exists",
    category: "context",
    name: "CLAUDE.md exists",
    description: "Project guide that Claude Code reads automatically",
    pass: existsSync(join(p, "CLAUDE.md")),
    severity: "important",
    fix: "Create a CLAUDE.md file. Simply referencing AGENTS.md is sufficient.",
  });

  return checks;
}

// ─── Workflow ───

function auditWorkflow(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  const hasSpecs = existsSync(join(p, "specs")) || existsSync(join(p, "spec"));
  checks.push({
    id: "wf-specs-dir",
    category: "workflow",
    name: "specs folder exists",
    description: "A specs folder for recording ideas and requirements",
    pass: hasSpecs,
    severity: "nice-to-have",
    fix: "Create specs/todo, specs/done, and specs/backlog folders.",
  });

  const hasTasks = existsSync(join(p, "tasks")) || existsSync(join(p, "task"));
  checks.push({
    id: "wf-tasks-dir",
    category: "workflow",
    name: "tasks folder exists",
    description: "A tasks folder for tracking implementation work units",
    pass: hasTasks,
    severity: "nice-to-have",
    fix: "Create tasks/todo and tasks/done folders.",
  });

  return checks;
}

// ─── Constraints ───

function auditConstraints(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  // lint/format configuration exists
  const lintFiles = [
    ".eslintrc", ".eslintrc.js", ".eslintrc.json", ".eslintrc.yml",
    "eslint.config.js", "eslint.config.mjs",
    ".prettierrc", ".prettierrc.json",
    "biome.json", "biome.jsonc",
    ".rubocop.yml", ".pylintrc", "pyproject.toml",
    ".golangci.yml", "rustfmt.toml",
  ];
  const hasLint = lintFiles.some((f) => existsSync(join(p, f)));
  checks.push({
    id: "cst-lint",
    category: "constraints",
    name: "Linter/formatter configuration exists",
    description: "Configuration that mechanically enforces code style",
    pass: hasLint,
    severity: "important",
    fix: "Add a configuration file for ESLint, Prettier, Biome, or similar.",
  });

  // pre-commit hook
  const hasHusky = existsSync(join(p, ".husky"));
  const hasLefthook = existsSync(join(p, "lefthook.yml"));
  const hasPreCommit = existsSync(join(p, ".pre-commit-config.yaml"));
  checks.push({
    id: "cst-precommit",
    category: "constraints",
    name: "Pre-commit hook configured",
    description: "Enforces constraints via automatic validation before commits",
    pass: hasHusky || hasLefthook || hasPreCommit,
    severity: "nice-to-have",
    fix: "Set up Husky, Lefthook, or pre-commit.",
  });

  return checks;
}

// ─── Eval ───

function auditEval(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  const evalDirs = ["evals", "eval", "__evals__"];
  const hasEval = evalDirs.some((d) => existsSync(join(p, d)));
  checks.push({
    id: "eval-dir",
    category: "eval",
    name: "Eval dataset exists",
    description: "A dataset for evaluating agent behavior",
    pass: hasEval,
    severity: "nice-to-have",
    fix: "Add evaluation prompt CSVs to the evals/datasets/ folder.",
  });

  return checks;
}

// ─── Conventions ───

function auditConventions(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  // .editorconfig
  checks.push({
    id: "conv-editorconfig",
    category: "conventions",
    name: ".editorconfig exists",
    description: "Consistent coding style across editors",
    pass: existsSync(join(p, ".editorconfig")),
    severity: "nice-to-have",
    fix: "Add an .editorconfig file.",
  });

  // TypeScript strict (if tsconfig.json exists)
  const tsconfigPath = join(p, "tsconfig.json");
  if (existsSync(tsconfigPath)) {
    try {
      const tsconfig = readFileSync(tsconfigPath, "utf-8");
      checks.push({
        id: "conv-ts-strict",
        category: "conventions",
        name: "TypeScript strict mode",
        description: "Enforce type safety with strict: true",
        pass: /"strict"\s*:\s*true/.test(tsconfig),
        severity: "important",
        fix: "Add \"strict\": true to tsconfig.json.",
      });
    } catch {
      // Skip if tsconfig parsing fails
    }
  }

  return checks;
}

// ─── Build ───

function auditBuild(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  // package.json scripts
  const pkgPath = join(p, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      const scripts = pkg.scripts || {};

      checks.push({
        id: "build-test-script",
        category: "build",
        name: "Test script defined",
        description: "Tests should be runnable via npm test",
        pass: "test" in scripts,
        severity: "critical",
        fix: "Add a \"test\" command to the scripts section of package.json.",
      });

      checks.push({
        id: "build-build-script",
        category: "build",
        name: "Build script defined",
        description: "Project should be buildable via npm run build",
        pass: "build" in scripts,
        severity: "important",
        fix: "Add a \"build\" command to the scripts section of package.json.",
      });
    } catch {
      // package.json parsing failed
    }
  }

  // CI configuration
  const ciPaths = [
    ".github/workflows",
    ".gitlab-ci.yml",
    ".circleci",
    "Jenkinsfile",
    ".travis.yml",
  ];
  const hasCI = ciPaths.some((cp) => existsSync(join(p, cp)));
  checks.push({
    id: "build-ci",
    category: "build",
    name: "CI/CD configuration exists",
    description: "Automated build/test pipeline",
    pass: hasCI,
    severity: "nice-to-have",
    fix: "Add a CI workflow under .github/workflows/.",
  });

  return checks;
}

// ─── Docs ───

function auditDocs(p: string): AuditCheck[] {
  const checks: AuditCheck[] = [];

  checks.push({
    id: "docs-readme",
    category: "docs",
    name: "README.md exists",
    description: "Basic project documentation",
    pass: existsSync(join(p, "README.md")) || existsSync(join(p, "readme.md")),
    severity: "important",
    fix: "Write a README.md.",
  });

  // .gitignore
  checks.push({
    id: "docs-gitignore",
    category: "docs",
    name: ".gitignore exists",
    description: "Prevents tracking unnecessary files",
    pass: existsSync(join(p, ".gitignore")),
    severity: "important",
    fix: "Add a .gitignore file.",
  });

  return checks;
}

// ─── Report Builder ───

function buildReport(projectPath: string, checks: AuditCheck[]): AuditReport {
  const passed = checks.filter((c) => c.pass).length;
  const failed = checks.filter((c) => !c.pass).length;

  // Weighted score: critical=3, important=2, nice-to-have=1
  const weights: Record<string, number> = { critical: 3, important: 2, "nice-to-have": 1 };
  let weightedTotal = 0;
  let weightedPassed = 0;
  for (const c of checks) {
    const w = weights[c.severity] ?? 1;
    weightedTotal += w;
    if (c.pass) weightedPassed += w;
  }
  const score = weightedTotal > 0 ? Math.round((weightedPassed / weightedTotal) * 100) : 0;

  const grade =
    score >= 90 ? "A" :
    score >= 75 ? "B" :
    score >= 60 ? "C" :
    score >= 40 ? "D" : "F";

  // Aggregate by category
  const categories: AuditCategory[] = ["context", "workflow", "constraints", "eval", "conventions", "build", "docs"];
  const byCategory: Record<string, { passed: number; total: number }> = {};
  for (const cat of categories) {
    const catChecks = checks.filter((c) => c.category === cat);
    byCategory[cat] = {
      passed: catChecks.filter((c) => c.pass).length,
      total: catChecks.length,
    };
  }

  const criticalChecks = checks.filter((c) => c.severity === "critical");

  return {
    projectPath,
    timestamp: new Date().toISOString(),
    score,
    grade,
    checks,
    summary: {
      total: checks.length,
      passed,
      failed,
      byCritical: {
        passed: criticalChecks.filter((c) => c.pass).length,
        total: criticalChecks.length,
      },
      byCategory: byCategory as Record<AuditCategory, { passed: number; total: number }>,
    },
  };
}

/** Format an audit report as readable text */
export function formatReport(report: AuditReport): string {
  const lines: string[] = [];

  lines.push(`## Harness Audit Report`);
  lines.push(``);
  lines.push(`**Score: ${report.score}/100 (${report.grade})**`);
  lines.push(`**Passed: ${report.summary.passed}/${report.summary.total}** | Critical: ${report.summary.byCritical.passed}/${report.summary.byCritical.total}`);
  lines.push(``);

  // Summary by category
  lines.push(`### Category Breakdown`);
  lines.push(``);
  const catNames: Record<AuditCategory, string> = {
    context: "Context Engineering",
    workflow: "Workflow",
    constraints: "Constraints",
    eval: "Eval System",
    conventions: "Conventions",
    build: "Build & Test",
    docs: "Documentation",
  };
  for (const [cat, label] of Object.entries(catNames)) {
    const s = report.summary.byCategory[cat as AuditCategory];
    if (!s) continue;
    const icon = s.passed === s.total ? "PASS" : "FAIL";
    lines.push(`- [${icon}] ${label}: ${s.passed}/${s.total}`);
  }

  // Failed items
  const failed = report.checks.filter((c) => !c.pass);
  if (failed.length > 0) {
    lines.push(``);
    lines.push(`### Failed Checks`);
    lines.push(``);
    for (const c of failed) {
      const sevIcon = c.severity === "critical" ? "CRITICAL" : c.severity === "important" ? "IMPORTANT" : "OPTIONAL";
      lines.push(`- [${sevIcon}] **${c.name}**: ${c.description}`);
      if (c.fix) {
        lines.push(`  - Fix: ${c.fix}`);
      }
    }
  }

  return lines.join("\n");
}

/** Detailed score report by category */
export function formatScore(report: AuditReport): string {
  const lines: string[] = [];

  lines.push(`## Harness Score Report`);
  lines.push(``);
  lines.push(`${renderBar(report.score)}  **${report.score}/100 (${report.grade})**`);
  lines.push(``);

  const catNames: Record<AuditCategory, string> = {
    context: "Context Engineering",
    workflow: "Workflow",
    constraints: "Constraints",
    eval: "Eval System",
    conventions: "Conventions",
    build: "Build & Test",
    docs: "Documentation",
  };

  // Score + item details by category
  for (const [cat, label] of Object.entries(catNames)) {
    const catChecks = report.checks.filter((c) => c.category === cat);
    if (catChecks.length === 0) continue;

    const passed = catChecks.filter((c) => c.pass).length;
    const catScore = Math.round((passed / catChecks.length) * 100);
    const catBar = renderBar(catScore);

    lines.push(`### ${label}  ${catBar}  ${catScore}/100  (${passed}/${catChecks.length})`);
    lines.push(``);

    for (const c of catChecks) {
      const icon = c.pass ? "PASS" : "FAIL";
      lines.push(`- [${icon}] ${c.name}`);
      if (!c.pass && c.fix) {
        lines.push(`  -> ${c.fix}`);
      }
    }
    lines.push(``);
  }

  return lines.join("\n");
}

function renderBar(score: number): string {
  const filled = Math.round(score / 5);
  const empty = 20 - filled;
  return "[" + "#".repeat(filled) + "-".repeat(empty) + "]";
}
