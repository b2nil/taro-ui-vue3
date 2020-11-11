import { mount } from '@vue/test-utils'
import AtSegmentedControl from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSegmentedControl.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSegmentedControl, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
