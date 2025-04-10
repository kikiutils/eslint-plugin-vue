---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-ref-as-operand
description: disallow use of value wrapped by `ref()` (Composition API) as an operand
since: v7.0.0
---

# vue/no-ref-as-operand

> disallow use of value wrapped by `ref()` (Composition API) as an operand

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports cases where a ref is used incorrectly as an operand.  
You must use `.value` to access the `Ref` value.

<eslint-code-block fix :rules="{'vue/no-ref-as-operand': ['error']}">

```vue
<script>
import { ref } from 'vue'

export default {
  setup(_props, { emit }) {
    const count = ref(0)
    const ok = ref(true)

    /* ✓ GOOD */
    count.value++
    count.value + 1
    1 + count.value
    var msg = ok.value ? 'yes' : 'no'
    emit('increment', count.value)

    /* ✗ BAD */
    count++
    count + 1
    1 + count
    var msg = ok ? 'yes' : 'no'
    emit('increment', count)

    return {
      count
    }
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Guide - Reactivity - Reactivity Fundamentals / Creating Standalone Reactive Values as `refs`](https://v3.vuejs.org/guide/reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)
- [Vue RFCs - 0013-composition-api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-ref-as-operand.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/no-ref-as-operand.js)
