import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { pxTransformMockFn } from '@taro-ui-vue3/test-utils/@tarojs/taro'
import { ref } from '@vue/runtime-core'
import AtRate from '../index.vue'

const mountFn = genMountFn(AtRate)

describe('AtRate', () => {
  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn({ modelValue: 2.5 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop size', () => {
    const wrapper = mountFn({ size: '10' })

    wrapper.findAll(".at-icon").forEach(el => {
      expect(el.attributes('style')).toContain('font-size: 10px;')
    })
  })

  it('should render prop modelValue', async () => {
    const wrapper = mountFn({ modelValue: 2 })
    expect(
      wrapper.findAll('.at-rate__icon--on').length
    ).toEqual(2)
    expect(
      wrapper.findAll('.at-rate__icon--off').length
    ).toEqual(3)

    await wrapper.setProps({ modelValue: 3.5 })
    expect(
      wrapper.findAll('.at-rate__icon--on').length
    ).toEqual(3)
    expect(
      wrapper.findAll('.at-rate__icon--half').length
    ).toEqual(1)
    expect(
      wrapper.findAll('.at-rate__icon--off').length
    ).toEqual(1)
  })

  it('should render prop max', () => {
    const wrapper = mountFn({ max: 10 })
    expect(
      wrapper.findAll('.at-rate__icon').length
    ).toEqual(10)
  })

  it('should render prop margin', () => {
    const wrapper = mountFn({ margin: 10 })

    const margin = `margin-right: ${pxTransformMockFn(10)};`

    wrapper.findAll(".at-rate__icon").forEach(el => {
      expect(el.attributes('style')).toContain(margin)
    })
  })

  it.each([
    'star',
    'heart'
  ])('should render prop icon -- %s', async (icon) => {
    const wrapper = mountFn({ icon })
    expect(
      wrapper.find(`.at-icon-${icon}-2`).exists()
    ).toBeTruthy()
  })

  it('should render prop color', async () => {
    const wrapper = mountFn({ modelValue: 1 })
    expect(
      wrapper.find(".at-rate__icon--on .at-icon").attributes('style')
    ).toContain(`color: ${hexToRGBA('#FFCA3E')};`)

    await wrapper.setProps({ color: 'teal' })
    expect(
      wrapper.find(".at-rate__icon--on .at-icon").attributes('style')
    ).toContain('color: teal;')
  })
})

describe('AtRate events', () => {
  it('should emit "update:modelValue" when v-model is used', async () => {
    const modelValue = ref(1)
    const onUpdateValue = jest.fn((e) => { modelValue.value = e })

    const wrapper = mountFn({
      modelValue,
      'onUpdate:modelValue': onUpdateValue
    })

    expect(wrapper.findAll('.at-rate__icon--on').length).toEqual(1)
    const icons = wrapper.findAll('.at-rate__icon')

    await icons[2].trigger('tap')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.findAll('.at-rate__icon--on').length).toBe(3)
    expect(modelValue.value).toBe(3)
  })
})
