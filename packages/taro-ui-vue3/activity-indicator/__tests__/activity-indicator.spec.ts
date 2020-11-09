import { mount } from '@vue/test-utils'
import AtActivityIndicator from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtActivityIndicator.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtActivityIndicator, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
