import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSegmentedControlProps } from 'types/segmented-control'
import { pxTransform } from '../../utils/common'

const AtSegmentedControl = defineComponent({

  name: "AtSegmentedControl",

  props: {
    current: {
      type: Number,
      default: 0
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
      type: [Number, String],
      default: 28,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array as PropType<AtSegmentedControlProps['values']>,
      default: [],
      required: true
    },
    onClick: {
      type: Function as PropType<AtSegmentedControlProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { }
    },
  },

  setup(props: AtSegmentedControlProps, { attrs }) {

    const rootClass = computed(() => ({
      'at-segmented-control': true,
      'at-segmented-control--disabled': props.disabled
    }))

    const rootStyle = computed(() => ({
      borderColor: props.selectedColor
    }))

    const genItemClass = computed(() => (i) => ({
      'at-segmented-control__item': true,
      'at-segmented-control__item--active': props.current === i
    }))

    const itemStyle = computed(() => ({
      color: props.selectedColor,
      fontSize: pxTransform(parseInt(`${props.fontSize!}`)),
      borderColor: props.selectedColor,
      backgroundColor: props.color
    }))

    const selectedItemStyle = computed(() => ({
      color: props.color,
      fontSize: pxTransform(parseInt(`${props.fontSize!}`)),
      borderColor: props.selectedColor,
      backgroundColor: props.selectedColor
    }))

    function handleClick(index: number, event: CommonEvent): void {
      if (props.disabled) return

      props.onClick(index, event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
        style: rootStyle.value,
      }), {
        default: () => props.values.map((value, i) => (
          h(View, {
            key: value,
            class: genItemClass.value(i),
            style: props.current === i ? selectedItemStyle.value : itemStyle.value,
            onTap: handleClick.bind(this, i)
          }, { default: () => value })
        ))
      })
    )
  }
})

export default AtSegmentedControl

