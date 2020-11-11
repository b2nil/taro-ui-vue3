import { mount } from '@vue/test-utils'
import AtTabBar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtTabBar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtTabBar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
