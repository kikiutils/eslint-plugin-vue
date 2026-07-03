/**
 * @author kiki-kanri
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/class-hex-color-case'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

const message = 'Expected hex colors in class names to be lowercase.'

tester.run('class-hex-color-case', rule as RuleModule, {
  valid: [
    {
      filename: 'no-class.vue',
      code: '<template><div /></template>'
    },
    {
      filename: 'lowercase-static-class.vue',
      code: '<template><div class="text-[#abcdef] bg-#abc border-[#1234] shadow-[#12345678]" /></template>'
    },
    {
      filename: 'dynamic-unknown-class.vue',
      code: '<template><div :class="className" /></template>'
    },
    {
      filename: 'url-fragment.vue',
      code: '<template><div class="bg-[url(#ABC)] bg-[url(\'/icons.svg#ABC\')]" /></template>'
    },
    {
      filename: 'logical-left-string.vue',
      code: `<template><div :class="'text-[#ABCDEF]' && active" /></template>`
    },
    {
      filename: 'invalid-hex-like-class.vue',
      code: '<template><div class="text-[#abcdex] bg-[#12] border-[#12345]" /></template>'
    },
    {
      filename: 'ambiguous-non-color-hash-fragments.vue',
      code: `<template><div class="content-['#ABC'] [#ABC]:block [&_#ABC]:block" :class="[/#ABC/, 1, true, null]" /></template>`
    },
    {
      filename: 'lowercase-directive-object.vue',
      code: `<template><div :class="{ 'text-[#abcdef]': active }" /></template>`
    }
  ],
  invalid: [
    {
      filename: 'static-class.vue',
      code: '<template><div class="text-[#ABCDEF] bg-#ABC border-[#1234] shadow-[#12345678]" /></template>',
      output:
        '<template><div class="text-[#abcdef] bg-#abc border-[#1234] shadow-[#12345678]" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 80
        }
      ]
    },
    {
      filename: 'multiline-static-class.vue',
      code: `<template>
  <div
    class="
      text-[#ABCDEF]
      hover:bg-[#C0FFEE]
    "
  />
</template>`,
      output: `<template>
  <div
    class="
      text-[#abcdef]
      hover:bg-[#c0ffee]
    "
  />
</template>`,
      errors: [
        {
          message,
          line: 3,
          column: 11,
          endLine: 6,
          endColumn: 6
        }
      ]
    },
    {
      filename: 'directive-string.vue',
      code: `<template><div :class="'text-[#ABCDEF] bg-#ABC'" /></template>`,
      output: `<template><div :class="'text-[#abcdef] bg-#abc'" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 24,
          endLine: 1,
          endColumn: 48
        }
      ]
    },
    {
      filename: 'four-and-eight-digit-hex.vue',
      code: '<template><div class="border-[#ABCD] shadow-[#ABCDEF80]" /></template>',
      output:
        '<template><div class="border-[#abcd] shadow-[#abcdef80]" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 57
        }
      ]
    },
    {
      filename: 'arbitrary-css-color-property.vue',
      code: '<template><div class="[color:#ABCDEF] text-[color:#C0FFEE]" /></template>',
      output:
        '<template><div class="[color:#abcdef] text-[color:#c0ffee]" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 60
        }
      ]
    },
    {
      filename: 'direct-conditional-expression.vue',
      code: `<template><div :class="active ? 'text-[#ABCDEF]' : 'bg-[#C0FFEE]'" /></template>`,
      output: `<template><div :class="active ? 'text-[#abcdef]' : 'bg-[#c0ffee]'" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 33,
          endLine: 1,
          endColumn: 49
        },
        {
          message,
          line: 1,
          column: 52,
          endLine: 1,
          endColumn: 66
        }
      ]
    },
    {
      filename: 'directive-array-object-and-conditional.vue',
      code: `<template><div :class="['text-[#ABCDEF]', { 'bg-[#C0FFEE]': active }, active ? 'border-[#FACE00]' : 'ring-[#BADA55]']" /></template>`,
      output: `<template><div :class="['text-[#abcdef]', { 'bg-[#c0ffee]': active }, active ? 'border-[#face00]' : 'ring-[#bada55]']" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 25,
          endLine: 1,
          endColumn: 41
        },
        {
          message,
          line: 1,
          column: 45,
          endLine: 1,
          endColumn: 59
        },
        {
          message,
          line: 1,
          column: 80,
          endLine: 1,
          endColumn: 98
        },
        {
          message,
          line: 1,
          column: 101,
          endLine: 1,
          endColumn: 117
        }
      ]
    },
    {
      filename: 'directive-template-literal.vue',
      code: '<template><div :class="`text-[#ABCDEF] ${active ? \'bg-[#C0FFEE]\' : className}`" /></template>',
      output:
        '<template><div :class="`text-[#abcdef] ${active ? \'bg-[#c0ffee]\' : className}`" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 24,
          endLine: 1,
          endColumn: 42
        },
        {
          message,
          line: 1,
          column: 51,
          endLine: 1,
          endColumn: 65
        }
      ]
    },
    {
      filename: 'directive-template-literal-tail.vue',
      code: '<template><div :class="`${className} bg-[#ABCDEF]`" /></template>',
      output:
        '<template><div :class="`${className} bg-[#abcdef]`" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 36,
          endLine: 1,
          endColumn: 51
        }
      ]
    },
    {
      filename: 'directive-binary-logical-expression.vue',
      code: `<template><div :class="active && ('text-[#ABCDEF] ' + 'bg-[#C0FFEE]')" /></template>`,
      output: `<template><div :class="active && ('text-[#abcdef] ' + 'bg-[#c0ffee]')" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 35,
          endLine: 1,
          endColumn: 52
        },
        {
          message,
          line: 1,
          column: 55,
          endLine: 1,
          endColumn: 69
        }
      ]
    },
    {
      filename: 'v-bind-object-class.vue',
      code: `<template><div v-bind="{ class: ['text-[#ABCDEF]', { 'bg-[#C0FFEE]': active }], id: 'keep' }" /></template>`,
      output: `<template><div v-bind="{ class: ['text-[#abcdef]', { 'bg-[#c0ffee]': active }], id: 'keep' }" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 34,
          endLine: 1,
          endColumn: 50
        },
        {
          message,
          line: 1,
          column: 54,
          endLine: 1,
          endColumn: 68
        }
      ]
    },
    {
      filename: 'v-bind-object-string-class.vue',
      code: `<template><div v-bind="{ class: 'text-[#ABCDEF]', id: 'keep' }" /></template>`,
      output: `<template><div v-bind="{ class: 'text-[#abcdef]', id: 'keep' }" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 33,
          endLine: 1,
          endColumn: 49
        }
      ]
    },
    {
      filename: 'v-bind-conditional-object-class.vue',
      code: `<template><div v-bind="active ? { class: 'text-[#ABCDEF]' } : { class: 'bg-[#C0FFEE]' }" /></template>`,
      output: `<template><div v-bind="active ? { class: 'text-[#abcdef]' } : { class: 'bg-[#c0ffee]' }" /></template>`,
      errors: [
        {
          message,
          line: 1,
          column: 42,
          endLine: 1,
          endColumn: 58
        },
        {
          message,
          line: 1,
          column: 72,
          endLine: 1,
          endColumn: 86
        }
      ]
    },
    {
      filename: 'does-not-change-url-fragment-but-changes-color.vue',
      code: '<template><div class="bg-[url(#ABC)] text-[#ABCDEF]" /></template>',
      output:
        '<template><div class="bg-[url(#ABC)] text-[#abcdef]" /></template>',
      errors: [
        {
          message,
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 53
        }
      ]
    }
  ]
})
