import { assertEquals, assertRejects } from '@std/assert'
import { parseDenoConfig, ParseError } from './parse_deno_config.ts'

Deno.test('parseDenoConfig parses deno.jsonc if available', async () => {
   const mockReadFn = async (path: string | URL) => {
      if (path === 'deno.jsonc') return '{ "githubPath": "deno-forge/scaffold-git" }'
      throw new Error('Should not reach deno.json')
   }

   const result = await parseDenoConfig({}, { readFn: mockReadFn })
   assertEquals(result.githubPath, 'deno-forge/scaffold-git')
})

Deno.test('parseDenoConfig falls back to deno.json if deno.jsonc not found', async () => {
   const mockReadFn = async (path: string | URL): Promise<string> => {
      if (path === 'deno.jsonc') throw new Error('File not found')
      if (path === 'deno.json') return '{ "githubPath": "fallback/repo" }'
      throw new Error('Unexpected path')
   }

   const result = await parseDenoConfig({}, { readFn: mockReadFn })
   assertEquals(result.githubPath, 'fallback/repo')
})

Deno.test('parseDenoConfig throws ParseError on invalid JSON', async () => {
   const mockReadFn = async (_path: string | URL): Promise<string> => 'INVALID_JSON'

   await assertRejects(
      () => parseDenoConfig({}, { readFn: mockReadFn }),
      ParseError,
      'Failed to read deno.json(c).',
   )
})

Deno.test('parseDenoConfig: parses config from explicit filePath', async () => {
   const mockConfig = `{ "imports": { "x": "./mod.ts" } }`
   const mockReadFn = (path: string | URL): Promise<string> => {
      if (path !== 'custom-config.json') throw new Error('wrong file')
      return Promise.resolve(mockConfig)
   }

   const config = await parseDenoConfig({
      filePath: 'custom-config.json',
   }, { readFn: mockReadFn })

   assertEquals(config.imports?.x, './mod.ts')
})
