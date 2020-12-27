import { mount } from '@vue/test-utils'
import { VNode } from '@vue/runtime-core'
import AtCurtain from '../index'

const factory = (
  values = {},
  slots: { default: Array<VNode | string> } = { default: [] }
) => {
  return mount(AtCurtain as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtCurtain', () => {
  it('should render default AtCurtain', () => {
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

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isOpened', () => {
    const wrapper0 = factory({ isOpened: true })
    expect(wrapper0.element).toMatchSnapshot()
    const wrapper1 = factory({ isOpened: false })
    expect(wrapper1.element).toMatchSnapshot()
  })

  it('should render prop -- closeBtnPosition', () => {
    const wrapper0 = factory({ closeBtnPosition: 'top' }, { default: ['test'] })
    expect(wrapper0.element).toMatchSnapshot()
    const wrapper1 = factory({ closeBtnPosition: 'bottom' }, { default: ['test'] })
    expect(wrapper1.element).toMatchSnapshot()
  })
})
