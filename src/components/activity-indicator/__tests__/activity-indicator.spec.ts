import { mount } from '@vue/test-utils'
import ActivityIndicator from '../index'
import AtLoading from '../../loading'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(ActivityIndicator as any, {
    slots,
    global: {
      components: { AtLoading }
    },
    props: { ...values },
  })
}

describe('ActivityIndicator', () => {
  it('should render default ActivityIndicator', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size', () => {
    const wrapper = factory({ size: 32 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: '#13CE66' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- content', () => {
    const wrapper = factory({ content: '加载中...' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- mode', () => {
    const wrapper = factory({ mode: 'center' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isOpened', () => {
    const wrapper = factory({ isOpened: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})
