<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <div id="i-mobile" class="navbar-item">
        <router-link to="/"><i @click="handleBack" class="fas fa-angle-left"></i></router-link>
      </div>
      
      <div id="logo-mobile"></div>
      <a @click.prevent="handleBurgerToggle" id="burger" role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu ">
      <div class="navbar-start">
        <div id="create-new-button" v-if="$store.state.signedIn" class="navbar-item">
          <p class="control">
            <a class="button is-primary">
              <span>Create new event</span>
            </a>
          </p>
        </div>
        <div v-else class="navbar-item " style="padding-right: 0px;">
          <p class="control">
            <router-link to="/"><i id="i-widescreen" @click="handleBack" class="fas fa-angle-left"></i></router-link>
          </p>
        </div>
      </div>
      <div id="logo"></div>
      <div class="navbar-end">
        
        <div v-if="$store.state.signedIn" id="user-name" class="navbar-item">
          <span>Filip Egeric |</span>
        </div>
        <div v-if="$store.state.signedIn" class="navbar-item" style="float: right;">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary">
                <span>Profile</span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary">
                <span>Logout</span>
              </a>
            </p>
          </div>
        </div>
        
        <div v-if="!$store.state.signedIn" class="navbar-item" style="padding-left: 50px; float: right;">
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

      </div>
    </div>

  </nav>
</template>

<script>
export default {
  methods: {
    openSignInModal () {
      document.getElementById('modal-sign-in').classList.add('is-active')
      document.querySelector('#modal-sign-in input').focus()
    },
    openRegisterModal () {
      document.getElementById('modal-register').classList.add('is-active')
      document.querySelector('#modal-register input').focus()
    },
    handleBack () {
      this.$store.commit('changeLoadingExploreView')
      this.$store.commit('clearEventsInFocus')
      this.$store.commit('clearCheckedInterests')
    },
    handleBurgerToggle () {
      var id = document.getElementById('burger').dataset.target
      var target = document.getElementById(id)

      document.getElementById('burger').classList.toggle('is-active')
      target.classList.toggle('is-active')
      
    }
  }
}
</script>

<style scoped>
@import url('https://use.fontawesome.com/releases/v5.0.9/css/all.css');

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
  background: url('../assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
}

#logo-mobile {
  width: 260px;
  height: 68px;
  margin: auto;
  margin-right: 0px;
  margin-top: 5px;
  background: url('../assets/img/logo.png');
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
