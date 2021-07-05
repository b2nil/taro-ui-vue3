import { genMountFn, TARO_ENV } from '@taro-ui-vue3/test-utils/helper'
import { capitalize } from '@vue/shared'
import AtButton from '../index.vue'
import Taro from '@tarojs/taro'

const mountFn = genMountFn(AtButton)

describe('AtButton', () => {
  it.each([
    'weapp',
    'alipay',
    'h5'
  ])('should render %s button and match snapshot', async (platform: TARO_ENV) => {
    process.env.TARO_ENV = platform

    const wrapper = mountFn({}, { default: ['按钮'] })
    expect(
      wrapper
        .get('.at-button')
        .element
    ).toMatchSnapshot()

    process.env.TARO_ENV = 'h5'
  })

  it.each([
    'normal',
    'small'
  ])('should render prop size -- %s', async (size) => {
    const wrapper = mountFn({ size, loading: true })
    expect(
      wrapper
        .get('.at-button')
        .classes()
    ).toContain(`at-button--${size}`)

    expect(
      wrapper
        .findComponent('.at-loading')
        .props('size')
    ).toEqual(size === 'small' ? '30' : '0')

  })

  it.each([
    'primary',
    'secondary',
    ''
  ])('should render prop type -- %s', async (type) => {
    const wrapper = mountFn({ type, loading: true })
    const btnEL = wrapper.get('.at-button')

    if (type === '') {
      expect(
        btnEL.classes
      ).not.toContain(`at-button--${type}`)
    } else {
      expect(
        wrapper
          .get('.at-button')
          .classes()
      ).toContain(`at-button--${type}`)
    }

    expect(
      wrapper
        .findComponent('.at-loading')
        .props('color')
    ).toEqual(type === 'primary' ? '#fff' : '')
  })

  it.each([
    ['normal', 'size'],
    ['primary', 'type']
  ])('should warn validator check fail message and render %s %s as fallback', async (propValue, propName) => {
    const wrapper = mountFn({ [propName]: 'xsizeORtype' })

    expect(
      `[Vue warn]: Invalid prop: custom validator check failed for prop "${propName}".`
    ).toHaveBeenWarned()

    expect(
      wrapper
        .get('.at-button')
        .classes()
    ).toContain(`at-button--${propValue}`)
  })

  it.each([
    'circle',
    'disabled',
    'full',
    'loading'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn()
    const renamed = propName === 'loading' ? 'icon' : propName
    const expected = `at-button--${renamed}`
    expect(
      wrapper
        .get('.at-button')
        .classes()
    ).not.toContain(expected)

    await wrapper.setProps({ [propName]: true })
    expect(
      wrapper
        .get('.at-button')
        .classes()
    ).toContain(expected)
  })

  it.each([
    'submit',
    'reset'
  ])('should render prop formType -- %s', async (formType) => {
    const wrapper = mountFn({ formType })
    expect(
      wrapper
        .find('.at-button__wxbutton')
        .attributes('formtype')
    ).toBe(formType)
  })

  it.each([
    'weapp',
    'alipay',
    'h5',
  ])('should not render %s button element if disabled', async (platform: TARO_ENV) => {
    process.env.TARO_ENV = platform

    const wrapper = mountFn({ disabled: true })
    expect(
      wrapper.find('.at-button__wxbutton').exists()
    ).toBeFalsy()

    process.env.TARO_ENV = 'h5'
  })
})

describe('AtButton events', () => {
  it('should emit click event', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      onClick: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })

  it('should not emit click event if disabled', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      onClick: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(onClick).not.toBeCalled()
  })

  it('should trigger warn message if @tap is used instead of @click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      onTap: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    expect(
      '[Vue warn]: AtButton 绑定的点击事件应为 `click`， 而非 `tap`。'
    ).toHaveBeenWarned()
  })

  it('it should trigger submit', async () => {
    process.env.TARO_ENV = 'weapp'

    jest.mock('@tarojs/taro')
    const mockTrigger = jest
      .spyOn(Taro.eventCenter, "trigger")
      .mockImplementation(jest.fn())

    const wrapper = mountFn({ formType: "submit" })
    wrapper.find("form").trigger("submit")
    expect(mockTrigger).toBeCalled()

    mockTrigger.mockRestore()
    jest.unmock('@tarojs/taro')
    process.env.TARO_ENV = 'h5'
  })

  it('it should trigger reset', async () => {
    process.env.TARO_ENV = 'weapp'

    jest.mock('@tarojs/taro')
    const mockTrigger = jest
      .spyOn(Taro.eventCenter, "trigger")
      .mockImplementation(jest.fn())

    const wrapper = mountFn({ formType: "reset" })
    wrapper.find("form").trigger("reset")
    expect(mockTrigger).toBeCalled()

    mockTrigger.mockRestore()
    jest.unmock('@tarojs/taro')
    process.env.TARO_ENV = 'h5'
  })

  describe('weapp:\n', () => {
    beforeEach(() => {
      process.env.TARO_ENV = 'weapp'
    })

    afterEach(() => {
      process.env.TARO_ENV = 'h5'
    })

    it.each([
      ['getUserInfo', 'getUserInfo'],
      ['contact', 'contact'],
      ['openSetting', 'openSetting'],
      ['getPhoneNumber', 'getPhoneNumber'],
      ['launchapp', 'launchApp'],
      ['error', 'launchApp']
    ])('should emit %s when openType == %s', async (eventName, openType) => {
      const triggerName = `${eventName.toLowerCase()}`

      const mockFnN = jest.fn()
      const wrapper = mountFn({ [`on${capitalize(eventName)}`]: mockFnN })

      await wrapper.find('.at-button__wxbutton').trigger(triggerName)
      expect(wrapper.emitted()).not.toHaveProperty(eventName)
      expect(mockFnN).not.toBeCalled()
      if (eventName === 'getUserInfo') {
        expect(
          '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
        ).not.toHaveBeenWarned()
      }

      const mockFnY = jest.fn()
      await wrapper.setProps({
        openType,
        [`on${capitalize(eventName)}`]: mockFnY
      })
      await wrapper.find('.at-button__wxbutton').trigger(triggerName)
      expect(wrapper.emitted()).toHaveProperty(eventName)
      expect(mockFnY).toBeCalled()

      if (eventName === 'getUserInfo') {
        expect(
          '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
        ).toHaveBeenWarned()
      }
    })

  })

  describe('alipay:\n', () => {
    beforeEach(() => {
      process.env.TARO_ENV = 'alipay'
    })

    afterEach(() => {
      process.env.TARO_ENV = 'h5'
    })

    it.each([
      ['getAuthorize', 'getAuthorize']
    ])('should emit %s when openType == %s', async (eventName, openType) => {
      const triggerName = `${eventName.toLowerCase()}`

      const mockFnN = jest.fn()
      const wrapper = mountFn({ [`on${capitalize(eventName)}`]: mockFnN })

      await wrapper.find('.at-button__wxbutton').trigger(triggerName)
      expect(wrapper.emitted()).not.toHaveProperty(eventName)
      expect(mockFnN).not.toBeCalled()
      if (eventName === 'getUserInfo') {
        expect(
          '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
        ).not.toHaveBeenWarned()
      }

      const mockFnY = jest.fn()
      await wrapper.setProps({
        openType,
        [`on${capitalize(eventName)}`]: mockFnY
      })
      await wrapper.find('.at-button__wxbutton').trigger(triggerName)
      expect(wrapper.emitted()).toHaveProperty(eventName)
      expect(mockFnY).toBeCalled()

      if (eventName === 'getUserInfo') {
        expect(
          '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
        ).toHaveBeenWarned()
      }
    })
  })
})