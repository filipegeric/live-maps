// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://192.168.0.14:8000'

Vue.filter('addS', value => {
  return value + 's'
})

const store = new Vuex.Store({
  state: {
    loadingExploreView: true,
    interests: [],
    checkedInterests: [],
    eventsInFocus: [],
    user: {},
    signedIn: false
  },
  mutations: {
    refreshInterests(state) {
      axios.get('/interests/').then(response => {
        state.interests = response.data
      }).catch(err => {
        console.log(err);
      })
    },
    clearInterests(state) {
      state.interests = []
    },
    refreshCheckedInterests (state, payload) {
      state.checkedInterests = payload
    },
    clearCheckedInterests (state) {
      state.checkedInterests = []
    },
    refreshEventsInFocus (state, payload) {
      state.eventsInFocus = payload
    },
    clearEventsInFocus (state) {
      state.eventsInFocus = []
    },
    changeLoadingExploreView (state) {
      state.loadingExploreView = !state.loadingExploreView
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
