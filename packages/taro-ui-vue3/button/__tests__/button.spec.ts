import { mount } from '@vue/test-utils'
import AtButton from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtButton.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtButton, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
