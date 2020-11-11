import { mount } from '@vue/test-utils'
import AtTag from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtTag.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtTag, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
