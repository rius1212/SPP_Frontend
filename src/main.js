import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';

Vue.use(VueResource)

Vue.config.productionTip = false


Vue.prototype.$apiUrl = 'http://localhost:8000/api/';

new Vue({
  router,
  vuetify,
  render: h => h(App),
  components: { App }
}).$mount('#app')
