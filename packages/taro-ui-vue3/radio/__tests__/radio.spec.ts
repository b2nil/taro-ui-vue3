import { mount } from '@vue/test-utils'
import AtRadio from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtRadio.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtRadio, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
