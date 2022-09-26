<!--  -->
<template>
  <div style="height:100%">
    <div class="content90" style="height:100%">
      <el-row :gutter="20" class="margin-top" style="height:100%">
        <el-col :span="4" style="height:100%">
          <el-card style="height:100%">
            <div>
                <ul class="title-ul">
                  <li   class="active" >{{dentify.orgId==0?'个人文件模板':'企业文件模板'}} <i class="el-icon-arrow-right margin-left"></i></li>
                </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="20">
          <el-card class="bg-white ">
            <div>
              <el-form class="cf" label-width="90px" :inline="true" @submit.native.prevent @keyup.enter.native="doSearch(1)">
                <div class="fl">
                  
                  <el-button size="small" v-if="checkPer(['admin','permission:addTemplate'])" type="primary" @click="doAdd()">新增模板</el-button>
                </div>
                <div class="herderFlex fr" style="width:400px;">
                
                    <el-input style="width:280px;" placeholder="请输入模板名称搜索" v-model="model.templateName" clearable></el-input><el-button size="small" @click="doSearch(model.pageNum = 1)" icon="el-icon-search" type="primary">查询</el-button>
                 
                  
                  
                </div>
                
              </el-form>
            </div>
          </el-card>
              
                
          <el-card class=" bg-white margin-top">
            
            <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;" @selection-change="selectionChangeHandler">
              
              <el-table-column :show-overflow-tooltip="true" prop="templateName" label="模版名称" />
              <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
              <el-table-column :show-overflow-tooltip="true" prop="username" label="流程状态">
                <template slot-scope="scope">
                  <el-switch
                    v-if="scope.row.status!==0"
                    :disabled="!checkPer(['admin','permission:editTemplate'])"
                    :value="scope.row.status"
                    :active-value="2"
                    :inactive-value="1"
                    @change="changeSwitch(scope.row)"
                  >
                  </el-switch>
                  <span  v-if="scope.row.status==1">已停用</span>
                  <span  v-if="scope.row.status==2">已启用</span>
                   <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
                    <!--  <el-tag type="primary" v-if="scope.row.status==1">完成</el-tag>                      -->
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="300px"
                align="left"
              >
                <template slot-scope="scope">
                  <!-- scope.row.status!=1&& -->
                  <!-- <el-button type="text" size="mini" @click="edit(scope.row,-1)">查看</el-button> -->
                  <el-button v-if="scope.row.status!==0"  type="text" size="mini" @click="edit(scope.row,2)">使用</el-button>
                  <el-button  type="text" v-if="checkPer(['admin','permission:editTemplate'])"  size="mini" @click="edit(scope.row,1)">编辑</el-button>
                  <el-button  type="text" v-if="checkPer(['admin','permission:duplicateTemplate'])"  size="mini" @click="copys(scope.row,1)">复制</el-button>
                  <el-button  type="text" size="mini" v-if="checkPer(['admin','permission:deleteTemplate'])" @click="del(scope.row,1)">删除</el-button>
                  <!-- <el-button  type="text" size="mini" @click="del(scope.row,1)">删除</el-button> -->
                </template>
              </el-table-column>
            
              
          
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
import { templateList,duplicateTemplate,deleteTemplate, startUsingTemplate } from '../../../api/template.js';
 import {getDentify} from '@/utils/auth';
export default {
  components: { DateRangePicker,Treeselect },
  data() {
    return {
      deptName:"",
      dentify:{},
      loading:false,
      selections:[],
      list:[],
      titleList:[{
        name:"个人文件模板",
        id:0,
        perid:0
      },{
        name:"企业文件模板",
        id:1
      }],
      roleList:[
        {id:1,name:"管理员"},
        {id:2,name:"管理员3"},
        {id:3,name:"管理员4"}
      ],
      titleActive:0,
      model: {
        entId:"",
        pageNum: 1,
        pageSize: 10,
        templateName:""
      },
      pageTotal:0
    };
  },
    methods: {
      // 修改模版流程状态
      async changeSwitch (row) {
        console.log(row, 11111);
        let {data} = await startUsingTemplate({templateNo: row.templateNo, status: row.status === 2? 1 : 2});
        if ( row.status === 2) {
          this.$message.warning('模版已停用')
        } else {
          this.$message.success('模版启用成功')
        }
        this.doSearch(1);
      },
      doAdd(){
        // this.$store.dispatch('setTempId', '');
        // this.$store.dispatch('setTempType', 0);
        this.$router.push({path:'/template/newTemplate',query:{
          tempId:'',
          tempType:0
        }})
      },
      edit(row,type){
        
        // this.$store.dispatch('setTempId', row.id);
        // this.$store.dispatch('setTempType', type);
        // this.$store.dispatch('setContId', "");
          let obj = {
            contId:'',
            tempId:row.templateNo,
            tempType:type,
            myname:'template'
          }
          if(type==2){
            if (row.status === 1) {
              this.$message({
                message: '当前模版还未启用,请启用后再使用模版',
                type: 'warning'
              });
            } else {
              this.$router.push({path:'/contract/newContract',query:obj})
            }
          }else{
            if (type === 1 && row.status === 2) {
              this.$message({
                message: '当前模版正在使用中,请停用后再进行编辑',
                type: 'warning'
              });
            } else {
              this.$router.push({path:'/template/newTemplate',query:obj})
            }
          }
      },
      netType(index){
        this.titleActive = index;
        if(index==1){
          this.model.entId = this.dentify.orgId;
        }else{
          this.model.entId = ""
        }
        this.doSearch();
      },
      async doSearch(value) {
        value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
        let {data}  = await templateList(this.model);
        this.list = data.list
        this.pageTotal = data.total
      },
      async del(row){
        this.$confirm('确认删除模板?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            let { data } = await deleteTemplate({ templateNo: row.templateNo });
            this.$message.success('删除成功');
            this.doSearch(1);
        })
        .catch(() => {});
      },
      async copys(row){
        let {data} = await duplicateTemplate({templateNo:row.templateNo});
        this.$message.success("复制成功")
        this.doSearch();
      },
      checkboxT(row, rowIndex) {
        return row.id !== 1
      },
      selectionChangeHandler(val){
        this.selections = val
      },
      handleNodeClick(data) {
        console.log(data);
      }
    },
    created(){
       let obj = { orgName: '未实名', orgId: 0 };
        let dentify =  getDentify();
        if(dentify){
            this.dentify = getDentify(); 
        }else{
            this.dentify =obj;
        }
       
      if(this.dentify.orgId!=0){
        this.model.entId = this.dentify.orgId;
      }else{
        this.model.entId = ""
      }
       
       this.doSearch();
    }
}

</script>
<style lang="less">

</style>