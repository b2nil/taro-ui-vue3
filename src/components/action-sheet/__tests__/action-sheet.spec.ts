import { mountFactory, Slots } from '@/tests/helper'
import { h } from '@vue/runtime-core'
import AtActionSheet from '../index'
import AtActionSheetItem from '../body/item'

const factory = (
  values = {},
  slots: Slots = {
    default: []
  }
) => {
  return mountFactory(AtActionSheet, { AtActionSheetItem }, values, slots)
}

describe('ActionSheet Snap', () => {
  it('should render default ActionSheet', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened ActionSheet', () => {
    const wrapper = factory({
      isOpened: true,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened ActionSheet with slot contents', () => {
    const wrapper = factory({
      isOpened: true,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' }),
        h(AtActionSheetItem, null, { default: () => '按钮二' })
      ]
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened ActionSheet -- props cancelText', () => {
    const wrapper = factory({
      isOpened: true,
      cancelText: '取消',
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.at-action-sheet__footer').exists()).toBe(true)
  })

  it('should not render ActionSheetFooter without props cancelText', () => {
    const wrapper = factory({
      isOpened: true
    })
    expect(wrapper.find('.at-action-sheet__footer').exists()).toBe(false)
  })

  it('should render opened ActionSheet -- props title', () => {
    const wrapper = factory({
      isOpened: true,
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.at-action-sheet__header').exists()).toBe(true)
  })

  it('should not render ActionSheetHeader without props title', () => {
    const wrapper = factory({
      isOpened: true
    })
    expect(wrapper.find('.at-action-sheet__header').exists()).toBe(false)
  })

  it('should render opened ActionSheet with header, body and footer', () => {
    const wrapper = factory({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('ActionSheet events', () => {

  it.concurrent('should trigger onCancel & onClose events', async () => {
    const onCancel = jest.fn()
    const onClose = jest.fn()

    const wrapper = factory(
      {
        isOpened: true,
        cancelText: '取消',
        title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
        onCancel: onCancel,
        onClose: onClose,
      },
      {
        default: [
          h(AtActionSheetItem, null, { default: () => '按钮一' })
        ],
      }
    )

    wrapper.find('.at-action-sheet__footer').trigger('tap')
    wrapper.find('.at-action-sheet__overlay').trigger('tap')
    expect(onCancel).toBeCalled()
    expect(onClose).toBeCalled()
  })

  it.concurrent('should trigger onClose event if prop open changed to false', async () => {
    const onClose = jest.fn()

    const wrapper = factory(
      {
        isOpened: true,
        cancelText: '取消',
        title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
        onClose: onClose,
      },
      {
        default: [
          h(AtActionSheetItem, null, { default: () => '按钮一' })
        ],
      }
    )

    await wrapper.setProps({ isOpened: false })
    expect(onClose).toBeCalled()
  })

  it.concurrent('should trigger onClose event if prop open changed to true', async () => {
    const onClose = jest.fn()

    const wrapper = factory(
      {
        cancelText: '取消',
        title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
        onClose: onClose,
      },
      {
        default: [
          h(AtActionSheetItem, null, { default: () => '按钮一' })
        ],
      }
    )

    await wrapper.setProps({ isOpened: true })
    expect(onClose).not.toBeCalled()
  })

  it.concurrent('should trigger onClick event on AtActionSheetItem', async () => {
    const onClick = jest.fn()

    const wrapper = factory({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行'
    }, {
      default: [
        h(AtActionSheetItem, { onClick: onClick }, { default: () => '按钮一' }),
        h(AtActionSheetItem, null, { default: () => '按钮二' })
      ]
    })

    wrapper.findAll('.at-action-sheet__item').forEach(el => {
      el.trigger('tap')
    })
    expect(onClick.mock.calls.length).toBe(1)
  })

})
