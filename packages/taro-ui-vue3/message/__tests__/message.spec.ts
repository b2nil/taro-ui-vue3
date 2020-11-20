import { mount } from '@vue/test-utils'
import AtMessage from '../src/index.vue'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtMessage, {
    components: {},
    slots,
    props: { ...values },
  })
}

describe('AtMessage Snap', () => {
  it('render initial AtMessage', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtMessage -- props className', () => {
    const wrapper = factory({ className: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtMessage -- props customStyle', () => {
    const wrapper = factory({ customStyle: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
