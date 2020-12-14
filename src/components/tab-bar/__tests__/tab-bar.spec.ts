import { mountFactory, Slots } from '@/tests/helper'
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

describe('AtTabBar Snap', () => {

  it('should render initial AtTabBar', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props backgroundColor', () => {
    const wrapper = factory({ fixed: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props tabList', () => {
    const wrapper = factory({ tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props iconSize', () => {
    const wrapper = factory({ iconSize: '26', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props fontSize', () => {
    const wrapper = factory({ fontSize: 26, tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props color', () => {
    const wrapper = factory({ color: 'red', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render AtTabBar -- props selectedColor', () => {
    const wrapper = factory({ selectedColor: 'red', tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should render AtTabBar -- props scroll', () => {
    const wrapper = factory({ scroll: true, tabList: tabList })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtTabBar Events', () => {
  it('should trigger onClick event, and prop current should be equal to index of the item clicked', async () => {
    const onClick = jest.fn()
    const wrapper = factory({ tabList: tabList, onClick: onClick })

    wrapper.find('.at-tab-bar__item:nth-child(3)').trigger('tap')
    expect(onClick).toBeCalled()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.current).toBe(2)
    })
  })
})
