import { mountFactory, Slots } from '@taro-ui-vue3/test-utils/helper'
import { ref } from 'vue'
import AtTabBar from '../index'

const factory = (values = {}, slots: Slots = { default: [''] }) => {
  return mountFactory(AtTabBar, {}, values, slots)
}

const tabList = [
  { title: '待办事项', iconType: 'bullet-list', text: 'new' },
  { title: '拍照', iconType: 'camera' },
  { title: '文件夹', iconType: 'folder', text: '100', max: '99' },
  {
    title: '领取中心',
    image:
      'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    selectedImage:
      'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
    text: 'new',
  },
]

describe('AtTabBar', () => {

  it('should render default AtTabBar', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- backgroundColor', () => {
    const wrapper = factory({ fixed: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- tabList', () => {
    const wrapper = factory({ tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- iconSize', () => {
    const wrapper = factory({ iconSize: '26', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- fontSize', () => {
    const wrapper = factory({ fontSize: 26, tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: 'red', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- selectedColor', () => {
    const wrapper = factory({ selectedColor: 'red', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render prop -- scroll', () => {
    const wrapper = factory({ scroll: true, tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtTabBar Behavior', () => {
  it('should trigger onClick event, and prop current should be equal to index of the item clicked', async () => {
    const current = ref(0)
    const onClick = jest.fn((index) => {
      current.value = index
    })
    const wrapper = factory({ current: current.value, tabList: tabList, onClick: onClick })

    await wrapper.find('.at-tab-bar__item:nth-child(3)').trigger('tap')
    expect(onClick).toBeCalled()

    await wrapper.vm.$nextTick()
    expect(current.value).toBe(2)
  })
})
