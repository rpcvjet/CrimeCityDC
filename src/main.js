import Vue from 'vue'
import App from './App.vue'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import VueGtag from "vue-gtag";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//bootstrap stuff
import { BootstrapVue, BIconInfo } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

Vue.component('BIconInfo', BIconInfo)
Vue.use(BootstrapVue)
Vue.use(VueGtag, {
  config: { id: "UA-162799993-1" }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
