import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import AtIndexes from '../index'

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

const mountFn = (props?: any, slots?: Slots) => {
  return mountFactory(AtIndexes, undefined, props, slots)
}

describe('AtIndexes', () => {
  it.concurrent('should render default indexes', async () => {
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

describe('AtIndexes Behaviour', () => {
  it.concurrent('should render toast and show active letter style when clicking a letter index', async () => {
    const wrapper = mountFn({ list: mockData, isVibrate: false })

    await wrapper.find('.at-indexes__menu-item:nth-child(2)').trigger('tap')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    expect(
      wrapper
        .find('.at-indexes__menu-item:nth-child(2)')
        .attributes('style')
    ).toContain('color: white;')

    expect(
      wrapper
        .find('.at-toast .toast-body-content__info > text')
        .text()
    ).toEqual('A')
  })

  it.concurrent('should tigger onClick when clicking on list item', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ list: mockData, isVibrate: false, onClick: onClick })

    await wrapper.find('#at-indexes__list-B .at-list__item').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it.concurrent('should tigger onScrollIntoView', async () => {
    const onScrollIntoView = jest.fn()
    const wrapper = mountFn({ list: mockData, isVibrate: false, onScrollIntoView })

    await wrapper.vm.$nextTick()
    expect(onScrollIntoView).toBeCalled()
  })

  it.concurrent('should render active menu letters when scrolling', async () => {
    const wrapper = mountFn({ list: mockData, isVibrate: false })

    await wrapper
      .find('.at-indexes__body')
      .trigger('scroll', { detail: { scrollTop: 20 } })

    expect(wrapper.html()).toMatchSnapshot()
  })
})