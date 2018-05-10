import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loadingExploreView: false,
    loadingEventsList: false,
    focusedEvent: null,
    mapZoom: 13,
    mapCenter: { lat: 45.252467, lng: 19.827957 },
    interests: [],
    checkedInterests: [],
    eventsInFocus: [],
    user: {},
    token: null,
    signedIn: false
  },
  mutations: {
    refreshInterests(state) {
      axios.get('/interests/').then(response => {
        state.interests = response.data
      }).catch(err => {
        console.log(err)
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
      axios.get(`/events/?interests=${payload}`).then(response => {
        state.eventsInFocus = response.data
        state.eventsInFocus.sort((a,b) => {
          return b.rating.sum - a.rating.sum
        })
        this.commit('changeLoadingExploreView', false)
      }).catch(err => {
        console.log(err)
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
    changeLoadingExploreView (state, payload) {
      state.loadingExploreView = payload
    },
    addToEventsInFocus (state, payload) {
      state.loadingEventsList = true
      axios.get(`/events/?interests=${payload}`).then(response => {
        state.eventsInFocus = state.eventsInFocus.concat(response.data)
        state.eventsInFocus.sort((a,b) => {
          return b.rating.sum - a.rating.sum
        })
        state.loadingEventsList = false
      }).catch(err => {
        console.log(err)
      })
    },
    focusEvent(state, payload) {
      state.focusedEvent = payload
    },
    unfocusEvent(state) {
      state.focusedEvent = null
      state.mapZoom = 13
    },
    setMapZoom(state, payload) {
      state.mapZoom = payload
    },
    tryLogin(state, payload) {
      axios.post('/auth/login', payload).then(response => {
        state.token = response.data.token
        state.user = response.data.user
        state.signedIn = true
      }).catch(err => {
        console.log('greska: ' + err)
      })
    },
    logout(state) {
      state.token = null
      state.user = null
      state.signedIn = false
    }

  }
})

export default store