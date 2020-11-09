import { App } from 'vue'
import AtLoading from './src/index.vue'

export default (app: App): void => {
  app.component(AtLoading.name, AtLoading)
}

export {
  AtLoading
}
