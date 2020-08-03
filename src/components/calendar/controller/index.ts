import { h, defineComponent, computed } from "vue"
import { Picker, Text, View } from "@tarojs/components"
import { Calendar, AtCalendarControllerProps } from 'types/calendar'
import { CommonEvent } from '@tarojs/components/types/common'
import dayjs from 'dayjs'
import classNames from "classnames"
import AtComponentWithDefaultProps from "@/components/mixins"

const AtCalendarController = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    data: () => ({ addGlobalClass: true}),

    props: {
        generateDate: { 
            type: Number || String,
            default: Date.now() 
        },
        minDate: { 
            type: (String || Number || Date) as () => Calendar.DateArg,
            default: () => ''
        },
        maxDate: { 
            type: (String || Number || Date) as () => Calendar.DateArg, 
            default: () => ''
        },
        hideArrow: { 
            type: Boolean,
            default: false 
        },
        monthFormat: { 
            type: String,
            default: 'YYYY年MM月' 
        },
        onPreMonth:{ 
            type: Function as unknown as () => () => void,
            default: () => () => {} 
        },
        onNextMonth:{ 
            type: Function as unknown as () => () => void,
            default: () => () => {}
        },
        onSelectDate: { 
            type: Function as unknown as () => (e: CommonEvent) => void,
            default: () => () => {}
        },
    },

    setup(props: AtCalendarControllerProps) {
        const dayjsDate = computed(() => dayjs(props.generateDate))
        const dayjsMinDate = computed(() => !!props.minDate && dayjs(props.minDate))
        const dayjsMaxDate = computed(() => !!props.maxDate && dayjs(props.maxDate))

        const isMinMonth = computed(() => {
            return dayjsMinDate.value && 
                dayjsMinDate.value
                    .startOf('month')
                    .isSame(dayjsDate.value)
        })

        const isMaxMonth = computed(() => {
            return dayjsMaxDate.value && 
                dayjsMaxDate.value
                    .startOf('month')
                    .isSame(dayjsDate.value)
        })

        const minDateValue = computed(() => dayjsMinDate.value 
            ? dayjsMinDate.value.format('YYYY-MM') 
            : ''
        )

        const maxDateValue = computed(() => dayjsMaxDate.value
            ? dayjsMaxDate.value.format('YYYY-MM') 
            : ''
        )

        return () => {
            const rootClass = classNames('at-calendar__controller', 'controller')

            const genArrowClass = (
                direction: string,
                disabled: boolean
            ): string => classNames(
                `controller__arrow controller__arrow--${direction}`, 
                { 'controller__arrow--disabled': disabled },
            )

            return h(View, { class: rootClass }, [
                !props.hideArrow && h(View, {
                    class: genArrowClass('left', isMinMonth.value),
                    onTap: props.onPreMonth.bind(this, isMinMonth.value)
                }),
                h(Picker, {
                    mode: 'date',
                    fields: 'month',
                    end: maxDateValue.value,
                    start: minDateValue.value,
                    value: dayjsDate.value.format('YYYY-MM'),
                    onChange: props.onSelectDate
                }, [
                    h(Text, { class: 'controller__info' }, dayjsDate.value.format(props.monthFormat))
                ]),
                !props.hideArrow && h(View, {
                    class: genArrowClass('right', isMaxMonth.value),
                    onTap: props.onNextMonth.bind(this, isMaxMonth.value)
                })
            ])
        }
    }
})

export default AtCalendarController