import { mount } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtRadio from '../index'

const options = [
  { label: '单选项一', value: 'option1' },
  { label: '单选项二', value: 'option2', desc: '单选项描述二' },
  { label: '单选项三', value: 'option3', desc: '单选项描述三', disabled: true },
]

describe('AtRadio', () => {
  it('should render AtRadio', () => {
    const wrapper = mount({
      render() {
        return h(AtRadio, { options: options })
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtRadio Behavior', () => {
  it('should trigger onClick', async () => {
    const onItemClick = jest.fn()
    const wrapper = mount({
      render() {
        return h(AtRadio, {
          value: "option2",
          options: options,
          onClick: onItemClick
        })
      },
    })
    await wrapper.find('.at-radio .at-radio__option').trigger('tap')
    expect(onItemClick).toBeCalled()
    expect(onItemClick.mock.calls[0][0]).toBe('option1')
  })

  it('AtRadio onClick disabled, onClick not to be called', async () => {
    const onItemClick = jest.fn()
    const wrapper = mount({
      render() {
        return h(AtRadio, {
          value: "option2",
          options: options,
          onClick: onItemClick
        })
      },
    })
    await wrapper.find('.at-radio .at-radio__option:nth-child(3)').trigger('tap')
    expect(onItemClick).not.toBeCalled()
  })
})
