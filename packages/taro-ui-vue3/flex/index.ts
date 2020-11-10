import { App } from 'vue'
import AtFlex from './src/index.vue'
import AtFlexItem from './src/item/index.vue'

export default (app: App): void => {
  app.component(AtFlex.name, AtFlex)
  app.component(AtFlexItem.name, AtFlexItem)
}

export {
  AtFlex,
  AtFlexItem
}
