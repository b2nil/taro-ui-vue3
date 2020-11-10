import { App } from 'vue'
import AtFab from './src/index.vue'

export default (app: App): void => {
  app.component(AtFab.name, AtFab)
}

export {
  AtFab
}
