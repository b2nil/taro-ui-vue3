import { mount } from '@vue/test-utils'
import AtModal from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtModal.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtModal, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
