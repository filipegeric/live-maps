<template>
  <div id="app">

    <transition appear appear-active-class="animated fadeInDown" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <navigation-bar v-if="$route.path != '/'" :openSignInModal="openSignInModal" :openRegisterModal="openRegisterModal" />
    </transition>

    <transition appear appear-active-class="animated fadeIn" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view :openSignInModal="openSignInModal" :openRegisterModal="openRegisterModal"/>
    </transition>

    <modal-sign-in ref="modalSignIn" :close="closeSignInModal"  v-if="!$store.state.signedIn" />
    <modal-register ref="modalRegister" :close="closeRegisterModal" v-if="!$store.state.signedIn" />
  </div>
</template>

<script>
import NavigationBar from './components/includes/NavigationBar'
import ModalSignIn from './components/modals/ModalSignIn'
import ModalRegister from './components/modals/ModalRegister'

export default {
  components: {
    NavigationBar,
    ModalSignIn,
    ModalRegister
  },
  beforeCreate () {
    this.$store.commit('refreshInterests')
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
