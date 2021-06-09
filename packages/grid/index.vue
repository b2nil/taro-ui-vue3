<template>
  <view
    v-if="Array.isArray(data) && data.length > 0"
    v-bind="$attrs"
    class="at-grid"
  >
    <view
      v-for="(items, row) in gridGroup"
      :key="`at-grid-group-${row}`"
      class="at-grid__flex"
    >
      <view
        v-for="(item, index) in items"
        :key="`at-grid-item-${index}`"
        :class="genGridItemClasses(index)"
        :style="flexStyle"
        @tap="handleClick(item, index, row)"
      >
        <view class="at-grid-item__content">
          <view class="at-grid-item__content-inner">
            <view class="content-inner__icon">
              <!-- use image -->
              <image
                v-if="item.image"
                class="content-inner__img"
                mode="scaleToFill"
                :src="item.image"
              />

              <!-- use icon -->
              <text
                v-else-if="item.iconInfo && item.iconInfo.value"
                :class="genIconClasses(item)"
                :style="genIconStyle(item)"
              />
            </view>

            <text class="content-inner__text">{{ item.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import _chunk from 'lodash/chunk'
import { defineComponent, computed, toRefs, PropType } from "vue"
import { AtGridProps, AtGridItem } from "@taro-ui-vue3/types/grid"
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables"

const AtGrid = defineComponent({
  name: "AtGrid",

  emits: {
    'click'(item: AtGridItem, clickedIndex: number) {
      return !!(item &&
        typeof item === 'object' &&
        typeof clickedIndex === 'number'
      )
    }
  },

  props: {
    data: {
      type: Array as PropType<AtGridProps['data']>,
      required: true
    },
    columnNum: {
      type: Number as PropType<AtGridProps['columnNum']>,
      default: 3,
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String as PropType<AtGridProps['mode']>,
      default: 'square',
      validator: (m: string) => ['square', 'rect'].includes(m)
    }
  },

  setup(props: AtGridProps, { emit }) {

    const gridGroup = computed(() => _chunk(props.data, props.columnNum))

    const bodyClasses = computed(() => {
      let mode = props.mode
      if (mode && !['square', 'rect'].includes(mode)) {
        mode = 'square'
      }

      return [
        'at-grid-item',
        'at-grid__flex-item',
        {
          [`at-grid-item--${mode}`]: Boolean(mode),
          'at-grid-item--no-border': !props.hasBorder
        }
      ]
    })

    const genGridItemClasses = computed(() => (index: number) => ([
      ...bodyClasses.value,
      {
        'at-grid-item--last': index === props.columnNum! - 1
      }
    ]))

    const flexStyle = computed(() => ({
      flex: `0 0 ${100 / props.columnNum!}%`
    }))

    const genIconClasses = (item: AtGridItem) => {
      const { iconClasses } = useIconClasses(item.iconInfo, true)
      return iconClasses.value
    }

    const genIconStyle = (item: AtGridItem) => {
      const { iconStyle } = useIconStyle(item.iconInfo, "", 24)
      return iconStyle.value
    }

    function handleClick(
      item: AtGridItem,
      index: number,
      row: number
    ) {
      const clickedIndex = row * props.columnNum! + index
      emit('click', item, clickedIndex)
    }

    return {
      ...toRefs(props),
      gridGroup,
      flexStyle,
      genIconStyle,
      genIconClasses,
      genGridItemClasses,
      handleClick,
    }
  }
})

export default AtGrid
</script>

