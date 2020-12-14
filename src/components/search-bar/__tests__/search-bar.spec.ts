import { mountFactory } from '@/tests/helper'
import AtSearchBar from '../index'

const onChange = jest.fn()
const factory = (values = {}, slots = { default: [] }) => {
  if (!values['v-model:value']) {
    values = Object.assign(values, { onChange: onChange })
  }
  return mountFactory(AtSearchBar, {}, values, slots)
}

describe('AtSearchBar Snap', () => {
  it('should render initial AtSearchBar', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props value', () => {
    const wrapper = factory({ value: 'value' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props placeholder', () => {
    const wrapper = factory({ placeholder: 'placeholder' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props maxLength', () => {
    const wrapper = factory({ maxLength: 120 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props fixed', () => {
    const wrapper = factory({ fixed: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props focus', () => {
    const wrapper = factory({ fucos: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props showActionButton', () => {
    const wrapper = factory({ showActionButton: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props actionName', () => {
    const wrapper = factory({ actionName: 'actionName' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtSearchBar -- props inputType number', () => {
    const wrapper = factory({ inputType: 'number' })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtSearchBar Events', () => {
  it('AtSearchBar onChange', () => {
    const wrapper = factory({ value: 'props.value' })
    wrapper.find('.at-search-bar .at-search-bar__input').trigger('input', { detail: { value: 'value' } })
    expect(onChange).toBeCalled()
  })

  it('AtSearchBar onFocus', () => {
    const onFocus = jest.fn()
    const wrapper = factory({ onFocus: onFocus })
    wrapper.find('.at-search-bar .at-search-bar__input').trigger('focus')
    expect(onFocus).toBeCalled()
  })

  it('AtSearchBar onBlur', () => {
    const onBlur = jest.fn()
    const wrapper = factory({ onBlur: onBlur })
    wrapper.find('.at-search-bar .at-search-bar__input').trigger('blur')
    expect(onBlur).toBeCalled()
  })

  it('AtSearchBar onConfirm', () => {
    const onConfirm = jest.fn()
    const wrapper = factory({ onConfirm: onConfirm })
    wrapper.find('.at-search-bar .at-search-bar__input').trigger('confirm')
    expect(onConfirm).toBeCalled()
  })

  it('AtSearchBar onActionClick', () => {
    const onActionClick = jest.fn()
    const wrapper = factory({ onActionClick: onActionClick })
    wrapper.find('.at-search-bar .at-search-bar__action').trigger('tap')
    expect(onActionClick).toBeCalled()
  })

  it('AtSearchBar onClear', async () => {
    const onClear = jest.fn()
    const wrapper = factory({ onClear: onClear })
    const clearElement = wrapper.find('.at-search-bar .at-search-bar__clear')
    expect(clearElement.exists()).toBe(false)

    await wrapper.setProps({ value: 'props.value is present now' })
    wrapper.vm.$nextTick()

    const clearElement2 = wrapper.find('.at-search-bar .at-search-bar__clear')
    expect(clearElement2.exists()).toBe(true)

    clearElement2.trigger('touchstart')
    expect(onClear).toBeCalled()
  })
})
