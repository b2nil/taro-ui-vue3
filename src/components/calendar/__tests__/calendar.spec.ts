import { mountFactory } from '@/tests/helper'
import AtCalendar from '../index'
import Taro from '@tarojs/taro'

const today = new Date()
const dString = today.toISOString().substring(0, 7)

describe('AtCalendar', () => {
  it('should render default calendar -- h5', () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate: '2020-12-27',
      marks: [{ value: "2020-11-27" }, { value: "2020-12-01" }]
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.main > .main__body > .body__slider--pre').exists()).toBeTruthy()
    expect(wrapper.find('.main > .main__body > .body__slider--now').exists()).toBeTruthy()
    expect(wrapper.find('.main > .main__body > .body__slider--next').exists()).toBeTruthy()
  })

  it('should render default calendar -- mini-apps', () => {
    jest.mock('@tarojs/taro')
    const getEnv = jest.spyOn(Taro, 'getEnv').mockImplementation(() => {
      return Taro.ENV_TYPE.WEAPP
    })

    const wrapper = mountFactory(AtCalendar, undefined, { currentDate: '2020-12-27' })

    expect(wrapper.find('.main > swiper > swiper-item').exists()).toBeTruthy()
    expect(wrapper.find('.main > swiper > swiper-item').exists()).toBeTruthy()
    expect(wrapper.find('.main > swiper > swiper-item').exists()).toBeTruthy()
    getEnv.mockRestore()
  })

  it('should only render date list of the current month if not using swiper', () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      isSwiper: false,
      currentDate: '2020-12-27'
    })
    expect(wrapper.find('.body__slider--now').exists()).toBeTruthy()
    expect(wrapper.find('.body__slider--pre').exists()).toBeFalsy()
    expect(wrapper.find('.body__slider--next').exists()).toBeFalsy()
  })

  it('should render calendar controller', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, { currentDate: '2020-12-27' })
    expect(wrapper.find('.at-calendar__controller').exists()).toBeTruthy()
    expect(wrapper.find('.controller__info').text()).toEqual('2020 年 12 月')

    await wrapper.setProps({ hideArrow: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.controller__arrow').exists()).toBeFalsy()
  })

  it('should render calendar header', () => {
    const days = ['日', '一', '二', '三', '四', '五', '六']
    const wrapper = mountFactory(AtCalendar)

    expect(wrapper.find('.at-calendar__header').exists()).toBeTruthy()

    wrapper.findAll('.header__flex-item').forEach((headerItem, index) => {
      expect(headerItem.text()).toEqual(days[index])
    })
  })

  it('should render calendar date-list', () => {
    const wrapper = mountFactory(
      AtCalendar,
      undefined,
      { currentDate: '2020-12-27' }
    )

    const preMonthList = wrapper.findAll(
      '.body__slider--pre > .at-calendar__list > .flex__item--now'
    )

    const nowMonthList = wrapper.findAll(
      '.body__slider--now > .at-calendar__list > .flex__item--now'
    )

    const nextMonthList = wrapper.findAll(
      '.body__slider--next > .at-calendar__list > .flex__item--now'
    )

    expect(preMonthList.length).toEqual(30)
    expect(nowMonthList.length).toEqual(31)
    expect(nextMonthList.length).toEqual(31)
  })

  it('should render marks', async () => {
    today.setDate(today.getDate() - 28)
    const prevM = new Date(today).toISOString().substring(0, 10)
    const wrapper = mountFactory(AtCalendar, undefined, { marks: [{ value: prevM }] })
    expect(wrapper.findAll('.flex__item:not(.flex__item--blur) .mark').length).toBe(1)
    await wrapper.setProps({ marks: [{ value: `${dString}-21` }, { value: prevM }, { value: `${dString}-23` }] })
    wrapper.vm.$nextTick()
    expect(wrapper.findAll('.flex__item:not(.flex__item--blur) .mark').length).toBe(3)
  })

  it('should render minDate and maxDate', () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate: '2020-12-27',
      minDate: '2020-12-27',
      maxDate: '2020-12-28'
    })
    expect(
      wrapper
        .findAll('.body__slider--now .flex__item--now:not(.flex__item--blur)')
        .length
    ).toBe(2)
    expect(
      wrapper
        .findAll('.body__slider--now > .at-calendar__list > .flex__item--now.flex__item--blur')
        .length
    ).toBe(29)
  })

  // need to enable handleSelectedDates in plugin.ts
  // currently selectedDates not supported
  it.skip('should render multi-selected dates', () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate: { start: '2020-12-27', end: '2020-12-28' },
      isMultiSelect: true,
      selectedDates: [{ start: '2020-12-27', end: '2020-12-28' }]
    })
    expect(
      wrapper
        .findAll('.flex__item--selected')
        .length
    ).toBe(2)
  })

  it('should render valid dates', () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      validDates: [{ value: `${dString}-21` }, { value: `${dString}-25` }]
    })

    expect(
      wrapper
        .findAll('.body__slider--now .flex__item--now:not(.flex__item--blur)')
        .length
    ).toBe(2)
  })
})

describe('AtCalendar Behavior', () => {
  let mockFn: jest.Mock<any, any>
  let currentDate = new Date().toISOString().substring(0, 10)
  let year = parseInt(currentDate.substring(0, 4))
  let month = parseInt(currentDate.substring(5, 7))
  let paddingZero = (month) => {
    return month < 10 ? `0${month}` : `${month}`
  }

  beforeEach(() => {
    mockFn = jest.fn()
  })

  it('should trigger onClickPreMonth', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate,
      onClickPreMonth: mockFn
    })
    expect(wrapper.find('.controller__info').text()).toEqual(`${year} 年 ${paddingZero(month)} 月`)

    await wrapper.find('.controller__arrow--left').trigger('tap')
    expect(
      wrapper.find('.controller__info').text()
    ).toEqual(
      `${month === 1 ? year - 1 : year} 年 ${month === 1 ? 12 : paddingZero(month - 1)} 月`
    )

    expect(mockFn).toBeCalled()
  })

  it('should trigger onClickNextMonth', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate,
      onClickNextMonth: mockFn
    })
    expect(wrapper.find('.controller__info').text()).toEqual(`${year} 年 ${paddingZero(month)} 月`)

    await wrapper.find('.controller__arrow--right').trigger('tap')
    expect(
      wrapper.find('.controller__info').text()
    ).toEqual(
      `${month === 12 ? year + 1 : year} 年 ${month === 12 ? '01' : paddingZero(month + 1)} 月`
    )

    expect(mockFn).toBeCalled()
  })

  it('should trigger onDayClick and onSelectDate', async () => {
    const onSelectDate = jest.fn()
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate,
      onSelectDate,
      onDayClick: mockFn
    })
    await wrapper.find('.flex__item--today').trigger('tap', { value: currentDate })
    expect(mockFn).toBeCalled()
    expect(mockFn.mock.calls[0][0]).toEqual({ value: currentDate })
    await wrapper.vm.$nextTick()
    expect(onSelectDate).toBeCalled()
    expect(onSelectDate.mock.calls[0][0]).toEqual({ value: { start: currentDate, end: currentDate } })

  })

  it('should trigger onDayLongClick', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      currentDate,
      onDayLongClick: mockFn,
    })
    await wrapper.find('.flex__item--today').trigger('longpress', { value: currentDate })
    expect(mockFn).toBeCalled()
    expect(mockFn.mock.calls[0][0]).toEqual({ value: currentDate })
  })

  it('should trigger onMonthChange when picking dates from the controller', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, { onMonthChange: mockFn })

    await wrapper
      .find('.at-calendar__controller > picker')
      .trigger('change', { detail: { value: '2020-12-27' } })

    expect(mockFn).toBeCalled()
    expect(mockFn.mock.calls[0][0]).toEqual('2020-12-27')
  })

  it.skip('should trigger onMonthChange by swiping when use Swiper in h5', async () => {
    const wrapper = mountFactory(AtCalendar, undefined, {
      isSwiper: true,
      onMonthChange: mockFn
    })

    await wrapper
      .find('.at-calendar-slider__main')
      .trigger('touchend', { touches: [{ clientX: 30 }] })

    expect(mockFn).toBeCalled()
  })

  it.skip('should trigger onMonthChange by swiping in mini-app', async () => {
    jest.mock('@tarojs/taro')
    const getEnv = jest.spyOn(Taro, 'getEnv').mockImplementation(() => {
      return Taro.ENV_TYPE.WEAPP
    })

    const wrapper = mountFactory(AtCalendar, undefined, { onMonthChange: mockFn })

    const swiper = wrapper.find('swiper.main__body')
    expect(swiper.exists()).toBe(true)

    await swiper.trigger('touchstart', {
      changedTouches: [
        {
          clientX: 20,
          clientY: 50
        }
      ]
    })
    expect(mockFn).toBeCalled()
    getEnv.mockRestore()
  })
})
