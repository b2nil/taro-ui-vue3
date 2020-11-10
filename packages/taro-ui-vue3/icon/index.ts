import { App } from 'vue'
import AtIcon from './src/index.vue'

export default (app: App): void => {
  app.component(AtIcon.name, AtIcon)
}

export {
  AtIcon
}
