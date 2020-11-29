
import { h, defineComponent, reactive } from 'vue'
import { AtList, AtListItem } from '@/components/index'
import {
  Image,
  Slider,
  Swiper,
  SwiperItem,
  Text,
  View
} from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface SwiperPageState {
  current: number
  duration: number
  interval: number
  isCircular: boolean
  isAutoplay: boolean
  hasIndicatorDots: boolean
  imgUrls: string[]
}

export default defineComponent({
  name: "SwiperDemo",

  setup() {

    const state = reactive<SwiperPageState>({
      current: 1,
      duration: 500,
      interval: 5000,
      isCircular: false,
      isAutoplay: false,
      hasIndicatorDots: true,
      imgUrls: [
        'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
      ]
    })

    const setAutoPlay = (e: CommonEvent): void => {
      state.isAutoplay = e.detail.value
    }

    const setCircular = (e: CommonEvent): void => {
      state.isCircular = e.detail.value
    }

    const setIndicatorDots = (e: CommonEvent): void => {
      state.hasIndicatorDots = e.detail.value
    }

    const setInterval = (e: CommonEvent): void => {
      state.interval = e.detail.value
    }

    const setDuration = (e: CommonEvent): void => {
      state.duration = e.detail.value
    }

    return () => {
      const {
        current,
        isAutoplay,
        duration,
        isCircular,
        interval,
        hasIndicatorDots,
        imgUrls
      } = state

      return (
        h(Page, { headerTitle: 'Swiper 滑块视图容器' }, {
          default: () => [
            /* 基础用法*/
            h(Panel, { title: '基础用法', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(Swiper, {
                      indicatorColor: '#999',
                      indicatorActiveColor: '#333',
                      current: current,
                      duration: duration,
                      interval: interval,
                      circular: isCircular,
                      autoplay: isAutoplay,
                      indicatorDots: hasIndicatorDots,
                      previousMargin: '20',
                    }, {
                      default: () => [
                        imgUrls.map((item, idx) => (
                          h(SwiperItem, { key: idx }, {
                            default: () => [
                              h(Image, { src: item, class: 'slide-image' }),
                            ]
                          })
                        ))
                      ]
                    }),

                    h(View, { class: 'control-cnt' }, {
                      default: () => [
                        h(AtList, null, {
                          default: () => [
                            h(AtListItem, {
                              title: '指示点',
                              switchIsCheck: hasIndicatorDots,
                              isSwitch: true,
                              onSwitchChange: setIndicatorDots,
                            }),
                            h(AtListItem, {
                              title: '自动播放',
                              switchIsCheck: isAutoplay,
                              isSwitch: true,
                              onSwitchChange: setAutoPlay,
                            }),
                            h(AtListItem, {
                              title: '循环播放',
                              switchIsCheck: isCircular,
                              isSwitch: true,
                              onSwitchChange: setCircular,
                            }),
                          ]
                        }),

                        h(View, { class: 'slider-list' }, {
                          default: () => [
                            h(View, { class: 'slider-list__item' }, {
                              default: () => [
                                h(View, { class: 'slider-list__item-header' }, {
                                  default: () => [
                                    h(Text, null, { default: () => '幻灯片切换时长(ms)' })
                                  ]
                                }),
                                h(View, { class: 'slider-list__item-body' }, {
                                  default: () => [
                                    h(Slider, {
                                      activeColor: '#6190e8',
                                      showValue: true,
                                      step: 1,
                                      min: 500,
                                      max: 2000,
                                      value: duration,
                                      onChange: setDuration,
                                    })
                                  ]
                                }),
                              ]
                            }),
                            h(View, { class: 'slider-list__item' }, {
                              default: () => [
                                h(View, { class: 'slider-list__item-header' }, {
                                  default: () => [
                                    h(Text, null, { default: () => '自动播放间隔时长(ms)' })
                                  ]
                                }),
                                h(View, { class: 'slider-list__item-body' }, {
                                  default: () => [
                                    h(Slider, {
                                      activeColor: '#6190e8',
                                      showValue: true,
                                      step: 1,
                                      min: 2000,
                                      max: 10000,
                                      value: interval,
                                      onChange: setInterval,
                                    })
                                  ]
                                }),
                              ]
                            }),
                          ]
                        }),
                      ]
                    }),
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
