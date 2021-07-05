import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtAvatar from '../index.vue'

const mountFn = genMountFn(AtAvatar)

describe('Avatar', () => {
  it("should render default and match snapshot", () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    'large',
    'normal',
    'small'
  ])('should render props size -- %s', async (size) => {
    const wrapper = mountFn({ size })
    expect(
      wrapper
        .get('.at-avatar')
        .classes()
    ).toContain(`at-avatar--${size}`)
  })

  it('should render normal size if prop size failed validation', async () => {
    const wrapper = mountFn({ size: 'xsmall' })

    expect(
      '[Vue warn]: Invalid prop: custom validator check failed for prop \"size\".'
    ).toHaveBeenWarned()

    expect(
      "[Vue warn]: Prop `size` must be one of <'large' | 'normal' | 'small'>"
    ).toHaveBeenWarned()

    expect(wrapper.find('.at-avatar--xsamll').exists()).toBe(false)
    expect(wrapper.find('.at-avatar--normal').exists()).toBe(true)
  })


  it('should render props circle', async () => {
    const wrapper = mountFn({ circle: true })
    expect(
      wrapper
        .get('.at-avatar')
        .classes()
    ).toContain(`at-avatar--circle`)
  })

  it('should render empty letter if prop text is not given', async () => {
    const wrapper = mountFn()
    const textEL = wrapper.find(`.at-avatar__text`)
    expect(textEL.exists()).toBeTruthy()
    expect(textEL.text()).toEqual("")
  })

  it.each([
    'image',
    'text'
  ])('should render prop %s', async (propName) => {
    const wrapper = mountFn({
      [propName]: 'https://test.com/img/100'
    })
    const isText = propName === 'text'
    const imageEL = wrapper
      .find(`.at-avatar__${isText ? propName : 'img'}`)

    expect(imageEL.exists()).toBeTruthy()
    if (isText) {
      expect(imageEL.text()).toEqual('h')
    }
  })

  it('should render prop openData', async () => {
    process.env.TARO_ENV = "weapp"
    const wrapper = mountFn({ openData: { type: 'userAvatarUrl' } })
    expect(
      wrapper.find('open-data').exists()
    ).toBeTruthy()
    expect(
      wrapper.find('open-data').attributes('type')
    ).toBe('userAvatarUrl')
    process.env.TARO_ENV = "h5"
  })

  it('should not render open-data element if type of openData is not userAvatarUrl', async () => {
    process.env.TARO_ENV = "weapp"
    const wrapper = mountFn({ openData: { type: 'nickName' } })
    expect(wrapper.find('open-data').exists()).toBe(false)
    process.env.TARO_ENV = "h5"
  })
})