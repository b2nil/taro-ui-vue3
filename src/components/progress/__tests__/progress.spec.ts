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

describe('Progress Snap', () => {
  it('should render initial Progress', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props percent', () => {
    const wrapper = factory({ percent: 25 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props isHidePercent', () => {
    const wrapper = factory({ isHidePercent: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props color', () => {
    const wrapper = factory({ color: '#FF4949' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props status(progress)', () => {
    const wrapper = factory({ status: 'progress' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props status(error)', () => {
    const wrapper = factory({ status: 'error' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Progress -- props status(success)', () => {
    const wrapper = factory({ status: 'success' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
