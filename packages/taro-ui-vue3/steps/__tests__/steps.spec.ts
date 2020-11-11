import { mount } from '@vue/test-utils'
import AtSteps from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSteps.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSteps, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
