import {
  h,
  defineComponent,
  VNode,
  PropType,
  computed,
  Transition
} from "vue"

import {
  View
} from "@tarojs/components"

import { dimensionsFactory } from "@/composables/dimensions"
import { makeElevationProps, useElevationClasses } from "@/composables/elevation"

// types
import {
  AtSkeletonProps,
  HTMLSkeletonElement
} from "types/skeleton"

const { makeDimensionsProps, useDimensions } = dimensionsFactory()


const AtSkeleton = defineComponent({
  name: "AtSkeleton",

  props: {
    ...makeElevationProps(),
    ...makeDimensionsProps(),
    boilerplate: Boolean,
    loading: Boolean,
    tile: Boolean,
    transition: String as PropType<AtSkeletonProps["transition"]>,
    type: String as PropType<AtSkeletonProps["type"]>,
    types: {
      type: Object as PropType<AtSkeletonProps["types"]>,
      default: () => ({}),
    }
  },

  setup(props: AtSkeletonProps, { slots, attrs }) {

    const { dimensions } = useDimensions(props)
    const { elevationClasses } = useElevationClasses(props)

    const isLoading = computed(() => {
      return !('default' in slots) || props.loading
    })

    const _attrs = computed(() => {
      if (isLoading.value) return attrs

      return !props.boilerplate
        ? {
          'aria-busy': true,
          'aria-live': 'polite',
          role: 'alert',
          ...attrs,
        }
        : {}
    })

    const classes = computed(() => ({
      ...elevationClasses.value,
      'at-skeleton--boilerplate': props.boilerplate,
      'at-skeleton--is-loading': isLoading.value,
      'at-skeleton--tile': props.tile,
      'at-skeleton': true
    }))

    const rootTypes = computed(() => ({
      ...props.types,
      actions: 'button@2',
      article: 'heading, paragraph',
      avatar: 'avatar',
      button: 'button',
      card: 'image, card-heading',
      'card-avatar': 'image, list-item-avatar',
      'card-heading': 'heading',
      chip: 'chip',
      'date-picker': 'list-item, card-heading, divider, date-picker-options, date-picker-days, actions',
      'date-picker-options': 'text, avatar@2',
      'date-picker-days': 'avatar@28',
      heading: 'heading',
      image: 'image',
      'list-item': 'text',
      'list-item-avatar': 'avatar, text',
      'list-item-two-line': 'sentences',
      'list-item-avatar-two-line': 'avatar, sentences',
      'list-item-three-line': 'paragraph',
      'list-item-avatar-three-line': 'avatar, paragraph',
      paragraph: 'text@3',
      sentences: 'text@2',
      table: 'table-heading, table-thead, table-tbody, table-tfoot',
      'table-heading': 'heading, text',
      'table-thead': 'heading@6',
      'table-tbody': 'table-row-divider@6',
      'table-row-divider': 'table-row, divider',
      'table-row': 'table-cell@6',
      'table-cell': 'text',
      'table-tfoot': 'text@2, avatar@2',
      text: 'text'
    }))

    function genBone(text: string, children: VNode[]) {
      return h(View, {
        class: `at-skeleton__${text} at-skeleton__bone`
      }, { default: () => children })
    }

    function genBones(bone: string): VNode[] {
      // e.g. 'text@3'
      const [type, length] = bone.split('@') as [string, number]
      const generator = () => genStructure(type)

      return Array.from({ length }).map(generator)
    }

    function genStructure(type?: string): any {
      let children: any[] = []
      type = type || props.type || ''
      const bone = rootTypes.value[type] || ''

      // end of recursion, noop
      if (type === bone) { }
      // Array of values - e.g. 'heading, paragraph, text@2'
      else if (type.indexOf(',') > -1) return mapBones(type)
      // Array of values - e.g. 'paragraph@4'
      else if (type.indexOf('@') > -1) return genBones(type)
      // Array of values - e.g. 'card@2'
      else if (bone.indexOf(',') > -1) children = mapBones(bone)
      // Array of values - e.g. 'list-item@2'
      else if (bone.indexOf('@') > -1) children = genBones(bone)
      // Single value - e.g. 'card-heading'
      else if (bone) children.push(genStructure(bone))

      return [genBone(type, children)]
    }

    function genSkeleton() {
      const children: any[] = []

      if (!isLoading.value) children.push(slots.default?.())
      else children.push(genStructure())

      if (!props.transition) return children

      return h(Transition, {
        onAfterEnter: resetStyles,
        onBeforeEnter: onBeforeEnter,
        onBeforeLeave: onBeforeLeave,
        onLeaveCancelled: resetStyles
      }, { default: () => children })
    }

    function mapBones(bones: string) {
      return bones
        .replace(/\s/g, '')
        .split(',')
        .map(genStructure)
    }

    function onBeforeEnter(el: HTMLSkeletonElement) {
      resetStyles(el)

      if (!isLoading.value) return

      el._initialStyle = {
        display: el.style.display,
        transition: el.style.transition,
      }

      el.style.setProperty('transition', 'none', 'important')
    }

    function onBeforeLeave(el: HTMLSkeletonElement) {
      el.style.setProperty('display', 'none', 'important')
    }

    function resetStyles(el: HTMLSkeletonElement) {
      if (!el._initialStyle) return

      el.style.display = el._initialStyle.display || ''
      el.style.transition = el._initialStyle.transition

      delete el._initialStyle
    }

    return () => (
      h(View, {
        ..._attrs.value,
        class: classes.value,
        style: isLoading.value ? dimensions.value.style : undefined
      }, { default: () => [genSkeleton()] })
    )
  }
})

export default AtSkeleton