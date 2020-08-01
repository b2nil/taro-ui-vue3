import { h, defineComponent, computed, reactive, watch } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { AtPaginationProps, AtPaginationState } from 'types/pagination'
import AtButton from '../button/index'
import AtComponentWithDefaultProps from '../mixins'

const MIN_MAXPAGE = 1
const getMaxPage = (maxPage = 0): number => {
    if (maxPage <= 0) return MIN_MAXPAGE
    return maxPage
}

const createPickerRange = (max: number): number[] => {
    const range = new Array(max).fill(0).map((_val, index) => index + 1)
    return range
}

const AtPagination = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        total: { type: Number, default: 0, required: true },
        current: { type: Number, default: 1 },
        pageSize: { type: Number, default: 20 },
        icon: { type: Boolean, default: false },
        onPageChange: Function as unknown as () => AtPaginationProps['onPageChange'],
    },

    setup(props: AtPaginationProps, { slots }) {

        const maxPage = getMaxPage(Math.ceil(props.total / props.pageSize!))
        const state = reactive<AtPaginationState>({
            currentPage: props.current || 1,
            maxPage: maxPage,
            pickerRange: createPickerRange(maxPage)
        })

        function onPrev(): void {
            let { currentPage } = state
            const originCur = currentPage
            currentPage -= 1
            currentPage = Math.max(1, currentPage)
            if (originCur === currentPage) return
            props.onPageChange &&
                props.onPageChange({ type: 'prev', current: currentPage })
            state.currentPage = currentPage
        }

        function onNext(): void {
            let { currentPage } = state
            const originCur = currentPage
            const { maxPage } = state
            currentPage += 1
            currentPage = Math.min(maxPage, currentPage)
            if (originCur === currentPage) return
            props.onPageChange &&
                props.onPageChange({ type: 'next', current: currentPage })
            state.currentPage = currentPage
        }

        watch(() => [
            props.total,
            props.pageSize,
            props.current
        ], ([total, pageSize, current]) => {
            const maxPage = getMaxPage(Math.ceil(total! / pageSize!))
            if (maxPage !== state.maxPage) {
                state.maxPage = maxPage
                state.pickerRange = createPickerRange(maxPage)
            }
            if (typeof current === 'number' && current !== state.currentPage) {
                state.currentPage = current
            }
        })

        // onPickerChange (evt) {
        //   const { value } = evt.detail
        //   const current = +value + 1
        //   if (current === state.currentPage) return
        //   props.onPageChange && props.onPageChange({ type: 'pick', current })
        //   state.currentPage = current
        // }

        return () => {

            const {
                currentPage,
                maxPage
                // pickerRange,
            } = state

            const prevDisabled = maxPage === MIN_MAXPAGE || currentPage === 1
            const nextDisabled = maxPage === MIN_MAXPAGE || currentPage === maxPage

            const rootClass = computed(() => classNames(
                'at-pagination',
                {
                    'at-pagination--icon': props.icon
                },
                props.className
            ))

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle,
                }, {
                    default: () => [
                        // btn prev
                        h(View, { class: 'at-pagination__btn-prev' }, {
                            default: () => [
                                props.icon && (
                                    h(AtButton, {
                                        onClick: onPrev,
                                        size: 'small',
                                        disabled: prevDisabled
                                    }, {
                                        defualt: () => [
                                            h(Text, { class: 'at-icon at-icon-chevron-left' })
                                        ]
                                    })
                                ),

                                !props.icon && (
                                    h(AtButton, {
                                        onClick: onPrev,
                                        size: 'small',
                                        disabled: prevDisabled
                                    }, '上一页')
                                )
                            ]
                        }),
                        // pagination number
                        h(View, {
                            class: 'at-pagination__number'
                        }, {
                            default: () => [
                                h(Text, { class: 'at-pagination__number-current' }, currentPage),
                                maxPage
                            ]
                        }),
                        // btn next
                        h(View, {
                            class: 'at-pagination__btn-next'
                        }, {
                            default: () => [
                                props.icon && (
                                    h(AtButton, {
                                        onClick: onNext,
                                        size: 'small',
                                        disabled: nextDisabled,
                                    }, {
                                        default: () => [
                                            h(Text, { class: 'at-icon at-icon-chevron-right' })
                                        ]
                                    })
                                ),
                                !props.icon && (
                                    h(AtButton, {
                                        onClick: onNext,
                                        size: 'small',
                                        disabled: nextDisabled
                                    }, '下一页')
                                )
                            ]
                        }),
                        // picker select
                        /*
                        pickerSelect && (
                            h(View, { class: 'at-pagination__number' }, { default: () => [
                                h(Picker, {
                                    mode='selector'
                                    range={pickerRange}
                                    value={currentPage - 1}
                                    onChange={onPickerChange}
                                }, { default: () => [
                                    h(Text, { class: 'at-pagination__number-current' }, currentPage ),
                                    maxPage
                                ]})
                            ]})
                        ),
                        !pickerSelect && h(View, { class: 'at-pagination__number'}, { default: () => [
                             h(Text, { class: 'at-pagination__number-current'}, currentPage),
                             maxPage
                        ]})
                        */
                    ]
                })
            )
        }
    }
})

export default AtPagination
