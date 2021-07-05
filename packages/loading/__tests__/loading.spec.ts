import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtLoading from '../index.vue'

const mountFn = genMountFn(AtLoading)

describe('AtLoading', () => {
  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  testPropClassAndStyle(mountFn)

  it('should render props size', async () => {
    const wrapper = mountFn({ size: 15 })
    const expected = `width: ${pxTransformMockFn(15)}; height: ${pxTransformMockFn(15)};`

    expect(
      wrapper
        .find('.at-loading')
        .attributes('style')
    ).toEqual(expected)

    expect(
      wrapper
        .find('.at-loading__ring')
        .attributes('style')
    ).toContain(expected)
  })

  it('should render props color', async () => {
    const wrapper = mountFn({ color: '#fff' })
    const elStyle = wrapper.get('.at-loading__ring').attributes('style')

    expect(elStyle).toContain('border: 1px solid #fff;')
    expect(elStyle).toContain(
      'border-color: #fff transparent transparent transparent;'
    )
  })

  it('should render three loading ring', async () => {
    const wrapper = mountFn()
    expect(
      wrapper.findAll('.at-loading__ring').length
    ).toEqual(3)
  })
})