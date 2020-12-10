import { mount } from '@vue/test-utils'
import AtRate from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtRate as any, {
    slots,
    props: { ...values },
  })
}

describe('AtRate Snap', () => {
  it('render initial AtRate', () => {
    const wrapper = factory({ isTest: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props size', () => {
    const wrapper = factory({ size: '10' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props value', () => {
    const wrapper = factory({ value: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props max', () => {
    const wrapper = factory({ max: 10 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtRate -- props margin', () => {
    const wrapper = factory({ margin: 10 })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtRate Event', () => {
  it('AtRate onChange Event', () => {
    const onChange = jest.fn()
    const wrapper = factory({ value: 2, onChange: onChange })
    wrapper.find('.at-rate__icon').trigger('tap')
    expect(onChange).toBeCalled()
  })
})
