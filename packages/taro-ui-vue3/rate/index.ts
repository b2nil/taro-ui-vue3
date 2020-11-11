import { App } from 'vue'
import AtRate from './src/index.vue'

export default (app: App): void => {
  app.component(AtRate.name, AtRate)
}

export {
  AtRate
}
