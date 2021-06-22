import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtTabsPane from '../index.vue'

describe('AtTabsPane', () => {

  const mountFn = genMountFn(AtTabsPane)

  it('should render default and match snapshot', () => {
    const wrapper = mountFn({}, { default: ['test'] })
    expect(wrapper.element).toMatchSnapshot()
  })

  testPropClassAndStyle(mountFn)

  it.each([
    'vertical',
    'horizontal'
  ])('should render prop tabDirection -- %s', async (tabDirection) => {
    const wrapper = mountFn({ tabDirection })
    expect(
      wrapper.find('.at-tabs-pane--vertical').exists()
    ).toBe(tabDirection === 'vertical')
  })

  it('should render props index and current', async () => {
    const wrapper = mountFn()
    expect(
      wrapper.classes()
    ).toContain('at-tabs-pane--active')
    expect(
      wrapper.classes()
    ).not.toContain('at-tabs-pane--inactive')

    await wrapper.setProps({ index: 1, current: 0 })
    expect(
      wrapper.classes()
    ).not.toContain('at-tabs-pane--active')
    expect(
      wrapper.classes()
    ).toContain('at-tabs-pane--inactive')
  })
})