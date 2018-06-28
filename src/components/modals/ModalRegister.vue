<template>
  <div @keyup.esc="close" id="modal-register" class="modal animated fadeIn " :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent="handleSubmit">
        <section class="modal-card-body">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
            <div v-if="errors" class="notification is-danger content">
              <button @click.prevent="$store.commit('changeRegisterErrors', null)" class="delete"></button>
              <ul>
                <li v-for="(value, key) in errors" :key="key">
                  {{ value[0] }}
                </li>
              </ul>
            </div>
          </transition>
          
          <div class="columns">
            <div class="field column is-half">
              <p class="control">
                <input ref="firstNameInput" v-model="credentials.first_name" class="input" type="text" placeholder="First name" required>
              </p>
            </div>
            <div class="field column is-half">
              <p class="control">
                <input class="input" v-model="credentials.last_name" type="text" placeholder="Last name" required>
              </p>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-model="credentials.username" type="text" placeholder="Username" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-model="credentials.email" type="email" placeholder="Email" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-model="credentials.password" type="password" placeholder="Password" required>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Register</button>
          <button @click.prevent="close" class="button" type="reset">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'registerErrors'
    })
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('tryRegister', this.credentials)
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.firstNameInput.focus()
        })
      }
    }
  }
}
</script>

<style scoped>
.columns {
  margin-bottom: 0;
  padding-top: 0.5em;
}

.field.column.is-half {
  padding-top: 0;
  padding-bottom: 0;
}

.field.column.is-half:nth-child(1) {
  padding-left: 0;
}

.field.column.is-half:nth-child(2) {
  padding-right: 0;
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
  padding-left: 0.2em;
  padding-right: 0.2em;
  padding-top: 0.2em;
}

@media (max-width: 768px) {
  .field.column.is-half:nth-child(1) {
    padding-right: 0;
  }

  .field.column.is-half:nth-child(2) {
    padding-left: 0;
    margin-bottom: 0.75rem;
  }
}
</style>
