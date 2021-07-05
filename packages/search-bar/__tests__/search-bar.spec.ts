import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { capitalize } from '@vue/shared'
import { ref } from 'vue'
import AtSearchBar from '../index.vue'

const mountFn = genMountFn(AtSearchBar)

describe('AtSearchBar', () => {
  testPropClassAndStyle(mountFn)

  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop modelValue', () => {
    const wrapper = mountFn({ modelValue: 'value' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop placeholder', () => {
    const wrapper = mountFn({ placeholder: 'placeholder' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop maxLength', () => {
    const wrapper = mountFn({ maxLength: 120 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop fixed', () => {
    const wrapper = mountFn({ fixed: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop focus', () => {
    const wrapper = mountFn({ fucos: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop disabled', () => {
    const wrapper = mountFn({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop showActionButton', () => {
    const wrapper = mountFn({ showActionButton: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop actionName', () => {
    const wrapper = mountFn({ actionName: 'actionName' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop inputType number', () => {
    const wrapper = mountFn({ inputType: 'number' })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtSearchBar events', () => {
  it('should emit update:modelValue', async () => {
    const modelValue = ref('props.value')
    const onUpdateValue = jest.fn((e) => modelValue.value = e)
    const wrapper = mountFn({
      modelValue,
      ['onUpdate:modelValue']: onUpdateValue
    })

    await wrapper
      .find('.at-search-bar .at-search-bar__input')
      .trigger('input', { detail: { value: 'value' } })

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['value'])
    expect(onUpdateValue).toBeCalled()
    expect(modelValue.value).toEqual('value')

    await wrapper
      .find('.at-search-bar .at-search-bar__clear')
      .trigger('touchstart')

    await wrapper.vm.$nextTick()

    expect(modelValue.value).toEqual('')
  })

  it.each([
    'focus', 'blur', 'confirm'
  ])('should emit %s', async (eventName) => {
    const mockFn = jest.fn()
    const wrapper = mountFn({ [`on${capitalize(eventName)}`]: mockFn })

    await wrapper.find('.at-search-bar .at-search-bar__input').trigger(eventName)

    expect(wrapper.emitted()).toHaveProperty(eventName)
    expect(mockFn).toBeCalled()
  })

  it('should emit ActionClick', async () => {
    const onActionClick = jest.fn()
    const wrapper = mountFn({ onActionClick })

    await wrapper.find('.at-search-bar .at-search-bar__action').trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('action-click')
    expect(onActionClick).toBeCalled()
  })

  // @TODO: remove onClear ?!
  it('should trigger onClear', async () => {
    const onClear = jest.fn()
    const wrapper = mountFn({ onClear })

    const clearElement = wrapper.find('.at-search-bar .at-search-bar__clear')
    expect(clearElement.exists()).toBe(false)

    await wrapper.setProps({ modelValue: 'props.modelValue is present now' })
    await wrapper.vm.$nextTick()

    const clearElement2 = wrapper.find('.at-search-bar .at-search-bar__clear')
    expect(clearElement2.exists()).toBe(true)

    await clearElement2.trigger('touchstart')

    expect(onClear).toBeCalled()
  })
})
