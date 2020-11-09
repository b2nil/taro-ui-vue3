import { mount } from '@vue/test-utils'
import AtAvatar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtAvatar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtAvatar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
