import Layout from "./Layout.vue"
import NotFound from "./NotFound.vue"
import IconList from "./components/IconList.vue"
import QrcodeVue from "./components/QrcodeVue"
import "./style/index.scss"
import "./style/code.scss"

export default {
  Layout,
  NotFound,
  enhancedApp({ app, router, siteData }) {
    app.component(IconList.name, IconList)
    app.component(QrcodeVue.name, QrcodeVue)
  }
}