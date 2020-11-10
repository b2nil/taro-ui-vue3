import { App } from 'vue'
import AtCurtain from './src/index.vue'
export default (app: App): void => {
  app.component(AtCurtain.name, AtCurtain)
}
