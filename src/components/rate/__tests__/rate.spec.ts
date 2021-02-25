import { mount } from '@vue/test-utils'
import { ref } from '@vue/runtime-core'
import AtRate from '../index'

const factory = (values = {}, slots = { default: [] }) => {
  return mount(AtRate as any, {
    slots,
    props: { ...values },
  })
}

describe('AtRate', () => {
  it('should render default AtRate', () => {
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

  it('should render prop -- size', () => {
    const wrapper = factory({ size: '10' })
    expect(wrapper.element).toMatchSnapshot()

    wrapper.findAll(".at-icon").forEach(el => {
      expect(el.attributes('style')).toContain('font-size: 10px;')
    })
  })

  it('should render prop -- value', () => {
    const wrapper = factory({ value: 2 })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAll('.at-rate__icon--on').length).toEqual(2)
  })

  it('should render prop -- max', () => {
    const wrapper = factory({ max: 10 })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAll('.at-rate__icon').length).toEqual(10)
  })

  it('should render prop -- margin', () => {
    const wrapper = factory({ margin: 10 })

    const pxTransform = function (size, designWidth) {
      if (designWidth == null) {
        throw new Error('pxTransform 函数在 H5 中运行需要把配置中的 `designWidth` 作为第二个参数传入')
      }
      return Math.ceil((((parseInt(size, 10) / 40) * 640) / designWidth) * 10000) / 10000 + 'rem'
    }

    const margin = `margin-right: ${pxTransform(10, 750)};`

    expect(wrapper.element).toMatchSnapshot()
    wrapper.findAll(".at-rate__icon").forEach(el => {
      expect(el.attributes('style')).toContain(margin)
    })
  })

  it('should render prop -- icon: star', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-star-2").exists()).toBeTruthy()
  })

  it('should render prop -- icon: heart', () => {
    const wrapper = factory({ icon: 'heart' })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-icon-heart-2").exists()).toBeTruthy()
  })

  it('should render prop -- color', () => {
    const wrapper = factory({ value: 1, color: 'teal' })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find(".at-rate__icon--on .at-icon").attributes().style).toContain('color: teal')
  })
})

describe('AtRate Behavior', () => {
  it('should trigger onChange Event', () => {
    const onChange = jest.fn()
    const wrapper = factory({ value: 2, onChange: onChange })
    wrapper.find('.at-rate__icon').trigger('tap')
    expect(onChange).toBeCalled()
  })

  it('should trigger "onUpdate:value" when vModel is used', async () => {
    const modelValue = ref(1)
    const wrapper = factory({
      value: modelValue.value,
      'onUpdate:value': jest.fn().mockImplementation((e) => {
        modelValue.value = e
      })
    })
    expect(wrapper.findAll('.at-rate__icon--on').length).toEqual(1)
    wrapper.findAll('.at-rate__icon').forEach((el, i) => {
      if (i === 2) {
        el.trigger('tap')
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.value).toBe(3)
      expect(wrapper.findAll('.at-rate__icon--on').length).toBe(3)
    })
  })
})
