import { genMountFn, testPropClassAndStyle } from '@taro-ui-vue3/test-utils/helper'
import AtForm from '../index.vue'

const mountFn = genMountFn(AtForm)

describe('AtForm', () => {
  testPropClassAndStyle(mountFn)

  it('should render default and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render reportSubmit', async () => {
    const wrapper = mountFn({ reportSubmit: true })
    expect(wrapper.attributes('report-submit')).toEqual('true')
  })

  it.concurrent('should render slot content', async () => {
    const wrapper = mountFn({}, { default: ['slot content'] })
    expect(wrapper.text()).toEqual('slot content')
  })

})

describe('AtForm events', () => {
  it('should emit submit', async () => {
    const onSubmit = jest.fn()
    const wrapper = mountFn({ onSubmit: onSubmit })
    await wrapper.find('.at-form').trigger('submit')
    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(onSubmit).toBeCalled()
  })

  it('should emit reset', async () => {
    const onReset = jest.fn()
    const wrapper = mountFn({ onReset: onReset })
    await wrapper.find('.at-form').trigger('reset')
    expect(wrapper.emitted()).toHaveProperty('reset')
    expect(onReset).toBeCalled()
  })
})
