import classNames from 'classnames'
import { h, defineComponent } from 'vue'
import { View, Image, Switch } from '@tarojs/components'
import { CommonEvent, ITouchEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtListItemProps } from "types/list"
import { AtIconBaseProps } from "types/base"
import { mergeStyle } from "../../../utils/common"

const AtListItem = defineComponent({
    props: {
        note: { type: String, default: ''},
        title: { type: String, default: ''},
        thumb: { type: String, default: ''},
        extraText: { type: String, default: ''},
        extraThumb: { type: String, default: ''},
        switchColor: { type: String, default: '#6190E8'},
        disabled: { type: Boolean, default: false},
        isSwitch: { type: Boolean, default: false},
        switchIsCheck: { type: Boolean, default: false},
        hasBorder: { type: Boolean, default: false},
        iconInfo: {
            type: Object as () => AtIconBaseProps,
            default: () => ({value: ''} as AtIconBaseProps)
        },
        arrow: {
            type: String as () => 'up' | 'down' | 'right' | undefined,
            default: '' as 'up' | 'down' | 'right' | undefined,
            validator: (prop: string) => ['up', 'down', 'right', ''].includes(prop) 
        },
        onClick: { 
            type: Function as unknown as () => CommonEventFunction, 
            default: () => () => {}
        },
        onSwitchChange: {
            type: Function as unknown as () => CommonEventFunction, 
            default: () => () => {}
        },
    },

    setup(props: AtListItemProps) {

        function handleClick(e: ITouchEvent) {
            if (typeof props.onClick === 'function' && !props.disabled) {
                props.onClick(e)
            }
        }

        function handleSwitchClick(e: CommonEvent) {
            e.stopPropagation()
        }

        function handleSwitchChange(e: CommonEvent) {
            if (typeof props.onSwitchChange === 'function' && !props.disabled) {
                props.onSwitchChange(e)
            }
        }

        return () => {
            // let { extraText, title } = toRefs(props)
            
            const rootClass = classNames(
                'at-list__item',
                {
                    'at-list__item--thumb': props.thumb,
                    'at-list__item--multiple': props.note,
                    'at-list__item--disabled': props.disabled,
                    'at-list__item--no-border': !props.hasBorder,
                },
                props.className
            )

            const iconClass = classNames(
                props.iconInfo!.prefixClass || 'at-icon',
                {
                    [`${props.iconInfo!.prefixClass || 'at-icon'}-${props.iconInfo!.value}`]: props.iconInfo!.value
                },
                props.iconInfo!.className
            )

            return h(View, { class: rootClass, onTap: handleClick }, [
                h(View, { class: 'at-list__item-container' }, [
                    props.thumb && h(View, { class: classNames('at-list__item-thumb', 'item-thumb') }, [
                        h(Image, { class: 'item-thumb__info', mode: 'scaleToFill', src: props.thumb })
                    ]),
                    props.iconInfo!.value && h(View, { class: classNames('at-list__item-icon', 'item-icon') }, [
                        h(View, { 
                            class: iconClass,
                            style: mergeStyle({
                                color: props.iconInfo!.color || '',
                                fontSize: `${props.iconInfo!.size || 24}px`,
                            }, props.iconInfo!.customStyle!)
                        })
                    ]),
                    h(View, { class: classNames('at-list__item-content', 'item-content')}, [
                        h(View, { class: 'item-content__info' }, [
                            h(View, { class: 'item-content__info-title' }, props.title),
                            props.note && h(View, { class: 'item-content__info-note' }, props.note)
                        ])
                    ]),
                    h(View, { class: classNames('at-list__item-extra', 'item-extra')}, [
                        props.extraText && h(View, { class: 'item-extra__info' }, props.extraText),
                        props.extraThumb && !props.extraText && h(View, { class: 'item-extra__image'}, [
                            h(Image, { class: 'item-extra__image-info', mode: 'aspectFit', src: props.extraThumb})
                        ]),
                        props.isSwitch && !props.extraThumb && !props.extraText && h(View, {
                            class: 'item-extra__switch',
                            onTap: handleSwitchClick
                        }, [
                            h(Switch, { 
                                color: props.switchColor,
                                disabled: props.disabled,
                                checked: props.switchIsCheck,
                                onChange: handleSwitchChange
                            })
                        ]),
                        props.arrow ? h(View, { class: 'item-extra__icon' }, [
                            h(View, { class: classNames('at-icon', 'item-extra__icon-arrow', `at-icon-chevron-${props.arrow}`)})
                        ]): null
                    ])
                ])
            ])
        }
    }
})

export default AtListItem