<template>
  <div id="app">

    <vue-progress-bar></vue-progress-bar>

    <transition appear appear-active-class="animated fadeInDown" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <navigation-bar v-if="$route.path != '/'" 
        :openSignInModal="openSignInModal" 
        :openRegisterModal="openRegisterModal" 
        :openProfileModal="openProfileModal"
        :openCreateEventModal="openCreateEventModal" />
    </transition>

    <transition appear appear-active-class="animated fadeIn" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view :openSignInModal="openSignInModal" :openRegisterModal="openRegisterModal"/>
    </transition>

    <transition leave-active-class="animated fadeOut">
      <modal-sign-in ref="modalSignIn" :close="closeSignInModal"  v-if="!signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <modal-register ref="modalRegister" :close="closeRegisterModal" v-if="!signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <modal-profile ref="modalProfile" :user="user" :close="closeProfileModal" v-if="signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <modal-create ref="modalCreate" :close="closeCreateEventModal" v-if="signedIn" />
    </transition>
    
  </div> 
</template>

<script>
import NavigationBar from './components/includes/NavigationBar'
import ModalSignIn from './components/modals/ModalSignIn'
import ModalRegister from './components/modals/ModalRegister'
import ModalProfile from './components/modals/ModalProfile'
import ModalCreate from './components/modals/ModalCreate'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavigationBar,
    ModalSignIn,
    ModalRegister,
    ModalProfile,
    ModalCreate
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user'
    ])
  },
  beforeCreate () {
    if(window.innerWidth < 769) {
      this.$store.commit('setMapZoom', 12)
    }
  },
  created () {
    this.$Progress.start()

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })

    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  mounted () {
    if(this.$cookie.get('token')) {
      this.$store.dispatch('getUser', this.$cookie.get('token'))
    }
    this.$Progress.finish()
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
    },
    openCreateEventModal() {
      this.$refs.modalCreate.isActive = true
    },
    closeCreateEventModal() {
      this.$refs.modalCreate.isActive = false
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
