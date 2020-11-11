import { App } from 'vue'
import AtPagination from './src/index.vue'

export default (app: App): void => {
  app.component(AtPagination.name, AtPagination)
}

export {
  AtPagination
}
