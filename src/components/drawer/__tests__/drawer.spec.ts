import { mount } from '@vue/test-utils'
import AtDrawer from '../index'
import { sleep } from '@/tests/helper'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtDrawer as any, {
    slots,
    props: { ...values },
  })
}

describe('AtDrawer Snap', () => {
  it('should render default AtDrawer', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtDrawer -- props show', () => {
    const wrapper = factory({ show: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtDrawer -- props width', () => {
    const wrapper = factory({ show: true, width: '50px' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtDrawer -- props items', () => {
    const wrapper = factory({ show: true, items: ['菜单1', '菜单2'] })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtDrawer Event', () => {
  it('should trigger onItemClick & onClose events', async () => {
    const onItemClick = jest.fn()
    const onClose = jest.fn()
    const wrapper = factory({
      show: true,
      onItemClick: onItemClick,
      onClose: onClose,
      items: ['菜单1', '菜单2'],
    })
    await sleep(300)
    wrapper.find('.at-drawer .at-list__item').trigger('tap')
    expect(onItemClick).toBeCalled()
    await sleep(350)
    expect(onClose).toBeCalled()
  })

  it('onItemClick event should return index of the clicked item', async () => {
    const onItemClick = jest.fn()
    const wrapper = factory({
      show: true,
      onItemClick: onItemClick,
      items: ['菜单1', '菜单2'],
    })
    await sleep(300)
    wrapper.find('.at-drawer .at-list__item').trigger('tap')
    wrapper.find('.at-drawer .at-list__item:nth-child(2)').trigger('tap')
    await sleep(0)
    expect(onItemClick.mock.calls[0][0]).toBe(0)
    expect(onItemClick.mock.calls[1][0]).toBe(1)
  })

  it('should trigger onClose event by clicking mask', async () => {
    const onClose = jest.fn()
    const wrapper = factory({
      show: true,
      onClose: onClose,
      items: ['菜单1', '菜单2'],
    })
    await sleep(300)
    wrapper.find('.at-drawer .at-drawer__mask').trigger('tap')
    await sleep(350)
    expect(onClose).toBeCalled()
  })
})
