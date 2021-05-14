import { mountFactory } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtList from '../index'
import AtListItem from '../item'

describe('AtList', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFactory(AtList, {}, {}, {
      default: ['slot content']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render default slot', () => {
    const wrapper = mountFactory(AtList, {}, {}, {
      default: ['slot content']
    })

    expect(
      wrapper
        .find('.at-list')
        .text()
    ).toBe('slot content')
  })

  it('should render prop class', () => {
    const wrapper = mountFactory(AtList, {}, { class: 'test' })
    expect(
      wrapper
        .find('.at-list')
        .classes('test')
    ).toBeTruthy()
  })

  it('should render prop style', () => {
    const wrapper = mountFactory(AtList, {}, { style: 'color: red;' })
    expect(
      wrapper
        .find('.at-list')
        .attributes('style')
    ).toBe('color: red;')
  })

  it('should render prop hasBorder', async () => {
    const wrapper = mountFactory(AtList)
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
}

describe('AtListItem', () => {
  it('should render all nodes and match snapshot', () => {
    const wrapper = mountFactory(AtListItem, {}, {
      class: 'test',
      style: 'color: red;',
      note: 'note',
      title: 'title',
      thumb: 'http://img.test.com/3N31e.png',
      extraText: 'extraText',
      arrow: 'right',
      iconInfo: { value: 'calendar' }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop class', () => {
    const wrapper = mountFactory(AtListItem, {}, { class: 'test' })
    expect(
      wrapper
        .find('.at-list__item')
        .classes('test')
    ).toBeTruthy()
  })

  it('should render prop style', () => {
    const wrapper = mountFactory(AtListItem, {}, { style: 'color: red;' })
    expect(
      wrapper
        .find('.at-list__item')
        .attributes('style')
    ).toBe('color: red;')
  })

  it('should render prop thumb', () => {
    const wrapper = mountFactory(AtListItem, {}, {
      thumb: 'http://img.test.com/3N31e.png'
    })

    const thumbEl = wrapper.find('.at-list__item-thumb')
    expect(thumbEl.exists()).toBeTruthy()
    expect(thumbEl.element).toMatchSnapshot()

    expect(
      wrapper
        .find('.at-list__item-thumb > .item-thumb__info')
        .attributes('src')
    ).toBe('http://img.test.com/3N31e.png')

  })

  it('should render prop iconInfo', () => {
    const wrapper = mountFactory(AtListItem, {}, {
      iconInfo: {
        ...iconInfo,
        prefixClass: 'prefixClass',
        class: 'klass',
        style: 'background: teal;'
      }
    })

    const iconWrapperEl = wrapper.find('.at-list__item-icon')

    expect(iconWrapperEl.exists()).toBeTruthy()
    expect(iconWrapperEl.element).toMatchSnapshot()

    const iconEl = wrapper.find('.at-list__item-icon > view')

    expect(iconEl.classes()).toEqual([
      'prefixClass',
      'prefixClass-calendar',
      'klass'
    ])

    expect(iconEl.attributes('style')).toEqual(
      'color: rgb(120, 164, 250); font-size: 25px; background: teal;'
    )
  })

  it.each([
    'title',
    'note'
  ])('should render prop %s', (propName) => {
    const wrapper = mountFactory(AtListItem, {}, {
      [propName]: propName
    })
    expect(
      wrapper
        .find(`.item-content__info-${propName}`)
        .text()
    ).toBe(propName)
  })

  it('should render prop extraText and match snapshot', () => {
    const wrapper = mountFactory(AtListItem, {}, {
      extraText: 'extraText'
    })

    const extraTextEl = wrapper.find(`.item-extra__info`)
    expect(extraTextEl.text()).toBe('extraText')
    expect(extraTextEl.element).toMatchSnapshot()
  })

  it('should render prop extraThumb and match snapshot', () => {
    const wrapper = mountFactory(AtListItem, {}, {
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
    const wrapper = mountFactory(AtListItem, {}, {
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

    await wrapper.setProps({ switchIsCheck: true })
    expect(
      wrapper
        .find('.item-extra__switch > switch')
        .attributes('checked')
    ).toBe("true")
  })

  it.each([
    'up', 'down', 'right'
  ])('should render prop arrow -- %s', (option) => {
    const wrapper = mountFactory(AtListItem, {}, {
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
})

describe('AtListItem Behavior ', () => {
  it('should trigger onClick', async () => {
    const onClick = jest.fn()
    const wrapper = mountFactory(AtListItem, {}, {
      onClick
    })

    await wrapper.find('.at-list__item').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('should trigger onSwitchChange', async () => {
    const checked = ref(false)
    const onSwitchChange = jest.fn((e) => {
      checked.value = e.detail
    })

    const wrapper = mountFactory(AtListItem, {}, {
      isSwitch: true,
      switchIsCheck: checked.value,
      onSwitchChange
    })

    await wrapper
      .find('.item-extra__switch > switch')
      .trigger('change', { detail: true })

    expect(onSwitchChange).toBeCalled()
    expect(checked.value).toBe(true)
  })

  it('should not trigger any event when disabled', async () => {
    const onSwitchChange = jest.fn()
    const onClick = jest.fn()

    const wrapper = mountFactory(AtListItem, {}, {
      disabled: true,
      isSwitch: true,
      onClick,
      onSwitchChange
    })

    await wrapper.find('.at-list__item').trigger('tap')
    await wrapper
      .find('.item-extra__switch > switch')
      .trigger('change', { detail: true })

    expect(onClick).not.toBeCalled()
    expect(onSwitchChange).not.toBeCalled()
  })



  // @TODO: check how to mock event.stopProparation()
  it.skip('should stop propagation when clicking switch wrapper', async () => {
    const ev = { stopPropagation: jest.fn() }

    const wrapper = mountFactory(AtListItem, {}, {
      isSwitch: true
    })

    await wrapper
      .find('.item-extra__switch')
      .trigger('tap', ev)

    expect(ev.stopPropagation).toBeCalled()
  })
})
