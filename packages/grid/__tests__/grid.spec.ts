import {
  genMountFn
} from '@taro-ui-vue3/test-utils/helper'
import AtGrid from '../index.vue'

const mountFn = genMountFn(AtGrid)

const IMAGE_DATA = [
  {
    image: 'https://img12.img.com/a89ddf71.png',
    value: '领取中心'
  },
  {
    image: 'https://img20.img.com/040a074b.png',
    value: '找折扣'
  },
  {
    image: 'https://img10.img.com/4155b931.png',
    value: '领会员'
  },
  {
    image: 'https://img12.img.com/31e68303.png',
    value: '新品首发'
  }
]

const ICON_DATA = [
  {
    value: '领取中心',
    iconInfo: {
      value: 'bell'
    }
  },
  {
    value: '找折扣',
    iconInfo: {
      size: 30,
      color: 'red',
      value: 'bookmark'
    }
  },
  {
    value: '领会员',
    iconInfo: {
      size: 30,
      color: 'red',
      value: 'calendar',
      prefixClass: 'taro'
    }
  },
  {
    value: '新品首发',
    iconInfo: {
      size: 30,
      color: 'red',
      value: 'subtract',
      class: 'klass',
      style: 'background: teal;'
    }
  },
]

describe('AtGrid', () => {

  it('should render image data and match snapshot', () => {
    const wrapper = mountFn({ data: IMAGE_DATA })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render icon data and match snapshot', () => {
    const wrapper = mountFn({ data: ICON_DATA })
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent('should render prop hasBorder', async () => {
    const wrapper = mountFn({ data: IMAGE_DATA })
    let gridItems = wrapper.findAll('.at-grid-item')
    for (const el of gridItems) {
      expect(el.classes()).not.toContain('at-grid-item--no-border')
    }

    await wrapper.setProps({ hasBorder: false })
    gridItems = wrapper.findAll('.at-grid-item')
    for (const el of gridItems) {
      expect(el.classes()).toContain('at-grid-item--no-border')
    }
  })

  it.concurrent.each([
    'square', 'rect'
  ])('should render prop mode -- %s', async (mode) => {
    const wrapper = mountFn({ data: IMAGE_DATA, mode })
    const gridItems = wrapper.findAll('.at-grid-item')
    for (const el of gridItems) {
      expect(el.classes()).toContain(`at-grid-item--${mode}`)
    }
  })

  it('should warn invalid prop mode and fallback to square', async () => {
    const wrapper = mountFn({ data: ICON_DATA, mode: 'unknown' })
    const gridItems = wrapper.findAll('.at-grid-item')
    for (const el of gridItems) {
      expect(el.classes()).toContain(`at-grid-item--square`)
    }
    expect(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "mode".'
    ).toHaveBeenWarned()
  })

  it.concurrent('should render prop columnNum', async () => {
    const wrapper = mountFn({ data: ICON_DATA })
    expect(
      wrapper.findAll('.at-grid__flex').length
    ).toEqual(2)
    expect(
      wrapper
        .findAll('.at-grid__flex:nth-child(1) > .at-grid-item')
        .length
    ).toEqual(3)
    expect(
      wrapper
        .findAll('.at-grid__flex:nth-child(2) > .at-grid-item')
        .length
    ).toEqual(1)

    await wrapper.setProps({ columnNum: 4 })
    expect(
      wrapper.findAll('.at-grid__flex').length
    ).toEqual(1)
    expect(
      wrapper
        .findAll('.at-grid__flex:nth-child(1) > .at-grid-item')
        .length
    ).toEqual(4)
  })
})

describe('AtGrid events ', () => {
  it('shold emit click', async () => {
    const onClick = jest.fn()

    const wrapper = mountFn({
      data: ICON_DATA,
      mode: 'rect',
      columnNum: 4,
      onClick
    })

    await wrapper.find('.at-grid .at-grid-item').trigger('tap')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(
      wrapper.emitted('click')![0]
    ).toEqual([ICON_DATA[0], 0])
    expect(onClick).toBeCalled()
  })
})
