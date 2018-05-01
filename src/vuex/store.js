import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loadingExploreView: true,
    loadingEventsList: false,
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
    }
  }
})

export default store;