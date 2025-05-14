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
        ) {
          return
        }

        const raw = node.value.value

        const isMultiline = raw.includes('\n')
        let isValid = true

        if (isMultiline) {
          const lines = raw
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)

          isValid = lines.every((line) => !/\s{2,}/.test(line))
        } else {
          isValid = !/^\s|\s$|\s{2,}/.test(raw)
        }

        if (isValid) {
          return
        }

        context.report({
          node,
          messageId: 'extraSpaces',
          fix(fixer) {
            const fixed = isMultiline
              ? raw
                  .split('\n')
                  .map((line) => {
                    const match = line.match(/^(\s*)(.*?)(\s*)$/) // 加尾端空白抓取
                    const indent = match?.[1] || ''
                    const content = match?.[2] || ''
                    const trail = match?.[3] || ''
                    return indent + content.replace(/\s{2,}/g, ' ') + trail
                  })
                  .join('\n')
              : raw.trim().replace(/\s{2,}/g, ' ')

            return fixer.replaceText(node.value, `"${fixed}"`)
          }
        })
      }
    })
  }
}
