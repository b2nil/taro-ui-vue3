import { mount } from '@vue/test-utils'
import AtInputNumber from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtInputNumber as any, {
    slots,
    props: { ...values },
  })
}

describe('AtInputNumber', () => {
  it('should render default AtInputNumber', () => {
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

  it('should render prop -- type(number)', () => {
    const wrapper = factory({ type: 'number' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(digit)', () => {
    const wrapper = factory({ type: 'digit' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabledInput', () => {
    const wrapper = factory({ disabledInput: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- value', () => {
    const wrapper = factory({ value: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- width', () => {
    const wrapper = factory({ width: 200 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size', () => {
    const wrapper = factory({ size: 'large' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- step', () => {
    const wrapper = factory({ step: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtNumberInput Behavior', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()
    const wrapper = factory({ value: 2, onChange: onChange })
    wrapper.find('.at-input-number .at-input-number__input').trigger('input')
    expect(onChange).toBeCalled()
  })

  it('should trigger onBlur', () => {
    const onBlur = jest.fn()
    const wrapper = factory({ value: 2, onBlur: onBlur })
    wrapper.find('.at-input-number .at-input-number__input').trigger('blur')
    expect(onBlur).toBeCalled()
  })
})
