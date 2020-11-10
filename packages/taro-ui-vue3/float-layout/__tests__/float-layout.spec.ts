import { mount } from '@vue/test-utils'
import AtFloatLayout from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtFloatLayout.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtFloatLayout, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
