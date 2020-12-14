import { mount } from '@vue/test-utils'
import AtAvatar from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtAvatar as any, {
    slots,
    props: { ...values },
  })
}

describe('Avatar Snap', () => {
  it('should render Avatar -- props size(large) ', () => {
    const wrapper = factory({ size: 'large' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar -- props size(normal) ', () => {
    const wrapper = factory({ size: 'normal' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar -- props size(small) ', () => {
    const wrapper = factory({ size: 'small' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar -- props circle', () => {
    const wrapper = factory({ circle: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar -- props image', () => {
    const wrapper = factory({ image: 'https://jdc.jd.com/img/100' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar -- props text', () => {
    const wrapper = factory({ text: '凹凸实验室' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
