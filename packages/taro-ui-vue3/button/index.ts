import { App } from 'vue'
import AtButton from './src/index.vue'

export default (app: App): void => {
  app.component(AtButton.name, AtButton)
}

export {
  AtButton
}
