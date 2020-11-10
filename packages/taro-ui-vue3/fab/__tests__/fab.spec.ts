import { mount } from '@vue/test-utils'
import AtFab from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtFab.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtFab, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
