import {
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import AtCountdown from '../index.vue'

const mountFn = genMountFn(AtCountdown)
const toMilliseconds = (
  day: number = 0,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): number => {
  return (day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds) * 1000
}

describe('AtCountdown', () => {
  jest.useFakeTimers()

  testPropClassAndStyle(mountFn)

  it('should render default props and match snapshot', async () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render prop isCard', async () => {
    const wrapper = mountFn({ isCard: true })
    expect(wrapper.classes()).toContain('at-countdown--card')
  })

  it('should render prop format', async () => {
    const wrapper = mountFn({
      format: { hours: ':', minutes: ':', seconds: '' }
    })
    const seps = wrapper.findAll('.at-countdown__separator')
    expect(seps[0].text()).toEqual(':')
    expect(seps[1].text()).toEqual(':')
    expect(seps[2].text()).toEqual('')
  })

  it.each([
    ['day', 1, 0, '24'],
    ['hours', 1, 0, '01'],
    ['minutes', 1, 1, '01'],
    ['seconds', 1, 2, '01']
  ])('should render prop %s', async (
    propName,
    propValue,
    index,
    expected
  ) => {
    const wrapper = mountFn({ [propName]: propValue })

    let ms = 0
    switch (propName) {
      case 'day':
        ms = toMilliseconds(propValue)
        break
      case 'hours':
        ms = toMilliseconds(0, propValue)
        break
      case 'minutes':
        ms = toMilliseconds(0, 0, propValue)
        break
      default:
        ms = toMilliseconds(0, 0, 0, propValue)
        break
    }

    const timeEls = wrapper
      .findAll(`.at-countdown__time`)
    expect(timeEls[index].text()).toEqual(expected)

    jest.advanceTimersByTime(ms)
    await wrapper.vm.$nextTick()
    wrapper.findAll('.at-countdown__time').forEach(el => {
      expect(el.text()).toEqual('00')
    })
  })

  it('should render prop isShowDay', async () => {
    const wrapper = mountFn({ isShowDay: true, day: 1 })

    expect(
      wrapper.find(`.at-countdown__time`).text()
    ).toEqual('01')

    expect(
      wrapper
        .find(`.at-countdown__separator`)
        .text()
    ).toEqual('天')
  })

  it('should render prop hours when > 24 and show day', async () => {
    const wrapper = mountFn({
      isShowDay: true,
      hours: 25,
    })
    const timeEls = wrapper.findAll(`.at-countdown__time`)

    expect(timeEls.length).toEqual(4)
    expect(timeEls[0].text()).toEqual('01')
    expect(timeEls[1].text()).toEqual('01')
    expect(
      wrapper
        .find(`.at-countdown__separator`)
        .text()
    ).toEqual('天')
  })

  it('should render prop hours when > 24 and not show day', async () => {
    const wrapper = mountFn({
      isShowDay: false,
      hours: 25,
    })
    const timeEls = wrapper.findAll(`.at-countdown__time`)

    expect(timeEls.length).toEqual(3)
    expect(timeEls[0].text()).toEqual('25')
    expect(
      wrapper
        .find(`.at-countdown__separator`)
        .text()
    ).toEqual('时')
  })
})
