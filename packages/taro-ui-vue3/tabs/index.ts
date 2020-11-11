import { App } from 'vue'
import AtTabs from './src/index.vue'

export default (app: App): void => {
  app.component(AtTabs.name, AtTabs)
}

export {
  AtTabs
}
