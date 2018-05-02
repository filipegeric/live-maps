<template>
  <div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="$store.state.loadingExploreView" id="loading-gif">
        <img src="../assets/img/loading-gif.gif" alt="Loading...">
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="!$store.state.loadingExploreView" id="main" class="columns">
        <events-list />
        <google-map />
      </div>
    </transition>
  </div>
  
</template>

<script>
import EventsList from './explore-view/EventsList'
import GoogleMap from './explore-view/GoogleMap'

export default {
  props: ['openSignInModal', 'openRegisterModal'],
  components: {
    EventsList,
    GoogleMap
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
