import { mount } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtBadge from '../index'
import AtButton from '../../button/index'
import AtLoading from '../../loading/index'

const factory = (
  props = {},
  slots = {
    default: [
      h(AtButton, { loading: true }, { default: () => '按钮文字' })
    ]
  }
) => {
  return mount(AtBadge as any, {
    global: {
      components: {
        AtButton,
        AtLoading,
      }
    },
    slots,
    props
  })
}

describe('AtBadge', () => {
  it('should render prop -- value', () => {
    const wrapper = factory({ value: '3' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- dot', () => {
    const wrapper = factory({ dot: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- maxValue', () => {
    const wrapper = factory({ value: '10', maxValue: 9 })
    expect(wrapper.element).toMatchSnapshot()
  })
})
