import { App } from 'vue'
import AtInputNumber from './src/index.vue'

export default (app: App): void => {
  app.component(AtInputNumber.name, AtInputNumber)
}

export {
  AtInputNumber
}
