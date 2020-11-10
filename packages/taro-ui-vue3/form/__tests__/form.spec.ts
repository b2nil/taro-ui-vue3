import { mount } from '@vue/test-utils'
import AtForm from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtForm.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtForm, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
