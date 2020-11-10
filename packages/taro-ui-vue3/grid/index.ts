import { App } from 'vue'
import AtGrid from './src/index.vue'

export default (app: App): void => {
  app.component(AtGrid.name, AtGrid)
}

export {
  AtGrid
}
