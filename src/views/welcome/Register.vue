<template>
  <div class="push_register">
    <div class="register-line">
      <i class="icon-line"></i>
      <i class="icon-line"></i>
    </div>
    <div class="register-icon">
      <img src="~assets/img/clip.png" alt="">
      <img src="~assets/img/clip.png" alt="">
    </div>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="top" class="push-registerForm">
      <div class="register-form">
        <div class="form-left">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </div>
        <div class="form-right">
          <el-form-item label="您平时会关注的股票信息" prop="stockMessage">
            <el-checkbox-group v-model="registerForm.stockMessage">
              <el-checkbox label="实时行情"></el-checkbox>
              <el-checkbox label="股评/热帖"></el-checkbox>
              <el-checkbox label="热股"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="您所关注的港股" prop="stockType">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 我的股票</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="submitForm('registerForm')">立即创建</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Pvideo from 'components/content/Video'
import * as validator from 'utils/validateRules'
export default {
  name: 'Register',
  components: {
    Pvideo
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      registerForm: {
        name: '',
        phone: '',
        password: '',
        email: '',
        stockType: '',
        stockMessage: []
      },
      rules: {
        name: [{ required: true, validator: validator.validateName, trigger: 'change' }],
        phone: [{ required: true, validator: validator.validatePhone, trigger: 'change' }],
        password: [{ required: true, validator: validator.validatePassword, trigger: 'change' }],
        email: [{ required: true, validator: validator.validateEmail, trigger: 'change' }],
        stockType: [{ required: true, message:'请至少输入一个您所关注股票', trigger: 'change' }]
      }
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.register-line,.register-icon{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.register-line .icon-line{
  background-color: black;
  width: 3px;
  height: 80px;
  margin: 0 47px -10px;
}
.register-icon{
  position: relative;
  z-index: 2;
}
.register-icon img{
  width: 5%;
}
.push-registerForm{
  height: 80%;
  width: 45%;
  border-radius: 30px;
  border: 2px solid #eee;
  box-shadow:0px 0px 20px -10px #888;
  position: relative;
  margin: -45px auto;
  padding: 70px;
}
.register-form{
  display: flex;
  justify-content: space-between;
}
.register-form .form-left,.register-form .form-right{
  width: 40%;
}
.el-button--default:hover,.el-button--default:focus{
  background-color: rgb(253,246,236);
  border-color: #E6A23C;
  color: #E6A23C;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>