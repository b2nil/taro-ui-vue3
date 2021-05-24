import { mount } from '@vue/test-utils'
import AtCountdown from '../index'
import { sleep } from '@taro-ui-vue3/test-utils/helper'

const factory = async (values = {}, slots = { default: [] }) => {
  const component = mount(AtCountdown as any, {
    slots,
    props: { ...values },
  })
  await sleep(0)
  return component
}

describe('AtCountdown', () => {
  it('should render default AtCountdown', async () => {
    const wrapper = await factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- class', async () => {
    const wrapper = await factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- style', async () => {
    const wrapper = await factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isCard', async () => {
    const wrapper = await factory({ isCard: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- format', async () => {
    const wrapper = await factory({ format: { hours: ':', minutes: ':', seconds: '' } })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- day', async () => {
    const wrapper = await factory({ day: 1 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- hours', async () => {
    const wrapper = await factory({ hours: 1 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- minutes', async () => {
    const wrapper = await factory({ minutes: 1 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- seconds', async () => {
    const wrapper = await factory({ seconds: 1 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- isShowDay', async () => {
    const wrapper = await factory({ isShowDay: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- hours when > 24 and show day', async () => {
    const wrapper = await factory({
      isShowDay: true,
      hours: 25,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop -- hours when > 24 and not show day', async () => {
    const wrapper = await factory({
      isShowDay: false,
      hours: 25,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
