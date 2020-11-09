import { mount } from '@vue/test-utils'
import AtAccordion from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('AtAccordion.vue', () => {
  test('render test && class', () => {
    const wrapper = mount(AtAccordion, {
      props: {
        title: AXIOM,
      },
    })
    expect(wrapper.find('.at-accordion__info__title').text()).toEqual(AXIOM)
    expect(wrapper.find('.at-accordion').classes()).toContain('at-accordion__info')
  })

  test('default slot', () => {
    const wrapper = mount(AtAccordion, {
      slots: {
        default: AXIOM
      }
    })
    expect(wrapper.find('.at-accordion__body').text()).toEqual(AXIOM)
  })
})
