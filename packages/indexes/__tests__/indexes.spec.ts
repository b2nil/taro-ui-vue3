import {
  genMountFn,
  genDelayedSelectorSpy
} from '@taro-ui-vue3/test-utils/helper'
import { flushPromises } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtIndexes from '../index.vue'
import * as utils from '@taro-ui-vue3/utils/common'
import { ref } from 'vue'

const mockData = [
  {
    title: 'A', key: 'A', items: [
      { name: ' 阿坝 ', key: 'A' },
      { name: ' 阿拉善 ', key: 'A' }
    ]
  },
  {
    title: 'B', key: 'B', items: [{ name: ' 北京 ', key: 'B' }]
  },
  {
    title: 'J', key: 'J', items: [
      { name: ' 济南 ', key: 'J' },
      { name: ' 佳木斯 ', key: 'J' },
      { name: ' 吉安 ', key: 'J' },
    ]
  }
]

const mountFn = genMountFn(AtIndexes)

describe('AtIndexes', () => {
  it('should render default indexes', async () => {
    const wrapper = mountFn({ isVibrate: false })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.concurrent('should render an index menu of letters', async () => {
    const wrapper = mountFn({ list: mockData, isVibrate: false })
    const letters = ['Top', 'A', 'B', 'J']
    wrapper.findAll('.at-indexes__menu-item').forEach((el, i) => {
      expect(el.text()).toEqual(letters[i])
    })
  })

  it.concurrent('should render the default slot content', async () => {
    const wrapper = mountFn({ list: mockData, isVibrate: false }, {
      default: [h('view', { class: 'slot' })]
    })
    expect(wrapper.find('#at-indexes__top > .slot').exists()).toBeTruthy()
  })
})

describe('AtIndexes events', () => {
  jest.mock('@taro-ui-vue3/utils/common')
  jest.useFakeTimers()
  let delayedSelector: jest.SpyInstance

  beforeEach(() => {
    delayedSelector = genDelayedSelectorSpy(utils, {
      top: 100,
      height: 60
    })
  })

  afterEach(() => {
    delayedSelector.mockClear()
    delayedSelector.mockRestore()
  })

  it('should render toast and show active letter style when clicking a letter index', async () => {

    const wrapper = mountFn({ list: mockData, isVibrate: false })

    jest.advanceTimersByTime(500) // allow time to calculate all heights
    await flushPromises()
    await wrapper
      .find('.at-indexes__menu-item:nth-child(2)')
      .trigger('tap')
    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .find('.at-indexes__menu-item:nth-child(2)')
        .attributes('style')
    ).toContain('color: white;')

    expect(wrapper.html()).toMatchSnapshot()

    expect(
      wrapper
        .find('.at-toast .toast-body-content__info > text')
        .text()
    ).toEqual('A')
  })

  it('should emit click when clicking on list item', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      list: mockData,
      isVibrate: false,
      onClick
    })

    await wrapper
      .find('#at-indexes__list-B .at-list__item')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })

  it('should emit scroll-into-view', async () => {
    const jumpToView = ref((k) => { })
    const onScrollIntoView = jest.fn((fn) => {
      jumpToView.value = fn
    })

    const wrapper = mountFn({
      list: mockData,
      isVibrate: false,
      onScrollIntoView
    })

    jest.advanceTimersByTime(500)
    await flushPromises()
    expect(wrapper.emitted()).toHaveProperty('scroll-into-view')
    expect(onScrollIntoView).toBeCalled()

    // jump to J
    jumpToView.value('J')
    jest.advanceTimersByTime(1000) // allow to update state
    await wrapper.vm.$nextTick()

    const jEl = wrapper.find('.at-indexes__menu-item:nth-child(4)')
    expect(jEl.text()).toEqual('J')
    expect(jEl.attributes('style')).toContain('color: white;')

    // jump to Top
    jumpToView.value('top')
    jest.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    const topEl = wrapper.find('.at-indexes__menu-item:nth-child(1)')
    expect(topEl.text()).toEqual('Top')
    expect(topEl.attributes('style')).toContain('color: white;')
  })

  // @TODO: cannot trigger scroll with scroll event details
  it('should render active menu letters when scrolling', async () => {
    const wrapper = mountFn({
      list: mockData,
      isVibrate: false
    })

    jest.advanceTimersByTime(500)
    await flushPromises()

    expect(
      wrapper
        .find('.at-indexes__menu-item:nth-child(1)')
        .attributes('style')
    ).toContain('color: white;')

    await wrapper
      .find('.at-indexes__body')
      .trigger('scroll', {
        detail: { scrollTop: 80 }
      })
    await wrapper.vm.$nextTick()

    // @TODO: handleScroll(e) --> e.detail is 0 ?
    // expect(
    //   wrapper
    //     .find('.at-indexes__menu-item:nth-child(2)')
    //     .attributes('style')
    // ).toContain('color: white;')
  })

  it('should render active letter when touchmoves the menu', async () => {
    const wrapper = mountFn({
      list: mockData,
      isVibrate: false
    })

    jest.advanceTimersByTime(500)
    await flushPromises()

    expect(
      wrapper
        .find('.at-indexes__menu-item:nth-child(1)')
        .attributes('style')
    ).toContain('color: white;')

    await wrapper
      .find('.at-indexes__menu')
      .trigger('touchmove', {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        touches: [{
          // mocking touchmove to the 3rd menu letter
          // (pageY - startTop) / itemHeight
          // (145 - 100) / (60 / (3 + 1)) = 3
          pageY: 145
        }]
      })
    await wrapper.vm.$nextTick()
    jest.advanceTimersByTime(1000)

    expect(
      wrapper
        .find('.at-indexes__menu-item:nth-child(4)')
        .attributes('style')
    ).toContain('color: white;')
  })
})