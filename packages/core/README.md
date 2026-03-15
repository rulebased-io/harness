# @rulebased/core

Core logic for harness engineering auditing, recommendations, and initialization.

Part of [@rulebased/harness](https://github.com/rulebased-io/harness).

## API

```typescript
import { audit, formatReport, formatScore } from "@rulebased/core/auditor";
import { recommend, formatRecommendations } from "@rulebased/core/recommender";
import { initHarness } from "@rulebased/core/initializer";
import { parseTranscript, computeStats } from "@rulebased/core/transcript";
import { evaluateLog, formatLogEval } from "@rulebased/core/log-evaluator";
```

### audit(projectPath)

Runs 34 checks based on [OpenAI Codex harness standards](https://openai.com/index/unlocking-the-codex-harness/) and returns a scored report.

### recommend(report)

Generates prioritized recommendations from an audit report.

### initHarness(projectPath, options?)

Creates AGENTS.md, CLAUDE.md, specs/, tasks/, .harness.json in the target project.

### parseTranscript(filePath) / evaluateLog(stats)

Parses Claude Code JSONL transcripts and evaluates session compliance.

## License

MIT
