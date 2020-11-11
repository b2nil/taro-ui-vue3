import { App } from 'vue'
import AtTimeline from './src/index.vue'

export default (app: App): void => {
  app.component(AtTimeline.name, AtTimeline)
}

export {
  AtTimeline
}
