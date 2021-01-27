<template>
  <div class="push_home">
    <video autoplay loop muted class="push_video">
      <source src="~assets/img/home_bg.mp4" type="video/mp4">
    </video>
    <div class="push_welcome">
      <div class="welcome-title">
        <img src="~assets/img/welcome-icon.png" alt="">
        <span>推股送金</span>
      </div>
      <div class="welcome-content">
        <img src="~assets/img/title-icon.png" alt="">
        <el-button class="welcome-button" type="warning">立即体验</el-button>
      </div>
    </div>
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
  width: 100%;
  position: absolute;
  top: 0;
}
.push_welcome .welcome-title{
  display: flex;
  align-items: center;
  margin: 20px 40px;
}
.push_welcome .welcome-title img{
  width: 100px;
  height: 90px;
}
.push_welcome .welcome-title span{
  color: white;
  font-size: 30px;
  letter-spacing: 4px;
  padding-left: 10px;
  font-family: Microsoft JhengHei;
  font-weight: bold;
}
.push_welcome .welcome-content{
  width: 100%;
  text-align: center;
}
.push_welcome .welcome-content img{
  width: 728px;
  height: 410px;
  margin-top: 30px;
  margin-left: 80px;
  /* display: block; */
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