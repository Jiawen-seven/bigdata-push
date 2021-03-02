<template>
  <div class="admin-center">
    <h2>
      <i class="el-icon-postcard"></i>
      <span>个人中心</span>
    </h2>
    <el-card class="box-card">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
          <div>
            个人信息
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="second">
          <div>
            修改信息
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdminCenter',
  data(){
    return{
      activeName: 'first'
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
.admin-center h2{
  text-align: center;
  color: #E6A23C;
}
.admin-center h2 span{
  margin-left: 10px;
}
.admin-center .box-card {
  width: 800px;
  margin: 0 auto;
}
.el-tabs__item:hover, .el-tabs__item.is-active{
  color: #E6A23C;
}
</style>
