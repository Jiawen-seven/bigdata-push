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
              <h2>{{10}}个</h2>
            </div>
            <i class="el-icon-user"></i>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="index-bottom">
      <div class="bottom-left">
        <div class="clock">
          打卡
        </div>
        <div class="plan">
          每日计划
        </div>
      </div>
      <div class="bottom-right">
        <h3><i class="el-icon-notebook-1"></i> 员工手册</h3>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  data(){
    return{
      date: {},
      value: new Date()
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
      this.getDay();
      this.getTime();
    },
    getDay(){
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
    },
    getTime(){
      if(this.date.second < 10){
        this.date.second = '0' + this.date.second
      }
      else if (this.date.min < 10){
        this.date.min = '0' + this.date.min
      }
      else if (this.date.hour < 10){
        this.date.hour = '0' +this.date.hour
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
.index-bottom{
  margin: 60px 50px;
  display: flex;
  justify-content: space-between;
}
.bottom-left, .bottom-right{
  flex: 1;
}
</style>
