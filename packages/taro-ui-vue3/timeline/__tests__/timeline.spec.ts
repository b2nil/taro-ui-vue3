import { mount } from '@vue/test-utils'
import AtTimeline from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtTimeline.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtTimeline, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
