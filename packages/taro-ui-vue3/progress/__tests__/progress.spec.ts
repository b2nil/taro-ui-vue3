import { mount } from '@vue/test-utils'
import AtProgress from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtProgress.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtProgress, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
