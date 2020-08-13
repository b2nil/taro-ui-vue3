import classNames from 'classnames'
import { defineComponent, computed, h } from 'vue'
import { ScrollView } from '@tarojs/components'
import { AtModalContentProps } from 'types/modal'
import AtComponentWithDefaultProps from '@/components/mixins'

const AtModalContent = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    setup(props: AtModalContentProps, { slots }) {

        return () => {
            const rootClass = computed(() => classNames(
                'at-modal__content',
                props.className
            ))
            
            return h(ScrollView, {
                scrollY: true,
                class: rootClass.value
            }, slots.default && slots.default())
        }
    }
})

export default AtModalContent
