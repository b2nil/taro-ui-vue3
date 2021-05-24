import { mount } from '@vue/test-utils'
import AtProgress from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtProgress as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('Progress', () => {
  it('should render default Progress', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- percent', () => {
    const wrapper = factory({ percent: 25 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isHidePercent', () => {
    const wrapper = factory({ isHidePercent: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: '#FF4949' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status(progress)', () => {
    const wrapper = factory({ status: 'progress' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status(error)', () => {
    const wrapper = factory({ status: 'error' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- status(success)', () => {
    const wrapper = factory({ status: 'success' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
