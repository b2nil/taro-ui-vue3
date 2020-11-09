import { App } from 'vue'
import AtBadge from './src/index.vue'

export default (app: App): void => {
  app.component(AtBadge.name, AtBadge)
}

export {
  AtBadge
}
