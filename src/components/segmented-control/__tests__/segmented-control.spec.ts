import { mount } from '@vue/test-utils'
import AtSegmentedControl from '../index'

const factory = (values = {}, slots = { default: [''] }) => {
  return mount(AtSegmentedControl as any, {
    slots,
    props: { ...values },
  })
}

describe('AtSegmentedControl Snap', () => {
  const values = ['tab1', 'tab2', 'tab3']

  it('should render initial AtSegmentedControl', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props values', () => {
    const wrapper = factory({ values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props current', () => {
    const wrapper = factory({ current: 2, values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props fontSize', () => {
    const wrapper = factory({ fontSize: '30', values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props disabled', () => {
    const wrapper = factory({ disabled: true, values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSegmentedControl -- props selectedColor', () => {
    const wrapper = factory({ selectedColor: '#fff', values: values })
    expect(wrapper.element).toMatchSnapshot()
  })
})
