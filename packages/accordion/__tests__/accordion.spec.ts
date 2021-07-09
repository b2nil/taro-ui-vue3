import { mountFactory, Slots, genDelayedSelectorSpy } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtAccordion from '../index'
import * as utils from '@taro-ui-vue3/utils/common'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'

const factory = (
  values = {},
  slots: Slots = { default: ['按钮'] }
) => {
  return mountFactory(AtAccordion, {}, values, slots)
}

describe('AtAccordion', () => {
  it('should render default AtAccordion', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- title', () => {
    const wrapper = factory({
      title: 'title',
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(
      wrapper.find('.at-accordion__info__title').text()
    ).toEqual('title')
  })

  it('should render prop -- open=true', () => {
    const wrapper = factory({
      open: true,
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-accordion__arrow--folded").exists()).toBeTruthy()
    expect(wrapper.find(".at-accordion__content--inactive").exists()).toBeFalsy()
  })

  it('should render prop -- open=false', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-accordion__arrow--folded").exists()).toBeFalsy()
    expect(wrapper.find(".at-accordion__content--inactive").exists()).toBeTruthy()
  })

  it.each([
    ['', { value: 'chevron-down' }],
    ['with color', { value: 'chevron-down', color: 'red' }],
    ['with size', { value: 'chevron-down', size: 10 }],
    ['with prefixClass', { value: 'star', prefixClass: 'prefix-class' }],
  ])('should render prop icon %s', (desc, icon: AtIconBaseProps) => {
    const wrapper = factory({
      icon,
    })

    const iconClass = Boolean(icon.prefixClass)
      ? `.${icon.prefixClass}-${icon.value}`
      : `.at-icon-${icon.value}`

    const iconEl = wrapper.find(iconClass)

    expect(iconEl.exists()).toBeTruthy()
    expect(iconEl.element).toMatchSnapshot()

    if (icon.color) {
      expect(
        iconEl.attributes('style')
      ).toEqual(`color: ${icon.color};`)
    }

    if (icon.size) {
      expect(
        iconEl.attributes('style')
      ).toEqual(`font-size: ${icon.size}px;`)
    }

    if (icon.prefixClass) {
      expect(iconEl.classes()).toContain(icon.prefixClass)
      expect(iconEl.classes()).toContain(`${icon.prefixClass}-${icon.value}`)
    }
  })

  it('should render prop -- hasBorder', async () => {
    const wrapper = factory({
      title: 'title',
    })

    expect(wrapper.find(".at-accordion__header--noborder").exists()).toBeFalsy()

    await wrapper.setProps({ hasBorder: false })
    expect(wrapper.find(".at-accordion__header--noborder").exists()).toBeTruthy()
  })

  it('should render prop -- note', () => {
    const wrapper = factory({
      note: 'note',
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(
      wrapper.find('.at-accordion__info__note').text()
    ).toEqual('note')
  })
})

describe('AtAccordion Behavior', () => {
  let delayQuerySelector: jest.SpyInstance

  beforeEach(() => {
    jest.mock('@taro-ui-vue3/utils/common')
    jest.useFakeTimers()
    delayQuerySelector = genDelayedSelectorSpy(utils, { height: 30 })
  })

  afterEach(() => {
    delayQuerySelector.mockReset()
    delayQuerySelector.mockRestore()
  })

  it('should trigger click event', async () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick })
    await wrapper.find('.at-accordion__header').trigger('tap')
    expect(onClick).toBeCalled()
    expect(onClick.mock.calls[0][0]).toBe(true)
  })

  it('should not trigger click event during animated toggle', async () => {
    const onClick = jest.fn()
    const wrapper = factory({
      onClick
    })

    await wrapper.setProps({ open: true })

    jest.advanceTimersByTime(400)
    await wrapper.find('.at-accordion__header').trigger('tap')
    await wrapper.vm.$nextTick()

    expect(onClick).not.toBeCalled()
  })

  it('should toggle on accordion with animation', async () => {
    const open = ref(false)
    const onClick = jest.fn((e) => { open.value = e })
    const wrapper = factory({
      open,
      onClick
    }, { default: ["按钮"] })

    let contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toBeFalsy()
    expect(contentWapper.classes()).toContain('at-accordion__content--inactive')

    await wrapper.find('.at-accordion__header').trigger('tap')

    jest.advanceTimersByTime(90)
    await wrapper.vm.$nextTick()
    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('height: 0px;')

    jest.advanceTimersByTime(10)
    await wrapper.vm.$nextTick()
    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('height: 30px;')

    jest.advanceTimersByTime(700)
    await wrapper.vm.$nextTick()
    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('')
    expect(contentWapper.classes()).not.toContain('at-accordion__content--inactive')
  })

  it('should toggle off accordion with animation', async () => {
    const open = ref(true)
    const onClick = jest.fn((e) => { open.value = e })
    const wrapper = factory({
      open,
      onClick
    }, { default: ["按钮"] })

    let contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.classes()).not.toContain('at-accordion__content--inactive')

    await wrapper.find('.at-accordion__header').trigger('tap')

    jest.advanceTimersByTime(90)
    await wrapper.vm.$nextTick()

    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('height: 30px;')

    jest.advanceTimersByTime(10)
    await wrapper.vm.$nextTick()

    await wrapper.find('.at-accordion__header').trigger('tap')
    expect(onClick).toBeCalledTimes(1)

    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('height: 0px;')

    jest.advanceTimersByTime(700)
    await wrapper.vm.$nextTick()

    contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toEqual('')
    expect(contentWapper.classes()).toContain('at-accordion__content--inactive')
  })

  it('should not toggle with animation if animation is not used', async () => {
    const wrapper = factory({
      isAnimation: false
    })
    await wrapper.setProps({ open: true })
    expect(delayQuerySelector).not.toBeCalled()
  })

})
