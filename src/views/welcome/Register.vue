<template>
  <div class="push_register">
    <div class="register-line">
      <i class="icon-line"></i>
      <i class="icon-line"></i>
    </div>
    <div class="register-icon">
      <i class="icon-back" @click="goBack()"></i>
      <img src="~assets/img/clip.png" alt="">
      <img src="~assets/img/clip.png" alt="">
    </div>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="top" class="push-registerForm">
      <div class="register-form">
        <div class="form-left">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerForm.name" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="registerForm.phone" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="您最关注的港股" prop="stockType">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="registerForm.stockType"
              :fetch-suggestions="querySearch"
              placeholder="请输入股票名称"
              @select="handleSelect"
              clearable
              style="width: 100%">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="num">{{ "股票代码：" + item.num }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
        </div>
        <div class="form-right">
          <el-form-item label="您平时会关注的股票信息" prop="stockMessage">
            <el-checkbox-group v-model="registerForm.stockMessage">
              <el-checkbox label="实时行情"></el-checkbox>
              <el-checkbox label="股评/热帖"></el-checkbox>
              <el-checkbox label="热股"></el-checkbox>
              <el-checkbox label="其他" @change="else_input()"></el-checkbox>
              <input v-show="isShow" class="else-input" type="text">
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="您平时的看股时间" prop="stockTime">
            <el-time-select
              v-model="registerForm.stockTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00'
              }"
              placeholder="请选择最常看的时间"
              style="width: 90%">
            </el-time-select>
          </el-form-item>
          <el-form-item label="您希望消息提醒的频率" prop="stockCount">
            <el-radio-group v-model="registerForm.stockCount" @change="getValue()" style="margin-bottom: -10px">
              <el-radio label="每天两次"></el-radio>
              <el-radio label="每天一次"></el-radio>
              <el-radio label="每周3-5次"></el-radio>
              <el-radio label="每周1-2次"></el-radio>
              <br/>
              <el-radio label="其他"></el-radio>
              <input v-show="ifShow" class="else-input" type="text" style="margin: -15px">
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您希望的提醒方式" prop="stockRemind">
            <el-checkbox-group v-model="registerForm.stockRemind">
              <el-checkbox label="短信"></el-checkbox>
              <el-checkbox label="邮箱"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <el-form-item style="display: flex; justify-content: flex-end">
        <span style="color: #888;">已有账号，<a href="/login">立即登录</a></span>
        <el-button type="warning" @click="submitForm('registerForm')" style="margin: 0 20px;">立即创建</el-button>
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
      isShow: false,
      ifShow: false,
      stocks: [],
      registerForm: {
        name: '',
        phone: '',
        password: '',
        email: '',
        stockType: '',
        stockMessage: [],
        stockTime:'',
        stockCount: '',
        stockRemind: []
      },
      rules: {
        name: [{ required: true, validator: validator.validateName, trigger: 'change' }],
        phone: [{ required: true, validator: validator.validatePhone, trigger: 'change' }],
        password: [{ required: true, validator: validator.validatePassword, trigger: 'change' }],
        email: [{ required: true, validator: validator.validateEmail, trigger: 'change' }],
        stockType: [{ required: true, message: '请输入您最关注的股票名', trigger: 'change' }],
        stockMessage: [{ type: 'array', required: true, message: '请至少选择一个股票信息', trigger: 'change' }],
        stockTime: [{ required: true, message: '请选择您最常看股的时间', trigger: 'change'}],
        stockCount: [{ required: true, message: '请选择消息提醒频率', trigger: 'change' }],
        stockRemind: [{ type: 'array', required: true, message: '请至少选择一个方式', trigger: 'change' }]
      },
    };
  },
  mounted() {
    this.stocks = this.loadAll();
  },
  methods: {
    goBack(){
      history.back()
    },
    else_input(){
      this.isShow = !this.isShow
    },
    getValue(){
      if(this.registerForm.stockCount == '其他'){
        this.ifShow = true
      } else {
        this.ifShow = false
      }
    },
    querySearch(queryString, cb) {
      var stocks = this.stocks;
      var results = queryString ? stocks.filter(this.createFilter(queryString)) : stocks;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (stock) => {
        return (stock.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" },
        { "value": "华亿金控", "num": "08123" }
      ];
    },
    handleSelect(item) {
      console.log(item);
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

<style>
.push_register{
  height: 100%;
  background-image: url('~assets/img/register_bg.png');
  background-size: cover;
  background-repeat:no-repeat;
}
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
.register-icon .icon-back{
  width: 60px;
  height: 50px;
  background-image: url('~assets/img/back.png');
  background-size: cover;
  background-repeat:no-repeat;
  position: absolute;
  top: -50px;
  right: 20px;
  cursor: pointer;
}
.register-icon img{
  width: 5%;
}
.push-registerForm{
  height: 65%;
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
.form-right .else-input{
  border: none;
  border-bottom: 1px solid #E6A23C;
  outline:none;
  margin-left: 10px;
  color: #606266;
}

/**针对输入框的样式 */
.form-left .el-input__inner:focus{
  border:1px solid #E6A23C;
}
.form-left .el-input{
  width: 90%;
}
.form-left .my-autocomplete li{
  line-height: normal;
  padding: 7px;
}
.form-left .my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.form-left .my-autocomplete li .num {
  font-size: 12px;
  color: #b4b4b4;
}

/**针对按钮的样式 */
.push-registerForm .el-button--default:hover,.el-button--default:focus{
  background-color: rgb(253,246,236);
  border-color: #E6A23C;
  color: #E6A23C;
}

/**针对多选框的样式 */
.form-right .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
background-color: #E6A23C;
border-color:  #E6A23C;
}
.form-right .el-checkbox__input.is-checked + .el-checkbox__label {
color: #E6A23C;
}
.form-right .el-checkbox__inner:hover{
  border-color: #E6A23C;
}
.form-right .el-checkbox__input.is-focus .el-checkbox__inner{
border-color: #E6A23C;
}
.form-right .el-checkbox-group{
  margin: -10px 0;
}

/**针对单选框的样式 */
.form-right .el-radio{
  margin-bottom: 20px;
}
.form-right .el-radio__input.is-checked + .el-radio__label {
  color: #E6A23C;
}
.form-right .el-radio__input.is-checked .el-radio__inner {
  background: #E6A23C;
  border-color:  #E6A23C;
}

/**针对a标签 */
.push-registerForm a:focus,.push-registerForm a:hover{
  color:rgb(231, 189, 125);
}
.push-registerForm a{
  color: #E6A23C;
  text-decoration: none;
}

</style>