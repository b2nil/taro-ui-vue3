import { createApp } from 'vue'
import { createUI } from 'taro-ui-vue3'
import { Page, Panel, ExampleItem, PropItem, NavButton } from '@/components/index'
import './app.scss'

const App = createApp({
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const tuv3 = createUI()
App.use(tuv3)

App.component(Page.name, Page)
App.component(Panel.name, Panel)
App.component(ExampleItem.name, ExampleItem)
App.component(PropItem.name, PropItem)
App.component(NavButton.name, NavButton)

export default App
