import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtStepsProps } from 'types/steps'
import AtComponentWithDefaultProps from '../mixins'

const AtSteps = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        current: {
            type: Number,
            default: 0,
            required: true
        },
        items: {
            type: Array as () => AtStepsProps['items'],
            default: []
        },
        onChange: {
            type: Function as unknown as () => AtStepsProps['onChange'],
            default: () => (current: number, event: CommonEvent) => { },
            required: true
        },
    },

    setup(props: AtStepsProps, { slots }) {

        function handleClick(current: number, event: CommonEvent): void {
            props.onChange(current, event)
        }

        return () => {
            const stepItemClass = computed(() => (i) => classNames({
                'at-steps__item': true,
                'at-steps__item--active': i === props.current,
                'at-steps__item--inactive': i !== props.current
            }))

            const itemStatusClass = computed(() => (item) => classNames({
                'at-icon': true,
                'at-icon-check-circle': item.status === 'success',
                'at-icon-close-circle': item.status === 'error',
                'at-steps__single-icon': true,
                'at-steps__single-icon--success':
                    item.status === 'success',
                'at-steps__single-icon--error': item.status === 'error'
            }))

            const itemIconClass = computed(() => (item) => classNames('at-icon', {
                [`at-icon-${item.icon.value}`]: item.icon.value,
                'at-steps__circle-icon': true
            }))

            return (
                h(View, {
                    class: classNames('at-steps', props.className),
                    style: props.customStyle
                }, { // items
                    default: () =>
                        !!props.items &&
                        props.items.map((item, i) => (
                            h(View, {
                                key: item.title,
                                class: stepItemClass.value(i),
                                onTap: handleClick.bind(this, i)
                            }, {
                                default: () => [
                                    // circular wrap
                                    h(View, { class: 'at-steps__circular-wrap' }, {
                                        default: () => [
                                            // left-line
                                            i !== 0 && h(View, { class: 'at-steps__left-line' }),
                                            // status
                                            item.status
                                                ? h(View, { class: itemStatusClass.value(item) })
                                                : h(View, { class: 'at-steps__circular' }, {
                                                    default: () => [
                                                        item.icon
                                                            ? h(Text, { class: itemIconClass.value(item) })
                                                            : h(Text, { class: 'at-steps__num' }, i + 1)
                                                    ]
                                                }),
                                            // right-line 
                                            i !== props.items!.length - 1 && (
                                                h(View, { class: 'at-steps__right-line' })
                                            )
                                        ]
                                    }),
                                    // title
                                    h(View, { class: 'at-steps__title' }, item.title),
                                    // description
                                    h(View, { class: 'at-steps__desc' }, item.desc)
                                ]
                            })
                        ))
                })
            )
        }
    }
})

export default AtSteps