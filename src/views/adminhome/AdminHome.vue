<template>
  <div class="admin-home">
    <div class="home-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item class="menu-title">
          <img src="~assets/img/welcome-icon.png" alt="">
          <span slot="title">推股管理系统</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="home-content">
      <div class="content-top">
        <div class="top-left">
          <i v-if="!isCollapse" class="el-icon-s-fold icon" @click="isFold()"></i>
          <i v-else class="el-icon-s-unfold icon" @click="isFold()"></i>
        </div>
        <div class="top-right">
          <el-dropdown  trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-s-custom"></i>
              <span>seven</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content-bottom">

      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from 'utils/auth'
import { getLoginOut } from 'network/login'

export default {
  name: 'AdminHome',
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    logout(){
      this.$confirm('此操作将退出该系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //1.清除localStorage 和 token
        localStorage.clear();
        removeToken()//本地cookie中的token
        this.getLoginOut()//后端中的token
        //2.回到index页面
        this.$router.push('/index')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消退出~'
        });          
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isFold(){
      this.isCollapse = !this.isCollapse
    },
    //网络请求相关的方法
    getLoginOut(){
      getLoginOut().then(res =>{
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    }
  }
}
</script>

<style>
.admin-home{
  display: flex;
  height: 100%;
}
/**左侧菜单栏样式 */
.home-menu{
  background-color: #545c64;
}
.el-menu-vertical-demo{
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
.el-menu--collapse{
  width: 75px;
}
.menu-title{
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.menu-title img{
  width: 50px;
  height: 45px;
  margin-left: -10px;
  margin-right: 10px;
}

/**右侧内容 */
.home-content{
  flex: 1;
}
.content-top{
  box-shadow: 0 2px 5px #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-left .icon{
  cursor: pointer;
  font-size: 35px;
  color: #545c64;
  padding: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
  outline: none;
}
.el-dropdown-link:hover{
  color: #E6A23C;
}
.el-icon-arrow-down {
  font-size: 25px;
  margin-right: 5px;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background-color: #feffec;
  color: #E6A23C;
}
</style>