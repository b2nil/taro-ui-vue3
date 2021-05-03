import { mount } from '@vue/test-utils'
import AtSlider from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtSlider as any, {
    slots,
    props: { ...values },
  })
}

describe('AtSlider', () => {
  it('should render default AtSlider', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- value', () => {
    const wrapper = factory({ value: 50 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- step', () => {
    const wrapper = factory({ step: 1 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- min', () => {
    const wrapper = factory({ min: 50 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- max', () => {
    const wrapper = factory({ max: 200 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- activeColor', () => {
    const wrapper = factory({ activeColor: 'red' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- backgroundColor', () => {
    const wrapper = factory({ backgroundColor: 'red' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- blockColor', () => {
    const wrapper = factory({ blockColor: 'red' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- blockSize', () => {
    const wrapper = factory({ blockSize: 24 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- showValue', () => {
    const wrapper = factory({ showValue: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtSlider Behavior', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()
    const wrapper = factory({ onChange: onChange })
    wrapper.find('.at-slider slider').trigger('change', { detail: { value: 50 } })
    expect(onChange).toBeCalled()
  })

  it('should trigger onChanging', () => {
    const onChanging = jest.fn()
    const wrapper = factory({ onChanging: onChanging })
    wrapper.find('.at-slider slider').trigger('changing', { detail: { value: 50 } })
    expect(onChanging).toBeCalled()
  })
})
