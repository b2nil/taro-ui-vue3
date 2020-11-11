import { mount } from '@vue/test-utils'
import AtNoticebar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtNoticebar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtNoticebar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
