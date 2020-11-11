import { App } from 'vue'
import AtToast from './src/index.vue'

export default (app: App): void => {
  app.component(AtToast.name, AtToast)
}

export {
  AtToast
}
