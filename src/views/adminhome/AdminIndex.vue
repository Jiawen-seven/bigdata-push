<template>
  <div class="admin-index">
    <div class="index-top">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-card shadow="hover" body-style="background-color: #409EFF;color: #fff;display: flex;">
            <div class="top-date">
              <span>{{this.date.year}}年</span>
              <h2>{{this.date.month}}月{{this.date.date}}日</h2>
            </div>
            <i class="el-icon-date"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" body-style="background-color: #67C23A;color: #fff;display: flex;">
            <div class="top-date">
              <span>北京时间</span>
              <h2>{{this.date.hour}}:{{this.date.min}}:{{this.date.second}}</h2>
            </div>
            <i class="el-icon-time"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" body-style="background-color: #E6A23C;color: #fff;display: flex;">
            <div class="top-date">
              <span>工作日</span>
              <h2>星期{{this.date.day}}</h2>
            </div>
            <i class="el-icon-alarm-clock"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" body-style="background-color: #F56C6C;color: #fff;display: flex;">
            <div class="top-date">
              <span>注册用户</span>
              <h2>{{xxx}}个</h2>
            </div>
            <i class="el-icon-user"></i>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="index-bottom">
      每日计划
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  data(){
    return{
      date: {}
    }
  },
  mounted(){
    this.getCurrentTime();
    clearInterval(myTimeDisplay);
    let myTimeDisplay = setInterval(() => {
      this.getCurrentTime(); //每秒更新一次时间
    }, 1000);
  },
  methods: {
    getCurrentTime(){
      let systemDate = new Date();
      this.date = {
        year: systemDate.getFullYear(),
        month: systemDate.getMonth()+1,
        date: systemDate.getDate(),
        hour: systemDate.getHours(),
        min: systemDate.getMinutes(),
        second: systemDate.getSeconds(),
        day: systemDate.getDay(),
      }
      if(this.date.day == '1'){
        this.date.day = '一'
      }
      else if(this.date.day == '2'){
        this.date.day = '二'
      }
      else if(this.date.day == '3'){
        this.date.day = '三'
      }
      else if(this.date.day == '4'){
        this.date.day = '四'
      }
      else if(this.date.day == '5'){
        this.date.day = '五'
      }
      else if(this.date.day == '6'){
        this.date.day = '六'
      }
      else if(this.date.day == '7'){
        this.date.day = '日'
      }
    }
  }
}
</script>

<style scoped>
.index-top{
  margin:30px 50px;
}
.index-top .top-date{
  flex: 1;
}
.top-date h2{
  letter-spacing: 10px;
}
.index-top i{
  font-size: 50px;
}
</style>
