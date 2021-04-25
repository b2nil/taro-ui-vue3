import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRateProps } from 'types/rate'
import { pxTransform, convertToUnit } from '../../utils/common'
import { useModelValue } from '../../composables/model'

const AtRate = defineComponent({
  name: "AtRate",

  props: {
    size: {
      type: [Number, String],
      default: 20,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: [Number, String],
      default: 5,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    margin: {
      type: [Number, String],
      default: 5,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    icon: {
      type: String as PropType<AtRateProps['icon']>,
      default: 'star'
    },
    color: String,
    onChange: Function as unknown as PropType<AtRateProps['onChange']>
  },

  setup(props: AtRateProps, { attrs, emit }) {

    const modelValue = useModelValue(props, emit, 'value')

    const iconClasses = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon!}-2`]: true
    }))

    const iconMarginStyle = computed(() => ({
      marginRight: pxTransform(parseInt(`${props.margin!}`))
    }))

    const iconStyle = computed(() => (cls) => ({
      fontSize: props.size ? convertToUnit(props.size) : '',
      color: props.color && cls.includes('at-rate__icon--on') ? props.color : ''
    }))

    // 生成星星颜色 className 数组，方便在jsx中直接map
    const starColorClasses = computed(() => {
      const classNameArr: string[] = []
      const floorValue = Math.floor(props.value!)
      const ceilValue = Math.ceil(props.value!)
      for (let i = 0; i < parseInt(`${props.max!}`); i++) {
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
      if (attrs['onUpdate:value']) {
        modelValue.value = event
      } else {
        props.onChange && props.onChange(event)
      }
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
              style: iconMarginStyle.value,
              onTap: handleClick.bind(this, i + 1)
            }, {
              default: () => [
                h(Text, {
                  class: iconClasses.value,
                  style: iconStyle.value(cls)
                }),
                h(View, {
                  class: 'at-rate__left'
                }, {
                  default: () => [
                    h(Text, {
                      class: iconClasses.value,
                      style: iconStyle.value(cls)
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