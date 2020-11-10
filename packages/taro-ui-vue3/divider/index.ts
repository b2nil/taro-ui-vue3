import { App } from 'vue'
import AtDivider from './src/index.vue'

export default (app: App): void => {
  app.component(AtDivider.name, AtDivider)
}

export {
  AtDivider
}