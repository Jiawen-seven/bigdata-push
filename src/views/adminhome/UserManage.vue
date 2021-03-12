<template>
  <div class="user-message">
     <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      stripe
      style="width: 100%">
      <el-table-column
        fixed
        label="Name"
        prop="name">
      </el-table-column>
      <el-table-column
        label="Phone"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="Email"
        prop="email"
        width="180">
      </el-table-column>
      <el-table-column
        label="StockCount"
        prop="stockCount">
      </el-table-column>
      <el-table-column
        label="StockMessages"
        prop="stockMessages">
      </el-table-column>
      <el-table-column
        label="StockReminds"
        prop="stockReminds">
      </el-table-column>
      <el-table-column
        label="StockTime"
        prop="stockTime">
      </el-table-column>
      <el-table-column
        label="StockType"
        prop="stockType">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="right"
        width="180">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUserInfo} from 'network/user'

export default {
  name: 'UserManage',
  data(){
    return {
      tableData: [],
      data: [],
      search: ''
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
        this.tableData = this.handleData()
      });
    },
    handleData(){
      let data = this.data
      for(let i=0; i<data.length;i++){
        if(data[i].stockCount==="0"){
          data[i].stockCount = "每天两次"
        }
        else if (data[i].stockCount==="1"){
          data[i].stockCount = "每天一次"
        }
        else if (data[i].stockCount==="2"){
          data[i].stockCount = "每周3-5次"
        }
        else if (data[i].stockCount==="3"){
          data[i].stockCount = "每周1-2次"
        }
        for(let j = 0; j<data[i].stockMessages.length;j++){
          console.log(data[i].stockMessages[j])
          if(data[i].stockMessages[j]==="0"){
            data[i].stockMessages[j] = "实时行情"
          }
          else if(data[i].stockMessages[j]==="1"){
            data[i].stockMessages[j] = "股评/热帖"
          }
          else if(data[i].stockMessages[j]==="2"){
            data[i].stockMessages[j] = "热股"
          }
          else if(data[i].stockMessages[j]==="3"){
            data[i].stockMessages[j] = "其他"
          }
        }
      }
      return data
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  }
}
</script>

<style scoped>
.user-message{
  margin: 50px 150px;
}
</style>
