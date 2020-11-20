import { mount } from '@vue/test-utils'
import AtBadge from '../src/index.vue'
import AtButton from '@taro-ui-vue3/button'
import AtLoading from '@taro-ui-vue3/loading'

const factory = (values = {}, slots = { default: ['<AtButton loading>按钮文字</AtButton>'] }) => {
  return mount(AtBadge, {
    components: {
      AtButton,
      AtLoading,
    },
    slots,
    props: { ...values },
  })
}

describe('AtBadge Snap', () => {
  it('render AtBadge -- props value', () => {
    const wrapper = factory({ value: '3' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtBadge -- props dot', () => {
    const wrapper = factory({ dot: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtBadge -- props maxValue', () => {
    const wrapper = factory({ value: '10', maxValue: 9 })
    expect(wrapper.element).toMatchSnapshot()
  })
})
