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
        width="150">
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
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
        this.tableData = res.data
        console.log(res)
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>
.user-message{
  margin: 50px 150px;
}
</style>
