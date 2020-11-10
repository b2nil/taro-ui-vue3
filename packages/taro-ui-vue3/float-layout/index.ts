import { App } from 'vue'
import AtFloatLayout from './src/index.vue'

export default (app: App): void => {
  app.component(AtFloatLayout.name, AtFloatLayout)
}

export {
  AtFloatLayout
}
