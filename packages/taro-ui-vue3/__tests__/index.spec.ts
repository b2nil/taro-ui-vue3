import { shallowMount } from '@vue/test-utils'
import { createUI } from '..'

describe('taro-ui-vue3', () => {
  describe('install', () => {
    it('should return install function', () => {
      const tuv3 = createUI()
      expect('install' in tuv3).toBe(true)
    })

    it('should install provided components', async () => {
      const Foo = {
        name: 'Foo',
        template: '<view />'
      }

      const tuv3 = createUI({ Foo })

      const testComp = {
        name: 'TestComponent',
        props: {},
        template: '<foo />'
      }

      const wrapper = shallowMount(testComp as any, {
        global: {
          plugins: [tuv3]
        }
      })

      expect(() => wrapper.getComponent({ name: 'foo' })).not.toThrowError()
      expect(() => wrapper.getComponent({ name: 'bar' })).toThrowError()
    })
  })
})