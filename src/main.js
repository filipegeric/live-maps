// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
'use strict'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import './filters.js'
import store from './vuex/store'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#2da8ee',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '1.2s',
    opacity: '1.5s',
    termination: 1500
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAr5DB-rqVoFnLtrZvQXxOnKdVL7lv9DXY'
  }
})
Vue.config.productionTip = false
Vue.config.devtools = true
axios.defaults.baseURL = 'http://localhost:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
