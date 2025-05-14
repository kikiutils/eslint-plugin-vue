'use strict'

const rule = require('../../../lib/rules/no-extra-space-in-class')
const RuleTester = require('eslint').RuleTester

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

tester.run('no-extra-space-in-class', rule, {
  valid: [
    `<template><div class="a b"></div></template>`,
    `<template><div class="ab cd"></div></template>`,
    `<template><div :class="'a  b'"></div></template>`
  ],
  invalid: [
    {
      code: `<template><div class="a b "></div></template>`,
      output: `<template><div class="a b"></div></template>`,
      errors: [{ messageId: 'extraSpaces' }]
    },
    {
      code: `<template><div class=" a b"></div></template>`,
      output: `<template><div class="a b"></div></template>`,
      errors: [{ messageId: 'extraSpaces' }]
    },
    {
      code: `<template><div class="a  b"></div></template>`,
      output: `<template><div class="a b"></div></template>`,
      errors: [{ messageId: 'extraSpaces' }]
    }
  ]
})
