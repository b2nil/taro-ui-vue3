import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtInputNumber from '../index.vue'
import { ref } from 'vue'

const mountFn = genMountFn(AtInputNumber)

describe('AtInputNumber', () => {
  testPropClassAndStyle(mountFn)

  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    "number",
    "digit"
  ])('should render prop type -- %s', (typeOption) => {
    const wrapper = mountFn({ type: typeOption })
    expect(
      wrapper
        .find('.at-input-number__input')
        .attributes('type')
    ).toBe(typeOption)
  })

  it('should render prop width', () => {
    const wrapper = mountFn({ width: 200 })
    expect(
      wrapper
        .find('.at-input-number__input')
        .attributes('style')
    ).toBe(`width: ${pxTransformMockFn(200)};`)
  })

  it.each([
    "normal",
    "large"
  ])('should render prop size -- %s', (sizeOption) => {
    const wrapper = mountFn({ size: sizeOption })
    expect(
      wrapper
        .find('.at-input-number--lg')
        .exists()
    ).toBe(sizeOption === 'large')
  })

  it('should render prop disabled', () => {
    const wrapper = mountFn({ disabled: true })
    expect(
      wrapper
        .findAll('.at-input-number--disabled')
        .length
    ).toBe(2)
  })

  it('should disable minus button if input value <= min', () => {
    const wrapper = mountFn({
      min: 5,
      modelValue: 1
    })

    expect(
      wrapper
        .find('.at-input-number__btn:first-child')
        .classes('at-input-number--disabled')
    ).toBe(true)

    expect(
      wrapper
        .find('.at-input-number__btn:last-child')
        .classes('at-input-number--disabled')
    ).toBe(false)
  })

  it('should disable plus button if input value >= max', () => {
    const wrapper = mountFn({
      max: 100,
      modelValue: 110
    })

    expect(
      wrapper
        .find('.at-input-number__btn:last-child')
        .classes('at-input-number--disabled')
    ).toBe(true)

    expect(
      wrapper
        .find('.at-input-number__btn:first-child')
        .classes('at-input-number--disabled')
    ).toBe(false)
  })

  it('should increase value at given step', async () => {
    const original = ref(5)
    const wrapper = mountFn({
      modelValue: original.value,
      step: 5,
      'onUpdate:modelValue': (e) => original.value = e
    })

    await wrapper
      .find('.at-input-number__btn:last-child')
      .trigger('tap')

    expect(original.value).toBe(10)
  })

  it('should decrease value at given step', async () => {
    const original = ref(10)
    const wrapper = mountFn({
      modelValue: original.value,
      step: 5,
      'onUpdate:modelValue': (e) => original.value = e
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    expect(original.value).toBe(5)
  })
})

describe('AtNumberInput events', () => {

  it('should emit `update:modelValue`', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      modelValue: 2,
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('input')

    expect(onUpdateValue).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('should not emit `update:modelValue` when disabled', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      modelValue: 2,
      disabled: true,
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('input')

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(onUpdateValue).not.toBeCalled()
  })

  it('should emit blur', async () => {
    const onBlur = jest.fn()
    const wrapper = mountFn({ modelValue: 2, onBlur })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('blur')

    expect(wrapper.emitted()).toHaveProperty('blur')
    expect(onBlur).toBeCalled()
  })

  it('should emit error-input when value after minus or plus is below min or over max', async () => {
    const onErrorInput = jest.fn()
    const wrapper = mountFn({
      modelValue: 2,
      step: 50,
      onErrorInput
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    await wrapper.setProps({ modelValue: 90 })
    await wrapper
      .find('.at-input-number__btn:last-child')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('error-input')

    expect(onErrorInput.mock.calls.length).toBe(2)
    expect(onErrorInput.mock.calls[0][0]).toEqual({
      type: 'LOW',
      errorValue: 0
    })
    expect(onErrorInput.mock.calls[1][0]).toEqual({
      type: 'OVER',
      errorValue: 100
    })
  })

  it('should emit error-input when initial value is below min or over max', async () => {
    const onErrorInput = jest.fn()
    const wrapper = mountFn({
      modelValue: -10,
      onErrorInput
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    await wrapper.setProps({ modelValue: 110 })
    await wrapper
      .find('.at-input-number__btn:last-child')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('error-input')
    expect(onErrorInput.mock.calls.length).toBe(4)
    expect(onErrorInput.mock.calls[0][0]).toEqual({
      type: 'LOW',
      errorValue: 0
    })
    expect(onErrorInput.mock.calls[1][0]).toEqual({
      type: 'LOW',
      errorValue: -1
    })
    expect(onErrorInput.mock.calls[2][0]).toEqual({
      type: 'OVER',
      errorValue: 100
    })
    expect(onErrorInput.mock.calls[3][0]).toEqual({
      type: 'OVER',
      errorValue: 101
    })
  })

  it('should emit error-input when disabled', async () => {
    const onErrorInput = jest.fn()
    const wrapper = mountFn({
      modelValue: 2,
      step: 1,
      disabled: true,
      onErrorInput
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('error-input')
    expect(onErrorInput).toHaveBeenCalledWith({
      type: 'DISABLED',
      errorValue: 1
    })
  })
})
