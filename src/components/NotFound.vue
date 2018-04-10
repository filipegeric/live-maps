<template>
  <div>
    <img id="loading-gif" src="../../static/img/bg_404.png" alt="404">
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
#loading-gif {
  padding-top: 13em;
  margin-left: auto; 
  margin-right: auto;
  width: 190px; 
  display: block; 
  position: absolute; 
  z-index: -2; 
  left: 0; 
  right: 0;
}

@media (max-width: 420px) {
  #loading-gif {
    padding-top: 6em;
  }
}
</style>