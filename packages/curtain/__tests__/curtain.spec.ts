import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import AtCurtain from '../index.vue'

const mountFn = genMountFn(AtCurtain)

describe('AtCurtain', () => {

  testPropClassAndStyle(mountFn)

  it('should render default AtCurtain', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop isOpened', async () => {
    const wrapper = mountFn()
    expect(
      wrapper.find('.at-curtain--closed').exists()
    ).toBeTruthy()

    await wrapper.setProps({ isOpened: true })
    expect(
      wrapper.find('.at-curtain--closed').exists()
    ).toBeFalsy()
  })

  it.concurrent.each([
    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"
  ])('should render close button at position -- %s', (position) => {
    const wrapper = mountFn({ closeBtnPosition: position })

    if (position === 'middle') {
      expect(
        '[Vue warn]: Invalid prop: custom validator check failed for prop "closeBtnPosition".'
      ).toHaveBeenWarned()
    }

    expect(
      wrapper
        .find(`.at-curtain__btn-close--${position}`)
        .exists()
    ).toBeTruthy()

  })

  it('should warn invalid closeBtnPosition and fallback to top-right', async () => {
    const wrapper = mountFn({ closeBtnPosition: "middle" })

    expect(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "closeBtnPosition".'
    ).toHaveBeenWarned()

    expect(
      wrapper
        .find(`.at-curtain__btn-close--top-right`)
        .exists()
    ).toBeTruthy()

  })


  it.concurrent('should render default slot content', async () => {
    const wrapper = mountFn({}, {
      default: [h('view', { class: 'slot' })]
    })

    expect(
      wrapper.find('.at-curtain__body > .slot').exists()
    ).toBeTruthy()
  })
})

describe('AtCurtain events', () => {
  it('should emit close by clicking the close button', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({ onClose, isOpened: true })

    await wrapper.find('.at-curtain__btn-close').trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
  })
})
