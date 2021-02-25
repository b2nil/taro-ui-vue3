import { mount } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtModal from '../index'
import AtModalAction from '../action'
import AtModalHeader from '../header'
import AtModalContent from '../content'
import { sleep } from '@/tests/helper'

const components = {
  AtModal,
  AtModalAction,
  AtModalHeader,
  AtModalContent,
}

describe('Modal', () => {
  it('should render default Modal', () => {
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, null, {
            default: () => [
              h(AtModalHeader, null, { default: () => "标题" }),
              h(AtModalContent, null, {
                default: () => [
                  `这里是正文内容，欢迎加入京东凹凸实验室 这里是正文内容，欢迎加入京东凹凸实验室
              这里是正文内容，欢迎加入京东凹凸实验室`
                ]
              }),
              h(AtModalAction, null, {
                default: () => [
                  h('button', null, { default: () => "取消" }),
                  h('button', null, { default: () => "确定" }),
                ]
              })
            ]
          })
        )
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Modal', () => {
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, { isOpened: true }, {
            default: () => [
              h(AtModalHeader, null, { default: () => "标题" }),
              h(AtModalContent, null, {
                default: () => [
                  `这里是正文内容，欢迎加入京东凹凸实验室 这里是正文内容，欢迎加入京东凹凸实验室
              这里是正文内容，欢迎加入京东凹凸实验室`
                ]
              }),
              h(AtModalAction, null, {
                default: () => [
                  h('button', null, { default: () => "取消" }),
                  h('button', null, { default: () => "确定" }),
                ]
              })
            ]
          })
        )
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Modal -- no header', () => {
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, { isOpened: true }, {
            default: () => [
              h(AtModalContent, null, {
                default: () => [
                  `这里是正文内容，欢迎加入京东凹凸实验室 这里是正文内容，欢迎加入京东凹凸实验室
              这里是正文内容，欢迎加入京东凹凸实验室`
                ]
              }),
              h(AtModalAction, null, {
                default: () => [
                  h('button', null, { default: () => "取消" }),
                  h('button', null, { default: () => "确定" }),
                ]
              }),
            ]
          })
        )
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Modal -- single button', () => {
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, { isOpened: true }, {
            default: () => [
              h(AtModalContent, null, {
                default: () => [
                  `这里是正文内容，欢迎加入京东凹凸实验室 这里是正文内容，欢迎加入京东凹凸实验室
              这里是正文内容，欢迎加入京东凹凸实验室`
                ]
              }),
              h(AtModalAction, null, {
                default: () => [
                  h('button', null, { default: () => "确定" }),
                ]
              }),
            ]
          })
        )
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened  Modal -- simple', () => {
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, {
            isOpened: true,
            title: "标题",
            cancelText: "取消",
            confirmText: "确认",
            content: "欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室"
          })
        )
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('Modal Behavior ', () => {
  it('should trigger onClose & onCancel & onClick', async () => {
    const onCancel = jest.fn()
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    const wrapper = mount({
      components,
      render() {
        return (
          h(AtModal, {
            isOpened: true,
            title: "标题",
            cancelText: "取消",
            confirmText: "确认",
            closeOnClickOverlay: true,
            content: "欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室",
            onClose: onClose,
            onCancel: onCancel,
            onConfirm: onConfirm,
          })
        )
      },
    })

    const confirmDom = wrapper.find(
      '.at-modal .at-modal__footer .at-modal__action button:last-child'
    )

    confirmDom.trigger('tap')
    expect(onConfirm).toBeCalled()
    await sleep(10)

    const cancelDom = wrapper.find(
      '.at-modal .at-modal__footer .at-modal__action button:first-child'
    )
    cancelDom.trigger('tap')
    expect(onCancel).toBeCalled()
    await sleep(10)

    const overlayDom = wrapper.find('.at-modal .at-modal__overlay')
    overlayDom.trigger('tap')
    await sleep(10)
    expect(onClose).toBeCalled()
  })
})
