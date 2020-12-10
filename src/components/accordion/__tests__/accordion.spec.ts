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
  it('render initial AtAccordion', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtAccordion -- props title', () => {
    const wrapper = factory({
      title: 'title',
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtAccordion -- props open', async () => {
    const wrapper = factory({
      open: true,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtAccordion -- props icon', () => {
    const wrapper = factory(
      {
        icon: { value: 'chevron-down', color: 'red' },
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtAccordion -- props icon prefixClass', () => {
    const wrapper = factory(
      {
        icon: { prefixClass: 'prefixClass', value: 'star', color: 'red' },
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtAccordion -- props note', () => {
    const wrapper = factory(
      {
        note: 'note',
      },
      {
        default: [h('view', null, 'test')],
      }
    )
    expect(wrapper.element).toMatchSnapshot()
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
