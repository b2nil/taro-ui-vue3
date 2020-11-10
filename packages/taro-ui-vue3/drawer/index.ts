import { App } from 'vue'
import AtDrawer from './src/index.vue'

export default (app: App): void => {
  app.component(AtDrawer.name, AtDrawer)
}

export {
  AtDrawer
}
