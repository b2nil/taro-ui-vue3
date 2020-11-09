import { App } from 'vue'
import AtCalendar from './src/index.vue'

export default (app: App): void => {
  app.component(AtCalendar.name, AtCalendar)
}

export {
  AtCalendar
}
