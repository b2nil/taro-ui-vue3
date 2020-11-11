import { App } from 'vue'
import AtNavBar from './src/index.vue'

export default (app: App): void => {
  app.component(AtNavBar.name, AtNavBar)
}

export {
  AtNavBar
}
