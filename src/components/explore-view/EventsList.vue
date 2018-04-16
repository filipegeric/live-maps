<template>
  <div id="events-column" class="column is-5">

  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <img v-if="loading" id="loading-gif" src="../../assets/img/loading-gif.gif" alt="Loading...">
  </transition>

  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div v-if="!loading" id="event-list-container">
      <div id="event-list">
        <event-preview v-for="(event,key) in events" :key="key" :event="event" />
      </div>
    </div>
  </transition>

  </div>
</template>

<script>
import EventPreview from './EventPreview'

export default {
  data () {
    return {
      loading: false,
      events: []
    }
  },
  beforeMount () {
    this.events = this.$store.state.eventsInFocus
  },
  components: {
    EventPreview
  }
}
</script>

<style scoped>
#loading-gif {
  margin-left: auto; 
  margin-right: auto;
  width: 190px; 
  display: block; 
  position: absolute; 
  z-index: -2; 
  left: 0; 
  right: 0;
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

#events-column {
  background-color: white;
  border-right: solid 1px #c3c7ca;
  padding: 0;
}


/*---------*/
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
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
</style>
