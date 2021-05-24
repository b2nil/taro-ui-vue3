import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtAccordion from '../index'
import Taro, { querySelectorMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'

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

  it('should render prop -- icon', () => {
    const wrapper = factory({
      icon: { value: 'chevron-down' },
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-chevron-down").exists()).toBeTruthy()
  })

  it('should render prop -- icon with color', async () => {
    const wrapper = factory({
      icon: { value: 'chevron-down', color: 'red' },
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-chevron-down").exists()).toBeTruthy()
    expect(
      wrapper.find(".at-icon-chevron-down").attributes("style")
    ).toBe("color: red;")

    await wrapper.setProps({ icon: { value: 'chevron-down' } })
    expect(
      wrapper.find(".at-icon-chevron-down").exists()
    ).toBeTruthy()
    expect(
      wrapper.find(".at-icon-chevron-down").attributes("style")
    ).toBe("")
  })

  it('should render prop -- icon with size', async () => {
    const wrapper = factory({
      icon: { value: 'chevron-down', size: 10 },
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-chevron-down").exists()).toBeTruthy()
    expect(
      wrapper.find(".at-icon-chevron-down").attributes().style
    ).toBe("font-size: 10px;")

    await wrapper.setProps({ icon: { value: 'chevron-down' } })
    expect(wrapper.find(".at-icon-chevron-down").exists()).toBeTruthy()
    expect(
      wrapper.find(".at-icon-chevron-down").attributes("style")
    ).toBe("")
  })

  it('should render prop -- icon with prefixClass', async () => {
    const wrapper = factory({
      icon: { prefixClass: 'prefixClass', value: 'star' },
    })
    expect(wrapper.element).toMatchSnapshot()

    const iconElement = wrapper.find(".at-accordion__icon")
    expect(iconElement.classes()).toContain('prefixClass')
    expect(iconElement.classes()).toContain('prefixClass-star')

    await wrapper.setProps({ icon: { value: 'star' } })
    const iconElement2 = wrapper.find(".at-accordion__icon")
    expect(iconElement2.classes()).not.toContain('prefixClass')
    expect(iconElement2.classes()).not.toContain('prefixClass-star')
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
  beforeEach(() => {
    jest.mock('@tarojs/taro')
    jest.useFakeTimers()
  })

  it.skip('should trigger onClick event to toggle accordion', async () => {
    const open = ref(false)
    const onClick = jest.fn((e) => { open.value = e })
    const wrapper = factory({
      open: open.value,
      onClick,
    })

    expect(wrapper.find('.at-accordion__content--inactive').exists()).toBeTruthy()

    await wrapper.find('.at-accordion__header').trigger('tap')
    expect(wrapper.find('.at-accordion__content--inactive').exists()).toBeFalsy()

    await wrapper.find('.at-accordion__header').trigger('tap')
    expect(wrapper.find('.at-accordion__content--inactive').exists()).toBeTruthy()
    expect(onClick.mock.calls.length).toBe(2)
  })

  it('should trigger setTimeout', async () => {
    const mockFn = querySelectorMockFn()
    const createSelectorQuery = jest.spyOn(Taro, 'createSelectorQuery').mockImplementation(mockFn)
    const setTimeout = jest.spyOn(global, 'setTimeout').mockImplementation(jest.fn())
    const onClick = jest.fn()
    const wrapper = factory({
      isAnimation: false,
      onClick: onClick,
    })
    expect(setTimeout).not.toBeCalled()

    await wrapper.setProps({ open: true, isAnimation: true })
    jest.runAllTimers()
    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 30)
    expect(createSelectorQuery).toBeCalled()
    createSelectorQuery.mockClear()
  })

})
