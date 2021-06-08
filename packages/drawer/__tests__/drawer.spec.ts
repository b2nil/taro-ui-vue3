import {
  genMountFn,
} from '@taro-ui-vue3/test-utils/helper'
import AtDrawer from '../index.vue'

const mountFn = genMountFn(AtDrawer)
const items = ['菜单1', '菜单2']
jest.useFakeTimers()
describe('AtDrawer', () => {

  it('should render prop show and match snapshot', () => {
    const wrapper = mountFn({ show: true, items })
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop width', async () => {
    const wrapper = mountFn({ show: true, width: '50px' })
    expect(
      wrapper
        .find('.at-drawer__content')
        .attributes('style')
    ).toContain('width: 50px;')
  })

  it.concurrent('should render prop right', async () => {
    const wrapper = mountFn({ show: true })
    expect(wrapper.classes()).toContain('at-drawer--left')
    expect(wrapper.classes()).not.toContain('at-drawer--right')

    await wrapper.setProps({ right: true })
    expect(wrapper.classes()).not.toContain('at-drawer--left')
    expect(wrapper.classes()).toContain('at-drawer--right')
  })

  it.concurrent('should render prop mask', async () => {
    const wrapper = mountFn({ show: true })
    expect(
      wrapper.find('.at-drawer__mask').attributes('style')
    ).toContain('display: block;')

    await wrapper.setProps({ mask: false })
    expect(
      wrapper.find('.at-drawer__mask').attributes('style')
    ).toContain('display: none;')
  })

  it.concurrent('should render prop items', async () => {
    const wrapper = mountFn({ show: true, items: items })

    expect(
      wrapper.find('.at-list').exists()
    ).toBeTruthy()
    expect(
      wrapper.findAll('.at-list__item').length
    ).toEqual(2)
  })
})

describe('AtDrawer events', () => {
  it('should emit item-click and close events', async () => {
    const onItemClick = jest.fn()
    const onClose = jest.fn()
    const wrapper = mountFn({
      show: true,
      items,
      onClose,
      onItemClick
    })

    jest.advanceTimersByTime(200)
    await wrapper.find('.at-drawer .at-list__item:nth-child(2)').trigger('tap')
    jest.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('item-click')
    expect(wrapper.emitted('item-click')![0]).toEqual([1])

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onItemClick).toBeCalled()
    expect(onItemClick.mock.calls[0][0]).toEqual(1)
    expect(onClose).toBeCalled()
  })

  it('should emit close by clicking mask', async () => {
    const onClose = jest.fn()
    const wrapper = mountFn({
      show: true,
      items,
      onClose,
    })

    jest.advanceTimersByTime(200)
    await wrapper.find('.at-drawer .at-drawer__mask').trigger('tap')
    jest.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(onClose).toBeCalled()
  })

  it('should open and close drawer with animation', async () => {
    const wrapper = mountFn({
      show: true,
      items
    })

    expect(wrapper.classes).not.toContain('at-drawer--show')
    expect(
      wrapper.find('.at-drawer__content').attributes('style')
    ).toContain('transition: all 195ms cubic-bezier(0.4, 0, 0.6, 1);')

    jest.advanceTimersByTime(200)
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('at-drawer--show')
    expect(
      wrapper.find('.at-drawer__content').attributes('style')
    ).toContain('transition: all 225ms cubic-bezier(0, 0, 0.2, 1)')

    await wrapper.find('.at-drawer .at-drawer__mask').trigger('tap')
    jest.advanceTimersByTime(200)
    await wrapper.vm.$nextTick()

    expect(wrapper.classes).not.toContain('at-drawer--show')
    expect(
      wrapper.find('.at-drawer__content').attributes('style')
    ).toContain('transition: all 195ms cubic-bezier(0.4, 0, 0.6, 1);')

  })
})
