
import { h, defineComponent, reactive } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

import AtButton from '../../components/button'
import AtCalendar from '../../components/calendar'
import DocsHeader from '../components/doc-header'
import { AtCalendarProps } from 'types/calendar'

interface IndexState {
    now: AtCalendarProps['currentDate']
    minDate: AtCalendarProps['minDate']
    maxDate:  AtCalendarProps['maxDate']
    multiCurrentDate: AtCalendarProps['currentDate']
    mark: AtCalendarProps['marks']
    validDates: AtCalendarProps['validDates']
    [key: string]: any
}

export default defineComponent({
    components: {
        AtButton,
        AtCalendar,
        DocsHeader
    },
    setup() {
        const state = reactive<IndexState>({
            now: Date.now(),
            minDate: '2018/06/11',
            maxDate: '2020/12/12',
            multiCurrentDate: {
                start: Date.now(),
            },
            mark: [{ value: '2018/11/11' }],
            validDates: [
                { value: '2019/04/17' }, 
                { value: '2019/04/21' }, 
                { value: '2019/05/04' }, 
                { value: '2019/05/28' }
            ],
        })

        function handleClick(key, value) {
            console.log('state[key]: ', state[key])
            state[key] = value
            console.log('state.now : ', state.now)
        }

        function handleDayClick(...args) {
            console.log(this.$event)
            console.log('handleDayClick', args)
        }

        function handleDayLongClick(...args) {
            console.log('handleDayLongClick', args)
        }

        function handleDateChange(arg) {
            Taro.showToast({
                title: `handleDateChange: ${JSON.stringify(arg)}`,
                icon: 'none',
            })
        }
        function handleMonthChange(arg) {
            Taro.showToast({
                title: `handleMonthChange: ${JSON.stringify(arg)}`,
                icon: 'none',
            })
        }

        return () => (
            h('view', { class: "page calendar-page" }, [
                // Doc Header
                h(DocsHeader, { title: 'Taro 日历组件' }),
                // Doc Body
                h('view', { class: "doc-body" }, [
                    h('view', { class: 'panel' }, [
                        h('view', { class: "panel__title" }, '一般案例'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { onMonthChange: handleMonthChange })
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '跳转到制定日期'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { currentDate: state.now }),
                            h('view', { class: "body_controllers" }, [
                                h(AtButton, {
                                    size: "small",
                                    onTap: handleClick.bind(this, 'now', '2018/01/01')
                                }, '跳转到 2018/01/01'),
                                h(AtButton, {
                                    size: "small",
                                    onTap: handleClick.bind(this, 'now', '2018/06/18')
                                }, '跳转到 2018/6/18'),
                            ]),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '指定最小日期和最大日期'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { minDate: state.minDate, maxDate: state.maxDate }),
                            h('view', { class: "body_controllers" }, [
                                h(AtButton, {
                                    size: "small",
                                    onTap: handleClick.bind(this, 'minDate', '2018/01/01')
                                }, '设置最小值 2018/1/1'),
                                h(AtButton, {
                                    size: "small",
                                    onTap: handleClick.bind(this, 'maxDate', '2019/12/31')
                                }, '设置最大值 2019/12/31'),
                            ]),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '标记时间'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { marks: state.mark }),
                            h('view', { class: "body_controllers" }, [
                                h(AtButton, {
                                    size: "small",
                                    class: "button",
                                    onTap: handleClick.bind(this, 'mark', { value: Date.now() })
                                }, '标记当前时间'),
                            ]),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '范围选择'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, {
                                onSelectDate: handleDateChange,
                                currentDate: state.multiCurrentDate,
                                isMultiSelect: true
                            }),
                            h('view', { class: "body_controllers" }, [
                                h(AtButton, {
                                    size: "small",
                                    class: "button",
                                    onTap: handleClick.bind(this,
                                        'multiCurrentDate',
                                        { start: '2018/10/28', end: '2018/11/11' }
                                    )
                                }, '设置选择区间为 2018/10/28 - 2018/11/11'),
                            ]),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '禁止滑动'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { isSwiper: false }),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '垂直滑动'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { isVertical: true, onSelectDate: handleDateChange }),
                        ]),
                    ]),

                    h('view', { class: "panel" }, [
                        h('view', { class: "panel__title" }, '有效时间组'),
                        h('view', { class: "panel__content" }, [
                            h(AtCalendar, { validDates: state.validDates }),
                        ]),
                    ])
                ])
            ])
        )
    }
})