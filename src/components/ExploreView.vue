<template>
  <div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="loadingExploreView" id="loading-gif">
        <img src="../assets/img/loading-gif.gif" alt="Loading...">
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="!loadingExploreView" id="main" class="columns">
        <events-list ref="eventsList" :cols="focusedEvent ? 6 : 5" />
        <google-map ref="googleMap" :cols="focusedEvent ? 6 : 7" />
      </div>
    </transition>
  </div>
  
</template>

<script>
import EventsList from './explore-view/EventsList'
import GoogleMap from './explore-view/GoogleMap'
import { mapGetters } from 'vuex' 

export default {
  props: {
    openSignInModal: {
      type: Function,
      required: false
    },
    openRegisterModal: {
      type: Function,
      required: false
    }
  },
  components: {
    EventsList,
    GoogleMap
  },
  computed: {
    ...mapGetters([
      'eventsInFocus',
      'interests',
      'loadingExploreView',
      'focusedEvent'
    ])
  },
  mounted () {
    if(this.eventsInFocus.length == 0 && this.interests.length == 0) {
      this.$store.commit('changeLoadingExploreView', true)
      // This should be fixed somehow
    }
  }
}
</script>

<style scoped>
#main {
  padding-top: 80px;
  height: 100vh;
  display: flex;
}

#loading-gif {
  margin-left: auto;
  margin-right: auto;
  width: 190px;
  display: block;
  position: absolute;
  z-index: -2;
  left: 0;
  right: 0;
  padding-top: 120px;
}

@media (max-width: 768px) {
  #main {
    flex-direction: column-reverse;
    height: auto;
  }
}
</style>
