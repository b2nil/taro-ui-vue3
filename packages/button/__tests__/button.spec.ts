import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import AtButton from '../index'
import * as utils from '@taro-ui-vue3/utils/common'

const factory = (
  values = {},
  slots: Slots = { default: ['按钮'] }
) => {
  return mountFactory(AtButton, {}, values, slots)
}

describe('AtButton', () => {
  it('should render prop -- size(normal)', () => {
    const wrapper = factory({
      size: 'normal',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- size(small)', () => {
    const wrapper = factory({
      size: 'small',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- type(primary)', () => {
    const wrapper = factory({
      type: 'primary',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- type(secondary)', () => {
    const wrapper = factory({
      type: 'secondary',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- circle', () => {
    const wrapper = factory({
      circle: true,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- full', () => {
    const wrapper = factory({
      full: true,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- loading', async () => {
    const wrapper = factory({
      loading: true,
    })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.at-button__icon').exists()).toBe(false)
  })

  it('should render prop -- formType', async () => {
    const wrapper = factory({
      formType: 'submit',
    })
    expect(wrapper.find('.at-button__wxbutton').attributes('formtype')).toBe('submit')

    await wrapper.setProps({ formType: '' })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.at-button__wxbutton').attributes('formtype')).toBe('')
    })
  })

  describe('should render prop -- disabled', () => {
    beforeEach(() => {
      jest.mock('@taro-ui-vue3/utils/common')
    })

    it('should not render any Button element when disabled', () => {
      const wrapper = factory({
        disabled: true,
      })
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.at-button__wxbutton').exists()).toBe(false)
    })

    it('should render weapp Button', () => {
      const getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: true,
          isALIPAY: false,
          isWEB: false
        }
      })
      const wrapper = factory()
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('form > .at-button__wxbutton').exists()).toBe(true)

      getEnvs.mockClear()
    })

    it('should render web button', () => {
      const getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: false,
          isWEB: true
        }
      })
      const wrapper = factory()
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.at-button > .at-button__wxbutton').exists()).toBe(true)
      getEnvs.mockClear()
    })

    it('should render alipay Button', () => {
      const getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: true,
          isWEB: false
        }
      })
      const wrapper = factory()
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.at-button > .at-button__wxbutton').exists()).toBe(true)
      getEnvs.mockClear()
    })
  })
})

describe('AtButton Behavior', () => {
  it('AtButton should trigger onClick event', () => {
    const onClick = jest.fn()
    const wrapper = factory({
      onClick: onClick,
    })
    wrapper.find('.at-button').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('AtButton should not trigger onClick event when disabled', () => {
    const onClick = jest.fn()
    const wrapper = factory({
      disabled: true,
      onClick: onClick,
    })
    wrapper.find('.at-button').trigger('tap')
    expect(onClick).not.toBeCalled()
  })

  it('AtButton should not trigger onClick event if handler not passed', () => {
    const onClick = jest.fn()
    const wrapper = factory()
    wrapper.find('.at-button').trigger('tap')
    expect(onClick).not.toBeCalled()
  })

  describe('AtButton should trigger Taro button events', () => {
    let getEnvs
    beforeEach(() => {
      jest.mock('@taro-ui-vue3/utils/common')
      getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: true,
          isALIPAY: false,
          isWEB: false
        }
      })
    })

    afterEach(() => {
      getEnvs.mockClear()
    })

    it('should trigger onGetUserInfo when openType == getUserInfo', () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        openType: 'getUserInfo',
        onGetUserInfo: onGetUserInfo
      })
      wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).toBeCalled()
    })

    it('should not trigger onGetUserInfo when openType != getUserInfo', () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        onGetUserInfo: onGetUserInfo
      })
      wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).not.toBeCalled()
    })

    it('should not trigger onGetUserInfo if eventHandler not passed', () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        openType: 'getUserInfo'
      })
      wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).not.toBeCalled()
    })

    it('should trigger onContact when openType == contact', () => {
      const onContact = jest.fn()
      const wrapper = factory({
        openType: 'contact',
        onContact: onContact
      })
      wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).toBeCalled()
    })

    it('should not trigger onContact if eventHandler not passed', () => {
      const onContact = jest.fn()
      const wrapper = factory({
        openType: 'contact'
      })
      wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).not.toBeCalled()
    })

    it('should not trigger onContact when openType != contact', () => {
      const onContact = jest.fn()
      const wrapper = factory({
        onContact: onContact
      })
      wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).not.toBeCalled()
    })

    it('should trigger onOpenSetting when openType == openSetting', () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        openType: 'openSetting',
        onOpenSetting: onOpenSetting
      })
      wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).toBeCalled()
    })

    it('should not trigger onOpenSetting if eventHandler not passed', () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        openType: 'openSetting'
      })
      wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).not.toBeCalled()
    })

    it('should not trigger onOpenSetting when openType != openSetting', () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        onOpenSetting: onOpenSetting
      })
      wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).not.toBeCalled()
    })

    it('should trigger onGetPhoneNumber when openType == getPhoneNumber', () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        openType: 'getPhoneNumber',
        onGetPhoneNumber: onGetPhoneNumber
      })
      wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).toBeCalled()
    })

    it('should trigger onGetPhoneNumber if eventHandler not passed', () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        openType: 'getPhoneNumber'
      })
      wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).not.toBeCalled()
    })

    it('should not trigger onGetPhoneNumber when openType != getPhoneNumber', () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        onGetPhoneNumber: onGetPhoneNumber
      })
      wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).not.toBeCalled()
    })

    it('should trigger onLaunchapp and onError when openType == launchApp', () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        openType: 'launchApp',
        onLaunchapp: onLaunchapp,
        onError: onError
      })
      wrapper.find('.at-button__wxbutton').trigger('launchapp')
      wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).toBeCalled()
      expect(onError).toBeCalled()
    })

    it('should trigger onLaunchapp and onError if eventHandlers not passed', () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        openType: 'launchApp'
      })
      wrapper.find('.at-button__wxbutton').trigger('launchapp')
      wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).not.toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('should not trigger onLaunchapp and onError when openType != launchApp', () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        onLaunchapp: onLaunchapp,
        onError: onError
      })
      wrapper.find('.at-button__wxbutton').trigger('launchapp')
      wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).not.toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('should trigger onGetAuthorize when openType == getAuthorize', () => {
      getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: true,
          isWEB: false
        }
      })
      const onGetAuthorize = jest.fn()
      const wrapper = factory({
        openType: 'getAuthorize',
        onGetAuthorize: onGetAuthorize
      })
      wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).toBeCalled()
    })

    it('should not trigger onGetAuthorize when openType != getAuthorize', () => {
      getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: true,
          isWEB: false
        }
      })
      const onGetAuthorize = jest.fn()
      const wrapper = factory({
        onGetAuthorize: onGetAuthorize
      })
      wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).not.toBeCalled()
    })

    it('should not trigger onGetAuthorize if eventHandler not passed', () => {
      getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: true,
          isWEB: false
        }
      })
      const onGetAuthorize = jest.fn()
      const wrapper = factory({ openType: 'getAuthorize' })
      wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).not.toBeCalled()
    })

  })
})
