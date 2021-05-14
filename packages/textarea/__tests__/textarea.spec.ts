import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import AtTextarea from '../index'

const factory = (
  props = {},
  slots?: Slots
) => {
  return mountFactory(AtTextarea, undefined, props, slots)
}

describe('AtTextarea', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop style', () => {
    const wrapper = factory({ style: 'color: red;' })
    expect(
      wrapper
        .find('.at-textarea')
        .attributes('style')
    ).toBe('color: red;')
  })

  it('should render prop class', () => {
    const wrapper = factory({ class: 'test' })
    expect(
      wrapper
        .find('.at-textarea')
        .classes('test')
    ).toBe(true)
  })

  it.each([
    'cursorSpacing', 'maxLength'
  ])('should render prop %s', (propName) => {
    const wrapper = factory({ [propName]: 300 })
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(propName.toLowerCase())
    ).toBe('300')

    if (propName === 'maxLength') {
      expect(
        wrapper
          .find('.at-textarea__counter')
          .text()
      ).toBe('0 / 300')
    }
  })

  it('should render maxLength + 500 if allows text to overflow', () => {
    const value = 'maxLength'.repeat(50)
    const wrapper = factory({
      value,
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
    const wrapper = factory({ [`${propName}`]: expected })
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(propName.toLowerCase())
    ).toBe(
      propName === 'placeholderClass'
        ? `placeholder ${expected}`
        : expected
    )
  })

  it.each([
    'autoFocus',
    'fixed',
    'showConfirmBar',
    // 'disabled',
    // 'focus'
  ])('should render prop %s', async (propName) => {
    const wrapper = factory({ [`${propName}`]: true })
    await wrapper.vm.$nextTick()
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes(propName.toLowerCase())
    ).toBe('true')
  })

  it('should render prop count', async () => {
    const wrapper = factory()

    const countNode = wrapper.find('.at-textarea__counter')
    expect(countNode.text()).toBe('0 / 200')
    expect(countNode.element).toMatchSnapshot()

    await wrapper.setProps({ count: false })
    expect(
      wrapper
        .find('.at-textarea__counter')
        .exists()
    ).toBeFalsy()
  })

  it('should render prop height', () => {
    const wrapper = factory({ height: 3000 })
    expect(
      wrapper
        .find('.at-textarea__textarea')
        .attributes('style')
    ).toBe('height: 64rem;')
  })
})

describe('AtTextArea Behaviour', () => {
  it.each([
    'onChange',
    'onFocus',
    'onBlur',
    'onConfirm',
    'onLinechange',
  ])('should trigger %s', async (eventName) => {
    const eventHandler = jest.fn()
    const wrapper = factory({ [eventName]: eventHandler })

    await wrapper
      .find('.at-textarea__textarea')
      .trigger(
        eventName === 'onChange'
          ? 'input'
          : eventName.substring(2).toLowerCase(),
        { value: 'test' }
      )

    expect(eventHandler).toBeCalled()
  })

  it('should emit update:value if using v-model', async () => {
    const eventHandler = jest.fn()
    const wrapper = factory({ ['onUpdate:value']: eventHandler })

    await wrapper
      .find('.at-textarea__textarea')
      .trigger('input', { value: 'test' })

    expect(eventHandler).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('update:value')
  })
})
