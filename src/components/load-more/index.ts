import { h, defineComponent, computed } from "vue"
import classNames from 'classnames'

import { Text, View } from '@/utils/components'
import { AtLoadMoreProps } from 'types/load-more'

import AtComponentWithDefaultProps from '../mixins'
import AtActivityIndicator from '../activity-indicator'
import AtButton from "../button"

const AtLoadMore = defineComponent({
    mixins: [AtComponentWithDefaultProps],

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

    setup(props: AtLoadMoreProps) {

        function handleClick() {
            props.onClick && props.onClick(arguments as any)
        }

        return () => {

            const rootClass = computed(() => classNames('at-load-more', props.className))

            const loadingNode = h(AtActivityIndicator, {
                mode: 'center',
                content: props.loadingText
            })

            const moreBtnNode = h(View, {
                class: 'at-load-more__cnt'
            }, [
                h(AtButton, {
                    full: true,
                    onTap: handleClick.bind(this),
                    customStyle: props.moreBtnStyle
                }, { default: () => props.moreText })
            ])

            const moreTipNode = h(Text, {
                class: 'at-load-more__tip',
                style: props.noMoreTextStyle
            }, props.noMoreText)

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, [
                    props.status === 'loading'
                        ? loadingNode
                        : props.status === 'more'
                            ? moreBtnNode
                            : moreTipNode
                ])
            )
        }
    }
})

export default AtLoadMore