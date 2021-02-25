import { mountFactory, Slots } from '@/tests/helper'
import AtInput from '../index'

const factory = (props = {}, slots?: Slots) => {
  return mountFactory(AtInput, {}, props, slots)
}

describe('AtInput', () => {
  it('should render all nodes and match snapshot', async () => {
    const wrapper = factory({
      title: 'title',
      value: 'test',
      clear: true,
      error: true,
    }, {
      default: ['slot']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop class', async () => {
    const wrapper = factory({ class: 'test' })
    expect(
      wrapper
        .find('.at-input')
        .classes('test')
    ).toBeTruthy()
  })

  it('should render prop style', async () => {
    const wrapper = factory({ style: 'height: 9px;' })
    expect(
      wrapper
        .find('.at-input')
        .attributes('style')
    ).toBe('height: 9px;')
  })

  it.skip('should render prop value', async () => {
    const wrapper = factory({ value: 'value' })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes('value')
    ).toEqual('value')
  })

  it.each([
    'name',
    'placeholder',
    'placeholderStyle',
    'placeholderClass'
  ])('should render prop %s', async (propName) => {
    const wrapper = factory({ [`${propName}`]: propName })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes(propName.toLowerCase())
    ).toEqual(
      propName !== 'placeholderClass'
        ? propName
        : `placeholder ${propName}`
    )
  })

  it.each([
    'cursor',
    'maxLength',
    'cursorSpacing'
  ])('should render prop %s', async (propName) => {
    const wrapper = factory({ [`${propName}`]: 10 })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes(propName.toLowerCase())
    ).toEqual('10')
  })

  it.each([
    // 'focus',
    'autoFocus',
    'adjustPosition'
  ])('should render prop %s', async (propName) => {
    const wrapper = factory({ [`${propName}`]: true })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes(propName.toLowerCase())
    ).toEqual('true')
  })

  it.each([
    "send",
    "search",
    "next",
    "go",
    "done"
  ])('should render prop confirmType -- %s', async (confirmTypeOption) => {
    const wrapper = factory({ confirmType: confirmTypeOption })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes('confirmtype')
    ).toEqual(confirmTypeOption)
  })

  it('should render prop title', async () => {
    const wrapper = factory({ title: 'title' })
    const titleEl = wrapper.find('.at-input__title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toEqual('title')
    expect(titleEl.element).toMatchSnapshot()
  })

  it.each([
    "number", "password", "text", "phone", "idcard", "digit"
  ])('should render prop type -- %s', async (typeOption) => {
    const wrapper = factory({ type: typeOption })
    const inputEl = wrapper.find('.at-input__input')
    switch (typeOption) {
      case 'phone':
        expect(inputEl.attributes('type')).toEqual('number')
        expect(inputEl.attributes('maxlength')).toEqual('11')
        break
      case 'password':
        expect(inputEl.attributes('type')).toEqual('text')
        expect(inputEl.attributes('password')).toEqual('true')
        break
      default:
        expect(inputEl.attributes('type')).toEqual(typeOption)
        break
    }
  })

  it('should render prop border', async () => {
    const wrapper = factory()
    expect(wrapper.find('.at-input--without-border').exists()).toBeFalsy()

    await wrapper.setProps({ border: false })
    expect(wrapper.find('.at-input--without-border').exists()).toBeTruthy()
  })

  it('should render prop editable', async () => {
    const wrapper = factory({ editable: false })
    expect(wrapper.find('.at-input--disabled').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeFalsy()
  })

  it('should render prop disabled', async () => {
    const wrapper = factory()
    expect(wrapper.find('.at-input--disabled').exists()).toBeFalsy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeTruthy()

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.at-input--disabled').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeFalsy()
  })

  it('should render prop error', async () => {
    const wrapper = factory({ error: true })
    expect(wrapper.find('.at-input--error').exists()).toBeTruthy()

    const errorIconEl = wrapper.find('.at-input__icon')
    expect(errorIconEl.exists()).toBeTruthy()
    expect(errorIconEl.element).toMatchSnapshot()
  })

  it('should render clear icon', async () => {
    const wrapper = factory()
    expect(wrapper.find('.at-input__icon').exists()).toBeFalsy()

    await wrapper.setProps({ clear: true, value: 'value' })
    expect(wrapper.find('.at-input__icon').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__icon').element).toMatchSnapshot()
  })

  it('should render prop required when title exists', async () => {
    const wrapper = factory({ required: true })
    expect(wrapper.find('.at-input__title--required').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'title' })
    expect(wrapper.find('.at-input__title--required').exists()).toBeTruthy()
  })

  it('should render slot content', async () => {
    const wrapper = factory({}, { default: ['slot'] })
    const slotContainer = wrapper.find('.at-input__children')
    expect(slotContainer.exists()).toBeTruthy()
    expect(slotContainer.text()).toBe('slot')
  })

})

describe('AtInput Behavior', () => {
  it('should trigger onChange during input', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ onChange: onChange })
    await wrapper
      .find('.at-input__input')
      .trigger('input', { detail: { value: 'value' } })
    expect(onChange).toBeCalled()
  })

  it('should trigger onChange by clicking clear icon', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ onChange: onChange, clear: true, value: 'value' })
    await wrapper
      .find('.at-input .at-input__icon')
      .trigger('touchstart')
    expect(onChange).toBeCalled()
  })

  it('should trigger onUpdate:value during input if using v-model', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = factory({ value: 'test', 'onUpdate:value': onUpdateValue })
    await wrapper
      .find('.at-input__input')
      .trigger('input', { detail: { value: 'value' } })
    expect(onUpdateValue).toBeCalled()
  })

  it('should trigger onUpdate:value by clicking clear icon if using v-model', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = factory({
      clear: true,
      value: 'value',
      'onUpdate:value': onUpdateValue,
    })
    await wrapper
      .find('.at-input .at-input__icon')
      .trigger('touchstart')
    expect(onUpdateValue).toBeCalled()
  })

  it('should trigger onFocus', async () => {
    const onFocus = jest.fn()
    const wrapper = factory({ onFocus: onFocus })
    await wrapper
      .find('.at-input__input')
      .trigger('focus', { height: 30 })
    expect(onFocus).toBeCalled()
  })

  it('should trigger onBlur', async () => {
    const onBlur = jest.fn()
    const wrapper = factory({ onBlur: onBlur })
    await wrapper
      .find('.at-input__input')
      .trigger('blur', { value: 'value' })
    expect(onBlur).toBeCalled()
  })

  it('should trigger onKeyboardHeightChange', async () => {
    const onKeyboardHeightChange = jest.fn()
    const wrapper = factory({ onKeyboardHeightChange: onKeyboardHeightChange })
    await wrapper
      .find('.at-input__input')
      .trigger('keyboardheightchange', {
        height: 30,
        duration: 400
      })
    expect(onKeyboardHeightChange).toBeCalled()
  })

  it('should trigger onConfirm', async () => {
    const onConfirm = jest.fn()
    const wrapper = factory({ onConfirm: onConfirm })
    await wrapper
      .find('.at-input__input')
      .trigger('confirm', { detail: { value: 'value' } })
    expect(onConfirm).toBeCalled()
  })

  it('should trigger onClick when not editable', async () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, editable: false })
    await wrapper
      .find('.at-input .at-input__overlay')
      .trigger('tap')
    expect(onClick).toBeCalled()
  })


  it('should trigger onErrorClick when error is true', async () => {
    const onErrorClick = jest.fn()
    const wrapper = factory({
      error: true,
      value: 'value',
      onErrorClick: onErrorClick,
    })
    await wrapper
      .find('.at-input .at-input__icon')
      .trigger('touchstart')
    expect(onErrorClick).toBeCalled()
  })

  it.each([
    { editable: false },
    { disabled: true }
  ])(`should not trigger any input event handler when %o`, async (props) => {
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onChange = jest.fn()
    const onConfirm = jest.fn()
    const onKeyboardHeightChange = jest.fn()

    const wrapper = factory({
      ...props,
      onBlur,
      onFocus,
      onChange,
      onConfirm,
      onKeyboardHeightChange
    })

    const inputEl = wrapper.find('.at-input__input')
    const eventNames = [
      'onBlur',
      'onFocus',
      'onChange',
      'onConfirm',
      'onKeyboardHeightChange'
    ]

    eventNames.forEach(async (event) => {
      let eventName = event.substring(2).toLowerCase()
      await inputEl.trigger(eventName)
    })

    expect(onBlur).not.toBeCalled()
    expect(onFocus).not.toBeCalled()
    expect(onChange).not.toBeCalled()
    expect(onConfirm).not.toBeCalled()
    expect(onKeyboardHeightChange).not.toBeCalled()
  })
})
