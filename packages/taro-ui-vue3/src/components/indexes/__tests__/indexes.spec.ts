import { mount } from '@vue/test-utils'
import AtIndexes from '../index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtIndexes.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtIndexes, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
