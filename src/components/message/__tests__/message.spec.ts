import { mount } from '@vue/test-utils'
import AtMessage from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtMessage as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtMessage', () => {
  it('should render default AtMessage', () => {
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
})
