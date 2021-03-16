<template>
  <div class="user-message">
    <h1>用 户 信 息 管 理</h1>
    <el-card shadow="hover">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%;font-size: 14px;">
        <el-table-column
          label="用户名"
          prop="name"
          width="100">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          width="120">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          width="180">
        </el-table-column>
        <el-table-column
          label="推送频率"
          prop="stockCount">
        </el-table-column>
        <el-table-column
          label="关注内容"
          prop="stockMessages"
          width="160"
          :formatter="Messagesformatter">
        </el-table-column>
        <el-table-column
          label="推送方式"
          prop="stockReminds"
          :formatter="Remindsformatter">
        </el-table-column>
        <el-table-column
          label="推送时间"
          prop="stockTime">
        </el-table-column>
        <el-table-column
          label="股票代码"
          prop="stockType">
        </el-table-column>
        <el-table-column
          align="right"
          width="180">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="输入用户名搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, tableData)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getUserInfo} from 'network/user'

export default {
  name: 'UserManage',
  data(){
    return {
      tableData: [], //取处理完后的最终结果
      data: [], //取初始结果
      message: '', //存关注内容
      search: '',
    }
  },
  mounted(){
    this.getUserInfo()
  },
  methods: {
    /**网络请求相关 */
    getUserInfo(){
      getUserInfo().then(res => {
        this.data = res.data
        this.handleData()
      });
    },
    /**对推送频率的转换 */
    handleData(){
      for(let i=0; i<this.data.length;i++){
        if(this.data[i].stockCount==="0"){
          this.data[i].stockCount = "每天两次"
        }
        else if (this.data[i].stockCount==="1"){
          this.data[i].stockCount = "每天一次"
        }
        else if (this.data[i].stockCount==="2"){
          this.data[i].stockCount = "每周3-5次"
        }
        else {
          this.data[i].stockCount = "每周1-2次"
        }
      }
      this.tableData = this.data
    },
    /**对关注内容的转换 */
    Messagesformatter(row, column,cellValue, index) {
      let arr = cellValue.split(',')
      for(let i=0; i<arr.length; i++){
        if(arr[i] == "0"){
          arr[i]="实时行情"
        }
        else if (arr[i] == "1"){
          arr[i]="股评/热帖"
        }
        else if (arr[i] == "2"){
          arr[i]="热股"
        }
        else {
          arr[i]="其他"
        }
      }
      let newArr = arr.join("、")
      return newArr
    },
    /**对推送方式的转换 */
    Remindsformatter(row, column,cellValue, index){
      let arr = cellValue.split(',')
      for(let i=0; i<arr.length; i++){
        if(arr[i] == "0"){
          arr[i]="短信"
        }
        else{
          arr[i]="邮箱"
        }
      }
      let newArr = arr.join("、")
      return newArr
    },
    handleDelete(index, row) {
      this.$confirm('您确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        row.splice(index, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消删除'
        });          
      });
    },
  }
}
</script>

<style>
.user-message{
  margin: 50px 150px;
}
.user-message h1{
  color: #E6A23C;
  text-align: center;
}
.user-message .el-input__inner:focus{
  border:1px solid #E6A23C;
}
</style>
