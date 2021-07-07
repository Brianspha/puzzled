import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

Vue.config.productionTip = false
import VueTextTransition from 'vue-text-transition'
Vue.component('vue-text-transition', VueTextTransition)
new Vue({
  vuetify,
  store,
  router:router,
  render: h => h(App)
}).$mount('#app')
