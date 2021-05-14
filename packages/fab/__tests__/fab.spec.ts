import { mount } from '@vue/test-utils'
import AtFab from '../index'

const factory = (values = {}, slots = { default: ['按钮'] }) => {
  return mount(AtFab as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtFab', () => {
  it('should render default AtFab', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'button' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size small', () => {
    const wrapper = factory({ size: 'small' })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtFab Behavior', () => {
  it('should trigger onClick', async () => {
    const onClick = jest.fn()
    const wrapper = factory({ onClick: onClick })

    await wrapper.find('.at-fab').trigger('tap')
    expect(onClick).toBeCalled()
  })
})
