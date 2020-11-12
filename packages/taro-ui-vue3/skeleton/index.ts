import { App } from 'vue'
import AtSkeleton from './src/index.vue'

export default (app: App): void => {
  app.component(AtSkeleton.name, AtSkeleton)
}

export {
  AtSkeleton
}
