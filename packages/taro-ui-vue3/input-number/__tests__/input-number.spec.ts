import { mount } from '@vue/test-utils'
import AtInputNumber from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtInputNumber.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtInputNumber, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
