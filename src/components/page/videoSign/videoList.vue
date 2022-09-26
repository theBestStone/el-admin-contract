<!--  -->
<template>
  <div style="height:100%">
    <div class="content90" style="height:100%">
      <el-row :gutter="20" class="margin-top" style="height:100%">
        <el-col :span="4" style="height:100%">
          <el-card style="height:100%">
            <div>
                <ul class="title-ul">
                  <li @click="netType(index)" :class="{active:index==titleActive}" v-for="(item,index) in titleList">{{item.name}} <i class="el-icon-arrow-right margin-left"></i></li>
                </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="20" v-if="titleActive==0">
          <el-card class="bg-white ">
            <div>
              <el-form class="cf" label-width="90px" :inline="true" @submit.native.prevent @keyup.enter.native="doSearch(1)">
                <div class="fl">
                  <el-button size="small" type="success" @click="doAdd(false)">即时房间</el-button>
                  <el-button size="small" type="warning" @click="doAdd(true)">预定房间</el-button>
                  <el-button size="small" type="primary" @click="doJoin()">加入房间</el-button>
                </div>
                <!-- <div class="herderFlex fr" style="width:400px;">
                
                    <el-input style="width:280px;" placeholder="请输入模板名称搜索" v-model="model.templateName"></el-input><el-button size="small" @click="doSearch(model.pageNum = 1)" icon="el-icon-search" type="primary">查询</el-button>
                 
                  
                  
                </div> -->
                
              </el-form>
            </div>
          </el-card>
              
                
          <el-card class=" bg-white margin-top">
            
            <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;" @selection-change="selectionChangeHandler">
              
              <el-table-column  prop="roomCode" label="房间编号" width="150"/>
              <el-table-column  prop="roomName" label="房间名称" width="150"/>
              
              <el-table-column  prop="roomStart" label="房间开始时间" width="170"/>
              <el-table-column  prop="roomUrl" label="房间地址" width="150"></el-table-column>
               <el-table-column  width="80"  label="邀请">
                <template slot-scope="scope">
                    <el-button  size="mini" type="text" @click="copys(scope.row,1)">复制邀请</el-button>                    
                </template>
              </el-table-column>
              <el-table-column  prop="username" label="状态" width="150">
                <template slot-scope="scope">
                     <el-tag  v-if="scope.row.roomStatus==0">待开启</el-tag>    
                     <el-tag  v-if="scope.row.roomStatus==1">已开启</el-tag>    
                     <el-tag  v-if="scope.row.roomStatus==2">进行中</el-tag> 
                     <el-tag type="danger" v-if="scope.row.roomStatus==3">已结束</el-tag>             
                </template>
              </el-table-column>
              
              <el-table-column
                label="操作"
                width="200"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.roomStatus==1||scope.row.roomStatus==2">

                    <el-button  type="text" size="mini"   @click="del(scope.row,1)">关闭房间</el-button>
                    <el-button  type="text"  size="mini" @click="edit(scope.row,1)">修改</el-button>
                    <!-- <el-button type="text" size="mini" @click="edit(scope.row,-1)">查看</el-button> -->
                    <el-button   type="text" size="mini"  @click="edit(scope.row,2)">进入房间</el-button>
                  </div>
                  <div  v-else>——</div>
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
        <el-col :span="20" v-if="titleActive==1">
          <el-card class="bg-white ">
            <div>
              <el-form class="cf" label-width="90px" :inline="true" @submit.native.prevent @keyup.enter.native="findVideoContractList(1)">
                <div class="fl">
                 <el-form-item label="合同名称" prop="contractName">
                  <el-input placeholder="请输入合同名称" clearable v-model="modelcom.contractName"></el-input>
                </el-form-item>
                  <el-button size="small" type="primary" @click="findVideoContractList(1)">查询</el-button>
                  
                </div>
              
                
              </el-form>
            </div>
          </el-card>
              
                
          <el-card class=" bg-white margin-top">
            
            <el-table ref="table2" v-loading="loading" :data="list2" style="width: 100%;" @selection-change="selectionChangeHandler">
               
 



              <el-table-column  prop="roomCode" label="房间编号" width="150"/>
              <!-- <el-table-column  prop="roomName" label="房间名称"/> -->
              
              <el-table-column  prop="roomStart" label="房间开始时间" width="170"/>
              <el-table-column  prop="contractName" label="合同名称" ></el-table-column>
               <el-table-column  width="80"  label="合同下载">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="dowloadFile(scope.row)">下载</el-button>                    
                </template>
              </el-table-column>
              <el-table-column  prop="username" label="签署详情" width="150">
                <template slot-scope="scope">
                     <el-button type="primary" size="mini" @click="viewsDetaile(scope.row)">查看详情</el-button>      
                </template>
              </el-table-column>
              
            
            
              
          
          </el-table>
          <el-pagination
              :current-page.sync="model.pageNum"
              background
              layout="total,prev,pager,next,jumper"
              :total="pageTotal2"
              :page-size="model.pageSize"
              @current-change="findVideoContractList"
          >
          </el-pagination>
        </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="editType==0?(model2.isDestine?'预定房间':'即时房间'):'编辑房间'"  v-dialogDrag :visible.sync="visible" width="500px">
           <div class="padding">
               <el-form :model="model2"  ref="agForm" label-width="130px" class="ms-content">
                <!-- <el-form-item  prop="userAccount"  verify phone label="账号">
                    <el-input v-model="model2.userAccount" placeholder="请输入账号"></el-input>
                </el-form-item> -->
                <el-form-item  prop="roomName"  verify label="房间名称" >
                    <el-input v-model="model2.roomName" placeholder="请输入房间名称"></el-input>
                </el-form-item>
           
                <el-form-item  prop="openTime" v-if="model2.isDestine"   label="房间开始时间" :verify="timelimit">
                    <!-- <el-input v-model="model2.openTime" placeholder="请输入房间开始时间"></el-input>  @blur="timelimit"-->
                    <el-date-picker
                      v-model="model2.openTime"
                      placeholder="请输入房间开始时间"
                      type="datetime"
                     format='yyyy-MM-dd HH:mm:ss'
                      value-format='yyyy-MM-dd HH:mm:ss'
                      :picker-options="expireTimeOption"
                     
                    />
                </el-form-item>
                <el-form-item  prop="password"   label="设置房间密码">
                    <el-input  v-model="model2.password" placeholder="请设置房间密码"></el-input>
                </el-form-item>
                
               
            </el-form>
           </div>
           <div class=" text-center" slot="footer">
              <el-button @click="visible = false">取 消</el-button>
               <el-button @click="onSure" type="primary">提交</el-button>
           </div>
        </el-dialog>
        <el-dialog title="加入房间"  v-dialogDrag :visible.sync="visibleJoin" width="500px">
           <div class="padding">
               <el-form :model="model3"  ref="agForm2" label-width="130px" class="ms-content">
                <!-- <el-form-item  prop="userAccount"  verify phone label="账号">
                    <el-input v-model="model2.userAccount" placeholder="请输入账号"></el-input>
                </el-form-item> -->
                <el-form-item  prop="roomCode"  verify label="房间号" >
                    <el-input v-model="model3.roomCode" placeholder="请输入房间号"></el-input>
                </el-form-item>
           
              
                <el-form-item  prop="password"   label="房间密码">
                    <el-input  v-model="model3.password" placeholder="请输入房间密码"></el-input>
                </el-form-item>
                
               
            </el-form>
           </div>
           <div class=" text-center" slot="footer">
              <el-button @click="visibleJoin = false">取 消</el-button>
               <el-button @click="onSureJoin" type="primary">提交</el-button>
           </div>
        </el-dialog>
        <el-dialog title="签署详情"  v-dialogDrag :visible.sync="visibleDetaile" width="700px">
           <div class="padding">
              <el-table ref="table" v-loading="loading" :data="detaileList" style="width: 100%;" >
               
              <el-table-column  prop="updateTime" :formatter="$util.YYMM" label="签约时间"  />
              <!-- <el-table-column  prop="roomName" label="签约人" width="150"/> -->
              
              <el-table-column  prop="loginfo" label="签约动态"  />
             
          </el-table>
           </div>
           <div class=" text-center" slot="footer">
              <el-button @click="visibleDetaile= false" type="primary">关 闭</el-button>
                
           </div>
        </el-dialog>
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
import { templateList,duplicateTemplate,deleteTemplate } from '../../../api/template.js';
import { list,createRoom,roomEdit,roomClose,join,findVideoContractList,findVideoContractLog,downloadVideoContract  } from '../../../api/video.js';
 import {getDentify} from '@/utils/auth';
// import { clearInterval } from 'timers';
export default {
  components: { DateRangePicker,Treeselect },
  data() {
    return {
      times:null,
      visible:false,
      visibleCopy:false,
      visibleJoin:false,
      visibleDetaile:false,
      deptName:"",
      dentify:{},
      loading:false,
      selections:[],
      list:[],
      list2:[],
      detaileList:[],
      titleList:[{
        name:"音视频签约"
      },{
        name:"历史签约记录"
      }],
      
      titleActive:0,
      model: {
        
        pageNum: 1,
        pageSize: 10,
       
      },
      modelcom: {
        
        pageNum: 1,
        pageSize: 10,
        contractName:""
      },
      editType:0,
    
      model2: {
            roomName: '',
            password: '',
            isDestine:false,
            roomId:"",
            openTime: ''
      },
      model3: {
            password: '',
            roomCode:'',
            roomId:""
      },
      expireTimeOption: {
        disabledDate(date) {
          
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          return date.getTime() < new Date().getTime()- 24 * 60 * 60 * 1000;
        } 

      },

      pageTotal:0,
      pageTotal2:0
    };
  },
    methods: {
      timelimit(rule, val, callback){
        if(this.model2.openTime){
            let sTime = new Date(this.model2.openTime);
            if(sTime<new Date().getTime()){
              callback(Error('开始时间不能早于当前时间!'))
              // this.model2.openTime = ""
            }else {
              
              callback()
            }
           
        }else{
            callback(Error('请填写开始时间'))
        }
        // if(this.model2.openTime){

           
        
        //   let sTime = new Date(this.model2.openTime);
        //   if(sTime<new Date().getTime()){
        //     return false;
        //   }
        // }
      },
      doAdd(type){
        
        this.visible = true;
        this.editType = 0;
       
        this.$nextTick(()=>{
          this.$refs.agForm.resetFields();
           this.model2.isDestine = type;
           if(type){

             this.model2.openTime =  this.$util.datetimeFormat(new Date().getTime()+60*30*1000)
           }else{
             this.model2.openTime = ""
           }
        })
      },
      doJoin(){
        this.visibleJoin = true;
      },
      onSure(){
        this.$refs.agForm.validate(async valid => {
            if (valid) {
              if(this.editType==0){

                await createRoom(this.model2)
                this.$message.success("创建成功");
              }else {
                await roomEdit(this.model2)
                this.$message.success("修改成功");
              }
              
              this.doSearch(1);
              this.visible = false;
              this.visibleCopy = true
            }
        })
      },
      onSureJoin(){
        this.$refs.agForm2.validate(async valid => {
            if (valid) {
              this.joinRoom();
            }
        })
      },
      async joinRoom(row){
        
        let {data} = await join(this.model3);
        if(data.code==1){
          console.log({
              roomId:data.data,
              roomCode:this.model3.roomCode
          })
          this.$router.push({name:'videoRoom',params: {
              roomId:data.data,
              roomCode:this.model3.roomCode
          }})
        }else if(data.code==2){
          this.$message.error(data.msg)
        }
      },
      edit(row,type){
        
      
        if(type==2){
          this.model3.roomId=row.roomId;
          this.model3.roomCode=row.roomCode;
 
           this.model3.password = row.roomPassword;
          this.joinRoom();
        }else{
           this.visible  = true;
           this.editType = 1;
           this.model2 = {
             openTime:row.roomStart,
             roomName:row.roomName,
             password:row.roomPassword,
             roomId:row.roomId,
             isDestine:true
           };
        }
      },
      netType(index){
        this.titleActive = index;
        if(index==1){
          // this.model.entId = this.dentify.orgId;
          if(this.times){
            window.clearInterval(this.times)
          }
          this.findVideoContractList(1);
        }else{
          this.doSearch();
          // this.model.entId = ""
        }
      },
      async doSearch(value) {
         
        value ? (this.model.pageNum = value) : (this.model.pageNum);
        let {data}  = await list(this.model);
        this.list = data.list
        this.pageTotal = data.total
        if(this.times){
          window.clearInterval(this.times)
        }
          this.times = window.setInterval(()=>{
            this.doSearch();
          },5000)
      },
      async findVideoContractList(value){
         value ? (this.modelcom.pageNum = value) : (this.modelcom.pageNum = 1);
        let {data}  = await findVideoContractList(this.modelcom);
        this.list2 = data.list
        this.pageTotal2 = data.total
      },
      async del(row){
        this.$confirm('确认关闭?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                let { data } = await roomClose({ roomId: row.roomId });
                this.$message.success('关闭成功');
                this.doSearch(1);
            })
            .catch(() => {});
      },
      async copys(row){
         this.$copyText(`房间名称：${row.roomName}\n房间编号：${row.roomCode}\n房间密码：${row.roomPassword}\n房间地址：${row.roomUrl}`).then(
		        res => {
		          console.log(res)
		          this.$message.success("已成功复制，可直接去粘贴");
		        },
		        err => {
		          this.$message.error("复制失败");
		        }
		      )
 
 
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
     async dowloadFile(row){
       let {data} = await downloadVideoContract({roomId:row.roomId})
      },
      
      async viewsDetaile(row){
          this.visibleDetaile = true;
         let {data} =  await findVideoContractLog({roomId:row.roomId});
         this.detaileList = data;
      }
    },
    beforeDestroy() {
      //页面销毁时关闭长连接
       clearInterval(this.times)
    },
    created(){
       this.dentify = getDentify();
       this.doSearch();
       
    }
}

</script>
<style lang="less">

</style>