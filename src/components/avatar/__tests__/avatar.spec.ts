import { mount } from '@vue/test-utils'
import AtAvatar from '../index'
import * as utils from '../../../utils/common'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtAvatar as any, {
    slots,
    props: { ...values },
  })
}

describe('Avatar', () => {
  it('should render prop -- size(large) ', () => {
    const wrapper = factory({ size: 'large' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size(normal) ', () => {
    const wrapper = factory({ size: 'normal' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- size(small) ', () => {
    const wrapper = factory({ size: 'small' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render Avatar with normal size if prop size failed validation', () => {
    const wrapper = factory({ size: 'xsmall' })
    expect(wrapper.find('.at-avatar--xsamll').exists()).toBe(false)
    expect(wrapper.find('.at-avatar--normal').exists()).toBe(true)
  })

  it('should render prop -- circle', () => {
    const wrapper = factory({ circle: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- image', () => {
    const wrapper = factory({ image: 'https://jdc.jd.com/img/100' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- text', () => {
    const wrapper = factory({ text: '凹凸实验室' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- openData', () => {
    jest.mock('../../../utils/common')
    const getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
      return {
        isWEAPP: true,
        isALIPAY: false,
        isWEB: false
      }
    })

    const wrapper = factory({ openData: { type: 'userAvatarUrl' } })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('open-data').exists()).toBe(true)
    expect(wrapper.find('open-data').attributes('type')).toBe('userAvatarUrl')
    getEnvs.mockClear()
  })

  it('should not render open-data element if type of openData is not userAvatarUrl', () => {
    jest.mock('../../../utils/common')
    const getEnvs = jest.spyOn(utils, 'getEnvs').mockImplementation(() => {
      return {
        isWEAPP: true,
        isALIPAY: false,
        isWEB: false
      }
    })

    const wrapper = factory({ openData: { type: 'nickName' } })
    expect(wrapper.find('open-data').exists()).toBe(false)
    getEnvs.mockClear()
  })
})
