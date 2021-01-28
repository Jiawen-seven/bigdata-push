<template>
  <video autoplay loop muted class="push_video">
    <source src="~assets/img/index_bg.mp4" type="video/mp4">
  </video>
</template>

<script>
export default {
  name: 'Video'
}
</script>

<style scoped>
.push_video{
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>