import { mount } from '@vue/test-utils'
import AtCalendar from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtCalendar as any, {
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
