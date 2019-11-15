import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import L from 'leaflet';
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
