<!-- 我的 -->
<template>
  <div>
      <el-card class="margin-sm">
          <div slot="header" class="clearfix" v-if="userType==1">
            <span>通讯录管理</span>
        </div>
        <div>
            <el-tabs v-model="activeName" @change="setUserName">
              <el-tab-pane label="最近联系人" name="0"></el-tab-pane>
              <el-tab-pane label="内部联系人" v-if="getDentify.orgId!=0" name="2"></el-tab-pane>
              <el-tab-pane label="外部联系人" name="1"></el-tab-pane>
            </el-tabs>
             <div v-if="activeName==0">
                <div class="margin-tb">
                  <el-input style="width:300px;" placeholder="请输入企业/手机号/姓名" v-model="modelRecent.name" class="input-with-select" @keyup.enter.native="getWhatList">
                    <el-button slot="append" icon="el-icon-search" @click="getWhatList"></el-button>
                  </el-input>
                  <el-button v-if="userType == 2&&consType=='more'" :disabled="selectRecent.length == 0" type="primary" class="fr" @click="bantchUse">批量使用</el-button>
                  <el-button v-if="userType == 1" :disabled="selectRecent.length == 0" type="primary" class="fr" @click="confirmDel">批量删除</el-button>
                  <!-- <el-button type="danger">删除</el-button> -->
                </div>
                <el-table @selection-change="HandleSelectRecent" class="margin-top-sm" ref="table0" v-loading="loading" :data="recentlist" style="width: 100%;" >
                    <el-table-column v-if="consType=='more'||userType==1" type="selection" width="55" align="center"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="orgName" label="企业" >
                       <template slot-scope="scope">
                        {{scope.row.orgName?scope.row.orgName:'——'}}
                      </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="userName" label="姓名" />
                    <el-table-column :show-overflow-tooltip="true"  prop="userAccount" label="手机号" />
                    <el-table-column
                      label="操作"
                      :width="userType==2?'100px':'300px;'"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-popconfirm title="是否删除联系人？" style="margin:0 10px;" @confirm="del(scope.row)" v-if="userType==1">
                          <el-button slot="reference" type="danger" size="mini">
                            删除 
                          </el-button>
                        </el-popconfirm>
                        <el-button  type="primary" size="mini" @click="used(scope.row)" v-if="userType==2" >使用</el-button>
                        
                      </template>
                    </el-table-column>
                </el-table>
                 <el-pagination
                  :current-page.sync="modelRecent.pageNum"
                  background
                  style="margin-top: 20px;"
                  layout="total,prev, pager, next,jumper,slot"
                  :total="recentTotal"
                  :page-size="modelRecent.pageSize"
                  @current-change="getList3">
                  <el-button v-if="consType=='more'||userType==1" style="border: 1px solid #dcdfe6;float: left;" size="mini" @click="selectAll">全选</el-button>
                  <el-button v-if="consType=='more'||userType==1" style="border: 1px solid #dcdfe6;float: left; margin-right: 20px;" size="mini" @click="selectRev">反选</el-button>
                </el-pagination>
             </div>
            <div v-if="activeName==1">
            <!-- 外部联系人 -->
              <div class="margin-tb">
                <el-input style="width:300px;"  placeholder="请输入企业/手机号/姓名" v-model="model2.userName" class=" input-with-select" @keyup.enter.native="getWhatList">
                  <el-button slot="append" icon="el-icon-search" @click="getWhatList"></el-button>
                </el-input>
                <el-button type="primary" class="fr" @click="doAddCRM" style="margin-left: 20px;">新增联系人</el-button>
                <el-button v-if="userType==2&&consType=='more'" :disabled="selectOut.length == 0" class="fr" @click="bantchUse">批量使用</el-button>
                <el-button v-if="userType==1" :disabled="selectOut.length == 0" class="fr" @click="confirmDel">批量删除</el-button>
              </div>
                <el-table @selection-change="HandleSelectRecent" class="margin-top-sm" ref="table1" v-loading="loading" :data="list" style="width: 100%;" >
                    <el-table-column v-if="consType=='more'||userType==1" type="selection" width="55" align="center"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="orgName" label="企业" >
                      <template slot-scope="scope">
                        {{scope.row.orgName?scope.row.orgName:'——'}}
                      </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="userName" label="姓名" />
                    <el-table-column :show-overflow-tooltip="true"  prop="userAccount" label="手机号" />
                    <!-- <el-table-column :show-overflow-tooltip="true" prop="userName" label="授权委托书">
                      <template slot-scope="scope">
                         <el-image v-if="scope.row.fileId" :src="scope.row.url" :preview-src-list="[scope.row.url]" style="width:20px;height:20px">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                         </el-image>
                        
                      </template>
                    </el-table-column> -->
                    
                    <el-table-column
                      label="操作"
                      :width="userType==2?'100px':'300px;'"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-popconfirm title="是否删除联系人？" style="margin:0 10px;" @confirm="del(scope.row)" v-if="userType==1">
                          <el-button slot="reference" type="danger" size="mini">
                            删除 
                          </el-button>
                        </el-popconfirm>
                        
                        <el-button  type="primary" size="mini" @click="edit(scope.row)" v-if="userType==1">编辑</el-button>
                        <el-button  type="primary" size="mini" @click="used(scope.row)" v-if="userType==2" >使用</el-button>
                        
                      </template>
                    </el-table-column>
                </el-table>
                 <el-pagination
                  :current-page.sync="model2.pageNum"
                  background
                  style="margin-top: 20px;"
                  layout="total,prev, pager, next,jumper, slot"
                  :total="pageTotal"
                  :page-size="model2.pageSize"
                  @current-change="getList">
                  <el-button v-if="consType=='more'||userType==1" style="border: 1px solid #dcdfe6;float: left;" size="mini" @click="selectAll">全选</el-button>
                  <el-button v-if="consType=='more'||userType==1" style="border: 1px solid #dcdfe6;float: left; margin-right: 20px;" size="mini" @click="selectRev">反选</el-button>
                </el-pagination>
            </div>
            <div v-if="activeName==2">
            <!-- 内部联系人 -->
              <el-row :gutter="20" style="height:100%">
                <el-col :span="6" style="height:100% ;">
                  <orgTree  ref="orgTree" @handleNodeClick="onChangeClick" :treedata="treedata"></orgTree>
                </el-col>
                <el-col :span="18" style="height:100% ;">
                  <div class="margin-tb">
                    <el-input style="width:200px;" placeholder="请输入姓名/手机号" v-model="model3.userName" class="input-with-select" @keyup.enter.native="getWhatList">
                      <el-button slot="append" icon="el-icon-search" @click="getWhatList"></el-button>
                    </el-input>
                    
                      <el-button v-if="userType == 2&&consType=='more'" type="primary" class="fr" @click="bantchUse">批量使用</el-button>
                  </div>
                    <el-table @selection-change="HandleSelectRecent" class="margin-top-sm" ref="table2"  :data="list2"  >
                      <el-table-column v-if="consType=='more'&&userType==2" type="selection" width="55" align="center"></el-table-column>
                      <el-table-column :show-overflow-tooltip="true" prop="orgName" label="所属组织" />
                        <el-table-column :show-overflow-tooltip="true" prop="userName" label="姓名" />
                        <!-- <el-table-column :show-overflow-tooltip="true" prop="channelNameAll" label="部门" >

                          <template slot-scope="scope">
                            {{scope.row.channelNameAll?scope.row.channelNameAll:'——'}}
                          </template>
                        </el-table-column> -->
                        <el-table-column :show-overflow-tooltip="true"  prop="userAccount" label="手机号" />
                        <el-table-column
                          label="操作"
                          width="100px"
                          align="center"
                            v-if="userType==2"
                        >
                          <template slot-scope="scope">
                            
                            <el-button  type="primary" size="mini" @click="used(scope.row)" >使用</el-button>
                            
                          </template>
                        </el-table-column>
                        
                    </el-table>
                    <el-pagination
                      :current-page.sync="model3.pageNum"
                      background
                      style="margin-top: 20px;"
                      layout="total,prev, pager, next,jumper,slot"
                      :total="pageTotal2"
                      :page-size="model3.pageSize"
                      @current-change="getList2">
                      <el-button style="border: 1px solid #dcdfe6;float: left;" size="mini" @click="selectAll">全选</el-button>
                      <el-button style="border: 1px solid #dcdfe6;float: left; margin-right: 20px;" size="mini" @click="selectRev">反选</el-button>
                    </el-pagination>
                </el-col>
              </el-row>
              
            </div>
        </div>
      </el-card>
     <el-dialog :title="CRMtitle" center v-dialogDrag :visible.sync="visible" width="500px" :append-to-body="true">
           <div class="padding">
                <div class="text-center margin-bottom-lg radiobox">
                  <el-radio v-model="radioadd" label="1">个人</el-radio>
                  <el-radio v-model="radioadd" label="2">企业经办人</el-radio>
                </div>
               <el-form :model="model"  ref="agForm" label-width="100px" class="ms-content">
                <el-form-item v-if="radioadd == 2" prop="orgName" verify label="企业名称">
                    <!-- <el-input v-model="model.orgName" @blur="getEnt(model.orgName)" placeholder="请输入企业名称"></el-input> -->
                    <el-input v-model="model.orgName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item  prop="userName"  verify label="姓名">
                    <el-input v-model="model.userName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item  prop="userAccount"  verify phone label="手机号">
                    <el-input v-model="model.userAccount" placeholder="请输手机号"></el-input>
                </el-form-item>
                <!-- <el-form-item  prop="job"   label="职务">
                    <el-input v-model="model.job" placeholder="请输入职务"></el-input>
                </el-form-item>
                <el-form-item  prop="email"   label="邮箱">
                    <el-input v-model="model.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item  prop="fileId"   label="授权委托书">
                   
                    <uploads  @successAuth="successAuth" @beforeUpload="beforeUpload" :btnTitle="btnTitle" :fileType="['png','jpg','jpeg']"></uploads>
                     <div class="text-gray" style="font-size:10px;">委托书格式支持上传jpeg、jpg、png格式</div>
                

                     <el-input v-model="model.fileId" style="display:none" type="hidden" placeholder=""></el-input>
                </el-form-item>
                <el-form-item  prop="remark"   label="备注">
                     <el-input type="textarea" v-model="model.remark"></el-input>
                </el-form-item> -->
            </el-form>
           </div>
           <div class=" text-center" slot="footer">
              <el-button @click="visible = false">取 消</el-button>
               <el-button @click="onSure" type="primary">提交</el-button>
           </div>
        </el-dialog>
  </div>
</template>

<script>
import {findContactEntList,deleteContact,findContact,saveContact,addContact,findContactList,recentContactLis,deleteRecentContact} from '../../../api/contracts.js'
import uploads from '../../../components/common/uploads'
 import {findOrgUserList,queryCreditCodeByOrgName,findOrgAuthInfoList} from '../../../api/companyManage.js';
import orgTree from '../../common/orgTree';
 import { getDentify } from '@/utils/auth';
import { preview } from '../../../api/index.js';
export default {
  props:{
    userType:{
      type:String,
      default:"1"
    },
    consType:{
      type:String,
      default:"more"
    },
  },
  components: {uploads,orgTree},
  data() {
    return {
        userAccount:false,
        getDentify:{},

        activeName:"0",
        visible:false,
        imageUrl: '',
        userName:"",
        loading:false,
        model2:{
          pageNum:1,
          pageSize:10,
          userName:""
        },
        model3:{
          pageNum:1,
          pageSize:10,
          userName:""
        },
        modelRecent:{
          pageNum:1,
          pageSize:10,
          name:""
        },
        CRMtitle:"新增CRM客户",
        btnTitle:"选择文件",
        type:"",
        pageTotal:0,
        pageTotal2:0,
        recentTotal:0,
        selectRecent:[],
        selectIn:[],
        selectOut:[],
        list:[ ],
        list2:[ ],
        recentlist:[], // 最近联系人列表
         model: {
            userAccount: '',
            userName: '',
            orgName: '',
            creditCode:""
            // job: '',
            // email: '',
            // fileId: '',
            // remark: '',
         
        },
        treedata:[],
        value:"",
        radioadd:'1' //新增联系人radio
    }
  },
  created() {
    this.getDentify = getDentify();
    console.log(this.getDentify,"getDentify")
    this.getList();
    this.getList2();
    this.getList3();
    if(this.getDentify.orgId != 0) this.getOrgList()
  },
  // mounted(){
    
  //     this.getOrgList();
    
  // },
  methods: {
    clearSelect(){
      let ref = 'table'+this.activeName;
       
      this[ref].clearSelection();
    },
    setUserName(){

    },
    HandleSelectRecent(val){
      if(this.activeName == 0){
        this.selectRecent = val;
      } else if (this.activeName == 1){
        this.selectOut = val;
      } else if (this.activeName == 2){
        this.selectIn = val;
      }
    },
    selectAll(){
      // console.log(this.$refs.table0)
      if(this.activeName == 0){
        this.$refs.table0.toggleAllSelection()
      } else if (this.activeName == 1){
        this.$refs.table1.toggleAllSelection()
      } else if (this.activeName == 2){
        this.$refs.table2.toggleAllSelection()
      }
    },
    selectRev(){
      if(this.activeName == 0){
        this.$refs.table0.data.forEach(row => {
          this.$refs.table0.toggleRowSelection(row);
        });
      } else if(this.activeName == 1){
        this.$refs.table1.data.forEach(row => {
          this.$refs.table1.toggleRowSelection(row);
        });
      } else if(this.activeName == 2){
        this.$refs.table2.data.forEach(row => {
          this.$refs.table2.toggleRowSelection(row);
        });
      }
    },
    async getOrgList(){
      let {data} = await findOrgAuthInfoList({id:this.getDentify.orgId});
      this.treedata = [data];
      console.log(this.treedata)
    },
    getWhatList(){
      if(this.activeName==1){
        this.getList(1)
      }else if(this.activeName==2){
        this.getList2(1)
      } else{
        this.getList3(1)
      }
    },
      getList(value){
        value ? this.model2.pageNum = value :this.model2.pageNum=1
    
        findContactList(this.model2).then(res=>{
           
          this.list = res.data.list
          this.list.forEach(item=>{
            item.url = preview(item.fileId)
          })
          this.pageTotal = res.data.total
        })
      },
      async getList2(value){
         value ? this.model3.pageNum = value :this.model3.pageNum=1;
        
         if(this.getDentify.orgId==0){
           return false;
         }
        this.model3.orgId =this.getDentify.orgId;
        let {data} = await findOrgUserList(this.model3);
        this.list2 = data.list
        this.pageTotal2 = data.total
      },
      async getList3(value){
        //  value ? this.modelRecent.pageNum = value :this.modelRecent.pageNum=1;
        
        //  if(this.getDentify.orgId==0){
        //    return false;
        //  }
        // this.modelRecent.orgId =this.getDentify.orgId;
        let {data} = await recentContactLis(this.modelRecent);
        this.recentlist = data.list
        this.recentTotal = data.total
      },
      // searchRecent(){
      //   // console.log(this.modelRecent.name)
      //   debounce2(this.getList3,1000)
      // },
      beforeUpload(file){
        console.log(file)
      },
      successAuth(res, file){
       
            this.btnTitle = "重新上传"
            this.model.fileId = res.data.id
            this.$message.success("上传成功")
            console.log(res)
       
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      async onSure(){
        // if(this.model.orgName){
        //     await this.getEnt(this.model.orgName);
        //    if(!this.model.creditCode){
        //      this.$message.error("请输入正确的企业")
        //      return false;
        //    }
        // }
        this.$refs.agForm.validate(valid => {
            if (valid) {
              if(this.type=="edit"){
                if (this.radioadd === '2') {
                  saveContact(this.model).then(res=>{
                      this.getList();
                      this.$message.success("提交成功");
                      this.visible = false;
                      this.$refs.agForm.resetFields();
                  })
                } else {
                  let data = { ...this.model, orgName : ''}
                  saveContact(data).then(res=>{
                      this.getList();
                      this.$message.success("提交成功");
                      this.visible = false;
                      this.$refs.agForm.resetFields();
                  })
                }
              }else{
                if (this.radioadd === '2') {
                  addContact(this.model).then(res=>{
                    this.getList();
                    this.$message.success("提交成功");
                    this.visible = false;
                    this.$refs.agForm.resetFields();
                  })
                } else {
                  let data = { ...this.model, orgName : ''}
                  addContact(data).then(res=>{
                      this.getList();
                      this.$message.success("提交成功");
                      this.visible = false;
                      this.$refs.agForm.resetFields();
                  })
                }
              }
                
            } else {
                
                console.log('error submit!!');
                return false;
            }
        });
      },
      doAddCRM(){
        this.CRMtitle = "新增联系人"
        this.visible = true;
        this.btnTitle = "选择文件"
        this.type = "add";
        this.$nextTick(()=>{
          this.$refs.agForm.resetFields();
          this.model.creditCode = ''
          // this.$refs.agForm.clearValidate();
        })
      },
      edit(row){
        this.visible = true;
        this.type = "edit"
        // this.btnTitle = "重新上传"
        this.CRMtitle = "编辑联系人";
        row.fileId?this.btnTitle = "重新上传":this.btnTitle = "选择文件" 
        if (row.orgName && row.orgName !== '') {
          this.radioadd = '2'
        } else {
          this.radioadd = '1'
        }
        this.$nextTick(()=>{
          this.$refs.agForm.resetFields();
          this.model.creditCode = ''
          this.model = JSON.parse(JSON.stringify(row));
          this.$refs.agForm.clearValidate();
        })
      },
      used(row){
        // this.$emit("change",row)
        this.$emit("setConts",[row])
      },
      del(row){
        if(this.activeName == 1){
          let ids = []
          debugger;
          if(row){
            ids.push(row.id)
          } else{
            ids = this.selectOut.map((item)=>{
              return item.id
            })
          }
          debugger;
          deleteContact({ids:ids}).then(res=>{
              this.getList();
              this.$message.success("删除成功");
          })
        } else if(this.activeName == 0){
          let ids = []
          if(row){
            ids.push(row.id)
          } else{
            ids = this.selectRecent.map((item)=>{
              return item.id
            })
          }
          deleteRecentContact({ids:ids}).then(res=>{
            console.log(res)
            this.getList3();
              this.$message.success("删除成功");
          })
        }
      },
      confirmDel() {
        this.$confirm('确定要删除联系人吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('1111111111', 1111111);
          this.del();
        }).catch(() => {         
        });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async getEnt(name){
        if(!name){
          this.model.creditCode = ""
          return false;
        }
        let {data} = await queryCreditCodeByOrgName({orgName:name})
        if(data){
          this.model.creditCode = data.creditCode;
        }else{
          this.model.creditCode = ""
          this.$message.error("输入的企业不正确")
        }
      },
      async onChangeClick(item) {
        this.model3.orgId =item.id;
        let {data} = await findOrgUserList(this.model3);
        this.list2 = data.list
        this.pageTotal2 = data.total
      },
      bantchUse(){
          let arr = []
          if(this.activeName == 0){
            arr = this.selectRecent 
          } else if (this.activeName == 1){
            arr =this.selectOut  
          } else if (this.activeName == 2){
            arr =this.selectIn  
          }
          if(arr.length==0){
              this.$message.error("请选择联系人")
              return false;
          }
          this.$emit("setConts",arr)
      },

  }
}

</script>
<style lang="less">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .radiobox .el-radio{
    margin:0 30px;
  }
</style>