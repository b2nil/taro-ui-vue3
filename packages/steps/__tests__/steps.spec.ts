import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtSteps from '../index.vue'

const mountFn = genMountFn(AtSteps)

describe('AtSteps', () => {
  const items1 = [
    {
      title: '步骤一',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'sound',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      status: 'success'
    },
    {
      title: '步骤二',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'shopping-cart',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      status: 'error'
    },
    {
      title: '步骤三',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'camera',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
    },
    {
      title: '步骤四',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'camera',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14'
      }
    }
  ]

  const items2 = [
    {
      title: '步骤一',
      desc: '这里是额外的信息，最多两行',
      success: true,
    },
    {
      title: '步骤二',
      desc: '这里是额外的信息，最多两行',
    },
    {
      title: '步骤三',
      desc: '这里是额外的信息，最多两行',
      error: true,
    },
  ]

  testPropClassAndStyle(mountFn)

  it('should render items with icon and match snapshot', () => {
    const wrapper = mountFn({ items: items1, current: 2 })
    expect(wrapper.element).toMatchSnapshot()

    const statusEls = wrapper.findAll('.at-icon')
    expect(statusEls[0].classes()).toContain('at-icon-check-circle')
    expect(statusEls[0].classes()).toContain('at-steps__single-icon--success')

    expect(statusEls[1].classes()).toContain('at-icon-close-circle')
    expect(statusEls[1].classes()).toContain('at-steps__single-icon--error')

    expect(
      statusEls[2].attributes('style')
    ).toContain(`color: ${hexToRGBA('#fff')}`)
    expect(
      statusEls[3].attributes('style')
    ).toContain(`color: ${hexToRGBA('#78A4FA')}`)
  })

  it('should render items without icon and match snapshot', () => {
    const wrapper = mountFn({ items: items2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop current', () => {
    const wrapper = mountFn({ items: items1, current: 1 })
    const itemEls = wrapper.findAll('.at-steps__item')
    expect(itemEls[1].classes()).toContain('at-steps__item--active')
    expect(itemEls[0].classes()).toContain('at-steps__item--inactive')
    expect(itemEls[2].classes()).toContain('at-steps__item--inactive')
  })

  it('should emit change', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({ items: items2, onChange })

    await wrapper
      .find('.at-steps__item:nth-child(3)')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('change')![0]).toEqual([2])
  })
})
