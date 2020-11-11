import { App } from 'vue'
import AtSwitch from './src/index.vue'

export default (app: App): void => {
  app.component(AtSwitch.name, AtSwitch)
}

export {
  AtSwitch
}
