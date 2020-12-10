import { mount } from '@vue/test-utils'
import AtDivider from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtDivider as any, {
    global: {
      components: {}
    },
    slots,
    props: { ...values },
  })
}

describe('AtDivider Snap', () => {
  it('render initial AtDivider', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props class', () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props style', () => {
    const wrapper = factory({ style: 'color:red;' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props content', () => {
    const wrapper = factory({ content: 'content' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props height', () => {
    const wrapper = factory({ height: '120' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props fontColor', () => {
    const wrapper = factory({ fontColor: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props fontSize', () => {
    const wrapper = factory({ fontSize: '56' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props lineColor', () => {
    const wrapper = factory({ lineColor: '#fff' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render AtDivider -- props childen', () => {
    const wrapper = factory({ childen: 'content' }, { default: ['test'] })
    expect(wrapper.element).toMatchSnapshot()
  })
})
