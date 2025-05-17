# 🛠️ @deno-forge/anvil

Shell runners, config parsers, and foundational utilities every Deno smith needs.

---

The anvil is where every tool begins its shape. This module provides the utilities at the heart of the forge.

## 📦 Modules

### `consolePrompt`

> Ask the user for input with cancel handling and testable injection.

```ts
import { consolePrompt } from "jsr:@deno-forge/anvil";

// Ask a question with a default fallback
const name = consolePrompt("What's your name?", {
  defaultValue: "Forgey",
});

console.log(`Welcome, ${name}.`);
```

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

```ts
import { parseDenoConfig } from "jsr:@deno-forge/anvil";

// Auto-detect deno.jsonc or deno.json
const config = await parseDenoConfig();

if (config.imports) {
  console.log("Imports map:", config.imports);
}
```

> You can also specify a config file directly:

```ts
import { parseDenoConfig } from "jsr:@deno-forge/anvil";

const config = await parseDenoConfig({ filePath: "./configs/deno.json" });

console.log("Compiler options:", config.compilerOptions);
```

## 🔧 Philosophy

Each utility in `@deno-forge/anvil` is:

- 🧱 Foundational — useful across many forge modules.
- 🔍 Observable — testable via injects and dry-run support.
- 🛠️ Composable — ready to slot into other smithy tools.

---

Forged with precision. Tempered with tests.
