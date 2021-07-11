import Vue from 'vue';
import Antd from 'ant-design-vue'
import axios from "axios";
import VueAxios from "vue-axios";
import 'ant-design-vue/dist/antd.css';
import App from './App';

Vue.use(Antd,VueAxios, axios);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');
