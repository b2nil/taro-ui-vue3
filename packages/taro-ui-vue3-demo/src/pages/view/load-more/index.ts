
import { h, defineComponent, reactive } from "vue"
import { AtLoadMore } from "taro-ui-vue3"
import { Page, Panel } from '@/components/index'
import './index.scss'

interface LoadMorePageState {
  status: 'more' | 'loading' | 'noMore'
}

export default defineComponent({
  name: "LoadMoreDemo",

  setup() {

    const state = reactive<LoadMorePageState>({
      status: 'more'
    })

    function handleClick(): void {
      state.status = 'loading'
      setTimeout(() => {
        state.status = 'noMore'
      }, 2000)
    }

    return () => (

      h(Page, { headerTitle: 'LoadMore 页面提示 ' }, {
        default: () => [
          /* 文字*/
          h(Panel, { title: '一般用法', noPadding: true }, {
            default: () => [
              h(AtLoadMore, {
                onClick: handleClick.bind(this),
                status: state.status,
              })
            ]
          })
        ]
      })
    )
  }
})
