<template>
  <div id="welcome" class="container">

    <div class="columns">
      <div class="column is-half is-offset-one-quarter has-text-centered">
        <img src="../assets/img/logo.png" alt="LOGO">
      </div>
    </div>

    <transition leave-active-class="animated fadeOut">
      <div v-if="!signedIn" class="columns">
        <div id="reg-login-col" class="column is-2 is-offset-5 has-text-centered">
          <a @click.prevent="openRegisterModal">REGISTER</a>
          <a @click.prevent="openSignInModal">LOGIN</a>
        </div>
      </div>
      <div v-else class="column is-2 is-offset-5 has-text-centered">
        <a @click.prevent="$store.commit('logout')" >LOGOUT</a>
      </div>
    </transition>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="loading" id="loading-gif">
        <img src="../assets/img/loading-gif.gif" alt="Loading...">
      </div>
    </transition>

    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOut">
      <div v-if="!loading" style="margin-bottom: 2em;">
        <div class="columns has-text-centered" style="margin-bottom: 0;">
          <h2 class="column is-4 is-offset-4">Select your interests
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <span v-if="signedIn">, {{ user.first_name }}</span>
            </transition>
          </h2>
        </div>
        
        <interests-checkbox />
      </div>
    </transition>

  </div>
</template>

<script>
import InterestsCheckbox from './welcome-view/InterestsCheckbox'
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
    InterestsCheckbox
  },
  computed: {
    loading () {
      return this.interests.length == 0
    },
    ...mapGetters([
      'signedIn',
      'user',
      'interests'
    ])
  },
  mounted() {
    this.$store.dispatch('refreshInterests')
  }
}
</script>

<style scoped>
h2 {
  font-size: 30px;
  padding: 0;
}

#welcome {
  padding-top: 0%;
}

#welcome > div {
  margin-bottom: 0;
}

#welcome > div > div {
  padding-bottom: 0;
}

#reg-login-col {
  padding: 2px;
  padding-top: 0;
}

a {
  color: #2da8ee;
  font-weight: 700;
  font-size: 19px;
  transition: all 0.5s;
}

a:hover {
  color: #096092;
}

a:nth-child(1) {
  margin-right: 5px;
}

a:nth-child(2) {
  margin-left: 5px;
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
}
</style>
