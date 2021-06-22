import {
  genMountFn,
  triggerTouchEvents,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtTabs from '../index.vue'
import { h, ref } from 'vue'

describe('AtTabs', () => {

  const mountFn = genMountFn(AtTabs)

  const tabList = [
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' }
  ]

  beforeEach(() => {
    jest.useFakeTimers()
    jest.runAllTimers()
    jest.advanceTimersByTime(100)
  })

  testPropClassAndStyle(mountFn)

  it('should render default AtTabs', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop tabList', () => {
    const wrapper = mountFn({ tabList })
    expect(
      wrapper
        .findAll('.at-tabs__item')
        .length
    ).toBe(tabList.length)

    expect(
      wrapper
        .findAll('.at-tabs__item--active')
        .length
    ).toBe(1)

    expect(
      wrapper
        .find('.at-tabs__header')
        .element
    ).toMatchSnapshot()
  })

  it('should render prop current', async () => {
    const wrapper = mountFn({
      tabList
    })

    const activeTab = wrapper.find('.at-tabs__item--active')
    const tabs = wrapper.findAll('.at-tabs__item')
    expect(tabs[0]).toEqual(activeTab)

    await wrapper.setProps({ current: 2 })
    const activeTab1 = wrapper.find('.at-tabs__item--active')
    const tabs1 = wrapper.findAll('.at-tabs__item')
    expect(tabs1[2]).toEqual(activeTab1)
  })

  it('should render prop scroll', async () => {
    const wrapper = mountFn({
      tabList
    })

    expect(
      wrapper
        .find('.at-tabs--scroll')
        .exists()
    ).toBe(false)

    expect(
      wrapper
        .find('view.at-tabs__header')
        .exists()
    ).toBe(true)

    expect(
      wrapper
        .find('scroll-view.at-tabs__header')
        .exists()
    ).toBe(false)

    await wrapper.setProps({ scroll: true })
    expect(
      wrapper
        .find('.at-tabs--scroll')
        .exists()
    ).toBe(true)

    expect(
      wrapper
        .find('view.at-tabs__header')
        .exists()
    ).toBe(false)

    const scrollView = wrapper.find('scroll-view.at-tabs__header')
    expect(scrollView.exists()).toBe(true)
    expect(scrollView.element).toMatchSnapshot()
  })

  it('should render prop tabDirection', async () => {
    const wrapper = mountFn({
      tabList
    })

    expect(
      wrapper
        .find('.at-tabs--horizontal')
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find('.at-tabs--vertical')
        .exists()
    ).toBe(false)

    expect(
      wrapper
        .find('.at-tabs__underline')
        .attributes('style')
    ).toContain(`width: ${tabList.length * 100}%;`)

    expect(
      wrapper
        .find('.at-tabs__body')
        .attributes('style')
    ).toContain(`transform: translate3d(-0%, 0px, 0px);`)

    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({
      tabDirection: 'vertical',
      scroll: true
    })

    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .find('.at-tabs--horizontal')
        .exists()
    ).toBe(false)
    expect(
      wrapper
        .find('.at-tabs--vertical')
        .exists()
    ).toBe(true)

    expect(
      wrapper
        .find('.at-tabs__underline')
        .attributes('style')
    ).toContain(`height: ${tabList.length * 100}%;`)

    expect(
      wrapper
        .find('.at-tabs__body')
        .attributes('style')
    ).toContain(`transform: translate3d(0px, -${0 * 100}%, 0px);`)

    expect(
      wrapper
        .find('.at-tabs__header')
        .attributes('scroll-y')
    ).toBe('true')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop animated', () => {
    const wrapper = mountFn({
      tabList,
      animated: false
    })

    expect(
      wrapper
        .find('.at-tabs__body')
        .attributes('style')
    ).toContain('transition: unset;')
  })

  it('should render prop height', () => {
    const wrapper = mountFn({
      tabList,
      tabDirection: 'vertical',
      height: '300px',
      // scroll: true,
    })

    expect(
      wrapper
        .find('.at-tabs__header')
        .element
    ).toMatchSnapshot()

    expect(
      wrapper
        .find('.at-tabs')
        .attributes('style')
    ).toContain('height: 300px;')

    // expect(
    //   wrapper
    //     .find('.at-tabs__header')
    //     .attributes('style')
    // ).toContain('height: 300px;')

    expect(
      wrapper
        .find('.at-tabs__body')
        .attributes('style')
    ).toContain('height: 300px;')
  })

  it('should render slot content', () => {
    const wrapper = mountFn(
      { tabList },
      { default: () => [h('view', { class: "test" }, "slot content")] }
    )

    expect(
      wrapper
        .find('.at-tabs__body > .test')
        .text()
    ).toBe('slot content')
  })
})

describe('AtTabs events', () => {
  const mountFn = genMountFn(AtTabs)

  const tabList = [
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' }
  ]

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      tabList,
      onClick
    })

    const tabs = wrapper.findAll('.at-tabs__item')
    await tabs[1].trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect((wrapper.emitted()['click'][0] as Array<any>)[0]).toEqual(1)
    expect(onClick).toBeCalled()
  })

  it('should switch between tabs when swipeable is true', async () => {
    const current = ref(0)
    const onClick = jest.fn((i, e) => {
      current.value = i
    })

    const wrapper = mountFn({
      tabList,
      current,
      swipeable: true,
      onClick
    }, {
      default: () => [
        h('view', { class: "test" }, "slot content")
      ]
    })

    expect(
      wrapper
        .findAll('.at-tabs__item')[0]
        .classes()
    ).toContain('at-tabs__item--active')

    // swipe towards left
    let tabBody = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      tabBody,
      {
        clientX: 372,
        clientY: 392,
        pageX: 372,
        pageY: 792
      },
      {
        clientX: 103,
        clientY: 392,
        pageX: 103,
        pageY: 792
      }
    )

    expect(current.value).toBe(1)
    expect(
      wrapper
        .findAll('.at-tabs__item')[1]
        .classes()
    ).toContain('at-tabs__item--active')

    // swipe towards left
    tabBody = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      tabBody,
      {
        clientX: 372,
        clientY: 392,
        pageX: 372,
        pageY: 792,
      },
      {
        clientX: 103,
        clientY: 392,
        pageX: 103,
        pageY: 792,
      }
    )

    expect(current.value).toBe(2)
    expect(
      wrapper
        .findAll('.at-tabs__item')[2]
        .classes()
    ).toContain('at-tabs__item--active')

    // swipe towards right
    tabBody = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      tabBody,
      {
        clientX: 40,
        clientY: 392,
        pageX: 40,
        pageY: 792
      },
      {
        clientX: 300,
        clientY: 392,
        pageX: 300,
        pageY: 792
      }
    )

    expect(current.value).toBe(1)
    expect(
      wrapper
        .findAll('.at-tabs__item')[1]
        .classes()
    ).toContain('at-tabs__item--active')
  })

  it('should not be swipeable when tab direction is vertical', async () => {
    const current = ref(0)
    const handleClick = jest.fn((index, e) => {
      current.value = index
    })

    const wrapper = mountFn(
      {
        tabList,
        current,
        swipeable: true,
        tabDirection: "vertical",
        onClick: handleClick
      },
      { default: () => [h('view', { class: "test" }, "slot content")] }
    )

    // swipe towards left
    let tabBody = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      tabBody,
      {
        clientX: 372,
        clientY: 392,
        pageX: 372,
        pageY: 792,
      },
      {
        clientX: 103,
        clientY: 392,
        pageX: 103,
        pageY: 792,
      }
    )

    expect(handleClick).not.toBeCalled()
    expect(current.value).not.toEqual(1)
    expect(current.value).toBe(0)
  })
})