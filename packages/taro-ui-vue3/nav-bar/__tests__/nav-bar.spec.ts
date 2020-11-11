import { mount } from '@vue/test-utils'
import AtNavBar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtNavBar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtNavBar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
