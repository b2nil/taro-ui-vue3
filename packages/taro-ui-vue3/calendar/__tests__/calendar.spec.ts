import { mount } from '@vue/test-utils'
import AtCalendar from '../src/index.vue'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtCalendar, {
    slots,
    props: { ...values },
  })
}

describe('AtCalendar Snap', () => {
  it('render initial AtCalendar', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })
})
