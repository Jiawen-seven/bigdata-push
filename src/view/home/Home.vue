<template>
  <div class="push_home">
    <video autoplay loop muted class="push_video">
      <source src="~assets/img/home_bg.mp4" type="video/mp4">
    </video>
    <!-- <button class="push_welcome">123</button> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
.push_video{
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
.push_welcome{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>