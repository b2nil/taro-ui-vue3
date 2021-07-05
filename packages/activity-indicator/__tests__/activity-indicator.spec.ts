import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import ActivityIndicator from '../index.vue'

const mountFn = genMountFn(ActivityIndicator)

describe('ActivityIndicator', () => {
  it('should render default props and match snapshot', async () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render props size and color', async () => {
    const wrapper = mountFn({ size: 32, color: '#13CE66' })
    const loadingEl = wrapper.findComponent('.at-loading')
    expect(loadingEl.props('size')).toEqual(32)
    expect(loadingEl.props('color')).toEqual('#13CE66')
  })

  it('should render props content', async () => {
    const wrapper = mountFn()

    expect(
      wrapper
        .find('.at-activity-indicator__content')
        .exists()
    ).toBeFalsy()

    await wrapper.setProps({ content: '加载中...' })

    expect(
      wrapper
        .find('.at-activity-indicator__content')
        .text()
    ).toEqual('加载中...')
  })

  it('should render props mode', async () => {
    const wrapper = mountFn()
    expect(
      wrapper
        .find('.at-activity-indicator--center')
        .exists()
    ).toBeFalsy()

    await wrapper.setProps({ mode: 'center' })
    expect(
      wrapper
        .find('.at-activity-indicator--center')
        .exists()
    ).toBeTruthy()
  })

  it('should render props isOpened', async () => {
    const wrapper = mountFn()
    expect(
      wrapper
        .find('.at-activity-indicator--isopened')
        .exists()
    ).toBeTruthy()

    await wrapper.setProps({ isOpened: false })
    expect(
      wrapper
        .find('.at-activity-indicator--isopened')
        .exists()
    ).toBeFalsy()
  })
})
