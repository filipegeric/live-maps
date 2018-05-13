<template>
  <div id="app">

    <transition appear appear-active-class="animated fadeInDown" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <navigation-bar v-if="$route.path != '/'" :openSignInModal="openSignInModal" :openRegisterModal="openRegisterModal" :openProfileModal="openProfileModal" />
    </transition>

    <transition appear appear-active-class="animated fadeIn" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view :openSignInModal="openSignInModal" :openRegisterModal="openRegisterModal"/>
    </transition>

    <transition leave-active-class="animated fadeOut">
      <modal-sign-in ref="modalSignIn" :close="closeSignInModal"  v-if="!$store.state.signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <modal-register ref="modalRegister" :close="closeRegisterModal" v-if="!$store.state.signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <modal-profile ref="modalProfile" :user="$store.state.user" :close="closeProfileModal" v-if="$store.state.signedIn" />
    </transition>
    
  </div> 
</template>

<script>
import NavigationBar from './components/includes/NavigationBar'
import ModalSignIn from './components/modals/ModalSignIn'
import ModalRegister from './components/modals/ModalRegister'
import ModalProfile from './components/modals/ModalProfile'

export default {
  components: {
    NavigationBar,
    ModalSignIn,
    ModalRegister,
    ModalProfile
  },
  beforeCreate () {
    this.$store.commit('refreshInterests')
    if(window.innerWidth < 769) {
      this.$store.commit('setMapZoom', 12)
    }
  },
  mounted () {
    if(this.$cookie.get('token')) {
      this.$store.commit('getUser', this.$cookie.get('token'))
    }
  },
  methods: {
    openSignInModal() {
      this.$refs.modalSignIn.isActive = true
    },
    closeSignInModal() {
      this.$refs.modalSignIn.isActive = false
    },
    openRegisterModal() {
      this.$refs.modalRegister.isActive = true
    },
    closeRegisterModal() {
      this.$refs.modalRegister.isActive = false
    },
    openProfileModal() {
      this.$refs.modalProfile.isActive = true
    },
    closeProfileModal() {
      this.$refs.modalProfile.isActive = false
    }
  }
}
</script>

<style>
/* These styles are applied globally */
@import '../node_modules/bulma/css/bulma.css';
@import url('https://use.fontawesome.com/releases/v5.0.9/css/all.css');

html {
  height: 100%;
  box-sizing: border-box;
}

#app {
  background-image: url('./assets/img/pattern.svg') !important;
  background-attachment: scroll; 
  position: relative;
  height: 100vh !important;
  overflow-y: auto;
  margin: 0 !important;
}

body::-webkit-scrollbar {
  display: none;
}

#app::-webkit-scrollbar {
  display: none;
}

.columns {
  margin: 0;
}

</style>
