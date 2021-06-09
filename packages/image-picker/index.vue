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
        :key="genKey(item, i, j)"
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

          <!-- upload status -->
          <view
            v-if="item.status && item.status !== 'done'"
            class="at-image-picker__upload-status"
          >
            <!-- status icon -->
            <at-loading
              v-if="item.status === 'uploading'"
              color="#fff"
            />
            <view
              v-else
              class="at-image-picker__status-icon at-image-picker__status-icon--failed"
            />
            <!-- status message -->
            <view
              v-if="item.message"
              :class="['at-image-picker__status-message', {
                'at-image-picker__status-message--uploading': item.status === 'uploading',
                'at-image-picker__status-message--failed': item.status !== 'uploading',
              }]"
            >
              {{ item.message }}
            </view>
          </view>
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
import Taro from '@tarojs/taro'
import { defineComponent, computed, toRef, PropType } from "vue"
import { uuid } from "@taro-ui-vue3/utils"
import { AtImagePickerProps, File } from "@taro-ui-vue3/types/image-picker"
import AtLoading from "@taro-ui-vue3/loading/index.vue"

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
const modeOptions = [
  "scaleToFill", "aspectFit", "aspectFill", "widthFix",
  "top", "bottom", "center", "left", "right",
  "top left", "top right", "bottom left", "bottom right"
]

const AtImagePicker = defineComponent({
  name: "AtImagePicker",

  components: { AtLoading },

  emits: {
    'change'(args: { files: File[], operationType: 'add' | 'remove', index?: number }) {
      return !!(
        args.files && Array.isArray(args.files) &&
        args.operationType && ['add', 'remove'].includes(args.operationType) &&
        ['undefined', 'number'].includes(typeof args.index)
      )
    },
    'image-click'(index: number, file: File) {
      return !!(
        typeof index === 'number' &&
        file && typeof file === 'object'
      )
    },
    'fail'(message: string) {
      return !!(message && typeof message === 'string')
    }
  },

  props: {
    files: {
      type: Array as PropType<AtImagePickerProps['files']>,
      default: () => [],
    },
    mode: {
      type: String as PropType<AtImagePickerProps['mode']>,
      default: 'aspectFill' as AtImagePickerProps['mode'],
      validator: (value: string) => modeOptions.includes(value)
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
    sizeType: {
      type: Array as PropType<AtImagePickerProps['sizeType']>,
      default: () => ['original', 'compressed']
    },
    sourceType: {
      type: Array as PropType<AtImagePickerProps['sourceType']>,
      default: () => ['album', 'camera']
    }
  },

  setup(props: AtImagePickerProps, { emit }) {

    const rowLength = computed(() => props.length! <= 0 ? 1 : props.length)

    const genKey = computed(() => (
      item: MatrixFile,
      row: number,
      col: number
    ) => {
      return item.url
        ? `preview-${row * props.length! + col}`
        : `add-bar-${row * props.length! + col}`
    })

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

          emit('change', { files: newFiles, operationType: 'add' })
        })
        .catch((err) => {
          emit('fail', err.errMsg)
        })
    }

    function handleImageClick(idx: number) {
      emit('image-click', idx, props.files[idx])
    }

    function handleRemoveImg(idx: number) {
      if (ENV === Taro.ENV_TYPE.WEB) {
        window.URL.revokeObjectURL(props.files[idx].url)
      }

      const newFiles = props.files.filter((_, i) => i !== idx)

      emit('change', { files: newFiles, operationType: 'remove', index: idx })
    }

    return {
      length: toRef(props, 'length'),
      mode: toRef(props, 'mode'),
      matrix,
      genKey,
      chooseFile,
      handleRemoveImg,
      handleImageClick,
    }
  }
})

export default AtImagePicker
</script>

