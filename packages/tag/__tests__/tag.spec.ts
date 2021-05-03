import { mount } from '@vue/test-utils'
import AtTag from '../index'

const factory = (values = {}, slots = { default: ['标签'] }) => {
  return mount(AtTag as any, {
    slots,
    props: { ...values },
  })
}

describe('AtTag', () => {
  it('should render prop -- size', () => {
    const wrapper = factory({ size: 'small' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- type', () => {
    const wrapper = factory({ type: 'primary' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- name', () => {
    const wrapper = factory({ name: 'tag-01' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- circle', () => {
    const wrapper = factory({ circle: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- active', () => {
    const wrapper = factory({ active: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtTag Behavior', () => {
  it('should trigger onClick', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('should not trigger onClick when disabled', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, disabled: true })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick).not.toBeCalled()
  })

  it('onClick should have params {name, active}', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, name: 'tag-01' })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick.mock.calls[0][0].name).toEqual('tag-01')
    expect(onClick.mock.calls[0][0].active).toBeFalsy()
  })
})
