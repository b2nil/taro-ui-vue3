import { App } from 'vue'
import AtTabs from './src/index.vue'
import AtTabsPane from './src/pane/index.vue'

export default (app: App): void => {
  app.component(AtTabs.name, AtTabs)
  app.component(AtTabsPane.name, AtTabsPane)
}

export {
  AtTabs,
  AtTabsPane
}
