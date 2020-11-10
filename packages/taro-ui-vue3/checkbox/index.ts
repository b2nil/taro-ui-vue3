import { App } from 'vue'
import AtCheckbox from './src/index.vue'

export default (app: App): void => {
  app.component(AtCheckbox.name, AtCheckbox)
}

export {
  AtCheckbox
}
