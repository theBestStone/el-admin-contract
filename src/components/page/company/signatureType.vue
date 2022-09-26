<!-- 我的 -->
<template>
  <div class="fullheight">
       <!-- <div class="cf margin-sm bg-white text-xl text-bold">
          <div class="fl margin-sm margin-left">印章类型</div>
      </div> -->
        <el-card class="margin-sm fullcard">
        <div class="cf text-xl text-bold bordertitle">
            <div class="fl">印章类型</div>
        </div>
          
          <div class="typebar">
            <div class="barInfo">
              <i class="el-icon-question" style="font-size: 18px"></i><span> 企业印章较多时，需对印章进行分类管理；印章管理员可为单个印章做类型标记，有助于印章筛选及分析。</span>
            </div>
            <el-button type="primary" size="mini" style="line-height: 25px; height: 25px; padding:0 15px; margin-top: 25px;" @click="showModel('add')">新增类型</el-button>
          </div>
          <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;">
            
            <el-table-column label="序号" type="index" width="50"> </el-table-column>
            <el-table-column  prop="sealTypeName" label="印章类型名称" />
            <el-table-column  prop="sealTypeExplain" label="印章类型说明" />
            <el-table-column  prop="createTime" label="创建时间" />
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.eid != 0" size="mini" @click="showModel('edit',scope.row)">编辑</el-button>
                    <span v-if="scope.row.eid != 0" class="margin-left-xs margin-right-xs">|</span>
                    <el-button type="text" v-if="scope.row.eid != 0" size="mini" @click="del(scope.row)">删除</el-button>
                    <span v-if="scope.row.eid == 0">--</span>
                </template>
            </el-table-column>
            
        
        </el-table>
        <!-- <el-pagination
                :current-page.sync="model.pageNum"
                background
                layout="total,prev,pager,next,jumper"
                :total="pageTotal"
                :page-size="model.pageSize"
                @current-change="doSearch"
            >
            </el-pagination> -->
        </el-card>
      <el-dialog :title="modelTitle + '印章类型'" :visible.sync="editmodelVis" v-dialogDrag width="500px">
          <el-form :model="model" ref="model" label-width="80px">
              
              <el-form-item label="印章类型" prop="sealTypeName" verify>
                  <el-input placeholder="请输入印章类型名称" v-model="model.sealTypeName" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="类型说明"  prop="sealTypeExplain">
                <el-input type="textarea" :rows="4" placeholder="请输入印章类型说明" v-model="model.sealTypeExplain"></el-input>
              </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer text-center">
              <el-button @click="editmodelVis = false">取 消</el-button>
              <el-button type="primary" @click="dosaveform">保存</el-button>
          </div>
      </el-dialog>
      
          
        
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
// import {findSignLog,exportSignLog} from '../../../api/log'
import {findSealTypeList,addSealType,editSealType,delSealType} from '../../../api/signatureType.js';
import {parseTime} from '@/utils/index';
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
      model:{
        sealTypeName:'',
        sealTypeExplain:'',
        id:''
      },
      modelTitle:'',
      editmodelVis:false
    };
  },
    created(){
      // this.doSearch();
      this.getDentify = getDentify();

      this.getTypeList();  
        
    },
    methods: {
      async getTypeList(){
        this.loading = true
        let {data}= await findSealTypeList({});
        this.loading = false
        this.list = data;
        this.list.map((item)=>{ 
          item.createTime = parseTime(item.createTime)
        })
      },
      showModel(type,row){
        console.log(type)
        if(type == 'add'){

          this.editmodelVis = true;
          this.modelTitle = '新建'
          this.model.id = ''
          this.model.sealTypeName = ''
          this.model.sealTypeExplain = ''
          this.$nextTick(() => {
            this.$refs.model.resetFields();
            this.$forceUpdate()
          });
        } else if(type == 'edit'){
          this.editmodelVis = true;
          this.modelTitle = '编辑'
          this.model.sealTypeName = row.sealTypeName;
          this.model.sealTypeExplain = row.sealTypeExplain;
          this.model.id = row.id.toString()

        }
      },
      async dosaveform(){
        this.$refs.model.validate(async valid => {
          if(valid){
            if(this.modelTitle == '新建'){
              let {data}= await addSealType(this.model);
            this.$message.success('新建成功');
            } else{
               let {data}= await editSealType(this.model);
            this.$message.success('保存成功');
            }
            this.editmodelVis = false;
            this.getTypeList()
          }
        })
      },
      async del(row){
        this.$confirm('您确认要删除印章类型吗？印章类型删除后将无法恢复', '删除印章类型', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            let { data } = await delSealType({ id: row.id.toString()});
            this.$message.success('删除成功');
            this.getTypeList()
        })
        .catch(() => {});
      }
    }
}

</script>
<style lang="less">
.typebar{
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  .barInfo{
    flex-grow: 1;
    border-radius: 5px;
    margin-right: 15px;
    margin-top: 20px;
    background: #E2EDFF;
    padding:0 10px;
    height: 38px;
    line-height: 38px;
    color: #1257FF ;
  }
}
</style>