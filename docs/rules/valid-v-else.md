---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-v-else
description: enforce valid `v-else` directives
since: v3.11.0
---

# vue/valid-v-else

> enforce valid `v-else` directives

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

This rule checks whether every `v-else` directive is valid.

## :book: Rule Details

This rule reports `v-else` directives in the following cases:

- The directive has that argument. E.g. `<div v-if="foo"></div><div v-else:aaa></div>`
- The directive has that modifier. E.g. `<div v-if="foo"></div><div v-else.bbb></div>`
- The directive has that attribute value. E.g. `<div v-if="foo"></div><div v-else="bar"></div>`
- The directive is on the elements that the previous element don't have `v-if`/`v-else-if` directives. E.g. `<div v-else></div>`
- The directive is on the elements which have `v-if`/`v-else-if` directives. E.g. `<div v-if="foo" v-else></div>`

<eslint-code-block :rules="{'vue/valid-v-else': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div v-if="foo" />
  <div v-else />

  <!-- ✗ BAD -->
  <div v-else />
  <div v-if="x" /><div v-else="foo" />
  <div v-if="x" /><div v-else:aaa />
  <div v-if="x" /><div v-else.bbb />
</template>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/valid-v-if]
- [vue/valid-v-else-if]
- [vue/no-parsing-error]

[vue/valid-v-if]: ./valid-v-if.md
[vue/valid-v-else-if]: ./valid-v-else-if.md
[vue/no-parsing-error]: ./no-parsing-error.md

## :rocket: Version

This rule was introduced in eslint-plugin-vue v3.11.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/valid-v-else.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/valid-v-else.js)
