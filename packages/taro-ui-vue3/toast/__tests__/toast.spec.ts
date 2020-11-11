import { mount } from '@vue/test-utils'
import AtToast from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtToast.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtToast, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
