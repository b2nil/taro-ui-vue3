import { mountFactory } from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import AtFlex from "../index"
import AtFlexItem from "../item"

describe.each([
  ['wrap', ["wrap", "no-wrap", "wrap-reverse"]],
  ['align', ["start", "end", "center", "stretch", "baseline"]],
  ['justify', ["start", "end", "center", "between", "around"]],
  ['direction', ["row", "column", "row-reverse", "column-reverse"]],
  ['alignContent', ["start", "end", "center", "stretch", "between", "around"]]
])('AtFlex', (propName, propOptions) => {
  it.each(propOptions)(`should render prop ${propName} -- %s`, (propOption) => {
    const wrapper = mountFactory(
      AtFlex,
      undefined,
      { [`${propName}`]: propOption }
    )

    expect(wrapper.element).toMatchSnapshot()
    switch (propName) {
      case 'wrap':
        expect(wrapper.find(`.at-row--${propOption}`).exists()).toBeTruthy()
        break
      case 'alignContent':
        expect(wrapper.find(`.at-row__align-content--${propOption}`).exists()).toBeTruthy()
        break
      default:
        expect(wrapper.find(`.at-row__${propName}--${propOption}`).exists()).toBeTruthy()
        break
    }
  })

  it('should render default slot content', () => {
    const wrapper = mountFactory(
      AtFlex,
      undefined,
      undefined,
      { default: [h('view')] }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.at-row > view').exists()).toBeTruthy()

  })
})

describe('AtFlexItem', () => {
  it.each([
    'isAuto',
    'isWrap'
  ])('should render prop -- %s', (propName) => {
    const wrapper = mountFactory(
      AtFlexItem,
      undefined,
      { [`${propName}`]: true }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(`.at-col--${propName.toLowerCase().replace('is', '')}`).exists()).toBeTruthy()
  })

  it.each([
    "center", "top", "bottom"
  ])('should render prop align -- %s', (propOption) => {
    const wrapper = mountFactory(
      AtFlexItem,
      undefined,
      { align: propOption }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(`.at-col__align--${propOption}`).exists()).toBeTruthy()
  })

  it.each([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ])('should render prop offset -- %s', (propOption) => {
    const wrapper = mountFactory(
      AtFlexItem,
      undefined,
      { offset: propOption }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(`.at-col__offset-${propOption}`).exists()).toBeTruthy()
  })

  it.each([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ])('should render prop size -- %s', (propOption) => {
    const wrapper = mountFactory(
      AtFlexItem,
      undefined,
      { size: propOption }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(`.at-col-${propOption}`).exists()).toBeTruthy()
  })

  it('should render default slot content', () => {
    const wrapper = mountFactory(
      AtFlexItem,
      undefined,
      undefined,
      { default: [h('view')] }
    )

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.at-col > view').exists()).toBeTruthy()

  })
})