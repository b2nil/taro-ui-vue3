import { App } from 'vue'
import AtSlider from './src/index.vue'

export default (app: App): void => {
  app.component(AtSlider.name, AtSlider)
}

export {
  AtSlider
}
