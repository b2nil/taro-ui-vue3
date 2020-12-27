import { mountFactory } from '@/tests/helper'
import AtInput from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mountFactory(AtInput, {}, values, slots)
}

describe('AtInput', () => {
  it('should render default AtInput', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'border:none;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- value', () => {
    const wrapper = factory({ value: 'value' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- name', () => {
    const wrapper = factory({ name: 'name' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- placeholder', () => {
    const wrapper = factory({ placeholder: 'placeholder' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- title', () => {
    const wrapper = factory({ title: 'title' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- maxLength', () => {
    const wrapper = factory({ maxLength: 10 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(number)', () => {
    const wrapper = factory({ type: 'number' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(password)', () => {
    const wrapper = factory({ type: 'password' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(idcard)', () => {
    const wrapper = factory({ type: 'idcard' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(digit)', () => {
    const wrapper = factory({ type: 'digit' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type(phone)', () => {
    const wrapper = factory({ type: 'phone' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- border', () => {
    const wrapper = factory({ border: false })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- editable', () => {
    const wrapper = factory({ editable: false })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- error', () => {
    const wrapper = factory({ error: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- clear', () => {
    const wrapper = factory({ clear: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- required', () => {
    const wrapper = factory({ required: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtInput Behavior', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()
    const wrapper = factory({ onChange: onChange })
    wrapper.find('.at-input__input').trigger('input', { detail: { value: 'value' } })
    expect(onChange).toBeCalled()
  })

  it('should trigger onFocus', () => {
    const onFocus = jest.fn()
    const wrapper = factory({ onFocus: onFocus })
    wrapper.find('.at-input__input').trigger('focus', { height: 30 })
    expect(onFocus).toBeCalled()
  })

  it('should trigger onConfirm', () => {
    const onConfirm = jest.fn()
    const wrapper = factory({ onConfirm: onConfirm })
    wrapper.find('.at-input__input').trigger('confirm', { detail: { value: 'value' } })
    expect(onConfirm).toBeCalled()
  })

  it('should trigger onClick', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, editable: false })
    wrapper.find('.at-input .at-input__overlay').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('should trigger onChange when prop clear is true', () => {
    const onChange = jest.fn()
    const wrapper = factory({ onChange: onChange, clear: true, value: 'value' })
    wrapper.find('.at-input .at-input__icon').trigger('touchstart')
    expect(onChange).toBeCalled()
  })

  it('should trigger onErrorClick when error is true', () => {
    const onErrorClick = jest.fn()
    const wrapper = factory({ onErrorClick: onErrorClick, error: true, value: 'value' })
    wrapper.find('.at-input .at-input__icon').trigger('touchstart')
    expect(onErrorClick).toBeCalled()
  })
})
