import { genMountFn, testPropClassAndStyle } from '@taro-ui-vue3/test-utils/helper'
import { h } from 'vue'
import AtFab from '../index.vue'

const mountFn = genMountFn(AtFab)

describe('AtFab', () => {
  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.each([
    'normal', 'small'
  ])('should render prop size -- %s', async (option) => {
    const wrapper = mountFn({ size: option })
    expect(
      wrapper.classes()
    ).toContain(`at-fab--${option}`)
  })

  it('should render slot content', async () => {
    const wrapper = mountFn({}, {
      default: [h('view', { class: 'test' })]
    })

    expect(
      wrapper.find('.test').exists()
    ).toBeTruthy()
  })

  it('should emit click', async () => {
    const onClick = jest.fn()
    const wrapper = mountFn({ onClick })

    await wrapper.find('.at-fab').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(onClick).toBeCalled()
  })
})
