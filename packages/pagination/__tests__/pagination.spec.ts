import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { ref } from '@vue/runtime-core'
import AtPagination from '../index.vue'

const mountFn = genMountFn(AtPagination)

describe('AtPagination', () => {
  it('should render prop -- current', () => {
    const wrapper = mountFn({ current: 2 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- total', () => {
    const wrapper = mountFn({ total: 100 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- pageSize', () => {
    const wrapper = mountFn({ pageSize: 40 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- icon', () => {
    const wrapper = mountFn({ icon: true })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtPagination Behavior', () => {
  it('should trigger page-change event - prev', async () => {
    const current = ref(2)
    const onPageChange = jest.fn().mockImplementation((val) => {
      current.value = val.current
    })
    const wrapper = mountFn({
      total: 100,
      current,
      onPageChange,
    })

    await wrapper
      .find('.at-pagination .at-pagination__btn-prev .at-button')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('page-change')
    expect(wrapper.emitted('page-change')![0]).toEqual([{ type: 'prev', current: 1 }])

    expect(onPageChange).toBeCalled()
    expect(onPageChange.mock.calls[0][0].type).toEqual('prev')
    expect(onPageChange.mock.calls[0][0].current).toEqual(1)

    expect(current.value).toBe(1)
  })

  it('should trigger page-change event - next', async () => {
    const current = ref(2)
    const onPageChange = jest.fn().mockImplementation((val) => {
      current.value = val.current
    })
    const wrapper = mountFn({
      total: 100,
      current,
      onPageChange,
    })

    await wrapper
      .find('.at-pagination .at-pagination__btn-next .at-button')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('page-change')
    expect(wrapper.emitted('page-change')![0]).toEqual([{ type: 'next', current: 3 }])

    expect(onPageChange).toBeCalled()
    expect(onPageChange.mock.calls[0][0].type).toEqual('next')
    expect(onPageChange.mock.calls[0][0].current).toEqual(3)

    expect(current.value).toBe(3)
  })

  it('should not trigger page-change event when disabled', async () => {
    const onPageChange = jest.fn()
    const wrapper = mountFn({
      total: 20,
      onPageChange,
    })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper
      .find('.at-pagination .at-pagination__btn-prev .at-button')
      .trigger('tap')
    await wrapper
      .find('.at-pagination .at-pagination__btn-next .at-button')
      .trigger('tap')

    expect(wrapper.emitted()).not.toHaveProperty('page-change')
    expect(onPageChange).not.toBeCalled()
  })
})
