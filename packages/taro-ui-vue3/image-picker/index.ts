import { App } from 'vue'
import AtImagePicker from './src/index.vue'

export default (app: App): void => {
  app.component(AtImagePicker.name, AtImagePicker)
}

export {
  AtImagePicker
}
