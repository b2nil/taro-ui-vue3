import { mount } from '@vue/test-utils'
import AtNoticebar from '../index'

const factory = (values = {}, slots = { default: ['这是内容'] }) => {
  return mount(AtNoticebar as any, {
    slots,
    props: { ...values },
  })
}

describe('AtNoticebar', () => {
  it('should render prop -- show', () => {
    const wrapper = factory({ close: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- single', () => {
    const wrapper = factory({ single: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- speed', () => {
    const wrapper = factory({ speed: 200 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- moreText & showMore', () => {
    // showMore work only when single is true
    const wrapper = factory({ moreText: '查看更多', showMore: true, single: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- icon', () => {
    const wrapper = factory({ icon: 'volume-plus' })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtNoticebar Behavior', () => {
  it('should trigger onClose', () => {
    const onClose = jest.fn()
    const wrapper = factory({
      close: true,
      onClose: onClose,
    })
    wrapper.find('.at-noticebar__close').trigger('tap')
    expect(onClose).toBeCalled()
  })

  it('should trigger onGotoMore', () => {
    const onGotoMore = jest.fn()
    const wrapper = factory({
      icon: 'volume-plus',
      single: true,
      showMore: true,
      onGotoMore: onGotoMore,
      moreText: '更多内容',
    })
    wrapper.find('.at-noticebar__more').trigger('tap')
    expect(onGotoMore).toBeCalled()
  })
})
