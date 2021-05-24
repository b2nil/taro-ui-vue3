import { mount } from '@vue/test-utils'
import AtGrid from '../index'

const factory = (values = {}, slots = { default: ['按钮'] }) => {
  return mount(AtGrid as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

const IMAGE_DATA = [
  {
    image:
      'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value: '领取中心',
  },
  {
    image:
      'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value: '找折扣',
  },
  {
    image:
      'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    value: '领会员',
  },
  {
    image:
      'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
    value: '新品首发',
  },
  {
    value: '支持Icon',
    iconInfo: {
      size: 30,
      color: 'red',
      value: 'bookmark',
    },
  },
]

const ICON_DATA = [
  {
    icon: 'bell',
    value: '领取中心',
  },
  {
    icon: 'bookmark',
    value: '找折扣',
  },
  {
    icon: 'calendar',
    value: '领会员',
  },
  {
    icon: 'bell',
    value: 'subtract',
  },
]

describe('Grid', () => {
  it('should render image Grid', () => {
    const wrapper = factory({ data: IMAGE_DATA })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render no border of image Grid', () => {
    const wrapper = factory({ data: IMAGE_DATA, hasBorder: false })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render image Grid in rect mode', () => {
    const wrapper = factory({ data: IMAGE_DATA, mode: 'rect' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render icon Grid', () => {
    const wrapper = factory({ data: ICON_DATA })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render icon Grid in rect mode', () => {
    const wrapper = factory({ data: ICON_DATA, mode: 'rect' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render icon Grid in rect mode with prop columnNum', () => {
    const wrapper = factory({ data: ICON_DATA, mode: 'rect', columnNum: 4 })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('Grid Behavior ', () => {
  it('should trigger onClick', async () => {
    const onClick = jest.fn()

    const wrapper = factory({
      data: ICON_DATA,
      mode: 'rect',
      columnNum: 4,
      onClick: onClick,
    })

    await wrapper.find('.at-grid .at-grid-item').trigger('tap')
    expect(onClick).toBeCalled()
  })
})
