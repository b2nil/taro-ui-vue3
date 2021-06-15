import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtRadio from '../index.vue'

const options = [
  { label: '单选项一', value: 'option1' },
  { label: '单选项二', value: 'option2', desc: '单选项描述二' },
  { label: '单选项三', value: 'option3', desc: '单选项描述三', disabled: true },
]
const mountFn = genMountFn(AtRadio)

describe('AtRadio', () => {
  it('should render options and match snapshot', () => {
    const wrapper = mountFn({ options })

    const optionEls = wrapper.findAll('.at-radio__option')
    optionEls.forEach((el, index) => {
      expect(
        el.find('.at-radio__title').text()
      ).toEqual(options[index].label)

      if (options[index].disabled) {
        expect(el.classes()).toContain('at-radio__option--disabled')
      }

      if (options[index].desc) {
        expect(
          el.find('.at-radio__desc').text()
        ).toEqual(options[index].desc)
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtRadio events', () => {
  it('should trigger update:modelValue', async () => {
    const modelValue = ref('option2')
    const onClick = jest.fn((e) => modelValue.value = e)

    const wrapper = mountFn({
      modelValue,
      options,
      'onUpdate:modelValue': onClick
    })

    expect(
      wrapper
        .find('.at-radio__option:nth-child(2) .at-radio__icon')
        .classes()
    ).toContain('at-radio__icon--checked')

    await wrapper
      .find('.at-radio__option:nth-child(1)')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option1'])
    expect(onClick).toBeCalled()
    expect(onClick.mock.calls[0][0]).toBe('option1')
    expect(modelValue.value).toEqual('option1')

    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .find('.at-radio__option:nth-child(1) .at-radio__icon')
        .classes()
    ).toContain('at-radio__icon--checked')
  })

  it('should not emit update:modelValue if disabled', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      modelValue: "option2",
      options: options,
      'onUpdate:modelValue': onClick
    })

    await wrapper.find('.at-radio .at-radio__option:nth-child(3)').trigger('tap')
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(onClick).not.toBeCalled()
  })
})
