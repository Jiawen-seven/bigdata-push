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
        <el-card class="box-card clock">
          <el-button type="info">打 卡</el-button>
        </el-card>
        <el-card class="box-card">
          <span slot="header">每日计划</span>
          放动态标签即可~
        </el-card>
      </div>
      <div class="bottom-right">
        <h3><i class="el-icon-notebook-1"></i> 员工守则</h3>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="一、个人成长与企业发展" name="1">
            <div>1. 熟悉并认同公司的理念与企业文化，将个人成长与企业发展相结合。</div>
            <div>2. 有高度的责任心和事业心，处处以公司的利益为重，为公司的发展努力工作。</div>
          </el-collapse-item>
          <el-collapse-item title="二、集体荣誉感" name="2">
            <div>1. 严守公司机密，保护公司财产。</div>
            <div>2. 自觉维护团体荣誉，有团队合作精神和强烈的集体荣誉感，确保公司的完美形象。</div>
          </el-collapse-item>
          <el-collapse-item title="三、职业道德" name="3">
            <div>1. 培养良好的职业道德，对内乐于提供建议，对外不谈论公司是非。</div>
          </el-collapse-item>
          <el-collapse-item title="四、客户至上" name="4">
            <div>1. 树立服务意识，始终面向市场，面向用户，提供具有“国际品质、名牌服务、物超所值”的信息产品</div>
            <div>2. 客户至上，努力为客户提供最佳的服务和最高价值。</div>
          </el-collapse-item>
          <el-collapse-item title="五、不断学习" name="5">
            <div>1. 不断学习新知识，开拓思路，具备创新能力，通过培养学习新知识使个人素质与公司发展保持同步。</div>
            <div>2. 对工作要协调合作，对同事要互相帮助，有敬业和奉献精神，分享知识与技术。</div>
          </el-collapse-item>
          <el-collapse-item title="六、明确目标" name="6">
            <div>1. 以饱满的工作热情，积极的工作态度，严谨的工作作风，从事各自岗位的工作。</div>
            <div>2. 明确公司的奋斗目标和个人工作目标。</div>
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
      activeName: '1'
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
.bottom-left .box-card{
  margin: 30px 0;
  width: 580px;
  height: 200px;
}
.bottom-left .clock{
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card .el-button{
  font-size: 25px;
  font-weight: bold;
  width: 250px;
  height: 60px;
}
</style>
