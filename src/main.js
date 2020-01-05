import Vue from 'vue'
import App from './App.vue'
import L from 'leaflet';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)


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
