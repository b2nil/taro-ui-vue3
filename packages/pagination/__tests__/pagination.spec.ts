import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { ref } from '@vue/runtime-core'
import AtPagination from '../index'

const factory = (values = {}, slots: Slots = { default: [] }) => {
  return mountFactory(AtPagination, {}, values, slots)
}

describe('AtPagination', () => {
  it('should render prop -- current', () => {
    const wrapper = factory({ current: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- total', () => {
    const wrapper = factory({ total: 100 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- pageSize', () => {
    const wrapper = factory({ pageSize: 40 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- icon', () => {
    const wrapper = factory({ icon: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtPagination Behavior', () => {
  it('should trigger event onPageChange - prev', async () => {
    const current = ref(2)
    const onPageChange = jest.fn().mockImplementation((val) => {
      current.value = val.current
    })
    const wrapper = factory({
      total: 100,
      current: current.value,
      onPageChange,
    })
    expect(wrapper.element).toMatchSnapshot()
    await wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    expect(onPageChange).toBeCalled()
    expect(current.value).toBe(1)
  })

  it('should trigger event onPageChange - next', async () => {
    const current = ref(2)
    const onPageChange = jest.fn().mockImplementation((val) => {
      current.value = val.current
    })
    const wrapper = factory({
      total: 100,
      current: current.value,
      onPageChange,
    })
    expect(wrapper.element).toMatchSnapshot()
    await wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange).toBeCalled()
    expect(current.value).toBe(3)
  })

  it('should not trigger event onPageChange when disabled', async () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      total: 20,
      onPageChange,
    })
    expect(wrapper.element).toMatchSnapshot()
    await wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    await wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange).not.toBeCalled()
  })

  it('onPageChange should return params {type, current} - prev', async () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      current: 2,
      total: 100,
      onPageChange,
    })
    await wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    expect(onPageChange.mock.calls[0][0].type).toEqual('prev')
    expect(onPageChange.mock.calls[0][0].current).toEqual(1)
  })

  it('onPageChange should return params {type, current} - next', async () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      total: 100,
      onPageChange,
    })
    await wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange.mock.calls[0][0].type).toEqual('next')
    expect(onPageChange.mock.calls[0][0].current).toEqual(2)
  })
})
