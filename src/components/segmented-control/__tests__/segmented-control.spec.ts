import { mount } from '@vue/test-utils'
import AtSegmentedControl from '../index'

const factory = (values = {}, slots = { default: [''] }) => {
  return mount(AtSegmentedControl as any, {
    slots,
    props: { ...values },
  })
}

describe('AtSegmentedControl', () => {
  const values = ['tab1', 'tab2', 'tab3']

  it('should render default AtSegmentedControl', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- values', () => {
    const wrapper = factory({ values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- current', () => {
    const wrapper = factory({ current: 2, values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- fontSize', () => {
    const wrapper = factory({ fontSize: '30', values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper = factory({ disabled: true, values: values })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- selectedColor', () => {
    const wrapper = factory({ selectedColor: '#fff', values: values })
    expect(wrapper.element).toMatchSnapshot()
  })
})
