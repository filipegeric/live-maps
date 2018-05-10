<template>
  <div id="events-column" :class="`column is-${cols}`">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div id="event-list-container">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div id="event-list" v-if="!$store.state.focusedEvent">
            <transition-group name="list-complete">
              <event-preview v-for="item in events" :key="item.id" class="list-complete-item" :event="item" /> 
            </transition-group>
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <img v-if="loading" id="loading-gif" src="../../assets/img/loading-gif.gif" alt="Loading...">
            </transition>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="$store.state.focusedEvent" id="focused-event">
            <!-- TODO -->
            <full-event :event="$store.state.focusedEvent" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import EventPreview from './EventPreview'
import FullEvent from './FullEvent'

export default {
  props: ['cols'],
  computed: {
    events () {
      return this.$store.state.eventsInFocus
    },
    loading () {
      return this.$store.state.loadingEventsList
    }
  },
  components: {
    EventPreview,
    FullEvent
  }
}
</script>

<style scoped>
#loading-gif {
  opacity: 0.7;
  width: 190px;  
  position: absolute; 
  left: 15%; 
  top: 15em;
}

#event-list-container{
  overflow: hidden;
  width: 100%;
  height: 100%;
}
#event-list {
  width: 100%;
  height: 99%;
  overflow: auto;
  padding-right: 15px;
}

#focused-event {
  width: 100%;
  height: 99%;
  overflow: auto;
}

#events-column {
  background-color: white;
  border-right: solid 1px #c3c7ca;
  padding: 0;
  transition: width 0.2s;
  background-image: url('../../assets/img/pattern.svg');
}

@media (max-width: 768px) {
  #events-column {
    display: none;
  }
}


/*---------*/
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}




.list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-50px);
}
.list-complete-leave-active {
  position: absolute;
  left: 0;
  width: 39%;
}
</style>
