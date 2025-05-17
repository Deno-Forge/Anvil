import { consolePrompt, ConsolePromptOptions, PromptCancelledError } from './console_prompt.ts'
import { assertEquals, assertThrows } from 'jsr:@std/assert'

Deno.test('consolePrompt - returns input when provided', () => {
   const mockPrompt = (_q: string, _d?: string) => 'Forgey'
   const result = consolePrompt('Name?', {}, { promptFn: mockPrompt })
   assertEquals(result, 'Forgey')
})

Deno.test('consolePrompt - returns defaultValue when cancelled', () => {
   const mockPrompt = (_q: string, _d?: string) => null
   const result = consolePrompt('Name?', { defaultValue: 'Smith' }, { promptFn: mockPrompt })
   assertEquals(result, 'Smith')
})

Deno.test('consolePrompt - throws PromptCancelledError when cancelled and throwOnCancel', () => {
   const mockPrompt = (_q: string, _d?: string) => null
   assertThrows(
      () => {
         consolePrompt('Name?', { throwOnCancel: true }, { promptFn: mockPrompt })
      },
      PromptCancelledError,
      'Prompt was cancelled by the user.',
   )
})

Deno.test('consolePrompt - repeats until valid input when repeatOnCancel', () => {
   let callCount = 0
   const mockPrompt = () => {
      callCount++
      return callCount === 3 ? 'Finally' : null
   }

   const result = consolePrompt(
      'Name?',
      { repeatOnCancel: true },
      { promptFn: mockPrompt },
   )
   assertEquals(result, 'Finally')
   assertEquals(callCount, 3)
})

Deno.test('consolePrompt - uses injected defaultValue if no overrides', () => {
   const mockPrompt = (_q: string, d?: string) => d ?? null
   const result = consolePrompt('Name?', { defaultValue: 'Fallback' }, { promptFn: mockPrompt })
   assertEquals(result, 'Fallback')
})
