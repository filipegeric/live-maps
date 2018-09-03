import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import { User, MyEvent } from '@/types.js';

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
    signedIn: false,
    loginError: false,
    registerErrors: null
  },
  getters: {
    loadingExploreView(state) {
      return state.loadingExploreView
    },
    loadingEventsList(state) {
      return state.loadingEventsList
    },
    focusedEvent(state) {
      return state.focusedEvent
    },
    mapZoom(state) {
      return state.mapZoom
    },
    mapCenter(state) {
      return state.mapCenter
    },
    interests(state) {
      return state.interests
    },
    checkedInterests(state) {
      return state.checkedInterests
    },
    eventsInFocus(state) {
      return state.eventsInFocus.map(el => new MyEvent(el.address, el.body, el.created_at, el.created_at_ts,
        el.deleted, el.end_at, el.end_at_ts, el.hashtag, el.id, el.image, el.interest, el.lat, el.long,
        el.permanent, el.rating, el.start_at, el.start_at_ts, el.title));
    },
    user(state) {
      if(state.user === null) return state.user;
      return new User(state.user.email, state.user.first_name, state.user.id, state.user.last_name, state.user.username);
    },
    token(state) {
      return state.token
    },
    signedIn(state) {
      return state.signedIn
    },
    loginError(state) {
      return state.loginError
    },
    registerErrors(state) {
      return state.registerErrors
    }
  },
  mutations: {
    refreshInterests(state, payload) {
      state.interests = payload
    },
    clearInterests(state) {
      state.interests = []
    },
    refreshCheckedInterests(state, payload) {
      state.checkedInterests = payload
    },
    clearCheckedInterests(state) {
      state.checkedInterests = []
    },
    refreshEventsInFocus(state, payload) {
      state.eventsInFocus = payload
      state.eventsInFocus.sort((a, b) => {
        return b.rating.sum - a.rating.sum
      })
    },
    clearEventsInFocus(state, payload) {
      if (!payload) {
        state.eventsInFocus = []
      } else {
        state.eventsInFocus = state.eventsInFocus.filter(el => {
          return el.interest != payload
        })
      }
    },
    changeLoadingExploreView(state, payload) {
      state.loadingExploreView = payload
    },
    addToEventsInFocus(state, payload) {
      state.loadingEventsList = true
      state.eventsInFocus = state.eventsInFocus.concat(payload)
      state.eventsInFocus.sort((a, b) => {
        return b.rating.sum - a.rating.sum
      })
      state.loadingEventsList = false
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
    login(state, payload) {
      state.token = payload.token
      state.user = payload.user
      state.signedIn = true
      VueCookie.set('token', payload.token, 1)
    },
    logout(state) {
      state.token = null
      state.user = null
      state.signedIn = false
      VueCookie.delete('token')
    },
    setUser(state, payload) {
      state.user = payload.user
      state.token = payload.token
      state.signedIn = true
    },
    changeLoginError(state, payload) {
      state.loginError = payload
    },
    register(state, payload) {
      state.token = payload
    },
    changeRegisterErrors(state, payload) {
      state.registerErrors = payload
    }
  },
  actions: {
    refreshInterests({ commit }) {
      axios.get('/interests/').then(response => {
        commit('refreshInterests', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    refreshEventsInFocus({ commit }, payload) {
      axios.get(`/events/?interests=${payload}`).then(response => {
        commit('refreshEventsInFocus', response.data)
        commit('changeLoadingExploreView', false)
      }).catch(err => {
        console.log(err)
      })
    },
    addToEventsInFocus({ commit }, payload) {
      axios.get(`/events/?interests=${payload}`).then(response => {
        commit('addToEventsInFocus', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    tryLogin({ commit, state }, payload) {
      axios.post('/auth/login', payload).then(response => {
        commit('login', response.data)
      }).catch(err => {
        console.log('greska: ' + err)
        state.loginError = true
      })
    },
    getUser({ commit }, payload) {
      axios.post('/user/', { token: payload }).then(response => {
        commit('setUser', { user: response.data, token: payload })
      }).catch(err => {
        console.log(err)
      })
    },
    tryRegister({ commit, state, dispatch }, payload) {
      axios.post('/auth/register/', payload).then(response => {
        commit('register', response.data.token)
        dispatch('getUser', response.data.token)
      }).catch(err => {
        console.log(err.response.data.message)
        state.registerErrors = err.response.data.message
      })
    }
  }
})

export default store