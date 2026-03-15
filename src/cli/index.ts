#!/usr/bin/env node
/**
 * Harness Plugin CLI
 *
 * Usage:
 *   npx rulebased-harness init [--force]
 *   npx rulebased-harness audit [path]
 *   npx rulebased-harness recommend [path]
 */

import { resolve } from "node:path";
import { audit, formatReport } from "../core/auditor.js";
import { recommend, formatRecommendations } from "../core/recommender.js";
import { initHarness } from "../core/initializer.js";

const args = process.argv.slice(2);
const command = args[0];

function printUsage(): void {
  console.log(`
rulebased-harness - AI 에이전트를 위한 하네스 구축 도구

Commands:
  init [--force]        현재 디렉토리에 하네스 구조 초기화
  audit [path]          하네스 구축 정도 점검 (기본: 현재 디렉토리)
  recommend [path]      빠진 하네스 요소 추천

Options:
  --force               기존 파일 덮어쓰기 (init)
  --json                JSON 형식 출력 (audit, recommend)
  -h, --help            도움말
  -v, --version         버전 정보
`);
}

function getProjectPath(): string {
  const pathArg = args.find((a) => !a.startsWith("-") && a !== command);
  return resolve(pathArg || ".");
}

function hasFlag(flag: string): boolean {
  return args.includes(flag);
}

switch (command) {
  case "init": {
    const projectPath = getProjectPath();
    const force = hasFlag("--force");
    console.log(`Initializing harness in: ${projectPath}\n`);

    const result = initHarness(projectPath, { force });

    if (result.created.length > 0) {
      console.log("Created:");
      for (const f of result.created) console.log(`  + ${f}`);
    }
    if (result.skipped.length > 0) {
      console.log("Skipped (already exists):");
      for (const f of result.skipped) console.log(`  - ${f}`);
    }
    console.log(`\n${result.message}`);
    break;
  }

  case "audit": {
    const projectPath = getProjectPath();
    const report = audit(projectPath);

    if (hasFlag("--json")) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(formatReport(report));
    }
    break;
  }

  case "recommend": {
    const projectPath = getProjectPath();
    const report = audit(projectPath);
    const recs = recommend(report);

    if (hasFlag("--json")) {
      console.log(JSON.stringify(recs, null, 2));
    } else {
      console.log(formatRecommendations(recs));
    }
    break;
  }

  case "-v":
  case "--version":
    console.log("@rulebased/harness v1.0.0");
    break;

  case "-h":
  case "--help":
  case undefined:
    printUsage();
    break;

  default:
    console.error(`Unknown command: ${command}`);
    printUsage();
    process.exit(1);
}
