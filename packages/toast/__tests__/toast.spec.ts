import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import AtToast from '../index'
import { sleep } from '@taro-ui-vue3/test-utils/helper'

const factory = (values = {}, slots: Slots = { default: [] }) => {
  return mountFactory(AtToast, {}, values, slots)
}

const ICON = 'loading'
const TEXT = '测试数据Text'
const IMAGE = 'http://storage.360buyimg.com/mtd/home/group-21533885306540.png'

const STATUS_ERROR = 'error'
const STATUS_SUCCESS = 'success'
const STATUS_LOADING = 'loading'

describe('Toast', () => {
  it('should render default Toast', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast', () => {
    const wrapper = factory({ isOpened: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast with prop text', () => {
    const wrapper = factory({ isOpened: true, text: TEXT })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast with prop icon', () => {
    const wrapper = factory({ isOpened: true, icon: ICON })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened  Toast with prop image', () => {
    const wrapper = factory({ isOpened: true, image: IMAGE })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened  Toast with prop hasMask', () => {
    const wrapper = factory({ isOpened: true, hasMask: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast with prop status -- success ', () => {
    const wrapper = factory({ isOpened: true, status: STATUS_SUCCESS })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast with prop status -- loading ', () => {
    const wrapper = factory({ isOpened: true, status: STATUS_LOADING })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render opened Toast with prop status -- error ', () => {
    const wrapper = factory({ isOpened: true, status: STATUS_ERROR })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('Toast Behavior ', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.runOnlyPendingTimers()
  })
  it('should trigger onClose event and close Toast', async () => {
    const onClose = jest.fn()
    const wrapper = factory({ isOpened: true, onClose: onClose })
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    await wrapper.find('.at-toast .toast-body').trigger('tap')
    await wrapper.vm.$nextTick()
    expect(onClose).toBeCalled()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it('Toast should be closed when duration time over --- default 3000 ms', async () => {
    const wrapper = factory({ isOpened: true })
    expect(wrapper.vm.duration).toEqual(3000)
    jest.advanceTimersByTime(3000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it('Toast should be closed when duration time over -- 1000 ms', async () => {
    const wrapper = factory({ isOpened: true, duration: 1000 })
    expect(wrapper.vm.duration).toEqual(1000)
    jest.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })

  it('should trigger onClick and onClose', async () => {
    const onClick = jest.fn()
    const onClose = jest.fn()
    const wrapper = factory({ isOpened: true, onClick, onClose })
    expect(wrapper.find(".at-toast").exists()).toBeTruthy()

    await wrapper.find('.at-toast .toast-body').trigger('tap')
    expect(onClick).toBeCalled()
    expect(onClose).toBeCalled()

    await wrapper.vm.$nextTick()
    expect(wrapper.find(".at-toast").exists()).toBeFalsy()
  })
})
