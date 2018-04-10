<template>
  <div id="app">

    <transition appear appear-active-class="animated fadeInDown" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <navigation-bar v-if="$route.path != '/'" />
    </transition>

    <transition appear appear-active-class="animated fadeIn" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view/>
    </transition>

    <modal-sign-in v-if="!$store.state.signedIn" />
    <modal-register v-if="!$store.state.signedIn" />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar'
import ModalSignIn from './components/ModalSignIn'
import ModalRegister from './components/ModalRegister'

export default {
  components: {
    NavigationBar,
    ModalSignIn,
    ModalRegister
  }
}
</script>

<style>
/* These styles are applied globally */
@import '../node_modules/bulma/css/bulma.css';

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

.columns {
  margin: 0;
}

</style>
