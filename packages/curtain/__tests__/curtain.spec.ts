import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import AtCurtain from '../index'

const mountFn = (
  props?: object,
  slots?: Slots
) => {
  return mountFactory(AtCurtain, undefined, props, slots)
}

describe('AtCurtain', () => {
  it('should render default AtCurtain', () => {
    const wrapper = mountFn()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render custom class at root node', () => {
    const wrapper = mountFn({ class: 'test' })
    expect(wrapper.find('.at-curtain').classes()).toContain('test')
  })

  it('should render custom style at root node', () => {
    const wrapper = mountFn({ style: 'color: red;' })
    expect(wrapper.find('.at-curtain').attributes('style')).toEqual('color: red;')
  })

  it('should render prop -- isOpened', async () => {
    const wrapper = mountFn()
    expect(wrapper.find('.at-curtain--closed').exists()).toBeTruthy()

    await wrapper.setProps({ isOpened: true })
    expect(wrapper.find('.at-curtain--closed').exists()).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"
  ])('should render close button at position -- %s', (position) => {
    const wrapper = mountFn({ closeBtnPosition: position })
    expect(wrapper.find(
      `.at-curtain__btn-close--${position}`
    ).exists()).toBeTruthy()
  })

  it('should render default slot content', () => {
    const wrapper = mountFn(undefined, {
      default: [h('view', { class: 'slot' })]
    })

    expect(wrapper.find('.at-curtain__body > .slot').exists()).toBeTruthy()
  })
})

describe('AtCurtain Behaviour', () => {
  it('should trigger onClose event by clicking the close button', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({ onClose: onClose })

    await wrapper.find('.at-curtain__btn-close').trigger('tap')
    expect(onClose).toBeCalled()
  })
})
