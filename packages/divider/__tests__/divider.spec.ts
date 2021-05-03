import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import AtDivider from '../index'

const factory = (values = {}, slots: Slots = { default: [] }) => {
  return mountFactory(
    AtDivider,
    {},
    values,
    slots
  )
}

describe('AtDivider', () => {
  it('should render default AtDivider', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- content', () => {
    const wrapper = factory({ content: 'content' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- height', () => {
    const wrapper = factory({ height: '120' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- fontColor', () => {
    const wrapper = factory({ fontColor: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- fontSize', () => {
    const wrapper = factory({ fontSize: '56' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- lineColor', () => {
    const wrapper = factory({ lineColor: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- childen', () => {
    const wrapper = factory({ childen: 'content' }, { default: ['test'] })
    expect(wrapper.element).toMatchSnapshot()
  })
})
