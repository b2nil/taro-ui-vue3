import { mount } from '@vue/test-utils'
import AtFlex from '../src/index.vue'
import AtFlexItem from '../src/item/index.vue'

const AXIOM = 'Rem is the best girl'
const factory = (values = {}, slots = { default: ['按钮'] }) => {
  return mount(AtFlex, {
    components: {
      AtFlexItem
    },
    slots,
    props: { ...values }
  })
}

describe('AtFlex.vue', () => {
  test('render test', () => {
    const wrapper = factory()
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
