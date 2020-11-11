import { App } from 'vue'
import AtRadio from './src/index.vue'

export default (app: App): void => {
  app.component(AtRadio.name, AtRadio)
}

export {
  AtRadio
}
