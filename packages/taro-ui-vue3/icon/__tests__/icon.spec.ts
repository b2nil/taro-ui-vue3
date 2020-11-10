import { mount } from '@vue/test-utils'
import AtIcon from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtIcon.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtIcon, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
