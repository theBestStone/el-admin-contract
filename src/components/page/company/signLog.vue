<!-- 我的 -->
<template>
  <div class="padding">
       
      <el-card class="bg-white ">
        <div slot="header"  class="clearfix">
          <span>印章操作日志</span>
        </div>
         <div>
           <el-form label-width="120px" :model="model" ref="postForm" :inline="true" @submit.native.prevent @keyup.enter.native="doSearch(1)">
            <div class="herderFlex">
              <el-form-item label="印章名称" prop="sealId">
                <el-select  v-model="model.sealId" placeholder="请选择印章名称">
                  <el-option v-for="(item,index) in sealList" :key="index" :label="item.sealName" :value="item.id"></el-option>
                   
                </el-select>
              </el-form-item>
              
              <el-form-item label="操作员" prop="useName">
                <el-input placeholder="请输入操作员" v-model="model.useName"></el-input>
              </el-form-item>
              <el-form-item label="印章操作时间" prop="createTime">
                <date-range-picker v-model="model.createTime" class="date-item" />
                <!-- <el-cascader filterable :options="optionData" v-model="model.enterpriseCode" :props="props" @change="$refs.elcascader.dropDownVisible = false" ref="elcascader" expand-trigger="hover" style="width:100%;"> </el-cascader> -->
              </el-form-item>
              <el-form-item label="签署文件名称" prop="fileName">
                <el-input placeholder="请输入签署文件名称" v-model="model.fileName"></el-input>
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
           
          <el-table-column  prop="sealName" label="印章名称" />
          <el-table-column  prop="sealNo" label="印章ID" />
          <el-table-column  prop="useMember" label="操作成员" />
          <el-table-column  prop="useDepartName" label="成员归属部门" />
          <el-table-column  prop="createTime" label="印章使用日期" />
          <el-table-column  prop="useIp" label="登录IP" />
          <el-table-column  prop="fileName" label="签署文件名称" />
          
      
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
import {findSignLog,exportSignLog} from '../../../api/log'
import {entSealList} from '../../../api/signatureManage.js';
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
      sealList:[],
      model: {
        sealId: '',
        useName: '',
        fileName: '',
        startTime: '',
        endTime: '',
        createTime:"",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
    created(){
      this.doSearch();
      this.getDentify = getDentify();

      this.entSealList();
        
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
        let {data}  = await findSignLog(formData);
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
        for(let i in formData){
          console.log(formData[i])
          if(formData[i]){
            str+="&"+i+"="+encodeURI(formData[i])
            
          }
        }
        exportSignLog(str)
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
      async entSealList(){
        
          let {data}= await entSealList({eid:this.getDentify.orgId});
          
          this.sealList = data;
          console.log(data,'sealList')
        }
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