<template>
  <div @keyup.esc="close" id="modal-create-event" class="modal animated fadeIn" :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create new event</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
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
            <input v-model="event.end_at" class="input" type="date" :disabled="event.permanent" required>
          </p>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" v-model="event.permanent">
            Permanent
          </label>
        </div>
        <div class="field">
          <textarea v-model="event.body" class="textarea" placeholder="Description"></textarea>
        </div>
        <div class="field">
          <p class="control">
            <input v-model="event.hashtag" class="input" type="text" placeholder="Hashtags" title="Separate by spaces" required>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input v-model="event.address" class="input" type="text" placeholder="Address" required>
          </p>
        </div>
        <div class="field">
          Interest:<br/>
          <div class="select">
            <select v-model="event.interest">
              <option v-for="(value, key) in interests" :key="key" :value="value.id">{{ value.name | capitalize }}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="file is-info has-name">
            <label class="file-label">
              <input ref="imgInput" @change="handleFileInputChange" class="file-input" type="file">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Image...
                </span>
              </span>
              <span ref="fileLabel" class="file-name">

              </span>
            </label>
          </div>
        </div>
        <div class="field">
          Location to be implemented...
          <div class="box">
            This is where the map should go...
          </div>
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
  props: {
    close: {
      type: Function,
      required: true
    }
  },
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
        interest: 1,
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
      console.log('submited')
    },
    handleFileInputChange (e) {  
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.event.img = reader.result
      }
      reader.onerror = (err) => {
        console.log(err)
        this.event.img = ''
      }
      this.$refs.fileLabel.innerHTML = e.target.files[0].name
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.titleInput.focus() 
        })
      }
    },
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
