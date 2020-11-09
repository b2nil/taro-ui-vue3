import { mount } from '@vue/test-utils'
import AtCalendar from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtCalendar.vue', () => {
  test('render test', () => {
    const wrapper = mount(AtCalendar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
