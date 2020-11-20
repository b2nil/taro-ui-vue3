import { mount } from '@vue/test-utils'
import AtVirtualScroll from '../index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtVirtualScroll.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtVirtualScroll, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
