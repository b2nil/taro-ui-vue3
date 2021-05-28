import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtLoading from '../index.vue'

const mountFn = genMountFn(AtLoading)

describe('AtLoading', () => {
  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop class', async () => {
    const wrapper = mountFn({ class: 'test' })
    expect(
      wrapper
        .get('.at-loading')
        .classes()
    ).toContain('test')
  })

  it.concurrent('should render prop style', async () => {
    const wrapper = mountFn({ style: 'color: red;' })
    expect(
      wrapper
        .get('.at-loading')
        .attributes('style')
    ).toContain('color: red;')
  })

  it.concurrent('should render props size', async () => {
    const wrapper = mountFn({ size: 15 })
    const expected = `width: ${pxTransformMockFn(15, undefined)}; height: ${pxTransformMockFn(15, undefined)};`

    expect(
      wrapper
        .get('.at-loading')
        .attributes('style')
    ).toEqual(expected)

    expect(
      wrapper
        .get('.at-loading__ring')
        .attributes('style')
    ).toContain(expected)
  })

  it.concurrent('should render props color', async () => {
    const wrapper = mountFn({ color: '#fff' })
    const elStyle = wrapper.get('.at-loading__ring').attributes('style')

    expect(elStyle).toContain('border: 1px solid #fff;')
    expect(elStyle).toContain(
      'border-color: #fff transparent transparent transparent;'
    )
  })

  it.concurrent('should render three loading ring', async () => {
    const wrapper = mountFn()
    expect(
      wrapper.findAll('.at-loading__ring').length
    ).toEqual(3)
  })
})