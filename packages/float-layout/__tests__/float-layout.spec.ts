import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtFloatLayout from '../index.vue'

const mountFn = genMountFn(AtFloatLayout)

describe('AtFloatLayout', () => {
  testPropClassAndStyle(mountFn)

  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFn({
      isOpened: true,
      title: 'test'
    }, {
      default: [`
      云对雨，
      雪对风，
      晚照对晴空；
      来鸿对去燕，
      宿鸟对鸣虫！
    `]
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop isOpened', async () => {
    const wrapper = mountFn({ isOpened: true })
    expect(
      wrapper.classes()
    ).toContain('at-float-layout--active')
  })

  it('should render prop title', async () => {
    const wrapper = mountFn({ title: '这是个标题', isOpened: true })
    expect(
      wrapper.find('.layout-header').exists()
    ).toBeTruthy()
    expect(
      wrapper.find('.layout-header__title').text()
    ).toEqual('这是个标题')
  })

  it.each([
    ['scrollX', 'scroll-x', true],
    ['scrollY', 'scroll-y', true],
    ['scrollTop', 'scroll-top', 20],
    ['scrollLeft', 'scroll-left', 20],
    ['upperThreshold', 'upper-threshold', 20],
    ['lowerThreshold', 'lower-threshold', 20]
  ])('should render prop %s', async (prop, attr, value) => {
    const wrapper = mountFn({
      isOpened: true,
      [prop]: value
    })
    expect(
      wrapper.find('.layout-body__content').attributes(attr)
    ).toEqual(`${value}`)
  })

  it('should render disableScroll and trapScroll in alipay', async () => {
    process.env.TARO_ENV = 'alipay'

    const wrapper = mountFn({
      isOpened: true
    })

    expect(
      wrapper.find('.at-float-layout__overlay').attributes('disablescroll')
    ).toEqual('true')

    expect(
      wrapper.find('.layout-body__content').attributes('trapscroll')
    ).toEqual('true')

    process.env.TARO_ENV = 'h5'
  })
})

describe('AtFloatLayout event ', () => {
  it('should emit close by clicking overlay', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      title: '这是个标题',
      isOpened: true,
      onClose: onClose,
    })
    await wrapper.find('.at-float-layout__overlay').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
  })

  it('should emit close by clicking close btn', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      title: '这是个标题',
      isOpened: true,
      onClose: onClose,
    })
    await wrapper.find('.at-float-layout__overlay').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
  })

  it.each([
    ['scroll', 'onScroll'],
    ['scroll-to-lower', 'onScrollToLower'],
    ['scroll-to-upper', 'onScrollToUpper']
  ])('should emit %s', async (emitName, handlerName) => {
    const mockFn = jest.fn()
    const wrapper = mountFn({
      isOpened: true,
      [handlerName]: mockFn
    })
    await wrapper.find('.layout-body__content').trigger(emitName.replace(/-/g, ''))
    expect(wrapper.emitted()).toHaveProperty(emitName)
    expect(mockFn).toBeCalled()
  })
})
