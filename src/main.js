// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import './filters.js'
import store from './vuex/store'

Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAr5DB-rqVoFnLtrZvQXxOnKdVL7lv9DXY'
  }
})
Vue.config.productionTip = false
Vue.config.devtools = true
axios.defaults.baseURL = 'http://192.168.0.14:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
