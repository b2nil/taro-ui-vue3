import { mount } from '@vue/test-utils'
import AtTabsPane from '../index'

const factory = (values = {}, slots = { default: [''] }) => {
  return mount(AtTabsPane as any, {
    slots,
    props: { ...values },
  })
}

describe('AtTabsPane Snap', () => {
  it('should render initial AtTabs', () => {
    const wrapper = factory({}, { default: ['test'] })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabsPane -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabsPane -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabsPane -- props index current', () => {
    const wrapper = factory({ index: 0, current: 0 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabsPane -- props index current', () => {
    const wrapper = factory({ index: 1, current: 0 })
    expect(wrapper.element).toMatchSnapshot()
  })
})
