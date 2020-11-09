import { mount } from '@vue/test-utils'
import AtActionSheet from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtActionSheet.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtActionSheet, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
