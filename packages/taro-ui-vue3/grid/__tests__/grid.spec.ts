import { mount } from '@vue/test-utils'
import AtGrid from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtGrid.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtGrid, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
