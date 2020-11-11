import { mount } from '@vue/test-utils'
import AtSlider from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSlider.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSlider, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
