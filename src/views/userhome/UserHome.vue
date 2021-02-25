<template>
  <div class="user-home">
    我是用户主页
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
import { removeToken } from 'utils/auth'
import { getLoginOut } from 'network/login'

export default {
  name: 'UserHome',
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

<style scoped>

</style>