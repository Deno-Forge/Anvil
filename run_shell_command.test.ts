import { runShellCommand, ShellCommandError, shellEscape } from './run_shell_command.ts'
import { assertEquals, assertRejects } from '@std/assert'
import { assertSpyCall, assertSpyCalls, spy } from '@std/testing/mock'

Deno.test('runShellCommand: executes a successful command', async () => {
   const injects = { consoleLog: () => {} }
   const spies = { consoleLog: spy(injects, 'consoleLog') }

   const result = await runShellCommand(
      {
         cmd: ['echo', 'hello'],
         quiet: false,
      },
      injects,
   )

   assertEquals(result.code, 0)
   assertEquals(result.stdout, 'hello')
   assertEquals(result.stderr, '')
   assertSpyCalls(spies.consoleLog, 1)
   assertSpyCall(spies.consoleLog, 0, { args: ['✅ echo hello'] })
})

Deno.test('runShellCommand: respects dryRun mode', async () => {
   const injects = { consoleLog: () => {} }
   const spies = { consoleLog: spy(injects, 'consoleLog') }

   const result = await runShellCommand(
      {
         cmd: ['echo', 'nope'],
         dryRun: true,
         quiet: false,
      },
      injects,
   )

   assertEquals(result.code, 0)
   assertEquals(result.stdout, '')
   assertEquals(result.stderr, '')
   assertSpyCalls(spies.consoleLog, 1)
   assertSpyCall(spies.consoleLog, 0, { args: ['🟡 [dry-run] echo nope'] })
})

Deno.test('runShellCommand: respects quiet mode', async () => {
   const injects = { consoleLog: () => {} }
   const spies = { consoleLog: spy(injects, 'consoleLog') }

   const result = await runShellCommand(
      {
         cmd: ['echo', 'yes'],
         dryRun: false,
         quiet: true,
      },
      injects,
   )

   assertEquals(result.code, 0)
   assertEquals(result.stdout, 'yes')
   assertEquals(result.stderr, '')
   assertSpyCalls(spies.consoleLog, 0)
})

Deno.test('runShellCommand: throws ShellCommandError on failure', async () => {
   await assertRejects(
      () =>
         runShellCommand({
            cmd: ['bash', '-c', 'exit 1'],
            quiet: true,
         }),
      ShellCommandError,
      'Command failed',
   )
})

Deno.test('runShellCommand: captures stderr correctly', async () => {
   const result = await runShellCommand({
      cmd: ['bash', '-c', 'echo "this is stderr" 1>&2 && exit 0'],
   })

   assertEquals(result.code, 0)
   assertEquals(result.stdout, '')
   assertEquals(result.stderr, 'this is stderr')
})

Deno.test('shellEscape: escapes arguments with spaces and quotes', () => {
   assertEquals(
      shellEscape(`/bin/bash`),
      `/bin/bash`,
      'leaves argument untouched if it does not contain spaces',
   )
   assertEquals(
      shellEscape(`--help`),
      `--help`,
      'leaves argument untouched if it does not contain spaces',
   )
   assertEquals(
      shellEscape(`forge your destiny!`),
      `"forge your destiny!"`,
      'wraps in double quotes if argument contains spaces',
   )
   assertEquals(
      shellEscape(`hello "world"`),
      `"hello \\\"world\\\""`,
      'escapes double quotes and wraps in double quotes',
   )
})
