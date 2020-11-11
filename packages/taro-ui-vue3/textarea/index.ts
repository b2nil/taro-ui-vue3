import { App } from 'vue'
import AtTextarea from './src/index.vue'

export default (app: App): void => {
  app.component(AtTextarea.name, AtTextarea)
}

export {
  AtTextarea
}
