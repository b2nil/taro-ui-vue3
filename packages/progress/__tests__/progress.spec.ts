import { genMountFn, hexToRGBA } from '@taro-ui-vue3/test-utils/helper'
import AtProgress from '../index.vue'

const mountFn = genMountFn(AtProgress)

describe('Progress', () => {
  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    -1,
    25,
    125
  ])('should render prop percent', async (percent) => {
    const wrapper = mountFn({ percent })
    const percentEl = wrapper.find('.at-progress__content text')
    const innerEL = wrapper.find('.at-progress__outer-inner-background')

    if (percent < 0) { percent = 0 }
    else if (percent > 100) { percent = 100 }

    expect(
      innerEL.attributes('style')
    ).toContain(`width: ${percent}%;`)

    expect(percentEl.text()).toEqual(`${percent}%`)
  })

  it('should render prop hidePercent', () => {
    const wrapper = mountFn({ hidePercent: true })

    expect(
      wrapper.find('.at-progress__content').exists()
    ).toBeFalsy()
  })

  it('should render prop color', () => {
    const wrapper = mountFn({ color: '#FF4949' })

    expect(
      wrapper
        .find('.at-progress__outer-inner-background')
        .attributes('style')
    ).toContain(`background-color: ${hexToRGBA('#FF4949')};`)
  })

  it('should render prop strokeWidth', () => {
    const wrapper = mountFn({ strokeWidth: 10 })

    expect(
      wrapper
        .find('.at-progress__outer-inner-background')
        .attributes('style')
    ).toContain(`height: 10px;`)
  })

  it.each([
    'progress',
    'error',
    'success'
  ])('should render prop status - progress', async (status) => {
    const wrapper = mountFn({ status })

    expect(wrapper.classes()).toContain(`at-progress--${status}`)

    if (status !== 'progress') {
      const iconEL = wrapper.find('.at-progress__content')

      expect(
        iconEL.find('.at-icon-close-circle').exists()
      ).toBe(status === 'error')

      expect(
        iconEL.find('.at-icon-check-circle').exists()
      ).toBe(status === 'success')
    }
  })
})