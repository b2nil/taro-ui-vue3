import { App } from 'vue'
import AtAvatar from './src/index.vue'
export default (app: App): void => {
  app.component(AtAvatar.name, AtAvatar)
}

export {
  AtAvatar
}
