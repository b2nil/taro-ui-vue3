import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtTag from '../index.vue'

const mountFn = genMountFn(AtTag)

describe('AtTag', () => {
  it.each([
    'small',
    'normal'
  ])('should render prop size -- %s', async (size) => {
    const wrapper = mountFn({ size })
    expect(
      wrapper.classes()
    ).toContain(`at-tag--${size}`)
  })

  it.each([
    '',
    'primary'
  ])('should render prop type -- %s', async (type) => {
    const wrapper = mountFn({ type })
    if (Boolean(type)) {
      expect(
        wrapper.classes()
      ).toContain(`at-tag--${type}`)
    } else {
      expect(
        wrapper.classes()
      ).not.toContain(`at-tag--${type}`)
    }
  })

  it.each([
    'disabled',
    'circle',
    'active'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn({ [propName]: true })
    expect(wrapper.classes()).toContain(`at-tag--${propName}`)
  })
})

describe('AtTag events', () => {
  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ onClick })

    await wrapper.find('.at-tag').trigger('tap', {})

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(
      (wrapper.emitted('click')![0] as Array<any>)[0]
    ).toEqual({ name: '', active: false })
    expect(onClick).toBeCalled()
  })

  it('should not emit click when disabled', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ onClick, disabled: true })

    await wrapper.find('.at-tag').trigger('tap')

    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(onClick).not.toBeCalled()
  })

  it('click event should have params { name, active }', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ onClick, name: 'tag-01', active: true })

    await wrapper.find('.at-tag').trigger('tap')

    expect(onClick.mock.calls[0][0].name).toEqual('tag-01')
    expect(onClick.mock.calls[0][0].active).toBe(true)
  })
})
