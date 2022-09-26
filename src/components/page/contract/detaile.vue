<!-- 我的 -->
<template>
  <div class="padding content90">
       
      <el-card class="bg-white ">
        <div slot="header"  class="clearfix">
          <span>文件信息</span>
          <div class="fr">
            <el-button @click="back" >返回</el-button>
            <el-button type="primary" v-if="checkPer(['admin','permission:downFile'])&&tempInfo.status==10" @click="downloadContractFiles">下载文件</el-button>
            <el-button type="primary" @click="view">预览文件</el-button>
          </div>
        </div>
         <div>
           <el-row :gutter="20">
             <el-col :span="12" class="cf margin-tb" v-for="item in contentArr" :key="item.name">
               <div class="fl file-title">{{item.name}}</div>
               <div class="fl file-content">
                 <span v-if="item.value=='status'">
                   <el-tag type="info" v-if="item.content==0">草稿</el-tag>
                    <el-tag v-if="item.content==1">待我签</el-tag>
                    <el-tag type="warning" v-if="item.content==2">待他签</el-tag>
                    <el-tag type="danger" v-if="item.content==3">撤销</el-tag>
                    <el-tag type="danger" v-if="item.content==4">拒签</el-tag>
                    <el-tag type="danger" v-if="item.content==5">作废</el-tag>
                    <el-tag type="danger" v-if="item.content==7">过期</el-tag>
                    <el-tag type="success" v-if="item.content==10">完成</el-tag></span>
                 <span v-else>{{item.content}}</span>
                 

               </div>
             </el-col>
             
           </el-row>
         </div>
      </el-card>
           
            
      <el-card class=" bg-white margin-top">
         <div slot="header"  class="clearfix">
          <span>签约方</span>
           <span class="text-blue margin-left-sm">（{{tempInfo.signType==0?'顺序签署':'无序签署'}}）</span>
        </div>
        <el-table ref="table"  :data="list" style="width: 100%;" @selection-change="selectionChangeHandler">
           
          <el-table-column  prop="status" label="签署状态" >
           <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
                    <el-tag v-if="scope.row.status==1">待签署</el-tag>
                    <el-tag type="warning" v-if="scope.row.status==2">待他签</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==3">撤销</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==4">拒签</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==5">作废</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==7">已过期</el-tag>
                    <el-tag type="success" v-if="scope.row.status==10">完成</el-tag>
                </template>
          </el-table-column>
          <el-table-column  prop="orgName" label="签约方">
            <template slot-scope="scope">
                <span v-if="scope.row.type==2">{{scope.row.orgName}}</span>
                <span v-if="scope.row.type==1">{{scope.row.name}}</span>
            </template>

          </el-table-column>
          <el-table-column  prop="account" label="账号" />
          <el-table-column  prop="signTime" label="签约时间" />
          <el-table-column  prop="truncateRemark" label="备注" />
       
          
      
      </el-table>
    </el-card>
          
        
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
import { saveDraftContract,findContract,saveContract,myPlayer,sign,downloadContractFiles} from '../../../api/contract.js';
export default {
  components: { DateRangePicker,Treeselect },
  data() {
    return {
      tempInfo:{},
      contentArr:[
        {name:"文件名称",value:"contractName",content:""},
        {name:"发起时间",value:"initiatorTime",content:""},
        {name:"文件编号",value:"contractNo",content:""},
        {name:"截止时间",value:"deadLine",content:""},
        {name:"发起方",value:"initiatorName",content:""},
        {name:"文件状态",value:"status",content:""},
        // {name:"签署时间",value:"value7",content:""},
      ],
      model:{
        value1:"",
        value2:"",
        value3:"",
        value4:"",
        value5:"",
        value6:"",
        value7:"",
      },
      list:[],
      contId:""
      
    };
  },
  created(){
    this.getId();
      if(!this.contId){
        this.$router.push({path:'/contract'});
        return false;
    }
    this.getById();
  },
    methods: {
      back(){
          // this.$router.go(-1)//返回上一层
          this.$router.push({ path: '/contract' });
      },
      getId(tag) {
          this.contId =this.$route.query.contId;// this.$store.getters.contId;
          if(!this.contId){
            this.back();
          }
      },
      async getById(){
          let {data} = await findContract({contractNo:this.contId})
          
          
          this.tempInfo = JSON.parse(JSON.stringify(data));
          this.contentArr.forEach(item=>{
            item.content = data[item.value]
          })
          let arr = [];
          data.players.forEach(item=>{
            if(item.type!=3){
              arr.push(item)
            }
          })
          this.list =arr;
           
      }, 
      async downloadContractFiles() {
    
         downloadContractFiles({contractNo:this.contId})
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
      view(){
        // this.$store.dispatch('setContId', this.contId);
        // this.$store.dispatch('setTempId', "");
        // this.$store.dispatch('setTempType', 0);
        this.$router.push({path:'/contract/signContract',query: {
              contId:this.contId,
              tempId:'',
              tempType:0
          }})
      }
    }
}

</script>
<style lang="less">
 
.file-title{
  width:200px;
  text-align: right;
  padding:0 10px;
  // margin-top:10px;
  color:#AAAAAA;
}
.file-content{
  padding:0 10px;
}
</style>