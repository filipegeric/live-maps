<template>
  <transition appear appear-active-class="animated fadeIn">
    <div id="main-right-column" class="column is-7">
      <small-checkbox />
      <gmap-map ref="theMap" id="the-map" :center="center" :zoom="zoom">
        <gmap-marker
          v-for="m in events"
          :key="m.id"
          :position="{lat: m.lat, lng: m.long}"
          :clickable="true"
          @click="focus"
        ></gmap-marker>
      </gmap-map>
    </div>
  </transition>
</template>

<script>
import SmallCheckbox from '../includes/SmallCheckbox'

export default {
  components: {
    SmallCheckbox
  },
  data() {
    return {
      center: { lat: 45.252467, lng: 19.827957 },
      m: {
        position: { lat: 45.252479, lng: 19.827949 }
      },
      zoom: 13
    }
  },
  computed: {
    events () {
      return this.$store.state.eventsInFocus
    }
  },
  methods: {
    focus () {
      this.$refs.theMap.panTo(this.m.position)
      this.zoom = 13
      this.zoom = 17
      // TODO
    }
  }
}
</script>

<style scoped>
#main-right-column {
  padding: 0;
}

#the-map {
  width: 100%; 
  height: 100%;
}

@media (max-width: 768px) {
  #main-right-column {
    height: 100vh; 
  }

  #the-map {
    height: 86%;
  }
}
</style>
