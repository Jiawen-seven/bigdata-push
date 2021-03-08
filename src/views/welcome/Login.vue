<template>
  <div class="push_login">
    <i class="icon-back" @click="goBack()"></i>
    <span class="push-title">金融大数据分析与智能推送系统</span>
    <div class="login_form">
      <div class="login_title">
        <span v-show="isShow">账号密码登录</span>
        <span v-show="!isShow">找回密码</span>
      </div>
      <el-form v-show="isShow" :model="loginForm" status-icon :rules="rules" ref="loginForm" class="push_loginForm">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" placeholder="请输入用户名" clearable @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" clearable @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码" clearable @keyup.enter.native="submitForm('loginForm')">
            <template slot="append">
              <img :src="`data:image/png;base64,`+ loginForm.image" alt="" class="code-img" @click="refreshImg">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="submitForm('loginForm')">登 录</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="!isShow" :model="forgetForm" status-icon :rules="rules" ref="forgetForm" class="push_loginForm">
        <el-form-item prop="phone">
          <el-input type="text" v-model="forgetForm.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="forgetForm.password" placeholder="请输入新密码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="newpassword">
          <el-input type="password" v-model="forgetForm.newpassword" placeholder="请再次输入新密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="searchForm('forgetForm')">找 回</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <span v-show="isShow">没有账号，<a href="/register">立即注册</a></span>
        <a v-show="isShow" @click="forget()">忘记密码？</a>
        <span v-show="!isShow" />
        <a v-show="!isShow" @click="forget()">返回登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import * as validator from 'utils/validateRules'
import { getLoginCore, postLoginData } from 'network/login'
import { setToken, removeToken } from 'utils/auth'

export default {
  name: 'Login',
  data () {
    const validatePasswordAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forgetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isShow: true,
      loginForm: {
        account: '',
        password: '',
        code: '',
        image:'', //验证码图片
        uuid:'', //验证时的uuid
      },
      forgetForm: {
        phone: '',
        password: '',
        newpassword: ''
      },
      rules: {
        account: [{validator: validator.validateAccount, trigger: 'change'}],
        phone: [{validator: validator.validatePhone, trigger: 'change'}],
        password: [{ validator: validator.validatePassword, trigger: 'change' }],
        newpassword: [{ validator: validatePasswordAgain, trigger: 'change' }],
        code: [{ message: '验证码不能为空！', trigger: 'change' }]
      },
    }
  },
  methods: {
    //网络请求的相关方法
    getLoginCore(){
      getLoginCore().then(res => {
        // console.log(res)
        this.loginForm.image = res.img;
        this.loginForm.uuid = res.uuid;
      })
    },
    postLoginData(){
      postLoginData(this.loginForm.account,this.loginForm.password,this.loginForm.code,this.loginForm.uuid).then(res=> {
        // console.log(res)
        if(res.code == 200 && res.flag == "user"){
          setToken(res.token);
          localStorage.setItem('name',this.loginForm.account);
          localStorage.setItem('flag',res.flag);
          this.$message({
            type: 'success',
            message: '亲爱的'+`${this.loginForm.account}`+'用户，欢迎您！'
          })
          this.$router.push('/userhome');
        }
        else if (res.code == 200 && res.flag == "system"){
          setToken(res.token);
          localStorage.setItem('name',this.loginForm.account);
          localStorage.setItem('flag',res.flag);
          this.$message({
            type: 'success',
            message: `${this.loginForm.account}`+'管理员，欢迎您！'
          })
          this.$router.push('/adminhome');
        }
        else{
          this.$message({
            type: 'error',
            message: res.msg
          })
          if(res.msg == "用户不存在/密码错误"){
            this.loginForm.account = '';
            this.loginForm.password = '';
          }
          else {
            this.loginForm.code = ''
            removeToken()
            this.getLoginCore()
          }
        }
      })
    },

    //普通方法
    goBack(){
      this.$router.push('/index');
    },
    refreshImg(){
      this.getLoginCore()
    },
    forget(){
      this.isShow = !this.isShow;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postLoginData()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted(){
    this.getLoginCore()
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
.login_form .login-footer{
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #888;
}
.login_form .login-footer a{
  text-decoration: none;
  color: #E6A23C;
  cursor: pointer;
}
.login_form .login-footer a:focus,.login_form .login-footer a:hover{
  color:rgb(231, 189, 125);
}
/**针对输入框的样式 */
.push_loginForm .el-input__inner:focus{
  border:1px solid #E6A23C;
}
.push_loginForm .el-input__inner{
  height: 45px;
}
.push_loginForm .code-img{
  height: 45px;
  cursor: pointer;
}
.push_loginForm .el-button{
  width: 100%;
  height: 45px;
  margin: 10px 0 0;
}
.push_loginForm .el-input-group__append{
  background-color: #FFFFFF;
  color: #FFFFFF;
  border: none;
  padding: 0 0 0 10px;
}
</style>