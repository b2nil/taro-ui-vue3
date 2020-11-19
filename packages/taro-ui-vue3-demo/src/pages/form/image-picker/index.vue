<template>
  <page header-title="ImagePicker 图片选择器">
    <template
      v-for="(panel, index) in panels"
      :key="index"
    >
      <panel
        :title="panel.title"
        no-padding
      >
        <example-item>
          <at-image-picker v-bind="panel.attrs" />
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { AtImagePicker } from "taro-ui-vue3"
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

type DogaImage = {
  url: string
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

  components: {
    AtImagePicker, Page, Panel, ExampleItem
  },

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
      ])
    })

    const panels = [
      {
        title: "基础用法",
        attrs: {
          files: state.files1,
          onChange: onChange.bind(this, 'files1')
        }
      },
      {
        title: "多选图片",
        attrs: {
          multiple: true,
          files: state.files2,
          onChange: onChange.bind(this, 'files2'),
          onFail: onFail.bind(this),
          onImageClick: onImageClick.bind(this)
        }
      },
      {
        title: "自定义每行数量",
        attrs: {
          multiple: true,
          length: 3,
          files: state.files3,
          onChange: onChange.bind(this, 'files3')
        }
      },
      {
        title: "更改图片的缩放模式",
        attrs: {
          mode: 'aspectFit',
          multiple: true,
          files: state.files4,
          onChange: onChange.bind(this, 'files4')
        }
      }
    ]

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
      panels
    }
  }
})

</script>