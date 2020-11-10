import { mount } from '@vue/test-utils'
import AtFlex from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtFlex.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtFlex, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
