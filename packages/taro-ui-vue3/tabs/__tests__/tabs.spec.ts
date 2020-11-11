import { mount } from '@vue/test-utils'
import AtTabs from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtTabs.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtTabs, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
