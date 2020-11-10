import { mount } from '@vue/test-utils'
import AtInput from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtInput.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtInput, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
