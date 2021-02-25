import { mount } from '@vue/test-utils'
import AtFloatLayout from '../index'
import { sleep } from '@/tests/helper'

const factory = (
  values = {},
  slots = {
    default: [
      `这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
随你怎么写`,
    ],
  }
) => {
  return mount(AtFloatLayout as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('FloatLayout', () => {
  it('should render default FloatLayout', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isOpened', () => {
    const wrapper = factory({ isOpened: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- title', () => {
    const wrapper = factory({ title: '这是个标题', isOpened: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('FloatLayout Behavior ', () => {
  it('should trigger onClose', async () => {
    const onClose = jest.fn()
    const wrapper = factory({
      title: '这是个标题',
      isOpened: true,
      onClose: onClose,
    })
    wrapper.find('.at-float-layout__overlay').trigger('tap')
    await sleep(0)
    expect(onClose).toBeCalled()
  })
})
