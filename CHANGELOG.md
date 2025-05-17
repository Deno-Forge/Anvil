## [0.1.4] – Docs for the Docs God

Added module-level documentation for all exported entrypoints to restore JSR doc coverage.

### 📝 Documentation

- Added `@module` JSDoc comments to:
  - `console_prompt.ts`
  - `run_shell_command.ts`
  - `parse_deno_config.ts`

## [0.1.3] – Paths Forged Open

This patch release exposes the individual utilities of `@deno-forge/anvil` for direct import via JSR.

### 🔧 Internal

- Added named exports for:
  - `./console_prompt`
  - `./run_shell_command`
  - `./parse_deno_config`
- Developers can now import tools directly without relying on `mod.ts`

## [0.1.2] – Flat-Forged for Precision

This release flattens the forge floor, aligning `@deno-forge/anvil` with the import ergonomics of `@std`. Utilities are now directly importable without pulling unintended dependencies.

### 🔧 Internal

- **Flattened file structure**: moved all exported utilities from `/src` to top-level `.ts` files
- **Minimized dependency graph**: consumers can now import `console_prompt`, `run_shell_command`, and `parse_deno_config` individually without triggering transitive `std/jsonc` inclusion
- Updated `deno.jsonc` to reflect new file locations for linting, formatting, and publishing
- Internal inject types (`*Injects`) are no longer exported from their modules

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
