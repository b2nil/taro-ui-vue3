import {
  genMountFn,
  triggerTouchEvents
} from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import * as utils from '@taro-ui-vue3/utils/common'

import AtSwipeAction from '../index.vue'

const mountFn = genMountFn(AtSwipeAction)

const MAX_OFFSET_SIZE = 101

const OPTIONS = [
  {
    text: '取消',
    class: 'cancel',
    style: {
      backgroundColor: '#6190E8',
    },
  },
  {
    text: '确认',
    class: 'confirm',
    style: {
      backgroundColor: '#FF4949',
    },
  },
]

const DOM_INFO = {
  top: 1,
  bottom: 44, // top + height
  left: 0,
  right: 375, // left + width
  height: 43,
  width: 375,
}

const START_INFO = { clientX: 0, clientY: 0 }
const MOVE_INFO = {
  clientY: 0,
  clientX: -(MAX_OFFSET_SIZE - 1),
  pageX: DOM_INFO.width / 2,
  pageY: DOM_INFO.height / 2,
}

const SLOT = h('view', {
  class: "normal"
}, "AtSwipeAction 一般使用场景")

describe('SwipeAction', () => {

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop options', () => {
    const wrapper = mountFn({ options: OPTIONS }, {
      default: [SLOT]
    })

    expect(
      wrapper
        .findAll('.at-swipe-action__option')
        .length
    ).toBe(OPTIONS.length)

    expect(
      wrapper
        .find('.at-swipe-action__options')
        .element
    ).toMatchSnapshot()
  })
})

describe('SwipeAction events', () => {
  beforeEach(() => {
    jest.mock('@taro-ui-vue3/utils/common')
    jest.spyOn(utils, 'uuid').mockReturnValue('2020')

    jest
      .spyOn(utils, 'delayGetClientRect')
      .mockReturnValue(new Promise(resolve => {
        resolve([MOVE_INFO])
      }))

    jest
      .spyOn(utils, 'delayGetScrollOffset')
      .mockReturnValue(new Promise(resolve => {
        resolve([{
          id: '2020', // 节点的ID
          dataset: '', // 节点的dataset
          scrollLeft: 0, // 节点的水平滚动位置
          scrollTop: 1, // 节点的竖直滚动位置
        }])
      }))

    jest
      .spyOn(utils, 'delayQuerySelector')
      .mockReturnValue(new Promise(resolve => {
        resolve([{
          width: 30
        }])
      }))
  })

  it('should emit click, opened and closed', async () => {
    const onClick = jest.fn()
    const onOpened = jest.fn()
    const onClosed = jest.fn()
    const wrapper = mountFn({
      autoClose: true,
      options: OPTIONS,
      onClick,
      onOpened,
      onClosed
    }, {
      default: [SLOT]
    })

    await wrapper.setProps({ isOpened: true })

    const swipeActionEl = wrapper.find('.at-swipe-action')

    await triggerTouchEvents(swipeActionEl, START_INFO, MOVE_INFO)
    await wrapper
      .find('.at-swipe-action__option')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('opened')
    expect(onOpened).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('closed')
    expect(onClosed).toBeCalled()
  })

  it('should not emit opened and closed if disabled', async () => {
    const onOpened = jest.fn()
    const onClosed = jest.fn()
    const wrapper = mountFn({
      autoClose: true,
      options: OPTIONS,
      disabled: true,
      onOpened,
      onClosed
    }, {
      default: [SLOT]
    })

    const swipeActionEl = wrapper.find('.at-swipe-action')

    await triggerTouchEvents(swipeActionEl, START_INFO, MOVE_INFO)
    expect(wrapper.emitted()).not.toHaveProperty('opened')
    expect(wrapper.emitted()).not.toHaveProperty('closed')
    expect(onOpened).not.toBeCalled()
    expect(onClosed).not.toBeCalled()

  })
})
