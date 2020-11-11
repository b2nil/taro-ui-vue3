import { App } from 'vue'
import AtSegmentedControl from './src/index.vue'

export default (app: App): void => {
  app.component(AtSegmentedControl.name, AtSegmentedControl)
}

export {
  AtSegmentedControl
}
