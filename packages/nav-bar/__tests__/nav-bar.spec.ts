import {
  hexToRGBA,
  genMountFn,
  testPropClassAndStyle,
  expectIconClassesAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import { DOMWrapper } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtNavBar from '../index.vue'

const mountFn = genMountFn(AtNavBar)

describe('AtNavBar', () => {
  testPropClassAndStyle(mountFn)

  it('should render default nav-bar', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop fixed', async () => {
    const wrapper = mountFn()
    expect(wrapper.classes()).not.toContain('at-nav-bar--fixed')

    await wrapper.setProps({ fixed: true })
    expect(wrapper.classes()).toContain('at-nav-bar--fixed')
  })

  it('should render prop border', async () => {
    const wrapper = mountFn()
    expect(wrapper.classes()).not.toContain('at-nav-bar--no-border')

    await wrapper.setProps({ border: false })
    expect(wrapper.classes()).toContain('at-nav-bar--no-border')
  })

  it('should render prop color', () => {
    const wrapper = mountFn({ color: '#fff' })
    const views: DOMWrapper<Element>[] = []
    const leftView = wrapper.find('.at-nav-bar__left-view')
    const rightView2 = wrapper.find('.at-nav-bar__container:nth-child(1)')
    const rightView1 = wrapper.find('.at-nav-bar__container:nth-child(2)')

    views.push(leftView, rightView2, rightView1)
    views.forEach(el => {
      expect(
        el.attributes('style')
      ).toEqual(`color: ${hexToRGBA('#fff')};`)
    })
  })

  it('should render prop leftIconType -- string', () => {
    const wrapper = mountFn()
    const leftIcon = wrapper
      .find('.at-nav-bar__left-view text:nth-child(1)')

    expectIconClassesAndStyle(leftIcon, {
      value: 'chevron-left',
      size: 24 * 2
    }, pxTransformMockFn)
  })

  it('should render prop leftIconType -- iconInfo', () => {
    const leftIconType = { value: 'test', color: 'red', size: 36 }
    const wrapper = mountFn({
      leftIconType
    })

    const leftIcon = wrapper
      .find('.at-nav-bar__left-view text:nth-child(1)')

    expectIconClassesAndStyle(
      leftIcon,
      {
        ...leftIconType,
        size: leftIconType.size * 2
      },
      pxTransformMockFn
    )

  })

  it('should render prop leftText', () => {
    const wrapper = mountFn({ leftText: 'test' })
    const leftText = wrapper.find('.at-nav-bar__text')
    expect(leftText.exists()).toBeTruthy()
    expect(leftText.text()).toEqual('test')
  })

  it('should render title using prop title', () => {
    const wrapper = mountFn({ title: 'prop title' })
    const titleEl = wrapper.find('.at-nav-bar__title text')
    expect(titleEl.exists()).toBeTruthy()
    expect(titleEl.text()).toEqual('prop title')
  })

  it('should render title using slot', () => {
    const wrapper = mountFn({}, {
      default: [h('view', { class: 'slot-title' }, 'slot title')]
    })
    const titleEl = wrapper.find('.at-nav-bar__title view')
    expect(titleEl.exists()).toBeTruthy()
    expect(titleEl.text()).toEqual('slot title')
  })

  it.each([
    'string',
    'iconInfo'
  ])('should render prop rightFirstIconType and rightSecondIconType -- %s', async (iconType) => {
    let rightFirstIconType: string | AtIconBaseProps
    let rightSecondIconType: string | AtIconBaseProps

    const baseIconInfo: AtIconBaseProps = {
      value: 'test',
      size: 24
    }
    if (iconType === 'string') {
      rightFirstIconType = baseIconInfo.value
      rightSecondIconType = baseIconInfo.value
    } else {
      baseIconInfo.class = 'test'
      baseIconInfo.color = 'red'
      rightFirstIconType = baseIconInfo
      rightSecondIconType = baseIconInfo
    }

    const wrapper = mountFn({
      rightFirstIconType,
      rightSecondIconType
    })

    const rightView = wrapper.find('.at-nav-bar__right-view')
    const secondIcon = rightView.find('view:nth-child(1) text')
    const firstIcon = rightView.find('view:nth-child(2) text')

    expect(
      rightView.find('view:nth-child(1)').classes()
    ).not.toContain('at-nav-bar__container--hide')
    expect(
      rightView.find('view:nth-child(2)').classes()
    ).not.toContain('at-nav-bar__container--hide')

    expectIconClassesAndStyle(
      secondIcon,
      {
        ...baseIconInfo,
        size: parseInt(`${baseIconInfo.size!}`) * 2
      },
      pxTransformMockFn
    )
    expectIconClassesAndStyle(
      firstIcon,
      {
        ...baseIconInfo,
        size: parseInt(`${baseIconInfo.size!}`) * 2
      },
      pxTransformMockFn
    )
  })
})

describe('AtNavBar events ', () => {
  it('should emit click-left-icon', async () => {
    const onClickLeftIcon = jest.fn()
    const wrapper = mountFn({
      leftIconType: 'test',
      onClickLeftIcon,
    })
    await wrapper.find('.at-nav-bar__left-view').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click-left-icon')
    expect(onClickLeftIcon).toBeCalled()
  })

  it('should emit click-right-second-icon', async () => {
    const onClickRightSecondIcon = jest.fn()
    const wrapper = mountFn({
      rightSecondIconType: 'test',
      onClickRightSecondIcon,
    })
    await wrapper
      .find('.at-nav-bar__right-view view:first-child')
      .trigger('tap')

    expect(
      wrapper.emitted()
    ).toHaveProperty('click-right-second-icon')
    expect(onClickRightSecondIcon).toBeCalled()
  })

  it('should emit click-right-first-icon', async () => {
    const onClickRightFirstIcon = jest.fn()
    const wrapper = mountFn({
      rightFirstIconType: 'test',
      onClickRightFirstIcon,
    })
    await wrapper
      .find('.at-nav-bar__right-view view:last-child')
      .trigger('tap')

    expect(
      wrapper.emitted()
    ).toHaveProperty('click-right-first-icon')
    expect(onClickRightFirstIcon).toBeCalled()
  })
})
