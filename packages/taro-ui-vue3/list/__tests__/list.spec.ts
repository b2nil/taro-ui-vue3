import { mount } from '@vue/test-utils'
import AtList from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtList.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtList, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
