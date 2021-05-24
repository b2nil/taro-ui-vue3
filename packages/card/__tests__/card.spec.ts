import AtIcon from '../../icon'
import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { h } from 'vue'
import AtCard from '../index'

const factory = (
  props = {},
  slots?: Slots
) => {
  return mountFactory(AtCard, undefined, props, slots)
}

const thumbURL = "http://test.pic.com/ni74d.png"
const title = "title"
const note = "tips"
const extra = "2021-01-29 01:00:00"
const extraStyle = { fontSize: '10px' }

describe('AtCard', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = factory({
      thumb: thumbURL,
      title,
      extra,
      extraStyle,
      note
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop thumb', () => {
    const wrapper = factory({
      thumb: thumbURL,
    })
    expect(
      wrapper
        .find(".at-card__header-thumb-info")
        .attributes("src")
    ).toBe(thumbURL)
  })

  it('should render prop title', () => {
    const wrapper = factory({
      title,
    })
    expect(
      wrapper
        .find(".at-card__header-title")
        .text()
    ).toBe(title)
  })

  it('should render prop note', () => {
    const wrapper = factory({
      note,
      thumb: thumbURL,
    })
    expect(
      wrapper
        .find(".at-card__content-note")
        .text()
    ).toBe(note)
  })

  it('should render prop extra and extraStyle', () => {
    const wrapper = factory({
      note,
      extra,
      extraStyle,
      thumb: thumbURL,
    })

    const extraEl = wrapper.find(".at-card__header-extra")
    expect(extraEl.text()).toBe(extra)
    expect(extraEl.attributes('style')).toBe('font-size: 10px;')
  })

  it('should render default slot', () => {
    const wrapper = factory({}, { default: ['slot content'] })
    expect(
      wrapper
        .find(".at-card__content-info")
        .text()
    ).toBe('slot content')
  })

  it('should render prop isFull', () => {
    const wrapper = factory({
      isFull: true
    })

    expect(
      wrapper
        .find(".at-card--full")
        .exists()
    ).toBe(true)
  })

  it('should render prop icon', () => {
    const icon = {
      value: 'test',
      color: 'blue',
      size: '20'
    }

    const wrapper = factory({
      icon
    })

    expect(
      wrapper
        .find(".at-icon-test")
        .exists()
    ).toBe(true)

    expect(
      wrapper
        .find(".at-icon-test")
        .attributes("style")
    ).toBe("color: blue; font-size: 20px;")

  })

  it('should render prop renderIcon', () => {
    const renderIcon = h(AtIcon, {
      prefixClass: 'at-icon',
      value: 'home',
      size: 16,
      color: '#6190e8',
      style: { marginRight: '10px' }
    })

    const wrapper = factory({
      renderIcon
    })

    expect(
      wrapper
        .find(".at-icon-home")
        .exists()
    ).toBe(true)

    expect(
      wrapper
        .find(".at-icon")
        .attributes("style")
    ).toBe("margin-right: 10px; color: rgb(97, 144, 232); font-size: 0.6827rem;")
  })

})

describe('Card Behavior ', () => {
  it('should trigger onClick', async () => {
    const onClick = jest.fn()

    const wrapper = factory({
      onClick: onClick,
    })

    await wrapper.find('.at-card').trigger('tap')
    expect(onClick).toBeCalled()
  })
})
