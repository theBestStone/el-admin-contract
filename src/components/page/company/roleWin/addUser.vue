<!--  -->
<template>
  <el-dialog class="addusers" :title="title" :visible.sync="visibleUserAdd" v-dialogDrag width="800px">
          <el-row :gutter="20" v-if="type != 'addOwner'">
            <el-col :span="15" class="">
              <div class="padding-sm margin-bottom-sm   bg-gray">选择成员</div>
               <el-col :span="15">

                  <orgTree @handleNodeClick="handleNodeClick" ref="orgTree"></orgTree>
               </el-col>
                <el-col :span="9" >
                  <!-- <div v-if="users.length==0" class="text-center text-gray">请选择部门</div> -->
                  <div v-if="users.length>0">

                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                          <p v-for="item in users">
                              <el-checkbox  :label="item.uid" :key="item.uid">{{item.userName}}</el-checkbox>
                          </p>
                      </el-checkbox-group>
                  </div>
                </el-col>
            </el-col>
           
            <el-col :span="9">
              <div class="padding-sm   margin-bottom-sm  bg-gray">已选成员</div>
                <p v-for="(item,index) in checkedUsers"  class="fl margin-left-sm" style="margin-top:3px;">
                    <el-tag type="primary">{{Allobj[item]}} <i class="el-icon-error" style="position:relative;color:#e0552f;left:10px;cursor: pointer;font-size: 16px;top:2px;" @click="delUser(item,index)"></i></el-tag>
                </p>
            </el-col>
          </el-row>
          <div class="margin-top">
            <el-form :model="model1" v-if="type=='addOwner'" ref="agForm3" label-width="140px">
                
                 <el-form-item prop="userlist" verify v-if="type == 'addOwner'">
                  <span slot="label">
                    <span>持有人</span> 
                    <el-tooltip class="item" effect="dark" content="为保证印章授权的合规性，只有实名认证成功的成员才能被添加为印章持有人" placement="top">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </span>
                  <el-input v-model="model1.userlist" placeholder="" @focus="iptfocus" @input="iptchange($event)" style="width: 350px;"  ></el-input>
                </el-form-item>
                <el-form-item label="持有有效期"  prop="times" v-if="model1.long">
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="model1.times" class="date-item" />
                </el-form-item>
                <el-form-item label="持有有效期"  prop="times" verify v-else>
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="model1.times" class="date-item" />
                </el-form-item>
                <el-form-item   prop="long">
                  <el-checkbox v-model="model1.long">长期有效</el-checkbox>
                </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer text-center">
              <el-button @click="visibleUserAdd = false">取 消</el-button>

              <el-button v-if="type=='addUser'" type="primary" @click="doUserAdd">确定</el-button>
              <el-button v-if="type=='addOwner'" type="primary" @click="doOwnerAdd">确定</el-button>
          </div>
          <el-dialog title="选择授权对象" :visible.sync="sealaddVis" append-to-body>
            <el-row :gutter="20" >
              <el-col :span="15" class="">
                <div class="padding-sm margin-bottom-sm   bg-gray">选择成员</div>
                <el-col :span="15">

                    <orgTree @handleNodeClick="handleNodeClick" ref="orgTree2"></orgTree>
                </el-col>
                  <el-col :span="9" >
                    <!-- <div v-if="users.length==0" class="text-center text-gray">请选择部门</div> -->
                    <div v-if="users.length>0">

                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                            <p v-for="item in users">
                                <el-checkbox  :label="item.uid" :key="item.uid">{{item.userName}}</el-checkbox>
                            </p>
                        </el-checkbox-group>
                    </div>
                  </el-col>
              </el-col>
            
              <el-col :span="9">
                <div class="padding-sm   margin-bottom-sm  bg-gray">已选成员</div>
                  <p v-for="(item,index) in checkedUsers"  class="fl margin-left-sm" style="margin-top:3px;">
                      <el-tag type="primary">{{Allobj[item]}} <i class="el-icon-error" style="position:relative;color:#e0552f;left:10px;cursor: pointer;font-size: 16px;top:2px;" @click="delUser(item,index)"></i></el-tag>
                  </p>
              </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer text-center">
              <el-button @click="sealaddVis = false">取 消</el-button>

              <el-button type="primary" @click="doselectUser">确定</el-button>
          </div>
          </el-dialog>
      </el-dialog>
</template>

<script>
import orgTree from '../../../common/orgTree';
import {findOrgUserList,findOrgUserListRealName} from '../../../../api/companyManage.js';
import {addOrgUserInRole} from '../../../../api/role.js';
import {addSealUser,editRelate} from '../../../../api/signatureManage.js';
// import {preview} from '../../../api/index.js';
import DateRangePicker from '../../../common/DateRangePicker';
export default {
  components: {orgTree,DateRangePicker},
  data() {
    return {
        visibleUserAdd:false,
        checkAll: false,
        checkedUsers: [],
        checkedUsersObj: {},
        checkedObjUsers: [],
        users: [],
        Allusers:[],
        Allobj:{},
        usersList: [],
        isIndeterminate: false,
        type:"",
        model:{
            orgId:"",
            pageNum:1,
            pageSize:9999
            
        },
        model1:{
          times:[],
          long:false,
          userlist:''
        },
        title:"",
        org:{},
        roleActive:{},
        sealaddVis:false,
        modeltype : 'add',
        editobj:{}
    }
  },
  created() {
  },
    mounted(){
        // this.getOrgList();
    },
  methods: {
    iptchange(val){
      console.log(val)
      this.$forceUpdate()
    },
    iptfocus(){
      this.sealaddVis = true
      this.$nextTick(()=>{
          this.$refs.orgTree2.getOrgList();
        })
    },
    doselectUser(){
      console.log(this.checkedUsers)
      let tempstr = '';
      this.checkedUsers.map((item)=>{
        tempstr += this.Allobj[item]
      })
      this.model1.userlist = tempstr
      this.sealaddVis = false;
      this.$forceUpdate()
    },
    getOrgList(){
        this.$refs.orgTree.getOrgList();
    },
    setDetaildata(row){
      console.log(row)
      this.editobj = row
      this.visibleUserAdd = true;
      this.type = 'addOwner';
      this.model1.userlist = row.relateName
      if(row.startTime == null && row.endTime == null){
        this.model1.startTime = '';
        this.model1.endTime = '';
        this.model1.long = true
      } else{
        this.model1.startTime = row.startTime;
        this.model1.endTime = row.endTime;
      }
      this.modeltype = 'edit'
    },
    init(type,item,bool){
        this.visibleUserAdd = true;
        this.type = type;
        this.checkedUsers = [];
        this.isIndeterminate = false;
        this.checkAll = false;
        if(type=="addUser"){
          this.roleActive = item;
          this.title = "添加成员"
        }else if(type=="onChange"){
           this.title = "更换管理员";
          this.roleActive = item;
        }else if(type=="addOwner"){
           this.title = "添加持有人";
       
          this.roleActive = item;

        }
        this.modeltype = 'add'
        this.$nextTick(()=>{
          if(bool != 'add') this.getOrgList();
          if(type=="addOwner"){
          
            this.$refs.agForm3.resetFields()
            this.users = []
        
          }
        })
    },
    handleCheckAllChange(val) {
        let arr1 = [];
        let arr2 = this.checkedUsers.concat();
        var arrUsers = this.users.concat();  

        if(val){
         
          for(var i=0;i< arrUsers.length;i++){  
            
              arr2.indexOf(arrUsers[i].uid) === -1 ? arr2.push(arrUsers[i].uid) : 0;  
          }
        }else{
          let clone = arr2.slice(0)
          for(var i=0;i< arrUsers.length;i++){  
              clone.indexOf(arrUsers[i].uid) != -1 ? clone.splice(clone.indexOf(arrUsers[i].uid), 1) : 0;  
          }
          console.log(clone,"clone")
          arr2 = clone;
        }
      
         
        
        
        this.checkedUsers = arr2;
        this.isIndeterminate = false;
    },
    handleCheckedUsersChange(value) {
        this.gou();
        // let checkedCount = value.length;
        // let arr = [];
      
        // value.forEach(i=>{
        //   this.users.forEach(j=>{
        //     if(i==j.uid){
        //       arr.push(j)
        //     }
        //   })
        // })
       
        // this.checkAll = checkedCount === this.users.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.users.length;
    },
    handleNodeClick(item) {
        this.org = item;
        this.model.orgId = item.id;
         
      
        this.getUserList();
    
    
    },
    delUser(item,index){
       this.checkedUsers.splice(index,1);
       this.gou();
      //  let tag = true;
      // this.users.forEach(item=>{
      // if(this.checkedUsers.indexOf(item.uid)!=-1){
        
      // }
         
      // })
     
    },
    getUserList(){
       
        
      findOrgUserListRealName(this.model).then(res=>{
          
        // this.usersList = res.data.list;
        
        //   this.isIndeterminate = false;
        // this.checkAll = false;
        
         res.data.list.forEach(item=>{
           if(!this.Allobj[item.uid]){
             this.Allobj[item.uid] = item.userName;
             this.Allusers.push(item);
              
             
           }
          
         })
        
        
          this.users = res.data.list;
          this.gou();
      });
    },
    gou(){
       let tag = 1;
        let tag2 = false;
         try {
           
           this.users.forEach((item,index)=>{
            if(this.checkedUsers.indexOf(item.uid) !==-1){
              tag = 2;
            }else{
              
              if(tag==2){
                  tag = 3;
                   throw new Error("LoopTerminates");
              }else{
                tag2 = true;
                 
              }
              
            } 
         })
         } catch (error) {
           
         }
         
        if(tag2&&this.checkedUsers.length>0){
          tag = 3; 
        }
         if(tag==1){
          this.isIndeterminate = false;
          this.checkAll = false;
         }else if(tag==2){
           
          this.isIndeterminate = false;
          this.checkAll = true;
         }else if(tag==3){
          this.isIndeterminate = true;
          this.checkAll = true;
         }
    },
    async doUserAdd(){
      let data = await addOrgUserInRole({roleId:this.roleActive.id,uid:this.checkedUsers})
     
      this.$message.success("新增成功");
      this.$emit("change");
      this.visibleUserAdd = false;

      // roleId
    },
    async doOwnerAdd(){
      if(this.checkedUsers.length==0 && this.model1.userlist.length == 0){
        this.$message("请选择成员")
        return false;
      }
        this.$refs.agForm3.validate(async valid => {
            if (valid) {
              
              if(this.model1.long){
                this.model1.startTime = '';
                this.model1.endTime = '';
              } else{
                this.model1.startTime = this.model1.times[0];
                this.model1.endTime = this.model1.times[1];
              }
              if(this.modeltype == 'add'){
                this.model1.sealId = this.roleActive.id;
                this.model1.relateIds = this.checkedUsers;
                // console.log(this.model1)
                // return false;
                let data = await addSealUser(this.model1)
      
                this.$message.success("新增成功");
                this.$emit("change");
                this.visibleUserAdd = false;
              } else{
                this.model1.id = this.editobj.id
                 editRelate(this.model1).then(res => {
                  this.$message.success('操作完成');
                  this.visibleUserAdd = false;
                  this.$emit("edit");
                  // this.relateList();
              });
              }
              
            } else {
                    
                return false;
            }
        });
      
    }
  }
}

</script>
<style >
.addusers .el-dialog__body{
  padding:0 20px;
}
</style>