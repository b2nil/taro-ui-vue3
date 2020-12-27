import { mount } from '@vue/test-utils'
import AtLoadMore from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtLoadMore as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtLoadMore', () => {
  it('should render default AtLoadMore', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status === more', () => {
    const wrapper = factory({ status: 'more' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status === loading', () => {
    const wrapper = factory({ status: 'loading' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status === noMore', () => {
    const wrapper = factory({ status: 'noMore' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- moreText', () => {
    const wrapper = factory({ moreText: 'moreText', status: 'more' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- loadingText', () => {
    const wrapper = factory({ loadingText: 'loadingText', status: 'loading' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- noMoreText', () => {
    const wrapper = factory({ noMoreText: 'noMoreText', status: 'noMore' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- noMoreTextStyle', () => {
    const wrapper = factory({ noMoreTextStyle: 'color:red' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- moreBtnStyle', () => {
    const wrapper = factory({ moreBtnStyle: 'color:red' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
