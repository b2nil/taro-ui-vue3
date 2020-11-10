import { mount } from '@vue/test-utils'
import AtCheckbox from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtCheckbox.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtCheckbox, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
