import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { View } from '@/utils/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSegmentedControlProps } from 'types/segmented-control'
import { mergeStyle, pxTransform } from '@/utils/common'
import AtComponentWithDefaultProps from '../mixins'

const AtSegmentedControl = defineComponent({

  mixins: [AtComponentWithDefaultProps],

  props: {
    current: {
      type: Number,
      default: 0,
      required: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    fontSize: {
      type: Number,
      default: 28
    },
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array as () => AtSegmentedControlProps['values'],
      default: [],
      required: true
    },
    onClick: {
      type: Function as unknown as () => AtSegmentedControlProps['onClick'],
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtSegmentedControlProps, { slots }) {

    function handleClick(index: number, event: CommonEvent): void {
      if (props.disabled) return

      props.onClick(index, event)
    }

    return () => {
      const rootStyle = computed(() => ({
        borderColor: props.selectedColor
      }))

      const itemStyle = computed(() => ({
        color: props.selectedColor,
        fontSize: pxTransform(props.fontSize!),
        borderColor: props.selectedColor,
        backgroundColor: props.color
      }))

      const selectedItemStyle = computed(() => ({
        color: props.color,
        fontSize: pxTransform(props.fontSize!),
        borderColor: props.selectedColor,
        backgroundColor: props.selectedColor
      }))

      const rootClass = computed(() => classNames(
        'at-segmented-control',
        {
          'at-segmented-control--disabled': props.disabled
        },
        props.className
      ))

      return (
        h(View, {
          class: rootClass.value,
          style: mergeStyle(rootStyle.value, props.customStyle!)
        }, {
          default: () => props.values.map((value, i) => (
            h(View, {
              key: value,
              class: classNames('at-segmented-control__item', {
                'at-segmented-control__item--active': props.current === i
              }),
              style: props.current === i ? selectedItemStyle.value : itemStyle.value,
              onTap: handleClick.bind(this, i)
            }, value)
          ))
        })
      )
    }
  }
})

export default AtSegmentedControl

