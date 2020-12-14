import { mount } from '@vue/test-utils'
import AtBadge from '../index'
import AtButton from '../../button/index'
import AtLoading from '../../loading/index'

const factory = (values = {}, slots = { default: ['<AtButton loading>按钮文字</AtButton>'] }) => {
  return mount(AtBadge as any, {
    global: {
      components: {
        AtButton,
        AtLoading,
      }
    },
    slots,
    props: { ...values },
  })
}

describe('AtBadge Snap', () => {
  it('should render AtBadge -- props value', () => {
    const wrapper = factory({ value: '3' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtBadge -- props dot', () => {
    const wrapper = factory({ dot: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtBadge -- props maxValue', () => {
    const wrapper = factory({ value: '10', maxValue: 9 })
    expect(wrapper.element).toMatchSnapshot()
  })
})
