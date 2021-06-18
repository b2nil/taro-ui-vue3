import {
  genMountFn
} from '@taro-ui-vue3/test-utils/helper'
import AtSwitch from '../index.vue'

const mountFn = genMountFn(AtSwitch)

describe('AtSwitch', () => {
  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop title', () => {
    const wrapper = mountFn({ title: '开启中' })
    expect(
      wrapper
        .find('.at-switch__title')
        .text()
    ).toEqual('开启中')
  })

  it('should render prop checked', () => {
    const wrapper = mountFn({ checked: true })
    expect(
      wrapper
        .find('.at-switch__switch')
        .attributes('checked')
    ).toEqual('true')
  })

  it('should render prop checked', () => {
    const wrapper = mountFn({ color: 'red' })
    expect(
      wrapper
        .find('.at-switch__switch')
        .attributes('color')
    ).toEqual('red')
  })

  it('should render prop border', async () => {
    const wrapper = mountFn({ border: false })
    expect(
      wrapper.classes()
    ).toContain('at-switch--without-border')

    await wrapper.setProps({ border: true })
    expect(
      wrapper.classes()
    ).not.toContain('at-switch--without-border')
  })

  it('should render prop disabled', async () => {
    const wrapper = mountFn()
    expect(
      wrapper
        .find('.at-switch__container')
        .classes()
    ).not.toContain('at-switch--disabled')

    await wrapper.setProps({ disabled: true })
    expect(
      wrapper
        .find('.at-switch__container')
        .classes()
    ).toContain('at-switch--disabled')
  })
})

describe('AtSwitch events', () => {
  it('should trigger update:checked', async () => {
    const onUpdateChecked = jest.fn()
    const wrapper = mountFn({
      'onUpdate:checked': onUpdateChecked
    })

    await wrapper
      .find('.at-switch .at-switch__switch')
      .trigger('change', { detail: { value: false, checked: false } })

    expect(wrapper.emitted()).toHaveProperty('update:checked')
    expect(wrapper.emitted('update:checked')![0]).toEqual([false])
    expect(onUpdateChecked).toBeCalled()
    expect(onUpdateChecked.mock.calls[0][0].value).toBeFalsy()
  })
})
