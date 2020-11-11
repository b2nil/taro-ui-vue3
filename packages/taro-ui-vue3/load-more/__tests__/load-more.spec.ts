import { mount } from '@vue/test-utils'
import AtLoadMore from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtLoadMore.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtLoadMore, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
