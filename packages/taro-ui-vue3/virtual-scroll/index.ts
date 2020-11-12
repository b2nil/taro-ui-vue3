import { App } from 'vue'
import AtVirtualScroll from './src/index.vue'

export default (app: App): void => {
  app.component(AtVirtualScroll.name, AtVirtualScroll)
}

export {
  AtVirtualScroll
}
