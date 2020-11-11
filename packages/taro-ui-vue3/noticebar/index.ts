import { App } from 'vue'
import AtNoticebar from './src/index.vue'

export default (app: App): void => {
  app.component(AtNoticebar.name, AtNoticebar)
}

export {
  AtNoticebar
}
