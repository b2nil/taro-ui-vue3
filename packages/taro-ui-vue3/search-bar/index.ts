import { App } from 'vue'
import AtSearchBar from './src/index.vue'

export default (app: App): void => {
  app.component(AtSearchBar.name, AtSearchBar)
}

export {
  AtSearchBar
}
