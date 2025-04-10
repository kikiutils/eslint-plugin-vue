# User Guide

## :cd: Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install --save-dev eslint eslint-plugin-vue
```

Via [yarn](https://yarnpkg.com/):

```bash
yarn add -D eslint eslint-plugin-vue vue-eslint-parser globals
```

::: tip Requirements

- ESLint: `^8.57.0 || ^9.0.0`
- Node.js: `^18.18.0 || ^20.9.0 || >=21.1.0`

:::

## :book: Usage

### Configuration (`eslint.config.js`)

Use `eslint.config.js` file to configure rules. This is the default in ESLint v9, but can be used starting from ESLint v8.57.0. See also: <https://eslint.org/docs/latest/use/configure/configuration-files-new>.

Example **eslint.config.js**:

```js
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  }
]
```

See [the rule list](../rules/index.md) to get the `configs` & `rules` that this plugin provides.

#### Bundle Configurations (`eslint.config.js`)

This plugin provides some predefined configs.
You can use the following configs by adding them to `eslint.config.js`.
(All flat configs in this plugin are provided as arrays, so spread syntax is required when combining them with other configs.)

- `*.configs["flat/base"]` ... Settings and rules to enable correct ESLint parsing.
- Configurations for using Vue.js 3.x:
  - `*.configs["flat/essential"]` ... `base`, plus rules to prevent errors or unintended behavior.
  - `*.configs["flat/strongly-recommended"]` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `*.configs["flat/recommended"]` ... Above, plus rules to enforce subjective community defaults to ensure consistency.
- Configurations for using Vue.js 2.x:
  - `*.configs["flat/vue2-essential"]` ... `base`, plus rules to prevent errors or unintended behavior.
  - `*.configs["flat/vue2-strongly-recommended"]` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `*.configs["flat/vue2-recommended"]` ... Above, plus rules to enforce subjective community defaults to ensure consistency

:::warning Reporting rules
By default, all rules from **base** and **essential** categories report ESLint errors. Other rules - because they're not covering potential bugs in the application - report warnings. What does it mean? By default - nothing, but if you want - you can set up a threshold and break the build after a certain amount of warnings, instead of any. More information [here](https://eslint.org/docs/user-guide/command-line-interface#handling-warnings).
:::

#### Specifying Globals (`eslint.config.js`)

Specify global objects depending on how you use Vue.js. More information on how to set globals can be found [here](https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables).

If you're writing an app that will only render on the browser, use `globals.browser`.

```js
// ...
import globals from 'globals'

export default [
  // ...
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
  // ...
]
```

If you're writing an app that is rendered both server-side and on the browser, use `globals.shared-node-browser`.

```js
// ...
import globals from 'globals'

export default [
  // ...
  {
    languageOptions: {
      globals: {
        ...globals['shared-node-browser']
      }
    }
  }
  // ...
]
```

#### Example configuration with [typescript-eslint](https://typescript-eslint.io/) and [Prettier](https://prettier.io/)

```bash
npm install --save-dev eslint eslint-config-prettier eslint-plugin-vue globals typescript-eslint
```

```ts
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      // your rules
    },
  },
  eslintConfigPrettier
);
```

### Configuration (`.eslintrc`)

Use `.eslintrc.*` file to configure rules in ESLint < v9. See also: <https://eslint.org/docs/latest/use/configure/>.

Example **.eslintrc.js**:

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
    // 'plugin:vue/vue2-recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
```

See [the rule list](../rules/index.md) to get the `extends` & `rules` that this plugin provides.

#### Bundle Configurations (`.eslintrc`)

This plugin provides some predefined configs.
You can use the following configs by adding them to `extends`.

- `"plugin:vue/base"` ... Settings and rules to enable correct ESLint parsing.
- Configurations for using Vue.js 3.x:
  - `"plugin:vue/essential"` ... `base`, plus rules to prevent errors or unintended behavior.
  - `"plugin:vue/strongly-recommended"` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `"plugin:vue/recommended"` ... Above, plus rules to enforce subjective community defaults to ensure consistency.
- Configurations for using Vue.js 2.x:
  - `"plugin:vue/vue2-essential"` ... `base`, plus rules to prevent errors or unintended behavior.
  - `"plugin:vue/vue2-strongly-recommended"` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `"plugin:vue/vue2-recommended"` ... Above, plus rules to enforce subjective community defaults to ensure consistency.

:::warning Reporting rules
By default, all rules from **base** and **essential** categories report ESLint errors. Other rules - because they're not covering potential bugs in the application - report warnings. What does it mean? By default - nothing, but if you want - you can set up a threshold and break the build after a certain amount of warnings, instead of any. More information [here](https://eslint.org/docs/user-guide/command-line-interface#handling-warnings).
:::

:::warning Status of Vue.js 3.x supports
This plugin supports the basic syntax of Vue.js 3.2, `<script setup>`, and CSS variable injection, but the ref sugar, an experimental feature of Vue.js 3.2, is not yet supported.  
If you have issues with these, please also refer to the [FAQ](#does-not-work-well-with-script-setup). If you can't find a solution, search for the issue and if the issue doesn't exist, open a new issue.
:::

#### Specifying Environments (`.eslintrc`)

Specify environments depending on how you use Vue.js. More information on how to set environments can be found [here](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-environments).

If you're writing an app that will only render on the browser, use `env.browser`.

```json
{
  "env": {
    "browser": true
  }
}
```

If you're writing an app that is rendered both server-side and on the browser, use `env.shared-node-browser`.

```json
{
  "env": {
    "shared-node-browser": true
  }
}
```

### Running ESLint from the command line

If you want to run `eslint` from the command line, ESLint will automatically check for the `.vue` extension if you use the config provided by the plugin.

Examples:

```bash
eslint src
```

::: tip
If you installed [@vue/cli-plugin-eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint), you should have the `lint` script added to your `package.json`. That means you can just run `yarn lint` or `npm run lint`.
:::

### How to use a custom parser?

If you want to use custom parsers such as [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) or [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser), you have to use the `parserOptions.parser` option instead of the `parser` option. Because this plugin requires [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser) to parse `.vue` files, this plugin doesn't work if you overwrite the `parser` option.

```diff
- "parser": "@typescript-eslint/parser",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  }
```

Full example:

::: code-group

```json [.eslintrc]
{
  "root": true,
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser"
  }
}
```

```js [eslint.config.js]
import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  }
)
```

:::

The `parserOptions.parser` option can also specify an object to specify multiple parsers. See [vue-eslint-parser README](https://github.com/vuejs/vue-eslint-parser#readme) for more details.

### How does ESLint detect components?

All component-related rules are applied to code that passes any of the following checks:

- `Vue.component()` expression
- `Vue.extend()` expression
- `Vue.mixin()` expression
- `app.component()` expression
- `app.mixin()` expression
- `createApp()` expression
- `defineComponent()` expression
- `export default {}` in `.vue` or `.jsx` file

However, if you want to take advantage of the rules in any of your custom objects that are Vue components, you might need to use the special comment `// @vue/component` that marks an object in the next line as a Vue component in any file, e.g.:

```js
// @vue/component
const CustomComponent = {
  name: 'custom-component',
  template: '<div></div>'
}
```

```js
Vue.component('AsyncComponent', (resolve, reject) => {
  setTimeout(() => {
    // @vue/component
    resolve({
      name: 'async-component',
      template: '<div></div>'
    })
  }, 500)
})
```

You can do this for [Vue class component](https://class-component.vuejs.org/) too:

```ts
// @vue/component
@Component({
  components: { Foo }
})
export default class Bar extends Vue {}
```

### Disabling rules via `<!-- eslint-disable -->`

You can use `<!-- eslint-disable -->`-like HTML comments in the `<template>` and in the block level of `.vue` files to disable a certain rule temporarily.

For example:

```vue
<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div a="1" b="2" c="3" d="4">
  </div>
</template>
```

If you want to disallow `eslint-disable` functionality in `<template>`, disable the [vue/comment-directive](../rules/comment-directive.md) rule.

### Parser Options

This plugin uses [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser).
For `parserOptions`, you can use the `vueFeatures` options of `vue-eslint-parser`.

```json
{
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "vueFeatures": {
      "filter": true,
      "interpolationAsNonHTML": false,
    }
  }
}
```

See the [`parserOptions.vueFeatures` documentation for `vue-eslint-parser`](https://github.com/vuejs/vue-eslint-parser#parseroptionsvuefeatures) for more details.

## :computer: Editor integrations

### Visual Studio Code

Use the [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension that Microsoft provides officially.

You have to configure the `eslint.validate` option of the extension to check `.vue` files, because the extension targets only `*.js` or `*.jsx` files by default.

Example **.vscode/settings.json**:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ]
}
```

If you use the `Vetur` plugin, set `"vetur.validation.template": false` to avoid default Vetur template validation. Check out [vetur documentation](https://vuejs.github.io/vetur/guide/linting-error.html#linting) for more info.

### Sublime Text

Use Package Control to install **SublimeLinter** and its ESLint extension **[SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint)**.

In the menu go to `Preferences > Package Settings > SublimeLinter > Settings` and paste in this:

```json
{
  "linters": {
    "eslint": {
      "selector": "text.html.vue, source.js - meta.attribute-with-value"
    }
  }
}
```

### Atom editor

Go into `Settings -> Packages -> linter-eslint`, under the option "List of scopes to run eslint on", add `text.html.vue`. You may need to restart Atom.

### IntelliJ IDEA / JetBrains WebStorm

In the **Settings/Preferences** dialog (`Cmd+,`/`Ctrl+Alt+S`), choose JavaScript under **Languages and Frameworks** and then choose **ESLint** under **Code Quality Tools**.
On the **ESLint page** that opens, select the _Enable_ checkbox.

If your ESLint configuration is updated (manually or from your version control), open it in the editor and choose **Apply ESLint Code Style Rules** in the context menu.

read more: [JetBrains - ESLint](https://www.jetbrains.com/help/idea/eslint.html)

## :question: FAQ

### What is the "Use the latest vue-eslint-parser" error?

Most `eslint-plugin-vue` rules require `vue-eslint-parser` to check `<template>` ASTs.

Make sure you have one of the following settings in your **.eslintrc**:

- `"extends": ["plugin:vue/recommended"]`
- `"extends": ["plugin:vue/base"]`

If you already use another parser (e.g. `"parser": "@typescript-eslint/parser"`), please move it into `parserOptions`, so it doesn't collide with the `vue-eslint-parser` used by this plugin's configuration:

```diff
- "parser": "@typescript-eslint/parser",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "@typescript-eslint/parser",
      "ecmaVersion": 2020,
      "sourceType": "module"
  }
```

See also: "[How to use a custom parser?](#how-to-use-a-custom-parser)" section.

### Why doesn't it work on .vue files?

1. Make sure you don't have `eslint-plugin-html` in your config. The `eslint-plugin-html` extracts the content from `<script>` tags, but `eslint-plugin-vue` requires `<script>` tags and `<template>` tags in order to distinguish template and script in single file components.

  ```diff
    "plugins": [
      "vue",
  -   "html"
    ]
  ```

1. Make sure your tool is set to lint `.vue` files.

    - Make sure you are using the shareable config provided by `eslint-plugin-vue`.
    - If you are having issues with configuring editor, please read [editor integrations](#editor-integrations)

### Conflict with [Prettier]

Use [eslint-config-prettier] for [Prettier] not to conflict with the shareable config provided by this plugin.

Example **.eslintrc.js**:

```js
module.exports = {
  // ...
  extends: [
    // ...
    // 'eslint:recommended',
    // ...
    'plugin:vue/recommended',
    // ...
    'prettier'
    // Make sure "prettier" is the last element in this list.
  ],
  // ...
}
```

If Prettier conflicts with a rule you have set, [turn off that rule][prettier-linters]. For example, if you have `vue/html-indent` configured as `error` in `rules`, but it conflicts with Prettier, remove that line:

```diff
module.exports = {
  // ...
  rules: {
    // ...
-    "vue/html-indent": "error",
    // ...
  },
  // ...
}
```

[prettier]: https://prettier.io/
[prettier-linters]: https://prettier.io/docs/en/integrating-with-linters.html
[eslint-config-prettier]: https://github.com/prettier/eslint-config-prettier

### Using JSX

If you are using JSX, you need to enable JSX in your ESLint configuration.

```diff
  "parserOptions": {
      "ecmaVersion": 2020,
      "ecmaFeatures": {
+         "jsx": true
      }
  }
```

See also [ESLint - Specifying Parser Options](https://eslint.org/docs/user-guide/configuring#specifying-parser-options).

The same configuration is required when using JSX with TypeScript (TSX) in the `.vue` file.  
See also [here](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/parser/README.md#parseroptionsecmafeaturesjsx).  
Note that you cannot use angle-bracket type assertion style (`var x = <foo>bar;`) when using `jsx: true`.

### Trouble with Visual Studio Code

- Turning off the rule in the ESLint configuration file does not ignore the warning.
- Using the `<!-- eslint-disable -->` comment does not suppress warnings.
- Duplicate warnings are displayed.
- Used `@babel/eslint-parser`, but the template still show `vue/no-parsing-error` warnings.

You need to turn off Vetur's template validation by adding `vetur.validation.template: false` to your `.vscode/settings.json`.

See also: "[Visual Studio Code](#editor-integrations)" section and [Vetur - Linting](https://vuejs.github.io/vetur/guide/linting-error.html#linting).

### Does not work well with `<script setup>`

#### The variables used in the `<template>` are warned by `no-unused-vars` rule

You need to use [vue-eslint-parser] v9.0.0 or later.

Previously you had to use the [vue/script-setup-uses-vars](../rules/script-setup-uses-vars.md) rule, this is no longer needed.

#### Compiler macros such as `defineProps` and `defineEmits` generate `no-undef` warnings

You need to use [vue-eslint-parser] v9.0.0 or later.

Previously you had to use the `vue/setup-compiler-macros` environment, this is no longer needed.

### Auto Imports Support

In [Nuxt 3](https://nuxt.com/) or with [`unplugin-auto-import`](https://github.com/unplugin/unplugin-auto-import), Vue APIs can be auto imported. To make rules like [`vue/no-ref-as-operand`](/rules/no-ref-as-operand.html) or [`vue/no-watch-after-await`](/rules/no-watch-after-await.html) work correctly with them, you can specify them in ESLint's [`globals`](https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-global-variables) options:

::: code-group

```json [.eslintrc]
{
  "globals": {
    "ref": "readonly",
    "computed": "readonly",
    "watch": "readonly",
    "watchEffect": "readonly",
    // ...more APIs
  }
}
```

```js [eslint.config.js]
export default [
  {
    languageOptions: {
      globals: {
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        // ...more APIs
      }
    }
  }
]
```

:::
