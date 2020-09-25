
import { h, defineComponent } from 'vue'
import { AtCountdown } from '@/components/index'
import Taro from '@tarojs/taro'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'
import { View } from '@tarojs/components'

export default defineComponent({
  name: "CountdownDemo",

  setup() {

    function onTimeUp(): void {
      Taro.showToast({
        title: '时间到',
        icon: 'success',
        duration: 2000
      })
    }

    return () => {
      return (
        h(Page, { headerTitle: 'CountDown 倒计时' }, {
          default: () => [
            /* 一般用法*/
            h(Panel, { title: '一般用法' }, {
              default: () => [
                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      minutes: 1,
                      seconds: 10,
                    })
                  ]
                }),

                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      hours: 48,
                      minutes: 0,
                      seconds: 3,
                    })
                  ]
                }),

                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      isShowDay: true,
                      hours: 1,
                      minutes: 1,
                      seconds: 10,
                    })
                  ]
                }),

                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      isShowHour: false,
                      minutes: 1,
                      seconds: 10,
                    })
                  ]
                })
              ]
            }),

            /* 自定义格式化*/
            h(Panel, { title: '自定义格式化' }, {
              default: () => [
                h(AtCountdown, {
                  format: { hours: ':', minutes: ':', seconds: '' },
                  minutes: 1,
                  seconds: 10,
                })
              ]
            }),

            /* 卡片式*/
            h(Panel, { title: '卡片式' }, {
              default: () => [
                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      isCard: true,
                      minutes: 1,
                      seconds: 10
                    })
                  ]
                }),

                h(View, { class: 'panel__content' }, {
                  default: () => [
                    h(AtCountdown, {
                      isCard: true,
                      isShowDay: true,
                      day: 1,
                      minutes: 1,
                      seconds: 10,
                      format: { day: '天', hours: ':', minutes: ':', seconds: '' },
                    })
                  ]
                })
              ]
            }),

            /* 自定义倒计时回调事件*/
            h(Panel, { title: '自定义倒计时回调事件' }, {
              default: () => [
                h(AtCountdown, {
                  format: { hours: ':', minutes: ':', seconds: '' },
                  seconds: 10,
                  onTimeUp: onTimeUp.bind(this),
                })
              ]
            }),
            /* E Body*/
          ]
        })
      )
    }
  }
})
