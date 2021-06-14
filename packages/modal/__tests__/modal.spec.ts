import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { h } from 'vue'
import AtModal from '../index.vue'

const mountFn = genMountFn(AtModal)

describe('AtModal', () => {
  it('should render modal with slot content and match snapshot', () => {
    const wrapper = mountFn({}, {
      default: [h('view', { class: 'slot' })]
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render modal with header and action and match snapshot', () => {
    const wrapper = mountFn({
      title: 'title',
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm'
    })
    const headerEl = wrapper.find('.at-modal__header')
    const actionEl = wrapper.find('.at-modal__action')
    const contentEl = wrapper.find('.at-modal__content')

    expect(headerEl.exists()).toBeTruthy()
    expect(headerEl.find('text').text()).toEqual('title')

    expect(contentEl.exists()).toBeTruthy()
    expect(contentEl.find('text').text()).toEqual('content')

    expect(actionEl.exists()).toBeTruthy()
    expect(
      actionEl.find('button:nth-child(1)').text()
    ).toEqual('cancel')
    expect(
      actionEl.find('button:nth-child(2)').text()
    ).toEqual('confirm')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render modal without header', () => {
    const wrapper = mountFn({
      content: 'content'
    })
    expect(
      wrapper.find('.at-modal__header').exists()
    ).toBeFalsy()
  })

  it('should render modal with single button', () => {
    const wrapper = mountFn({
      content: 'content',
      confirmText: 'confirm'
    })
    const buttons = wrapper.findAll('.at-modal__action button')
    expect(buttons.length).toEqual(1)
    expect(buttons[0].text()).toEqual('confirm')
  })

  it('should render h5 button style', async () => {
    const wrapper = mountFn({
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm'
    })

    const button = wrapper
      .find('.at-modal__action button:nth-child(2)')

    expect(button.attributes('style')).toEqual('margin-top: 0px;')
  })

  it('should render prop isOpened', async () => {
    const wrapper = mountFn({ isOpened: true })

    expect(
      wrapper
        .find('.at-modal--active')
        .exists()
    ).toBeTruthy()

    await wrapper.setProps({
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm'
    })

    expect(
      wrapper
        .find('.at-modal--active')
        .exists()
    ).toBeTruthy()
  })
})

describe('AtModal events ', () => {
  it('should emit close, cancel and click events', async () => {
    const onCancel = jest.fn()
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    const wrapper = mountFn({
      title: 'title',
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm',
      onClose,
      onCancel,
      onConfirm
    })

    const overlayEl = wrapper.find('.at-modal__overlay')
    const confirmBtnEl = wrapper
      .find('.at-modal__action button:last-child')
    const cancelBtnEl = wrapper
      .find('.at-modal__action button:first-child')

    await overlayEl.trigger('tap')
    await cancelBtnEl.trigger('tap')
    await confirmBtnEl.trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted()).toHaveProperty('confirm')
    expect(onClose).toBeCalled()
    expect(onCancel).toBeCalled()
    expect(onConfirm).toBeCalled()
  })

  it('should not emit close if closeOnClickOverlay is false', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      title: 'title',
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm',
      closeOnClickOverlay: false,
      onClose
    })

    await wrapper.find('.at-modal__overlay').trigger('tap')
    expect(onClose).not.toBeCalled()
    expect(wrapper.emitted()).not.toHaveProperty('close')
  })

  it('should stop propagation of touch event', async () => {
    const stopPropagation = jest.fn()

    const wrapper = mountFn({}, {
      default: [h('view', { class: 'slot' })]
    })

    await wrapper
      .find('.at-modal')
      .trigger('touchmove', { stopPropagation })
    expect(
      wrapper.find('.at-modal').attributes('catchmove')
    ).toEqual('true')
    expect(stopPropagation).toBeCalled()

    await wrapper.setProps({
      title: 'title',
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm'
    })

    await wrapper
      .find('.at-modal')
      .trigger('touchmove', { stopPropagation })
    expect(
      wrapper.find('.at-modal').attributes('catchmove')
    ).toEqual('true')
    expect(stopPropagation).toBeCalled()
  })

  it('should render disableScroll in alipay', async () => {
    process.env.TARO_ENV = 'alipay'
    const wrapper = mountFn({ class: 'test' }, {
      default: [h('view', { class: 'slot' })]
    })

    expect(
      wrapper.find('.at-modal').attributes('disablescroll')
    ).toEqual('true')

    await wrapper.setProps({
      title: 'title',
      content: 'content',
      cancelText: 'cancel',
      confirmText: 'confirm'
    })

    expect(
      wrapper.find('.at-modal').attributes('disablescroll')
    ).toEqual('true')

    process.env.TARO_ENV = 'h5'
  })

})
