import Vue from 'vue'
import Vant, { Toast } from 'vant'
import App from './App.vue'
import router from './router'
import axios from 'axios'
const baseUrl = `http://111.230.152.88:3000`;
var app ;
axios.defaults.baseURL = baseUrl;
Vue.prototype.$axios = axios
Vue.use(Vant)
Vue.config.productionTip = false
// 设置axios的拦截器
axios.interceptors.response.use((config)=>{
  return config;
},error => {
  let {status,data:{message}} = error.response;
  if(status === 403){
    Toast.fail('请先登录');  
  }else{
    Toast.fail(message);
  }
  return Promise.reject(error);
})
app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')