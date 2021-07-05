import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtLoadMore from '../index.vue'

const mountFn = genMountFn(AtLoadMore)

describe('AtLoadMore', () => {
  testPropClassAndStyle(mountFn)

  it('should render default AtLoadMore', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    'more',
    'loading',
    'noMore'
  ])('should render prop status -- %s', async (status) => {
    const wrapper = mountFn({ status })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop moreText', async () => {
    const wrapper = mountFn({ moreText: 'moreText', status: 'more' })
    expect(
      wrapper.findComponent('.at-button').text()
    ).toEqual('moreText')
  })

  it('should render prop loadingText', async () => {
    const wrapper = mountFn({ loadingText: 'loadingText', status: 'loading' })
    expect(
      wrapper
        .find('.at-activity-indicator__content')
        .text()
    ).toEqual('loadingText')
  })

  it('should render prop noMoreText', async () => {
    const wrapper = mountFn({ noMoreText: 'noMoreText', status: 'noMore' })
    expect(
      wrapper
        .find('.at-load-more__tip')
        .text()
    ).toEqual('noMoreText')
  })

  it.each([
    ['cssString', 'background-color: red;'],
    ['cssProperties', { backgroundColor: 'red' }],
  ])('should render prop noMoreTextStyle -- %s', async (desc, propValue) => {
    const wrapper = mountFn({
      noMoreTextStyle: propValue,
      status: 'noMore'
    })
    expect(
      wrapper
        .find('.at-load-more__tip')
        .attributes('style')
    ).toContain('background-color: red;')
  })

  it.each([
    ['cssString', 'background-color: red;'],
    ['cssProperties', { backgroundColor: 'red' }],
  ])('should render prop moreBtnStyle -- %s', async (desc, propValue) => {
    const wrapper = mountFn({
      moreBtnStyle: propValue
    })
    expect(
      wrapper
        .findComponent('.at-button')
        .attributes('style')
    ).toContain('background-color: red;')
  })

  it('should emit click event', async () => {
    const wrapper = mountFn({
      status: 'more'
    })

    await wrapper
      .findComponent('.at-button')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
