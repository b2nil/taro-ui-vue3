import { mount } from '@vue/test-utils'
import AtSwitch from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSwitch.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSwitch, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
