<template>
  <transition appear appear-active-class="animated fadeIn">
    <div id="main-right-column" :class="`column is-${cols}`">
      <small-checkbox />
      <gmap-map ref="theMap" id="the-map" :center="mapCenter" :zoom="mapZoom">
        <gmap-marker
          v-for="m in eventsInFocus"
          :key="m.id"
          :position="{lat: m.lat, lng: m.long}"
          :animation="4"
          :clickable="true"
          @click="focusOnMap(m)"
          :opacity="0.8"
          :icon="{url: `${axios.defaults.baseURL}/static/images/pins/${m.interest}.png`, scaledSize: {height: scaleRating(m.rating.sum), width: scaleRating(m.rating.sum)}}"
        ></gmap-marker>
      </gmap-map>
    </div>
  </transition>
</template>

<script>
import SmallCheckbox from '../includes/SmallCheckbox'
import { mapGetters } from 'vuex'

export default {
  props: {
    cols: {
      type: Number,
      required: true
    }
  },
  components: {
    SmallCheckbox
  },
  mounted() {
    this.$refs.theMap.$on('zoom_changed', (e) => {
      this.$store.commit('setMapZoom', e)
    })
  },
  computed: {
    ...mapGetters([
      'eventsInFocus',
      'mapZoom',
      'mapCenter',
      'focusedEvent'
    ])
  },
  methods: {
    focusOnMap (m) {
      this.$store.commit('setMapZoom', 17)
      this.$refs.theMap.panTo({lat: m.lat, lng: m.long})
      this.$store.commit('focusEvent', m)
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
  },
  watch: {
    focusedEvent (newValue) {
      if(newValue) {
        this.focusOnMap(newValue)
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
