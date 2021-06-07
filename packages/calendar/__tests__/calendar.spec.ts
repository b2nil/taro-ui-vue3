import {
  genMountFn,
  triggerTouchEvents,
  genDelayedSelectorSpy
} from '@taro-ui-vue3/test-utils/helper'
import { Calendar } from "@taro-ui-vue3/types/calendar"
import dayjs from "dayjs/esm/index"
import * as utils from '@taro-ui-vue3/utils/common'

import AtCalendar from '../index.vue'
import AtCalendarBody from '../body/index.vue'
import AtCalendarController from '../controller/index.vue'
import AtCalendarHeader from '../ui/day-list/index.vue'
import AtCalendarList from '../ui/date-list/index.vue'

describe("AtCalendarHeader", () => {
  const mountFn = genMountFn(AtCalendarHeader)

  it("should render calendar header and match snapshot", () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()

    const days = ['日', '一', '二', '三', '四', '五', '六']
    const dayEls = wrapper.findAll(".header__flex-item")

    days.forEach((day, index) => {
      expect(dayEls[index].text()).toEqual(day)
    })
  })
})

describe("AtCalendarList", () => {
  const mountFn = genMountFn(AtCalendarList)
  const list: Calendar.List<Calendar.Item> = [
    {
      value: '2021/06/04',
      text: 4,
      type: 0,
      marks: [{ value: '2021/06/04' }],
      isActive: true,
      isToday: true,
      isBeforeMin: true,
      isAfterMax: true,
      isDisabled: true,
      isSelected: true,
      isSelectedHead: true,
      isSelectedTail: true,
    },
    {
      value: '2021/06/05',
      text: 5,
      type: 1,
      marks: [{ value: '2021/06/05' }],
    },
    {
      value: '2021/06/06',
      text: 6,
      type: -1,
      marks: [{ value: '2021/06/06' }],
    }
  ]

  it("should render calendar list and match snapshot", () => {
    const wrapper = mountFn({ list })
    expect(wrapper.element).toMatchSnapshot()
  })

  it("should emit click event", async () => {
    const wrapper = mountFn({ list })
    await wrapper.find(".flex__item").trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it("should emit long-click event", async () => {
    const wrapper = mountFn({ list })
    await wrapper.find(".flex__item").trigger('longpress')
    expect(wrapper.emitted()).toHaveProperty('long-click')
  })
})

describe("AtCalendarController", () => {
  const mountFn = genMountFn(AtCalendarController)

  it("should render calendar header and match snapshot", () => {
    const wrapper = mountFn()
    expect(wrapper.element).toMatchSnapshot()
  })

  it.concurrent("should render prop hideArrow", async () => {
    const wrapper = mountFn({ hideArrow: true })
    expect(
      wrapper
        .findAll('.controller__arrow')
        .length
    ).toEqual(0)
  })

  it.concurrent("should render prop generateDate", async () => {
    const wrapper = mountFn({ generateDate: "2021-05-01" })
    expect(
      wrapper.get('picker').attributes('value')
    ).toEqual('2021-05')

    expect(
      wrapper.get('.controller__info').text()
    ).toEqual('2021 年 05 月')
  })

  it.concurrent.each([
    'minDate',
    'maxDate'
  ])("should render prop %s", async (propName) => {
    const wrapper = mountFn({ [propName]: "2021-05-01" })
    const attrs = { minDate: 'start', maxDate: 'end' }

    expect(
      wrapper.get('picker').attributes(attrs[propName])
    ).toEqual('2021-05')
  })

  it.concurrent("should render emit pre-month event", async () => {
    const wrapper = mountFn()
    wrapper.find(".controller__arrow--left").trigger("tap")
    expect(wrapper.emitted()).toHaveProperty("pre-month")
  })

  it.concurrent("should render emit next-month event", async () => {
    const wrapper = mountFn()
    wrapper.find(".controller__arrow--right").trigger("tap")
    expect(wrapper.emitted()).toHaveProperty("next-month")
  })

  it.concurrent("should render emit select-date event", async () => {
    const wrapper = mountFn()
    wrapper.get("picker").trigger("change")
    expect(wrapper.emitted()).toHaveProperty("select-date")
  })
})

describe("AtCalendarBody", () => {
  const generateDate = "2021-06-04"
  const mountFn = genMountFn(AtCalendarBody)
  let delayedSelector: jest.SpyInstance

  beforeAll(() => {
    jest.mock('@taro-ui-vue3/utils/common')
    jest.useFakeTimers()
    delayedSelector = genDelayedSelectorSpy(utils, {
      width: 480,
      height: 480
    })
  })

  afterAll(() => {
    delayedSelector.mockRestore()
  })

  it("should render non-swiper calendar body and match snapshot", () => {
    const wrapper = mountFn({
      isSwiper: false,
      generateDate
    })

    expect(
      wrapper.find('.body__slider--now').exists()
    ).toBeTruthy()

    expect(
      wrapper.find('.body__slider--pre').exists()
    ).toBeFalsy()

    expect(
      wrapper.find('.body__slider--next').exists()
    ).toBeFalsy()

    expect(wrapper.element).toMatchSnapshot()
  })

  it("should render h5 calendar body and match snapshot", () => {
    const wrapper = mountFn({ generateDate })

    expect(
      wrapper
        .find('.main > .main__body > .body__slider--pre')
        .exists()
    ).toBeTruthy()

    expect(
      wrapper
        .find('.main > .main__body > .body__slider--now')
        .exists()
    ).toBeTruthy()

    expect(
      wrapper
        .find('.main > .main__body > .body__slider--next')
        .exists()
    ).toBeTruthy()

    expect(wrapper.element).toMatchSnapshot()
  })

  it("should render miniapp calendar body and match snapshot", () => {
    process.env.TARO_ENV = 'weapp'
    const wrapper = mountFn({ generateDate })

    expect(
      wrapper
        .findAll('.main > swiper > swiper-item')
        .length
    ).toEqual(3)

    expect(wrapper.element).toMatchSnapshot()
    process.env.TARO_ENV = 'h5'
  })

  it.concurrent('should render prop isVertical in h5', async () => {
    const wrapper = mountFn({ isVertical: true, generateDate })

    let h5MainBodyStyle = wrapper
      .find('.main__body--slider')
      .attributes('style')

    expect(h5MainBodyStyle).toContain(
      'transform: translateY(-100%) translate3d(0,0px,0);'
    )

    expect(h5MainBodyStyle).toContain(
      'flex-direction: column;'
    )

    await wrapper.setProps({ isVertical: false })

    h5MainBodyStyle = wrapper
      .find('.main__body--slider')
      .attributes('style')

    expect(h5MainBodyStyle).toContain(
      'transform: translateX(-100%) translate3d(0px,0,0);'
    )

    expect(h5MainBodyStyle).not.toContain(
      'flex-direction: column;'
    )
  })

  it.concurrent('should render prop isVertical in weapp', async () => {
    process.env.TARO_ENV = 'weapp'
    const wrapper = mountFn({ isVertical: true, generateDate })

    const swiperEl = wrapper.find('.main__body')
    expect(swiperEl.attributes('vertical')).toBe('true')
    process.env.TARO_ENV = 'h5'
  })

  describe("events:\n", () => {
    it("should emit events day-click and long-click if not using swiper in h5", async () => {
      const wrapper = mountFn({ isSwiper: false, generateDate })
      const dateList = wrapper.find('.body__slider--now .flex__item')

      await dateList.trigger('tap')
      await dateList.trigger('longpress')

      expect(wrapper.emitted()).toHaveProperty('day-click')
      expect(wrapper.emitted()).toHaveProperty('long-click')
    })

    it("should emit events swipe-month, day-click and long-click in h5", async () => {
      const wrapper = mountFn({ generateDate })
      const dateList = wrapper
        .find('.body__slider--now .flex__item')

      await dateList.trigger('tap')
      await dateList.trigger('longpress')

      expect(wrapper.emitted()).toHaveProperty('day-click')
      expect(wrapper.emitted()).toHaveProperty('long-click')

      let swiperEl = wrapper.find('.main.at-calendar-slider__main')

      await triggerTouchEvents(
        swiperEl,
        { clientX: 50, clientY: 200 },
        { clientX: 350, clientY: 200 }
      )

      jest.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()).toHaveProperty('swipe-month')
      expect(wrapper.emitted('swipe-month')).toHaveLength(1)
      expect(wrapper.emitted()['swipe-month'][0]).toEqual([-1])

      await wrapper.setProps({
        isVertical: true,
        generateDate: Date.now()
      })

      swiperEl = wrapper.find('.main__body')

      await triggerTouchEvents(
        swiperEl,
        { clientX: 200, clientY: 400 },
        { clientX: 200, clientY: 50 }
      )

      jest.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('swipe-month')).toHaveLength(2)
      expect(wrapper.emitted()['swipe-month'][1]).toEqual([1])

    })

    it("should not emit swipe-month in h5 if touch distance is shorter than breakpoint", async () => {
      const wrapper = mountFn({ isVertical: true })
      const swiperEl = wrapper.find('.main.at-calendar-slider__main')

      await triggerTouchEvents(
        swiperEl,
        { clientX: 350, clientY: 200 },
        { clientX: 350, clientY: 350 }
      )

      jest.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()).not.toHaveProperty('swipe-month')
    })

    it("should emit events swipe-month, day-click and long-click in miniapp", async () => {
      process.env.TARO_ENV = "weapp"
      const wrapper = mountFn({ generateDate })

      const dateEl = wrapper
        .find('.main__body swiper-item[item-id="1"] .flex__item')

      await dateEl.trigger('tap')
      await dateEl.trigger('longpress')

      expect(wrapper.emitted()).toHaveProperty('day-click')
      expect(wrapper.emitted()).toHaveProperty('long-click')

      let swiperEl = wrapper.find('.main__body')

      await triggerTouchEvents(
        swiperEl,
        { clientX: 50, clientY: 200 },
        { clientX: 350, clientY: 200 }
      )
      await swiperEl.trigger('change', {
        detail: {
          current: 0,
          source: 'touch'
        }
      })
      await swiperEl.trigger('animationfinish')

      expect(wrapper.emitted()).toHaveProperty('swipe-month')
      expect(wrapper.emitted('swipe-month')).toHaveLength(1)
      expect(wrapper.emitted()['swipe-month'][0]).toEqual([-1])

      await wrapper.setProps({ isVertical: true })
      swiperEl = wrapper.find('.main__body')

      await triggerTouchEvents(
        swiperEl,
        { clientX: 200, clientY: 400 },
        { clientX: 200, clientY: 50 }
      )
      await swiperEl.trigger('change', {
        detail: {
          current: 2,
          source: 'touch'
        }
      })
      await swiperEl.trigger('animationfinish')
      expect(wrapper.emitted('swipe-month')).toHaveLength(2)
      expect(wrapper.emitted()['swipe-month'][1]).toEqual([1])

      process.env.TARO_ENV = "h5"
    })
  })
})

describe('AtCalendar', () => {
  const mountFn = genMountFn(AtCalendar)
  const paddingZero = (digit) => {
    return digit < 10 ? `0${digit}` : `${digit}`
  }

  const normalizeDateString = (dateStr): string => {
    const d = dateStr.split('-')
    return `${d[0]}-${paddingZero(d[1])}-${paddingZero(d[2])}`
  }

  const today = new Date()

  const todayStr = normalizeDateString(today
    .toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    .split(/上午|下午/)[0]
    .replace(/\//g, '-')
    .trimEnd()
  )

  const dString = todayStr.substring(0, 7)

  it.concurrent('should render marks', async () => {
    today.setDate(today.getDate() - 28)
    const prevM = new Date(today).toISOString().substring(0, 10)

    const wrapper = mountFn({
      marks: [{ value: prevM }]
    })

    expect(
      wrapper
        .findAll('.flex__item:not(.flex__item--blur) .mark')
        .length
    ).toBe(1)

    await wrapper.setProps({
      marks: [
        { value: `${dString}-21` },
        { value: prevM },
        { value: `${dString}-23` }
      ]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper
      .findAll('.flex__item:not(.flex__item--blur) .mark')
      .length
    ).toBe(3)
  })

  it.concurrent('should render minDate and maxDate', async () => {
    const wrapper = mountFn({
      currentDate: '2020-12-27',
      minDate: '2020-12-27',
      maxDate: '2020-12-28'
    })

    expect(
      wrapper
        .findAll(
          '.body__slider--now .flex__item--now:not(.flex__item--blur)'
        )
        .length
    ).toBe(2)
    expect(
      wrapper
        .findAll(
          '.body__slider--now > .at-calendar__list > .flex__item--now.flex__item--blur'
        )
        .length
    ).toBe(29)
  })

  // need to enable handleSelectedDates in plugin.ts
  // currently selectedDates not supported
  it.concurrent.skip('should render multi-selected dates', async () => {
    const wrapper = mountFn({
      isMultiSelect: true,
      currentDate: '2021-06-04',
      selectedDates: [{
        start: '2021-06-16',
        end: '2021-06-17'
      }]
    })

    const currentMonth = wrapper
      .find('.main__body--slider .body__slider--now')

    const itemNow = '.flex__item--now'
    const itemSelected = '.flex__item--selected'
    const itemSelectedHead = '.flex__item--selected-head'
    const itemSelectedTail = '.flex__item--selected-tail'
    const itemText = '.flex__item-container > .container-text'

    expect(currentMonth.findAll(itemNow).length).toEqual(30)

    const selectedEls = currentMonth.findAll(itemSelected)
    expect(selectedEls.length).toBe(2)
    expect(selectedEls[0].classes()).toContain(itemSelectedHead)

    expect(
      selectedEls[0]
        .find(itemText)
        .text()
    ).toEqual(16)

    expect(selectedEls[1].classes()).toContain(itemSelectedTail)
    expect(
      selectedEls[1]
        .find(itemText)
        .text()
    ).toEqual(17)
  })

  it.concurrent('should render valid dates', () => {
    const wrapper = mountFn({
      validDates: [
        { value: `${dString}-21` },
        { value: `${dString}-25` }
      ]
    })

    expect(
      wrapper
        .findAll(
          '.body__slider--now .flex__item--now:not(.flex__item--blur)'
        )
        .length
    ).toBe(2)
  })

  describe('events:\n', () => {
    let mockFn: jest.Mock<any, any>
    let currentDate = todayStr
    let year = parseInt(currentDate.split('-')[0])
    let month = parseInt(currentDate.split('-')[1])

    beforeEach(() => {
      mockFn = jest.fn()
    })

    afterEach(() => {
      mockFn.mockRestore()
    })

    it('should emit click-pre-month', async () => {
      const wrapper = mountFn({
        currentDate,
        onClickPreMonth: mockFn
      })

      expect(
        wrapper.find('.controller__info').text()
      ).toEqual(`${year} 年 ${paddingZero(month)} 月`)

      await wrapper.find('.controller__arrow--left').trigger('tap')

      expect(
        wrapper.find('.controller__info').text()
      ).toEqual(
        `${month === 1 ? year - 1 : year} 年 ${month === 1 ? 12 : paddingZero(month - 1)} 月`
      )

      expect(wrapper.emitted()).toHaveProperty('click-pre-month')
      expect(mockFn).toBeCalled()
    })

    it('should emit click-next-month', async () => {
      const wrapper = mountFn({
        currentDate,
        onClickNextMonth: mockFn
      })
      expect(
        wrapper.find('.controller__info').text()
      ).toEqual(`${year} 年 ${paddingZero(month)} 月`)

      await wrapper.find('.controller__arrow--right').trigger('tap')
      expect(
        wrapper.find('.controller__info').text()
      ).toEqual(
        `${month === 12 ? year + 1 : year} 年 ${month === 12 ? '01' : paddingZero(month + 1)} 月`
      )

      expect(wrapper.emitted()).toHaveProperty('click-next-month')
      expect(mockFn).toBeCalled()
    })

    it('should emit day-click and select-date', async () => {
      const onSelectDate = jest.fn()
      const wrapper = mountFn({
        currentDate,
        onSelectDate,
        onDayClick: mockFn
      })
      await wrapper
        .find('.flex__item--today')
        .trigger('tap', { value: currentDate })

      expect(wrapper.emitted()).toHaveProperty('day-click')
      expect(
        wrapper.emitted('day-click')![0]
      ).toEqual([{ value: currentDate }])

      expect(mockFn).toBeCalled()
      expect(
        mockFn.mock.calls[0][0]
      ).toEqual({ value: currentDate })

      await wrapper.vm.$nextTick()
      expect(wrapper.emitted()).toHaveProperty('select-date')
      expect(
        wrapper.emitted('select-date')![0]
      ).toEqual([{ value: { start: currentDate, end: currentDate } }])

      expect(onSelectDate).toBeCalled()
      expect(
        onSelectDate.mock.calls[0][0]
      ).toEqual({ value: { start: currentDate, end: currentDate } })
    })

    it('should emit day-long-click', async () => {
      const wrapper = mountFn({
        currentDate,
        onDayLongClick: mockFn,
      })

      await wrapper
        .find('.flex__item--today')
        .trigger('longpress', { value: currentDate })

      expect(wrapper.emitted()).toHaveProperty('day-long-click')
      expect(
        wrapper.emitted('day-long-click')![0]
      ).toEqual([{ value: currentDate }])

      expect(mockFn).toBeCalled()
      expect(mockFn.mock.calls[0][0]).toEqual({ value: currentDate })
    })

    it('should emit month-change when picking dates from the controller', async () => {
      const wrapper = mountFn({ onMonthChange: mockFn })

      await wrapper
        .find('.at-calendar__controller > picker')
        .trigger('change', { detail: { value: '2020-12-27' } })

      expect(wrapper.emitted()).toHaveProperty('month-change')
      expect(
        wrapper.emitted('month-change')![0]
      ).toEqual(['2020-12-27'])

      expect(mockFn).toBeCalled()
      expect(mockFn.mock.calls[0][0]).toEqual('2020-12-27')
    })

    it('should emit month-change by swiping when use Swiper in h5', async () => {
      const wrapper = mountFn({
        isSwiper: true,
        onMonthChange: mockFn
      })

      const touchEL = wrapper.find('.at-calendar-slider__main')

      await triggerTouchEvents(
        touchEL,
        { clientX: 50, clientY: 200 },
        { clientX: 350, clientY: 200 }
      )

      jest.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()).toHaveProperty('month-change')
      expect(mockFn).toBeCalled()
    })

    it('should emit month-change by swiping in miniapp', async () => {
      process.env.TARO_ENV = "weapp"

      const wrapper = mountFn({
        isSwiper: true,
        onMonthChange: mockFn
      })

      const touchEL = wrapper.find('swiper.main__body')
      expect(touchEL.exists()).toBe(true)

      await triggerTouchEvents(
        touchEL,
        { clientX: 50, clientY: 200 },
        { clientX: 350, clientY: 200 }
      )

      await touchEL.trigger('change', {
        detail: {
          current: 0,
          source: 'touch'
        }
      })

      await touchEL.trigger('animationfinish')


      expect(wrapper.emitted()).toHaveProperty('month-change')
      expect(mockFn).toBeCalled()

      process.env.TARO_ENV = "h5"
    })

    // TODO: mock how to select multiple dates
    it.concurrent('should select multiple dates', async () => {
      const onSelectDate = jest.fn()
      const onDayClick = jest.fn()
      const wrapper = mountFn({
        isMultiSelect: true,
        currentDate: { start: '2021-05-01', end: '2021-05-01' },
        onSelectDate,
        onDayClick
      })

      const monthSlider = '.main__body--slider .body__slider--now'
      const itemNow = '.flex__item--now'
      const itemSelectedHead = '.flex__item--selected-head'
      const itemSelectedTail = '.flex__item--selected-tail'

      let currentMonth = wrapper.find(monthSlider)
      let dayEls = currentMonth.findAll(itemNow)

      expect(
        currentMonth.findAll(itemNow).length
      ).toEqual(31)

      // mock click 2021-05-10 and 2021-05-16
      await dayEls[9].trigger('tap')
      await dayEls[15].trigger('tap', {
        value: '2021-05-16',
        type: 0,
        isSelected: true,
        isSelectedTail: true
      })

      currentMonth = wrapper.find(monthSlider)
      dayEls = currentMonth.findAll(itemNow)

      expect(onDayClick.mock.calls.length).toBe(2)
      expect(onSelectDate.mock.calls.length).toBe(2)
      expect(
        dayEls[9].classes()
      ).toContain(itemSelectedHead.substring(1))
      expect(
        onDayClick.mock.calls[0][0]
      ).toEqual({ "value": "2021-05-10" })
      expect(
        onSelectDate.mock.calls[0][0]
      ).toEqual({ "value": { "start": "2021-05-10" } })

      // expect(
      //   dayEls[15].classes()
      // ).toContain(itemSelectedTail.substring(1))

      // expect(
      //   onDayClick.mock.calls[1][1]
      // ).toBe({ "value": "2021-05-16" })

      // expect(
      //   onSelectDate.mock.calls[1][1]
      // ).toBe({
      //   "value": {
      //     "start": "2021-05-10",
      //     "end": "2021-05-16"
      //   }
      // })
    })
  })

})