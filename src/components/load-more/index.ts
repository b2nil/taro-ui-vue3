import { h, defineComponent, mergeProps } from "vue"
import { Text, View } from '@tarojs/components'
import { AtLoadMoreProps } from 'types/load-more'

import AtActivityIndicator from '../activity-indicator'
import AtButton from "../button"

const AtLoadMore = defineComponent({
    name: "AtLoadMore",

    props: {
        // 参数
        noMoreTextStyle: {
            type: String as () => AtLoadMoreProps['noMoreTextStyle'],
            default: ''
        },
        moreBtnStyle: {
            type: String as () => AtLoadMoreProps['moreBtnStyle'],
            default: ''
        },
        status: {
            type: String as () => AtLoadMoreProps['status'],
            default: 'more' as AtLoadMoreProps['status']
        },
        loadingText: {
            type: String as () => AtLoadMoreProps['loadingText'],
            default: '加载中'
        },
        moreText: {
            type: String as () => AtLoadMoreProps['moreText'],
            default: '查看更多'
        },
        noMoreText: {
            type: String as () => AtLoadMoreProps['noMoreText'],
            default: '没有更多'
        },
        // 事件
        onClick: {
            type: Function as unknown as () => AtLoadMoreProps['onClick'],
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
            }), [
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
                            }, [
                                h(AtButton, {
                                    full: true,
                                    style: props.moreBtnStyle,
                                    onTap: handleClick.bind(this)
                                }, { default: () => props.moreText })
                            ])
                        )
                        : (
                            h(Text, {
                                class: 'at-load-more__tip',
                                style: props.noMoreTextStyle
                            }, props.noMoreText)
                        )
            ])
        )
    }
})

export default AtLoadMore