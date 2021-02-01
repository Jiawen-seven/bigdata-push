<template>
  <div class="push_login">
    <i class="icon-back" @click="goBack()"></i>
    <span class="push-title">金融大数据分析与智能推送系统</span>
    <div class="login_form">
      <div class="login_title">
        账号密码登录
      </div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="push_loginForm">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <span>没有账号。立即注册</span>
        <span>忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        account: '',
        pass: '',
      },
      rules: {
        account: [{validator: validateAccount, trigger: 'change'}],
        pass: [{ validator: validatePass, trigger: 'change' }],
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/index')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.push_login{
  height: 100%;
  background-image: url('~assets/img/login_bg.jpg');
  background-size: cover;
  background-repeat:no-repeat;
  position: relative;
}
.push_login .icon-back{
  width: 60px;
  height: 50px;
  background-image: url('~assets/img/back.png');
  background-size: cover;
  background-repeat:no-repeat;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.push_login .push-title{
  display: flex;
  justify-content: center;
  font-size: 50px;
  letter-spacing: 4px;
  padding: 50px;
  color: #E6A23C;
}
.push_login .login_form{
  width: 360px;
  height: 400px;
  border-radius: 30px;
  border: 2px solid #eee;
  box-shadow:0px 0px 20px -10px #888;
  position: relative;
  margin: 50px auto;
  padding: 50px 60px;
}
.login_form .login_title{
  font-weight: bold;
  font-size: 24px;
  color: #E6A23C;
  margin-bottom: 40px;
}
/**针对输入框的样式 */
.el-input__inner:focus{
  border:1px solid #E6A23C;
}
.el-input__inner{
  height: 50px;
}
.el-button{
  width: 100%;
  margin: 20px 0 0;
}
</style>