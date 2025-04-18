---
pageClass: rule-details
sidebarDepth: 0
title: vue/jsx-uses-vars
description: prevent variables used in JSX to be marked as unused
since: v2.0.0
---

# vue/jsx-uses-vars

> prevent variables used in JSX to be marked as unused

- :gear: This rule is included in all of `"plugin:vue/base"`, `*.configs["flat/base"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-recommended"`, `*.configs["flat/vue2-recommended"]`, `"plugin:vue/recommended"` and `*.configs["flat/recommended"]`.

Since 0.17.0 the ESLint `no-unused-vars` rule does not detect variables used in JSX ([see details](https://eslint.org/blog/2015/03/eslint-0.17.0-released#changes-to-jsxreact-handling)).
This rule will find variables used in JSX and mark them as used.

This rule only has an effect when the `no-unused-vars` rule is enabled.

## :book: Rule Details

Without this rule this code triggers warning:

```jsx
import HelloWorld from './HelloWorld';

export default {
  render () {
    return (
      <HelloWorld msg="world"/>
    )
  },
};
```

After turning on, `HelloWorld` is being marked as used and `no-unused-vars` rule doesn't report an issue.

## :mute: When Not To Use It

If you are not using JSX or if you do not use the `no-unused-vars` rule then you can disable this rule.

## :couple: Related Rules

- [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v2.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/jsx-uses-vars.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/jsx-uses-vars.js)
