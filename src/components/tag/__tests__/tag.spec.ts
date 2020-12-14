import { mount } from '@vue/test-utils'
import AtTag from '../index'

const factory = (values = {}, slots = { default: ['标签'] }) => {
  return mount(AtTag as any, {
    slots,
    props: { ...values },
  })
}

describe('AtTag Snap', () => {
  it('should render AtTag -- props size', () => {
    const wrapper = factory({ size: 'small' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTag -- props type', () => {
    const wrapper = factory({ type: 'primary' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTag -- props name', () => {
    const wrapper = factory({ name: 'tag-01' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTag -- props circle', () => {
    const wrapper = factory({ circle: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTag -- props active', () => {
    const wrapper = factory({ active: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTag -- props disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtTag Event', () => {
  it('AtTag onClick', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('AtTag onClick not to be called(disabled)', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, disabled: true })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick).not.toBeCalled()
  })

  it('AtTag onClick params {name, active}', () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick, name: 'tag-01' })
    wrapper.find('.at-tag').trigger('tap')
    expect(onClick.mock.calls[0][0].name).toEqual('tag-01')
    expect(onClick.mock.calls[0][0].active).toBeFalsy()
  })
})
