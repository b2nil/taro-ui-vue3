import { mount } from '@vue/test-utils'
import AtSkeleton from '../index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtSkeleton.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtSkeleton, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
