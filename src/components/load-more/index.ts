import { h, defineComponent, mergeProps, PropType } from "vue"
import { Text, View } from '@tarojs/components'
import { AtLoadMoreProps } from 'types/load-more'

import AtActivityIndicator from '../activity-indicator'
import AtButton from "../button"

const AtLoadMore = defineComponent({
  name: "AtLoadMore",

  props: {
    // 参数
    noMoreTextStyle: {
      type: String as PropType<AtLoadMoreProps['noMoreTextStyle']>,
      default: ''
    },
    moreBtnStyle: {
      type: String as PropType<AtLoadMoreProps['moreBtnStyle']>,
      default: ''
    },
    status: {
      type: String as PropType<AtLoadMoreProps['status']>,
      default: 'more'
    },
    loadingText: {
      type: String as PropType<AtLoadMoreProps['loadingText']>,
      default: '加载中'
    },
    moreText: {
      type: String as PropType<AtLoadMoreProps['moreText']>,
      default: '查看更多'
    },
    noMoreText: {
      type: String as PropType<AtLoadMoreProps['noMoreText']>,
      default: '没有更多'
    },
    // 事件
    onClick: {
      type: Function as PropType<AtLoadMoreProps['onClick']>,
      default: () => () => { }
    },
  },

  setup(props: AtLoadMoreProps, { attrs }) {

    function handleClick() {
      props.onClick && props.onClick(arguments as any)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-load-more',
      }), {
        default: () => [
          props.status === 'loading'
            ? (
              h(AtActivityIndicator, {
                mode: 'center',
                content: props.loadingText
              })
            )
            : props.status === 'more'
              ? (
                h(View, {
                  class: 'at-load-more__cnt'
                }, {
                  default: () => [
                    h(AtButton, {
                      full: true,
                      style: props.moreBtnStyle,
                      onClick: handleClick.bind(this)
                    }, { default: () => props.moreText })
                  ]
                })
              )
              : (
                h(Text, {
                  class: 'at-load-more__tip',
                  style: props.noMoreTextStyle
                }, { default: () => props.noMoreText })
              )
        ]
      })
    )
  }
})

export default AtLoadMore