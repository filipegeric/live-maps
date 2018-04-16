<template>
  <form @submit.prevent="submitForm">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <ul>
          <li v-for="(interest, key) in interests" :key="key">
            <span>Show {{ interest.name | addS }}</span>
            <div class="is-pulled-right">
              <input type="checkbox" :id="interest.name" name="interest" v-model="checkedInterests" :value="interest.id" class="switch-input">
              <label :for="interest.name" class="switch-label" :class="`label-${interest.name}`"></label>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="columns">
      <div class="column is-2 is-offset-5 has-text-centered" style="padding: 0;">
        <button id="explore" class="button is-primary is-large" >Lets Go</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      checkedInterests: []
    }
  },
  computed: {
    interests() {
      return this.$store.state.interests
    }
  },
  methods: {
    submitForm () {
      var interests = this.checkedInterests.join(',')
      console.log(`/events/?interests=${interests}`)
      axios.get(`/events/?interests=${interests}`).then(response => {
        this.$store.commit('refreshCheckedInterests', interests.split(','))
        this.$store.commit('refreshEventsInFocus', response.data)
        this.$store.commit('changeLoadingExploreView')
      }).catch(err => {
        console.log(err)
      })
      this.$router.push({ path: '/explore' })
    }
  }
}
</script>

<style scoped>
#explore {
  background-color: #2da8ee;
  padding: 0;
  width: 100%;
}

@media (max-width: 770px) {
  #explore {
    width: 33.33333%;
  }
}

#explore:hover {
  background-color: #127bb8;
}

/*-------------*/

li {
  padding: 10px;
  border: solid 1px #bfbfbf;
  background-color: #fff;
  border-top: none;
}

li:nth-child(1) {
  border: solid 1px #bfbfbf;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

li:last-child {
  border: solid 1px #bfbfbf;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.switch-input {
  display: none;
}
.switch-label {
  position: relative;
  display: inline;
  min-width: 112px;
  cursor: pointer;
  font-weight: 500;
  padding: 8px 0 16px 44px;
}
.switch-label:before,
.switch-label:after {
  content: "";
  position: absolute;
  margin: 0;
  outline: 0;
  top: 50%;
  -ms-transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.switch-label:before {
  left: 1px;
  width: 44px;
  height: 18px;
  background-color: #9e9e9e;
  border-radius: 8px;
}
.switch-label:after {
  left: 0;
  width: 25px;
  height: 25px;
  background-color: #fafafa;
  border-radius: 50%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
    0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
}

.switch-input:checked + .switch-label:before {
  /*background-color: attr(data-color);*/
}
.switch-input:checked + .switch-label:after {
  /*background-color: attr(data-color);*/
  -ms-transform: translate(80%, -50%);
  -webkit-transform: translate(80%, -50%);
  transform: translate(80%, -50%);
}

/**/

.switch-input:checked + .label-theatre:before {
  background-color: #f79a188a;
}
.switch-input:checked + .label-theatre:after {
  background-color: #f79a18;
}

.switch-input:checked + .label-museum:before {
  background-color: #14eb057e;
}
.switch-input:checked + .label-museum:after {
  background-color: #14eb05;
}

.switch-input:checked + .label-sport:before {
  background-color: #2da7ee80;
}
.switch-input:checked + .label-sport:after {
  background-color: #2da8ee;
}

.switch-input:checked + .label-club:before {
  background-color: #a5a29f80;
}
.switch-input:checked + .label-club:after {
  background-color: #a5a29f;
}

.switch-input:checked + .label-bar:before {
  background-color: #8c5b1785;
}
.switch-input:checked + .label-bar:after {
  background-color: #8c5b17;
}

.switch-input:checked + .label-festival:before {
  background-color: #d817347e;
}
.switch-input:checked + .label-festival:after {
  background-color: #d81734;
}
</style>
