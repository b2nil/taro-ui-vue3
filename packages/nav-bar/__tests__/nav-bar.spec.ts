import { mount } from '@vue/test-utils'
import { h } from '@vue/runtime-core'
import AtNavBar from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtNavBar as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtNavBar', () => {
  it('should render default AtNavBar', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- fixed', () => {
    const wrapper = factory({ fixed: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ color: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- leftIconType', () => {
    const wrapper = factory({ leftIconType: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- leftIconType', () => {
    const wrapper = factory({ leftIconType: { value: 'test', color: 'red', size: 36 } })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- leftText', () => {
    const wrapper = factory({ leftText: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render title as both slot and prop', () => {
    const wrapper = mount({
      render() {
        return (
          h('view', null, [
            h(AtNavBar, null, {
              default: () => [
                h('text', null, "title as slot")
              ]
            }),
            h(AtNavBar, { title: "title as prop" })
          ])
        )
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- rightFirstIconType', () => {
    const wrapper = factory({ rightFirstIconType: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- rightFirstIconType', () => {
    const wrapper = factory({ rightFirstIconType: 'test', color: 'red', size: 36 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- rightSecondIconType', () => {
    const wrapper = factory({ rightSecondIconType: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- rightSecondIconType', () => {
    const wrapper = factory({ rightSecondIconType: 'test', color: 'red', size: 36 })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('AtNavBar Behavior ', () => {
  it('should trigger onClickLeftIcon', () => {
    const onClickLeftIcon = jest.fn()
    const wrapper = factory({
      leftIconType: 'test',
      onClickLeftIcon,
    })
    wrapper.find('.at-nav-bar__left-view').trigger('tap')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should trigger onClickRightSecondIcon', () => {
    const onClickRightSecondIcon = jest.fn()
    const wrapper = factory({
      leftIconType: 'test',
      onClickRightSecondIcon,
    })
    wrapper.find('.at-nav-bar__right-view view:first-child').trigger('tap')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should trigger onClickRightFirstIcon', () => {
    const onClickRightFirstIcon = jest.fn()
    const wrapper = factory({
      leftIconType: 'test',
      onClickRightFirstIcon,
    })
    wrapper.find('.at-nav-bar__right-view view:last-child').trigger('tap')
    expect(wrapper.element).toMatchSnapshot()
  })
})
