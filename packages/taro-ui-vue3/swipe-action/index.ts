import { App } from 'vue'
import AtSwipeAction from './src/index.vue'

export default (app: App): void => {
  app.component(AtSwipeAction.name, AtSwipeAction)
}

export {
  AtSwipeAction
}
