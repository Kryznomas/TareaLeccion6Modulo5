import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import store from './store'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
