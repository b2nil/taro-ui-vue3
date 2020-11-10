import { App } from 'vue'
import AtInput from './src/index.vue'

export default (app: App): void => {
  app.component(AtInput.name, AtInput)
}

export {
  AtInput
}
