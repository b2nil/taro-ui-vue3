import { mount } from '@vue/test-utils'
import AtDivider from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtDivider.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtDivider, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
