import { App } from 'vue'
import AtSteps from './src/index.vue'

export default (app: App): void => {
  app.component(AtSteps.name, AtSteps)
}

export {
  AtSteps
}
