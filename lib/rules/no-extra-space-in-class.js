/**
 * @author kiki-kanri
 */

'use strict'

const { defineTemplateBodyVisitor } = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow extra spaces in class attributes',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/no-extra-space-in-class.html'
    },
    fixable: 'code',
    schema: [],
    messages: {
      extraSpaces: 'Class attribute contains extra spaces.'
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        if (
          node.key.name !== 'class' ||
          !node.value ||
          node.value.type !== 'VLiteral' ||
          typeof node.value.value !== 'string'
        )
          return

        const raw = node.value.value
        if (/^\s|\s$|\s{2,}/.test(raw)) {
          context.report({
            node,
            messageId: 'extraSpaces',
            fix(fixer) {
              const fixed = raw.trim().replace(/\s{2,}/g, ' ')
              return fixer.replaceText(node.value, `"${fixed}"`)
            }
          })
        }
      }
    })
  }
}
