<template>
  <div id="main" class="columns">
    <router-link to="/">home</router-link>
    <events-list />
    <google-map />
  </div>
</template>

<script>
import EventsList from './EventsList'
import GoogleMap from './GoogleMap'

export default {
  components: {
    EventsList,
    GoogleMap
  }
}
</script>

<style scoped>
#main {
  padding-top: 85px;
}
</style>
