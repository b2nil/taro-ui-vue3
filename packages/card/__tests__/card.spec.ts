import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import { h } from '@vue/runtime-core'
import AtCard from '../index.vue'

const mountFn = genMountFn(AtCard)
const thumb = "http://test.pic.com/ni74d.png"
const title = "title"
const note = "tips"
const extra = "2021-01-29 01:00:00"
const extraStyle = { fontSize: '10px' }

describe('AtCard', () => {
  it('should render complete Card and match snapshot', () => {
    const wrapper = mountFn({
      thumb,
      title,
      note,
      extra,
      extraStyle
    }, {
      default: [h('view', { class: 'default' }, { default: () => 'slot content' })]
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    ['thumb', thumb],
    ['icon', { value: 'menu', color: 'red', size: 12 }],
    ['title', title],
    ['extra', extra],
    ['extraStyle', extraStyle],
  ])('should render prop %s', async (propName, propValue) => {
    let props = { [propName]: propValue }
    let id = propName

    if (propName === 'extraStyle') {
      props['extra'] = extra
      id = 'extra'
    }

    const wrapper = mountFn({ ...props })
    const headerChildEl = wrapper.find(`.at-card__header-${id}`)

    expect(headerChildEl.exists()).toBeTruthy()

    switch (propName) {
      case 'thumb':
        expect(
          headerChildEl
            .find('.at-card__header-thumb-info')
            .attributes('src')
        ).toEqual(thumb)
        return
      case 'icon':
        expect(
          headerChildEl.classes()
        ).toContain('at-icon-menu')
        expect(
          headerChildEl.attributes('style')
        ).toContain('color: red; font-size: 12px;')
        return
      case 'title':
        expect(
          headerChildEl.text()
        ).toEqual(title)
        return
      case 'extra':
        expect(
          headerChildEl.text()
        ).toEqual(extra)
        return
      case 'extraStyle':
        expect(
          headerChildEl.attributes('style')
        ).toEqual("font-size: 10px;")
        return
    }


  })

  it('should render prop note', async () => {
    const wrapper = mountFn({ note })
    const noteEl = wrapper.find('.at-card__content-note')
    expect(
      noteEl.exists()
    ).toBeTruthy()
    expect(
      noteEl.text()
    ).toEqual(note)
  })

  it('should render prop isFull', async () => {
    const wrapper = mountFn({ isFull: true })
    expect(wrapper.find('.at-card--full').exists()).toBeTruthy()
  })

  it('should render slot contents', async () => {
    const wrapper = mountFn({}, {
      default: () => [h('view', { class: 'defualt' })],
      renderIcon: () => [h('icon', { class: 'renderIcon' })]
    })

    expect(wrapper.find('.defualt').exists()).toBeTruthy()
    expect(wrapper.find('.renderIcon').exists()).toBeTruthy()
  })
})

describe('AtCard events', () => {
  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({
      onClick: onClick,
    })
    await wrapper.find('.at-card').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })
})
