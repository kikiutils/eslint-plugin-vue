---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-v-text
description: enforce valid `v-text` directives
since: v3.11.0
---

# vue/valid-v-text

> enforce valid `v-text` directives

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

This rule checks whether every `v-text` directive is valid.

## :book: Rule Details

This rule reports `v-text` directives in the following cases:

- The directive has that argument. E.g. `<div v-text:aaa></div>`
- The directive has that modifier. E.g. `<div v-text.bbb></div>`
- The directive does not have that attribute value. E.g. `<div v-text></div>`

<eslint-code-block :rules="{'vue/valid-v-text': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div v-text="foo" />

  <!-- ✗ BAD -->
  <div v-text />
  <div v-text:aaa="foo" />
  <div v-text.bbb="foo" />
</template>
```

</eslint-code-block>

::: warning Note
This rule does not check syntax errors in directives because it's checked by [vue/no-parsing-error] rule.
:::

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/no-parsing-error]

[vue/no-parsing-error]: ./no-parsing-error.md

## :rocket: Version

This rule was introduced in eslint-plugin-vue v3.11.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/valid-v-text.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/valid-v-text.js)
