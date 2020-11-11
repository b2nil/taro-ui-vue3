import { App } from 'vue'
import AtModal from './src/index.vue'
import AtModalAction from './src/action/index.vue'
import AtModalContent from './src/content/index.vue'
import AtModalHeader from './src/header/index.vue'

export default (app: App): void => {
  app.component(AtModal.name, AtModal)
  app.component(AtModalHeader.name, AtModalHeader)
  app.component(AtModalAction.name, AtModalAction)
  app.component(AtModalContent.name, AtModalContent)
}

export {
  AtModal,
  AtModalHeader,
  AtModalAction,
  AtModalContent
}
