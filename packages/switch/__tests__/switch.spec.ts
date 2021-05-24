import { mount } from '@vue/test-utils'
import AtSwitch from '../index'

const factory = (values = {}, slots = { default: ['标签'] }) => {
  return mount(AtSwitch as any, {
    slots,
    props: { ...values },
  })
}

describe('AtSwitch', () => {
  it('should render default AtSwitch', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- title', () => {
    const wrapper = factory({ title: '开启中' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- checked', () => {
    const wrapper = factory({ title: '开启中', checked: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- border', () => {
    const wrapper = factory({ title: '开启中', border: false })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- disabled', () => {
    const wrapper1 = factory({ title: '开启中', checked: true, disabled: true })
    expect(wrapper1.element).toMatchSnapshot()
    const wrapper2 = factory({ title: '开启中', disabled: true })
    expect(wrapper2.element).toMatchSnapshot()
  })
})

describe('AtSwitch Behavior', () => {
  it('should trigger onChange', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ title: '开启中', onChange: onChange })
    await wrapper.find('.at-switch .at-switch__switch').trigger('change', { detail: { value: false } })
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0].value).toBeFalsy()
  })
})
