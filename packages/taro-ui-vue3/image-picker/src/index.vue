<template>
  <view
    v-bind="$attrs"
    class="at-image-picker"
  >
    <view
      v-for="(row, i) in matrix"
      :key="i+1"
      class="at-image-picker__flex-box"
    >
      <view
        v-for="(item, j) in row"
        :key="item.url ? `preview-${i * length + j}` : `add-bar-${i * length + j}`"
        class="at-image-picker__flex-item"
      >
        <!-- image thumb -->
        <view
          v-if="item.url"
          class="at-image-picker__item"
        >
          <view
            class="at-image-picker__remove-btn"
            @tap="handleRemoveImg(i * length + j)"
          />

          <image
            class="at-image-picker__preview-img"
            :mode="mode"
            :src="item.url"
            @tap="handleImageClick(i * length + j)"
          />
        </view>

        <!-- + add bar: choose button -->
        <view
          v-else-if="item.type === 'btn'"
          class="at-image-picker__item at-image-picker__choose-btn"
          @tap="chooseFile"
        >
          <view
            v-for="i in [0, 1]"
            :key="i"
            class="add-bar"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from "vue"
import Taro from '@tarojs/taro'
import { uuid } from "@taro-ui-vue3/utils/common"
import { AtImagePickerProps, File } from "@taro-ui-vue3/types/image-picker"

interface MatrixFile extends Partial<File> {
  type: 'blank' | 'btn'
  uuid: string
}

// 生成 jsx 二维矩阵
const generateMatrix = (
  files: MatrixFile[],
  col: number,
  showAddBtn: boolean
): MatrixFile[][] => {
  const matrix: Array<MatrixFile>[] = []
  const length = showAddBtn ? files.length + 1 : files.length
  const row = Math.ceil(length / col)
  for (let i = 0; i < row; i++) {
    if (i === row - 1) {
      // 最后一行数据加上添加按钮
      const lastArr = files.slice(i * col)
      if (lastArr.length < col) {
        if (showAddBtn) {
          lastArr.push({ type: 'btn', uuid: uuid() })
        }
        // 填补剩下的空列
        for (let j = lastArr.length; j < col; j++) {
          lastArr.push({ type: 'blank', uuid: uuid() })
        }
      }
      matrix.push(lastArr)
    } else {
      matrix.push(files.slice(i * col, (i + 1) * col))
    }
  }
  return matrix
}

const ENV = Taro.getEnv()

export default defineComponent({
  name: "AtImagePicker",

  emits: {
    'change'(files: File[], operationType: 'add' | 'remove', index?: number) {
      return !!(
        files && Array.isArray(files) &&
        operationType && ['add', 'remove'].includes(operationType) &&
        ['undefined', 'number'].includes(typeof index)
      )
    },
    'image-click'(index: number, file: Object) {
      return !!(
        index && typeof index === 'number' &&
        file && typeof file === 'object'
      )
    },
    'fail'(message: string) {
      return !!(message && typeof message === 'string')
    }
  },

  props: {
    // 参数
    files: {
      type: Array as PropType<AtImagePickerProps['files']>,
      default: () => [],
    },
    mode: {
      type: String as PropType<AtImagePickerProps['mode']>,
      default: 'aspectFill' as AtImagePickerProps['mode']
    },
    showAddBtn: {
      type: Boolean,
      default: true
    },
    multiple: Boolean,
    length: {
      type: Number as PropType<AtImagePickerProps['length']>,
      default: 4
    },
    count: Number as PropType<AtImagePickerProps['count']>,
    sizeType: Array as PropType<AtImagePickerProps['sizeType']>,
    sourceType: Array as PropType<AtImagePickerProps['sourceType']>
  },

  setup(props: AtImagePickerProps, { emit }) {

    const rowLength = computed(() => props.length! <= 0 ? 1 : props.length)

    const matrix = computed(() => generateMatrix(
      props.files as MatrixFile[],
      rowLength.value!,
      props.showAddBtn!
    ))

    function chooseFile() {
      const params: any = {}

      const filePathName =
        ENV === Taro.ENV_TYPE.ALIPAY
          ? 'apFilePaths'
          : 'tempFiles'

      if (props.multiple) {
        params.count = 99
      }

      if (props.count) {
        params.count = props.count
      }

      if (props.sizeType) {
        params.sizeType = props.sizeType
      }

      if (props.sourceType) {
        params.sourceType = props.sourceType
      }

      Taro.chooseImage(params)
        .then(res => {
          const targetFiles = res.tempFilePaths.map((path, i) => ({
            url: path,
            file: res[filePathName][i]
          }))

          const newFiles = props.files.concat(targetFiles)

          emit('change', newFiles, 'add')
        })
        .catch((err) => {
          emit('fail', err)
        })
    }

    function handleImageClick(idx: number) {
      emit('image-pick', idx, props.files[idx])
    }

    function handleRemoveImg(idx: number) {
      if (ENV === Taro.ENV_TYPE.WEB) {
        window.URL.revokeObjectURL(props.files[idx].url)
      }

      const newFiles = props.files.filter((_, i) => i !== idx)

      emit('change', newFiles, 'remove', idx)
    }

    return {
      length: toRef(props, 'length'),
      mode: toRef(props, 'mode'),
      matrix,
      chooseFile,
      handleRemoveImg,
      handleImageClick,
    }
  }
})
</script>

