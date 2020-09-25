import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRateProps } from 'types/rate'
import { pxTransform } from '@/utils/common'

const AtRate = defineComponent({
  name: "AtRate",

  props: {
    size: {
      type: Number,
      default: 20
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    margin: {
      type: Number,
      default: 5
    },
    onChange: Function as PropType<AtRateProps['onChange']>
  },

  setup(props: AtRateProps, { attrs, slots }) {

    const iconStyle = computed(() => ({
      marginRight: pxTransform(props.margin!)
    }))

    const starIconStyle = computed(() => ({
      fontSize: props.size ? `${props.size}px` : ''
    }))

    // 生成星星颜色 className 数组，方便在jsx中直接map
    const starColorClasses = computed(() => {
      const classNameArr: string[] = []
      const floorValue = Math.floor(props.value!)
      const ceilValue = Math.ceil(props.value!)
      for (let i = 0; i < props.max!; i++) {
        if (floorValue > i) {
          classNameArr.push('at-rate__icon at-rate__icon--on')
        } else if (ceilValue - 1 === i) {
          classNameArr.push('at-rate__icon at-rate__icon--half')
        } else {
          classNameArr.push('at-rate__icon at-rate__icon--off')
        }
      }
      return classNameArr
    })

    function handleClick(event: CommonEvent): void {
      props.onChange && props.onChange(event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-rate'
      }), {
        default: () => [
          starColorClasses.value.map((cls, i) => (
            h(View, {
              key: `at-rate-star-${i}`,
              class: cls,
              style: iconStyle.value,
              onTap: handleClick.bind(this, i + 1)
            }, {
              default: () => [
                h(Text, {
                  class: 'at-icon at-icon-star-2',
                  style: starIconStyle.value
                }),
                h(View, {
                  class: 'at-rate__left'
                }, {
                  default: () => [
                    h(Text, {
                      class: 'at-icon at-icon-star-2',
                      style: starIconStyle.value
                    })
                  ]
                })
              ]
            })
          ))
        ]
      })
    )
  }
})

export default AtRate