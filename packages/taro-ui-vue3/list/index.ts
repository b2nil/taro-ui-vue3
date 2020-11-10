import { App } from 'vue'
import AtList from './src/index.vue'
import AtListItem from './src/item/index.vue'

export default (app: App): void => {
  app.component(AtList.name, AtList)
  app.component(AtListItem.name, AtListItem)
}

export {
  AtList,
  AtListItem
}
