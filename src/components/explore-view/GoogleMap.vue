<template>
  <transition appear appear-active-class="animated fadeIn">
    <div id="main-right-column" class="column is-7">
      <small-checkbox />
      <gmap-map id="the-map" :center="center" :zoom="zoom" style=""></gmap-map>
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
      zoom: 13
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
