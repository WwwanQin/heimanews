import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import axios from 'axios'
const baseUrl = `http://localhost:3000`;
axios.defaults.baseURL = baseUrl;
Vue.prototype.$axios = axios
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')