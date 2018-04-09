<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <div id="logo-mobile"></div>
      <div class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <p class="control">
            <a class="button is-primary">
              <span>Create new event</span>
            </a>
          </p>
        </div>
      </div>
      <div id="logo"></div>
      <div class="navbar-end">
        <div id="user-name" class="navbar-item">
          <p>Filip Egeric |</p>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary">
                <span>Register</span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary">
                <span>Login</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
nav {
  background-color: #fff;
  height: 80px;
  border-bottom: solid 2px #31aaee;
}

#logo {
  width: 260px;
  height: 68px;
  margin: auto;
  margin-right: 5px;
  margin-top: 5px;
  background: url('../assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
}

#logo-mobile {
  width: 260px;
  height: 68px;
  margin: auto;
  margin-right: 0px;
  margin-top: 5px;
  background: url('../assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  display: none;
}

.button.is-primary {
  background-color: #31aaee;
}

.button.is-primary:hover {
  background-color: #0b9cf0;
}

#user-name {
  padding-right: 0;
}

.navbar-burger {
  height: 80px;
}

@media (max-width: 1023px) {
  #logo-mobile {
    display: inline-block;
  }
}
</style>
