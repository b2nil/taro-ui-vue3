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

describe('AtLoading', () => {
  it('should render default AtLoading', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size', () => {
    const wrapper = factory({ size: 15 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
