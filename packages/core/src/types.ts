/**
 * Core type definitions for the harness system
 */

// ─── Audit ───

export interface AuditCheck {
  id: string;
  category: AuditCategory;
  name: string;
  description: string;
  pass: boolean;
  severity: "critical" | "important" | "nice-to-have";
  details?: string;
  fix?: string;
}

export type AuditCategory =
  | "context"       // AGENTS.md, CLAUDE.md
  | "workflow"      // specs/, tasks/
  | "constraints"   // architectural constraints, lint
  | "eval"          // eval datasets
  | "conventions"   // coding conventions
  | "build"         // build/test commands
  | "docs";         // documentation

export interface AuditReport {
  projectPath: string;
  timestamp: string;
  score: number;           // 0-100
  grade: string;           // A, B, C, D, F
  checks: AuditCheck[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    byCritical: { passed: number; total: number };
    byCategory: Record<AuditCategory, { passed: number; total: number }>;
  };
}

// ─── Recommend ───

export interface Recommendation {
  id: string;
  category: AuditCategory;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  effort: "small" | "medium" | "large";
  template?: string;       // name of an auto-generatable template
  targetPath?: string;     // file path to generate
}

// ─── Preset ───

export type PresetName = "minimal" | "standard";

export interface HarnessConfig {
  preset?: PresetName;
  checks?: {
    enable?: string[];
    disable?: string[];
  };
  severity?: Record<string, "critical" | "important" | "nice-to-have">;
}

// ─── Init ───

export interface InitOptions {
  projectName?: string;
  preset?: PresetName;
  skipWorkflow?: boolean;
  force?: boolean;
}

export interface InitResult {
  created: string[];
  skipped: string[];
  message: string;
}
