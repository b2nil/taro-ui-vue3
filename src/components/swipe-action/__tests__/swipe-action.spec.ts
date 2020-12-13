import { mount } from '@vue/test-utils'
import { h, VNode } from '@vue/runtime-core'

import AtSwipeAction from '../index'

const factory = (
  values = {},
  slots: { default: Array<VNode | string> } = { default: [''] }
) => {
  return mount(AtSwipeAction as any, {
    slots,
    props: { ...values },
  })
}

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

describe('SwipeAction Snap', () => {
  it('should render SwipeAction -- props options', () => {
    const wrapper = mount({
      render() {
        return (
          h(AtSwipeAction, {
            disabled: true,
            autoClose: true,
            options: OPTIONS,
            class: "swipe-action--test"
          }, {
            default: () => [
              h('view', { class: "normal" }, "AtSwipeAction 一般使用场景")
            ]
          })
        )
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render SwipeAction -- isOpened', () => {
    const wrapper = mount({
      render() {
        return (
          h(AtSwipeAction, {
            isOpened: true,
            disabled: true,
            autoClose: true,
            options: OPTIONS,
            class: "swipe-action--test"
          }, {
            default: () => [
              h('view', { class: "normal" }, "AtSwipeAction 一般使用场景")
            ]
          })
        )
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
