import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtCheckbox from '../index.vue'

const mountFn = genMountFn(AtCheckbox)

const options = [
  {
    value: 'list1',
    label: 'iPhone X',
    desc:
      '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
  },
  { value: 'list2', label: 'HUAWEI P20' },
  {
    value: 'list3',
    label: 'OPPO Find X',
    desc:
      '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
    disabled: true,
  },
  {
    value: 'list4',
    label: 'vivo NEX',
    desc:
      '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
    disabled: true,
  },
]

describe('AtCheckbox', () => {
  it('should render options and match snapshot', () => {
    const wrapper = mountFn({ options })
    const optionEls = wrapper.findAll('.at-checkbox__option')
    expect(optionEls.length).toEqual(options.length)

    expect(
      optionEls[0].find('.at-checkbox__title').text()
    ).toEqual(options[0].label)

    expect(
      optionEls[0].find('.at-checkbox__desc').text()
    ).toEqual(options[0].desc)

    expect(
      optionEls[1].find('.at-checkbox__desc').exists()
    ).toBeFalsy()

    expect(
      optionEls[2].classes()
    ).toContain('at-checkbox__option--disabled')

    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop selectedList', async () => {
    const wrapper = mountFn({ options, selectedList: ['list2'] })
    const optionEls = wrapper.findAll('.at-checkbox__option')

    expect(
      optionEls[1].classes()
    ).toContain('at-checkbox__option--selected')
  })

  it('should warn missing required prop options', () => {
    mountFn()
    expect(
      '[Vue warn]: Missing required prop: "options"'
    ).toHaveBeenWarned()
  })
})

describe('AtCheckbox events', () => {
  it('should emit update:selectedList', async () => {
    const selectedList = ref(['list2'])
    const onClick = jest.fn((e) => {
      selectedList.value = e
    })

    const wrapper = mountFn({
      options,
      selectedList: selectedList.value,
      ['onUpdate:selectedList']: onClick,
    })

    await wrapper
      .find('.at-checkbox__option:nth-child(1)')
      .trigger('tap')

    expect(
      wrapper.emitted()
    ).toHaveProperty('update:selectedList')

    expect(
      wrapper.emitted('update:selectedList')![0]
    ).toEqual([['list2', 'list1']])

    expect(selectedList.value).toEqual(['list2', 'list1'])
    expect(onClick).toBeCalled()

    await wrapper.setProps({ selectedList: selectedList.value })
    await wrapper
      .find('.at-checkbox__option:nth-child(2)')
      .trigger('tap')
    expect(
      wrapper.emitted('update:selectedList')![1]
    ).toEqual([['list1']])
  })

  it('should not emit update:selectedList if disabled', async () => {
    const selectedList = ref(['list2'])
    const onClick = jest.fn((e) => {
      selectedList.value = e
    })

    const wrapper = mountFn({
      options,
      selectedList: ['list2'],
      ['onUpdate:selectedList']: onClick
    })

    await wrapper
      .find('.at-checkbox__option:nth-child(3)')
      .trigger('tap')
    await wrapper.vm.$nextTick()

    expect(
      wrapper.emitted()
    ).not.toHaveProperty('update:selectedList')
    expect(selectedList.value).toEqual(['list2'])
    expect(onClick).not.toBeCalled()
  })
})
