import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtList from '../index.vue'
import AtListItem from '../item/index.vue'

describe('AtList', () => {
  const mountFn = genMountFn(AtList)
  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render default slot', async () => {
    const wrapper = mountFn({}, {
      default: ['slot content']
    })

    expect(
      wrapper.text()
    ).toBe('slot content')
  })

  it.concurrent('should render prop hasBorder', async () => {
    const wrapper = mountFn(AtList)
    expect(
      wrapper
        .find('.at-list--no-border')
        .exists()
    ).toBeFalsy()

    await wrapper.setProps({ hasBorder: false })
    expect(
      wrapper
        .find('.at-list--no-border')
        .exists()
    ).toBeTruthy()
  })
})

const iconInfo = {
  size: 25,
  color: '#78A4FA',
  value: 'calendar',
  class: 'klass',
  style: 'background-color: teal;'
}

describe('AtListItem', () => {
  const mountFn = genMountFn(AtListItem)
  testPropClassAndStyle(mountFn)

  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFn({
      class: 'test',
      style: 'color: red;',
      note: 'note',
      title: 'title',
      thumb: 'http://img.test.com/3N31e.png',
      extraText: 'extraText',
      arrow: 'right',
      iconInfo
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop thumb', async () => {
    const wrapper = mountFn({
      thumb: 'http://img.test.com/3N31e.png'
    })

    const thumbEl = wrapper.find('.at-list__item-thumb')
    expect(thumbEl.exists()).toBeTruthy()
    expect(
      wrapper
        .find('.at-list__item-thumb > .item-thumb__info')
        .attributes('src')
    ).toBe('http://img.test.com/3N31e.png')

  })

  it.concurrent('should render prop iconInfo', async () => {
    const wrapper = mountFn({
      iconInfo: {
        ...iconInfo,
        prefixClass: 'prefixClass'
      }
    })

    const iconWrapperEl = wrapper.find('.at-list__item-icon')

    expect(iconWrapperEl.exists()).toBeTruthy()

    const iconEl = wrapper.find('.at-list__item-icon > view')

    expect(iconEl.classes()).toEqual([
      'prefixClass',
      'prefixClass-calendar',
      'klass'
    ])

    expect(
      iconEl.attributes('style')
    ).toEqual(
      `color: ${hexToRGBA('#78A4FA')}; font-size: 25px; background-color: teal;`
    )
  })

  it.concurrent.each([
    'title',
    'note'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn({
      [propName]: propName
    })

    expect(
      wrapper
        .find(`.item-content__info-${propName}`)
        .text()
    ).toEqual(propName)
  })

  it.concurrent('should render prop extraText', async () => {
    const wrapper = mountFn({
      extraText: 'extraText'
    })

    const extraTextEl = wrapper.find(`.item-extra__info`)
    expect(extraTextEl.text()).toBe('extraText')
  })

  it('should render prop extraThumb and match snapshot', async () => {
    const wrapper = mountFn({
      extraThumb: 'http://img.test.com/3N31e.png'
    })

    expect(
      wrapper
        .find(`.item-extra__image-info`)
        .attributes('src')
    ).toBe('http://img.test.com/3N31e.png')

    expect(
      wrapper
        .find(`.item-extra__image`)
        .element
    ).toMatchSnapshot()
  })

  it('should render prop isSwitch and match snapshot', async () => {
    const wrapper = mountFn({
      isSwitch: true,
      switchColor: 'red'
    })

    const switchWrapperEl = wrapper.find('.item-extra__switch')
    expect(switchWrapperEl.exists()).toBeTruthy()
    expect(switchWrapperEl.element).toMatchSnapshot()

    const swithEl = wrapper.find('.item-extra__switch > switch')

    expect(
      swithEl.attributes('checked')
    ).toBe("false")

    expect(
      swithEl.attributes('disabled')
    ).toBe('false')

    expect(
      swithEl.attributes('color')
    ).toBe('red')

    await wrapper.setProps({ switchChecked: true })
    expect(
      wrapper
        .find('.item-extra__switch > switch')
        .attributes('checked')
    ).toBe("true")
  })

  it.concurrent.each([
    'up', 'down', 'right'
  ])('should render prop arrow -- %s', (option) => {
    const wrapper = mountFn({
      arrow: option
    })

    const extraIconWrapperEl = wrapper.find('.item-extra__icon')
    expect(extraIconWrapperEl.exists()).toBeTruthy()

    expect(
      wrapper
        .find('.item-extra__icon-arrow')
        .classes()
    ).toContain(`at-icon-chevron-${option}`)
  })

  it('should warn invalid prop arrow and fallback to right', () => {
    const wrapper = mountFn({
      arrow: 'left'
    })

    const extraIconWrapperEl = wrapper.find('.item-extra__icon')
    expect(extraIconWrapperEl.exists()).toBeTruthy()
    expect(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "arrow".'
    ).toHaveBeenWarned()
    expect(
      wrapper
        .find('.item-extra__icon-arrow')
        .classes()
    ).toContain(`at-icon-chevron-right`)
  })
})

describe('AtListItem events ', () => {
  const mountFn = genMountFn(AtListItem)

  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      onClick
    })

    await wrapper.find('.at-list__item').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })

  it('should emit switch-change', async () => {
    const checked = ref(false)
    const onSwitchChange = jest.fn((e) => {
      checked.value = e.detail
    })

    const wrapper = mountFn({
      isSwitch: true,
      switchChecked: checked.value,
      onSwitchChange
    })

    await wrapper
      .find('.item-extra__switch > switch')
      .trigger('change', { detail: true })

    expect(wrapper.emitted()).toHaveProperty('switch-change')
    expect(onSwitchChange).toBeCalled()
    expect(checked.value).toBe(true)
  })

  it('should not trigger any event when disabled', async () => {
    const onSwitchChange = jest.fn()
    const onClick = jest.fn()

    const wrapper = mountFn({
      disabled: true,
      isSwitch: true,
      onClick,
      onSwitchChange
    })

    await wrapper.find('.at-list__item').trigger('tap')
    await wrapper
      .find('.item-extra__switch > switch')
      .trigger('change', { detail: true })

    expect(wrapper.emitted()).not.toHaveProperty('click')
    expect(wrapper.emitted()).not.toHaveProperty('switch-change')
    expect(onClick).not.toBeCalled()
    expect(onSwitchChange).not.toBeCalled()
  })

  // @TODO: check how to mock event.stopProparation()
  it.skip('should stop propagation when clicking switch wrapper', async () => {
    const stopPropagation = jest.fn(() => {
      console.log('triggered')
    })

    const wrapper = mountFn({
      isSwitch: true
    })

    expect(
      wrapper
        .find('.item-extra__switch')
        .exists()
    ).toBeTruthy()

    await wrapper
      .find('.item-extra__switch')
      .trigger('tap', { stopPropagation })

    expect(stopPropagation).toBeCalled()
  })
})
