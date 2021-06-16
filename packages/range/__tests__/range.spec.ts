import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtRange from '../index.vue'
import * as utils from '@taro-ui-vue3/utils/common'

const mountFn = genMountFn(AtRange)

describe('AtRange', () => {
  beforeEach(() => {
    jest.mock('@taro-ui-vue3/utils/common')
  })

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prop modelValue', async () => {
    let delayQuerySelector = jest
      .spyOn(utils, 'delayQuerySelector')
      .mockReturnValue(new Promise((resolve) => {
        resolve([{ left: 20, width: 30 }])
      }))

    const wrapper = mountFn({
      modelValue: [20, 50]
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    expect(
      wrapper.find('.at-range__track').attributes('style')
    ).toContain('left: 20%; width: 30%;')

    wrapper.findAll('.at-range__slider').forEach((el, index) => {
      if (index === 0) {
        expect(
          el.attributes('style')
        ).toContain('left: 20%;')
      }

      if (index === 1) {
        expect(
          el.attributes('style')
        ).toContain('left: 50%;')
      }
    })

    delayQuerySelector.mockRestore()
    delayQuerySelector = jest
      .spyOn(utils, 'delayQuerySelector')
      .mockReturnValue(new Promise((resolve) => {
        resolve([{ left: 30, width: 50 }])
      }))

    await wrapper.setProps({ modelValue: [30, 80] })
    await wrapper.vm.$nextTick()
    expect(
      wrapper.find('.at-range__track').attributes('style')
    ).toContain('left: 30%; width: 50%;')

    wrapper.findAll('.at-range__slider').forEach((el, index) => {
      if (index === 0) {
        expect(
          el.attributes('style')
        ).toContain('left: 30%;')
      }

      if (index === 1) {
        expect(
          el.attributes('style')
        ).toContain('left: 80%;')
      }
    })

    delayQuerySelector.mockRestore()
  })

  it.each([
    ['railStyle', 'rail'],
    ['trackStyle', 'track'],
    ['sliderStyle', 'slider'],
  ])('should render prop %s', async (propName, className) => {
    const wrapper = mountFn({
      [propName]: 'color: red;'
    })

    expect(
      wrapper.find(`.at-range__${className}`).attributes('style')
    ).toContain('color: red;')

    await wrapper.setProps({ [propName]: { backgroundColor: 'red' } })

    expect(
      wrapper.find(`.at-range__${className}`).attributes('style')
    ).toContain('background-color: red;')
  })

  it('should render props min and max', async () => {
    const wrapper = mountFn({
      modelValue: [20, 50],
      min: 10,
      max: 50
    })

    const aX = Math.round((20 - 10) / (50 - 10) * 100)
    const bX = Math.round((50 - 10) / (50 - 10) * 100)
    const style = `left: ${Math.min(aX, bX)}%; width: ${Math.abs(aX - bX)}%`

    await wrapper.vm.$nextTick()
    expect(
      wrapper.find('.at-range__track').attributes('style')
    ).toContain(style)
  })

  // PX will cause this test case fail, while 'px' won't
  it.skip('should render container and slider styles based on given blockSize', async () => {
    const wrapper = mountFn({ blockSize: 10 })

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('.at-range__container').attributes('style')
    ).toContain('height: 10PX;')

    wrapper.findAll('.at-range__slider').forEach(el => {
      expect(
        el.attributes('style')
      ).toContain('width: 10PX; height: 10PX; margin-left: -5PX;')
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('AtRange events', () => {
  it('should emit update:modelValue by clicking on the track', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      modelValue: [30, 30],
      'onUpdate:modelValue': onUpdateValue
    })
    await wrapper.find('.at-range__slider').trigger('touchend')
    await wrapper.find('.at-range').trigger('tap', {
      x: 30,
      y: 30
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(onUpdateValue).toBeCalled()
  })

  it('should not emit update:modelValue by clicking on the track if disabled', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      modelValue: [30, 30],
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper.find('.at-range__slider').trigger('touchend')
    await wrapper.find('.at-range').trigger('tap', {
      x: 30,
      y: 30
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(onUpdateValue).not.toBeCalled()
  })

  it('should emit update:modelValue by touch moving the silder block', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      modelValue: [30, 30],
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper.find('.at-range__slider').trigger('touchmove', {
      touches: [{
        clientX: 30,
        clientY: 30
      }]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(onUpdateValue).toBeCalled()
  })

  it('should not emit update:modelValue by touch moving the silder block if disabled', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      modelValue: [30, 30],
      'onUpdate:modelValue': onUpdateValue
    })

    await wrapper.find('.at-range__slider').trigger('touchmove', {
      touches: [{
        clientX: 30,
        clientY: 30
      }]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(onUpdateValue).not.toBeCalled()
  })

  it('should trigger onAfterChange when touch ends', async () => {
    const onAfterChange = jest.fn()
    const wrapper = mountFn({
      onAfterChange: onAfterChange
    })

    await wrapper.find('.at-range__slider').trigger('touchend')

    expect(onAfterChange).toBeCalled()
  })

  it('should not trigger onAfterChange if disabled', async () => {
    const onAfterChange = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      onAfterChange: onAfterChange
    })

    await wrapper.find('.at-range__slider').trigger('touchend')

    expect(onAfterChange).not.toBeCalled()
  })
})