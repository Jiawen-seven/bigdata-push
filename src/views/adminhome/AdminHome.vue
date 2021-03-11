<template>
  <div class="admin-home">
    <div class="home-menu">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item class="menu-title" index="/index">
          <img src="~assets/img/welcome-icon.png" alt="">
          <span slot="title">推股管理系统</span>
        </el-menu-item>
        <el-menu-item index="/adminhome">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/adminhome/user">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/adminhome/admin">
              <i class="el-icon-user"></i>
              <span>角色管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span>系统监控</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/adminhome/data">
              <i class="el-icon-s-marketing"></i>
              <span>股票数据</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="home-content">
      <div class="content-top">
        <div class="top-left">
          <i v-if="!isCollapse" class="el-icon-s-fold icon" @click="isFold()"></i>
          <i v-else class="el-icon-s-unfold icon" @click="isFold()"></i>
        </div>
        <div class="top-right">
          <el-dropdown  @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-admin el-icon-s-custom"></i>
              <span>{{name}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='/adminhome/center'>个人中心</el-dropdown-item>
              <el-dropdown-item command='/index' divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content-bottom">
        <!--给子路由占位置的占位符-->
        <admin-index v-if="this.$route.path == '/adminhome'"/>
        <router-view v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from 'utils/auth'
import { getLoginOut } from 'network/login'
import AdminIndex from './AdminIndex'

export default {
  name: 'AdminHome',
  data() {
    return {
      isCollapse: false,
      name: localStorage.getItem('name')
    };
  },
  components: { AdminIndex },
  methods: {
    handleSelect(key){
      if(key == '/index'){
        this.$router.push('/index');
      }
      else if (key == '/adminhome'){
        this.$router.push('/adminhome')
      }
      else if (key == '/adminhome/user'){
        this.$router.push('/adminhome/user')
      }
      else if (key == '/adminhome/admin'){
        this.$router.push('/adminhome/admin')
      }
      else{
        this.$router.push('/adminhome/data')
      }
    },
    isFold(){
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command) {
      if(command == '/index'){
        this.$confirm('此操作将退出该系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //1.清除localStorage 和 token
          // localStorage.clear(); 退出不要全部清除，有些内容要保存
          localStorage.removeItem('name')
          localStorage.removeItem('flag')
          removeToken()//本地cookie中的token
          this.getLoginOut()//后端中的token
          //2.回到index页面
          this.$router.push(command)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出~'
          });          
        });
      }
      else{
        this.$router.push(command)
      }
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
.home-menu .el-menu-vertical-demo{
  border: none;
}
.home-menu .el-menu-vertical-demo:not(.el-menu--collapse) {
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
.el-icon-admin {
  font-size: 30px;
  margin-right: 5px;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background-color: #feffec;
  color: #E6A23C;
}
.el-menu-item-group__title{
  padding: 0;
}
</style>