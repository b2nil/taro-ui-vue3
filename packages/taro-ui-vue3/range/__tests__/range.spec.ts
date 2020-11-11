import { mount } from '@vue/test-utils'
import AtRange from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtRange.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtRange, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
