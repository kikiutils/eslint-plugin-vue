---
pageClass: rule-details
sidebarDepth: 0
title: vue/class-hex-color-case
description: enforce lowercase hex colors in class names
---

# vue/class-hex-color-case

> enforce lowercase hex colors in class names

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> _**This rule has not been released yet.**_ </badge>
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces lowercase CSS hex colors inside static class name fragments.
It is intended for utility class systems such as Tailwind CSS and UnoCSS where
hex colors can appear in arbitrary values, for example `bg-[#bada55]`, or in
UnoCSS-style utilities such as `text-#bada55`.

The rule only normalizes detected hex color literals in clear color utility
contexts, such as color-related utility prefixes (`bg-`, `text-`, `border-`,
`ring-`, `shadow-`, `fill-`, `stroke-`, etc.) and arbitrary CSS color
properties such as `[color:#ABCDEF]`. It does not lowercase the entire class
name and intentionally ignores ambiguous hash fragments such as URL fragments,
arbitrary selectors, and `content` values.

<eslint-code-block fix :rules="{'vue/class-hex-color-case': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div class="text-[#abcdef] bg-#abc" />

  <!-- ✗ BAD -->
  <div class="text-[#ABCDEF] bg-#ABC" />
</template>
```

</eslint-code-block>

It also checks static portions of `:class` expressions:

<eslint-code-block fix :rules="{'vue/class-hex-color-case': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div :class="['text-[#abcdef]', { 'bg-[#c0ffee]': active }]" />

  <!-- ✗ BAD -->
  <div :class="['text-[#ABCDEF]', { 'bg-[#C0FFEE]': active }]" />
</template>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/class-hex-color-case.ts)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/class-hex-color-case.test.ts)
