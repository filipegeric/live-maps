<template>
  <div @keyup.esc="close" id="modal-create-event" class="modal animated fadeIn" :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create new event</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
          <div v-if="error" class="notification is-danger">
            <button @click.prevent class="delete"></button>
            Please check your credentials!
          </div>
        </transition>
        <div class="field">
          <p class="control">
            <input ref="titleInput" v-model="event.title" class="input" type="text" placeholder="Title" required>
          </p>
        </div>
        <div class="field">
          <p class="control">
            Start date:
            <input v-model="event.start_at" class="input" type="date" required>
          </p>
        </div>
        <div class="field">
          <p class="control">
            End date:
            <input v-model="event.end_at" class="input" type="date" required>
          </p>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox">
            Permanent
          </label>
        </div>
        <div class="field">
          <textarea class="textarea" placeholder="Description"></textarea>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" placeholder="Hashtags" title="Separate by spaces" required>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" placeholder="Address" required>
          </p>
        </div>
        <div class="field">
          Interest:<br/>
          <div class="select">
            <select>
              <option v-for="(value, key) in interests" :key="key" :value="value.id">{{ value.name | capitalize }}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="file is-info has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="resume">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Image...
                </span>
              </span>
              <span class="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span>
            </label>
          </div>
        </div>
        <div class="field">
          Location to be implemented...
        </div>
        

      </section>
      <footer class="modal-card-foot">
        <button @click.prevent="handleSubmit" class="button is-success" type="submit">Create</button>
        <button @click.prevent="close" class="button" type="reset">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['close'],
  data () {
    return {
      isActive: false,
      event: {
        title: '',
        start_at: '',
        end_at: '',
        permanent: false,
        body: '',
        hashtag: '',
        interest: '',
        img: null,
        address: '',
        lat: '',
        long: ''
      }
    }
  },
  computed: {
    error () {
      return false
    },
    interests () {
      return this.$store.state.interests
    }
  },
  methods: {
    handleSubmit () {
      console.log('submited');
      
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.titleInput.focus() 
        })
      }
    }
  }
}
</script>

<style scoped>
#modal-create {
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

.file-name {
  max-width: 500px;
}
</style>
