import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { AtModalActionProps } from 'types/modal'
import AtComponentWithDefaultProps from '@/components/mixins'

const AtModalAction = defineComponent ({

    mixins: [AtComponentWithDefaultProps],

    props: {
        isSimple: { type: Boolean, default: false, required: true }
    },

    setup(props: AtModalActionProps, { slots }){

        return () => {
            const rootClass = computed(() => classNames(
                'at-modal__footer',
                {
                    'at-modal__footer--simple': props.isSimple
                },
                props.className
            ))
    
            return (
                h(View, { class: rootClass.value }, [
                    h(View, {
                        class: 'at-modal__action'
                    }, slots.default && slots.default())
                ])
            )
        }        
    }
})

export default AtModalAction