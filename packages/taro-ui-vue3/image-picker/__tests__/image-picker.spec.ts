import { mount } from '@vue/test-utils'
import AtImagePicker from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtImagePicker.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtImagePicker, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
