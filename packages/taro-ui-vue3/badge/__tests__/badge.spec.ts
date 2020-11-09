import { mount } from '@vue/test-utils'
import AtBadge from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtBadge.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtBadge, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
