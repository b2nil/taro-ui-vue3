import { mount } from '@vue/test-utils'
import AtCurtain from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtCurtain.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtCurtain, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
