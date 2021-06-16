import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import AtSegmentedControl from '../index.vue'
import { ref } from 'vue'

const mountFn = genMountFn(AtSegmentedControl)
const values = ['tab1', 'tab2', 'tab3']

describe('AtSegmentedControl', () => {
  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn({
      values
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop values', () => {
    const wrapper = mountFn({ values })
    expect(
      wrapper.findAll('.at-segmented-control__item').length
    ).toEqual(3)
  })

  it('should render prop current', () => {
    const wrapper = mountFn({ current: 2, values })
    expect(
      wrapper
        .find('.at-segmented-control__item:nth-child(3)')
        .classes()
    ).toContain('at-segmented-control__item--active')
  })

  it('should render prop fontSize', () => {
    const wrapper = mountFn({ fontSize: 30, values })
    wrapper
      .findAll('.at-segmented-control__item')
      .forEach(el => {
        expect(
          el.attributes('style')
        ).toContain(`font-size: ${pxTransformMockFn(30)}`)
      })
  })

  it('should render prop disabled', () => {
    const wrapper = mountFn({ disabled: true, values })
    expect(
      wrapper.classes()
    ).toContain('at-segmented-control--disabled')
  })

  it('should render props color and selectedColor', () => {
    const wrapper = mountFn({
      color: '#bbb',
      selectedColor: '#fff',
      values
    })

    expect(
      wrapper.attributes('style')
    ).toContain(`border-color: #fff;`)

    wrapper
      .findAll('.at-segmented-control__item')
      .forEach((el, index) => {
        expect(
          el.attributes('style')
        ).toContain(`border-color: #fff;`)

        if (index === 0) {
          expect(
            el.attributes('style')
          ).toContain(`color: ${hexToRGBA('#bbb')};`)
          expect(
            el.attributes('style')
          ).toContain(`background-color: ${hexToRGBA('#fff')};`)
        } else {
          expect(
            el.attributes('style')
          ).toContain(`color: ${hexToRGBA('#fff')};`)
          expect(
            el.attributes('style')
          ).toContain(`background-color: ${hexToRGBA('#bbb')};`)
        }
      })
  })
})

describe('AtSegmentControl events', () => {
  it('should emit click', async () => {
    const current = ref(1)
    const onClick = jest.fn((e) => current.value = e)
    const wrapper = mountFn({
      current,
      values,
      onClick
    })

    await wrapper
      .find('.at-segmented-control__item:nth-child(3)')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
    expect(current.value).toBe(2)
    expect(
      wrapper
        .find('.at-segmented-control__item:nth-child(3)')
        .classes()
    ).toContain('at-segmented-control__item--active')
  })

  it('should not emit click if disabled', async () => {
    const current = ref(1)
    const onClick = jest.fn((e) => current.value = e)
    const wrapper = mountFn({
      current,
      values,
      disabled: true,
      onClick
    })

    await wrapper
      .find('.at-segmented-control__item:nth-child(3)')
      .trigger('tap')

    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(onClick).not.toBeCalled()
    expect(current.value).not.toBe(2)
    expect(
      wrapper
        .find('.at-segmented-control__item:nth-child(3)')
        .classes()
    ).not.toContain('at-segmented-control__item--active')
  })

})
