'use strict'

const RuleTester = require('../../eslint-compat').RuleTester
const rule = require('../../../lib/rules/no-deprecated-slot-attribute.js')

const tester = new RuleTester({
  languageOptions: { parser: require('vue-eslint-parser'), ecmaVersion: 2015 }
})

tester.run('no-deprecated-slot-attribute', rule, {
  valid: [
    `<template>
      <LinkList>
        <template v-slot:name><a /></template>
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <template #name><a /></template>
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <template v-slot="{a}"><a /></template>
      </LinkList>
    </template>`,
    `<template>
      <LinkList v-slot="{a}">
        <a />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <template #default="{a}"><a /></template>
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <template><a /></template>
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a />
      </LinkList>
    </template>`,
    {
      code: `<template>
      <LinkList>
        <one slot="one" />
        <two slot="two" />
        <my-component slot="my-component-slot" />
        <myComponent slot="myComponent-slot" />
        <MyComponent slot="MyComponent-slot" />
      </LinkList>
    </template>`,
      options: [{ ignore: ['one', 'two', 'my-component'] }]
    },
    {
      code: `<template>
      <LinkList>
        <one slot="one" />
        <two slot="two" />
        <my-component slot="my-component-slot" />
        <myComponent slot="myComponent-slot" />
        <MyComponent slot="MyComponent-slot" />
      </LinkList>
    </template>`,
      options: [{ ignore: ['/one/', '/^Two$/i', '/^my-.*/i'] }]
    },
    {
      code: `<template>
      <LinkList>
        <one slot="one" />
        <two slot="two" />
        <my-component slot="my-component-slot" />
        <myComponent slot="myComponent-slot" />
        <MyComponent slot="MyComponent-slot" />
      </LinkList>
    </template>`,
      options: [{ ignoreParents: ['LinkList'] }]
    },
    {
      code: `<template>
      <LinkList>
        <one slot="one" />
        <two slot="two" />
        <my-component slot="my-component-slot" />
        <myComponent slot="myComponent-slot" />
        <MyComponent slot="MyComponent-slot" />
      </LinkList>
    </template>`,
      options: [{ ignoreParents: ['/^Link/'] }]
    }
  ],
  invalid: [
    {
      code: `
      <template>
        <LinkList>
          <template slot ><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot ><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="name" ><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:name ><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="name" unknown slot-scope="{a}" ><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:name="{a}" unknown  ><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="name" scope="{a}"><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:name="{a}" ><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="nameFoo"><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:nameFoo><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="f o o" ><a /></template>
          <template slot="obj.prop" ><a /></template>
          <template slot="a/b" ><a /></template>
          <template slot="a=b" ><a /></template>
          <template slot="a>b" ><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 5,
          column: 21,
          endLine: 5,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 6,
          column: 21,
          endLine: 6,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 21,
          endLine: 7,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 8,
          column: 21,
          endLine: 8,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template v-bind:slot=name><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:[name]><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 32
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="slot.name"><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="  slotName  "><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:[slotName]><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="slot. name"><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="a>b?c:d"><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="  "><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot="  .error  "><a /></template>
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template :slot><a /></template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:[slot]><a /></template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 26
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a slot="name" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:name>\n<a  />\n</template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 14,
          endLine: 4,
          endColumn: 18
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a :slot="name" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:[name]>\n<a  />\n</template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 14,
          endLine: 4,
          endColumn: 19
        }
      ]
    },
    {
      code: `
      <template>
        <MyComponent>
          <template slot="foo-bar">
            <a/>
          </template>
        </MyComponent>
      </template>`,
      output: `
      <template>
        <MyComponent>
          <template v-slot:foo-bar>
            <a/>
          </template>
        </MyComponent>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <MyComponent>
          <template slot="foo_bar">
            <a/>
          </template>
        </MyComponent>
      </template>`,
      output: `
      <template>
        <MyComponent>
          <template v-slot:foo_bar>
            <a/>
          </template>
        </MyComponent>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <MyComponent>
          <template slot="123">
            <a/>
          </template>
        </MyComponent>
      </template>`,
      output: `
      <template>
        <MyComponent>
          <template v-slot:123>
            <a/>
          </template>
        </MyComponent>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        }
      ]
    },
    {
      // https://github.com/vuejs/eslint-plugin-vue/issues/1499
      code: `
      <template>
        <some-component>
          <template slot="some-slot">
            This works 1
          </template>

          <template v-if="true"> <!-- some arbitrary conditional -->
            <template slot="some-slot">
              This works 2
            </template>
          </template>
        </some-component>
      </template>`,
      output: `
      <template>
        <some-component>
          <template v-slot:some-slot>
            This works 1
          </template>

          <template v-if="true"> <!-- some arbitrary conditional -->
            <template slot="some-slot">
              This works 2
            </template>
          </template>
        </some-component>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 9,
          column: 23,
          endLine: 9,
          endColumn: 27
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template v-for="x in xs" slot="one">
            A
          </template>
          <template v-for="x in xs" :slot="x">
            B
          </template>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <template v-for="x in xs" slot="one">
            A
          </template>
          <template v-for="x in xs" v-slot:[x]>
            B
          </template>
        </my-component>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 37,
          endLine: 4,
          endColumn: 41
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 37,
          endLine: 7,
          endColumn: 42
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template slot="one">
            A
          </template>
          <template slot="one">
            B
          </template>
        </my-component>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 21,
          endLine: 4,
          endColumn: 25
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 21,
          endLine: 7,
          endColumn: 25
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template v-if="c" slot="one">
            A
          </template>
          <template v-else slot="one">
            B
          </template>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <template v-if="c" v-slot:one>
            A
          </template>
          <template v-else v-slot:one>
            B
          </template>
        </my-component>
      </template>`,
      errors: [
        '`slot` attributes are deprecated.',
        '`slot` attributes are deprecated.'
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template v-for="x in xs" :slot="x">
            A
          </template>
          <template v-for="x in xs" :slot="x">
            B
          </template>
        </my-component>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 37,
          endLine: 4,
          endColumn: 42
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 37,
          endLine: 7,
          endColumn: 42
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template v-for="x in ys" :slot="x">
            A
          </template>
          <template v-for="x in xs" :slot="x">
            B
          </template>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <template v-for="x in ys" v-slot:[x]>
            A
          </template>
          <template v-for="x in xs" v-slot:[x]>
            B
          </template>
        </my-component>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 37,
          endLine: 4,
          endColumn: 42
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 37,
          endLine: 7,
          endColumn: 42
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <template v-for="(x,y) in xs" :slot="x+y">
            A
          </template>
          <template v-for="x in xs" :slot="x">
            B
          </template>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <template v-for="(x,y) in xs" :slot="x+y">
            A
          </template>
          <template v-for="x in xs" v-slot:[x]>
            B
          </template>
        </my-component>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 41,
          endLine: 4,
          endColumn: 46
        },
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 37,
          endLine: 7,
          endColumn: 42
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <two slot="two">
            B
          </two>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <template v-slot:two>\n<two >
            B
          </two>\n</template>
        </my-component>
      </template>`,
      options: [
        {
          ignore: ['one']
        }
      ],
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          column: 16,
          endLine: 7,
          endColumn: 20
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <two slot="two">
            B
          </two>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <template v-slot:two>\n<two >
            B
          </two>\n</template>
        </my-component>
      </template>`,
      options: [
        {
          ignore: ['/one/']
        }
      ],
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          endLine: 7,
          column: 16,
          endColumn: 20
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <two slot="two">
            B
          </two>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
          <template v-slot:two>\n<two >
            B
          </two>\n</template>
        </my-component>
      </template>`,
      options: [
        {
          ignore: ['/^one$/']
        }
      ],
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 7,
          endLine: 7,
          column: 16,
          endColumn: 20
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
        </my-component>
        <my-component2>
          <two slot="two">
            B
          </two>
        </my-component2>
      </template>`,
      output: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
        </my-component>
        <my-component2>
          <template v-slot:two>\n<two >
            B
          </two>\n</template>
        </my-component2>
      </template>`,
      options: [
        {
          ignoreParents: ['my-component']
        }
      ],
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 9,
          column: 16,
          endLine: 9,
          endColumn: 20
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
        </my-component>
        <my-component2>
          <two slot="two">
            B
          </two>
        </my-component2>
      </template>`,
      output: `
      <template>
        <my-component>
          <one slot="one">
            A
          </one>
        </my-component>
        <my-component2>
          <template v-slot:two>\n<two >
            B
          </two>\n</template>
        </my-component2>
      </template>`,
      options: [
        {
          ignoreParents: ['/component$/']
        }
      ],
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 9,
          column: 16,
          endLine: 9,
          endColumn: 20
        }
      ]
    },
    {
      code: `
      <template>
        <my-component>
          <slot
            v-for="slot in Object.keys($slots)"
            :slot="slot"
            :name="slot"
          ></slot>
        </my-component>
      </template>`,
      output: `
      <template>
        <my-component>
          <template v-for="slot in Object.keys($slots)" v-slot:[slot]>
<slot
            
            
            :name="slot"
          ></slot>
</template>
        </my-component>
      </template>`,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 6,
          column: 13,
          endLine: 6,
          endColumn: 18
        }
      ]
    },
    {
      code: `
      <template>
        <component :is="toggle ? 'my-component' : 'div'">
          <div slot="named">
            Passing in a named slot to a div worked with old syntax
            But not with new syntax
          </div>
        </component>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot` attributes are deprecated.',
          line: 4,
          column: 16,
          endLine: 4,
          endColumn: 20
        }
      ]
    }
  ]
})
