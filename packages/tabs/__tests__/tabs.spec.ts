import { mountFactory, Slots, triggerTouchEvents } from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import { ref } from 'vue'
import AtTabs from '../index'

const factory = (props = {}, slots?: Slots) => {
  return mountFactory(AtTabs, undefined, props, slots)
}

const tabList = [
  { title: '标签页1' },
  { title: '标签页2' },
  { title: '标签页3' }
]

describe('AtTabs', () => {

  beforeEach(() => {
    jest.useFakeTimers()
    jest.advanceTimersByTime(100)
    jest.runAllTimers()
  })

  it('should render default AtTabs', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color: red;' })
    expect(
      wrapper
        .find('.at-tabs')
        .attributes('style')
    ).toContain('color: red;')
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(
      wrapper
        .find('.at-tabs')
        .classes()
    ).toContain('test')
  })

  it('should render prop -- tabList', () => {
    const wrapper = factory({ tabList: tabList })
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

  it('should render prop -- current', async () => {
    const wrapper = factory({
      tabList: tabList
    })

    const activeTab = wrapper.find('.at-tabs__item--active')
    const tabs = wrapper.findAll('.at-tabs__item')
    expect(tabs[0].html()).toEqual(activeTab.html())

    await wrapper.setProps({ current: 2 })
    const activeTab1 = wrapper.find('.at-tabs__item--active')
    const tabs1 = wrapper.findAll('.at-tabs__item')
    expect(tabs1[2].html()).toEqual(activeTab1.html())
  })

  it('should render prop -- scroll', async () => {
    const wrapper = factory({
      tabList: tabList
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

  it('should render prop -- tabDirection', async () => {
    const wrapper = factory({
      tabList: tabList
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
        .attributes('scrolly')
    ).toBe('true')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- animated', () => {
    const wrapper = factory({
      tabList: tabList,
      animated: false
    })

    expect(
      wrapper
        .find('.at-tabs__body')
        .attributes('style')
    ).toContain('transition: unset;')
  })

  it('should render prop -- height', () => {
    const wrapper = factory({
      tabList: tabList,
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
    const wrapper = factory(
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

describe('AtTabs Behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.advanceTimersByTime(100)
    jest.runAllTimers()
  })

  it('should trigger onClick', async () => {
    const onClick = jest.fn()
    const wrapper = factory({
      tabList: tabList,
      onClick: onClick
    })

    const tabs = wrapper.findAll('.at-tabs__item')
    await tabs[1].trigger('tap')

    expect(onClick).toBeCalled()
  })

  it('should switch between tabs when swipeable is true', async () => {
    const current = ref(0)
    const handleClick = jest.fn((index) => {
      current.value = index
    })

    const wrapper = factory(
      {
        tabList,
        current,
        swipeable: true,
        onClick: handleClick
      },
      { default: () => [h('view', { class: "test" }, "slot content")] }
    )

    expect(
      wrapper
        .findAll('.at-tabs__item')[0]
        .classes()
    ).toContain('at-tabs__item--active')

    // swipe towards left
    let bodyEl = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      bodyEl,
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

    await wrapper.vm.$nextTick()
    expect(current.value).toBe(1)
    expect(
      wrapper
        .findAll('.at-tabs__item')[1]
        .classes()
    ).toContain('at-tabs__item--active')

    // swipe towards left
    bodyEl = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      bodyEl,
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
    bodyEl = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      bodyEl,
      {
        clientX: 40,
        clientY: 392,
        pageX: 40,
        pageY: 792,
      },
      {
        clientX: 300,
        clientY: 392,
        pageX: 300,
        pageY: 792,
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
    const handleClick = jest.fn((index) => {
      current.value = index
    })

    const wrapper = factory(
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
    let bodyEl = wrapper.find('.at-tabs__body')
    await triggerTouchEvents(
      bodyEl,
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