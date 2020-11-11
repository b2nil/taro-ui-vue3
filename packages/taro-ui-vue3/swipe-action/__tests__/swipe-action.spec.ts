import { mount } from '@vue/test-utils'
import AtSwipeAction from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSwipeAction.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSwipeAction, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
