<template>
  <div id="app">
    <!--给路由的占位置的占位符-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import "assets/css/base.css";
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
