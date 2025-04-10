---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-v-slot
description: enforce valid `v-slot` directives
since: v7.0.0
---

# vue/valid-v-slot

> enforce valid `v-slot` directives

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

This rule checks whether every `v-slot` directive is valid.

## :book: Rule Details

This rule reports `v-slot` directives in the following cases:

- The directive is not owned by a custom element. E.g. `<div v-slot=""></div>`
- The directive is a named slot and is on a custom element directly. E.g. `<my-component v-slot:foo></my-component>`
- The directive is the default slot, is on a custom element directly, and there are other named slots. E.g. `<my-component v-slot=""><template v-slot:foo></template></my-component>`
- The element which has the directive has another `v-slot` directive. E.g. `<my-component v-slot:one v-slot:two></my-component>`
- The element which has the directive has another `v-slot` directive that is distributed to the same slot. E.g. `<my-component><template v-slot:foo></template><template v-slot:foo></template></my-component>`
- The directive has a dynamic argument which uses the scope properties that the directive defined. E.g. `<my-component><template v-slot:[data]="data"></template></my-component>`
- The directive has any modifier. E.g. `<my-component v-slot.foo></my-component>`
- The directive is the default slot, is on a custom element directly, and has no value. E.g. `<my-component v-slot></my-component>`

<eslint-code-block :rules="{'vue/valid-v-slot': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <my-component v-slot="data">
    {{ data }}
  </my-component>
  <my-component>
    <template v-slot:default>
      default
    </template>
    <template v-slot:one>
      one
    </template>
    <template v-slot:two>
      two
    </template>
  </my-component>

  <!-- ✗ BAD -->
  <div v-slot="data">
    {{ data }}
  </div>
  <div>
    <template v-slot:one>
      one
    </template>
  </div>

  <my-component v-slot:one="data">
    {{ data }}
  </my-component>
  <my-component v-slot="data">
    {{ data }}
    <template v-slot:one>
      one
    </template>
  </my-component>

  <my-component v-slot:one v-slot:two>
    one and two
  </my-component>
  <my-component>
    <template v-slot:one>
      one 1
    </template>
    <template v-slot:one>
      one 2
    </template>
  </my-component>

  <my-component>
    <template v-slot:[data]="data">
      dynamic?
    </template>
  </my-component>

  <my-component v-slot.mod="data">
    {{ data }}
  </my-component>

  <my-component v-slot>
    content
  </my-component>
</template>
```

</eslint-code-block>

::: warning Note
This rule does not check syntax errors in directives because it's checked by [vue/no-parsing-error] rule.
:::

## :wrench: Options

```json
{
  "vue/valid-v-slot": ["error", {
    "allowModifiers": false
  }]
}
```

- `allowModifiers` (`boolean`) ... allows having modifiers in the argument of `v-slot` directives. Modifiers just after `v-slot` are still disallowed. E.g. `<template v-slot.foo>` default `false`.

### `allowModifiers: true`

<eslint-code-block :rules="{'vue/valid-v-slot': ['error', {allowModifiers: true}]}">

```vue
<template>
  <!-- ignore -->
  <MyComponent>
    <template v-slot:foo></template>
    <template v-slot:foo.bar></template>
    <template v-slot:foo.baz></template>
    <template v-slot:foo.bar.baz></template>
  </MyComponent>

  <!--  ✗ BAD */ -->
  <MyComponent v-slot.foo="{ data }">
    {{ data }}
  </MyComponent>
  <MyComponent>
    <template v-slot.foo>
      bar
    </template>
  </MyComponent>
</template>
```

</eslint-code-block>

## :couple: Related Rules

- [vue/no-parsing-error]

[vue/no-parsing-error]: ./no-parsing-error.md

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/valid-v-slot.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/valid-v-slot.js)
