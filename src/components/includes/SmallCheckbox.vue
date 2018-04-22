<template>
  <div id="small-checkbox" >
    <div>
      <ul>
        
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <div id="interests-list" v-if="!toggledInterests">
            <li ref="interest" v-for="(interest, key) in interests" :key="key">
              <span>{{ interest.name | addS | capitalize }}</span>
              <div class="is-pulled-right">
                <input type="checkbox" :id="interest.name" name="interest" v-model="checkedInterests" :value="interest.id" class="switch-input">
                <label :for="interest.name" class="switch-label" :class="`label-${interest.name}`"></label>
              </div>
            </li>
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <li @click.prevent="openSmallCheckbox" id="arrow-up" v-if="toggledInterests" class="has-text-centered">
            <a @click.prevent="openSmallCheckbox"><i class="fas fa-angle-up"></i></a>
          </li>
          <li @click.prevent="toggleSmallCheckbox" id="arrow-down" v-if="!toggledInterests" class="has-text-centered">
            <a @click.prevent="toggleSmallCheckbox"><i class="fas fa-angle-down"></i></a>
          </li>
        </transition>

      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      checkedInterests: [],
      firstChange: false,
      toggledInterests: false
    }
  },
  computed: {
    interests() {
      return this.$store.state.interests
    }
  },
  mounted () {
    this.checkedInterests = this.$store.state.checkedInterests
  },
  methods: {
    toggleSmallCheckbox () {
      console.log(this.$refs.interest);
      this.toggledInterests = true;
    },
    openSmallCheckbox () {
      this.toggledInterests = false;
    }
  },
  watch: {
    checkedInterests (newInterests, oldInterests) {
      if (newInterests.length > oldInterests.length) {
        if(!this.firstChange) {
          this.firstChange = true
        } else {
          this.$store.commit('addToEventsInFocus', _.difference(newInterests, oldInterests)[0])
        }
        
      } else {
        this.$store.commit('clearEventsInFocus', this.$store.state.interests.find(el => {
          return el.id == _.pullAll(oldInterests, newInterests)[0]
        }).name)
      }
      
    }
  }
}
</script>


<style scoped>
#small-checkbox {
  position: absolute;
  width: 15%;
  bottom: 2%;
  margin-left: 10px;
  min-width: 140px;
  z-index: 5;
}

#interests-list {
  transition: all 1s;
}

#arrow-up:hover, #arrow-down:hover {
  cursor: pointer;
}

#arrow-up {
  padding: 0; 
  border-radius: 8px; 
  border-top: solid 1px #bfbfbf;
  border-bottom: solid 1px #bfbfbf;
}

#arrow-down {
  padding: 0; 
  /*border-top: solid 1px #bfbfbf; */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

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
  /*border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;*/
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
