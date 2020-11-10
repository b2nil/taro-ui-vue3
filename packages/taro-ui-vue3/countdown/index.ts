import { App } from 'vue'
import AtCountdown from './src/index.vue'

export default (app: App): void => {
  app.component(AtCountdown.name, AtCountdown)
}

export {
  AtCountdown
}
