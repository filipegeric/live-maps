<template>
  <article class="message is-small">
    <div class="message-body columns is-mobile">

      <div class="column is-1 has-text-centered" style="width: auto; margin-top: auto; margin-bottom: auto;">
        <div class="event-rate">
          <a @click.prevent><i class="fas fa-angle-up"></i></a>
        </div>
        <div>{{ event.rating.sum }}</div>
        <div class="event-rate">
          <a @click.prevent><i class="fas fa-angle-down"></i></a>
        </div>
      </div>

      <div class="column is-2" style="padding: 0; margin-top: auto; margin-bottom: auto;">
        <img :src="event.image" alt="event-img" class="event-image">
      </div>

      <div class="column is-8">
        <h3 class="event-title">{{ event.title }}</h3>
        <div class="event-data">
          <span class="event-interest" :class="`event-${event.interest}`">{{ event.interest | capitalize }}</span>
          <span class="event-start-date">{{ event.start_at | dateFormat('Do of MMM') }}</span>
          <span class="event-address">| {{ event.address }}</span>
        </div>
      </div>

      <div class="column is-1 has-text-centered" style="margin-top: auto; margin-bottom: auto; padding: 0; padding-right: 5px;">
        <a @click.prevent="focusEvent(event)" ><i class="fas fa-angle-right" style="padding-right: 5px;"></i></a>
      </div>
      
    </div>
  </article>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    focusEvent(event) {
      if(this.$store.state.focusedEvent) {
        this.$store.commit('unfocusEvent')
      } else {
        this.$store.commit('focusEvent', event)
      }
      
    }
  }
}
</script>

<style scoped>
article {
  margin-bottom: 10px !important;
  margin-top: 10px !important;
  margin-left: 10px;
}

article:hover {
  background-color: #dddddd;
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
  font-size: 2rem;
  transition: all 0.3s;
}

.fa-angle-right:hover {
  transform: scale(1.2);
}

.event-image {
  border-radius: 5px;
}

.event-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.event-address {
  padding: 2px;
  font-size: 1rem;
}

.event-start-date {
  color: #136492;
  border: solid 0.5px #bfbfbf;
  border-radius: 5px;
  padding: 2px;
  font-size: 1rem;
}

.event-interest {
  color: #494949;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  padding: 2px;
}

.event-theatre:hover {
  background-color: #f79a188a;
}
.event-theatre {
  background-color: #f79a18;
}

.event-museum:hover {
  background-color: #14eb057e;
}
.event-museum {
  background-color: #14eb05;
}

.event-sport:hover {
  background-color: #2da7ee80;
}
.event-sport {
  background-color: #2da8ee;
}

.event-club:hover {
  background-color: #a5a29f80;
}
.event-club {
  background-color: #a5a29f;
}

.event-bar:hover {
  background-color: #8c5b1785;
}
.event-bar {
  background-color: #8c5b17;
  color: #85aec5;
}

.event-festival:hover {
  background-color: #d817347e;
}
.event-festival {
  background-color: #d81734;
}
</style>
