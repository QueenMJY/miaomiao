import Vue from 'vue'
import App from './App.vue' //引入app组件
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios=axios;

Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});
import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);
//在生产环境当中是否设置允许提示警告
Vue.config.productionTip = false
//请求拦截
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
