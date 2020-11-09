import { App } from 'vue'
import AtActivityIndicator from './src/index.vue'

export default (app: App): void => {
  app.component(AtActivityIndicator.name, AtActivityIndicator)
}

export {
  AtActivityIndicator
}
