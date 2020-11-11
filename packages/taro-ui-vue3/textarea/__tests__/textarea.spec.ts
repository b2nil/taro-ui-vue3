import { mount } from '@vue/test-utils'
import AtTextarea from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtTextarea.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtTextarea, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
