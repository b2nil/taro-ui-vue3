import { mount } from '@vue/test-utils'
import AtDrawer from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtDrawer.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtDrawer, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
