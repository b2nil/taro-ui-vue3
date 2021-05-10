import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import AtMessage from '../index'
import Taro from '@tarojs/taro'

const mountFn = (
  props = {},
  slots?: Slots
) => {
  return mountFactory(AtMessage, undefined, props, slots)
}

describe('AtMessage', () => {
  it('should render default AtMessage', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop class', () => {
    const wrapper = mountFn({ class: 'test' })
    expect(
      wrapper
        .find('.at-message')
        .classes()
    ).toContain('test')
  })

  it('should render prop style', () => {
    const wrapper = mountFn({ style: 'color: red;' })
    expect(
      wrapper
        .find('.at-message')
        .attributes('style')
    ).toEqual('color: red;')
  })
})

type MessageType = 'info' | 'success' | 'error' | 'warning'
describe('AtMessage behaviours', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.runOnlyPendingTimers()
  })
  it.each([
    'info',
    'success',
    'error',
    'warning'
  ])('should open message and render message type -- %s', async (messageType: MessageType) => {

    const wrapper = mountFactory(AtMessage)

    Taro.atMessage({
      message: '消息通知',
      type: messageType
    })

    await wrapper.vm.$nextTick()
    expect(
      wrapper
        .find('.at-message')
        .classes()
    ).toContain(`at-message--${messageType}`)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.unmount()
  })
})
