## [0.1.1] – Prompt the Forge

The smiths now speak—introducing a flexible prompt utility for CLI interactivity.

### ✨ Features

- `consolePrompt` - User-facing prompt function with injectable testing hooks.
  - Supports `defaultValue`, `throwOnCancel`, and `repeatOnCancel` options
  - Throws `PromptCancelledError` when requested
  - 100% test coverage across all logic paths
- Updated README with information on consolePrompt

### 🔒 Internal
  - Add github workflows for deployment pipeline
  
## [0.1.0] – Initial Forge

The anvil is lit. First release of foundational utilities for the Deno Forge ecosystem.

### ✨ Features

- `runShellCommand`
  Safe, injectable shell runner with support for:
- `dryRun` mode with emoji output
- `quiet` logging toggle
- Decoded `stdout` / `stderr` with `ShellCommandOutput` result
- Rich error wrapping via `ShellCommandError`

- `parseDenoConfig`
- Loads `deno.jsonc` or `deno.json` in priority order.
- Returns a typed, extensible `DenoConfig`.
- Accepts `filePath` and `readFn` for injectability.

### 🔒 Internal

- 100% test coverage across logic and branches
- Internal-only injects and helpers (`shellEscape`, etc.)
