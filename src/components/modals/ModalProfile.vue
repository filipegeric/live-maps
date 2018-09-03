<template>
  <div @keyup.esc="close" id="modal-profile" class="modal animated fadeIn" :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Profile</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
        
      <form @submit.prevent="handleSubmit">
        <section class="modal-card-body">
          <img src="../../assets/img/man.png" alt="AVATAR">
          <div class="field">
            <p class="control">
              Username: {{ user.username }}
            </p>
          </div>
          <div class="field">
            <p class="control">
              First name: {{ user.first_name }}
            </p>
          </div>
          <div class="field">
            <p class="control">
              Last name: {{ user.last_name }}
            </p>
          </div>
          <div class="field">
            <p class="control">
              Email: {{ user.email }}
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Save</button>
          <button @click.prevent="close" class="button" type="reset">Close</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { User } from '@/types.js';

export default {
  props: {
    user: {
      type: User,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    handleSubmit () {

    }
  }
}
</script>

<style scoped>
#modal-profile {
  transition: all 1.5s;
}
  
.button[type="reset"] {
  margin-left: auto;
}

.modal-card {
  width: 520px;
}
</style>
