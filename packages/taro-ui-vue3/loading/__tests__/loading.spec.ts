import { mount } from '@vue/test-utils'
import AtLoading from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtLoading.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtLoading, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
