<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <div id="i-mobile" class="navbar-item">
        <router-link to="/"><i @click="handleBack" class="fas fa-angle-left"></i></router-link>
      </div>
      
      <div id="logo-mobile"></div>
      <a ref="burger" @click.prevent="handleBurgerToggle" id="burger" role="button" class="navbar-burger" :class="{'is-active': burgerIsActive}" data-target="navMenu" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu " :class="{'is-active': burgerIsActive}">
      <div class="navbar-start">
        <div class="navbar-item " style="padding-right: 0px;">
          <p class="control">
            <router-link to="/"><i id="i-widescreen" @click="handleBack" class="fas fa-angle-left"></i></router-link>
          </p>
        </div>
        <transition enter-active-class="animated fadeIn">
          <div id="create-new-button" v-if="signedIn" class="navbar-item">
            <p class="control">
              <a @click.prevent="openCreateEventModal" class="button is-primary">
                <span>Create new event</span>
              </a>
            </p>
          </div>
        </transition>
        
      </div>
      <div id="logo"></div>
      <div class="navbar-end">
        
        <transition enter-active-class="animated fadeIn" >
          <div v-if="signedIn" id="user-name" class="navbar-item">
            <span>{{ user.first_name + ' ' + user.last_name }} |</span>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn" >
          <div v-if="signedIn" class="navbar-item" style="float: right;">
            <div class="field is-grouped">
              <p class="control">
                <a @click.prevent="openProfileModal" class="button is-primary">
                  <span>Profile</span>
                </a>
              </p>
              <p class="control">
                <a @click.prevent="handleLogout" class="button is-primary">
                  <span>Logout</span>
                </a>
              </p>
            </div>
          </div>
        </transition>
        
        <transition enter-active-class="animated fadeIn" >
          <div v-if="!signedIn" class="navbar-item" style="padding-left: 50px; float: right;">
            <div class="field is-grouped">
              <p class="control">
                <a @click.prevent="openRegisterModal" class="button is-primary">
                  <span>Register</span>
                </a>
              </p>
              <p class="control">
                <a @click.prevent="openSignInModal" class="button is-primary">
                  <span>Login</span>
                </a>
              </p>
            </div>
          </div>
        </transition>

      </div>
    </div>

  </nav>
</template>

<script>
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
    },
    openProfileModal: {
      type: Function,
      required: false
    },
    openCreateEventModal: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      burgerIsActive: false
    }
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user'
    ])
  },
  methods: {
    handleBack () {
      this.$store.commit('clearEventsInFocus')
      this.$store.commit('clearCheckedInterests')
      this.$store.commit('unfocusEvent')
    },
    handleBurgerToggle () {
      this.burgerIsActive = !this.burgerIsActive;
    },
    handleLogout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #fff;
  height: 80px;
  border-bottom: solid 2px #31aaee;
}

#logo {
  width: 260px;
  height: 68px;
  margin: auto;
  margin-right: 5px;
  margin-top: 5px;
  background: url('../../assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
}

#logo-mobile {
  width: 260px;
  height: 68px;
  margin: auto;
  margin-right: 0px;
  margin-top: 5px;
  background: url('../../assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  display: none;
}

.button.is-primary {
  background-color: #31aaee;
}

.button.is-primary:hover {
  background-color: #0b9cf0;
}

#user-name {
  padding-right: 0;
}

.navbar-burger {
  height: 80px;
}

i {
  font-size: 36px;
  color: #31aaee;
  transition: all .25s;
}

i:hover {
  color: #0b9cf0;
  transform: scale(1.2);
}

#i-mobile {
  display: none;
}

@media (max-width: 1023px) {
  #logo-mobile {
    display: inline-block;
    margin-left: 5px;
  }

  #i-mobile {
    display: flex;
  }

  #logo {
    display: none;
  }

  #i-widescreen {
    display: none;
  }

  #user-name {
    display: none;
  }

  #create-new-button {
    float: right;
  }

}
</style>
