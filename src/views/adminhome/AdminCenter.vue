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
                <span>管理员名称：{{name}}</span>
              </article>
              <article class="message-detail">
                <i class="el-icon-phone"></i>
                <span>联系电话：13168597846</span>
              </article>
              <article class="message-detail">
                <i class="el-icon-s-custom"></i>
                <span>所属角色：普通管理员</span>
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
                <el-input v-model="adminName" placeholder="输入修改的名字"></el-input>
              </article>
              <article class="message-detail">
                <i class="el-icon-phone"></i>
                <span>您的电话：</span>
                <el-input v-model="adminPhone" placeholder="输入修改的电话"></el-input>
              </article>
            </div>
            <div class="update-button">
              <el-button type="warning" icon="el-icon-check" round></el-button>
              <el-button type="danger" icon="el-icon-delete" round></el-button>
            </div>
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
      activeName: 'first',
      imageUrl: '',
      name: localStorage.getItem('name'),
      adminName: '',
      adminPhone: ''
    }
  },
  methods:{
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
    }
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
.message-detail i {
  margin-right: 10px;
}
.update-message .message-detail .el-input__inner{
  margin-top: 10px;
  width: 80%;
}
.el-input__inner:focus{
  color: #E6A23C;
}
.update-button{
  position: relative;
  top: 60px;
}
.update-button button:nth-child(2){
  margin-left: 30px;
}
</style>
