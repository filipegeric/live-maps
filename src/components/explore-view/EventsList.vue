<template>
  <div id="events-column" class="column is-5">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="true" id="event-list-container">
        <div id="event-list">
          <transition-group name="list-complete">
            <event-preview v-for="item in events" :key="item.id" class="list-complete-item" :event="item" /> 
          </transition-group>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <img v-if="loading" id="loading-gif" src="../../assets/img/loading-gif.gif" alt="Loading...">
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EventPreview from './EventPreview'

export default {
  computed: {
    events () {
      return this.$store.state.eventsInFocus
    },
    loading () {
      return this.$store.state.loadingEventsList
    }
  },
  components: {
    EventPreview
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
