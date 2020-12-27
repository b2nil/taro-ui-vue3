import { mountFactory, Slots } from '@/tests/helper'
import { h } from '@vue/runtime-core'
import AtSkeleton from '../index'

const factory = (props = {}, slots?: Slots) => {
  return mountFactory(AtSkeleton, {}, props, slots)
}

describe('AtSkeleton', () => {

  it('should generate an array of elements based upon @ value', () => {
    const wrapper = factory({
      loading: true,
      type: 'text@4'
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAll('.at-skeleton__bone').length).toBe(4)
  })

  it('should generate a skeleton recursive tree', () => {
    const rootTypes = {
      actions: 'button@2',
      article: 'heading, paragraph',
      avatar: 'avatar',
      button: 'button',
      card: 'image, card-heading',
      'card-avatar': 'image, list-item-avatar',
      'card-heading': 'heading',
      chip: 'chip',
      'date-picker': 'list-item, card-heading, divider, date-picker-options, date-picker-days, actions',
      'date-picker-options': 'text, avatar@2',
      'date-picker-days': 'avatar@28',
      heading: 'heading',
      image: 'image',
      'list-item': 'text',
      'list-item-avatar': 'avatar, text',
      'list-item-two-line': 'sentences',
      'list-item-avatar-two-line': 'avatar, sentences',
      'list-item-three-line': 'paragraph',
      'list-item-avatar-three-line': 'avatar, paragraph',
      paragraph: 'text@3',
      sentences: 'text@2',
      table: 'table-heading, table-thead, table-tbody, table-tfoot',
      'table-heading': 'heading, text',
      'table-thead': 'heading@6',
      'table-tbody': 'table-row-divider@6',
      'table-row-divider': 'table-row, divider',
      'table-row': 'table-cell@6',
      'table-cell': 'text',
      'table-tfoot': 'text@2, avatar@2',
      text: 'text'
    }

    for (const key in rootTypes) {
      const type = rootTypes[key]

      const iteration = factory({ type: type, loading: true })

      expect(iteration.element).toMatchSnapshot()
    }
  })

  it('should dynamically render content', async () => {
    const wrapper = factory({}, { default: [h('view', null, 'foobar')] })

    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ loading: true })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have the correct a11y attributes when loading', async () => {
    const wrapper = factory(
      { loading: true },
      {
        default: [h('view', null, 'foobar')]
      })

    const el = wrapper.find('.at-skeleton')
    expect(el.element).toMatchSnapshot()

    expect(el.attributes('aria-busy')).toBe('true')
    expect(el.attributes('aria-live')).toBe('polite')
    expect(el.attributes('role')).toBe('alert')

    await wrapper.setProps({ loading: false })

    expect(wrapper.find('.at-skeleton').attributes('aria-busy')).toBeUndefined()
    expect(wrapper.find('.at-skeleton').attributes('aria-live')).toBeUndefined()
    expect(wrapper.find('.at-skeleton').attributes('role')).toBeUndefined()
  })

  it('should not render aria attributes when using boilerplate', async () => {
    const wrapper = factory({ boilerplate: true })

    expect(
      wrapper.find('.at-skeleton').attributes()
    ).toEqual({
      "class": "at-skeleton--boilerplate at-skeleton--is-loading at-skeleton"
    })

    await wrapper.setProps({ loading: true })
    expect(
      wrapper.find('.at-skeleton').attributes()
    ).toEqual({
      "class": "at-skeleton--boilerplate at-skeleton--is-loading at-skeleton"
    })
  })

  it('should render transition stub', () => {
    const wrapper = factory({
      type: 'text',
      loading: true,
      transition: ".3s ease"
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})