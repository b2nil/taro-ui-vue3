import { App } from 'vue'
import AtAccordion from './src/index.vue'
export default (app: App): void => {
  app.component(AtAccordion.name, AtAccordion)
}

export {
  AtAccordion
}
