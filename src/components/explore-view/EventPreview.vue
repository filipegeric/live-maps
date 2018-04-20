<template>
  <article class="message is-small">
    <div class="message-body columns">

      <div class="column is-1 has-text-centered" style="width: auto;">
        <div class="event-rate">
          <a @click.prevent><i class="fas fa-angle-up"></i></a>
        </div>
        <div>{{ event.rating.sum }}</div>
        <div class="event-rate">
          <a @click.prevent><i class="fas fa-angle-down"></i></a>
        </div>
      </div>

      <div class="column is-2">
        <img :src="event.image" alt="event-img" class="event-image">
      </div>

      <div class="column is-8">
        <h3 class="event-title">{{ event.title }}</h3>
        <div class="event-data">
          <span>{{ event.interest }}</span>
          <span>{{ event.start_at }}</span>
          <span>| {{ event.address }}</span>
        </div>
      </div>

      <div class="column is-1 has-text-centered">
        <i class="fas fa-angle-right"></i>
      </div>
      
    </div>
  </article>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style scoped>
article {
  margin-bottom: 10px !important;
  margin-top: 10px !important;
  margin-left: 10px;
}

.message-body {
  margin: 0;
  padding: 5px;
}

i {
  font-size: 25px;
}

.fa-angle-right {
  padding-top: 100%;
  padding-bottom: 100%;
}

</style>
