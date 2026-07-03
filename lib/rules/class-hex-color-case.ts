/**
 * @fileoverview enforce lowercase hex colors in class names
 * @author kiki-kanri
 * See LICENSE file in root directory for full license.
 */
import utils from '../utils/index.js'

type ClassTextNode = Literal | TemplateElement | VLiteral

const HEX_COLOR_PATTERN =
  /#[\da-fA-F]{3}(?:[\da-fA-F](?:[\da-fA-F]{2}){0,2})?(?![\da-fA-F])/gu

const URL_FUNCTION_PATTERN = /url\s*\(/giu
const COLOR_UTILITY_PATTERN =
  /^(?:bg|text|border|border-[trblxyse]|decoration|divide|outline|ring|ring-offset|shadow|fill|stroke|caret|accent|placeholder|from|via|to|color)-/u

const COLOR_CSS_PROPERTY_PATTERN =
  /^(?:color|background(?:-color)?|border(?:-(?:block|inline)(?:-(?:start|end))?|-(?:top|right|bottom|left))?-color|outline-color|text-decoration-color|text-emphasis-color|caret-color|accent-color|fill|stroke|stop-color|flood-color|lighting-color|column-rule-color|box-shadow|text-shadow):/iu

function isInsideUrlFunction(text: string, index: number): boolean {
  const before = text.slice(0, index)
  let lastUrlFunctionEnd = -1

  for (const match of before.matchAll(URL_FUNCTION_PATTERN)) {
    lastUrlFunctionEnd = match.index + match[0].length
  }

  if (lastUrlFunctionEnd === -1) {
    return false
  }

  return !before.slice(lastUrlFunctionEnd).includes(')')
}

function findBaseClassStart(className: string): number {
  let bracketDepth = 0
  let baseStart = 0

  for (let index = 0; index < className.length; index++) {
    const char = className[index]
    if (char === '\\') {
      index++
      continue
    }

    if (char === '[') {
      bracketDepth++
      continue
    }

    if (char === ']') {
      bracketDepth = Math.max(bracketDepth - 1, 0)
      continue
    }

    if (char === ':' && bracketDepth === 0) {
      baseStart = index + 1
    }
  }

  return baseStart
}

function isColorClassBase(baseClassName: string): boolean {
  if (COLOR_UTILITY_PATTERN.test(baseClassName)) {
    return true
  }

  if (baseClassName.startsWith('[') && baseClassName.endsWith(']')) {
    return COLOR_CSS_PROPERTY_PATTERN.test(baseClassName.slice(1, -1))
  }

  return false
}

function normalizeColorClassName(rawClassName: string): string {
  const leadingWrapper = rawClassName.match(/^[}`'"]+/u)?.[0] ?? ''
  const className = rawClassName.slice(leadingWrapper.length)
  const baseStart = findBaseClassStart(className)
  const variants = className.slice(0, baseStart)
  const baseClassName = className.slice(baseStart)

  if (!isColorClassBase(baseClassName)) {
    return rawClassName
  }

  return (
    leadingWrapper +
    variants +
    baseClassName.replaceAll(HEX_COLOR_PATTERN, (hex, index) => {
      if (isInsideUrlFunction(baseClassName, index)) {
        return hex
      }

      return hex.toLowerCase()
    })
  )
}

function normalizeClassText(text: string): string {
  return text.replaceAll(/\S+/gu, (className) =>
    normalizeColorClassName(className)
  )
}

function* extractClassTextNodes(
  node: Expression,
  textOnly?: boolean
): IterableIterator<ClassTextNode> {
  if (node.type === 'Literal') {
    if (typeof node.value === 'string') {
      yield node
    }

    return
  }

  if (node.type === 'TemplateLiteral') {
    yield* node.quasis
    for (const expression of node.expressions) {
      yield* extractClassTextNodes(expression, true)
    }

    return
  }

  if (node.type === 'BinaryExpression') {
    if (node.operator !== '+') {
      return
    }

    yield* extractClassTextNodes(node.left, true)
    yield* extractClassTextNodes(node.right, true)
    return
  }

  if (node.type === 'ConditionalExpression') {
    yield* extractClassTextNodes(node.consequent, textOnly)
    yield* extractClassTextNodes(node.alternate, textOnly)
    return
  }

  if (node.type === 'LogicalExpression') {
    yield* extractClassTextNodes(node.right, textOnly)
    return
  }

  if (textOnly) {
    return
  }

  if (node.type === 'ObjectExpression') {
    for (const prop of node.properties) {
      if (prop.type !== 'Property') {
        continue
      }

      const classNames = utils.getStaticPropertyName(prop)
      if (!classNames) {
        continue
      }

      yield prop.key as ClassTextNode
    }

    return
  }

  if (node.type === 'ArrayExpression') {
    for (const element of node.elements) {
      if (element == null || element.type === 'SpreadElement') {
        continue
      }

      yield* extractClassTextNodes(element)
    }
  }
}

function* extractVBindObjectClassTextNodes(
  node: Expression
): IterableIterator<ClassTextNode> {
  if (node.type === 'ConditionalExpression') {
    yield* extractVBindObjectClassTextNodes(node.consequent)
    yield* extractVBindObjectClassTextNodes(node.alternate)
    return
  }

  if (node.type === 'LogicalExpression') {
    yield* extractVBindObjectClassTextNodes(node.right)
    return
  }

  if (node.type !== 'ObjectExpression') {
    return
  }

  for (const prop of node.properties) {
    if (prop.type !== 'Property') {
      continue
    }

    const propertyName = utils.getStaticPropertyName(prop)
    if (propertyName !== 'class') {
      continue
    }

    yield* extractClassTextNodes(prop.value as Expression)
  }
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce lowercase hex colors in class names',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/class-hex-color-case.html'
    },
    fixable: 'code',
    schema: [],
    messages: {
      expectedLowercase: 'Expected hex colors in class names to be lowercase.'
    }
  },

  create(context: RuleContext) {
    const sourceCode = context.sourceCode

    function reportNode(node: ClassTextNode) {
      const text = sourceCode.getText(node)
      const normalizedText = normalizeClassText(text)
      if (normalizedText === text) {
        return
      }

      context.report({
        node,
        messageId: 'expectedLowercase',
        fix: (fixer) => fixer.replaceText(node, normalizedText)
      })
    }

    return utils.defineTemplateBodyVisitor(context, {
      'VAttribute[directive=false][key.name="class"][value!=null]'(
        node: VAttribute & { value: VLiteral }
      ) {
        reportNode(node.value)
      },

      "VAttribute[directive=true][key.name.name='bind'][key.argument.name='class'] > VExpressionContainer.value"(
        node: VExpressionContainer
      ) {
        if (!node.expression) {
          return
        }

        for (const classTextNode of extractClassTextNodes(
          node.expression as Expression
        )) {
          reportNode(classTextNode)
        }
      },

      "VAttribute[directive=true][key.name.name='bind'][key.argument=null] > VExpressionContainer.value"(
        node: VExpressionContainer
      ) {
        if (!node.expression) {
          return
        }

        for (const classTextNode of extractVBindObjectClassTextNodes(
          node.expression as Expression
        )) {
          reportNode(classTextNode)
        }
      }
    })
  }
}
