# ImagePicker 图片选择器

---
图片选择器，一般用于上传图片前的文件选择操作，但不包括图片上传的功能

## 使用指南

在 Taro 文件中引入组件


```typescript
import { AtImagePicker } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/image-picker.scss";
```


## 一般用法

说明

* 该组件为受控组件，开发者需要通过 `onChange` 事件来更新 `files`，`files` 与 `onChange` 函数必填

* 该组件使用 `Taro.chooseImage` 实现选取图片，会受到 Taro 能力的制约，具体请参考 Taro 文档

* 开发者可以获取 `files` 数据并通过 [`Taro.uploadFile`](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html) 上传图片


```html
<template>
  <view>
    <AtImagePicker
      :files="files"
      @change="onChange"
    />
  </view>
</template>

<script>
import { AtImagePicker } from 'taro-ui-vue3'
export default {
  name: 'AtImagePickerDemo',
  components: { AtImagePicker },
  data() {
    return {
      files: [
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
        },
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
        },
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
        }
      ]
    }
  },
  methods: {
    onChange (files) {
      this.files = files
    },
    onFail (mes) {
      console.log(mes)
    },
    onImageClick (index, file) {
      console.log(index, file)
    }
  },
}
</script>

```


## 多选图片


```html
<template>
  <view>
    <AtImagePicker
      multiple
      :files="files"
      @change="onChange"
      @fail="onFail"
      @image-click="onImageClick"
    />
  </view>
</template>
```


## 自定义数量


```html
<template>
  <view>
    <AtImagePicker
      multiple
      length="5"
      :files="files"
      @change="onChange"
      @fail="onFail"
      @image-click="onImageClick"
    />
  </view>
</template>
```


## 多种图片预览模式

```html
<template>
  <view>
    <AtImagePicker
      mode='top'
      :files="files"
      @change="onChange"
      @fail="onFail"
      @image-click="onImageClick"
    />
  </view>
</template>
```

## 上传状态

```html
<template>
  <at-image-picker
    multiple
    mode="aspectFit"
    :files="files5"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Taro from '@tarojs/taro'

type DogaImage = {
  url: string,
  status?: 'uploading' | 'failed' | 'done'
  message?: string
  [propName: string]: any
}

export default defineComponent({
  name: "ImagePickerDemo",

  setup() {
    const files5 = ref<DogaImage[]>([
      {
        url: 'https://87022.jpg',
        status: 'uploading',
        message: '上传中'
      },
      {
        url: 'https://387016.jpg',
        status: 'failed',
        message: '上传失败'
      }
    ])

    function onChange({ files, operationType }: {
      files: DogaImage[],
      operationType: 'add' | 'remove'
    }): void {
      const oldLen = files5.value.length
      const currentFiles = files5.value

      if (operationType === 'add') {
        files.slice(oldLen).forEach((file, index) => {
          const id = uuid()
          currentFiles.push({ ...file, id })

          setStatus(currentFiles[index + oldLen], 'uploading')
          // Use Taro.uploadFile instead
          uploadFileMock(file.url)
            .then(() => {
              const target = currentFiles.find(({ id: _id }) => _id === id)
              target && setStatus(target, 'done')
            }).catch(() => {
              const target = currentFiles.find(({ id: _id }) => _id === id)
              target && setStatus(target, 'failed')
            })
        })
      } else if (operationType === 'remove') {
        files5.value = files
      }
    }

    function uploadFileMock(url) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > .5 ? resolve(url) : reject('err')
        }, 2000)
      })
    }

    function setStatus(item, type) {
      switch (type) {
        case 'uploading':
          item.status = 'uploading'
          item.message = '正在上传'
          break
        case 'failed':
          item.status = 'failed'
          item.message = '上传失败'
          break
        case 'done':
          item.status = 'done'
          break
      }
      return item
    }

    return {
      ...toRefs(state),
      onChange
    }
  }

</script>
```


## 参数

| 参数       | 说明  | 类型  | 可选值 | 默认值|
| ---------- | ---- |------- | --- | --- |
| files      | 图片文件数组, 元素为 `File` 对象: `{ url: string, file?: { path: string, size: number }, status?: "uploading" | "failed" | "done", message?: string }`| `Array<File>` | - | `[]` |
| mode       | 图片预览模式，详见 [微信开发者文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) | String  | `scaleToFill`, `aspectFit`, `aspectFill`, `widthFix`, `top`, `bottom`, `center`, `left`, `right`, `top left`, `top right`, `bottom left`, `bottom right` | `aspectFill`   |
| showAddBtn | 是否显示添加图片按钮  | Boolean |  -   | `true`   |
| multiple   | 是否支持多选       | Boolean | -     | `false`  |
| count      | 最多可以选择的图片张数 | Number  | 0 ～ 99  | 默认为 `1`，当 `multiple` 为 `true` 时候，为 `99`，此选项设置和 `multiple` 冲突时，以该项优先 |
| sizeType   | 所选的图片的尺寸   | Array   | -    | `['original', 'compressed']`|
| sourceType | 选择图片的来源    | Array   | -     | `['album', 'camera']` |
| length     | 单行的图片数量    | Number  | -     | `4`   |

## 事件

| 事件名称     | 说明      | 返回参数   |
| ------------ | ---------| ---------|
| onChange     | `files` 值发生变化触发的回调函数, `operationType` 操作类型有添加，移除，如果是移除操作，则 `index` 代表的是移除图片的索引 | `( args: { files: File[], operationType: 'add' | 'remove', index?: number }) => void` |
| onImageClick | 点击图片触发的回调  | `(index: number, file: Object) => void` |
| onFail       | 选择失败触发的回调  | `(msg: string) => void`|
