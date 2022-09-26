<!--  -->
<template>
  <div class="padding">
    <div class="content90">
      <div class="cf">

        <div class="fr">
            <el-button @click="back"  type="info" >关闭</el-button>
            <el-button @click="getMsg"  type="primary" >发起签署</el-button>
        </div>
      </div>
      <el-form ref="agform" :model="model" :disabled="type==-1||type==2" label-width="80px">
      <el-card class="margin-top">
        <div slot="header" class="clearfix  text-xl">
          <span>合同信息</span>
      </div> 
          
              <el-form-item label="合同名称" prop="contractName" verify>
                <el-input v-model="model.contractName" ></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark" verify>
                <el-input type="textarea" v-model="model.remark"></el-input>
              </el-form-item>
         
      </el-card>
      <el-card class="margin-top-sm">
        <div slot="header" class="clearfix  text-xl">
          <span>文件列表</span>
        </div>
        <div>
          <uploads v-if="type!=2"  @successAuth="successAuth" @errorAuth="errorAuth" @beforeUpload="beforeUpload" :fileType="['pdf']" :btnTitle="'文件合同上传'" :btnType="'primary'"></uploads>
         
           <span class="text-gray" v-if="type!=2">（支持多文件文件签署，请上传pdf格式文件）</span>
      <!-- word/pdf/jpg/png -->
           <el-table class="margin-top-sm" ref="table2" v-loading="loading" :data="list" style="width: 100%;" >
           
              <el-table-column :show-overflow-tooltip="true" width="600" prop="fileName" label="文件名称" />
              <el-table-column :show-overflow-tooltip="true" prop="fileStatus" label="状态">
                <template slot-scope="scope">
                  <el-tag type="green" v-if="scope.row.status==1">已上传</el-tag>
                  <el-tag  v-if="scope.row.status==0">上传中</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">上传失败</el-tag>
                </template>
              </el-table-column>
              
              <el-table-column
                label="操作"
                width="300px"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button @click="delFile(scope.$index)"  type="danger" size="mini">删除</el-button>
                  
                </template>
              </el-table-column>
          </el-table>
         
        </div>
      </el-card>
       </el-form>
      <el-card class="margin-top-sm">
        <div slot="header" class="clearfix  text-xl">
          <span>添加签署对象</span>
          <span class="text-gray text-sm">（文件合同中的签约方标识，表示某一类签约方，例如：一个文件合同包含的签约方有”HR“、”员工“，那么”HR“或者”员工“就是一个签约）</span>
        </div>
        <div>
          <div class="cf">

            <!-- <el-radio-group v-model="model.signType" :disabled="type==-1||type==2">
              <el-radio :label="0">顺序签署</el-radio>
              <el-radio :label="1">无序签署</el-radio>
               
            </el-radio-group> -->
            <div class="fr">
              <!-- <el-button  type="text">流程示意图</el-button> -->
            </div>
          </div>
          <div class="margin-top-sm">
            <el-table ref="table" class="signerlist" v-loading="loading" :data="sendArr" style="width: 100%;" row-key="uid" @selection-change="selectionChangeHandler">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column  prop="name" label="姓名" />
              <el-table-column  prop="account" label="手机号" />
              
              <el-table-column  prop="orgName" label="企业名称" width="170"/>
            
               
              <el-table-column  prop="username" label="签署顺序" >
                <template slot-scope="scope">
                        <i class="el-icon-rank" style="font-size:25px;cursor: move;"></i>
                </template>
              </el-table-column>
              
           
            
              
          
          </el-table>
          
          </div>
          
        </div>
      </el-card>
      

        <el-card class="margin-top-sm">
          <div slot="header" class="clearfix  text-xl">
            <span>添加抄送方</span>
            
          </div>
          <div>
          
            <div class="margin-top-sm">
              <div v-if="sendArr2.length==0" class="text-gray text-center margin-tb-lg">暂无数据</div>
            
              <!-- <div v-else class="text-left  dashed margin-top" v-for="(item,index) in sendArr2" > -->
                <vuedraggable class="wrapper" handle=".dags" :animation="300" v-model="sendArr2"  v-else >
                <transition-group>
              <div class="text-center dashed margin-top dags" :key="index" v-for="(item,index) in sendArr2" >

                <el-row class="bg-gray cf" :gutter="20">
                  <!-- <el-col class="t-title tmy" :span="9" v-if="item.type2==2">企业名称</el-col>  -->
                
                
                    <el-col class="t-title tmy" :span="12">抄送人姓名</el-col>
                    <el-col class="t-title tmy" :span="12">抄送人邮箱</el-col>
               
                  
                  
                  
                </el-row>
                <el-row class="cf" :gutter="20">
                
               
                    <el-col class="t-title tmy" :span="12"> <el-input v-model="item.name" placeholder="请输入抄送人姓名"><el-button @click="getConts(item)" slot="append" icon="el-icon-user-solid"></el-button></el-input> </el-col>
                    <el-col class="t-title tmy" :span="12"> <el-input v-model="item.mail" placeholder="请输入抄送人邮箱"><el-button slot="append"  @click="getConts(item)" icon="el-icon-user-solid"></el-button></el-input> <i class="el-icon-close delcon2"   @click="delFile3(index,2)"></i></el-col>
                  
                
                
                </el-row>
              </div>
              </transition-group>
            </vuedraggable>
            </div>
            <div class="margin-top-xl text-center" >
                <el-button type="primary" @click="addSignUser2(2)">添加抄送人</el-button>
                <!-- <el-button type="primary" @click="addSignUser2(1)">添加个人方</el-button> -->
            </div>
          </div>
        </el-card>
     
      
    </div>
    <el-dialog title="通讯录" :visible.sync="visibleUser" :modal-append-to-body='false' v-dialogDrag width="1000px">
        <contracts ref="contracts" :userType="'2'" @change="doConts"></contracts>
       
  </el-dialog>
  <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext" :verifyTag='false'></auth-code>
  </div>
</template>

<script>
import { findTemplate } from '../../../api/template.js';
import { saveContract} from '../../../api/video.js';
import Sortable from 'sortablejs'
import AuthCode from '../../common/authCode';
import uploads from '../../../components/common/uploads'
 import contracts from '../../page/mine/contracts'
  import {queryCreditCodeByOrgName} from '../../../api/companyManage.js';
import vuedraggable from 'vuedraggable'

export default {
  components: {uploads,contracts,AuthCode,vuedraggable,Sortable},
  data() {
    return {
      tempId:"",
      contId:"",
      type:"",
      fileList: [],
      visibleUser:false,
      visibleCode:false,
      realPhone:"",
      userInfo:{},
      model:{
        contractName:"",
        remark:"",
        roomId:"",
        checkList:[],
        roomUserList:[],
        fileIds:"",
        copiedPersonList:[]
      },
      activeItem:{},
      sendArr:[],
      sendArr2:[],
      loading:false,
      selections:[],
      list:[],
      list2:[] 
     
    }
  },
  created() {
    // this.getId();
    //  this.getinfo();
   
    // if(this.contId){
    //   this.getById2(true);

    // }else{
    //    if(this.tempId){

    //     this.getById(false);
    //     this.getType();
    //   }else{
    //     this.model.isTemplate = 0;
    //     this.getType();
    //   }
    // }
    
  },
  mounted(){
    
 
  },

  methods: {
    selectionChangeHandler(val){
        this.selections = val;
        console.log(val)
      },
      mounted(){

      },
      init(row){
        //  userList:this.userList,
        //               tempId:"",
        //               tempType:0'
        let res = this.$store.getters.user;
        this.userInfo = res;
        this.realPhone = res.realPhone;
        this.type = 0;
        console.log(row.userList)
        this.model.roomId = row.roomId
        // this.model.isTemplate = 0;
        this.sendArr = row.userList;
        this.$nextTick(()=>{
          setTimeout(()=>{

              const el = document.querySelector('.signerlist .el-table__body-wrapper tbody');
              let self = this;
              
              Sortable.create(el, {
        // 拖拽结束后的操作
                onEnd({ newIndex, oldIndex }) {
        // 修改data中的数组，
                  const targetRow = self.sendArr.splice(oldIndex, 1)[0]
                  self.sendArr.splice(newIndex, 0, targetRow)
                  
                }
              });
          },400)
        })
        // this.getId();
        // this.getinfo();
        // if(this.contId){
        //   this.getById2(true);
        // }else{
        //   if(this.tempId){

        //     this.getById(false);
        //     this.getType();
        //   }else{
        //     this.model.isTemplate = 0;
        //     this.getType();
        //   }
        // }
      },
      back(){
          // this.$router.go(-1)//返回上一层
          this.$emit("close")
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      successAuth(res,file) {
       
        let item = this.list[this.list.length-1];
        item.fileId = res.data.id;
        item.status = 1;
            
      },
      errorAuth(){
        // let item = this.list[this.list.length-1];
        this.list.splice(this.list.length-1,1);
          //  item.status = 2;
      },
      beforeUpload(files) {
       
         
          let obj = {
            fileName:files.name,
            status:0,
            fileId:"",
            signSetting:""
          }
          this.list.push(obj)

      },
      successAuth2(res,file) {
      
        let item = this.list2[this.list2.length-1];
        item.fileId = res.data.id;
        item.status = 1;
            
      },
      errorAuth2(){
        this.list2.splice(this.list.length-1,1);
        let item = this.list2[this.list2.length-1];
           item.status = 2;
      },
      beforeUpload2(files) {
          if(this.list2.length==5){
            this.$message.error("最多上传5个附属文件")
            return false;
          }
          let obj = {
            fileName:files.name,
            status:0,
            fileId:"",
            signSetting:""

          }
          this.list2.push(obj)

      },
      addSignUser(type){
        let len = this.sendArr.length+1
        let obj = {name:"签署方"+len,type:type,checkList:type==1?[]:[1,2]}
         
        this.sendArr.push(obj)
      },
      addSignUser2(type){
        let len = this.sendArr2.length+1
        let obj = {type2:type}
         
        this.sendArr2.push(obj)
      },
      delFile(index){
        this.list.splice(index,1);
      },
      delFile2(index){
        this.list2.splice(index,1);
      },
      delFile3(index,type){
        if(type==1){

          this.sendArr.splice(index,1);
          let ind = 0;
           this.sendArr.forEach(item=>{
             if(item.name.indexOf("签署方")!=-1){
               ind++
               item.name = "签署方"+ind
             }
           })
        }else{
          this.sendArr2.splice(index,1);
          
        }
      },
      async tempAdd(type,code){
         
        
         this.model.verifyCode = code;
            var {data} = await saveContract(this.model);
            this.closepop();
            this.$emit("change","send")
      },
      getFile(){
        let arr = [];
        let tag = true;
        if(this.list.length==0){
          tag = false;
        }else{

          this.list.forEach(item=>{
            // let obj = {}
            // obj.fileId = item.fileId,
            // obj.id = item.id;
            // obj.fileType = 1;
            // obj.signSetting= item.signSetting
            arr.push(item.fileId)
          })
          
        }
        // this.list2.forEach(item=>{
        //   let obj = {}
        //   obj.fileId = item.fileId,
        //    obj.id = item.id;
        //   obj.fileType = 2;
        //   obj.signSetting= item.signSetting
        //   arr.push(obj)
        // })
        return {arr,tag};
      },
      getUser(){
          let arr = [];
          // let tag = 1;
          let tipTile = [];
          const h = this.$createElement;
          if(this.sendArr.length==0){
            return [];
          }
          // console.log(this.sendArr)
          // return false;
          
          this.sendArr2.forEach((item,index)=>{ 
            let obj = {};
             
            
              !item.mail?tipTile.push(h('p',null,"请添加抄送方第"+(index+1)+"行邮箱;") ):(obj.mail = item.mail) ;
              !item.name?tipTile.push(h('p',null,"请添加抄送方第"+(index+1)+"行姓名;") ):(obj.userName = item.name) ;
              
              
              if(item.id){
                obj.id = item.id;
              }
              if(item.code){
                obj.code = item.code;
              }
              
              obj.sort = -1
              console.log(obj,"obj.type2")
              
                
             arr.push(obj)
          })
        if(tipTile.length==0){
          return arr;
        }else{
          this.$alert(h('div',null, tipTile), '填写有误', {
              confirmButtonText: '确定' 
            });
          return false;
        }
      },
      getId(tag){
        this.tempId =this.$route.query.tempId// this.$store.getters.tempId;
        this.contId =this.$route.query.contId// this.$store.getters.contId;
      },
      getType(){
        this.type =this.$route.query.tempType// this.$store.getters.tempType;
        
      },
     
     
      showUser(){
          
      },
      getConts(item){
        return false;
        // this.visibleUser = true;
        // this.activeItem = item
      },
      doConts(item){
         if(this.activeItem.type==2||this.activeItem.type2==2){
           this.activeItem.creditCode = item.creditCode;
           this.activeItem.orgName = item.orgName;
         } 
         this.$set(this.activeItem,"mail",item.email)
         this.$set(this.activeItem,"name",item.userName)
          //  this.activeItem.account = item.userAccount;
          //  this.activeItem.name = item.userName
        this.visibleUser = false;
      },
      async getEnt(item){
        let {data} = await queryCreditCodeByOrgName({orgName:item.orgName})
        if(data){
          item.creditCode = data.creditCode;
        }else{
          this.$message.error("输入的企业不正确")
        }
      },   
      getinfo(tag) {
            this.$store.dispatch('GetInfo', tag).then(res => {
                this.userInfo = res;
                this.realPhone = res.realPhone;
            });
        },   
        closepop(visible) {
            this[visible] = false;
        },
        async toNext(code) {
           
            this.tempAdd(2,code);
        },
        getMsg(){
          
          let selections = this.$refs.table.selection

          let selections2 = [];
          this.sendArr.forEach(i=>{
            selections.forEach(j=>{
              if(i.uid==j.uid){
                selections2.push(i)
              }
            })
          })
       
          if(selections.length==0){
            this.$message.info("请勾选签署人")
            return false;
          }
        
          let {arr,tag} = this.getFile();
    
          let userArr = this.getUser();
      
          this.model.roomUserList =selections2;
          this.model.fileIds = arr;
          this.model.copiedPersonList = userArr;
          if(!tag){
            this.$message.error("请上传文件合同")
            return false;
          }
          console.log(this.model,222)
          if(!userArr){
            // this.$message.error("请检查签署要求是否选择完整")
            return false;
          }
          
          this.$refs.agform.validate(async valid => {
            if (valid) {
            this.visibleCode = true;
              
            }
          })
          
        },    
  }
}

</script>
<style lang="less">
.tmy{
  height: 40px;
  line-height: 40px;
}
.delcon{
  float: right;
  width:20px;
  height:20px;
  cursor: pointer;
  position: relative;
  top:-28px;
}
.delcon2{
  float: right;
  width:20px;
  height:20px;
  cursor: pointer;
  position: relative;
     top: -67px;
  right:15px;
}
.delcon:hover, .delcon2:hover{
  color:red;
}
.upbtn{
  padding:9px 30px;
  border:1px dashed #ccc;
}
.delbtn{
  position:absolute;
  right:5px;
  top:8px;
  color:#ccc;
  cursor: pointer;

}
.delbtn:hover{
  color:red;
}
.dags{
  cursor:move
}
</style>