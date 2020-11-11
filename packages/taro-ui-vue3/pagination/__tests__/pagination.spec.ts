import { mount } from '@vue/test-utils'
import AtPagination from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtPagination.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtPagination, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
