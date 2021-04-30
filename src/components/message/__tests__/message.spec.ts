import { mountFactory, Slots } from '@/tests/helper'
import AtMessage from '../index'
import Taro from '@tarojs/taro'
import { h, defineComponent } from '@vue/runtime-core'

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
// Not working correctly yet
describe('AtMessage behaviours', () => {
  it.each([
    'info',
    'success',
    'error',
    'warning'
  ])('should open message and render message type -- %s', async (messageType: MessageType) => {

    const handleClick = jest.fn((type?: MessageType) => {
      Taro.atMessage({
        message: '消息通知',
        type
      })
    })

    const testComp = defineComponent({
      name: 'TestComp',
      setup() {

        return () => (
          h('view', null, {
            default: () => [
              h('button', {
                class: 'btn',
                onClick: handleClick(messageType)
              }, { default: () => '提示消息' }),

              h(AtMessage)
            ]
          })
        )
      }
    })

    const wrapper = mountFactory(testComp)
    await wrapper.find('.btn').trigger('click')
    wrapper.vm.$nextTick()

    expect(handleClick).toBeCalled()
    expect(
      wrapper
        .find('.at-message')
        .classes()
    ).toContain(`at-message--${messageType}`)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.unmount()
  })
})
