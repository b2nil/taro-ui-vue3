import { App } from 'vue'
import AtTabBar from './src/index.vue'

export default (app: App): void => {
  app.component(AtTabBar.name, AtTabBar)
}

export {
  AtTabBar
}
