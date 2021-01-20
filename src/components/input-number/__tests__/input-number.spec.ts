import { mountFactory, Slots } from '@/tests/helper'
import AtInputNumber from '../index'
import * as utils from '../../../utils/common'
import { ref } from 'vue'

const factory = (
  props = {},
  slots?: Slots
) => {
  return mountFactory(AtInputNumber, undefined, props, slots)
}

describe('AtInputNumber', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.skip('should render prop style', () => {
    const wrapper = factory({ style: 'color: red;' })
    expect(
      wrapper
        .find('.at-input-number')
        .attributes('style')
    ).toBe('color: red;')
  })

  it('should render prop class', () => {
    const wrapper = factory({ class: 'test' })
    expect(
      wrapper
        .find('.at-input-number')
        .classes('test')
    ).toBe(true)
  })

  it.each([
    "number",
    "digit"
  ])('should render prop type -- %s', (typeOption) => {
    const wrapper = factory({ type: typeOption })
    expect(
      wrapper
        .find('.at-input-number__input')
        .attributes('type')
    ).toBe(typeOption)
  })

  it('should render prop width', () => {
    jest.mock('../../../utils/common')
    const spy = jest
      .spyOn(utils, 'pxTransform')
      .mockImplementation((size: number, designWidth?: number) => {
        return Math.ceil((((size / 40) * 640) / 750) * 10000) / 10000 + 'rem'
      })

    const wrapper = factory({ width: 200 })
    expect(
      wrapper
        .find('.at-input-number__input')
        .attributes('style')
    ).toBe('width: 4.2667rem;')

    spy.mockRestore()
  })

  it.each([
    "normal",
    "large"
  ])('should render prop size -- %s', (sizeOption) => {
    const wrapper = factory({ size: sizeOption })
    expect(
      wrapper
        .find('.at-input-number--lg')
        .exists()
    ).toBe(sizeOption === 'large')
  })

  it('should render prop disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(
      wrapper
        .findAll('.at-input-number--disabled')
        .length
    ).toBe(2)
  })

  it('should disable minus button if input value <= min', () => {
    const wrapper = factory({
      min: 5,
      value: 1
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
    const wrapper = factory({
      max: 100,
      value: 110
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
    const wrapper = factory({
      value: original.value,
      step: 5,
      'onUpdate:value': (e) => original.value = e
    })

    await wrapper
      .find('.at-input-number__btn:last-child')
      .trigger('tap')

    expect(original.value).toBe(10)
  })

  it('should decrease value at given step', async () => {
    const original = ref(10)
    const wrapper = factory({
      value: original.value,
      step: 5,
      'onUpdate:value': (e) => original.value = e
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    expect(original.value).toBe(5)
  })
})

describe('AtNumberInput Behavior', () => {
  it('should trigger onChange', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ value: 2, onChange })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('input')

    expect(onChange).toBeCalled()
  })

  it('should not trigger onChange when disabled', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ value: 2, disabled: true, onChange })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('input')

    expect(onChange).not.toBeCalled()
  })

  it('should trigger `onUpdate:value` and emit `update:value` when disabled', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = factory({
      value: 2,
      disabled: true,
      'onUpdate:value': onUpdateValue
    })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('input')

    expect(onUpdateValue).not.toBeCalled()
    expect(wrapper.emitted()).not.toHaveProperty('update:value')
  })

  it('should trigger onBlur', async () => {
    const onBlur = jest.fn()
    const wrapper = factory({ value: 2, onBlur })

    await wrapper
      .find('.at-input-number .at-input-number__input')
      .trigger('blur')

    expect(onBlur).toBeCalled()
  })

  it('should trigger onErrorInput when value is below min or over max', async () => {
    const onErrorInput = jest.fn()
    const wrapper = factory({
      value: 2,
      step: 50,
      onErrorInput
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    await wrapper.setProps({ value: 90 })
    await wrapper
      .find('.at-input-number__btn:last-child')
      .trigger('tap')

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

  it('should trigger onErrorInput when disabled', async () => {
    const onErrorInput = jest.fn()
    const wrapper = factory({
      value: 2,
      step: 1,
      disabled: true,
      onErrorInput
    })

    await wrapper
      .find('.at-input-number__btn:first-child')
      .trigger('tap')

    expect(onErrorInput).toHaveBeenCalledWith({
      type: 'DISABLED',
      errorValue: 1
    })
  })
})
