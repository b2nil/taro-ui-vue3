import { h } from 'vue'
import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtActionSheet from '../index.vue'
import AtActionSheetItem from '../body/item/index.vue'

const mountFn = genMountFn(AtActionSheet, { AtActionSheetItem })

describe('ActionSheet', () => {
  it('should render default ActionSheet', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened ActionSheet', async () => {
    const wrapper = mountFn({
      isOpened: true,
    })
    expect(
      wrapper
        .get('.at-action-sheet')
        .classes()
    ).toContain('at-action-sheet--active')
  })

  it('should render opened ActionSheet with slot contents', () => {
    const wrapper = mountFn({
      isOpened: true,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' }),
        h(AtActionSheetItem, null, { default: () => '按钮二' })
      ]
    })

    const body = wrapper.getComponent('.at-action-sheet__body')
    expect(
      body.element.children.length
    ).toEqual(2)

    expect(
      body.element
    ).toMatchSnapshot()
  })

  it('should render opened ActionSheet with prop cancelText', () => {
    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
    })
    const footer = wrapper.getComponent('.at-action-sheet__footer')
    expect(footer.text()).toBe('取消')
    expect(footer.element).toMatchSnapshot()
  })

  it('should not render ActionSheetFooter without props cancelText', async () => {
    const wrapper = mountFn({
      isOpened: true
    })

    expect(
      wrapper
        .find('.at-action-sheet__footer')
        .exists()
    ).toBe(false)
  })

  it('should render opened ActionSheet -- props title', () => {
    const wrapper = mountFn({
      isOpened: true,
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
    })

    const header = wrapper.getComponent('.at-action-sheet__header')
    expect(header.text()).toEqual('清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行')
    expect(header.element).toMatchSnapshot()
  })

  it('should not render ActionSheetHeader without prop title', async () => {
    const wrapper = mountFn({
      isOpened: true
    })
    expect(
      wrapper
        .find('.at-action-sheet__header')
        .exists()
    ).toBe(false)
  })

  it('should render opened ActionSheet with header, body and footer', () => {
    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('ActionSheet events', () => {

  it('should emit close event by clicking the overlay', async () => {
    const onClose = jest.fn()

    const wrapper = mountFn({
      isOpened: true,
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
      onClose,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' })
      ],
    })

    wrapper
      .get('.at-action-sheet__overlay')
      .trigger('tap')

    expect(onClose).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should emit both close and cancel events by click the footer with cancel text', async () => {
    const onCancel = jest.fn()
    const onClose = jest.fn()

    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
      onCancel,
      onClose,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' })
      ]
    })

    wrapper
      .getComponent('.at-action-sheet__footer')
      .trigger('tap')

    expect(onCancel).toBeCalled()
    expect(onClose).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should emit close event when switching prop isOpened to false', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
      onClose,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' })
      ]
    })

    await wrapper.setProps({ isOpened: false })
    expect(onClose).toBeCalled()
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should not emit close event when switching prop isOpened to true', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行',
      onClose: onClose,
    }, {
      default: [
        h(AtActionSheetItem, null, { default: () => '按钮一' })
      ]
    })

    await wrapper.setProps({ isOpened: true })
    expect(onClose).not.toBeCalled()
    expect(wrapper.emitted()).not.toHaveProperty('close')
  })

  it('AtActionSheetItem should emit click event', async () => {
    const onClick = jest.fn()

    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行'
    }, {
      default: [
        h(AtActionSheetItem, { onClick }, { default: () => '按钮一' }),
        h(AtActionSheetItem, null, { default: () => '按钮二' })
      ]
    })

    wrapper
      .findAll('.at-action-sheet__item')
      .forEach(async (el) => {
        await el.trigger('tap')
      })

    expect(onClick.mock.calls.length).toBe(1)
  })

  it('should stop propagation of touch event', async () => {
    const wrapper = mountFn({
      isOpened: true,
      cancelText: '取消',
      title: '清除位置信息后， 别人将不能查看到你\r\n可以通过转义字符换行'
    })

    const el = wrapper.get('.at-action-sheet')

    expect(
      el.attributes()
    ).toHaveProperty('catchmove')

    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    }

    await el.trigger('touchmove', event)

    expect(event.stopPropagation).toBeCalled()
    expect(event.preventDefault).toBeCalled()
  })

})
