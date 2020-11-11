import { mount } from '@vue/test-utils'
import AtSearchBar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSearchBar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSearchBar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
