/**
 * Prompt the user with a question in the terminal and handle input like a seasoned CLI.
 *
 * This utility provides a flexible, injectable wrapper around `prompt()`,
 * including cancel handling, default values, and retry support.
 *
 * Suitable for interactive Deno CLI tools where testability and UX are both key.
 * @module
 */

/** Options for consolePrompt */
export type ConsolePromptOptions = {
   /** Default value to return if input is empty or canceled. */
   defaultValue?: string
   /** Whether to throw a PromptCancelledError on cancel. */
   throwOnCancel?: boolean
   /** Whether to repeat the prompt until answered. */
   repeatOnCancel?: boolean
}

/** Error thrown when prompt is cancelled and `throwOnCancel` is true. */
export class PromptCancelledError extends Error {
   constructor() {
      super('Prompt was cancelled by the user.')
   }
}

/** @internal */
type ConsolePromptInjects = {
   promptFn?: (question: string, defaultValue?: string) => string | null
   exit?: typeof Deno.exit
}

/**
 * Prompts the user for input via the console, with optional default and behavior overrides.
 *
 * @example
 * ```ts
 * const name = consolePrompt("What's your name?");
 * ```
 */
export function consolePrompt(
   /** Prompt text displayed to the user */
   question: string,
   {
      defaultValue = '',
      throwOnCancel = false,
      repeatOnCancel = false,
   }: ConsolePromptOptions = {},
   {
      promptFn = prompt,
      exit = Deno.exit,
   }: ConsolePromptInjects = {},
): string {
   const input = promptFn(question, defaultValue)
   if (input === null) {
      if (throwOnCancel) throw new PromptCancelledError()
      if (repeatOnCancel) {
         return consolePrompt(question, { defaultValue, throwOnCancel, repeatOnCancel }, { promptFn, exit })
      }
      return defaultValue
   }
   return input
}
