import { mount } from '@vue/test-utils'
import AtCard from '../index'

const factory = (
  values = {},
  slots = { default: ['这也是内容区 可以随意定义功能'] }
) => {
  return mount(AtCard as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values, title: '这是个标题' },
  })
}

describe('Card', () => {
  it('should render default Card', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- thumb', () => {
    const wrapper = factory({
      thumb:
        'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- note', () => {
    const wrapper = factory({
      note: '小Tips',
      thumb:
        'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- extra', () => {
    const wrapper = factory({
      note: '小Tips',
      extra: '额外信息',
      thumb:
        'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isFull', () => {
    const wrapper = factory({
      isFull: true,
      note: '小Tips',
      extra: '额外信息',
      thumb:
        'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- extraStyle', () => {
    const wrapper = factory({
      isFull: true,
      note: '小Tips',
      extra: '额外信息',
      extraStyle: { fontSize: '12px', maxWidth: '200px' },
      thumb:
        'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    })
    expect(wrapper.element).toMatchSnapshot()
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
