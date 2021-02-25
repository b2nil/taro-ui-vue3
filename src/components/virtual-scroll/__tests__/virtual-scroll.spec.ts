import { h } from '@vue/runtime-core'
import { mount } from '@vue/test-utils'
import AtVirtualScroll from '../index'
import Taro from '@tarojs/taro'

const elementHeight = 100

const mountFn = (
  props = {},
  slots: any = {
    default: ({ index, item }) => {
      return h('view', { class: 'item' }, `${index}: item-${item}`)
    }
  }
) => {
  return mount(AtVirtualScroll, {
    props,
    slots
  })
}

const props = {
  height: elementHeight,
  items: [1, 2, 3],
  itemHeight: 50,
}


describe('AtVirtualScroll', () => {
  let mock: jest.SpyInstance

  beforeEach(() => {
    // mock Taro.getEnv, and return a non-WEB environment
    jest.mock('@tarojs/taro')
    jest.spyOn(Taro, 'getEnv').mockImplementation(() => {
      return Taro.ENV_TYPE.WEAPP
    })

    // mock clientHeight
    mock = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(elementHeight)
  })

  afterEach(() => {
    mock.mockRestore()
  })

  it('should render component with scopedSlot and match snapshot', async () => {
    const wrapper = mountFn(props)

    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should set height of scrollable element', () => {
    const wrapper = mountFn(props)

    const scrollable = wrapper.find('.at-virtual-scroll__container')
    expect(scrollable.attributes('style')).toEqual('height: 150px;')
  })

  it('should render not more than 5 hidden items and match snapshot', async () => {
    const wrapper = mountFn({
      height: elementHeight,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      itemHeight: 50
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render right items on scroll and match snapshot', async () => {
    const wrapper = mountFn({
      height: elementHeight,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      itemHeight: 50
    })

    await wrapper.vm.$nextTick()
    await wrapper.find('.at-virtual-scroll').trigger('scroll', { detail: { scrollTop: 500 } })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should scroll to the provided item index', async () => {
    const wrapper = mountFn({
      height: elementHeight,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      itemHeight: 50,
      scrollIntoItem: 10
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.item').text()).toBe('10: item-11')
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ scrollIntoItem: 15 })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.item').text()).toBe('15: item-16')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render header slot', async () => {
    const wrapper = mountFn(props, {
      default: ({ index, item }) => h('view', { class: 'item' }, `${index}: item-${item}`),
      header: () => h('view')
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.at-virtual-scroll__header > view').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render footer slot', async () => {
    const wrapper = mountFn(props, {
      default: ({ index, item }) => h('view', { class: 'item' }, `${index}: item-${item}`),
      footer: () => h('view')
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.at-virtual-scroll__footer > view').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtVirtualScroll Behavior', () => {
  it('should trigger onReachTop event', async () => {
    const onReachTop = jest.fn()

    const wrapper = mountFn({
      ...props,
      onReachTop: onReachTop
    })

    await wrapper.vm.$nextTick()

    await wrapper.find('.at-virtual-scroll').trigger('scrolltoupper')
    expect(onReachTop).toBeCalled()
  })

  it('should trigger onReachBottom event', async () => {
    const onReachBottom = jest.fn()

    const wrapper = mountFn({
      ...props,
      onReachBottom: onReachBottom
    })

    await wrapper.vm.$nextTick()

    await wrapper.find('.at-virtual-scroll').trigger('scrolltolower')
    expect(onReachBottom).toBeCalled()
  })
})