import { mount } from '@vue/test-utils'
import AtIcon from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtIcon as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtIcon', () => {
  it('should render default AtIcon', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- value', () => {
    const wrapper = factory({ value: 'star' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size', () => {
    const wrapper = factory({ size: '14' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- prefixClass', () => {
    const wrapper = factory({ prefixClass: 'prefixClass', value: 'star' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtIcon Behavior', () => {
  it('should trigger onClick', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick })

    wrapper.find('.at-icon').trigger('tap')
    expect(onClick).toBeCalled()
  })
})
