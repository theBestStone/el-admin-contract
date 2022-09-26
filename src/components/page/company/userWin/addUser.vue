<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="visibleUserAdd" v-dialogDrag width="800px">
          <el-row :gutter="20">
            <el-col :span="12">
              <orgTree @handleNodeClick="handleNodeClick" ref="orgTree"></orgTree>
            </el-col>
            <el-col :span="6">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                    <p v-for="item in users">
                        <el-checkbox  :label="item.uid" :key="item.uid">{{item.userName}}</el-checkbox>
                    </p>
                </el-checkbox-group>
            </el-col>
            <el-col :span="6">
                <p v-for="(item,index) in checkedUsers" style="margin-top:3px;">
                    <el-tag type="primary">{{users[index].userName}}</el-tag>
                </p>
            </el-col>
          </el-row>
           
          
          <div slot="footer" class="dialog-footer text-center">
              <el-button @click="visibleUserAdd = false">取 消</el-button>

              <el-button v-if="type=='addUser'" type="primary" @click="doUserAdd">确定</el-button>
          </div>
      </el-dialog>
</template>

<script>
import orgTree from '../../../common/orgTree';
import {findOrgUserList,findOrgUserListRealName} from '../../../../api/companyManage.js';
import {addOrgUserInRole} from '../../../../api/role.js';
export default {
  components: {orgTree},
  data() {
    return {
        visibleUserAdd:false,
        checkAll: false,
        checkedUsers: [],
        checkedObjUsers: [],
        users: [],
        usersList: [],
        isIndeterminate: true,
        type:"",
        model:{
            orgId:"",
            pageNum:1,
            pageSize:9999
            
        },
        title:"",
        org:{},
        roleActive:{}
    }
  },
  created() {
      
  },
    mounted(){
        // this.getOrgList();
    },
  methods: {
    getOrgList(){
        this.$refs.orgTree.getOrgList();
    },
    init(type,item){
        this.visibleUserAdd = true;
        if(type=="addUser"){
          this.roleActive = item;
          this.title = "添加成员"
        }else if(type=="onChange"){
           this.title = "一键转交";
          this.roleActive = item;
        }
        this.$nextTick(()=>{
            this.getOrgList();
        })
    },
    handleCheckAllChange(val) {
        let arr = [];
        let arr1 = [];
        this.users.forEach(item=>{
          arr.push(item.id)
        })
        
        
        this.checkedUsers = val ? arr : [];
        this.isIndeterminate = false;
    },
    handleCheckedUsersChange(value) {
        
        let checkedCount = value.length;
        let arr = [];
        value.forEach(i=>{
          this.users.forEach(j=>{
            if(i==j.id){
              arr.push(j)
            }
          })
        })
        console.log(arr)
        this.checkAll = checkedCount === this.users.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.users.length;
    },
    handleNodeClick(item) {
        this.org = item;
        this.model.orgId = item.id;
        this.getUserList();
    
    
    },
    getUserList(){
       
        
      findOrgUserList(this.model).then(res=>{
          
        // this.usersList = res.data.list;
        
        this.users = res.data.list
      });
    },
    async doUserAdd(){
      let data = await addOrgUserInRole({roleId:this.roleActive.id,uid:this.checkedUsers})
      console.log(data);
      this.$message.success("新增成功");
      this.$emit("change");
      this.visibleUserAdd = false;

      // roleId
    }
  }
}

</script>
<style  >
</style>