import {
  hexToRGBA,
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import {
  pxTransformMockFn
} from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtDivider from '../index.vue'

const mountFn = genMountFn(AtDivider)

describe('AtDivider', () => {
  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop content', async () => {
    const wrapper = mountFn({ content: 'content' })
    expect(
      wrapper
        .find('.at-divider__content > view')
        .text()
    ).toEqual('content')
  })

  it.concurrent('should render slot content', async () => {
    const wrapper = mountFn({}, {
      default: ['content']
    })
    expect(
      wrapper
        .find('.at-divider__content')
        .text()
    ).toEqual('content')
  })

  it.concurrent('should render prop height', async () => {
    const wrapper = mountFn({ height: '120' })
    expect(
      wrapper.attributes('style')
    ).toEqual(`height: ${pxTransformMockFn(120)};`)
  })

  it.concurrent.each([
    ['fontColor', '#fff'],
    ['fontSize', 56]
  ])('should render prop %s', async (prop, value) => {
    const wrapper = mountFn({ [prop]: value })

    const expected = prop === 'fontColor'
      ? `color: ${hexToRGBA(value as string)};`
      : `font-size: ${pxTransformMockFn(value)};`

    expect(
      wrapper
        .find('.at-divider__content')
        .attributes('style')
    ).toContain(expected)
  })

  it.concurrent('should render prop lineColor', async () => {
    const wrapper = mountFn({ lineColor: '#ddd' })

    expect(
      wrapper
        .find('.at-divider__line')
        .attributes('style')
    ).toContain(`background-color: ${hexToRGBA('#ddd')};`)

  })
})
