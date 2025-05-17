import { parse } from '@std/jsonc'

/**
 * Parsed contents of a `deno.json` or `deno.jsonc` file.
 * Flexible and extensible.
 */
export type DenoConfig = {
   /** Deno config values. Includes known and custom keys. */
   [key: string]: unknown

   /** Optional imports map for JSR-style resolutions. */
   imports?: Record<string, string>

   /** Optional tasks definition for `deno task`. */
   tasks?: Record<string, string>

   /** Optional TypeScript compiler options. */
   compilerOptions?: Record<string, unknown>
}

/** Error thrown when no valid Deno config could be parsed. */
export class ParseError extends Error {}

/** Options for parseDenoConfig */
export type ParseDenoConfigOptions = {
   /** The path to the Deno config file. Defaults to `deno.jsonc` or `deno.json`. */
   filePath?: string
}

/** @internal */
type ParseDenoConfigInjects = {
   readFn?: typeof Deno.readTextFile
}

/**
 * Parses the nearest Deno config file (`deno.jsonc` or `deno.json`).
 * Prefers `deno.jsonc` if both are present.
 * Throws `ParseError` if neither can be read.
 */
export async function parseDenoConfig(
   { filePath }: ParseDenoConfigOptions = {},
   { readFn = Deno.readTextFile }: ParseDenoConfigInjects = {},
): Promise<DenoConfig> {
   try {
      if (filePath) {
         return parse(
            await readFn(filePath),
         ) as DenoConfig
      }

      const text = await readFn('deno.jsonc')
         .catch(() => readFn('deno.json'))
      return parse(text) as DenoConfig
   } catch {
      throw new ParseError('Failed to read deno.json(c).')
   }
}
