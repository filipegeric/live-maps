<template>
  <div>
    <div class="card">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ event.title }}</p>
          <div class="subtitle is-6">
            <span class="event-interest" :class="`event-${event.interest}`">{{ event.interest | capitalize }}</span>
            <span class="event-start-date">{{ event.start_at | dateFormat('Do of MMM, h:mm a') }}</span>
            <span class="event-address">Address: {{ event.address }}</span>
          </div>
        </div>
        <a id="unfocus-arrow" class="is-pulled-right" @click.prevent="$store.commit('unfocusEvent')"><i class="fas fa-angle-left"></i></a>
      </div>

      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="event.image" alt="Event Image">
        </figure>
      </div>

      <div class="card-content">
        <div class="content">
          {{ event.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  padding: 0.5em;
  height: 100%;
  background-image: url('../../assets/img/pattern.svg');
}

.image>img {
  border-radius: 10px;
}

.title {
  padding-bottom: 0.5em;
}

.media {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.media-content {
  overflow: -webkit-paged-y;
}

.card-image {
  width: 70%;
  padding-left: 1.5rem;
}

#unfocus-arrow {
  font-size: 2rem;
  color: #31aaee;
}

#unfocus-arrow:hover {
  color: #0b9cf0;
}


.event-start-date {
  color: #136492;
  border: solid 0.5px #bfbfbf;
  border-radius: 5px;
  padding: 2px;
  font-size: 1rem;
}

.event-address {
  padding-top: 0.4em;
  font-size: 1.2em;
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
