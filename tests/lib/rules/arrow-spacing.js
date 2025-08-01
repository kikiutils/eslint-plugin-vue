/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('../../eslint-compat').RuleTester
const rule = require('../../../lib/rules/arrow-spacing')

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 2015
  }
})

tester.run('arrow-spacing', rule, {
  valid: [
    `<template>
      <div :attr="() => a" />
    </template>`,
    `<template>
      <div @click="() => a" />
    </template>`,
    `<template>
      <div @click="
        const fn = () => a
        fn()
      " />
    </template>`,
    {
      code: `
        <template>
          <div :attr="()=>a" />
        </template>`,
      options: [{ before: false, after: false }]
    }
  ],
  invalid: [
    {
      code: `
        <template>
          <div :attr="()=>a" />
        </template>`,
      output: `
        <template>
          <div :attr="() => a" />
        </template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 3,
          column: 24,
          endLine: 3,
          endColumn: 25
        },
        {
          message: 'Missing space after =>.',
          line: 3,
          column: 27,
          endLine: 3,
          endColumn: 28
        }
      ]
    },
    {
      code: `
        <template>
          <div @click="()=>a" />
        </template>`,
      output: `
        <template>
          <div @click="() => a" />
        </template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 3,
          column: 25,
          endLine: 3,
          endColumn: 26
        },
        {
          message: 'Missing space after =>.',
          line: 3,
          column: 28,
          endLine: 3,
          endColumn: 29
        }
      ]
    },
    {
      code: `
        <template>
          <div @click="
            const fn = ()=>a
            fn()
          " />
        </template>`,
      output: `
        <template>
          <div @click="
            const fn = () => a
            fn()
          " />
        </template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 26
        },
        {
          message: 'Missing space after =>.',
          line: 4,
          column: 28,
          endLine: 4,
          endColumn: 29
        }
      ]
    },
    {
      code: `
        <template>
          <div :attr="() => a" />
        </template>`,
      output: `
        <template>
          <div :attr="()=>a" />
        </template>`,
      options: [{ before: false, after: false }],
      errors: [
        {
          message: 'Unexpected space before =>.',
          line: 3,
          column: 24,
          endLine: 3,
          endColumn: 25
        },
        {
          message: 'Unexpected space after =>.',
          line: 3,
          column: 29,
          endLine: 3,
          endColumn: 30
        }
      ]
    }
  ]
})
