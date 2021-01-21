import { mountFactory, Slots } from '@/tests/helper'
import AtNoticebar from '../index'

const factory = (
  props = {},
  slots?: Slots
) => {
  return mountFactory(AtNoticebar, undefined, props, slots)
}

describe('AtNoticebar', () => {

  it('should render prop single', () => {
    const wrapper = factory({ single: true })
    expect(
      wrapper
        .find('.at-noticebar--single')
        .exists()
    ).toBeTruthy()
  })

  it('should render prop marquee', () => {
    const wrapper = factory({ marquee: true, single: true })
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
    const wrapper = factory({
      speed: 200,
      marquee: true
    }, {
      default: ['this is a slot content']
    })
    const slotEl = wrapper.find('.at-noticebar__content-inner')
    expect(
      slotEl.attributes('style')
    ).toBe('animation-duration: 15s;')
    expect(slotEl.element).toMatchSnapshot()
  })

  it('should not render moreText in multi-line mode', () => {
    const wrapper = factory({
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
    const wrapper = factory({
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
    const wrapper = factory({
      moreText: '查看更多',
      showMore: true,
      single: true
    })

    const moreTextEl = wrapper.find('.at-noticebar__more')
    expect(moreTextEl.exists()).toBe(true)
    expect(moreTextEl.element).toMatchSnapshot()
  })

  it('should render close icon and match snapshot', () => {
    const wrapper = factory({ close: true })
    const closeIconEl = wrapper.find('.at-noticebar > .at-noticebar__close')
    expect(closeIconEl.exists()).toBe(true)
    expect(closeIconEl.element).toMatchSnapshot()
  })

  it('should render prop icon and match snapshot', () => {
    const wrapper = factory({ icon: 'volume-plus' })
    const iconEl = wrapper.find('.at-noticebar__content > .at-noticebar__content-icon')
    expect(iconEl.exists()).toBe(true)
    expect(iconEl.element).toMatchSnapshot()
  })

  it('should render slot content and match snapshot', () => {
    const wrapper = factory({}, {
      default: ['this is slot content text']
    })

    const slotEl = wrapper.find('.at-noticebar__content-inner')
    expect(slotEl.exists()).toBeTruthy()
    expect(slotEl.element).toMatchSnapshot()
  })
})

describe('AtNoticebar Behavior', () => {
  it('should trigger onClose', async () => {
    const onClose = jest.fn()
    const wrapper = factory({
      close: true,
      onClose: onClose,
    })
    await wrapper.find('.at-noticebar__close').trigger('tap')
    expect(onClose).toBeCalled()
  })

  it('should trigger onGotoMore', async () => {
    const onGotoMore = jest.fn()
    const wrapper = factory({
      icon: 'volume-plus',
      single: true,
      showMore: true,
      moreText: '更多内容',
      onGotoMore: onGotoMore
    })
    await wrapper.find('.at-noticebar__more').trigger('tap')
    expect(onGotoMore).toBeCalled()
  })
})
