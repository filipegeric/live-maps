<template>
  <div @keyup.esc="close" id="modal-sign-in" class="modal animated fadeIn" :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent="handleSubmit">
        <section class="modal-card-body">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
            <div v-if="error" class="notification is-danger">
              <button @click.prevent="$store.commit('changeLoginError', false)" class="delete"></button>
              Please check your credentials!
            </div>
          </transition>
          <div class="field">
            <p class="control">
              <input ref="usernameInput" v-model="credentials.username" class="input" type="text" placeholder="Username" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input v-model="credentials.password" class="input" type="password" placeholder="Password" required>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Sign in</button>
          <button @click.prevent="close" class="button" type="reset">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.loginError
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('tryLogin', this.credentials)
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.usernameInput.focus() 
        })
      }
    }
  }
}
</script>

<style scoped>
#modal-sign-in {
  transition: all 1.5s;
}
  
.button[type="reset"] {
  margin-left: auto;
}

.modal-card {
  width: 520px;
}

.is-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
</style>
