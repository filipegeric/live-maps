<template>
  <transition appear appear-active-class="animated fadeIn">
    <div id="main-right-column" :class="`column is-${cols}`">
      <small-checkbox />
      <gmap-map ref="theMap" id="the-map" :center="center" :zoom="zoom">
        <gmap-marker
          v-for="m in events"
          :key="m.id"
          :position="{lat: m.lat, lng: m.long}"
          :animation="4"
          :clickable="true"
          @click="focus(m)"
          :opacity="0.8"
          :icon="{url: `${axios.defaults.baseURL}/static/images/pins/${m.interest}.png`, scaledSize: {height: scaleRating(m.rating.sum), width: scaleRating(m.rating.sum)}}"
        ></gmap-marker>
      </gmap-map>
    </div>
  </transition>
</template>

<script>
import SmallCheckbox from '../includes/SmallCheckbox'

export default {
  props: ['cols'],
  components: {
    SmallCheckbox
  },
  data() {
    return {
      center: { lat: 45.252467, lng: 19.827957 },
      zoom: 13
    }
  },
  mounted() {
    this.$refs.theMap.$on('zoom_changed', (e) => {
      this.zoom = e
      
    })
  },
  computed: {
    events () {
      return this.$store.state.eventsInFocus
    }
  },
  methods: {
    focus (m) {
      // this is pretty stupid, but ok
      let interval = setInterval(() => {
        if(this.zoom <= 15) {
          this.zoom += 2
        } else {
          clearInterval(interval)
        }
      },140)
      this.$refs.theMap.panTo({lat: m.lat, lng: m.long})
      // TODO
    },
    scaleRating(rating) {
      // this is also very stupid and unusable
      if(rating > 10) {
        return 50
      } else if(rating > 5) {
        return 40
      } else if(rating > 0) {
        return 30
      } else if(rating > -5) {
        return 25
      } else {
        return 23
      }
    }
  }
}
</script>

<style scoped>
#main-right-column {
  padding: 0;
  transition: width 0.2s;
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
