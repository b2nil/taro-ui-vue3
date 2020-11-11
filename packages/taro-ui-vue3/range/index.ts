import { App } from 'vue'
import AtRange from './src/index.vue'

export default (app: App): void => {
  app.component(AtRange.name, AtRange)
}

export {
  AtRange
}
