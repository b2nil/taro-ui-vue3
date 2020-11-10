import { mount } from '@vue/test-utils'
import AtCard from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtCard.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtCard, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
