import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtMessage from '../index.vue'
import Taro from '@tarojs/taro'

const mountFn = genMountFn(AtMessage)

describe('AtMessage', () => {
  testPropClassAndStyle(mountFn)

  it('should render default AtMessage', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
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

    const wrapper = mountFn(AtMessage)

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
