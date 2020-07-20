import { h, defineComponent } from 'vue'
import { Button, View, Form } from '@tarojs/components'
import classNames from 'classnames'
import AtLoading from '../loading/index'
import { getEnvs } from '../../utils/common'

import '../../style/components/button.scss'

const SIZE_CLASS = {
    normal: 'normal',
    small: 'small'
}

const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary',
}

const AtButton = defineComponent({
    components: { 
        AtLoading
    },

    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (prop: string) => ['normal', 'small'].includes(prop)
        },
        type: {
            type: String, 
            default: '',
            validator: (prop: string) => ['primary', 'secondary', ''].includes(prop)
        },
        circle: { type: Boolean, default: false },
        full: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        customStyle: { type: Object||String, default: {} },
        className: { type: Object||String, default: () => {} },
        onClick: { type: Function, default: () => {}, },
        // Button Props
        formType: {
            type: String,
            default: undefined,
            validator: (prop: string) => ['submit', 'reset', ''].includes(prop)
        },
        openType: { 
            type: String, 
            default: undefined, 
            validator: (prop: string) => [
                'contact',
                'share',
                "getUserInfo",
                "getPhoneNumber",
                "launchApp",
                "openSetting",
                "feedback",
                "getRealnameAuthInfo",
                "getAuthorize",
                "contactShare"
            ].includes(prop),
        },
        lang: { type: String, default: 'en', },
        sessionForm: { type: String, default: '', },
        sendMessageTitle: { type: String, default: '', },
        sendMessagePath: { type: String, default: '', },
        sendMessageImg: { type: String, default: '', },
        showMessageCard: { type: Boolean, default: false, },
        appParameter: { type: String, default: '', },
        onGetUserInfo: { type: Function, default: () => {}, },
        onContact: { type: Function, default: () => {}, },
        onGetPhoneNumber: { type: Function, default: () => {}, },
        onError: { type: Function, default: () => {}, },
        onOpenSetting: { type: Function, default: () => {}, },        
    },

    setup(props, { slots }){
        const { isWEAPP, isALIPAY, isWEB } = getEnvs()
        const rootClassName = ['at-button']
        const classObject = {
            [`at-button--${SIZE_CLASS[props.size]}`]: SIZE_CLASS[props.size],
            'at-button--disabled': props.disabled,
            [`at-button--${props.type}`]: TYPE_CLASS[props.type],
            'at-button--circle': props.circle,
            'at-button--full': props.full,
        }

        const loadingColor = props.type === 'primary' ? '#fff' : ''
        const loadingSize = props.type === 'small' ? '30' : '0'

        function handleClick(event) {
            if (!props.disabled) {
                props.onClick && props.onClick(event)
            }
        }

        function handleGetUserInfo(event) {
            props.onGetUserInfo && props.onGetUserInfo(event)
        }

        function handleGetPhoneNumber(event) {
            props.onGetPhoneNumber && props.onGetPhoneNumber(event)
        }
        
        function handleOpenSetting(event) {
            props.onOpenSetting && props.onOpenSetting(event)
        }

        function handleError(event) {
            props.onError && props.onError(event)
        }

        function handleContact(event) {
            props.onContact && props.onContact(event)
        }

        function handleSubmit(event) {
            if (isWEAPP || isWEB) {
                this.$scope.triggerEvent('submit', event.detail, {
                    bubbles: true,
                    composed: true,
                })
            }
        }

        function handleReset(event) {
            if (isWEAPP || isWEB) {
                this.$scope.triggerEvent('reset', event.detail, {
                    bubbles: true,
                    composed: true,
                })
            }
        }

        interface WxButtonProps {
            error?: (event: any) => void
            onContact?: (event: any) => void
            onOpenSetting?: (event: any) => void
            getphonenumber?: (event: any) => void
            getuserinfo?: (event: any) => void
        }

        function getWxButtonProps(): WxButtonProps {
            if (!props.openType) return {}

            const wxButtonProps: WxButtonProps = { error: handleError }

            switch (props.openType) {
                case 'contact':
                    wxButtonProps.onContact = handleContact
                    break
                case 'opensetting':
                    wxButtonProps.onOpenSetting = handleOpenSetting
                    break
                case 'getPhoneNumber':
                    wxButtonProps.getphonenumber = handleGetPhoneNumber
                    break
                case 'getUserInfo':
                    wxButtonProps.getuserinfo = handleGetUserInfo
                    break
                default:
                    break
            }

            return wxButtonProps
        }

        if (props.loading) {
            rootClassName.push('at-button--icon')
        }

        const webButton = h(Button, {
            class: 'at-button__wxbutton',
            lang: props.lang,
            formType: props.formType === 'submit' || props.formType === 'reset' ? props.formType : undefined
        })

        const button = h(Button, {
            class: 'at-button__wxbutton',
            formType: props.formType,
            openType: props.openType,
            lang: props.lang,
            sessionForm: props.sessionForm,
            sendMessageTitle: props.sendMessageTitle,
            sendMessagePath: props.sendMessagePath,
            sendMessageImg: props.sendMessageImg,
            showMessageCard: props.showMessageCard,
            appParameter: props.appParameter,
            ...{ on: getWxButtonProps()}
        })

        return () => h(View, {
            onTap: handleClick,
            class: classNames(rootClassName, classObject, props.className),
            style: props.customStyle,
        }, [
            isWEB && !props.disabled && webButton,
            isWEAPP && !props.disabled && h(Form, { onSubmit: handleSubmit, onReset: handleReset }, [button]),
            isALIPAY && !props.disabled && button,
            props.loading && h(View, { class: 'at-button__icon' }, [ 
                h(AtLoading, { color: loadingColor, size: loadingSize })
            ]),
            h(View, { class: 'at-button__text' }, slots.default && slots.default())
        ])
    }
})

export default AtButton
