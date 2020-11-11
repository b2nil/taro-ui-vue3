import { App } from 'vue'
import AtTag from './src/index.vue'

export default (app: App): void => {
  app.component(AtTag.name, AtTag)
}

export {
  AtTag
}
