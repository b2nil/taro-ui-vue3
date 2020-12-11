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

describe('ActivityIndicator Snap', () => {
  it('should render initial ActivityIndicator', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ActivityIndicator -- props size', () => {
    const wrapper = factory({ size: 32 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ActivityIndicator -- props color', () => {
    const wrapper = factory({ color: '#13CE66' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ActivityIndicator -- props content', () => {
    const wrapper = factory({ content: '加载中...' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ActivityIndicator -- props mode', () => {
    const wrapper = factory({ mode: 'center' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ActivityIndicator -- props isOpened', () => {
    const wrapper = factory({ isOpened: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})
