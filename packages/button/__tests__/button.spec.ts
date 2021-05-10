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
    expect(
      wrapper
        .find('.at-button__wxbutton')
        .attributes('formtype')
    ).toBe('submit')
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
  it('AtButton should trigger onClick event', async () => {
    const onClick = jest.fn()
    const wrapper = factory({
      onClick: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('AtButton should trigger [Vue warn] message if onTap is used instead of onClick', async () => {
    const onClick = jest.fn()
    const wrapper = factory({
      onTap: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    // expect(onClick).not.toBeCalled()
    expect(
      '[Vue warn]: AtButton 绑定的点击事件应为 `click`， 而非 `tap`。'
    ).toHaveBeenTipped()
  })

  it('AtButton should not trigger onClick event when disabled', async () => {
    const onClick = jest.fn()
    const wrapper = factory({
      disabled: true,
      onClick: onClick,
    })
    await wrapper.find('.at-button').trigger('tap')
    expect(onClick).not.toBeCalled()
  })

  it('AtButton should not trigger onClick event if handler not passed', async () => {
    const onClick = jest.fn()
    const wrapper = factory()
    await wrapper.find('.at-button').trigger('tap')
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

    it('should trigger onGetUserInfo when openType == getUserInfo', async () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        openType: 'getUserInfo',
        onGetUserInfo: onGetUserInfo
      })
      await wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).toBeCalled()
      expect(
        '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
      ).toHaveBeenTipped()
    })

    it('should not trigger onGetUserInfo when openType != getUserInfo', async () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        onGetUserInfo: onGetUserInfo
      })
      await wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).not.toBeCalled()
      expect(
        '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
      ).not.toHaveBeenTipped()
    })

    it('should not trigger onGetUserInfo if eventHandler not passed', async () => {
      const onGetUserInfo = jest.fn()
      const wrapper = factory({
        openType: 'getUserInfo'
      })
      await wrapper.find('.at-button__wxbutton').trigger('getuserinfo')
      expect(onGetUserInfo).not.toBeCalled()
      expect(
        '[Vue warn]: 2021 年 4 月 13 日后发布的新版本小程序，'
      ).toHaveBeenTipped()
    })

    it('should trigger onContact when openType == contact', async () => {
      const onContact = jest.fn()
      const wrapper = factory({
        openType: 'contact',
        onContact: onContact
      })
      await wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).toBeCalled()
    })

    it('should not trigger onContact if eventHandler not passed', async () => {
      const onContact = jest.fn()
      const wrapper = factory({
        openType: 'contact'
      })
      await wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).not.toBeCalled()
    })

    it('should not trigger onContact when openType != contact', async () => {
      const onContact = jest.fn()
      const wrapper = factory({
        onContact: onContact
      })
      await wrapper.find('.at-button__wxbutton').trigger('contact')
      expect(onContact).not.toBeCalled()
    })

    it('should trigger onOpenSetting when openType == openSetting', async () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        openType: 'openSetting',
        onOpenSetting: onOpenSetting
      })
      await wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).toBeCalled()
    })

    it('should not trigger onOpenSetting if eventHandler not passed', async () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        openType: 'openSetting'
      })
      await wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).not.toBeCalled()
    })

    it('should not trigger onOpenSetting when openType != openSetting', async () => {
      const onOpenSetting = jest.fn()
      const wrapper = factory({
        onOpenSetting: onOpenSetting
      })
      await wrapper.find('.at-button__wxbutton').trigger('opensetting')
      expect(onOpenSetting).not.toBeCalled()
    })

    it('should trigger onGetPhoneNumber when openType == getPhoneNumber', async () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        openType: 'getPhoneNumber',
        onGetPhoneNumber: onGetPhoneNumber
      })
      await wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).toBeCalled()
    })

    it('should trigger onGetPhoneNumber if eventHandler not passed', async () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        openType: 'getPhoneNumber'
      })
      await wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).not.toBeCalled()
    })

    it('should not trigger onGetPhoneNumber when openType != getPhoneNumber', async () => {
      const onGetPhoneNumber = jest.fn()
      const wrapper = factory({
        onGetPhoneNumber: onGetPhoneNumber
      })
      await wrapper.find('.at-button__wxbutton').trigger('getphonenumber')
      expect(onGetPhoneNumber).not.toBeCalled()
    })

    it('should trigger onLaunchapp and onError when openType == launchApp', async () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        openType: 'launchApp',
        onLaunchapp: onLaunchapp,
        onError: onError
      })
      await wrapper.find('.at-button__wxbutton').trigger('launchapp')
      await wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).toBeCalled()
      expect(onError).toBeCalled()
    })

    it('should trigger onLaunchapp and onError if eventHandlers not passed', async () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        openType: 'launchApp'
      })
      await wrapper.find('.at-button__wxbutton').trigger('launchapp')
      await wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).not.toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('should not trigger onLaunchapp and onError when openType != launchApp', async () => {
      const onLaunchapp = jest.fn()
      const onError = jest.fn()
      const wrapper = factory({
        onLaunchapp: onLaunchapp,
        onError: onError
      })
      await wrapper.find('.at-button__wxbutton').trigger('launchapp')
      await wrapper.find('.at-button__wxbutton').trigger('error')
      expect(onLaunchapp).not.toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('should trigger onGetAuthorize when openType == getAuthorize', async () => {
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
      await wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).toBeCalled()
    })

    it('should not trigger onGetAuthorize when openType != getAuthorize', async () => {
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
      await wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).not.toBeCalled()
    })

    it('should not trigger onGetAuthorize if eventHandler not passed', async () => {
      getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
        return {
          isWEAPP: false,
          isALIPAY: true,
          isWEB: false
        }
      })
      const onGetAuthorize = jest.fn()
      const wrapper = factory({ openType: 'getAuthorize' })
      await wrapper.find('.at-button__wxbutton').trigger('getauthorize')
      expect(onGetAuthorize).not.toBeCalled()
    })

  })
})
