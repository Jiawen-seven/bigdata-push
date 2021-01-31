<template>
  <div class="push_index">
    <pvideo/>
    <div class="push_welcome">
      <div class="welcome-title">
        <div class="title-left">
          <img src="~assets/img/welcome-icon.png" alt="">
          <span>推股送金</span>
        </div>
        <div class="title-right">
          <el-link type="warning" :underline="false" href="/login">登录</el-link>
          <el-link type="warning" :underline="false" href="/register">注册</el-link>
        </div>
      </div>
      <div class="welcome-content">
        <img src="~assets/img/index-icon.png" alt="">
        <el-button class="welcome-button" type="warning" @click="welcome_button()">立即体验</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Pvideo from 'components/content/Video'
export default {
  name: 'Index',
  components: {
    Pvideo
  },
  data(){
    return{
      
    }
  },
  methods: {
    welcome_button(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.push_welcome{
  width: 100%;
  position: absolute;
  top: 0;
}
.push_welcome .welcome-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 40px;
}
.push_welcome .welcome-title .title-left{
  display: flex;
  align-items: center;
}
.push_welcome .welcome-title .title-left img{
  width: 100px;
  height: 90px;
}
.push_welcome .welcome-title .title-left span{
  color: white;
  font-size: 30px;
  letter-spacing: 4px;
  padding-left: 10px;
  font-family: Microsoft JhengHei;
  font-weight: bold;
}
.push_welcome .welcome-title .title-right .el-link{
  font-size: 20px;
  padding: 10px;
}
.push_welcome .welcome-title .el-link:hover{
  color: rgba(255,255,255,0.8);
}
.push_welcome .welcome-content{
  width: 100%;
  text-align: center;
}
.push_welcome .welcome-content img{
  width: 728px;
  height: 410px;
  margin: 80px 0;
}
.push_welcome .welcome-content .welcome-button{
  display: block;
  margin: auto;
  width: 330px;
  height: 70px;
  font-size: 25px;
  letter-spacing: 2px;
  font-weight: bold;
}
</style>