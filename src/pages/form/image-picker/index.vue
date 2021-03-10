<template>
  <page header-title="ImagePicker 图片选择器">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <at-image-picker
          :files="files1"
          @change="onChange('files1', $event)"
        />
      </example-item>
    </panel>

    <panel
      title="多选图片"
      no-padding
    >
      <example-item>
        <at-image-picker
          multiple
          :files="files2"
          @change="onChange('files2', $event)"
          @fail="onFail"
          @image-pick="onImageClick"
        />
      </example-item>
    </panel>

    <panel
      title="自定义每行数量"
      no-padding
    >
      <example-item>
        <at-image-picker
          multiple
          :length="3"
          :files="files3"
          @change="onChange('files3', $event)"
        />
      </example-item>
    </panel>

    <panel
      title="更改图片的缩放模式"
      no-padding
    >
      <example-item>
        <at-image-picker
          multiple
          mode="aspectFit"
          :files="files4"
          @change="onChange('files4', $event)"
        />
      </example-item>
    </panel>

    <panel
      title="上传状态"
      no-padding
    >
      <example-item>
        <at-image-picker
          multiple
          mode="aspectFit"
          :files="files5"
          @change="onChange('files5', $event)"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

type DogaImage = {
  url: string,
  status?: 'uploading' | 'failed' | 'done'
  message?: string
}

const dogaImages: DogaImage[] = [
  {
    url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
  },
  {
    url: 'https://storage.360buyimg.com/mtd/home/221543234387016.jpg'
  },
  {
    url: 'https://storage.360buyimg.com/mtd/home/331543234387025.jpg'
  }
]

interface IndexState {
  [key: string]: DogaImage[]
}

export default defineComponent({
  name: "ImagePickerDemo",

  setup() {

    const state = reactive<IndexState>({
      files1: Array.from(dogaImages),
      files2: Array.from(dogaImages),
      files3: Array.from(dogaImages),
      files4: dogaImages.concat([
        {
          url:
            'https://storage.360buyimg.com/mtd/home/36549825_887087111478302_5745542532574478336_n1543234831971.jpg'
        }
      ]),
      files5: [
        {
          url:
            'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
          status: 'uploading',
          message: '上传中'
        },
        {
          url:
            'https://storage.360buyimg.com/mtd/home/221543234387016.jpg',
          status: 'failed',
          message: '上传失败'
        }
      ]
    })

    function onChange(stateName: string, files: DogaImage[]): void {
      state[stateName] = files
    }

    function onFail(mes: string): void {
      Taro.showToast({
        title: `onFail: ${JSON.stringify(mes)}`,
        icon: 'none'
      })
    }

    function onImageClick(index: number, file: DogaImage): void {
      Taro.showToast({
        title: `onImageClick: ${index}${JSON.stringify(file)}`,
        icon: 'none'
      })
    }

    return {
      ...toRefs(state),
      onFail,
      onChange,
      onImageClick
    }
  }
})
</script>