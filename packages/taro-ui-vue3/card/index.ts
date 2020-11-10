import { App } from 'vue'
import AtCard from './src/index.vue'

export default (app: App): void => {
  app.component(AtCard.name, AtCard)
}

export {
  AtCard
}