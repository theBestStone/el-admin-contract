<!--  -->
<template>
  <div style="height:100%">
    <div class="content100" style="height:100%">
      <el-row :gutter="20" class="margin-top-xs" style="height:100%">
        <el-col :span="4" style="height:100% ;padding-right: 3px;">
          <el-card class="leftcard" style="height:calc(100% - 40px); padding:20px 0;">
            <div style="padding:0 20px">
                <p class="text-center">
                  <el-button type="primary"  style="width:90%;height: 40px; font-size: 14px;" @click="editScene('add')" icon="el-icon-plus">
                    创建场景
                    </el-button>
                   
                </p>
                <p class="text-center margin-top">
                  <el-button   style="width:90%;height: 40px; background: #e7eeff; color: #1257FF; font-size: 14px; line-height: 10px;" @click="editElement('add')">
                     <el-image class="" style="margin-right: 3px;" :src="buttonicon"></el-image>
                    添加组件模板
                    </el-button>
                </p>
            </div>
            <el-card class="margin-top ">
              <div class="cf padding-tb padding-lr-sm" ><span class="font-bold">业务类型</span> <span class="fr text-gray cursor-pointer" style="font-size:12px;" @click="editBusiness('add')"><i class="el-icon-plus"></i> 添加类型</span></div>
              <ul class="title-ul2">
                
                <li class="cf" @click="netType(index,item)" :class="{active:index==titleActive}" v-for="(item,index) in titleList">
                <!-- <el-image class="" style="" :src="item.icon"></el-image> -->
                {{item.sceneTypeName}}
                <span class="fr">
                  <i class="el-icon-arrow-right" v-if="item.type==0"></i>
                  <el-popover
                    placement="bottom"
                    width="40"
                    popper-class="scene-popover"
                    trigger="hover">
                     <ul class="sence-ul">
                      <li @click="editBusiness('edit',item)">编辑</li>
                      <li>
                        <el-popconfirm
                          title="确认删除吗？"
                        >
                          <span slot="reference">删除</span>
                        </el-popconfirm>
                      </li>
                     </ul>
                   <i class="el-icon-more" slot="reference" v-if="item.type==1"></i>  
                  </el-popover>
                   
                </span>
                </li>
              </ul>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="20" style="padding-left: 2px;">
          <el-card class="bg-white" >
          <el-tabs v-model="switchNum"  @tab-click="switchclick">
            <el-tab-pane :label="'场景库'" :name="1"></el-tab-pane>
            <el-tab-pane :label="'模板库'" :name="2"></el-tab-pane>
          </el-tabs>
             
          </el-card>
                
          <el-card class=" bg-gray margin-top-xs" v-if="switchNum==1">
            <div v-if="list.length>0">
              <div class="flex flex-wrap">
                <div class="bussiness-item bg-white" v-for="item in list" >
                    <div class="flex">
                      <div style="width:42px;height:60px;" class="flex justify-center align-center"><i class="el-icon-menu" style="font-size:40px"></i></div>
                      <div class="flex-sub" style="margin-top:10px;text-indent:10px;">
                        <div class="text-cut" style="width:214px" >{{item.sceneName}}</div>
                        <div>应用</div>
                      </div>
                    </div>
                    <div class="margin-top">
                      
                      <el-tooltip class="item" effect="dark" :content="item.remark" placement="bottom">
                        <div class="text-cut bussiness-des text-gray">{{item.remark}}</div>
                      </el-tooltip>
                    </div>
                    <div>
                      <el-button type="text" @click="doContract(item)">发起签署</el-button>
                      <el-button type="text" @click="editSceneTemplate(item)">编辑</el-button>
                    </div>
                </div>
              </div>
              <el-pagination
                style="text-align:left"
                :current-page.sync="modelRight.pageNum"
                background
                layout="total,prev,pager,next,jumper"
                :total="pageTotal"
                :page-size="modelRight.pageSize"
                @current-change="doSearch"
            >
            </el-pagination>
            </div>
            <div v-if="list.length==0">
              <el-empty description="场景库是空的"></el-empty>
            </div>
          </el-card>
          <el-card class=" bg-gray margin-top-xs" v-if="switchNum==2">
              <div v-if="list2.length>0">

                  <div class="flex flex-wrap">
                    <div class="bussiness-item bg-white" v-for="item in list2">
                        <div class="flex">
                          <div><i class="el-icon-menu" style="font-size:40px"></i></div>
                          <div>
                            <div>{{item.templateName}}</div>
                            <div>组件</div>
                          </div>
                        </div>
                        <div>
                          
                          <el-tooltip class="item" effect="dark" :content="item.remark" placement="bottom">
                            <div class="text-cut bussiness-des">{{item.remark}}</div>
                          </el-tooltip>
                        </div>
                        <div>
                          
                          <el-button type="text" @click="addElement(item,index)">编辑</el-button>
                        </div>
                    </div>
                  </div>
                  <el-pagination
                   style="text-align:left"
                    :current-page.sync="modelRight2.pageNum"
                    background
                    layout="total,prev,pager,next,jumper"
                    :total="pageTotal2"
                    :page-size="modelRight2.pageSize"
                    @current-change="doSearch"
                >
                </el-pagination>
              </div>
              <div v-if="list2.length==0">
              <el-empty description="模板库是空的"></el-empty>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="sceneTypeStatus=='add'?'新增业务类型':'编辑业务类型'"  v-dialogDrag :visible.sync="editVisible" width="500px">
      <div class="padding">
          
          <el-form  :model="sceneType" ref='sceneForm' label-width="100px" class="ms-content">
            <el-form-item prop="sceneTypeName" verify label="类型名称">
              
                <el-input v-model="sceneType.sceneTypeName" placeholder="请输入类型名称"></el-input>
            </el-form-item>
          
        </el-form>
      </div>
      <div class=" text-center" slot="footer">
        <el-button @click="editVisible = false">取 消</el-button>
          <el-button @click="editSceneType()" type="primary">提交</el-button>
      </div>
  </el-dialog>
    <el-dialog :title="sceneVisibleType=='add'?'新增场景':'编辑场景'"  v-dialogDrag :visible.sync="senceVisible" width="500px">
      <div class="padding">
          
          <el-form :model="modelScene"  ref="agForm" label-width="100px" class="ms-content">
          
          <el-form-item  prop="sceneName"  verify  label="场景名称">
              <el-input v-model="modelScene.sceneName" placeholder="请输入场景名称" length="20"></el-input>
          </el-form-item>
          <el-form-item  prop="sceneTypeNo"  verify label="业务类型">
             <el-select  filterable v-model="modelScene.sceneTypeNo" placeholder="请选择...">
                <el-option v-for="(item,index) in titleList" :key="item.sceneTypeNo" :label="item.sceneTypeName" :value="item.sceneTypeNo"></el-option>
                
              </el-select>
          </el-form-item>
           <el-form-item  prop="remark"  verify label="应用描述">
              <el-input type="textarea" v-model="modelScene.remark" placeholder="请输入应用描述" length="70"></el-input>
          </el-form-item>
        
      </el-form>
      </div>
      <div class=" text-center" slot="footer">
        <el-button @click="senceVisible = false">取 消</el-button>
          <el-button @click="editSence" type="primary">提交</el-button>
      </div>
  </el-dialog>
  <el-dialog :title="elementTitle" center v-dialogDrag :visible.sync="elementVisible" width="500px">
      <div class="padding">
          
          <el-form :model="modelElement"  ref="agFormElement" label-width="100px" class="ms-content">
          
         
          <el-form-item  prop="sceneTypeNo"  verify  label="业务类型">
             <el-select  filterable v-model="modelElement.sceneTypeNo" placeholder="请选择...">
                <el-option v-for="(item,index) in titleList" :key="item.sceneTypeNo" :label="item.sceneTypeName" :value="item.sceneTypeNo"></el-option>
                
              </el-select>
          </el-form-item>
           <el-form-item  prop="templateName"  verify label="模板名称">
              <el-input v-model="modelElement.templateName" placeholder="请输入场景名称" length="20"></el-input>
          </el-form-item>
           <el-form-item  class="redstar" label="文件">
            <!-- <template> -->
              <div class="flex">
                   
                  <el-tooltip
                    effect="dark"
                    content="支持doc、docx、png、jpeg、jpg、pdf格式，文档大小不超过50M"
                    placement="right"
                    style="position:relative;left:-10px;"
                  >
                    <i class="el-icon-question text-gray"></i>
                  </el-tooltip>
                  <uploads
                    class="z-upload"
                    :type="1"
                    @successAuth="successAuth2"
                    @errorAuth="errorAuth"
                    @beforeUpload="beforeUpload"
                    :fileList="fileList"
                    :fileType="['pdf','doc','docx','png','jpg','jpeg','PDF','DOC','DOCX','PNG','JPEG','JPG']"
                    :btnTitle="'文件合同上传'"
                    :btnType="'primary'"
                    v-show="fileList.length==0"
                >
                </uploads>
          
                   
                        <div class=" signPdf2 " v-for="(item, index) in fileList" :key="index">
                            <div class="flex align-center" style=" align-items: center;flex-wrap: wrap;justify-content: center;height:40px;">
            
                                <div class="z-left flex" style=" align-items: center;flex-wrap: wrap;justify-content: center;width:30px;"><img src="../../../assets/img/feature/pdf.png" alt=""></div>
                                <div class="z-center " style="font-size:10px;"> 
                                    <div class="z-title">{{item.fileName}}</div>
                                    <div><span v-if="item.pages">共{{item.pages}}页</span><span style="margin-left:5px;" v-if="item.size">{{item.size|fileSize}} M</span></div></div>
         
                                <div class="z-right cursor-pointer" style="font-size:14px;"><i v-if="type != -1" class="el-icon-delete" @click="delFile(index)"></i></div>
                            </div>
                              <div ><el-progress v-if="item.status==0" style="height:3px;overflow: hidden;" :percentage="item.percentage"  :color="'#7886c2'" :show-text="false"></el-progress></div>
                        </div>
                    
                
              </div>
            <!-- </template> -->
 
              
          </el-form-item>
        
      </el-form>
      </div>
      <div class=" text-center" slot="footer">
        <el-button @click="elementVisible = false">取 消</el-button>
          <el-button @click="onSure3" type="primary">提交</el-button>
      </div>
  </el-dialog>
  <el-dialog title="" class="element-dialog" :fullscreen="true" :visible.sync="visibleSetElement" :modal-append-to-body="false" :append-to-body="true" >
      <set-element :key="muid" v-show="visibleSetElement" ref="setElement" :fileObj="fileObj"  @setFile="setFile" @closeme="visibleSetElement=false"></set-element>
  </el-dialog>
  </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect'
import {getDentify,getToken} from '@/utils/auth';
import uploads from '../../../components/common/uploads'
import {addSceneType,findSceneTypeList,updateSceneType,findSceneList,addScene,hiddenScene,tempFindSceneList,addTemplateModule,updateTemplateModule} from '../../../api/business.js'
import '../../../assets/css/contract.less'
import setElement from '../business/setElement.vue'
import {uuid} from '@/components/page/contract/signUtile.js'
export default {
  components: { DateRangePicker,Treeselect ,uploads,setElement},
  data() {
    return {
      visibleSetElement:false,
      fileObj:{},
      deptName:"",
      visibleHe:false,
      visibleCode: false,
      visibleRefuse:false,
     
      dentify:{},
      loading:false,
      selections:[],
      list:[],
      list2:[],
      random:'',
      disabled:false,
      ischild:false, //是否为独立签署的子任务
      titleList:[
      ],
      sceneList:[],
      statusList:[{
          name:"签署中",
          status:"1"
        }
        ],
      // model.statusList:[],
      buttonicon:require('../../../assets/img/file/buttonicon.png'),
      imageUrl:require('../../../assets/img/hecaiy.png'),
  
      heAccesstoken:'',
      titleActive:0,
      modelRight:{
        pageNum:1,
        pageSize:10,
        sceneTypeNo:'',
        sceneName:''
      },
      pageTotal:0,
       modelRight2:{
        pageNum:1,
        pageSize:10,
        sceneTypeNo:'',
        useType:2
      },
      timmerObj:{},
      pageTotal2:0,
      modelScene:{
        remark:'',
        sceneTypeNo:'',
        sceneName:'',
        
        type:''

      },
      modelElement:{
        templateName:'',
        sceneTypeNo:'',
        status:0,
        files:[],
        
      },
      fileList:[],
      model: {
        contractName: '',
        enterpriseCode: '',
        initiator: '',
        // status: '',
        fileStatusType:1,
        statusList:[],
        times:"",
        startTime:"",
        endTime:"",
        signer: '',
        pageNum: 1,
        pageSize: 10,
        signType:'1'
      },
      params: {
       
        pageNum: 1,
        pageSize: 10,
       
      },
     
      
      pageTotal:0,
      realPhone:'',
      userInfo:{},
      heTag :0,
      refuseRadio:'',
      senceVisible:false,
      sceneVisibleType:'',
      elementVisible:false,
      elementTitle:'',
      editVisible:false,
      businessTittle:'',
      sceneType:{
        sceneTypeName:'',
        sceneTypeNo:'',
        showStatus:1
      },
      switchNum:1,
   
    };
  },
    methods: {
      editBusiness(type,item){
       
        this.editVisible = true;

        this.sceneTypeStatus = type;
        this.$nextTick(()=>{
          this.$refs.sceneForm.resetFields();
          if(type=='edit'){
            this.sceneType.sceneTypeNo = item.sceneTypeNo
            this.sceneType.sceneTypeName = item.sceneTypeName
          }

        })
        
      },
     async getBusinessTypeList(tag){
        let {data} = await findSceneTypeList({});
        this.titleList = data;
        if(tag){
          this.doSearch()
        }
      },
      netType(index,item){
        this.titleActive = index;
      
        this.doSearch(1)
      },
      async findSceneList(num){

        num ? (this.modelRight.pageNum = num) : (this.modelRight.pageNum = 1);
        this.modelRight.sceneTypeNo = this.titleList[this.titleActive].sceneTypeNo
        console.log(this.modelRight,"this.modelRight)")
         let {data} = await findSceneList(this.modelRight);
        this.list = data.list
        this.pageTotal = data.total
        //  this.sceneList = 
      },
      async tempFindSceneList(num){

        num ? (this.modelRight2.pageNum = num) : (this.modelRight2.pageNum = 1);
        this.modelRight2.sceneTypeNo = this.titleList[this.titleActive].sceneTypeNo
        console.log(this.modelRight2,"this.modelRight)")
         let {data} = await tempFindSceneList(this.modelRight2);
        this.list2 = data.list
        this.pageTotal2 = data.total
        //  this.sceneList = 
      },
      async doSearch(num){
        if(this.switchNum==1){
          this.findSceneList(num);
         
        }else{
          this.tempFindSceneList(num);
        }
      },
      async editSceneType(){
// sceneType
        let func = {}
        if(this.sceneTypeStatus=='add'){
          func.do = addSceneType;
        }else{
           func.do = updateSceneType;
        }
        let {data} = await func.do(this.sceneType);
         this.editVisible = false;
         this.getBusinessTypeList();
      },
      editScene(type){
        
        this.senceVisible = true;
        this.sceneVisibleType = type
        this.$nextTick(()=>{
          this.$refs.agForm.resetFields();
          if(type=='add'){

          }else{

          }
          
        })
      },
      editElement(type){
        this.elementVisible = true;
      },
   
      getinfo(tag) {

            // this.$store.dispatch('GetInfo', tag).then(res => {
              let res = this.$store.getters.user;
                this.userInfo = res;
                this.realPhone = res.realPhone;
                 
            // });

            
        },
        async editSence(){
          if(this.dentify.orgId==0){
            this.modelScene.type = 1
          }else{
            this.modelScene.type = 2
          }
          let {data} = await addScene(this.modelScene);
          this.switchNum = 1;
          this.senceVisible = false;
          this.doSearch();
        },
         onSure3(){
          this.$refs.agFormElement.validate(async valid => {
            if (valid) {

              if(this.dentify.orgId==0){
                this.modelElement.type = 1
              }else{
                this.modelElement.type = 2
              }
              if( this.fileList.length==0){
                this.$message.error("请上传文件")
                return false;
              }
              let file = this.fileList[0];
              if(!this.modelElement.templateName){
                this.modelElement.templateName = file.fileName;
              }
              let obj = {
                fileId:file.fileId,
                vars:'',
                size:file.size,
                pages:file.pages
    
              }
               this.modelElement.files = [obj];
              let {data} = await addTemplateModule(this.modelElement);
              this.switchNum = 2;
              this.elementVisible = false;
              this.doSearch();
            }
          })
        },
        
        async setFile(rects,elementShort){
          this.modelElement.type=1;
          let fileObj = JSON.parse(JSON.stringify(this.fileObj))
          let obj = {
             templateName:fileObj.templateName,
              sceneTypeNo:fileObj.sceneTypeNo,
              status:1,
              templateNo:fileObj.templateNo
             
          }
          let files = {
            fileId:fileObj.fileId,
            vars:rects,
            size:fileObj.size,
            pages:fileObj.pages,
            

          }
          obj.files = [files]
           let {data} = await updateTemplateModule(obj);
           this.visibleSetElement = false;
           this.doSearch();
			  },
        addElement(item,index){
          this.muid = uuid();
          this.fileObj = item;
      
          this.visibleSetElement = true;
          this.$nextTick(()=>{
            this.$refs.setElement.getFileView()
          })
        },
     
    
     
      async del(row){
        this.$confirm('确认删除合同?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            let { data } = await deleteContract({ contractNos: [row.contractNo]});
            this.$message.success('删除成功');
            this.findSceneList(1);
        })
        .catch(() => {});
      },
      
      
     
      switchclick(tab, event) {
        this.doSearch();
      },
     
   
      
      resetForm(formName) {
         
        this.$refs[formName].resetFields();
        this.model.statusList = []
         
      },
      closepop(visible) {
          this[visible] = false;
      },
      successAuth2(res, file) {
        
            let num = '';
             console.log(this.fileList,"this.fileList",file)
            this.fileList.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
           
            let item = this.fileList[num];
            this.$set(item, 'fileId', res.data.id)
            this.$set(item, 'pages', res.data.pages)
            this.$set(item, 'percentage', 100)
            setTimeout(()=>{

                this.$set(item, 'status', 1)
            },600)
            
             
        },
        timerpro(item,uid){
            this.timmerObj[String(uid)] = setInterval(()=>{
                let num  = item.percentage;
                if (num>=95){
                    num = 99;
                }else{
                    num +=Math.floor(Math.random()*5+5) + Math.ceil(Math.random()*10)/10;
                }
                
                if(item.status==1||item.status==2){
                    
                    clearInterval(this.timmerObj[uid])
                    this.timmerObj[uid] = null;
                }else{
                    this.$set(item, 'percentage',num)
                }
            
            }, 500);
            

        },
        errorAuth(file) {
           
            let num = '';
      
            this.fileList.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
           
            this.fileList.splice(num , 1);
         
           
        },
        beforeUpload(files) {


            let obj = {
                fileName: files.name,
                status: 0,
                fileId: "",
                signSetting: "",
                uid: files.uid,
                size:files.size,
                percentage:2
            }
            this.fileList.push(obj)
          
            let item = this.fileList[this.fileList.length-1]
            this.timerpro(item,files.uid)
        },
        editSceneTemplate(item){
          let obj = {
            sceneNo:item.sceneNo,
            tempId:item.templateNo,
            tempType:1
          }
          this.$router.push({path:'/template/newTemplate',query:obj})
        },
        doContract(item){
          let obj = {
            sceneNo:item.sceneNo,
            tempId:item.templateNo,
            tempType:2,
            myname:'business'
          }
          this.$router.push({path:'/contract/newContract',query:obj})
        },
        delFile(row, index) {
          this.fileList.splice(index, 1);
        },
       
    },
      
    created(){
     
      this.getinfo();
    },
    mounted(){
      //  if(this.$route.params && this.$route.params.status) {
      //   this.model.fileStatusType = this.$route.params.status
      //   this.titleActive =  this.titleList.findIndex(item=>item.status == this.model.fileStatusType)
        
      // }
      this.dentify = getDentify();
      // this.findSceneList();
      this.getBusinessTypeList(true);

    }
}

</script>
<style lang="less">

.leftcard{
  .el-card__body{
    padding:0;
  } 
  .title-ul2{
  width: 100%;
  
  li{
    width: 70%;
    padding:0 15%;
    height: 45px ;
    line-height: 45px;
    margin:0 auto;
    cursor: pointer;
    overflow: hidden;
    .el-image{
      float: left;
      margin-right: 10px;
      margin-top: 15px;
    }
    
  }
  
  .active{
    color:#175BEC;
    font-weight: 700;
    background: #E2EDFF ;
    .el-image{
      filter: drop-shadow(#175BEC 100px 0);
      left: -100px;
    }
  }
}
}
.scene-popover {
    min-width:60px !important;
    width:60px !important;
  }
.date-item{
  width: 280px !important;
}
 
 
 
.el-pagination{
  margin-top: 20px;
  text-align: right;
}
.bussiness-item{
  width:240px;
  padding:15px;
  margin-right:20px;
  margin-top:10px;
  .bussiness-des{

  }
}
.sence-ul{
  
  li{
    height:30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
}
.signPdf2{
  width:300px !important;
 
   
  height: 46px;
  background: #fafbfd;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  .z-left{
    width:20px;
    img{
      width:20px;
    }
  }
  .z-center{
    flex:1;
    .z-title{
      height:20px;
    }
    div{
      height:20px;
    }
  }
  .z-right{
    width:40px;
     font-size:12px;
  }
}
.z-upload{
  display:inline-block;
  text-align: left;
}
</style>