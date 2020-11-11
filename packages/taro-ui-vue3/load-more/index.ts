import { App } from 'vue'
import AtLoadMore from './src/index.vue'

export default (app: App): void => {
  app.component(AtLoadMore.name, AtLoadMore)
}

export {
  AtLoadMore
}
