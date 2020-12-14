import { mount } from '@vue/test-utils'
import AtLoading from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtLoading as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtLoading Snap', () => {
  it('should render initial AtLoading', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtLoading -- props size', () => {
    const wrapper = factory({ size: 15 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtLoading -- props color', () => {
    const wrapper = factory({ color: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
