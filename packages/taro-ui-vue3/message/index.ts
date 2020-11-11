import { App } from 'vue'
import AtMessage from './src/index.vue'

export default (app: App): void => {
  app.component(AtMessage.name, AtMessage)
}

export {
  AtMessage
}
