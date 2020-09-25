import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import Taro from '@tarojs/taro'

import { uuid } from '@/utils/common'

import { Image, View } from '@tarojs/components'
import { AtImagePickerProps, File } from 'types/image-picker'

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

const AtImagePicker = defineComponent({
  name: "AtImagePicker",

  props: {
    // 参数
    files: {
      type: Array as PropType<AtImagePickerProps['files']>,
      default: () => [],
    },
    mode: {
      type: String as PropType<AtImagePickerProps['mode']>,
      default: 'aspectFill'
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
    sizetype: Array as PropType<AtImagePickerProps['sizeType']>,
    sourcetype: Array as PropType<AtImagePickerProps['sourceType']>,
    // 事件
    onChange: {
      type: Function as PropType<AtImagePickerProps['onChange']>,
      default: () => () => { },
      required: true
    },
    onImageClick: {
      type: Function as PropType<AtImagePickerProps['onImageClick']>,
      default: () => () => { }
    },
    onFail: {
      type: Function as PropType<AtImagePickerProps['onFail']>,
      default: () => () => { }
    },
  },

  setup(props: AtImagePickerProps, { attrs }) {

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

          props.onChange(newFiles, 'add')
        })
        .catch(props.onFail)
    }

    function handleImageClick(idx: number) {
      props.onImageClick && props.onImageClick(idx, props.files[idx])
    }

    function handleRemoveImg(idx: number) {
      if (ENV === Taro.ENV_TYPE.WEB) {
        window.URL.revokeObjectURL(props.files[idx].url)
      }

      const newFiles = props.files.filter((_, i) => i !== idx)

      props.onChange(newFiles, 'remove', idx)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-image-picker'
      }), {
        default: () => matrix.value.map((row, i) => (
          h(View, {
            class: 'at-image-picker__flex-box',
            key: i + 1
          }, {
            default: () => row.map((item, j) => (
              h(View, {
                class: 'at-image-picker__flex-item',
                key: item.url
                  ? `preview-${i * props.length! + j}`
                  : `add-bar-${i * props.length! + j}`
              }, {
                default: () => [
                  item.url
                    ? ( // image preview
                      h(View, {
                        class: 'at-image-picker__item'
                      }, {
                        default: () => [
                          h(View, {
                            class: 'at-image-picker__remove-btn',
                            onTap: handleRemoveImg.bind(this, i * props.length! + j)
                          }),

                          h(Image, {
                            class: 'at-image-picker__preview-img',
                            mode: props.mode,
                            src: item.url,
                            onTap: handleImageClick.bind(this, i * props.length! + j)
                          })
                        ]
                      })
                    )
                    : item.type === 'btn' && ( // add bar
                      h(View, {
                        class: 'at-image-picker__item at-image-picker__choose-btn',
                        onTap: chooseFile
                      }, {
                        default: () => Array.apply(
                          null,
                          { length: 2 }
                        ).map(() => h(View, { class: 'add-bar' }))
                      })
                    )
                ]
              })
            ))
          })
        ))
      })
    )
  }
})

export default AtImagePicker