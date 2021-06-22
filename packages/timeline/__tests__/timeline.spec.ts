import { genMountFn } from '@taro-ui-vue3/test-utils/helper'
import AtTimeline from '../index.vue'

const mountFn = genMountFn(AtTimeline)


describe('AtTimeline', () => {
  const items = [
    { title: '刷牙洗脸' },
    { title: '吃早餐', color: 'green' },
    {
      title: '上班',
      content: ['查看邮件', '写 PPT', '发送 PPT 给领导'],
      icon: 'clock',
    },
    { title: '睡觉', icon: 'clock' }
  ]

  it('should render prop items and match snapshot', () => {
    const wrapper = mountFn({ items })
    expect(wrapper.element).toMatchSnapshot()

    const timelineItems = wrapper.findAll('.at-timeline-item')
    items.forEach((item, index) => {

      if (item.color) {
        const colorClass = `at-timeline-item--${item.color}`
        expect(
          timelineItems[index].classes()
        ).toContain(colorClass)
      }

      expect(
        timelineItems[index]
          .find('view:nth-child(2)')
          .classes()
      ).toContain(
        item.icon
          ? 'at-timeline-item__icon'
          : 'at-timeline-item__dot'
      )

      const iconEl = timelineItems[index].find('.at-timeline-item__icon > text')
      expect(iconEl.exists()).toBe(Boolean(item.icon))
      if (iconEl.exists()) {
        expect(iconEl.classes()).toContain(`at-icon-${item.icon}`)
      }

      expect(
        timelineItems[index]
          .find('.at-timeline-item__content > .at-timeline-item__content-item')
          .text()
      ).toEqual(item.title)

      if (item.content) {
        timelineItems[index]
          .findAll('.at-timeline-item__content > .at-timeline-item__content-item--sub')
          .forEach((el, i) => {
            expect(el.text()).toEqual(item.content[i])
          })
      }
    })
  })

  it('should render prop pending', () => {
    const wrapper = mountFn({ items, pending: true })
    expect(wrapper.classes()).toContain('at-timeline--pending')
  })
})
