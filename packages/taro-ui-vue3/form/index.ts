import { App } from 'vue'
import AtForm from './src/index.vue'

export default (app: App): void => {
  app.component(AtForm.name, AtForm)
}

export {
  AtForm
}
