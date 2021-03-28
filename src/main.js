import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import locale from 'element-ui/lib/locale/lang/vi'
import moment from "moment";

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
