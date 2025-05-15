# 🛠️ @deno-forge/anvil

[![jsr](https://img.shields.io/badge/jsr--%40deno-forge%2Fanvil-blue?logo=deno)](https://jsr.io/@deno-forge/anvil)
[![GitHub](https://img.shields.io/badge/GitHub-deno-forge/anvil-blue?logo=github)](https://github.com/deno-forge/anvil)

Shell runners, config parsers, and foundational utilities every Deno smith needs.

---

The anvil is where every tool begins its shape. This module provides the utilities at the heart of the forge.

## 📦 Modules

### `runShellCommand`

> Run shell commands with dry-run, quiet mode, and rich output.

```ts
import { runShellCommand } from "jsr:@deno-forge/anvil";

await runShellCommand({
  cmd: ["git", "init"],
  desc: "Initialize Git repo",
  dryRun: false,
});
```

### `parseDenoConfig`

> Reads and parses the nearest `deno.json` or `deno.jsonc` file.

## 🔧 Philosophy

Each utility in `@deno-forge/anvil` is:

- 🧱 Foundational — useful across many forge modules.
- 🔍 Observable — testable via injects and dry-run support.
- 🛠️ Composable — ready to slot into other smithy tools.

---

Forged with precision. Tempered with tests.
