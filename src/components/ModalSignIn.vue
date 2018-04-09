<template>
  <div @keyup.esc="toggle" id="modal-sign-in" class="modal animated fadeIn ">
    <div @click.prevent="toggle" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in</p>
        <button @click.prevent="toggle" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent>
        <section class="modal-card-body">
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Username" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="password" placeholder="Password" required>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Sign in</button>
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
      document.getElementById('modal-sign-in').classList.remove('is-active')
    }
  }
}
</script>

<style scoped>
#modal-sign-in {
  transition: all 1.5s;
}
  
.button[type="reset"] {
  margin-left: auto;
}

.modal-card {
  width: 520px;
}
</style>
