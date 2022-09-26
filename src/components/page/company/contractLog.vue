<!-- 我的 -->
<template>
  <div class="padding">
       
      <el-card class="bg-white ">
        <div slot="header"  class="clearfix">
          <span>账户管理</span>
        </div>
         <div>
           <el-form label-width="120px" :model="model" ref="postForm" :inline="true" @submit.native.prevent @keyup.enter.native="doSearch(1)">
            <div class="herderFlex">
              <el-form-item label="账号操作时间" prop="createTime">
                <date-range-picker value-format="yyyy-MM-dd"  v-model="model.createTime" class="date-item" />
                <!-- <el-cascader filterable :options="optionData" v-model="model.enterpriseCode" :props="props" @change="$refs.elcascader.dropDownVisible = false" ref="elcascader" expand-trigger="hover" style="width:100%;"> </el-cascader> -->
              </el-form-item>
              <el-form-item label="合同名称" prop="contractName">
                <el-input placeholder="请输入合同名称" v-model="model.contractName"></el-input>
              </el-form-item>
              
              
            </div>
            <div class="herderFlexFooter">
              <el-button size="small" @click="doSearch(model.pageNum = 1)" icon="el-icon-search" type="primary">查询</el-button>
              <el-button size="small" icon="el-icon-refresh" type="info" @click="resetForm">重置</el-button>
              <el-button size="small" @click="export2()" icon="el-icon-search" type="primary">导出</el-button>
            </div>
          </el-form>
         </div>
      </el-card>
           
            
      <el-card class=" bg-white margin-top">
        
        <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;" @selection-change="selectionChangeHandler">
          <el-table-column  prop="contract" label="合同" />
          <el-table-column  prop="useName" label="成员">
            <template slot-scope="scope">
              <!-- <p>{{scope.row.useName}}</p> -->
              <p>{{scope.row.useMember}}</p>
            </template>
          </el-table-column>
          <el-table-column  prop="createTime" label="日期" />
          <el-table-column  prop="useIp" label="登录IP" />
          <el-table-column  prop="remark" label="详情" />
      </el-table>
      <el-pagination
              :current-page.sync="model.pageNum"
              background
              layout="total,prev,pager,next,jumper"
              :total="pageTotal"
              :page-size="model.pageSize"
              @current-change="doSearch"
          >
          </el-pagination>
    </el-card>
          
        
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
import {findContractLog,exportContractLog} from '../../../api/log'
 
import {getDentify} from '@/utils/auth';
 
export default {
  components: { DateRangePicker,Treeselect },
  data() {
    return {
      deptName:"",
      pageTotal:0,
      loading:false,
      selections:[],
      list:[],
      roleList:[
        
      ],
      form:"",
      roleActive:1,
      getDentify:{},
 
      model: {
        contractName: '',
        startTime: '',
        endTime: '',
        createTime:[],
        pageNum: 1,
        pageSize: 10
      }
    };
  },
    created(){
      this.doSearch();
      this.getDentify = getDentify();
 
        
    },
    methods: {
      async doSearch(value) {
         value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
          if(!this.model.createTime){
            this.model.createTime = [];
          }
         let formData = JSON.parse(JSON.stringify(this.model))
        if (formData.createTime.length != 0) {
          formData.startTime = formData.createTime[0]
          formData.endTime = formData.createTime[1]
        } else {
          formData.startTime = ''
          formData.endTime = ''
        }
        delete formData.createTime
        console.log(formData)
        let {data}  = await findContractLog(formData);
        this.list = data.list
        this.pageTotal = data.total
      },
      async export2(){
         if(!this.model.createTime){
            this.model.createTime = [];
          }
        let formData = JSON.parse(JSON.stringify(this.model))
        if (formData.createTime.length != 0) {
          formData.startTime = formData.createTime[0]
          formData.endTime = formData.createTime[1]
        } else {
          formData.startTime = ''
          formData.endTime = ''
        }
        delete formData.createTime;
        let str =""
        console.log(formData)
        for(let i in formData){
          console.log(formData[i])
          if(formData[i]){
            str+="&"+i+"="+encodeURI(formData[i])
            
          }
        }
        exportContractLog(str)
          console.log(str)
        },
        checkboxT(row, rowIndex) {
          return row.id !== 1
        },
        selectionChangeHandler(val){
          this.selections = val
        },
        handleNodeClick(data) {
          console.log(data);
        },
        resetForm(){
          this.$nextTick(()=>{

            this.$refs['postForm'].resetFields()
          })
        }, 
      }
}

</script>
<style lang="less">
.role-list{
  margin-top:10px;
  li{
    height:32px;
    line-height: 32px;
    padding:0 20px;
    
  } 
  .active{
    background-color: #edf6ff;
    color:#228FFE;
  }
}
</style>