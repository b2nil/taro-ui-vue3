import { mount } from '@vue/test-utils'
import AtRate from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtRate.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtRate, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
