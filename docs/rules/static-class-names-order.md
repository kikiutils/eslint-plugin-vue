---
pageClass: rule-details
sidebarDepth: 0
title: vue/static-class-names-order
description: enforce static class names order
since: v6.1.0
---

# vue/static-class-names-order

> enforce static class names order

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to enforce the order of static class names.

<eslint-code-block fix :rules="{'vue/static-class-names-order': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div class="a b"></div>

  <!-- ✗ BAD -->
  <div class="b a"></div>
</template>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-vue v6.1.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/static-class-names-order.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/static-class-names-order.js)
