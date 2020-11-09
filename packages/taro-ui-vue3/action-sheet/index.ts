import { App } from 'vue'
import AtActionSheet from './src/index.vue'
import AtActionSheetItem from './src/body/item/index.vue'

export default (app: App): void => {
  app.component(AtActionSheet.name, AtActionSheet)
  app.component(AtActionSheetItem.name, AtActionSheetItem)
}

export {
  AtActionSheet,
  AtActionSheetItem
}
