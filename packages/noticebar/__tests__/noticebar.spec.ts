import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { flushPromises } from '@vue/test-utils'
import AtNoticebar from '../index.vue'

const mountFn = genMountFn(AtNoticebar)

describe('AtNoticebar', () => {

  it('should render prop single', () => {
    const wrapper = mountFn({ single: true })
    expect(
      wrapper
        .find('.at-noticebar--single')
        .exists()
    ).toBeTruthy()
  })

  it('should render prop marquee', () => {
    const wrapper = mountFn({ marquee: true, single: true })
    expect(
      wrapper
        .find('.at-noticebar--marquee')
        .exists()
    ).toBeTruthy()

    expect(
      wrapper
        .find('.at-noticebar--single')
        .exists()
    ).toBeFalsy()
  })

  it('should render prop speed', () => {
    const wrapper = mountFn({
      speed: 200,
      marquee: true
    }, {
      default: ['this is a slot content']
    })

    expect(
      wrapper
        .find('.at-noticebar__content-inner')
        .attributes('style')
    ).toBe('animation-duration: 15s;')
  })

  it('should not render moreText in multi-line mode', () => {
    const wrapper = mountFn({
      moreText: '查看更多',
      showMore: true
    })

    expect(
      wrapper
        .find('.at-noticebar__more')
        .exists()
    ).toBe(false)
  })

  it('should not render moreText in single-line mode', () => {
    const wrapper = mountFn({
      moreText: '查看更多',
      showMore: false,
      single: true
    })

    expect(
      wrapper
        .find('.at-noticebar__more')
        .exists()
    ).toBe(false)
  })

  it('should render moreText in single-line mode and match snapshot', () => {
    const wrapper = mountFn({
      moreText: '查看更多',
      showMore: true,
      single: true
    })

    const moreTextEl = wrapper.find('.at-noticebar__more')
    expect(moreTextEl.exists()).toBe(true)
    expect(moreTextEl.element).toMatchSnapshot()
  })

  it('should render close icon and match snapshot', () => {
    const wrapper = mountFn({ close: true })
    const closeIconEl = wrapper.find('.at-noticebar > .at-noticebar__close')
    expect(closeIconEl.exists()).toBe(true)
    expect(closeIconEl.element).toMatchSnapshot()
  })

  it('should render prop icon and match snapshot', () => {
    const wrapper = mountFn({ icon: 'volume-plus' })
    const iconEl = wrapper.find('.at-noticebar__content > .at-noticebar__content-icon')
    expect(iconEl.exists()).toBe(true)
    expect(iconEl.element).toMatchSnapshot()
  })

  it('should render slot content', () => {
    const wrapper = mountFn({}, {
      default: ['this is slot content text']
    })

    expect(
      wrapper
        .find('.at-noticebar__content-inner')
        .text()
    ).toBe('this is slot content text')
  })
})

describe('AtNoticebar events', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should emit close', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      close: true,
      onClose: onClose,
    })
    await wrapper.find('.at-noticebar__close').trigger('tap')
    expect(wrapper.find('.at-noticebar').exists()).toBeFalsy()
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
  })

  it('should emit goto-more', async () => {
    const onGotoMore = jest.fn()
    const wrapper = mountFn({
      icon: 'volume-plus',
      single: true,
      showMore: true,
      moreText: '更多内容',
      onGotoMore: onGotoMore
    })
    await wrapper.find('.at-noticebar__more').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('goto-more')
    expect(onGotoMore).toBeCalled()
  })

  it('should initiate h5 animation when mounted if marquee is used', async () => {
    const wrapper = mountFn({
      single: true,
      marquee: true,
    }, {
      default: ['this is a test']
    })

    const contentEl = wrapper.find('.at-noticebar__content-text view')
    jest.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    expect(
      contentEl.attributes('style')
    ).toEqual(`animation-duration: ${30 / 100}s;`)
  })

  it('should initiate miniapp animation when mounted if marquee is used', async () => {
    process.env.TARO_ENV = 'weapp'
    const spy = jest.spyOn(global, 'setTimeout')

    const wrapper = mountFn({
      single: true,
      marquee: true,
    }, {
      default: ['this is a test']
    })

    flushPromises()
    jest.advanceTimersByTime(100)
    jest.advanceTimersByTime(300 + 600 + 900)
    await wrapper.vm.$nextTick()

    expect(spy).toBeCalledTimes(7)

    process.env.TARO_ENV = 'h5'
  })
})
