import { mountFactory, Slots } from '@/tests/helper'
import AtRange from '../index'
import * as utils from '../../../utils/common'

const mountFn = (props?: object, slots?: Slots) => {
  return mountFactory(AtRange, undefined, props, slots)
}

describe('AtRange', () => {
  beforeEach(() => {
    jest.mock('../../../utils/common')
  })

  it('should render default AtRange', () => {
    const wrapper = mountFn()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prop -- value', async () => {
    let delayQuerySelector = jest
      .spyOn(utils, 'delayQuerySelector')
      .mockReturnValue(new Promise((resolve) => {
        resolve([{ left: 20, width: 30 }])
      }))

    const wrapper = mountFn({
      value: [20, 50]
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    expect(
      wrapper.find('.at-range__track').attributes('style')
    ).toContain('left: 20%; width: 30%;')

    // wrapper.findAll('.at-range__slider').forEach((el, index) => {
    //   if (index === 0) {
    //     expect(
    //       el.attributes('style')
    //     ).toContain('left: 20%;')
    //   }

    //   if (index === 1) {
    //     expect(
    //       el.attributes('style')
    //     ).toContain('left: 50%;')
    //   }
    // })

    delayQuerySelector.mockRestore()
    delayQuerySelector = jest
      .spyOn(utils, 'delayQuerySelector')
      .mockReturnValue(new Promise((resolve) => {
        resolve([{ left: 30, width: 50 }])
      }))

    await wrapper.setProps({ value: [30, 80] })
    await wrapper.vm.$nextTick()
    expect(
      wrapper.find('.at-range__track').attributes('style')
    ).toContain('left: 30%; width: 50%;')

    // wrapper.findAll('.at-range__slider').forEach((el, index) => {
    //   if (index === 0) {
    //     expect(
    //       el.attributes('style')
    //     ).toContain('left: 30%;')
    //   }

    //   if (index === 1) {
    //     expect(
    //       el.attributes('style')
    //     ).toContain('left: 80%;')
    //   }
    // })

    delayQuerySelector.mockRestore()
  })

  it('should render prop -- sliderStyle', () => {
    const wrapper = mountFn({
      sliderStyle: 'color: red;'
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.at-range__slider').attributes('style')).toContain('color: red;')
  })

  it('should render prop -- railStyle', () => {
    const wrapper = mountFn({
      railStyle: 'color: red;'
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.at-range__rail').attributes('style')).toContain('color: red;')
  })

  it('should render prop -- trackStyle', () => {
    const wrapper = mountFn({
      trackStyle: 'color: red;'
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.at-range__track').attributes('style')).toContain('color: red;')
  })

  it('should render props -- min and max', async () => {
    const wrapper = mountFn({
      value: [20, 50],
      min: 10,
      max: 50
    })

    const aX = Math.round((20 - 10) / (50 - 10) * 100)
    const bX = Math.round((50 - 10) / (50 - 10) * 100)
    const style = `left: ${Math.min(aX, bX)}%; width: ${Math.abs(aX - bX)}%`

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
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

describe('AtRange Behavior', () => {
  it('should trigger onChange by clicking on the track', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({
      onChange: onChange
    })
    await wrapper.find('.at-range__slider').trigger('touchend')
    await wrapper.find('.at-range').trigger('tap', {
      x: 30,
      y: 30
    })
    await wrapper.vm.$nextTick()

    expect(onChange).toBeCalled()
  })

  it('should not trigger onChange by clicking on the track when disabled', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      onChange: onChange
    })
    await wrapper.find('.at-range__slider').trigger('touchend')
    await wrapper.find('.at-range').trigger('tap', {
      x: 30,
      y: 30
    })
    await wrapper.vm.$nextTick()

    expect(onChange).not.toBeCalled()
  })

  it('should trigger onChange by touch moving the silder block', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({
      onChange: onChange
    })

    await wrapper.find('.at-range__slider').trigger('touchmove', {
      touches: [{
        clientX: 30,
        clientY: 30
      }]
    })
    await wrapper.vm.$nextTick()
    expect(onChange).toBeCalled()
  })

  it('should not trigger onChange by touch moving the silder block when disabled', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      onChange: onChange
    })

    await wrapper.find('.at-range__slider').trigger('touchmove', {
      touches: [{
        clientX: 30,
        clientY: 30
      }]
    })
    await wrapper.vm.$nextTick()
    expect(onChange).not.toBeCalled()
  })



  it('should trigger onAfterChange when touch ends', async () => {
    const onAfterChange = jest.fn()
    const wrapper = mountFn({
      onAfterChange: onAfterChange
    })

    await wrapper.find('.at-range__slider').trigger('touchend')

    expect(onAfterChange).toBeCalled()
  })

  it('should not trigger onAfterChange when disabled', async () => {
    const onAfterChange = jest.fn()
    const wrapper = mountFn({
      disabled: true,
      onAfterChange: onAfterChange
    })

    await wrapper.find('.at-range__slider').trigger('touchend')

    expect(onAfterChange).not.toBeCalled()
  })
})