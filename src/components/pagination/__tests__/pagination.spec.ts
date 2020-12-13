import { mountFactory, Slots } from '@/tests/helper'
import { ref } from '@vue/runtime-core'
import AtPagination from '../index'

const factory = (values = {}, slots: Slots = { default: [] }) => {
  return mountFactory(AtPagination, {}, values, slots)
}

describe('AtPagination Snap', () => {
  it('render AtPagination -- props current', () => {
    const wrapper = factory({ current: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtPagination -- props total', () => {
    const wrapper = factory({ total: 100 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtPagination -- props pageSize', () => {
    const wrapper = factory({ pageSize: 40 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtPagination -- props icon', () => {
    const wrapper = factory({ icon: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtPagination Event', () => {
  it('AtPagination onPageChange - prev', () => {
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
    wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    expect(onPageChange).toBeCalled()
    expect(current.value).toBe(1)
  })

  it('AtPagination onPageChange - next', () => {
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
    wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange).toBeCalled()
    expect(current.value).toBe(3)
  })

  it('AtPagination onPageChange not to be called(disabled prev or next)', () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      total: 20,
      onPageChange,
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange).not.toBeCalled()
  })

  it('AtPagination onPageChange params {type, current} - prev', () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      current: 2,
      total: 100,
      onPageChange,
    })
    wrapper.find('.at-pagination .at-pagination__btn-prev .at-button').trigger('tap')
    expect(onPageChange.mock.calls[0][0].type).toEqual('prev')
    expect(onPageChange.mock.calls[0][0].current).toEqual(1)
  })

  it('AtPagination onPageChange params {type, current} - next', () => {
    const onPageChange = jest.fn()
    const wrapper = factory({
      total: 100,
      onPageChange,
    })
    wrapper.find('.at-pagination .at-pagination__btn-next .at-button').trigger('tap')
    expect(onPageChange.mock.calls[0][0].type).toEqual('next')
    expect(onPageChange.mock.calls[0][0].current).toEqual(2)
  })
})
