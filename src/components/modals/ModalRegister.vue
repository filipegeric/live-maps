<template>
  <div ref="modalRegister" @keyup.esc="toggle" id="modal-register" class="modal animated fadeIn ">
    <div @click.prevent="toggle" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
        <button @click.prevent="toggle" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent>
        <section class="modal-card-body">
          <div class="columns">
            <div class="field column is-half">
              <p class="control">
                <input class="input" type="text" placeholder="First name" required>
              </p>
            </div>
            <div class="field column is-half">
              <p class="control">
                <input class="input" type="text" placeholder="Last name" required>
              </p>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="email" placeholder="Email" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="password" placeholder="Password" required>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Register</button>
          <button @click.prevent="toggle" class="button" type="reset">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggle () {
      this.$refs.modalRegister.classList.remove('is-active')
    }
  }
}
</script>

<style scoped>
.columns {
  margin-bottom: 0;
}

.field.column.is-half {
  padding-top: 0;
  padding-bottom: 0;
}

.field.column.is-half:nth-child(1) {
  padding-left: 0;
}

.field.column.is-half:nth-child(2) {
  padding-right: 0;
}

.button[type="reset"] {
  margin-left: auto;
}

.modal-card {
  width: 520px;
}

@media (max-width: 768px) {
  .field.column.is-half:nth-child(1) {
    padding-right: 0;
  }

  .field.column.is-half:nth-child(2) {
    padding-left: 0;
    margin-bottom: 0.75rem;
  }
}
</style>
