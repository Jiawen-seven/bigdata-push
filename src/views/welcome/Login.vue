<template>
  <div class="push_login">
    <i class="icon-back" @click="goBack()"></i>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {

    }
  },
  methods: {
    goBack(){
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>
.push_login{
  height: 100%;
  background-image: url('~assets/img/login_bg.jpg');
  background-size: cover;
  background-repeat:no-repeat;
  position: relative;
}
.push_login .icon-back{
  width: 60px;
  height: 50px;
  background-image: url('~assets/img/back.png');
  background-size: cover;
  background-repeat:no-repeat;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

</style>