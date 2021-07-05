import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtToast from '../index.vue'
import statusImg from '../img.json'

const mountFn = genMountFn(AtToast)

const icon = 'loading'
const text = '测试数据'
const image = 'http://img.com/06540.png'

describe('AtToast', () => {
  it('should render toast using image and match snapshot', () => {
    const wrapper = mountFn({
      isOpened: true,
      hasMask: true,
      text,
      image
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render toast using icon and match snapshot', () => {
    const wrapper = mountFn({
      isOpened: true,
      hasMask: true,
      text,
      icon
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render nothing if toast is not opened', () => {
    const wrapper = mountFn()
    expect(wrapper.find('.at-toast').exists()).toBeFalsy()
  })

  it('should render prop text', () => {
    const wrapper = mountFn({ isOpened: true, text })
    const textEl = wrapper.find('.toast-body-content__info')
    expect(textEl.exists()).toBeTruthy()
    expect(textEl.text()).toEqual(text)
  })

  it('should render prop hasMask', () => {
    const wrapper = mountFn({ isOpened: true, hasMask: true })
    expect(wrapper.find('.at-toast__overlay').exists()).toBeTruthy()
  })

  it.each([
    'loading',
    'error',
    'success'
  ])('should render prop status -- %s and use builtin status image', async (status) => {
    const wrapper = mountFn({ isOpened: true, status })
    expect(
      wrapper.find('.toast-body').classes()
    ).toContain(`at-toast__body--${status}`)

    const imageEl = wrapper.find('.toast-body-content__img-item')
    expect(imageEl.exists()).toBeTruthy()
    expect(imageEl.attributes('src')).toEqual(statusImg[status])
  })
})

describe('AtToast events ', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.runOnlyPendingTimers()
  })
  it('should emit close event and close Toast', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({ isOpened: true, onClose: onClose })
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    await wrapper.find('.at-toast .toast-body').trigger('tap')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it.each([
    3000,
    1000,
    0
  ])('should be closed when duration time over -- %d ms', async (duration) => {
    const wrapper = mountFn({ isOpened: true, duration })

    expect(wrapper.vm.duration).toEqual(duration)
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    jest.advanceTimersByTime(duration)
    await wrapper.vm.$nextTick()

    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it('should emit click and close events', async () => {
    const onClick = jest.fn()
    const onClose = jest.fn()
    const wrapper = mountFn({ isOpened: true, onClick, onClose })
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    await wrapper.find('.at-toast .toast-body').trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClick).toBeCalled()
    expect(onClose).toBeCalled()

    await wrapper.vm.$nextTick()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it('should not mit click and close events if status is loading', async () => {
    const onClick = jest.fn()
    const onClose = jest.fn()
    const wrapper = mountFn({ isOpened: true, status: 'loading', onClick, onClose })
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    await wrapper.find('.at-toast .toast-body').trigger('tap')

    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(wrapper.emitted()).not.toHaveProperty('close')
    expect(onClick).not.toBeCalled()
    expect(onClose).not.toBeCalled()

    await wrapper.vm.$nextTick()
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()
  })
})
