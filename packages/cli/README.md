# @rulebased/cli

CLI for harness engineering — audit, score, init, recommend, and eval-log.

Part of [@rulebased/harness](https://github.com/rulebased-io/harness).

## Usage

```bash
npx @rulebased/cli audit          # Audit harness coverage (34 checks, 0-100 score)
npx @rulebased/cli score          # Per-category detailed score report
npx @rulebased/cli init           # Initialize harness structure
npx @rulebased/cli recommend      # Recommend missing harness elements
npx @rulebased/cli eval-log       # Evaluate conversation log compliance
```

### Options

```
--json        JSON output (audit, score, recommend)
--force       Overwrite existing files (init)
--preset      Preset name: standard | minimal (init)
--file        Transcript file path (eval-log)
--short       Short output (audit)
```

## License

MIT
