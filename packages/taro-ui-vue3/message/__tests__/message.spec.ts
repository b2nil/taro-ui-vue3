import { mount } from '@vue/test-utils'
import AtMessage from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtMessage.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtMessage, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
