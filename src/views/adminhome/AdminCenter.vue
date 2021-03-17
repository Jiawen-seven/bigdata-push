<template>
  <div class="admin-center">
    <h2>
      <i class="el-icon-postcard"></i>
      <span>个人中心</span>
    </h2>
    <el-card class="box-card">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="个人信息" name="first">
          <div class="card-message">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="person-message">
              <article class="message-detail">
                <i class="el-icon-user"></i>
                <span>管理员：{{name}}</span>
              </article>
              <article class="message-detail">
                <i class="el-icon-phone"></i>
                <span>电话：{{phone}}</span>
              </article>
              <article class="message-detail">
                <i class="el-icon-s-custom"></i>
                <span>角色：{{remark}}</span>
              </article>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="second">
          <div class="card-message">
            <div class="update-message">
              <article class="message-detail">
                <i class="el-icon-user"></i>
                <span>您的姓名：</span>
                <el-input v-model="adminName" placeholder="请输入修改的名字" clearable></el-input>
              </article>
              <article class="message-detail">
                <i class="el-icon-phone"></i>
                <span>您的手机：</span>
                <el-input v-model="adminPhone" placeholder="请输入修改的电话" clearable></el-input>
              </article>
            </div>
            <div class="update-button">
              <el-button type="warning" plain @click="modifyMessage()">修 改</el-button>
              <el-button type="danger" plain @click="clear()">重 置</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="three">
          <div class="card-message">
            <div class="update-password">
              <article class="message-detail">
                <i class="el-icon-phone-outline"></i>
                <span>您的手机号：</span>
                <el-input v-model="adminPhone1" placeholder="请输入手机号" clearable></el-input>
              </article>
              <article class="message-detail">
                <i class="el-icon-lock"></i>
                <span>您的新密码：</span>
                <el-input v-model="adminPassword" placeholder="请输入新密码" clearable></el-input>
              </article>
              <article class="message-detail">
                <i class="el-icon-key"></i>
                <span>再次输入新密码：</span>
                <el-input v-model="adminPassword1" placeholder="请再次输入新密码" clearable></el-input>
              </article>
            </div>
            <div class="update-button">
              <el-button type="warning" plain @click="modifyPassword()">修 改</el-button>
              <el-button type="danger" plain @click="clear()">重 置</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {getPersonInfo} from 'network/user';
import { getLoginOut, getPassword } from 'network/login';
import { removeToken } from 'utils/auth';

export default {
  name: 'AdminCenter',
  data(){
    return{
      activeName: 'first',
      imageUrl: '',
      name: '',
      phone:'',
      remark:'',
      adminName: '',
      adminPhone: '',
      adminPhone1: '',
      adminPassword: '',
      adminPassword1: ''
    }
  },
  mounted(){
    this.getPersonInfo()
  },
  methods:{
    /**上传头像相关的函数 */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    /**修改信息和修改密码相关函数 */
    modifyMessage(){
      if(this.adminName == '' && this.adminPhone == ''){
        this.$message.error('您无修改的内容！')
      }
      else if (this.adminName !='' && this.adminPhone == ''){
        this.$message.success('您已成功修改姓名！')
      }
      else if (this.adminName == '' && this.adminPhone != ''){
        this.$message.success('您已成功修改手机号！')
      }
      else{
        this.$message.success('您已成功修改姓名和手机号！')
      }
    },
    modifyPassword(){
      if(this.adminPhone1 == ''){
        this.$message.error('手机号不能为空！')
      }
      else if (this.adminPassword ==''){
        this.$message.error('新密码不能为空！')
      }
      else if (this.adminPassword1 == ''){
        this.$message.error('请再次输入新密码！')
      }
      else if (this.adminPassword != this.adminPassword1){
        this.$message.error('您输入的两次密码不一致！')
      }
      else{
        this.getPassword()
      }
    },
    clear(){
      this.adminName = ''
      this.adminPhone = ''
      this.adminPhone1 = ''
      this.adminPassword = ''
      this.adminPassword1 = ''
    },

    //网络请求相关方法
    getPersonInfo(){
      getPersonInfo().then(res => {
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.remark = res.data.remark;
      })
    },
    getLoginOut(){
      getLoginOut().then(res =>{
        console.log(res)
      })
    },
    getPassword(){
      getPassword(this.adminPhone1,this.adminPassword).then(res => {
        console.log(res)
        if(res.code == 200){
          this.$notify({
            title: '成功',
            message: '重置密码成功，请重新登录！',
            type: 'success'
          });
          localStorage.removeItem('name')
          localStorage.removeItem('flag')
          removeToken()//本地cookie中的token
          this.getLoginOut()//后端中的token
          this.$router.push('/login')
        }
        else{
          this.$notify.error({
            title: '失败',
            message: '对不起，您输入的手机号有误！'
          });
        }
      })
    },
  }
}
</script>

<style>
.admin-center h2{
  margin:50px 0 70px;
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
.box-card .card-message{
  height: 250px;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #E6A23C;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.person-message .message-detail, .update-message .message-detail{
  margin-bottom: 30px;
}
.update-password .message-detail{
  margin-bottom: 10px;
}
.message-detail i {
  margin-right: 10px;
}
.update-message .message-detail .el-input__inner,.update-password .message-detail .el-input__inner{
  margin-top: 5px;
  width: 80%;
}
.card-message .el-input__inner:focus{
  border:1px solid #E6A23C;
}
.update-button{
  position: relative;
  top: 60px;
}
.update-button button:nth-child(2){
  margin-left: 30px;
}
</style>
