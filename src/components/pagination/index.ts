import { h, defineComponent, computed, reactive, watch, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { AtPaginationProps, AtPaginationState } from 'types/pagination'
import AtButton from '../button/index'


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
  name: "AtPagination",

  props: {
    total: { type: Number, default: 0, required: true },
    current: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 },
    icon: { type: Boolean, default: false },
    onPageChange: Function as PropType<AtPaginationProps['onPageChange']>,
  },

  setup(props: AtPaginationProps, { attrs, slots }) {

    const maxPage = computed(() => getMaxPage(Math.ceil(props.total / props.pageSize!)))
    const state = reactive<AtPaginationState>({
      currentPage: props.current || 1,
      maxPage: maxPage.value,
      pickerRange: createPickerRange(maxPage.value)
    })

    const prevDisabled = computed(() => state.maxPage === MIN_MAXPAGE || state.currentPage === 1)
    const nextDisabled = computed(() => state.maxPage === MIN_MAXPAGE || state.currentPage === state.maxPage)

    const rootClass = computed(() => ({
      'at-pagination': true,
      'at-pagination--icon': props.icon
    }))

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

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          // btn prev
          h(View, {
            class: 'at-pagination__btn-prev'
          }, {
            default: () => [
              props.icon && (
                h(AtButton, {
                  size: 'small',
                  disabled: prevDisabled.value,
                  onClick: onPrev,
                }, {
                  default: () => [
                    h(Text, { class: 'at-icon at-icon-chevron-left' })
                  ]
                })
              ),

              !props.icon && (
                h(AtButton, {
                  size: 'small',
                  disabled: prevDisabled.value,
                  onClick: onPrev,
                }, { default: () => '上一页' })
              )
            ]
          }),

          // pagination number
          h(View, {
            class: 'at-pagination__number'
          }, {
            default: () => [
              h(Text, {
                class: 'at-pagination__number-current'
              }, { default: () => state.currentPage }),

              h(Text, null, { default: () => `/${state.maxPage}` })
            ]
          }),

          // btn next
          h(View, {
            class: 'at-pagination__btn-next'
          }, {
            default: () => [
              props.icon && (
                h(AtButton, {
                  size: 'small',
                  disabled: nextDisabled.value,
                  onClick: onNext
                }, {
                  default: () => [
                    h(Text, { class: 'at-icon at-icon-chevron-right' })
                  ]
                })
              ),
              !props.icon && (
                h(AtButton, {
                  size: 'small',
                  disabled: nextDisabled.value,
                  onClick: onNext
                }, { default: () => '下一页' })
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
})

export default AtPagination
