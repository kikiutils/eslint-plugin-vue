---
pageClass: rule-details
sidebarDepth: 0
title: vue/component-name-in-template-casing
description: enforce specific casing for the component naming style in template
since: v5.0.0
---

# vue/component-name-in-template-casing

> enforce specific casing for the component naming style in template

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

Define a style for the component name in template casing for consistency purposes.

## :book: Rule Details

This rule aims to warn the tag names other than the configured casing in Vue.js template.

## :wrench: Options

```json
{
  "vue/component-name-in-template-casing": ["error", "PascalCase" | "kebab-case", {
    "registeredComponentsOnly": true,
    "ignores": []
  }]
}
```

- `"PascalCase"` (default) ... enforce tag names to pascal case. E.g. `<CoolComponent>`. This is consistent with the JSX practice.
- `"kebab-case"` ... enforce tag names to kebab case: E.g. `<cool-component>`. This is consistent with the HTML practice which is case-insensitive originally.
- `registeredComponentsOnly` ... If `true`, only registered components (in PascalCase) are checked. If `false`, check all.
    default `true`
- `ignores` (`string[]`) ... The element names to ignore. Sets the element name to allow. For example, custom elements or Vue components with special name. You can set the regexp by writing it like `"/^name/"`.
- `globals` (`string[]`) ... Globally registered component names to check. For example, `RouterView` and `RouterLink` are globally registered by `vue-router` and can't be detected as registered in a SFC file.

### `"PascalCase", { registeredComponentsOnly: true }` (default)

<eslint-code-block fix :rules="{'vue/component-name-in-template-casing': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <CoolComponent />

  <!-- ✗ BAD -->
  <cool-component />
  <coolComponent />
  <Cool-component />

  <!-- ignore -->
  <UnregisteredComponent />
  <unregistered-component />

  <registered-in-kebab-case />
  <registeredInCamelCase />
</template>
<script>
export default {
  components: {
    CoolComponent,
    'registered-in-kebab-case': VueComponent1,
    registeredInCamelCase: VueComponent2
  }
}
</script>
```

</eslint-code-block>

### `"kebab-case"`

<eslint-code-block fix :rules="{'vue/component-name-in-template-casing': ['error', 'kebab-case']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <cool-component />

  <!-- ✗ BAD -->
  <CoolComponent />
  <coolComponent />
  <Cool-component />

  <!-- ignore -->
  <unregistered-component />
  <UnregisteredComponent />
</template>
<script>
export default {
  components: {
    CoolComponent
  }
}
</script>
```

</eslint-code-block>

### `"PascalCase", { registeredComponentsOnly: false }`

<eslint-code-block fix :rules="{'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <CoolComponent />
  <UnregisteredComponent />

  <!-- ✗ BAD -->
  <cool-component />
  <unregistered-component />
</template>
<script>
export default {
  components: {
    CoolComponent
  }
}
</script>
```

</eslint-code-block>

### `"PascalCase", { ignores: ["/^custom-/"], registeredComponentsOnly: false }`

<eslint-code-block fix :rules="{'vue/component-name-in-template-casing': ['error', 'PascalCase', {ignores: ['/^custom-/'], registeredComponentsOnly: false}]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <CoolComponent />
  <custom-element></custom-element>
  <custom-button></custom-button>
  <custom-input />

  <!-- ✗ BAD -->
  <magic-element></magic-element>
</template>
```

</eslint-code-block>

### `"PascalCase", { globals: ["RouterView"] }`

<eslint-code-block fix :rules="{'vue/component-name-in-template-casing': ['error', 'PascalCase', {globals: ['RouterView']}]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <RouterView></RouterView>

  <!-- ✗ BAD -->
  <router-view></router-view>
</template>
```

</eslint-code-block>

## :books: Further Reading

- [Style guide - Component name casing in templates](https://vuejs.org/style-guide/rules-strongly-recommended.html#component-name-casing-in-templates)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v5.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/component-name-in-template-casing.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/component-name-in-template-casing.js)
