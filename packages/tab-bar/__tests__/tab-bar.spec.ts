import {
  genMountFn,
  hexToRGBA,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtTabBar from '../index.vue'

const mountFn = genMountFn(AtTabBar)

const tabList = [
  { title: '待办事项', iconType: 'bullet-list', text: 'new' },
  { title: '拍照', iconType: 'camera', selectedIconType: 'menu' },
  { title: '文件夹', iconType: 'folder', text: '100', max: '99' },
  {
    title: '领取中心',
    image:
      'https://test.com/df71.png',
    selectedImage:
      'https://test.com/7b09.png',
    text: 'new'
  }
]

describe('AtTabBar', () => {

  testPropClassAndStyle(mountFn)

  it('should render tabList and match snapshot', () => {
    const wrapper = mountFn({ tabList })

    expect(
      wrapper
        .findAll('.at-tab-bar__item')
        .length
    ).toEqual(4)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop backgroundColor', () => {
    const wrapper = mountFn({ backgroundColor: '#fff' })
    expect(
      wrapper.attributes('style')
    ).toContain(`background-color: ${hexToRGBA('#fff')}`)
  })

  it('should render prop iconSize', () => {
    const wrapper = mountFn({ iconSize: '26', tabList })

    expect(
      wrapper
        .find('.at-tab-bar__inner-img')
        .attributes('style')
    ).toContain('width: 26px; height: 26px;')

    expect(
      wrapper
        .find('.at-tab-bar__icon .at-icon')
        .attributes('style')
    ).toContain('font-size: 26px;')


  })

  it('should render prop fontSize', () => {
    const wrapper = mountFn({ fontSize: 26, tabList })
    expect(
      wrapper
        .find('.at-tab-bar__title')
        .attributes('style')
    ).toContain('font-size: 26px;')
  })

  it('should render prop color', () => {
    const wrapper = mountFn({ color: 'red', tabList })
    wrapper
      .findAll('.at-tab-bar__item')
      .forEach((item, i) => {
        if (i === 0) {
          expect(
            item.attributes('style')
          ).not.toContain('color: red;')
          expect(
            item
              .find('.at-tab-bar__icon .at-icon')
              .attributes('style')
          ).not.toContain('color: red;')
        } else {
          expect(
            item.attributes('style')
          ).toContain('color: red;')
          if (i !== 3) {
            expect(
              item
                .find('.at-tab-bar__icon .at-icon')
                .attributes('style')
            ).toContain('color: red;')
          }
        }
      })
  })

  it('should render prop selectedColor', () => {
    const wrapper = mountFn({ selectedColor: 'red', tabList })
    wrapper
      .findAll('.at-tab-bar__item')
      .forEach((item, i) => {
        if (i === 0) {
          expect(
            item.attributes('style')
          ).toContain('color: red;')
          expect(
            item
              .find('.at-tab-bar__icon .at-icon')
              .attributes('style')
          ).toContain('color: red;')
        } else {
          expect(
            item.attributes('style')
          ).not.toContain('color: red;')
          if (i !== 3) {
            expect(
              item
                .find('.at-tab-bar__icon .at-icon')
                .attributes('style')
            ).not.toContain('color: red;')
          }
        }
      })
  })

  it('should render prop fixed', () => {
    const wrapper = mountFn({ fixed: true, tabList })
    expect(wrapper.classes()).toContain('at-tab-bar--fixed')
  })

  it('should render prop current', async () => {
    const current = ref(0)
    const wrapper = mountFn({ current, tabList })
    let selectedItem = wrapper.find('.at-tab-bar__item:nth-child(1)')

    expect(
      selectedItem.classes()
    ).toContain('at-tab-bar__item--active')
    expect(
      selectedItem.attributes('style')
    ).toContain(`color: ${hexToRGBA('#6190E8')}`)
    expect(
      selectedItem
        .find('.at-tab-bar__icon .at-icon')
        .attributes('style')
    ).toContain(`color: ${hexToRGBA('#6190E8')}`)

    current.value = 1
    await wrapper.vm.$nextTick()
    selectedItem = wrapper.find('.at-tab-bar__item:nth-child(2)')

    expect(
      selectedItem.classes()
    ).toContain('at-tab-bar__item--active')
    expect(
      selectedItem.attributes('style')
    ).toContain(`color: ${hexToRGBA('#6190E8')}`)
    expect(
      selectedItem
        .find('.at-tab-bar__icon .at-icon')
        .classes()
    ).toContain(`at-icon-menu`)
    expect(
      selectedItem
        .find('.at-tab-bar__icon .at-icon')
        .attributes('style')
    ).toContain(`color: ${hexToRGBA('#6190E8')}`)
    expect(
      wrapper
        .find('.at-tab-bar__item:nth-child(4) .at-tab-bar__inner-img:last-child')
        .attributes('src')
    ).toEqual(tabList[3].image)

    current.value = 3
    await wrapper.vm.$nextTick()
    selectedItem = wrapper.find('.at-tab-bar__item:nth-child(4)')

    expect(
      selectedItem.classes()
    ).toContain('at-tab-bar__item--active')
    expect(
      selectedItem.attributes('style')
    ).toContain(`color: ${hexToRGBA('#6190E8')}`)
    expect(
      selectedItem
        .find('.at-tab-bar__inner-img:first-child')
        .attributes('src')
    ).toEqual(tabList[3].selectedImage)

  })
})

describe('AtTabBar events', () => {
  it('should emit click event and return index of the item clicked', async () => {
    const current = ref(0)
    const onClick = jest.fn((i) => { current.value = i })
    const wrapper = mountFn({ current, tabList, onClick })

    await wrapper
      .find('.at-tab-bar__item:nth-child(3)')
      .trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')![0]).toEqual([2])
    expect(onClick).toBeCalled()
    expect(current.value).toBe(2)
  })
})
