import { h, defineComponent, reactive } from 'vue'
import { AtImagePicker } from '@/components/index'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
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

    return () => {
      return (
        h(Page, { headerTitle: 'ImagePicker 图片选择器' }, {
          default: () => [

            /* 基础用法*/
            h(Panel, { title: '基础用法', noPadding: true }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtImagePicker, {
                      files: state.files1,
                      onChange: onChange.bind(this, 'files1'),
                    })
                  ]
                }),
              ]
            }),

            /* 多选图片*/
            h(Panel, { title: '多选图片', noPadding: true }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtImagePicker, {
                      multiple: true,
                      files: state.files2,
                      onChange: onChange.bind(this, 'files2'),
                      onFail: onFail.bind(this),
                      onImageClick: onImageClick.bind(this),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义每行数量*/
            h(Panel, { title: '自定义每行数量', noPadding: true }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtImagePicker, {
                      multiple: true,
                      length: 3,
                      files: state.files3,
                      onChange: onChange.bind(this, 'files3'),
                    })
                  ]
                }),
              ]
            }),

            /* 更改图片的缩放模式*/
            h(Panel, { title: '更改图片的缩放模式', noPadding: true }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtImagePicker, {
                      mode: 'aspectFit',
                      multiple: true,
                      files: state.files4,
                      onChange: onChange.bind(this, 'files4'),
                    })
                  ]
                }),
              ]
            }),
          ]
        })
      )
    }
  }
})
