import { App } from 'vue'
import AtProgress from './src/index.vue'

export default (app: App): void => {
  app.component(AtProgress.name, AtProgress)
}

export {
  AtProgress
}
