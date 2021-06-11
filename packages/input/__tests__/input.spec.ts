import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { hyphenate } from '@vue/shared'
import { ref } from 'vue'
import AtInput from '../index.vue'

const mountFn = genMountFn(AtInput)

describe('AtInput', () => {
  testPropClassAndStyle(mountFn)

  it('should render all nodes and match snapshot', async () => {
    const wrapper = mountFn({
      title: 'title',
      modelValue: 'test',
      clear: true,
      error: true,
    }, {
      default: ['slot']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it.skip('should render prop value', async () => {
    const wrapper = mountFn({ modelValue: 'value' })
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
    const wrapper = mountFn({ [`${propName}`]: propName })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes(hyphenate(propName))
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
    const wrapper = mountFn({ [`${propName}`]: 10 })
    const attrName = propName === 'cursorSpacing' ? hyphenate(propName) : propName.toLowerCase()

    expect(
      wrapper
        .find('.at-input__input')
        .attributes(attrName)
    ).toEqual('10')
  })

  it.each([
    // 'focus',
    'autoFocus',
    'adjustPosition'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn({ [`${propName}`]: true })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes(hyphenate(propName))
    ).toEqual('true')
  })

  it.each([
    "go",
    "send",
    "next",
    "done",
    "search"
  ])('should render prop confirmType -- %s', async (confirmTypeOption) => {
    const wrapper = mountFn({ confirmType: confirmTypeOption })
    expect(
      wrapper
        .find('.at-input__input')
        .attributes('confirm-type')
    ).toEqual(confirmTypeOption)
  })

  it('should render prop title', async () => {
    const wrapper = mountFn({ title: 'title' })

    const titleEl = wrapper.find('.at-input__title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toEqual('title')
  })

  it.each([
    "number", "password", "text", "phone", "idcard", "digit"
  ])('should render prop type -- %s', async (typeOption) => {
    const wrapper = mountFn({ type: typeOption })
    const inputEl = wrapper.find('.at-input__input')

    switch (typeOption) {
      case 'phone':
        expect(inputEl.attributes('type')).toEqual('number')
        expect(inputEl.attributes('maxlength')).toEqual('11')
        // expect(
        //   '[Vue warn]: Failed setting prop \"selectionStart\" on <input>: value -1 is invalid.'
        // ).toHaveBeenWarned()
        // expect(
        //   '[Vue warn]: Failed setting prop \"selectionEnd\" on <input>: value -1 is invalid.'
        // ).toHaveBeenWarned()
        break
      case 'password':
        expect(inputEl.attributes('type')).toEqual('text')
        expect(inputEl.attributes('password')).toEqual('true')
        break
      default:
        expect(inputEl.attributes('type')).toEqual(typeOption)
        if (typeOption === 'number') {
          // expect(
          //   '[Vue warn]: Failed setting prop \"selectionStart\" on <input>: value -1 is invalid.'
          // ).toHaveBeenWarned()
          // expect(
          //   '[Vue warn]: Failed setting prop \"selectionEnd\" on <input>: value -1 is invalid.'
          // ).toHaveBeenWarned()
        }
        break
    }
  })

  it('should render prop border', async () => {
    const wrapper = mountFn()
    expect(wrapper.find('.at-input--without-border').exists()).toBeFalsy()

    await wrapper.setProps({ border: false })
    expect(wrapper.find('.at-input--without-border').exists()).toBeTruthy()
  })

  it('should render prop editable', async () => {
    const wrapper = mountFn({ editable: false })
    expect(wrapper.find('.at-input--disabled').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeFalsy()
  })

  it('should render prop disabled', async () => {
    const wrapper = mountFn()
    expect(wrapper.find('.at-input--disabled').exists()).toBeFalsy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeTruthy()

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.at-input--disabled').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__overlay--hidden').exists()).toBeFalsy()
  })

  it('should render prop error', async () => {
    const wrapper = mountFn({ error: true })
    expect(wrapper.find('.at-input--error').exists()).toBeTruthy()

    const errorIconEl = wrapper.find('.at-input__icon')
    expect(errorIconEl.exists()).toBeTruthy()
  })

  it('should render clear icon', async () => {
    const wrapper = mountFn()
    expect(wrapper.find('.at-input__icon').exists()).toBeFalsy()

    await wrapper.setProps({ clear: true, modelValue: 'value' })
    expect(wrapper.find('.at-input__icon').exists()).toBeTruthy()
    expect(wrapper.find('.at-input__icon').element).toMatchSnapshot()
  })

  it('should render prop required when title exists', async () => {
    const wrapper = mountFn({ required: true })
    expect(wrapper.find('.at-input__title--required').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'title' })
    expect(wrapper.find('.at-input__title--required').exists()).toBeTruthy()
  })

  it('should render slot content', async () => {
    const wrapper = mountFn({}, { default: ['slot'] })
    const slotContainer = wrapper.find('.at-input__children')
    expect(slotContainer.exists()).toBeTruthy()
    expect(slotContainer.text()).toBe('slot')
  })

})

describe('AtInput events', () => {

  it('should emit update:modelValue during input', async () => {
    const modelValue = ref('test')
    const onUpdateValue = jest.fn((e) => {
      modelValue.value = e
    })
    const wrapper = mountFn({
      modelValue: modelValue.value,
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper
      .find('.at-input__input')
      .trigger('input', { detail: { value: 'value' } })

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(onUpdateValue).toBeCalled()
    expect(modelValue.value).toEqual('value')
  })

  it('should emit update:modelValue by clicking clear icon', async () => {
    const modelValue = ref('test')
    const onUpdateValue = jest.fn((e) => {
      modelValue.value = e
    })
    const wrapper = mountFn({
      clear: true,
      modelValue: modelValue.value,
      'onUpdate:modelValue': onUpdateValue,
    })

    await wrapper
      .find('.at-input .at-input__icon')
      .trigger('touchend')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(onUpdateValue).toBeCalled()
    expect(modelValue.value).toEqual('')
  })

  it('should emit focus', async () => {
    const onFocus = jest.fn()
    const wrapper = mountFn({ onFocus })

    await wrapper
      .find('.at-input__input')
      .trigger('focus', { height: 30 })

    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(onFocus).toBeCalled()
  })

  it('should emit blur', async () => {
    const onBlur = jest.fn()
    const wrapper = mountFn({ onBlur })

    await wrapper
      .find('.at-input__input')
      .trigger('blur', { value: 'value' })

    expect(wrapper.emitted()).toHaveProperty('blur')
    expect(onBlur).toBeCalled()
  })

  it('should emit keyboardHeightChange', async () => {
    const onKeyboardHeightChange = jest.fn()
    const wrapper = mountFn({ onKeyboardHeightChange })

    await wrapper
      .find('.at-input__input')
      .trigger('keyboardheightchange', {
        height: 30,
        duration: 400
      })

    expect(wrapper.emitted()).toHaveProperty('keyboard-height-change')
    expect(onKeyboardHeightChange).toBeCalled()
  })

  it('should emit confirm', async () => {
    const onConfirm = jest.fn()
    const wrapper = mountFn({ onConfirm })

    await wrapper
      .find('.at-input__input')
      .trigger('confirm', { detail: { value: 'value' } })

    expect(wrapper.emitted()).toHaveProperty('confirm')
    expect(onConfirm).toBeCalled()
  })

  it('should emit click when not editable', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ onClick, editable: false })

    await wrapper
      .find('.at-input .at-input__overlay')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })


  it('should emit error-click when error is true', async () => {
    const onErrorClick = jest.fn()
    const wrapper = mountFn({
      error: true,
      modelValue: 'value',
      onErrorClick: onErrorClick,
    })

    await wrapper
      .find('.at-input .at-input__icon')
      .trigger('touchend')

    expect(wrapper.emitted()).toHaveProperty('error-click')
    expect(onErrorClick).toBeCalled()
  })

  it.each([
    { editable: false },
    { disabled: true }
  ])(`should not emit any input event handler when %o`, async (props) => {
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onConfirm = jest.fn()
    const onKeyboardHeightChange = jest.fn()

    const wrapper = mountFn({
      ...props,
      onBlur,
      onFocus,
      onConfirm,
      onKeyboardHeightChange
    })

    const inputEl = wrapper.find('.at-input__input')
    const eventNames = {
      'blur': { handler: onBlur, emitted: 'blur' },
      'focus': { handler: onBlur, emitted: 'focus' },
      'confirm': { handler: onBlur, emitted: 'confirm' },
      'keyboardheightchange': { handler: onBlur, emitted: 'keyboard-height-change' }
    }

    for (const key of Object.keys(eventNames)) {
      await inputEl.trigger(key)
      expect(wrapper.emitted()).not.toHaveProperty(eventNames[key].emitted)
      expect(eventNames[key].handler).not.toBeCalled()
    }
  })
})

