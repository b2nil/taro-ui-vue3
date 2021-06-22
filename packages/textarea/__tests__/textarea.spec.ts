import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import { hyphenate, capitalize } from '@vue/shared'
import AtTextarea from '../index.vue'
import Taro from '@tarojs/taro'

Taro.pxTransform = pxTransformMockFn

const mountFn = genMountFn(AtTextarea)

describe('AtTextarea', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  testPropClassAndStyle(mountFn)

  it.each([
    'cursorSpacing', 'maxLength'
  ])('should render prop %s', (propName) => {
    const wrapper = mountFn({ [propName]: 300 })
    const attrName = propName === 'maxLength'
      ? propName.toLowerCase()
      : hyphenate(propName)

    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(attrName)
    ).toBe('300')

    if (propName === 'maxLength') {
      expect(
        wrapper
          .find('.at-textarea__counter')
          .text()
      ).toBe('0 / 300')
    }
  })

  it('should render maxLength + 500 more characters if allows text to overflow', () => {
    const value = 'maxLength'.repeat(50)
    const wrapper = mountFn({
      modelValue: value,
      maxLength: 300,
      textOverflowForbidden: false
    })

    expect(
      wrapper
        .find('.at-textarea--error')
        .exists()
    ).toBeTruthy()

    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes('maxlength')
    ).toBe('800')

    expect(
      wrapper
        .find('.at-textarea__counter')
        .text()
    ).toBe('450 / 300')
  })

  it.each([
    ['placeholder', 'test'],
    ['placeholderClass', 'test'],
    ['placeholderStyle', 'color: red;'],
  ])('should render prop %s', (propName, expected) => {
    const wrapper = mountFn({ [`${propName}`]: expected })
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(hyphenate(propName))
    ).toContain(expected)
  })

  it.each([
    'autoFocus',
    'fixed',
    'showConfirmBar',
    // 'disabled',
    // 'focus'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn({ [`${propName}`]: true })
    await wrapper.vm.$nextTick()
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(hyphenate(propName))
    ).toBe('true')
  })

  it('should render prop count', async () => {
    const wrapper = mountFn()

    const countNode = wrapper.find('.at-textarea__counter')
    expect(countNode.text()).toBe('0 / 200')

    await wrapper.setProps({ count: false })
    expect(
      wrapper
        .find('.at-textarea__counter')
        .exists()
    ).toBeFalsy()
  })

  it.skip('should render prop height', () => {
    const wrapper = mountFn({ height: 3000 })
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes('style')
    ).toBe(`height: ${pxTransformMockFn(3000)};`)
  })
})

describe('AtTextArea events', () => {
  it.each([
    'focus',
    'blur',
    'confirm',
    'linechange',
  ])('should emit %s', async (eventName) => {
    const eventHandler = jest.fn()
    const wrapper = mountFn({ [`on${capitalize(eventName)}`]: eventHandler })

    await wrapper
      .find('.at-textarea__textarea')
      .trigger(eventName, { value: 'test' })

    expect(wrapper.emitted()).toHaveProperty(eventName)
    expect(eventHandler).toBeCalled()
  })

  it('should emit update:modelValue if using v-model', async () => {
    const eventHandler = jest.fn()
    const wrapper = mountFn({
      'onUpdate:modelValue': eventHandler
    })

    await wrapper
      .find('.at-textarea__textarea')
      .trigger('input', { detail: { value: 'test' } })

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(eventHandler).toBeCalled()
  })
})
