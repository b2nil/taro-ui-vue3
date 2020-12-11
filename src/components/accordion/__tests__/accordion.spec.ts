import { mount } from '@vue/test-utils'
import { h, VNode } from '@vue/runtime-core'
import AtAccordion from '../index'

const factory = (
  values = {},
  slots: { default: Array<string | VNode> } = { default: ['按钮'] }
) => {
  return mount(AtAccordion as any, {
    slots,
    props: { ...values },
  })
}

describe('AtAccordion', () => {
  it('should render AtAccordion without passing any prop', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('shoud render AtAccordion -- props title', () => {
    const wrapper = factory({
      title: 'title',
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(
      wrapper.find('.at-accordion__info__title').text()
    ).toEqual('title')
  })

  it('should render AtAccordion -- props open', async () => {
    const wrapper = factory({
      open: true,
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-accordion__arrow--folded").exists()).toBeTruthy()
    expect(wrapper.find(".at-accordion__content--inactive").exists()).not.toBeTruthy()

    await wrapper.setProps({ open: false })
    expect(wrapper.find(".at-accordion__arrow--folded").exists()).not.toBeTruthy()
  })

  it('should render AtAccordion -- props icon', () => {
    const wrapper = factory(
      {
        icon: { value: 'chevron-down', color: 'red', size: 10 },
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-chevron-down").exists()).toBeTruthy()
    expect(
      wrapper.find(".at-icon-chevron-down").attributes().style
    ).toBe("color: red; font-size: 10px;")
  })

  it('should render AtAccordion -- props icon prefixClass', () => {
    const wrapper = factory(
      {
        icon: { prefixClass: 'prefixClass', value: 'star', color: 'red' },
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()

    const iconElement = wrapper.find(".at-accordion__icon")
    expect(iconElement.classes()).toContain('prefixClass')
    expect(iconElement.classes()).toContain('prefixClass-star')
  })

  it('should render AtAccordion -- props note', () => {
    const wrapper = factory(
      {
        note: 'note',
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()
    expect(
      wrapper.find('.at-accordion__info__note').text()
    ).toEqual('note')
  })
})

describe('AtAccordion Event', () => {
  it('toggle accordion', () => {
    const onClick = jest.fn()
    const wrapper = factory({
      onClick: onClick,
    })
    wrapper.find('.at-accordion__header').trigger('tap')
    expect(onClick).toBeCalled()
  })
})
