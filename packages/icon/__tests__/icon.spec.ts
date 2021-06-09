import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtIcon from '../index.vue'

const mountFn = genMountFn(AtIcon)

describe('AtIcon', () => {
  it.concurrent('should render prop value and match snapshot', async () => {
    const wrapper = mountFn({ value: 'star' })
    expect(wrapper.classes()).toContain('at-icon-star')
  })

  it.concurrent('should render prop color', async () => {
    const wrapper = mountFn({ value: 'star', color: '#fff' })
    expect(
      wrapper.attributes('style')
    ).toContain(`color: ${hexToRGBA('#fff')}`)
  })

  it.concurrent('should render prop size', async () => {
    const wrapper = mountFn({ value: 'star', size: '14' })
    expect(
      wrapper.attributes('style')
    ).toContain(`font-size: ${pxTransformMockFn(28)}`)
  })

  it.concurrent('should render prop prefixClass', async () => {
    const wrapper = mountFn({ prefixClass: 'prefixClass', value: 'star' })
    expect(wrapper.classes()).toContain('prefixClass-star')
    expect(wrapper.classes()).toContain('prefixClass')
  })
})

describe('AtIcon Event', () => {
  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ value: 'star', onClick })

    await wrapper.find('.at-icon').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })
})
