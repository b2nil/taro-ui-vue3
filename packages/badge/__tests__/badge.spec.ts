import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { h } from 'vue'
import AtBadge from '../index.vue'

const mountFn = genMountFn(AtBadge)

describe('AtBadge', () => {
  it('should render default and match snapshot', () => {
    const wrapper = mountFn({ dot: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent.each`
    value
    ${3}
    50
    100
    NotANumber
  `('should render prop value=$value', async ({ value }) => {
    const wrapper = mountFn({ value })
    const text = Number.isNaN(+value)
      ? value
      : (+value) > 99
        ? `99+`
        : `${value}`

    expect(
      wrapper
        .find('.at-badge__num')
        .text()
    ).toEqual(text)
  })

  it.concurrent('should not render prop value if empty', async () => {
    const wrapper = mountFn()
    expect(
      wrapper
        .find('.at-badge__num')
        .exists()
    ).toBeFalsy()

    await wrapper.setProps({ value: '' })
    expect(
      wrapper
        .find('.at-badge__num')
        .exists()
    ).toBeFalsy()
  })

  it.concurrent.each`
    dot
    ${true}
    ${false}
  `('should render prop dot=$dot', async ({ dot }) => {
    const wrapper = mountFn({ dot })
    expect(
      wrapper
        .find('.at-badge__dot')
        .exists()
    ).toBe(dot)
  })

  it.concurrent.each([
    9,
    50
  ])('should render prop maxValue=%i', async (maxValue) => {
    const wrapper = mountFn({ value: 10, maxValue })
    const numEl = wrapper.find('.at-badge__num')
    expect(numEl.exists()).toBeTruthy()
    expect(numEl.text()).toEqual(10 > maxValue ? `${maxValue}+` : '10')
  })

  it.concurrent('should render slot content', async () => {
    const wrapper = mountFn({}, {
      default: [h('view', { class: 'test' }, { default: () => 'test' })]
    })
    const slotEL = wrapper.find('.test')
    expect(slotEL.exists()).toBeTruthy()
    expect(slotEL.text()).toEqual('test')
  })
})