/** Options for runShellCommand */
export type RunShellCommandOptions = {
   /** The shell command to run, including arguments and flags. */
   cmd: string[]
   /** A human-readable description shown when the command succeeds. */
   desc?: string
   /** If true, the command will not be executed. Defaults to false. */
   dryRun?: boolean
   /** If true, suppress success output. Defaults to true. */
   quiet?: boolean
}

/** @internal */
type RunShellCommandInjects = {
   consoleLog?: typeof console.log
}

/** The Shell Command Output */
export type ShellCommandOutput = {
   /** The exit code of the command */
   code: number
   /** Everything written to stdout */
   stdout: string
   /** Everything written to stderr */
   stderr: string
}

/**
 * Error thrown when a shell command fails.
 * Includes the command's exit code and full stdout/stderr output.
 */
export class ShellCommandError extends Error {
   /** The stderr output */
   cmdOutput: ShellCommandOutput
   constructor(cmd: string[], cmdOutput: ShellCommandOutput) {
      super(`Command failed: ${cmd.join(' ')}\n${cmdOutput.stderr.slice(0, 200)}`)
      this.name = 'ShellCommandError'
      this.cmdOutput = cmdOutput
   }
}

/**
 * Runs a shell command with optional dry-run and logging.
 * Logs a ✅ message if the command succeeds.
 * Throws an error if the command fails.
 * Returns ShellCommandOutput
 */
export async function runShellCommand(
   {
      cmd,
      desc = undefined,
      dryRun = false,
      quiet = true,
   }: RunShellCommandOptions,
   {
      consoleLog = console.log,
   }: RunShellCommandInjects = {},
): Promise<ShellCommandOutput> {
   if (dryRun) {
      consoleLog(`🟡 [dry-run] ${cmd.map(shellEscape).join(' ')}`)
      return { code: 0, stdout: '', stderr: '' }
   }

   const command = new Deno.Command(cmd[0], { args: cmd.slice(1) })
   const { code, stdout, stderr } = await command.output()
   const decoder = new TextDecoder()
   const cmdOutput = {
      code,
      stdout: decoder.decode(stdout).trim(),
      stderr: decoder.decode(stderr).trim(),
   }

   if (code !== 0) {
      throw new ShellCommandError(cmd, cmdOutput)
   }

   if (!quiet) {
      const message = desc ?? cmd.map(shellEscape).join(' ')
      consoleLog(`✅ ${message}`)
   }

   return cmdOutput
}

/** @internal */
export function shellEscape(arg: string): string {
   // no need to escape the argument if it does not contain spaces
   if (!arg.includes(' ')) return arg
   // wrap in double quotes, escape double quotes in string
   return `"${arg.replace(/"/g, '\\"')}"`
}
