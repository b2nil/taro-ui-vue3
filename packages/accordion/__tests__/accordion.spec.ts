import { ref } from 'vue'
import AtAccordion from '../index.vue'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import * as utils from '@taro-ui-vue3/utils/common'

const mountFn = genMountFn(AtAccordion)

describe('AtAccordion', () => {
  it('should render default AtAccordion', () => {
    const wrapper = mountFn({}, {
      default: ["按钮"]
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop class', () => {
    const wrapper = mountFn({ class: 'test' })
    expect(
      wrapper
        .get('.at-accordion')
        .classes()
    ).toContain('test')
  })

  it('should render prop style', () => {
    const wrapper = mountFn({ style: { color: 'red' } })
    expect(
      wrapper
        .get('.at-accordion')
        .attributes('style')
    ).toEqual('color: red;')
  })

  it.each([
    'title',
    'note'
  ])('should render prop %s', (propName) => {
    const wrapper = mountFn({
      [propName]: propName,
    })
    expect(
      wrapper
        .get(`.at-accordion__info__${propName}`)
        .text()
    ).toEqual(propName)
    expect(
      wrapper
        .get('.at-accordion__info')
        .element
    ).toMatchSnapshot()
  })

  it.each`
    open
    ${true}
    ${false}
  `('should render prop open=$open', ({ open }) => {
    const wrapper = mountFn({
      open,
    })

    expect(
      wrapper
        .find(".at-accordion__arrow--folded")
        .exists()
    ).toBe(!!open)

    expect(
      wrapper
        .find(".at-accordion__content--inactive")
        .exists()
    ).toBe(!open)
  })

  it.each([
    ['', { value: 'chevron-down' }],
    ['with color', { value: 'chevron-down', color: 'red' }],
    ['with size', { value: 'chevron-down', size: 10 }],
    ['with prefixClass', { value: 'star', prefixClass: 'prefix-class' }],
  ])('should render prop icon %s', (desc, icon: AtIconBaseProps) => {
    const wrapper = mountFn({
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

  it('should render prop hasBorder', async () => {
    const wrapper = mountFn()

    expect(
      wrapper
        .find(".at-accordion__header--noborder")
        .exists()
    ).toBeFalsy()

    await wrapper.setProps({ hasBorder: false })
    expect(
      wrapper
        .find(".at-accordion__header--noborder")
        .exists()
    ).toBeTruthy()
  })
})

describe('AtAccordion Behavior', () => {
  let delayQuerySelector: jest.SpyInstance

  beforeEach(() => {
    jest.mock('@taro-ui-vue3/utils/common')
    jest.useFakeTimers()

    delayQuerySelector = jest
      .spyOn(utils, 'delayQuerySelector')
      .mockImplementation((_, selectorStr, delayTime) => {
        return new Promise(resolve => {
          resolve([{ height: 30 }])
        })
      })
  })

  afterEach(() => {
    delayQuerySelector.mockReset()
    delayQuerySelector.mockRestore()
  })

  it('should emit click event', async () => {
    const wrapper = mountFn()
    await wrapper.find('.at-accordion__header').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')![0]).toEqual([true])
  })

  it('should not emit click event during animated toggle', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      onClick
    })

    await wrapper.setProps({ open: true })

    jest.advanceTimersByTime(400)
    await wrapper.find('.at-accordion__header').trigger('tap')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(onClick).not.toBeCalled()
  })

  it('should toggle on accordion with animation', async () => {
    const open = ref(false)
    const onClick = jest.fn((e) => { open.value = e })
    const wrapper = mountFn({
      open: open.value,
      onClick
    }, { default: ["按钮"] })

    let contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.attributes('style')).toBeFalsy()
    expect(contentWapper.classes()).toContain('at-accordion__content--inactive')

    await wrapper.find('.at-accordion__header').trigger('tap')
    await wrapper.setProps({ open: open.value })

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
    const wrapper = mountFn({
      open: open.value,
      onClick
    }, { default: ["按钮"] })

    let contentWapper = wrapper.get('.at-accordion__content')
    expect(contentWapper.classes()).not.toContain('at-accordion__content--inactive')

    await wrapper.find('.at-accordion__header').trigger('tap')
    await wrapper.setProps({ open: open.value })

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
    const wrapper = mountFn({
      isAnimation: false
    })
    await wrapper.setProps({ open: true })
    expect(delayQuerySelector).not.toBeCalled()
  })

})
