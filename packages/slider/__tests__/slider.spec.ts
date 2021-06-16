import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { hyphenate } from '@vue/shared'
import { ref } from 'vue'
import AtSlider from '../index.vue'

const mountFn = genMountFn(AtSlider)

describe('AtSlider', () => {
  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    ['value', 50],
    ['min', 10],
    ['max', 80],
    ['step', 5],
    ['disabled', true],
    ['blockSize', 12],
    ['blockColor', '#fff'],
    ['activeColor', '#fff'],
    ['backgroundColor', '#fff']
  ])('should render prop %s', async (propName, propValue) => {
    const wrapper = mountFn({ [propName]: propValue })

    if (propName === 'disabled') {
      expect(wrapper.classes()).toContain('at-slider--disabled')
    }

    expect(
      wrapper
        .find('.at-slider__inner slider')
        .attributes(hyphenate(propName))
    ).toEqual(`${propValue}`)
  })

  it('should fail prop validation if blockSize is not within 12 - 28', async () => {
    const wrapper = mountFn({ blockSize: 11 })
    await wrapper.setProps({ blockSize: 29 })
    expect(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "blockSize".'
    ).toHaveBeenWarnedTimes(2)
  })

  it('should render prop showValue', () => {
    const wrapper = mountFn({ showValue: true, value: 50 })
    const valueTextEl = wrapper.find('.at-slider__text')
    expect(valueTextEl.exists()).toBeTruthy()
    expect(valueTextEl.text()).toEqual('50')
  })
})

describe('AtSlider Behavior', () => {
  it('should emit change', async () => {
    const onChange = jest.fn()
    const wrapper = mountFn({ onChange })
    await wrapper
      .find('.at-slider slider')
      .trigger('change', { detail: { value: 50 } })

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('change')![0]).toEqual([50])
    expect(onChange).toBeCalled()
  })

  it('should emit changing', async () => {
    const onChanging = jest.fn()
    const wrapper = mountFn({ onChanging })
    await wrapper
      .find('.at-slider slider')
      .trigger('changing', { detail: { value: 50 } })

    expect(wrapper.emitted()).toHaveProperty('changing')
    expect(wrapper.emitted('changing')![0]).toEqual([50])
    expect(onChanging).toBeCalled()
  })

  it('should take decimal steps and ensure precision', async () => {
    const wrapper = mountFn({ step: 0.001 })

    await wrapper
      .find('.at-slider slider')
      .trigger('change', { detail: { value: 50.9489044565 } })
    expect(wrapper.emitted('change')![0]).toEqual([50.949])

  })
})
