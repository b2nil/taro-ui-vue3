import { mount } from '@vue/test-utils'
import AtCountdown from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtCountdown.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtCountdown, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
