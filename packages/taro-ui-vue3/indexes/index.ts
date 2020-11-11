import { App } from 'vue'
import AtIndexes from './src/index.vue'

export default (app: App): void => {
  app.component(AtIndexes.name, AtIndexes)
}

export {
  AtIndexes
}
