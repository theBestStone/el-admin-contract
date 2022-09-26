<!-- 我的 -->
<template>
  <div class="fullheight">
      <!-- <div class="cf margin-sm padding bg-white text-xl text-bold">
          <div class="fl">角色管理</div>
          
      </div> -->
      <!-- <div class="cf margin-sm bg-white text-xl text-bold">
          <div class="fl margin-sm margin-left">角色管理</div>
      </div> -->
      <el-card class="margin-sm fullcard">
        <div class="cf text-xl text-bold bordertitle">
            <div class="fl">角色管理</div>
        </div>
        <el-row class=" padding-left-sm padding-right-sm" style="height:calc(100vh - 130px)">
            <el-col :xs="10" :sm="7" :md="6" :lg="5" :xl="5" class="" style="height: 100%; border-right:1px solid #d3d3d3">
                <!-- <div class="head-container">
                  <el-button type="primary" style="width:80%;margin-left: 10%;" @click="editTag(0)">新增角色</el-button>
                </div> -->
                <ul class="role-list">
                  <div class="roletypebox">
                    <i class="el-icon-user-solid" style="color: #1257FF;"></i>默认角色
                  </div>
                  <li v-for="item in roleList" :key="item.id" :class="{active:model.roleId==item.id}" v-if="item.readonly == 1" @click="getUserInfo(item)">{{item.roleName}}</li>
                  
                  <!-- <h3>自定义角色<i class="el-icon-plus fr" style="margin-right: 10px; margin-top: 3px;" @click="addnewuser"></i></h3> -->
                  <div class="roletypebox">
                    <i class="el-icon-user-solid" style="color: #71C147;"></i>自定义角色<i class="el-icon-plus fr" style="margin-right: 15px; margin-top: 15px;" @click="addnewuser"></i>
                  </div>
                  <li v-for="item in roleList" :key="item.id" :class="{active:model.roleId==item.id}" v-if="item.readonly == 0" @click="getUserInfo(item)">
                  {{item.roleName}}
                  <el-dropdown @command="handleCommand" trigger="hover" class="dropdownbtns">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="beforeHandleCommand(item,'edit')">编辑角色名</el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(item,'del')">删除角色</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  </li>
                  <li v-if="addusertype=='add' || addusertype=='edit'">
                    <el-input style="width: 70%;" v-model="editRoleName" placeholder="请输入角色名称"></el-input>
                    <i class="el-icon-circle-close nodeicons" @click="addusertype = ''" style="margin-right: 12px; color:red" ></i>
                    <i class="el-icon-circle-check nodeicons" @click="doEditnew" style="color: blue;" ></i>
                  </li>
                </ul>
            </el-col>
            <el-col :xs="14" :sm="17" :md="18" :lg="19" :xl="19" class="" style="height: 100%;">
                <el-tabs v-model="activeName" class="usertab">
                  <el-tab-pane  style="margin-left:20px" label="角色功能" name="1"></el-tab-pane>
                  <el-tab-pane label="角色成员" name="2"></el-tab-pane>
                </el-tabs>
                <div style="border-top:1px solid #e4e7ed;margin-bottom: 20px;"></div>
                <div v-if="activeName == 1">
                  <el-button type="text" v-if="!isedit && roleActive.readonly == 0" style="font-size: 15px; margin-left: 20px;margin-bottom: 17px;" @click="setuser('set')" icon="el-icon-edit-outline">编辑角色权限</el-button>
                  <el-button style="margin:20px; margin-top:0" v-if="isedit" @click="setuser('cancel')">取消</el-button>
                  <el-button type="primary" v-if="isedit" @click="setuser('save')">保存</el-button>
                  <table class="roletable">
                    <tr v-for="(item,index) in newtalbe" :key="item.id" >
                      <td style="background: rgb(251,251,251);"><el-checkbox style="margin-left: 15px;" :indeterminate="item.isIndeterminate" v-model="item.checkAll" :disabled="!isedit" @change="handleCheckAllChange($event,item)">{{item.menuName}} </el-checkbox></td>
                      <td>
                        <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange($event,item)">
                          <el-checkbox :disabled="!isedit" style="margin-right: 35px" v-for="(obj,ind) in item.menuDtoList" :label="obj.id" :key="obj.id">{{obj.menuName}}</el-checkbox>
                        </el-checkbox-group>
                      </td>
                    </tr>
                  </table>
                </div>
                <div v-else>
                  <!-- <div class="margin-sm"> -->
                      <!-- <p class="margin-top-sm">{{roleActive.roleName}} （ {{userNum}} 人）<el-button type="primary" style="width:100px" :disabled="roleActive.roleName=='主管理员'||roleActive.roleName=='员工'" @click="editTag(1)">编辑角色</el-button></p>
                      <p class="margin-top-sm" v-if="contentArr.length==0" >暂无权限</p>
                      <p class="margin-top-sm" v-if="contentArr.length>0" v-for="(item,index) in contentArr" :key="index">{{item.menuName}}：{{item.menuNameAll}}</p> -->
                      <!-- <p class="margin-top-sm">管理员权限：账户管理/审计日志/角色管理/印章管理/业务管理/查看企业合同</p> -->
                  <!-- </div> -->
                  <div class="margin-bottom">
                      <el-button type="primary" style="width:100px;margin-left:20px;" size="mini" @click="addUserTag">添加成员</el-button>
                      <el-button style="width:100px" size="mini" :disabled="selections.length==0||(roleActive.roleName=='主管理员'||roleActive.roleName=='员工')" @click="del">批量移除</el-button>
                  </div>
                  <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;margin-left:20px;" @selection-change="selectionChangeHandler">
                    <el-table-column :selectable="checkboxT" type="selection" width="55" />
                    <el-table-column :show-overflow-tooltip="true" prop="userName" label="姓名" />
                    <el-table-column :show-overflow-tooltip="true" prop="userAccount" label="手机号" />
                    <el-table-column prop="channelNameAll" label="部门" />
                    <el-table-column prop="state" label="状态" >
                      <template slot-scope="scope">
                          <span v-if="scope.row.state==0 || scope.row.state==2">
                          未激活
                          </span>
                          <span v-if="scope.row.state==1">
                          已启用
                          </span>
                          <span v-if="scope.row.state==2">
                          已停用
                          </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button @click="del(scope.row)" type="text" size="mini">
                                    移除
                                </el-button>
                            </template>
                        </el-table-column>
                  </el-table>
                  <el-pagination
                  style="margin-left:20px;"
                  :current-page.sync="model.pageNum"
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="pageTotal"
                  :page-size="model.pageSize"
                  @current-change="findAllOrgUserByRole">
                  </el-pagination>
                </div>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog :title="editType==0?'新增角色':'编辑角色'" :visible.sync="visibleEdit"  width="500px">
          <el-form :model="editModel"  ref="agForm" label-width="150px" >
              <el-form-item label="角色名称" prop="roleName" verify >
                  <el-input type="text" v-model="editModel.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              
                <el-form-item :label="item.menuName"  v-for="(item,index) in treeList" :key="index">
                  <el-tree ref="tree" show-checkbox node-key="id" :default-checked-keys="defaultChecked"  :highlight-current="true" :data="item.menuDtoList" :props="defaultProps"  :default-expand-all="true"></el-tree>
                </el-form-item>
              
          
          </el-form>
          
          <div slot="footer" class="dialog-footer text-center">
              <el-button @click="visibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="doEdit">保存</el-button>
          </div>
      </el-dialog>
      <add-user ref="addUser" @change="change"></add-user>
  </div>
</template>

<script>
 
import {addRole,editRole,deleteRole,findMenuList,findAllOrgUserByRole,findMenuByRole,findAllMenu,roleListByOrg,findMenuIdsByRole,countOrgUserByRole,deleteOrgUserInRole} from '../../../api/role.js';
import {getDentify} from '@/utils/auth';
import addUser from './roleWin/addUser'
export default {
  components: {addUser},
  data() {
    return {
      getDentify:{},
      activeName:'1',
      deptName:"",
      loading:false,
      selections:[],
      list:[],
      roleList:[],
      roleActive:{},
      pageTotal:0,
      userNum:0,
      model:{
        roleId:"",
        pageNum:1,
        pageSize:10,
        orgId:""
         
      },
      editType:0,
      visibleEdit:false,
      visibleUserAdd:false,
      userList:[],
      editModel:{
        roleName:"",
        roleId:"",
        eid:"",
        menuList:[]
      },
      defaultProps: {
        children: 'menuDtoList',
        label: 'menuName'
      },
      treeList:[],
      defaultChecked:[],
      contentArr:[],
      newtalbe:[],
      saveedtable:[],
      isedit:false,
      editRoleName:'',
      addusertype:'',
      
    };
  },
  methods: {
    addnewuser(){
      this.addusertype = 'add';
      this.editModel.roleName = ''
      this.editModel.roleId = ''
      this.editModel.menuList = []
      console.log(this.editModel)
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1
    },
    selectionChangeHandler(val){
      this.selections = val
    },
    async getRoleList(){//获取所有角色
      let {data}= await roleListByOrg({eid:this.getDentify.orgId});
        this.model.roleId = data[0].id
        this.roleList = data;
        if(!this.roleActive.id){
          this.roleActive = data[0];
          this.editModel.roleId = String(data[0].id);
          this.editModel.roleName = String(data[0].roleName);
          this.findMenuByRole();
          this.findAllOrgUserByRole();
          this.countOrgUserByRole();
          
        }
    },
    getUserInfo(item){//切换角色
      this.model.roleId = item.id;
      this.roleActive = item;
      this.editModel.roleId = String(item.id);
      this.editModel.roleName = item.roleName;
      this.isedit = false;
      this.findAllOrgUserByRole();
      this.findMenuIdsByRole();
      this.findMenuByRole();
      this.countOrgUserByRole();
      // this.roleActive = item.id;
    },
    async findAllOrgUserByRole(value){//根据id查找所有用户
        value ? this.model.pageNum = value :this.model.pageNum=1
        let {data}= await findAllOrgUserByRole(this.model);
        this.list = data.list
        this.pageTotal = data.total
    
    },
    async countOrgUserByRole(){//查找人数
        let {data}= await countOrgUserByRole({roleId:String(this.roleActive.id)});
        this.userNum = data;
    
    },
    async findMenuByRole(){//查找角色权限描述
        let {data}= await findMenuByRole({roleId:String(this.roleActive.id)});
        this.contentArr = data;
    },
    editTag(type){//打开角色新增/编辑
      
      this.editType = type;
      this.visibleEdit = true;
      this.defaultChecked = [];
      let aaClear = ()=>{
        this.$refs.tree.forEach(item=>{
            item.setCheckedKeys([])
        })
      }
      if(type==0){
        this.$nextTick(()=>{
          // this.editModel.roleName = ""
          this.$refs.agForm.resetFields();
           aaClear();
   
        })
      }else{
        
        this.$nextTick(()=>{
          // this.$refs.agForm.resetFields();
          aaClear();
   
          this.editModel.roleName =this.roleActive.roleName
          this.findMenuIdsByRole();
        })
      }
    
    },
    async findAllMenu(){//查找所有的权限树
      let {data}= await findAllMenu();
      this.treeList = data;
      let templist = JSON.parse(JSON.stringify(data));
      templist.map((item)=>{
        if(item.menuName == '控制台'){
          item.menuDtoList.map((obj)=>{
            obj.checkAll = false
            obj.checkedCities = []
            obj.isIndeterminate = false
            if(obj.menuDtoList.length == 0){
              obj.menuDtoList.push(obj)
            }
            this.newtalbe.push({
              ...obj,...{menuName:item.menuName + '-' + obj.menuName}})
          })
        }
        //  else if(item.menuName == '模版管理'){
        //   let templist = item.menuDtoList[0].menuDtoList
        //   item.menuDtoList = templist
        //   item.checkAll = false
        //   item.checkedCities = []
        //   item.isIndeterminate = false
        //   this.newtalbe.push(item)
        // } 
         else{
          item.checkAll = false
          item.checkedCities = []
          item.isIndeterminate = false
          this.newtalbe.push(item)
        }
      })
      // this.newtalbe = data;
      // this.treeList.map((item,index)=>{
      //   if(item.menuName == '控制台'){
      //     item.menuDtoList.map((obj)=>{
      //       obj.checkAll = false
      //       obj.checkedCities = []
      //       obj.isIndeterminate = false
      //       if(obj.menuDtoList.length == 0){
      //         obj.menuDtoList.push(obj)
      //       }
      //       this.treeList.push({
      //         ...obj,...{menuName:item.menuName + '-' + obj.menuName}})
      //     })
      //   } else{
      //     item.menuDtoList.map((obj)=>{
      //       obj.checkAll = false
      //       obj.checkedCities = []
      //       obj.isIndeterminate = false
      //     })
      //   }
      //   item.checkAll = false
      //   item.checkedCities = []
      //   item.isIndeterminate = false
      // })
      
    },
    doEdit(){//新增/编辑角色
      let type = this.editType;
      let arr = [];
      this.$refs.tree.forEach(item=>{
        item.getCheckedNodes().forEach(element => {
          arr.push(element.id)
          
        })
        // item.getHalfCheckedNodes().forEach(element => {
        //   arr.push(element.id)
          
        // })
        
      })
      this.editModel.menuList = arr;
      this.$refs.agForm.validate(valid => {
            if (valid) {
                if(type==0){
                  addRole(this.editModel).then(res=>{
                    this.$message.success("新增成功");
                    this.visibleEdit = false;
                    this.getRoleList();
                  })
                }else{
                  editRole(this.editModel).then(res=>{
                      this.$message.success("编辑成功");
                      this.visibleEdit = false;
                      this.getRoleList();
                  })
                }
                
            } else {
                
                console.log('error submit!!');
                return false;
            }
        });
    },
    doEditnew(){
      let type = this.addusertype;
      this.editModel.roleName = this.editRoleName;
      this.editModel.menuList = this.defaultChecked;
      if(type=='add'){
        addRole(this.editModel).then(res=>{
          this.$message.success("新增成功");
          this.addusertype = '';
          this.getRoleList();
        })
      }else{
        editRole(this.editModel).then(res=>{
            this.$message.success("编辑成功");
          this.addusertype = '';
            this.getRoleList();
        })
      }
    },
    async findMenuIdsByRole(){//按角色查询权限回填
      let {data}= await findMenuIdsByRole({roleId:this.editModel.roleId});
      let arr = [];
      data.forEach(item=>{
        arr.push(item.id)
      })
      this.defaultChecked = arr;
      if(arr.length > 0){
        this.newtalbe.map((item)=>{
          item.checkedCities = []
          item.menuDtoList.map((obj)=>{
            if(this.defaultChecked.includes(obj.id)){
              item.checkedCities.push(obj.id)
            }
          })
          item.checkAll = item.checkedCities.length == item.menuDtoList.length;
          item.isIndeterminate = item.checkedCities.length > 0 && item.checkedCities.length < item.menuDtoList.length;
        })
      } else{
        this.newtalbe.map((item)=>{
          item.checkedCities = []
        })
      }
      
    },
    
    addUserTag(){
      // this.visibleUserAdd= true;
      this.$refs.addUser.init('addUser',this.roleActive);
    },
    change(){
        this.findAllOrgUserByRole(1);
        this.countOrgUserByRole();
    },
    async del(row){
      if(row.uid){
        this.$confirm('确定将成员从角色中移除吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = await deleteOrgUserInRole({roleId:this.roleActive.id.toString(),uids:[row.uid]})
            this.findAllOrgUserByRole(1);
            this.$message.success("删除成功");
          }).catch(() => {
                    
          });
      } else{
        let uid = [];
        this.selections.forEach(item=>{
          uid.push(item.uid)
        })
        this.$confirm('确定将成员从角色中移除吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = await deleteOrgUserInRole({roleId:this.roleActive.id.toString(),uids:uid})
            this.findAllOrgUserByRole(1);
            this.$message.success("删除成功");
          }).catch(() => {
                    
          });
      }
     
      
    },
    doUserAdd(){
        this.findAllOrgUserByRole(1);
        this.countOrgUserByRole();
    },
    handleCheckAllChange(val,item) {
      let allopt = []
      item.menuDtoList.map((obj)=>{
        allopt.push(obj.id)
      })
      item.checkedCities = val ? allopt : [];
      item.isIndeterminate = false;
    },
    handleCheckedCitiesChange(val,item) {
      let checkedCount = val.length;
      item.checkAll = checkedCount == item.menuDtoList.length;
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.menuDtoList.length;
    },
    setuser(type){
      if(type == 'cancel'){
        //取消
        this.isedit = false
        this.findMenuIdsByRole();
      } else if(type =='set'){
        //编辑
        this.isedit = true;
      } else if(type == 'save'){
        //保存
        let checkedlist = []
        this.newtalbe.map((item)=>{
          checkedlist = checkedlist.concat(item.checkedCities)
        })
        this.editModel.menuList = checkedlist
        editRole(this.editModel).then(res=>{
            this.$message.success("编辑成功");
            this.isedit = false
            this.getRoleList();
        })
      }
    },
    beforeHandleCommand(obj,command){
      return {
          'obj': obj,
          'command':command
      }
    },
    handleCommand(command){
      console.log(command)
       if(command.command == 'edit'){
        this.addusertype = 'edit';
        this.editRoleName = command.obj.roleName
        this.editModel.roleId = String(command.obj.id)
        this.findMenuIdsByRole();
       } else{
        this.$confirm("您确认要删除角色吗？角色删除后，将无法恢复！", '删除角色', {
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        })
          .then(async () => {
              deleteRole({eid:this.editModel.eid,roleId:String(command.obj.id)}).then((res)=>{
                this.$message.success('删除成功');
                this.getRoleList()
              })
              
          })
          .catch(() => {});
        
       }
      
    }

  },
  created(){
    this.getDentify = getDentify();
    console.log(this.getDentify)
    this.model.orgId = this.getDentify.orgId;
    this.editModel.eid = this.getDentify.orgId;
    
    this.getRoleList();
    this.findAllMenu();
  }
}

</script>
<style lang="less">
.listcard{
  height: 100%;
}
.listcard .el-card__body{
  padding:20px 0;
}
.dropdownbtns{
  float: right;
  margin-right: 15px;
}
.role-list{
  // margin-top:10px;
  .roletypebox{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 5px;
    i{
      margin:0 7px;
    }
  }
  li{
    height:32px;
    line-height: 32px;
    padding-left: 26px;
    padding-right: 0;
    cursor: pointer;
  } 
  .active{
    background-color: #edf6ff;
    color:#228FFE;
  }
}
.roletable{
    border:1px solid #d3d3d3;
    border-collapse:collapse;
    margin-left: 20px;
  td{
    border:1px solid #d3d3d3;
    padding:20px 10px;

  }
}
.nodeicons{
  font-size: 19px;
  float: right;
  margin-top: 7px;
  margin-right: 5px;
}
.bordertitle{
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
.usertab{
  .el-tabs__nav-wrap:after{
    height:0;
  }
  .el-tabs__header{
    margin-left: 20px;
    margin-bottom: 0;
  }
}

</style>