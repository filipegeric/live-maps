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
Vue.config.devtools = true
axios.defaults.baseURL = 'http://192.168.0.14:8000'

Vue.filter('addS', value => {
  return value + 's'
})

Vue.filter('capitalize', value => {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
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
      state.eventsInFocus.forEach(el => {
        if(!el.rating.sum) {
          el.rating.sum = 0
        }
      })
      state.eventsInFocus.sort((a,b) => {
        return b.rating.sum - a.rating.sum
      })
    },
    clearEventsInFocus (state, payload) {
      if(!payload) {
        state.eventsInFocus = []
      } else {
        state.eventsInFocus = state.eventsInFocus.filter(el => {
          return el.interest != payload
        })
      }
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
